"use strict";

require("dotenv").config();

const bcrypt = require("bcryptjs");
const mysql = require("mysql2/promise");

const username = String(process.env.SUPERADMIN_USER || "superadmin").trim();
const password = String(process.env.SUPERADMIN_PASSWORD || "");

function required(name) {
  const value = String(process.env[name] || "").trim();
  if (!value) throw new Error(`Falta la variable ${name}.`);
  return value;
}

async function main() {
  if (!/^[a-zA-Z0-9._-]{3,120}$/.test(username)) {
    throw new Error("SUPERADMIN_USER contiene caracteres no permitidos.");
  }
  if (password.length < 12) {
    throw new Error("SUPERADMIN_PASSWORD debe tener al menos 12 caracteres.");
  }

  const pool = mysql.createPool({
    host: required("DB_HOST"),
    port: Number(process.env.DB_PORT || 3306),
    user: required("DB_USER"),
    password: required("DB_PASSWORD"),
    database: required("DB_NAME"),
    connectionLimit: 2
  });

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    await connection.execute("INSERT IGNORE INTO roles (nombre) VALUES ('superadmin')");
    const [roles] = await connection.execute(
      "SELECT id FROM roles WHERE LOWER(nombre) = 'superadmin' LIMIT 1"
    );
    if (!roles.length) throw new Error("No se pudo resolver el rol superadmin.");

    const passwordHash = await bcrypt.hash(password, 12);
    const [users] = await connection.execute(
      "SELECT user_id FROM usuarios WHERE LOWER(usuario) = LOWER(?) LIMIT 1",
      [username]
    );

    if (users.length) {
      await connection.execute(
        `UPDATE usuarios
            SET password = ?, rol_id = ?, activo = 1
          WHERE user_id = ?`,
        [passwordHash, roles[0].id, users[0].user_id]
      );
      console.log(`Superadmin local actualizado: ${username}`);
    } else {
      await connection.execute(
        `INSERT INTO usuarios
            (nombre, apellido, usuario, password, rol_id, activo)
         VALUES ('Super', 'Admin', ?, ?, ?, 1)`,
        [username, passwordHash, roles[0].id]
      );
      console.log(`Superadmin local creado: ${username}`);
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
    await pool.end();
  }
}

main().catch((error) => {
  console.error(`No se pudo preparar superadmin: ${error.message}`);
  process.exit(1);
});
