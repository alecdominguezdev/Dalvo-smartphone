-- DALVO SYSTEM
-- 2026-09-19
-- Separa el pago recibido del cierre documental del cobro consolidado.
-- Un lote con el importe totalmente pagado queda pendiente hasta que todas
-- sus cuentas tengan complemento de pago.

UPDATE lotes_cobro_clientes lote
SET lote.estado = CASE
  WHEN NOT EXISTS (
    SELECT 1
    FROM lotes_cobro_clientes_items item
    WHERE item.lote_id = lote.id
      AND NOT EXISTS (
        SELECT 1
        FROM cuentas_por_cobrar_archivos archivo
        WHERE archivo.cuenta_id = item.cuenta_id
          AND archivo.tipo = 'Complemento de pago'
      )
  ) THEN 'Completado'
  ELSE 'Pendiente complemento'
END,
lote.pdf_ruta = ''
WHERE LOWER(TRIM(lote.estado)) = 'cobrado';

-- Corrige también las cuentas que ya tenían el pago completo registrado, pero
-- que todavía no contaban con complemento.
UPDATE cuentas_por_cobrar cuenta
SET cuenta.estado = 'Comprobante de pago cargado',
    cuenta.pendiente = 'Cargar complemento de pago',
    cuenta.updated_at = CURRENT_TIMESTAMP
WHERE EXISTS (
    SELECT 1
    FROM cuentas_por_cobrar_pagos pago
    WHERE pago.cuenta_id = cuenta.id
  )
  AND COALESCE((
    SELECT SUM(pago.monto)
    FROM cuentas_por_cobrar_pagos pago
    WHERE pago.cuenta_id = cuenta.id
  ), 0) + 0.004 >= COALESCE((
    SELECT item.monto_cobrar
    FROM lotes_cobro_clientes_items item
    WHERE item.cuenta_id = cuenta.id
    LIMIT 1
  ), cuenta.monto, 0)
  AND NOT EXISTS (
    SELECT 1
    FROM cuentas_por_cobrar_archivos archivo
    WHERE archivo.cuenta_id = cuenta.id
      AND archivo.tipo = 'Complemento de pago'
  )
  AND EXISTS (
    SELECT 1
    FROM lotes_cobro_clientes_items item
    WHERE item.cuenta_id = cuenta.id
  );
