-- La empresa es la única fuente de verdad para factor de venta y condiciones comerciales.
-- En instalaciones existentes se conserva el registro histórico más antiguo por empresa;
-- así BMW conserva 1.65 y un contacto nuevo no puede cambiar el factor global.

CREATE TABLE IF NOT EXISTS cliente_empresas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(180) NOT NULL,
  rfc VARCHAR(40) NOT NULL DEFAULT '',
  direccion VARCHAR(500) NOT NULL DEFAULT '',
  email VARCHAR(180) NOT NULL DEFAULT '',
  uso_cfdi VARCHAR(120) NOT NULL DEFAULT '',
  valor_venta DECIMAL(12,4) NOT NULL DEFAULT 1.4500,
  condiciones_pago VARCHAR(30) NOT NULL DEFAULT 'contado',
  dias_credito INT NOT NULL DEFAULT 0,
  notas TEXT NULL,
  activo TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_cliente_empresas_nombre (nombre),
  INDEX idx_cliente_empresas_activo (activo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO cliente_empresas
  (nombre, rfc, direccion, email, uso_cfdi, valor_venta, condiciones_pago, dias_credito, notas, activo)
SELECT
  TRIM(c.empresa), COALESCE(c.rfc, ''), COALESCE(c.direccion, ''), COALESCE(c.email, ''),
  COALESCE(c.uso_cfdi, ''), COALESCE(NULLIF(c.valor_venta, 0), 1.45),
  COALESCE(NULLIF(c.condiciones_pago, ''), 'contado'), COALESCE(c.dias_credito, 0), c.notas, 1
FROM clientes c
INNER JOIN (
  SELECT MIN(id) AS id
  FROM clientes
  WHERE NULLIF(TRIM(empresa), '') IS NOT NULL
  GROUP BY TRIM(empresa)
) first_client ON first_client.id = c.id;

INSERT IGNORE INTO cliente_empresas (nombre)
SELECT DISTINCT TRIM(empresa)
FROM presupuestos
WHERE NULLIF(TRIM(empresa), '') IS NOT NULL;

SET @ddl := IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
   WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'cliente_sucursales' AND COLUMN_NAME = 'empresa_id') = 0,
  'ALTER TABLE cliente_sucursales ADD COLUMN empresa_id INT NULL',
  'SELECT 1'
);
PREPARE stmt FROM @ddl;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @ddl := IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
   WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'clientes' AND COLUMN_NAME = 'empresa_id') = 0,
  'ALTER TABLE clientes ADD COLUMN empresa_id INT NULL',
  'SELECT 1'
);
PREPARE stmt FROM @ddl;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @ddl := IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
   WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'presupuestos' AND COLUMN_NAME = 'empresa_id') = 0,
  'ALTER TABLE presupuestos ADD COLUMN empresa_id INT NULL',
  'SELECT 1'
);
PREPARE stmt FROM @ddl;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

UPDATE cliente_sucursales s
INNER JOIN cliente_empresas e
  ON CONVERT(TRIM(e.nombre) USING utf8mb4) COLLATE utf8mb4_unicode_ci =
     CONVERT(TRIM(s.empresa) USING utf8mb4) COLLATE utf8mb4_unicode_ci
SET s.empresa_id = e.id;

UPDATE clientes c
INNER JOIN cliente_empresas e
  ON CONVERT(TRIM(e.nombre) USING utf8mb4) COLLATE utf8mb4_unicode_ci =
     CONVERT(TRIM(c.empresa) USING utf8mb4) COLLATE utf8mb4_unicode_ci
SET c.empresa_id = e.id,
    c.rfc = e.rfc,
    c.direccion = e.direccion,
    c.uso_cfdi = e.uso_cfdi,
    c.valor_venta = e.valor_venta,
    c.condiciones_pago = e.condiciones_pago,
    c.dias_credito = e.dias_credito,
    c.notas = e.notas;

UPDATE presupuestos p
INNER JOIN cliente_empresas e
  ON CONVERT(TRIM(e.nombre) USING utf8mb4) COLLATE utf8mb4_unicode_ci =
     CONVERT(TRIM(p.empresa) USING utf8mb4) COLLATE utf8mb4_unicode_ci
SET p.empresa_id = e.id;
