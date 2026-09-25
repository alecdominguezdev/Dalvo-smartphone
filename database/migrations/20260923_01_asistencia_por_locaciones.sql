CREATE TABLE IF NOT EXISTS asistencia_ubicaciones (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(191) NOT NULL,
  latitud DECIMAL(10,7) NOT NULL,
  longitud DECIMAL(10,7) NOT NULL,
  radio_metros INT UNSIGNED NOT NULL DEFAULT 300,
  activo TINYINT(1) NOT NULL DEFAULT 1,
  created_by INT NULL,
  updated_by INT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_asistencia_ubicaciones_activo (activo, nombre),
  KEY idx_asistencia_ubicaciones_coordenadas (latitud, longitud)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS asistencia_ubicacion_usuarios (
  ubicacion_id BIGINT UNSIGNED NOT NULL,
  usuario_id INT NOT NULL,
  assigned_by INT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (ubicacion_id, usuario_id),
  KEY idx_asistencia_ubicacion_usuarios_usuario (usuario_id, ubicacion_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS asistencia_registros (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  ubicacion_id BIGINT UNSIGNED NOT NULL,
  usuario_id INT NOT NULL,
  evento ENUM('ENTRADA','SALIDA') NOT NULL,
  latitud DECIMAL(10,7) NOT NULL,
  longitud DECIMAL(10,7) NOT NULL,
  precision_metros DECIMAL(10,2) NULL,
  distancia_metros DECIMAL(10,2) NOT NULL,
  dentro_geocerca TINYINT(1) NOT NULL DEFAULT 1,
  metodo_biometrico VARCHAR(40) NULL,
  biometria_confirmada TINYINT(1) NOT NULL DEFAULT 0,
  device_id VARCHAR(191) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_asistencia_registros_usuario_fecha (usuario_id, created_at),
  KEY idx_asistencia_registros_ubicacion_fecha (ubicacion_id, created_at),
  KEY idx_asistencia_registros_evento (evento, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
