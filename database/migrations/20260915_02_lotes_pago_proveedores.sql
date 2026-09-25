-- Amplía los lotes para incluir cuentas OCP de proveedores.
ALTER TABLE lotes_pago_comisiones_items MODIFY COLUMN comision_id INT NULL;

SET @ddl := IF((SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'lotes_pago_comisiones_items' AND COLUMN_NAME = 'tipo_origen') = 0,
  'ALTER TABLE lotes_pago_comisiones_items ADD COLUMN tipo_origen VARCHAR(20) NOT NULL DEFAULT ''OCCOM'' AFTER cuenta_id', 'SELECT 1');
PREPARE stmt FROM @ddl;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @ddl := IF((SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'lotes_pago_comisiones_items' AND COLUMN_NAME = 'ocp_id') = 0,
  'ALTER TABLE lotes_pago_comisiones_items ADD COLUMN ocp_id INT NULL AFTER tipo_origen', 'SELECT 1');
PREPARE stmt FROM @ddl;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @ddl := IF((SELECT COUNT(*) FROM INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'lotes_pago_comisiones_items' AND INDEX_NAME = 'uq_lotes_pago_items_ocp') = 0,
  'ALTER TABLE lotes_pago_comisiones_items ADD UNIQUE KEY uq_lotes_pago_items_ocp (ocp_id)', 'SELECT 1');
PREPARE stmt FROM @ddl;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

UPDATE lotes_pago_comisiones_items SET tipo_origen = 'OCCOM' WHERE comision_id IS NOT NULL;
