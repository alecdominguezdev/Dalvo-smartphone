DELETE l FROM lotes_pago_comisiones l
INNER JOIN lotes_pago_comisiones_items i ON i.lote_id = l.id
WHERE i.tipo_origen = 'OCGF';
ALTER TABLE lotes_pago_comisiones_items DROP INDEX uq_lotes_pago_items_ocgf;
ALTER TABLE lotes_pago_comisiones_items DROP COLUMN ocgf_order_id;
