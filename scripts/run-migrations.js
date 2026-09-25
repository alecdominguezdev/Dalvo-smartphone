"use strict";

require("dotenv").config();

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

function required(name) {
  const value = String(process.env[name] || "").trim();
  if (!value) throw new Error(`Falta la variable ${name}.`);
  return value;
}


async function tableExists(connection, tableName) {
  const [rows] = await connection.execute(
    `SELECT COUNT(*) AS total
       FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = ?`,
    [tableName]
  );
  return Number(rows[0]?.total || 0) > 0;
}

async function columnExists(connection, tableName, columnName) {
  const [rows] = await connection.execute(
    `SELECT COUNT(*) AS total
       FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = ?
        AND COLUMN_NAME = ?`,
    [tableName, columnName]
  );
  return Number(rows[0]?.total || 0) > 0;
}

async function ensureColumn(connection, tableName, columnName, definition, afterColumn = "") {
  if (!(await tableExists(connection, tableName))) return;
  if (await columnExists(connection, tableName, columnName)) return;
  const safeTable = `\`${tableName.replace(/`/g, "``")}\``;
  const safeColumn = `\`${columnName.replace(/`/g, "``")}\``;
  let afterClause = "";
  if (afterColumn && (await columnExists(connection, tableName, afterColumn))) {
    afterClause = ` AFTER \`${afterColumn.replace(/`/g, "``")}\``;
  }
  await connection.query(`ALTER TABLE ${safeTable} ADD COLUMN ${safeColumn} ${definition}${afterClause}`);
}

async function ensureDocumentRecoverySchema(connection) {
  await ensureColumn(connection, "presupuesto_po_cliente", "estado_documento", "VARCHAR(40) NOT NULL DEFAULT 'Activo'", "ruta");
  await ensureColumn(connection, "presupuesto_po_cliente", "reemplazada_por_id", "INT NULL", "estado_documento");
  await ensureColumn(connection, "presupuesto_po_cliente", "reemplazada_at", "DATETIME NULL", "reemplazada_por_id");
  await ensureColumn(connection, "presupuesto_po_cliente", "reemplazada_by", "INT NULL", "reemplazada_at");
  await ensureColumn(connection, "presupuesto_po_cliente", "deleted_at", "DATETIME NULL", "updated_at");
  await ensureColumn(connection, "presupuesto_po_cliente", "deleted_by", "INT NULL", "deleted_at");
}

async function main() {
  const migrationsDir = path.join(__dirname, "..", "database", "migrations");
  const files = fs.existsSync(migrationsDir)
    ? fs.readdirSync(migrationsDir).filter((name) => name.endsWith(".sql")).sort()
    : [];

  const connection = await mysql.createConnection({
    host: required("DB_HOST"),
    port: Number(process.env.DB_PORT || 3306),
    user: required("DB_USER"),
    password: required("DB_PASSWORD"),
    database: required("DB_NAME"),
    multipleStatements: true,
    charset: "utf8mb4"
  });

  try {
    await connection.query(`CREATE TABLE IF NOT EXISTS schema_migrations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      filename VARCHAR(255) NOT NULL UNIQUE,
      checksum CHAR(64) NOT NULL,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

    for (const filename of files) {
      const sql = fs.readFileSync(path.join(migrationsDir, filename), "utf8");
      const checksum = crypto.createHash("sha256").update(sql).digest("hex");
      const [rows] = await connection.execute(
        "SELECT checksum FROM schema_migrations WHERE filename = ? LIMIT 1",
        [filename]
      );
      if (rows.length) {
        if (rows[0].checksum !== checksum) {
          throw new Error(`La migración ${filename} fue modificada después de aplicarse.`);
        }
        console.log(`[migration] omitida ${filename}`);
        continue;
      }

      console.log(`[migration] aplicando ${filename}`);
      if (filename === "20260806_02_recuperacion_documental.sql") {
        await ensureDocumentRecoverySchema(connection);
      }
      await connection.beginTransaction();
      try {
        await connection.query(sql);
        await connection.execute(
          "INSERT INTO schema_migrations (filename, checksum) VALUES (?, ?)",
          [filename, checksum]
        );
        await connection.commit();
      } catch (error) {
        await connection.rollback();
        throw error;
      }
    }
  } finally {
    await connection.end();
  }
}

main().catch((error) => {
  console.error(`[migration] error: ${error.message}`);
  process.exit(1);
});
