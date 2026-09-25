ALTER TABLE cuentas_por_cobrar_archivos
  DROP FOREIGN KEY fk_cxc_archivos_lote_cobro,
  DROP INDEX idx_cxc_archivos_lote_cobro,
  DROP COLUMN lote_cobro_archivo_id;
