-- Rollback seguro: elimina únicamente la configuración Honda/GTO sembrada
-- para Carlos Villalba y Jaime Mejía. No toca sus permisos globales.
START TRANSACTION;

DELETE usp
FROM usuarios_sucursales_permisos usp
INNER JOIN usuarios u ON u.user_id = usp.usuario_id
INNER JOIN cliente_sucursales s ON s.id = usp.sucursal_id
WHERE LOWER(TRIM(u.usuario)) IN ('jmejia', 'cvillalba')
  AND UPPER(TRIM(s.empresa)) = 'HONDA DE MEXICO'
  AND UPPER(TRIM(s.nombre)) IN ('GTO', 'GUANAJUATO', 'CELAYA');

DELETE us
FROM usuarios_sucursales us
INNER JOIN usuarios u ON u.user_id = us.usuario_id
INNER JOIN cliente_sucursales s ON s.id = us.sucursal_id
WHERE LOWER(TRIM(u.usuario)) IN ('jmejia', 'cvillalba')
  AND UPPER(TRIM(s.empresa)) = 'HONDA DE MEXICO'
  AND UPPER(TRIM(s.nombre)) IN ('GTO', 'GUANAJUATO', 'CELAYA');

COMMIT;
