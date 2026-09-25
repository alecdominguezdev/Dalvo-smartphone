-- DALVO SYSTEM
-- 2026-09-11
-- Permisos independientes por sucursal y módulo.
-- Asignación inicial: Carlos Villalba y Jaime Mejía en HONDA DE MEXICO / GTO.


CREATE TABLE IF NOT EXISTS usuarios_sucursales (
  usuario_id INT NOT NULL,
  sucursal_id INT NOT NULL,
  nivel_acceso VARCHAR(20) NOT NULL DEFAULT 'modular',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (usuario_id, sucursal_id),
  INDEX idx_usuarios_sucursales_sucursal (sucursal_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS usuarios_sucursales_permisos (
  usuario_id INT NOT NULL,
  sucursal_id INT NOT NULL,
  permiso_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (usuario_id, sucursal_id, permiso_id),
  INDEX idx_usp_sucursal_permiso (sucursal_id, permiso_id),
  INDEX idx_usp_usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Asegura que el catálogo contenga todos los permisos que se asignarán.
INSERT INTO permisos (nombre, descripcion)
SELECT seed.nombre, seed.descripcion
FROM (
  SELECT 'modulo:presupuesto' nombre, 'Presupuesto' descripcion UNION ALL
  SELECT 'modulo:compras', 'Compras' UNION ALL
  SELECT 'modulo:cuentas-cobrar', 'Cuentas por cobrar' UNION ALL
  SELECT 'modulo:cuentas-pagar', 'Cuentas por pagar' UNION ALL
  SELECT 'modulo:comisiones', 'Comisiones' UNION ALL
  SELECT 'modulo:tareas', 'Tareas' UNION ALL
  SELECT 'modulo:reportes', 'Reportes' UNION ALL
  SELECT 'accion:editar', 'Editar registros' UNION ALL
  SELECT 'accion:subir-archivos', 'Subir archivos' UNION ALL
  SELECT 'accion:eliminar-archivos', 'Eliminar archivos' UNION ALL
  SELECT 'accion:facturar', 'Mandar a facturar' UNION ALL
  SELECT 'accion:pagar', 'Marcar pagos' UNION ALL
  SELECT 'accion:generar-comisiones', 'Generar comisiones'
) seed
WHERE NOT EXISTS (
  SELECT 1 FROM permisos p WHERE p.nombre = seed.nombre
);

-- Asigna Honda/GTO sin depender de IDs fijos.
INSERT INTO usuarios_sucursales (usuario_id, sucursal_id, nivel_acceso)
SELECT u.user_id, s.id, 'modular'
FROM usuarios u
INNER JOIN cliente_sucursales s
  ON UPPER(TRIM(s.empresa)) = 'HONDA DE MEXICO'
 AND UPPER(TRIM(s.nombre)) IN ('GTO', 'GUANAJUATO', 'CELAYA')
WHERE LOWER(TRIM(u.usuario)) IN ('jmejia', 'cvillalba')
  AND u.activo = 1
  AND s.activo = 1
ON DUPLICATE KEY UPDATE nivel_acceso = 'modular', updated_at = CURRENT_TIMESTAMP;

-- Control operativo amplio de Honda, sin otorgar eliminación de registros,
-- aprobación global ni privilegios de superadmin.
INSERT IGNORE INTO usuarios_sucursales_permisos (usuario_id, sucursal_id, permiso_id)
SELECT us.usuario_id, us.sucursal_id, p.id
FROM usuarios_sucursales us
INNER JOIN usuarios u ON u.user_id = us.usuario_id
INNER JOIN cliente_sucursales s ON s.id = us.sucursal_id
INNER JOIN permisos p ON p.nombre IN (
  'modulo:presupuesto',
  'modulo:compras',
  'modulo:cuentas-cobrar',
  'modulo:cuentas-pagar',
  'modulo:comisiones',
  'modulo:tareas',
  'modulo:reportes',
  'accion:editar',
  'accion:subir-archivos',
  'accion:eliminar-archivos',
  'accion:facturar',
  'accion:pagar',
  'accion:generar-comisiones'
)
WHERE LOWER(TRIM(u.usuario)) IN ('jmejia', 'cvillalba')
  AND UPPER(TRIM(s.empresa)) = 'HONDA DE MEXICO'
  AND UPPER(TRIM(s.nombre)) IN ('GTO', 'GUANAJUATO', 'CELAYA');

-- Verificación:
-- SELECT u.usuario, s.empresa, s.nombre sucursal, p.nombre permiso
-- FROM usuarios_sucursales_permisos usp
-- INNER JOIN usuarios u ON u.user_id = usp.usuario_id
-- INNER JOIN cliente_sucursales s ON s.id = usp.sucursal_id
-- INNER JOIN permisos p ON p.id = usp.permiso_id
-- WHERE LOWER(u.usuario) IN ('jmejia','cvillalba')
-- ORDER BY u.usuario, p.nombre;
