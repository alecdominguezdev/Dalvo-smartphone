CREATE TABLE IF NOT EXISTS empresa_ubicaciones_movil (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  clave VARCHAR(80) NOT NULL,
  empresa_id INT NOT NULL,
  sucursal_id INT NULL,
  nombre VARCHAR(191) NOT NULL,
  latitud DECIMAL(10,7) NOT NULL,
  longitud DECIMAL(10,7) NOT NULL,
  radio_metros INT NOT NULL DEFAULT 300,
  activo TINYINT(1) NOT NULL DEFAULT 1,
  created_by INT NULL,
  updated_by INT NULL,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_empresa_ubicaciones_movil_clave (clave),
  KEY idx_empresa_ubicaciones_movil_empresa (empresa_id, activo),
  KEY idx_empresa_ubicaciones_movil_sucursal (sucursal_id, activo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
