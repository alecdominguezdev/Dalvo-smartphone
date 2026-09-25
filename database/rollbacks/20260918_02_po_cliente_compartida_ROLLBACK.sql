ALTER TABLE presupuesto_po_cliente
  DROP FOREIGN KEY fk_presupuesto_po_compartida,
  DROP INDEX idx_presupuesto_po_compartida,
  DROP COLUMN monto_asignado,
  DROP COLUMN po_compartida_id;

DROP TABLE IF EXISTS po_cliente_compartidas;
