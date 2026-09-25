CREATE TABLE IF NOT EXISTS gasto_reasignaciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo_documento VARCHAR(12) NOT NULL,
  registro_id INT NOT NULL,
  folio VARCHAR(60) NOT NULL DEFAULT '',
  origen_tipo VARCHAR(24) NOT NULL,
  origen_id INT NOT NULL,
  origen_referencia VARCHAR(280) NOT NULL DEFAULT '',
  destino_tipo VARCHAR(24) NOT NULL,
  destino_id INT NOT NULL,
  destino_referencia VARCHAR(280) NOT NULL DEFAULT '',
  motivo VARCHAR(500) NOT NULL DEFAULT '',
  usuario_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_gasto_reasignaciones_documento (tipo_documento, registro_id),
  INDEX idx_gasto_reasignaciones_fecha (created_at),
  INDEX idx_gasto_reasignaciones_usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
