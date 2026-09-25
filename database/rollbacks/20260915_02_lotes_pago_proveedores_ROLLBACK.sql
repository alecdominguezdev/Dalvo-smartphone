DELETE l FROM lotes_pago_comisiones l
INNER JOIN lotes_pago_comisiones_items i ON i.lote_id = l.id
WHERE i.tipo_origen = 'OCP';
ALTER TABLE lotes_pago_comisiones_items DROP INDEX uq_lotes_pago_items_ocp;
ALTER TABLE lotes_pago_comisiones_items DROP COLUMN ocp_id;
ALTER TABLE lotes_pago_comisiones_items DROP COLUMN tipo_origen;
ALTER TABLE lotes_pago_comisiones_items MODIFY COLUMN comision_id INT NOT NULL;
