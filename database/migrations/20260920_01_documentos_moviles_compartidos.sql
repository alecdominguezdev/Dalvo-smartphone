-- DALVO SYSTEM - Pruebas
-- Auditoría para documentos recibidos desde Compartir, galería, cámara o archivos.

CREATE TABLE IF NOT EXISTS mobile_document_assignments (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  destino_tipo ENUM('PROJECT', 'PAYABLE', 'RECEIVABLE') NOT NULL,
  destino_id INT NOT NULL,
  presupuesto_id INT NULL,
  tabla_archivo VARCHAR(80) NOT NULL,
  archivo_id INT NOT NULL,
  tipo_documento VARCHAR(80) NOT NULL,
  detalle VARCHAR(500) NOT NULL DEFAULT '',
  monto DECIMAL(14,2) NULL,
  monto_aplicado DECIMAL(14,2) NULL,
  incluye_iva TINYINT(1) NOT NULL DEFAULT 0,
  origen VARCHAR(40) NOT NULL DEFAULT 'archivo',
  nombre_original VARCHAR(260) NOT NULL,
  ruta VARCHAR(360) NOT NULL,
  mime_type VARCHAR(160) NOT NULL DEFAULT 'application/octet-stream',
  size_bytes BIGINT UNSIGNED NOT NULL DEFAULT 0,
  sha256 CHAR(64) NOT NULL,
  usuario_id INT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_mobile_doc_destino (destino_tipo, destino_id, created_at),
  KEY idx_mobile_doc_presupuesto (presupuesto_id, created_at),
  KEY idx_mobile_doc_usuario (usuario_id, created_at),
  KEY idx_mobile_doc_hash (sha256)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
