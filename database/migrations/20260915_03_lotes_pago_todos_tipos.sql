-- Amplía los lotes para incluir órdenes de compra de gastos fijos (OCGF).
SET @ddl := IF((SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'lotes_pago_comisiones_items' AND COLUMN_NAME = 'ocgf_order_id') = 0,
  'ALTER TABLE lotes_pago_comisiones_items ADD COLUMN ocgf_order_id INT NULL AFTER ocp_id', 'SELECT 1');
PREPARE stmt FROM @ddl;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @ddl := IF((SELECT COUNT(*) FROM INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'lotes_pago_comisiones_items' AND INDEX_NAME = 'uq_lotes_pago_items_ocgf') = 0,
  'ALTER TABLE lotes_pago_comisiones_items ADD UNIQUE KEY uq_lotes_pago_items_ocgf (ocgf_order_id)', 'SELECT 1');
PREPARE stmt FROM @ddl;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
