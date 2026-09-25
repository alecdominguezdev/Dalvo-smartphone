-- DALVO System
-- Supervisión móvil de proyectos
-- Crea únicamente tablas nuevas; no modifica tablas operativas existentes.

CREATE TABLE IF NOT EXISTS mobile_sessions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  token_hash CHAR(64) NOT NULL,
  device_id VARCHAR(191) NULL,
  device_name VARCHAR(191) NULL,
  platform VARCHAR(40) NULL,
  expires_at DATETIME NOT NULL,
  last_used_at DATETIME NULL,
  revoked_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_mobile_sessions_token_hash (token_hash),
  KEY idx_mobile_sessions_usuario (usuario_id),
  KEY idx_mobile_sessions_expires (expires_at),
  KEY idx_mobile_sessions_revoked (revoked_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS proyecto_supervision_ubicaciones (
  presupuesto_id INT NOT NULL,
  nombre_ubicacion VARCHAR(191) NULL,
  latitud DECIMAL(10,7) NOT NULL,
  longitud DECIMAL(10,7) NOT NULL,
  radio_metros INT UNSIGNED NOT NULL DEFAULT 150,
  updated_by INT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (presupuesto_id),
  KEY idx_supervision_ubicacion_updated_by (updated_by)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS proyecto_reportes_supervision (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  presupuesto_id INT NOT NULL,
  supervisor_id INT NOT NULL,
  fecha_visita DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  porcentaje_avance DECIMAL(5,2) NULL,
  trabajos_realizados TEXT NULL,
  pendientes TEXT NULL,
  percances TEXT NULL,
  observaciones TEXT NULL,
  informacion_incompleta TINYINT(1) NOT NULL DEFAULT 0,
  detalle_informacion_faltante TEXT NULL,
  latitud DECIMAL(10,7) NULL,
  longitud DECIMAL(10,7) NULL,
  precision_metros DECIMAL(10,2) NULL,
  estado VARCHAR(40) NOT NULL DEFAULT 'BORRADOR',
  submitted_at DATETIME NULL,
  reviewed_at DATETIME NULL,
  reviewed_by INT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_reportes_supervision_proyecto (presupuesto_id, created_at),
  KEY idx_reportes_supervision_supervisor (supervisor_id, created_at),
  KEY idx_reportes_supervision_estado (estado),
  KEY idx_reportes_supervision_submitted (submitted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS proyecto_reportes_supervision_archivos (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  reporte_id BIGINT UNSIGNED NOT NULL,
  usuario_id INT NOT NULL,
  tipo VARCHAR(30) NOT NULL DEFAULT 'FOTO',
  nombre_original VARCHAR(255) NOT NULL,
  nombre_guardado VARCHAR(255) NOT NULL,
  ruta VARCHAR(600) NOT NULL,
  mime_type VARCHAR(120) NULL,
  size_bytes BIGINT UNSIGNED NOT NULL DEFAULT 0,
  sha256 CHAR(64) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_reporte_archivos_reporte (reporte_id, created_at),
  KEY idx_reporte_archivos_usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS proyecto_supervision_asistencias (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  presupuesto_id INT NOT NULL,
  supervisor_id INT NOT NULL,
  evento VARCHAR(20) NOT NULL,
  latitud DECIMAL(10,7) NOT NULL,
  longitud DECIMAL(10,7) NOT NULL,
  precision_metros DECIMAL(10,2) NULL,
  distancia_proyecto_metros DECIMAL(10,2) NULL,
  dentro_geocerca TINYINT(1) NULL,
  metodo_biometrico VARCHAR(40) NOT NULL,
  biometria_confirmada TINYINT(1) NOT NULL DEFAULT 1,
  device_id VARCHAR(191) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_asistencias_proyecto_supervisor (presupuesto_id, supervisor_id, created_at),
  KEY idx_asistencias_supervisor (supervisor_id, created_at),
  KEY idx_asistencias_evento (evento)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
