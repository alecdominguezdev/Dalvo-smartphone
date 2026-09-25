-- DALVO SYSTEM
-- 2026-09-19
-- Vincula los documentos generales del cobro consolidado con las copias
-- creadas en cada cuenta por cobrar, para permitir su eliminación segura.

ALTER TABLE cuentas_por_cobrar_archivos
  ADD COLUMN lote_cobro_archivo_id INT NULL AFTER facturacion_id,
  ADD INDEX idx_cxc_archivos_lote_cobro (lote_cobro_archivo_id),
  ADD CONSTRAINT fk_cxc_archivos_lote_cobro
    FOREIGN KEY (lote_cobro_archivo_id)
    REFERENCES lotes_cobro_clientes_archivos(id)
    ON DELETE SET NULL;

-- Recupera los vínculos de documentos creados por la versión inmediata
-- anterior. Se limita al mismo lote, tipo, nombre y una ventana corta de
-- creación para no tocar documentos independientes del proyecto.
UPDATE cuentas_por_cobrar_archivos archivo
INNER JOIN lotes_cobro_clientes_items item
  ON item.cuenta_id = archivo.cuenta_id
INNER JOIN lotes_cobro_clientes_archivos general
  ON general.lote_id = item.lote_id
 AND (general.item_id IS NULL OR general.item_id = item.id)
 AND general.tipo = archivo.tipo
 AND general.nombre = archivo.nombre
 AND ABS(TIMESTAMPDIFF(SECOND, general.created_at, archivo.created_at)) <= 300
SET archivo.lote_cobro_archivo_id = general.id
WHERE archivo.lote_cobro_archivo_id IS NULL;

-- Fuerza la regeneración del PDF con el formato corregido la próxima vez que
-- se abra o descargue cada cotización consolidada.
UPDATE lotes_cobro_clientes SET pdf_ruta = '';
