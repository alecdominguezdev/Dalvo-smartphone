-- DALVO SYSTEM
-- Corrección de cobros parciales / reportes de cobranza
-- 2026-09-08
--
-- Objetivo:
-- 1) Separar el monto facturado del monto realmente cobrado.
-- 2) Registrar cada comprobante de pago como un evento de cobro.
-- 3) Precargar los cobros del caso mostrado en el video sin volver a subir archivos.
--
-- Importes de cuentas por cobrar se guardan SIN IVA, igual que los reportes del sistema.

SET @db_name := DATABASE();

-- Relaciona los XML/PDF de factura nuevos con su parcialidad de facturación.
SET @has_facturacion_id := (
  SELECT COUNT(*)
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = @db_name
    AND TABLE_NAME = 'cuentas_por_cobrar_archivos'
    AND COLUMN_NAME = 'facturacion_id'
);
SET @sql := IF(
  @has_facturacion_id = 0,
  'ALTER TABLE cuentas_por_cobrar_archivos ADD COLUMN facturacion_id INT NULL AFTER usuario_id',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

CREATE TABLE IF NOT EXISTS cuentas_por_cobrar_pagos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cuenta_id INT NOT NULL,
  archivo_id INT NULL,
  facturacion_id INT NULL,
  monto DECIMAL(14,2) NOT NULL DEFAULT 0,
  fecha_pago DATE NULL,
  referencia VARCHAR(260) NOT NULL DEFAULT '',
  usuario_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_cxc_pagos_archivo (archivo_id),
  INDEX idx_cxc_pagos_cuenta (cuenta_id),
  INDEX idx_cxc_pagos_fecha (fecha_pago),
  INDEX idx_cxc_pagos_facturacion (facturacion_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Helper de migración: toma la primera parcialidad activa existente para el proyecto.
-- En estos registros históricos la tabla de parcialidades fue rellenada con el monto total,
-- por eso varios cobros pueden apuntar al mismo movimiento.

-- DLV260006: cobro histórico anterior a septiembre = 116,950.00 sin IVA.
INSERT INTO cuentas_por_cobrar_pagos
  (cuenta_id, archivo_id, facturacion_id, monto, fecha_pago, referencia, usuario_id)
SELECT
  c.id,
  a.id,
  (SELECT MIN(f.id) FROM cuentas_por_cobrar_facturacion f WHERE f.cuenta_id = c.id AND LOWER(TRIM(f.estado)) <> 'cancelada'),
  116950.00,
  '2026-05-30',
  'HIST-DLV260006-20260530',
  c.usuario_id
FROM cuentas_por_cobrar c
INNER JOIN presupuestos p ON p.id = c.presupuesto_id
INNER JOIN cuentas_por_cobrar_archivos a ON a.cuenta_id = c.id
WHERE p.folio = 'DLV260006'
  AND a.tipo = 'Comprobante de pago'
  AND a.nombre = 'relacion para GR.xlsm'
ORDER BY a.id ASC
LIMIT 1
ON DUPLICATE KEY UPDATE
  monto = VALUES(monto), fecha_pago = VALUES(fecha_pago), referencia = VALUES(referencia), facturacion_id = VALUES(facturacion_id);

-- Pago BMW 4100013228 - FechaPago real: 2026-09-02.
INSERT INTO cuentas_por_cobrar_pagos
  (cuenta_id, archivo_id, facturacion_id, monto, fecha_pago, referencia, usuario_id)
SELECT c.id, a.id,
       (SELECT MIN(f.id) FROM cuentas_por_cobrar_facturacion f WHERE f.cuenta_id = c.id AND LOWER(TRIM(f.estado)) <> 'cancelada'),
       x.monto, '2026-09-02', '4100013228', c.usuario_id
FROM (
  SELECT 'DLV260266' AS folio, 97517.64 AS monto
  UNION ALL SELECT 'DLV260400', 77500.00
  UNION ALL SELECT 'DLV260320', 77341.30
) x
INNER JOIN presupuestos p ON p.folio = x.folio
INNER JOIN cuentas_por_cobrar c ON c.presupuesto_id = p.id
INNER JOIN cuentas_por_cobrar_archivos a
  ON a.cuenta_id = c.id
 AND a.tipo = 'Comprobante de pago'
 AND a.nombre = 'File_41000132282026.xml'
ON DUPLICATE KEY UPDATE
  monto = VALUES(monto), fecha_pago = VALUES(fecha_pago), referencia = VALUES(referencia), facturacion_id = VALUES(facturacion_id);

-- Pago BMW 4100013516 - FechaPago real: 2026-09-07.
INSERT INTO cuentas_por_cobrar_pagos
  (cuenta_id, archivo_id, facturacion_id, monto, fecha_pago, referencia, usuario_id)
SELECT c.id, a.id,
       (SELECT MIN(f.id) FROM cuentas_por_cobrar_facturacion f WHERE f.cuenta_id = c.id AND LOWER(TRIM(f.estado)) <> 'cancelada'),
       x.monto, '2026-09-07', '4100013516', c.usuario_id
FROM (
  SELECT 'DLV260358' AS folio, 91822.50 AS monto
  UNION ALL SELECT 'DLV260414', 24500.00
  UNION ALL SELECT 'DLV260292', 91682.60
  UNION ALL SELECT 'DLV260006', 113950.00
) x
INNER JOIN presupuestos p ON p.folio = x.folio
INNER JOIN cuentas_por_cobrar c ON c.presupuesto_id = p.id
INNER JOIN cuentas_por_cobrar_archivos a
  ON a.cuenta_id = c.id
 AND a.tipo = 'Comprobante de pago'
 AND a.nombre = 'File_41000135162026.xml'
ON DUPLICATE KEY UPDATE
  monto = VALUES(monto), fecha_pago = VALUES(fecha_pago), referencia = VALUES(referencia), facturacion_id = VALUES(facturacion_id);

-- Marca una parcialidad como pagada solo cuando la suma de sus cobros cubre su monto.
UPDATE cuentas_por_cobrar_facturacion f
LEFT JOIN (
  SELECT facturacion_id, ROUND(SUM(monto), 2) AS pagado
  FROM cuentas_por_cobrar_pagos
  WHERE facturacion_id IS NOT NULL
  GROUP BY facturacion_id
) pg ON pg.facturacion_id = f.id
SET f.estado = CASE
  WHEN COALESCE(pg.pagado, 0) + 0.004 >= f.monto THEN 'Pagada'
  WHEN LOWER(TRIM(f.estado)) = 'pagada' THEN 'Facturada'
  ELSE f.estado
END,
f.updated_at = NOW()
WHERE pg.facturacion_id IS NOT NULL;

-- Verificación del caso del video.
-- Esperado para 2026-09-01 a 2026-09-08: 7 movimientos y $574,314.04 SIN IVA.
SELECT
  COUNT(*) AS movimientos_septiembre,
  ROUND(SUM(pg.monto), 2) AS cobrado_sin_iva
FROM cuentas_por_cobrar_pagos pg
WHERE pg.fecha_pago BETWEEN '2026-09-01' AND '2026-09-08';

-- Referencias BMW del video: bruto con IVA = $666,204.29.
SELECT
  pg.referencia,
  pg.fecha_pago,
  COUNT(*) AS movimientos,
  ROUND(SUM(pg.monto), 2) AS subtotal_sin_iva,
  ROUND(SUM(pg.monto) * 1.16, 2) AS total_con_iva_referencia
FROM cuentas_por_cobrar_pagos pg
WHERE pg.referencia IN ('4100013228', '4100013516')
GROUP BY pg.referencia, pg.fecha_pago
ORDER BY pg.fecha_pago;
