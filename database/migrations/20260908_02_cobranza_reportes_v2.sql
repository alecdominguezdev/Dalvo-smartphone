-- DALVO SYSTEM - Corrección V2 de cobranza / exportaciones
-- Conserva los eventos de pago para monto/fecha real, pero restaura el estado
-- histórico de los siete proyectos del caso del video.

UPDATE cuentas_por_cobrar c
INNER JOIN presupuestos p ON p.id = c.presupuesto_id
SET c.estado = 'Pago completo',
    c.pendiente = 'Sin pendientes de documentación'
WHERE p.folio IN (
  'DLV260292','DLV260414','DLV260400','DLV260358',
  'DLV260320','DLV260266','DLV260006'
);

-- La migración V1 marcó algunas facturaciones históricas como Pagada al asociar
-- pagos recientes. En el respaldo original estas filas eran Facturada; se restaura
-- únicamente ese histórico conocido sin borrar eventos de cobro.
UPDATE cuentas_por_cobrar_facturacion f
INNER JOIN cuentas_por_cobrar c ON c.id = f.cuenta_id
INNER JOIN presupuestos p ON p.id = c.presupuesto_id
SET f.estado = 'Facturada'
WHERE p.folio IN (
  'DLV260292','DLV260414','DLV260400','DLV260358',
  'DLV260320','DLV260266','DLV260006'
)
AND f.observaciones = 'Registro previo a parcialidades';

SELECT p.folio, c.estado, c.pendiente
FROM cuentas_por_cobrar c
INNER JOIN presupuestos p ON p.id = c.presupuesto_id
WHERE p.folio IN (
  'DLV260292','DLV260414','DLV260400','DLV260358',
  'DLV260320','DLV260266','DLV260006'
)
ORDER BY p.folio;
