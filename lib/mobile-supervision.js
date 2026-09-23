const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const MOBILE_SESSION_DAYS = 30;
const MAX_PHOTO_BYTES = 12 * 1024 * 1024;
const MAX_PHOTOS_PER_REQUEST = 10;
const MAX_DOCUMENT_BYTES = 25 * 1024 * 1024;
const MAX_DOCUMENTS_PER_REQUEST = 20;

function registerMobileSupervisionRoutes(options = {}) {
  const {
    app,
    pool,
    projectRoot,
    getAuthTable,
    comparePassword,
    isActive,
    publicUser,
    resolveSessionRole,
    hydrateSessionBranchAccess,
    appendBudgetOwnerCondition,
    canAccessBudget,
    escapeId,
    checkLoginLimit,
    recordLoginFailure,
    clearLoginFailures,
    logServerError,
    generateClientQuotePdf
  } = options;

  if (!app || !pool) throw new Error('registerMobileSupervisionRoutes requiere app y pool.');

  const rootDir = projectRoot || process.cwd();
  const uploadRoot = path.join(rootDir, 'uploads', 'supervision');
  const mobileDocumentRoot = path.join(rootDir, 'uploads', 'mobile-documents');
  fs.mkdirSync(uploadRoot, { recursive: true });
  fs.mkdirSync(mobileDocumentRoot, { recursive: true });

  const apiPrefix = '/api/mobile/v1';

  const asyncRoute = (handler) => (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };

  function normalizeRole(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLowerCase();
  }

  function isMobileAllowedRole(user) {
    return ['compras', 'supervisor', 'administracion', 'superadmin'].includes(normalizeRole(user?.role));
  }

  function isMobileAdmin(user) {
    return ['administracion', 'superadmin'].includes(normalizeRole(user?.role));
  }

  const MOBILE_MODULE_CATALOG = [
    { key: 'presupuesto', label: 'Presupuesto / Proyectos', permission: 'modulo:presupuesto', mobileAvailable: true },
    { key: 'reportes', label: 'Reportes', permission: 'modulo:reportes', mobileAvailable: true },
    { key: 'compras', label: 'Compras', permission: 'modulo:compras', mobileAvailable: true },
    { key: 'cuentas-pagar', label: 'Cuentas por pagar', permission: 'modulo:cuentas-pagar', mobileAvailable: true },
    { key: 'cuentas-cobrar', label: 'Cuentas por cobrar', permission: 'modulo:cuentas-cobrar', mobileAvailable: true },
    { key: 'inventario', label: 'Inventario', permission: 'modulo:inventario', mobileAvailable: false },
    { key: 'tareas', label: 'Tareas', permission: 'modulo:tareas', mobileAvailable: true },
    { key: 'exportaciones', label: 'Exportaciones', permission: 'modulo:exportaciones', mobileAvailable: true },
    { key: 'proveedores', label: 'Proveedores', permission: 'modulo:proveedores', mobileAvailable: false },
    { key: 'gastos-fijos', label: 'Gastos fijos', permission: 'modulo:gastos-fijos', mobileAvailable: false },
    { key: 'lista-precios', label: 'Lista de precios', permission: 'modulo:lista-precios', mobileAvailable: false },
    { key: 'nomina', label: 'Nómina', permission: 'modulo:nomina', mobileAvailable: false },
    { key: 'prestamos', label: 'Préstamos', permission: 'modulo:prestamos', mobileAvailable: false },
    { key: 'sucursales', label: 'Sucursales', permission: 'modulo:sucursales', mobileAvailable: false },
    { key: 'empresas', label: 'Empresas', permission: 'modulo:empresas', mobileAvailable: false }
  ];

  async function getMobileAccessProfile(user) {
    const userId = Number(user?.id || 0);
    if (!userId) {
      return { permissions: [], modules: [], branches: [], canUseSupervision: false };
    }

    const [permissionRows] = await pool.execute(
      `SELECT DISTINCT p.nombre
       FROM permisos p
       INNER JOIN (
         SELECT rp.permiso_id
           FROM usuarios u
           INNER JOIN roles_permisos rp ON rp.rol_id = u.rol_id
          WHERE u.user_id = ?
         UNION
         SELECT up.permiso_id
           FROM usuarios_permisos up
          WHERE up.usuario_id = ?
         UNION
         SELECT rp.permiso_id
           FROM usuarios_roles_extra ure
           INNER JOIN roles_permisos rp ON rp.rol_id = ure.rol_id
          WHERE ure.usuario_id = ?
         UNION
         SELECT rp.permiso_id
           FROM usuarios_roles_temporales urt
           INNER JOIN roles_permisos rp ON rp.rol_id = urt.rol_id
          WHERE urt.usuario_id = ?
         UNION
         SELECT usp.permiso_id
           FROM usuarios_sucursales_permisos usp
          WHERE usp.usuario_id = ?
       ) granted ON granted.permiso_id = p.id
       ORDER BY p.nombre`,
      [userId, userId, userId, userId, userId]
    );

    const permissions = [...new Set(permissionRows.map((row) => String(row.nombre || '')).filter(Boolean))];
    const permissionSet = new Set(permissions);
    const wildcard = permissionSet.has('modulo:*');
    const canUseSupervision = wildcard || permissionSet.has('modulo:presupuesto');

    const modules = MOBILE_MODULE_CATALOG.map((module) => ({
      ...module,
      allowed: wildcard || permissionSet.has(module.permission),
      mobileAvailable: module.mobileAvailable &&
        (!['presupuesto', 'reportes'].includes(module.key) || canUseSupervision)
    }));

    const [branchRows] = await pool.execute(
      `SELECT
         us.sucursal_id,
         s.empresa,
         s.nombre,
         us.nivel_acceso,
         GROUP_CONCAT(DISTINCT p.nombre ORDER BY p.nombre SEPARATOR '||') AS permisos
       FROM usuarios_sucursales us
       INNER JOIN cliente_sucursales s ON s.id = us.sucursal_id AND s.activo = 1
       LEFT JOIN usuarios_sucursales_permisos usp
         ON usp.usuario_id = us.usuario_id AND usp.sucursal_id = us.sucursal_id
       LEFT JOIN permisos p ON p.id = usp.permiso_id
       WHERE us.usuario_id = ?
       GROUP BY us.sucursal_id, s.empresa, s.nombre, us.nivel_acceso
       ORDER BY s.empresa, s.nombre`,
      [userId]
    );

    const branches = branchRows.map((row) => ({
      id: Number(row.sucursal_id),
      company: row.empresa || '',
      name: row.nombre || '',
      level: row.nivel_acceso || '',
      permissions: String(row.permisos || '')
        .split('||')
        .map((value) => value.trim())
        .filter(Boolean)
    }));

    return { permissions, modules, branches, canUseSupervision };
  }

  async function enrichMobileUser(user) {
    const userId = Number(user?.id || 0);
    if (!userId) return user;
    try {
      const [rows] = await pool.execute(
        `SELECT nombre, apellido
         FROM usuarios
         WHERE user_id = ?
         LIMIT 1`,
        [userId]
      );
      if (rows[0]) {
        const fullName = [rows[0].nombre, rows[0].apellido]
          .map((value) => String(value || '').trim())
          .filter(Boolean)
          .join(' ');
        if (fullName) user.name = fullName;
      }
    } catch (error) {
      if (!['ER_NO_SUCH_TABLE', 'ER_BAD_FIELD_ERROR'].includes(error?.code)) throw error;
    }
    return user;
  }

  function tokenHash(token) {
    return crypto.createHash('sha256').update(String(token || ''), 'utf8').digest('hex');
  }

  function makeToken() {
    return crypto.randomBytes(32).toString('hex');
  }

  function safeFilename(input) {
    const cleaned = String(input || 'foto.jpg')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9._-]/g, '_')
      .replace(/_+/g, '_')
      .slice(-120);
    return cleaned || 'foto.jpg';
  }

  function validLatitude(value) {
    const n = Number(value);
    return Number.isFinite(n) && n >= -90 && n <= 90;
  }

  function validLongitude(value) {
    const n = Number(value);
    return Number.isFinite(n) && n >= -180 && n <= 180;
  }

  function normalizeProgress(value) {
    if (value === '' || value === null || value === undefined) return null;
    const n = Number(value);
    if (!Number.isFinite(n)) return null;
    return Math.max(0, Math.min(100, n));
  }

  function toNullableNumber(value) {
    if (value === '' || value === null || value === undefined) return null;
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }

  function haversineMeters(lat1, lon1, lat2, lon2) {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const earthRadius = 6371000;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadius * c;
  }

  async function loadMobileUserById(userId) {
    const authConfig = await getAuthTable();
    if (!authConfig.idColumn) return null;
    const [rows] = await pool.execute(
      `SELECT * FROM ${escapeId(authConfig.table)} WHERE ${escapeId(authConfig.idColumn)} = ? LIMIT 1`,
      [userId]
    );
    const row = rows[0];
    if (!row) return null;
    if (authConfig.activeColumn && !isActive(row[authConfig.activeColumn])) return null;
    const user = publicUser(row, authConfig);
    user.role = await resolveSessionRole(row, authConfig);
    await hydrateSessionBranchAccess(user);
    await enrichMobileUser(user);
    return user;
  }

  async function requireMobileAuth(req, res, next) {
    try {
      const authHeader = String(req.headers.authorization || '');
      const match = authHeader.match(/^Bearer\s+(.+)$/i);
      if (!match) {
        return res.status(401).json({ ok: false, message: 'Sesión móvil no iniciada.' });
      }

      const hash = tokenHash(match[1]);
      const [rows] = await pool.execute(
        `SELECT id, usuario_id, device_id, expires_at
         FROM mobile_sessions
         WHERE token_hash = ?
           AND revoked_at IS NULL
           AND expires_at > NOW()
         LIMIT 1`,
        [hash]
      );

      const mobileSession = rows[0];
      if (!mobileSession) {
        return res.status(401).json({ ok: false, message: 'La sesión móvil expiró o fue cerrada.' });
      }

      const user = await loadMobileUserById(mobileSession.usuario_id);
      if (!user || !isMobileAllowedRole(user)) {
        return res.status(403).json({ ok: false, message: 'El usuario no tiene acceso al módulo móvil.' });
      }

      req.mobileUser = user;
      req.mobileSession = mobileSession;
      req.mobileTokenHash = hash;

      pool.execute('UPDATE mobile_sessions SET last_used_at = NOW() WHERE id = ?', [mobileSession.id])
        .catch((error) => logServerError?.('mobile-session-touch', error));

      return next();
    } catch (error) {
      logServerError?.('mobile-auth', error);
      return res.status(500).json({ ok: false, message: 'No se pudo validar la sesión móvil.' });
    }
  }

  async function ensureProjectAccess(user, projectId) {
    const numericId = Number(projectId || 0);
    if (!numericId) return false;
    return canAccessBudget(user, numericId, 'modulo:presupuesto', '');
  }

  async function getProject(projectId) {
    const [rows] = await pool.execute(
      `SELECT
         p.id,
         p.folio,
         p.empresa,
         p.titulo_proyecto,
         p.area,
         p.po,
         p.estado,
         p.estatus,
         p.usuario_id,
         p.sucursal_id,
         p.created_at,
         p.updated_at,
         COALESCE(NULLIF(CONCAT_WS(' ', u.nombre, u.apellido), ''), u.usuario, '') AS supervisor
       FROM presupuestos p
       LEFT JOIN usuarios u ON u.user_id = p.usuario_id
       WHERE p.id = ?
       LIMIT 1`,
      [projectId]
    );
    return rows[0] || null;
  }

  async function getProjectLocation(projectId) {
    const [rows] = await pool.execute(
      `SELECT presupuesto_id, nombre_ubicacion, latitud, longitud, radio_metros, updated_at
       FROM proyecto_supervision_ubicaciones
       WHERE presupuesto_id = ?
       LIMIT 1`,
      [projectId]
    );
    if (rows.length) {
      return {
        projectId: Number(rows[0].presupuesto_id),
        name: rows[0].nombre_ubicacion || '',
        latitude: Number(rows[0].latitud),
        longitude: Number(rows[0].longitud),
        radiusMeters: Number(rows[0].radio_metros || 150),
        source: 'PROJECT',
        updatedAt: rows[0].updated_at
      };
    }

    const [inheritedRows] = await pool.execute(
      `SELECT p.id AS presupuesto_id,
              l.id AS empresa_ubicacion_id,
              l.nombre AS nombre_ubicacion,
              l.latitud,
              l.longitud,
              l.radio_metros,
              l.updated_at
       FROM presupuestos p
       INNER JOIN empresa_ubicaciones_movil l
         ON l.empresa_id = p.empresa_id
        AND l.activo = 1
        AND (l.sucursal_id = p.sucursal_id OR l.sucursal_id IS NULL)
       WHERE p.id = ?
       ORDER BY CASE WHEN l.sucursal_id = p.sucursal_id THEN 0 ELSE 1 END, l.id DESC
       LIMIT 1`,
      [projectId]
    );
    if (!inheritedRows.length) return null;
    return {
      projectId: Number(inheritedRows[0].presupuesto_id),
      companyLocationId: Number(inheritedRows[0].empresa_ubicacion_id),
      name: inheritedRows[0].nombre_ubicacion || '',
      latitude: Number(inheritedRows[0].latitud),
      longitude: Number(inheritedRows[0].longitud),
      radiusMeters: Number(inheritedRows[0].radio_metros || 300),
      source: 'COMPANY',
      updatedAt: inheritedRows[0].updated_at
    };
  }

  async function getReport(reportId) {
    const [rows] = await pool.execute(
      `SELECT r.*
       FROM proyecto_reportes_supervision r
       WHERE r.id = ?
       LIMIT 1`,
      [reportId]
    );
    return rows[0] || null;
  }

  function canEditReport(user, report) {
    if (!user || !report) return false;
    if (isMobileAdmin(user)) return true;
    return Number(report.supervisor_id || 0) === Number(user.id || 0);
  }

  async function listReportFiles(reportId) {
    const [rows] = await pool.execute(
      `SELECT id, reporte_id, tipo, nombre_original, mime_type, size_bytes, created_at
       FROM proyecto_reportes_supervision_archivos
       WHERE reporte_id = ?
       ORDER BY id ASC`,
      [reportId]
    );
    return rows.map((row) => ({
      id: Number(row.id),
      reportId: Number(row.reporte_id),
      type: row.tipo,
      originalName: row.nombre_original,
      mimeType: row.mime_type,
      sizeBytes: Number(row.size_bytes || 0),
      createdAt: row.created_at,
      url: `${apiPrefix}/report-files/${row.id}`
    }));
  }

  const photoStorage = multer.diskStorage({
    destination: (req, _file, callback) => {
      const reportId = Number(req.params.reportId || 0);
      const dir = path.join(uploadRoot, String(reportId || 'sin_reporte'));
      try {
        fs.mkdirSync(dir, { recursive: true });
        callback(null, dir);
      } catch (error) {
        callback(error);
      }
    },
    filename: (_req, file, callback) => {
      const ext = path.extname(file.originalname || '').toLowerCase() || '.jpg';
      const base = safeFilename(path.basename(file.originalname || 'foto', path.extname(file.originalname || '')))
        .replace(/\.+$/g, '') || 'foto';
      callback(null, `${Date.now()}-${crypto.randomBytes(6).toString('hex')}-${base}${ext}`);
    }
  });

  const uploadPhotos = multer({
    storage: photoStorage,
    limits: { fileSize: MAX_PHOTO_BYTES, files: MAX_PHOTOS_PER_REQUEST },
    fileFilter: (_req, file, callback) => {
      const allowed = new Set([
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/heic',
        'image/heif'
      ]);
      if (!allowed.has(String(file.mimetype || '').toLowerCase())) {
        return callback(new Error('Solo se permiten imágenes JPG, PNG, WEBP, HEIC o HEIF.'));
      }
      callback(null, true);
    }
  });

  const documentStorage = multer.diskStorage({
    destination: (_req, _file, callback) => callback(null, mobileDocumentRoot),
    filename: (_req, file, callback) => {
      const ext = path.extname(file.originalname || '').toLowerCase();
      const base = safeFilename(path.basename(file.originalname || 'documento', ext))
        .replace(/\.+$/g, '') || 'documento';
      callback(null, `${Date.now()}-${crypto.randomBytes(8).toString('hex')}-${base}${ext}`);
    }
  });

  const uploadDocuments = multer({
    storage: documentStorage,
    limits: { fileSize: MAX_DOCUMENT_BYTES, files: MAX_DOCUMENTS_PER_REQUEST },
    fileFilter: (_req, file, callback) => {
      const allowedMime = new Set([
        'application/pdf',
        'application/xml',
        'text/xml',
        'text/plain',
        'text/csv',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/heic',
        'image/heif'
      ]);
      const allowedExt = new Set(['.pdf', '.xml', '.txt', '.csv', '.xls', '.xlsx', '.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif']);
      const mime = String(file.mimetype || '').toLowerCase();
      const ext = path.extname(file.originalname || '').toLowerCase();
      if (!allowedMime.has(mime) && !allowedExt.has(ext)) {
        return callback(new Error('Formato no permitido. Usa PDF, XML, Excel, CSV, texto o imagen.'));
      }
      callback(null, true);
    }
  });

  function removeUploadedDocuments(files) {
    for (const file of files || []) {
      if (file?.path) fs.promises.unlink(file.path).catch(() => {});
    }
  }

  function normalizeDocumentScope(value) {
    const scope = String(value || '').trim().toUpperCase();
    return ['PROJECT', 'PAYABLE', 'RECEIVABLE'].includes(scope) ? scope : '';
  }

  function parsePositiveMoney(value) {
    const amount = Number(String(value ?? '').replace(/[$,\s]/g, ''));
    return Number.isFinite(amount) && amount > 0 ? Math.round(amount * 100) / 100 : null;
  }

  async function hasModulePermission(user, permission) {
    if (isMobileAdmin(user) && normalizeRole(user?.role) === 'superadmin') return true;
    const access = await getMobileAccessProfile(user);
    return access.permissions.includes('modulo:*') || access.permissions.includes(permission);
  }

  async function resolveDocumentTarget(user, scope, targetId) {
    const id = Number(targetId || 0);
    if (!id) return null;
    if (scope === 'PROJECT') {
      if (!(await ensureProjectAccess(user, id))) return null;
      const project = await getProject(id);
      return project ? { id, projectId: id, project } : null;
    }

    const table = scope === 'PAYABLE' ? 'cuentas_por_pagar' : 'cuentas_por_cobrar';
    const permission = scope === 'PAYABLE' ? 'modulo:cuentas-pagar' : 'modulo:cuentas-cobrar';
    if (!(await hasModulePermission(user, permission))) return null;
    const [rows] = await pool.execute(
      `SELECT c.id, c.presupuesto_id, c.monto, c.estado, c.pendiente,
              p.folio, p.empresa, p.titulo_proyecto, p.po
         FROM ${table} c
         LEFT JOIN presupuestos p ON p.id = c.presupuesto_id
        WHERE c.id = ?
        LIMIT 1`,
      [id]
    );
    const row = rows[0];
    if (!row) return null;
    if (row.presupuesto_id && !(await canAccessBudget(user, row.presupuesto_id, permission, ''))) return null;
    return { id, projectId: Number(row.presupuesto_id || 0), account: row };
  }

  async function refreshMobilePayableStatus(accountId) {
    const [rows] = await pool.execute(
      'SELECT tipo FROM cuentas_por_pagar_archivos WHERE cuenta_id = ?',
      [accountId]
    );
    const types = new Set(rows.map((row) => String(row.tipo || '')));
    let status = { estado: 'En proceso', pendiente: 'Cargar Factura Proveedor' };
    if (types.has('Factura')) status = { estado: 'Factura cargada', pendiente: 'Cargar comprobante de pago' };
    if (types.has('Comprobante de pago')) status = { estado: 'Pago comprobado', pendiente: 'Cargar complemento de pago' };
    if (types.has('Complemento de pago')) status = { estado: 'Documentación completa', pendiente: 'Sin pendientes de documentación' };
    await pool.execute(
      'UPDATE cuentas_por_pagar SET estado = ?, pendiente = ? WHERE id = ?',
      [status.estado, status.pendiente, accountId]
    );
  }

  async function refreshMobileReceivableStatus(accountId) {
    const [accountRows] = await pool.execute(
      'SELECT monto FROM cuentas_por_cobrar WHERE id = ? LIMIT 1',
      [accountId]
    );
    if (!accountRows.length) return;
    const [fileRows] = await pool.execute(
      'SELECT tipo FROM cuentas_por_cobrar_archivos WHERE cuenta_id = ?',
      [accountId]
    );
    const [paymentRows] = await pool.execute(
      'SELECT COALESCE(SUM(monto), 0) AS pagado FROM cuentas_por_cobrar_pagos WHERE cuenta_id = ?',
      [accountId]
    );
    const types = new Set(fileRows.map((row) => String(row.tipo || '')));
    const total = Number(accountRows[0].monto || 0);
    const paid = Number(paymentRows[0]?.pagado || 0);
    let status = { estado: 'En proceso', pendiente: 'En proceso' };
    if (types.has('Factura')) status = { estado: 'Factura cargada', pendiente: 'Cargar comprobante de pago' };
    if (paid > 0.004 && paid + 0.004 < total) status = { estado: 'Pago parcial', pendiente: 'Saldo pendiente' };
    if (paid + 0.004 >= total && total > 0) {
      status = types.has('Complemento de pago')
        ? { estado: 'Pago completo', pendiente: 'Sin pendientes de documentación' }
        : { estado: 'Comprobante de pago cargado', pendiente: 'Cargar complemento de pago' };
    }
    await pool.execute(
      'UPDATE cuentas_por_cobrar SET estado = ?, pendiente = ? WHERE id = ?',
      [status.estado, status.pendiente, accountId]
    );
  }

  function csvCell(value) {
    return `"${String(value ?? '').replace(/"/g, '""')}"`;
  }

  function sendCsv(res, name, headers, rows) {
    const body = [headers, ...rows].map((row) => row.map(csvCell).join(',')).join('\r\n');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${name}"`);
    res.send(`\uFEFF${body}`);
  }

  app.get(`${apiPrefix}/health`, asyncRoute(async (_req, res) => {
    await pool.execute('SELECT 1');
    res.json({
      ok: true,
      service: 'dalvo-mobile-api',
      version: '1',
      environment: process.env.NODE_ENV || 'development',
      serverTime: new Date().toISOString()
    });
  }));

  app.post(
    `${apiPrefix}/auth/login`,
    checkLoginLimit || ((_req, _res, next) => next()),
    asyncRoute(async (req, res) => {
      const username = String(req.body.username || '').trim();
      const password = String(req.body.password || '');
      const deviceId = String(req.body.deviceId || '').trim().slice(0, 191) || null;
      const deviceName = String(req.body.deviceName || '').trim().slice(0, 191) || null;
      const platform = String(req.body.platform || '').trim().slice(0, 40) || null;

      if (!username || !password) {
        return res.status(400).json({ ok: false, message: 'Ingresa usuario y contraseña.' });
      }

      const authConfig = await getAuthTable();
      const [rows] = await pool.execute(
        `SELECT * FROM ${escapeId(authConfig.table)} WHERE ${escapeId(authConfig.userColumn)} = ? LIMIT 1`,
        [username]
      );
      const userRow = rows[0];

      if (!userRow) {
        recordLoginFailure?.(req, username);
        return res.status(401).json({ ok: false, message: 'Usuario o contraseña incorrectos.' });
      }
      if (authConfig.activeColumn && !isActive(userRow[authConfig.activeColumn])) {
        return res.status(403).json({ ok: false, message: 'El usuario está inactivo.' });
      }

      const passwordOk = await comparePassword(password, userRow[authConfig.passwordColumn]);
      if (!passwordOk) {
        recordLoginFailure?.(req, username);
        return res.status(401).json({ ok: false, message: 'Usuario o contraseña incorrectos.' });
      }

      const user = publicUser(userRow, authConfig);
      user.role = await resolveSessionRole(userRow, authConfig);
      await hydrateSessionBranchAccess(user);
      await enrichMobileUser(user);

      if (!isMobileAllowedRole(user)) {
        return res.status(403).json({ ok: false, message: 'Tu perfil no tiene acceso al módulo móvil.' });
      }

      const numericUserId = Number(user.id || 0);
      if (!numericUserId) {
        return res.status(500).json({ ok: false, message: 'El usuario no tiene un identificador compatible con la app móvil.' });
      }

      clearLoginFailures?.(req, username);
      await pool.execute(
        `DELETE FROM mobile_sessions
         WHERE usuario_id = ?
           AND (expires_at <= NOW() OR revoked_at IS NOT NULL)`,
        [numericUserId]
      );

      const rawToken = makeToken();
      const hash = tokenHash(rawToken);
      await pool.execute(
        `INSERT INTO mobile_sessions
           (usuario_id, token_hash, device_id, device_name, platform, expires_at, last_used_at)
         VALUES (?, ?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL ? DAY), NOW())`,
        [numericUserId, hash, deviceId, deviceName, platform, MOBILE_SESSION_DAYS]
      );

      res.json({
        ok: true,
        token: rawToken,
        expiresInDays: MOBILE_SESSION_DAYS,
        user,
        access: await getMobileAccessProfile(user)
      });
    })
  );

  app.post(`${apiPrefix}/auth/logout`, requireMobileAuth, asyncRoute(async (req, res) => {
    await pool.execute('UPDATE mobile_sessions SET revoked_at = NOW() WHERE id = ?', [req.mobileSession.id]);
    res.json({ ok: true });
  }));

  app.get(`${apiPrefix}/me`, requireMobileAuth, asyncRoute(async (req, res) => {
    res.json({
      ok: true,
      user: req.mobileUser,
      access: await getMobileAccessProfile(req.mobileUser)
    });
  }));

  app.get(`${apiPrefix}/access`, requireMobileAuth, asyncRoute(async (req, res) => {
    res.json({ ok: true, access: await getMobileAccessProfile(req.mobileUser) });
  }));

  app.get(`${apiPrefix}/projects`, requireMobileAuth, asyncRoute(async (req, res) => {
    const user = req.mobileUser;
    const search = String(req.query.search || '').trim();
    const conditions = [];
    const values = [];

    appendBudgetOwnerCondition?.(conditions, values, user, 'p', 'modulo:presupuesto');

    if (search) {
      const like = `%${search}%`;
      conditions.push(`(
        p.folio LIKE ? OR
        p.empresa LIKE ? OR
        p.titulo_proyecto LIKE ? OR
        p.po LIKE ?
      )`);
      values.push(like, like, like, like);
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const [rows] = await pool.execute(
      `SELECT
         p.id,
         p.folio,
         p.empresa,
         p.titulo_proyecto,
         p.area,
         p.po,
         p.estado,
         p.estatus,
         p.usuario_id,
         p.sucursal_id,
         p.updated_at,
         COALESCE(NULLIF(CONCAT_WS(' ', u.nombre, u.apellido), ''), u.usuario, '') AS supervisor,
         (SELECT r.estado
            FROM proyecto_reportes_supervision r
           WHERE r.presupuesto_id = p.id
           ORDER BY r.id DESC LIMIT 1) AS ultimo_reporte_estado,
         (SELECT r.porcentaje_avance
            FROM proyecto_reportes_supervision r
           WHERE r.presupuesto_id = p.id
           ORDER BY r.id DESC LIMIT 1) AS ultimo_avance,
         (SELECT COALESCE(r.submitted_at, r.updated_at)
            FROM proyecto_reportes_supervision r
           WHERE r.presupuesto_id = p.id
           ORDER BY r.id DESC LIMIT 1) AS ultimo_reporte_at
       FROM presupuestos p
       LEFT JOIN usuarios u ON u.user_id = p.usuario_id
       ${where}
       ORDER BY p.updated_at DESC, p.id DESC
       LIMIT 250`,
      values
    );

    res.json({
      ok: true,
      projects: rows.map((row) => ({
        id: Number(row.id),
        folio: row.folio || '',
        company: row.empresa || '',
        title: row.titulo_proyecto || '',
        area: row.area || '',
        po: row.po || '',
        state: row.estado || '',
        status: row.estatus || '',
        supervisor: row.supervisor || '',
        lastReportState: row.ultimo_reporte_estado || null,
        lastProgress: row.ultimo_avance === null ? null : Number(row.ultimo_avance),
        lastReportAt: row.ultimo_reporte_at || null,
        updatedAt: row.updated_at
      }))
    });
  }));

  app.get(`${apiPrefix}/admin/company-locations`, requireMobileAuth, asyncRoute(async (req, res) => {
    if (!isMobileAdmin(req.mobileUser)) {
      return res.status(403).json({ ok: false, message: 'Solo administración puede configurar ubicaciones.' });
    }
    const search = String(req.query.search || '').trim();
    const like = `%${search}%`;
    const [rows] = await pool.execute(
      `SELECT e.id AS empresa_id,
              e.nombre AS empresa,
              e.direccion AS empresa_direccion,
              s.id AS sucursal_id,
              COALESCE(NULLIF(s.nombre, ''), 'General') AS sucursal,
              COALESCE(NULLIF(s.direccion, ''), e.direccion, '') AS direccion,
              l.id AS ubicacion_id,
              l.nombre AS ubicacion_nombre,
              l.latitud,
              l.longitud,
              l.radio_metros,
              l.activo,
              l.updated_at
       FROM cliente_empresas e
       LEFT JOIN cliente_sucursales s
         ON s.empresa_id = e.id AND s.activo = 1
       LEFT JOIN empresa_ubicaciones_movil l
         ON l.clave = CONCAT('E', e.id, ':S', COALESCE(s.id, 0))
       WHERE e.activo = 1
         AND (? = '' OR e.nombre LIKE ? OR s.nombre LIKE ?)
       ORDER BY e.nombre, s.nombre`,
      [search, like, like]
    );
    res.json({
      ok: true,
      locations: rows.map((row) => ({
        companyId: Number(row.empresa_id),
        company: row.empresa || '',
        companyAddress: row.empresa_direccion || '',
        branchId: row.sucursal_id === null ? null : Number(row.sucursal_id),
        branch: row.sucursal || 'General',
        address: row.direccion || '',
        locationId: row.ubicacion_id === null ? null : Number(row.ubicacion_id),
        locationName: row.ubicacion_nombre || '',
        latitude: row.latitud === null ? null : Number(row.latitud),
        longitude: row.longitud === null ? null : Number(row.longitud),
        radiusMeters: row.radio_metros === null ? 300 : Number(row.radio_metros),
        active: row.ubicacion_id !== null && Boolean(row.activo),
        updatedAt: row.updated_at || null
      }))
    });
  }));

  app.put(`${apiPrefix}/admin/company-locations`, requireMobileAuth, asyncRoute(async (req, res) => {
    if (!isMobileAdmin(req.mobileUser)) {
      return res.status(403).json({ ok: false, message: 'Solo administración puede configurar ubicaciones.' });
    }
    const companyId = Number(req.body.companyId || 0);
    const branchId = req.body.branchId === null || req.body.branchId === undefined || req.body.branchId === ''
      ? null
      : Number(req.body.branchId);
    const latitude = Number(req.body.latitude);
    const longitude = Number(req.body.longitude);
    const radiusMeters = Math.max(100, Math.min(5000, Number(req.body.radiusMeters || 300)));
    const requestedName = String(req.body.name || '').trim().slice(0, 191);

    if (!companyId || !validLatitude(latitude) || !validLongitude(longitude)) {
      return res.status(400).json({ ok: false, message: 'Empresa o coordenadas inválidas.' });
    }

    const [targetRows] = await pool.execute(
      `SELECT e.id AS empresa_id, e.nombre AS empresa,
              s.id AS sucursal_id, COALESCE(NULLIF(s.nombre, ''), 'General') AS sucursal
       FROM cliente_empresas e
       LEFT JOIN cliente_sucursales s
         ON s.empresa_id = e.id AND s.id = ? AND s.activo = 1
       WHERE e.id = ? AND e.activo = 1
       LIMIT 1`,
      [branchId, companyId]
    );
    const target = targetRows[0];
    if (!target || (branchId !== null && Number(target.sucursal_id || 0) !== branchId)) {
      return res.status(404).json({ ok: false, message: 'Empresa o sucursal no encontrada.' });
    }

    const key = `E${companyId}:S${branchId || 0}`;
    const name = requestedName || `${target.empresa} · ${target.sucursal || 'General'}`;
    const userId = Number(req.mobileUser.id || 0) || null;
    await pool.execute(
      `INSERT INTO empresa_ubicaciones_movil
         (clave, empresa_id, sucursal_id, nombre, latitud, longitud, radio_metros, activo, created_by, updated_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?)
       ON DUPLICATE KEY UPDATE
         nombre = VALUES(nombre),
         latitud = VALUES(latitud),
         longitud = VALUES(longitud),
         radio_metros = VALUES(radio_metros),
         activo = 1,
         updated_by = VALUES(updated_by)`,
      [key, companyId, branchId, name, latitude, longitude, radiusMeters, userId, userId]
    );

    const [savedRows] = await pool.execute(
      `SELECT id, nombre, latitud, longitud, radio_metros, activo, updated_at
       FROM empresa_ubicaciones_movil WHERE clave = ? LIMIT 1`,
      [key]
    );
    const saved = savedRows[0];
    res.json({
      ok: true,
      location: {
        companyId,
        company: target.empresa || '',
        branchId,
        branch: target.sucursal || 'General',
        locationId: Number(saved.id),
        locationName: saved.nombre || '',
        latitude: Number(saved.latitud),
        longitude: Number(saved.longitud),
        radiusMeters: Number(saved.radio_metros),
        active: Boolean(saved.activo),
        updatedAt: saved.updated_at
      }
    });
  }));

  app.delete(`${apiPrefix}/admin/company-locations/:locationId`, requireMobileAuth, asyncRoute(async (req, res) => {
    if (!isMobileAdmin(req.mobileUser)) {
      return res.status(403).json({ ok: false, message: 'Solo administración puede configurar ubicaciones.' });
    }
    const locationId = Number(req.params.locationId || 0);
    if (!locationId) return res.status(400).json({ ok: false, message: 'Ubicación inválida.' });
    const [result] = await pool.execute(
      `UPDATE empresa_ubicaciones_movil SET activo = 0, updated_by = ? WHERE id = ?`,
      [Number(req.mobileUser.id || 0) || null, locationId]
    );
    if (!result.affectedRows) return res.status(404).json({ ok: false, message: 'Ubicación no encontrada.' });
    res.json({ ok: true });
  }));

  app.get(`${apiPrefix}/projects/:projectId`, requireMobileAuth, asyncRoute(async (req, res) => {
    const projectId = Number(req.params.projectId || 0);
    if (!projectId) return res.status(400).json({ ok: false, message: 'Proyecto inválido.' });
    if (!(await ensureProjectAccess(req.mobileUser, projectId))) {
      return res.status(403).json({ ok: false, message: 'No tienes acceso a este proyecto.' });
    }
    const project = await getProject(projectId);
    if (!project) return res.status(404).json({ ok: false, message: 'Proyecto no encontrado.' });
    const location = await getProjectLocation(projectId);
    res.json({ ok: true, project, location });
  }));

  app.get(`${apiPrefix}/projects/:projectId/location`, requireMobileAuth, asyncRoute(async (req, res) => {
    const projectId = Number(req.params.projectId || 0);
    if (!(await ensureProjectAccess(req.mobileUser, projectId))) {
      return res.status(403).json({ ok: false, message: 'No tienes acceso a este proyecto.' });
    }
    res.json({ ok: true, location: await getProjectLocation(projectId) });
  }));

  app.put(`${apiPrefix}/projects/:projectId/location`, requireMobileAuth, asyncRoute(async (req, res) => {
    if (!isMobileAdmin(req.mobileUser)) {
      return res.status(403).json({ ok: false, message: 'Solo administración puede configurar la ubicación del proyecto.' });
    }
    const projectId = Number(req.params.projectId || 0);
    const latitude = Number(req.body.latitude);
    const longitude = Number(req.body.longitude);
    const radiusMeters = Math.max(20, Math.min(5000, Number(req.body.radiusMeters || 150)));
    const name = String(req.body.name || '').trim().slice(0, 191) || null;

    if (!projectId || !validLatitude(latitude) || !validLongitude(longitude)) {
      return res.status(400).json({ ok: false, message: 'Ubicación inválida.' });
    }
    if (!(await ensureProjectAccess(req.mobileUser, projectId))) {
      return res.status(403).json({ ok: false, message: 'No tienes acceso a este proyecto.' });
    }

    await pool.execute(
      `INSERT INTO proyecto_supervision_ubicaciones
         (presupuesto_id, nombre_ubicacion, latitud, longitud, radio_metros, updated_by)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         nombre_ubicacion = VALUES(nombre_ubicacion),
         latitud = VALUES(latitud),
         longitud = VALUES(longitud),
         radio_metros = VALUES(radio_metros),
         updated_by = VALUES(updated_by)`,
      [projectId, name, latitude, longitude, radiusMeters, Number(req.mobileUser.id || 0)]
    );

    res.json({ ok: true, location: await getProjectLocation(projectId) });
  }));

  app.get(`${apiPrefix}/projects/:projectId/reports`, requireMobileAuth, asyncRoute(async (req, res) => {
    const projectId = Number(req.params.projectId || 0);
    if (!(await ensureProjectAccess(req.mobileUser, projectId))) {
      return res.status(403).json({ ok: false, message: 'No tienes acceso a este proyecto.' });
    }

    const [rows] = await pool.execute(
      `SELECT
         r.*,
         COALESCE(NULLIF(CONCAT_WS(' ', u.nombre, u.apellido), ''), u.usuario, '') AS supervisor,
         (SELECT COUNT(*) FROM proyecto_reportes_supervision_archivos a WHERE a.reporte_id = r.id) AS fotos
       FROM proyecto_reportes_supervision r
       LEFT JOIN usuarios u ON u.user_id = r.supervisor_id
       WHERE r.presupuesto_id = ?
       ORDER BY r.fecha_visita DESC, r.id DESC
       LIMIT 200`,
      [projectId]
    );

    res.json({ ok: true, reports: rows.map((row) => ({
      id: Number(row.id),
      projectId: Number(row.presupuesto_id),
      supervisorId: Number(row.supervisor_id),
      supervisor: row.supervisor || '',
      visitDate: row.fecha_visita,
      progress: row.porcentaje_avance === null ? null : Number(row.porcentaje_avance),
      workDone: row.trabajos_realizados || '',
      pending: row.pendientes || '',
      incidents: row.percances || '',
      observations: row.observaciones || '',
      incompleteInformation: Boolean(row.informacion_incompleta),
      missingInformation: row.detalle_informacion_faltante || '',
      status: row.estado,
      photosCount: Number(row.fotos || 0),
      submittedAt: row.submitted_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    })) });
  }));

  app.post(`${apiPrefix}/projects/:projectId/reports`, requireMobileAuth, asyncRoute(async (req, res) => {
    const projectId = Number(req.params.projectId || 0);
    if (!(await ensureProjectAccess(req.mobileUser, projectId))) {
      return res.status(403).json({ ok: false, message: 'No tienes acceso a este proyecto.' });
    }

    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    if ((latitude !== undefined || longitude !== undefined) && (!validLatitude(latitude) || !validLongitude(longitude))) {
      return res.status(400).json({ ok: false, message: 'La ubicación del reporte no es válida.' });
    }

    const [result] = await pool.execute(
      `INSERT INTO proyecto_reportes_supervision
         (presupuesto_id, supervisor_id, fecha_visita, porcentaje_avance,
          trabajos_realizados, pendientes, percances, observaciones,
          informacion_incompleta, detalle_informacion_faltante,
          latitud, longitud, precision_metros, estado)
       VALUES (?, ?, COALESCE(?, NOW()), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'BORRADOR')`,
      [
        projectId,
        Number(req.mobileUser.id || 0),
        req.body.visitDate || null,
        normalizeProgress(req.body.progress),
        String(req.body.workDone || '').trim() || null,
        String(req.body.pending || '').trim() || null,
        String(req.body.incidents || '').trim() || null,
        String(req.body.observations || '').trim() || null,
        req.body.incompleteInformation ? 1 : 0,
        String(req.body.missingInformation || '').trim() || null,
        latitude === undefined ? null : Number(latitude),
        longitude === undefined ? null : Number(longitude),
        toNullableNumber(req.body.accuracyMeters)
      ]
    );

    res.status(201).json({ ok: true, reportId: Number(result.insertId) });
  }));

  app.get(`${apiPrefix}/reports/:reportId`, requireMobileAuth, asyncRoute(async (req, res) => {
    const reportId = Number(req.params.reportId || 0);
    const report = await getReport(reportId);
    if (!report) return res.status(404).json({ ok: false, message: 'Reporte no encontrado.' });
    if (!(await ensureProjectAccess(req.mobileUser, report.presupuesto_id))) {
      return res.status(403).json({ ok: false, message: 'No tienes acceso a este reporte.' });
    }
    res.json({ ok: true, report, files: await listReportFiles(reportId) });
  }));

  app.patch(`${apiPrefix}/reports/:reportId`, requireMobileAuth, asyncRoute(async (req, res) => {
    const reportId = Number(req.params.reportId || 0);
    const report = await getReport(reportId);
    if (!report) return res.status(404).json({ ok: false, message: 'Reporte no encontrado.' });
    if (!(await ensureProjectAccess(req.mobileUser, report.presupuesto_id)) || !canEditReport(req.mobileUser, report)) {
      return res.status(403).json({ ok: false, message: 'No puedes editar este reporte.' });
    }
    if (!isMobileAdmin(req.mobileUser) && report.estado !== 'BORRADOR') {
      return res.status(409).json({ ok: false, message: 'Un reporte enviado ya no puede editarse desde el celular.' });
    }

    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    if ((latitude !== undefined || longitude !== undefined) && (!validLatitude(latitude) || !validLongitude(longitude))) {
      return res.status(400).json({ ok: false, message: 'La ubicación del reporte no es válida.' });
    }

    await pool.execute(
      `UPDATE proyecto_reportes_supervision
       SET fecha_visita = COALESCE(?, fecha_visita),
           porcentaje_avance = ?,
           trabajos_realizados = ?,
           pendientes = ?,
           percances = ?,
           observaciones = ?,
           informacion_incompleta = ?,
           detalle_informacion_faltante = ?,
           latitud = COALESCE(?, latitud),
           longitud = COALESCE(?, longitud),
           precision_metros = COALESCE(?, precision_metros)
       WHERE id = ?`,
      [
        req.body.visitDate || null,
        normalizeProgress(req.body.progress),
        String(req.body.workDone || '').trim() || null,
        String(req.body.pending || '').trim() || null,
        String(req.body.incidents || '').trim() || null,
        String(req.body.observations || '').trim() || null,
        req.body.incompleteInformation ? 1 : 0,
        String(req.body.missingInformation || '').trim() || null,
        latitude === undefined ? null : Number(latitude),
        longitude === undefined ? null : Number(longitude),
        toNullableNumber(req.body.accuracyMeters),
        reportId
      ]
    );

    res.json({ ok: true });
  }));

  app.post(`${apiPrefix}/reports/:reportId/submit`, requireMobileAuth, asyncRoute(async (req, res) => {
    const reportId = Number(req.params.reportId || 0);
    const report = await getReport(reportId);
    if (!report) return res.status(404).json({ ok: false, message: 'Reporte no encontrado.' });
    if (!(await ensureProjectAccess(req.mobileUser, report.presupuesto_id)) || !canEditReport(req.mobileUser, report)) {
      return res.status(403).json({ ok: false, message: 'No puedes enviar este reporte.' });
    }
    if (report.estado !== 'BORRADOR') {
      return res.status(409).json({ ok: false, message: 'El reporte ya fue enviado.' });
    }

    const status = report.informacion_incompleta ? 'ENVIADO_INCOMPLETO' : 'ENVIADO_COMPLETO';
    await pool.execute(
      `UPDATE proyecto_reportes_supervision
       SET estado = ?, submitted_at = NOW()
       WHERE id = ?`,
      [status, reportId]
    );
    res.json({ ok: true, status });
  }));

  app.post(
    `${apiPrefix}/projects/:projectId/reports/:reportId/photos`,
    requireMobileAuth,
    (req, res, next) => uploadPhotos.array('photos', MAX_PHOTOS_PER_REQUEST)(req, res, next),
    asyncRoute(async (req, res) => {
      const projectId = Number(req.params.projectId || 0);
      const reportId = Number(req.params.reportId || 0);
      const report = await getReport(reportId);
      const files = Array.isArray(req.files) ? req.files : [];

      const cleanup = () => {
        for (const file of files) fs.promises.unlink(file.path).catch(() => {});
      };

      if (!report || Number(report.presupuesto_id) !== projectId) {
        cleanup();
        return res.status(404).json({ ok: false, message: 'Reporte no encontrado para este proyecto.' });
      }
      if (!(await ensureProjectAccess(req.mobileUser, projectId)) || !canEditReport(req.mobileUser, report)) {
        cleanup();
        return res.status(403).json({ ok: false, message: 'No puedes agregar fotos a este reporte.' });
      }
      if (!isMobileAdmin(req.mobileUser) && report.estado !== 'BORRADOR') {
        cleanup();
        return res.status(409).json({ ok: false, message: 'El reporte ya fue enviado.' });
      }
      if (!files.length) {
        return res.status(400).json({ ok: false, message: 'Selecciona al menos una fotografía.' });
      }

      const inserted = [];
      try {
        for (const file of files) {
          const sha256 = crypto.createHash('sha256').update(await fs.promises.readFile(file.path)).digest('hex');
          const relativePath = path.relative(rootDir, file.path).replace(/\\/g, '/');
          const [result] = await pool.execute(
            `INSERT INTO proyecto_reportes_supervision_archivos
               (reporte_id, usuario_id, tipo, nombre_original, nombre_guardado, ruta, mime_type, size_bytes, sha256)
             VALUES (?, ?, 'FOTO', ?, ?, ?, ?, ?, ?)`,
            [
              reportId,
              Number(req.mobileUser.id || 0),
              file.originalname,
              file.filename,
              relativePath,
              file.mimetype,
              Number(file.size || 0),
              sha256
            ]
          );
          inserted.push({ id: Number(result.insertId), name: file.originalname });
        }
      } catch (error) {
        cleanup();
        throw error;
      }

      res.status(201).json({ ok: true, files: inserted });
    })
  );

  app.get(`${apiPrefix}/report-files/:fileId`, requireMobileAuth, asyncRoute(async (req, res) => {
    const fileId = Number(req.params.fileId || 0);
    const [rows] = await pool.execute(
      `SELECT a.*, r.presupuesto_id
       FROM proyecto_reportes_supervision_archivos a
       INNER JOIN proyecto_reportes_supervision r ON r.id = a.reporte_id
       WHERE a.id = ?
       LIMIT 1`,
      [fileId]
    );
    const row = rows[0];
    if (!row) return res.status(404).json({ ok: false, message: 'Fotografía no encontrada.' });
    if (!(await ensureProjectAccess(req.mobileUser, row.presupuesto_id))) {
      return res.status(403).json({ ok: false, message: 'No tienes acceso a esta fotografía.' });
    }

    const absolutePath = path.resolve(rootDir, row.ruta);
    const safeRoot = path.resolve(uploadRoot) + path.sep;
    if (!absolutePath.startsWith(safeRoot)) {
      return res.status(403).json({ ok: false, message: 'Ruta de archivo inválida.' });
    }
    if (!fs.existsSync(absolutePath)) {
      return res.status(404).json({ ok: false, message: 'El archivo físico no está disponible.' });
    }
    if (row.mime_type) res.type(row.mime_type);
    res.setHeader('Cache-Control', 'private, no-store');
    res.sendFile(absolutePath);
  }));

  app.delete(`${apiPrefix}/report-files/:fileId`, requireMobileAuth, asyncRoute(async (req, res) => {
    const fileId = Number(req.params.fileId || 0);
    const [rows] = await pool.execute(
      `SELECT a.*, r.presupuesto_id, r.supervisor_id, r.estado
       FROM proyecto_reportes_supervision_archivos a
       INNER JOIN proyecto_reportes_supervision r ON r.id = a.reporte_id
       WHERE a.id = ?
       LIMIT 1`,
      [fileId]
    );
    const row = rows[0];
    if (!row) return res.status(404).json({ ok: false, message: 'Fotografía no encontrada.' });
    if (!(await ensureProjectAccess(req.mobileUser, row.presupuesto_id))) {
      return res.status(403).json({ ok: false, message: 'No tienes acceso a esta fotografía.' });
    }
    if (!isMobileAdmin(req.mobileUser) && (Number(row.supervisor_id) !== Number(req.mobileUser.id) || row.estado !== 'BORRADOR')) {
      return res.status(403).json({ ok: false, message: 'No puedes eliminar esta fotografía.' });
    }

    await pool.execute('DELETE FROM proyecto_reportes_supervision_archivos WHERE id = ?', [fileId]);
    const absolutePath = path.resolve(rootDir, row.ruta);
    const safeRoot = path.resolve(uploadRoot) + path.sep;
    if (absolutePath.startsWith(safeRoot)) fs.promises.unlink(absolutePath).catch(() => {});
    res.json({ ok: true });
  }));

  app.get(`${apiPrefix}/projects/:projectId/attendance/status`, requireMobileAuth, asyncRoute(async (req, res) => {
    const projectId = Number(req.params.projectId || 0);
    if (!(await ensureProjectAccess(req.mobileUser, projectId))) {
      return res.status(403).json({ ok: false, message: 'No tienes acceso a este proyecto.' });
    }
    const [rows] = await pool.execute(
      `SELECT id, evento, latitud, longitud, precision_metros, distancia_proyecto_metros,
              dentro_geocerca, metodo_biometrico, created_at
       FROM proyecto_supervision_asistencias
       WHERE presupuesto_id = ? AND supervisor_id = ?
       ORDER BY id DESC
       LIMIT 1`,
      [projectId, Number(req.mobileUser.id || 0)]
    );
    const last = rows[0] || null;
    res.json({
      ok: true,
      checkedIn: Boolean(last && String(last.evento).toUpperCase() === 'ENTRADA'),
      lastEvent: last
    });
  }));

  app.post(`${apiPrefix}/projects/:projectId/attendance`, requireMobileAuth, asyncRoute(async (req, res) => {
    const projectId = Number(req.params.projectId || 0);
    const event = String(req.body.event || '').trim().toUpperCase();
    const latitude = Number(req.body.latitude);
    const longitude = Number(req.body.longitude);
    const accuracy = Math.max(0, toNullableNumber(req.body.accuracyMeters) || 0);
    const biometricVerified = req.body.biometricVerified === true;
    const biometricMethod = String(req.body.biometricMethod || '').trim().toLowerCase();
    const deviceId = String(req.body.deviceId || req.mobileSession.device_id || '').trim().slice(0, 191) || null;

    if (!['ENTRADA', 'SALIDA'].includes(event)) {
      return res.status(400).json({ ok: false, message: 'El evento debe ser ENTRADA o SALIDA.' });
    }
    if (!validLatitude(latitude) || !validLongitude(longitude)) {
      return res.status(400).json({ ok: false, message: 'No se pudo validar tu ubicación.' });
    }
    if (!biometricVerified || !['fingerprint', 'face', 'strong', 'weak'].includes(biometricMethod)) {
      return res.status(403).json({ ok: false, message: 'El checado requiere confirmación biométrica del dispositivo.' });
    }
    if (!(await ensureProjectAccess(req.mobileUser, projectId))) {
      return res.status(403).json({ ok: false, message: 'No tienes acceso a este proyecto.' });
    }

    const location = await getProjectLocation(projectId);
    if (!location) {
      return res.status(409).json({
        ok: false,
        code: 'PROJECT_LOCATION_NOT_CONFIGURED',
        message: 'Administración debe configurar primero la ubicación de este proyecto.'
      });
    }

    const distance = haversineMeters(latitude, longitude, location.latitude, location.longitude);
    const tolerance = location.radiusMeters + Math.min(accuracy, 100);
    const inside = distance <= tolerance;
    if (!inside) {
      return res.status(422).json({
        ok: false,
        code: 'OUTSIDE_GEOFENCE',
        message: 'Estás fuera del área permitida para realizar el checado.',
        distanceMeters: Math.round(distance),
        allowedMeters: Math.round(tolerance)
      });
    }

    const [lastRows] = await pool.execute(
      `SELECT evento
       FROM proyecto_supervision_asistencias
       WHERE presupuesto_id = ? AND supervisor_id = ?
       ORDER BY id DESC LIMIT 1`,
      [projectId, Number(req.mobileUser.id || 0)]
    );
    const lastEvent = String(lastRows[0]?.evento || '').toUpperCase();
    if (event === 'ENTRADA' && lastEvent === 'ENTRADA') {
      return res.status(409).json({ ok: false, message: 'Ya tienes una entrada activa en este proyecto.' });
    }
    if (event === 'SALIDA' && lastEvent !== 'ENTRADA') {
      return res.status(409).json({ ok: false, message: 'Primero debes registrar una entrada.' });
    }

    const [result] = await pool.execute(
      `INSERT INTO proyecto_supervision_asistencias
         (presupuesto_id, supervisor_id, evento, latitud, longitud, precision_metros,
          distancia_proyecto_metros, dentro_geocerca, metodo_biometrico,
          biometria_confirmada, device_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, 1, ?)`,
      [
        projectId,
        Number(req.mobileUser.id || 0),
        event,
        latitude,
        longitude,
        accuracy || null,
        distance,
        biometricMethod,
        deviceId
      ]
    );

    res.status(201).json({
      ok: true,
      attendanceId: Number(result.insertId),
      event,
      distanceMeters: Math.round(distance),
      projectRadiusMeters: location.radiusMeters
    });
  }));

  app.get(`${apiPrefix}/documents/targets`, requireMobileAuth, asyncRoute(async (req, res) => {
    const scope = normalizeDocumentScope(req.query.scope);
    const search = String(req.query.search || '').trim().slice(0, 120);
    if (!scope) return res.status(400).json({ ok: false, message: 'Selecciona proyecto, cuenta por pagar o cuenta por cobrar.' });
    const like = `%${search}%`;
    let rows = [];

    if (scope === 'PROJECT') {
      const conditions = [];
      const params = [];
      appendBudgetOwnerCondition(conditions, params, req.mobileUser, 'p', 'modulo:presupuesto');
      if (search) {
        conditions.push('(p.folio LIKE ? OR p.empresa LIKE ? OR p.titulo_proyecto LIKE ? OR p.po LIKE ?)');
        params.push(like, like, like, like);
      }
      const [result] = await pool.execute(
        `SELECT p.id, p.folio, p.empresa, p.titulo_proyecto AS title, p.po AS reference,
                p.estado AS state, p.estatus AS status, 0 AS amount
           FROM presupuestos p
          ${conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''}
          ORDER BY p.updated_at DESC
          LIMIT 100`,
        params
      );
      rows = result;
    } else {
      const permission = scope === 'PAYABLE' ? 'modulo:cuentas-pagar' : 'modulo:cuentas-cobrar';
      if (!(await hasModulePermission(req.mobileUser, permission))) {
        return res.status(403).json({ ok: false, message: 'No tienes permiso para consultar este módulo.' });
      }
      const table = scope === 'PAYABLE' ? 'cuentas_por_pagar' : 'cuentas_por_cobrar';
      const conditions = [];
      const params = [];
      appendBudgetOwnerCondition(conditions, params, req.mobileUser, 'p', permission);
      if (search) {
        conditions.push('(p.folio LIKE ? OR p.empresa LIKE ? OR p.titulo_proyecto LIKE ? OR p.po LIKE ? OR CAST(c.id AS CHAR) LIKE ?)');
        params.push(like, like, like, like, like);
      }
      const [result] = await pool.execute(
        `SELECT c.id, p.folio, p.empresa, p.titulo_proyecto AS title, p.po AS reference,
                c.estado AS state, c.pendiente AS status, c.monto AS amount
           FROM ${table} c
           LEFT JOIN presupuestos p ON p.id = c.presupuesto_id
          ${conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''}
          ORDER BY c.updated_at DESC
          LIMIT 100`,
        params
      );
      rows = result;
    }

    res.json({
      ok: true,
      scope,
      targets: rows.map((row) => ({
        id: Number(row.id),
        folio: row.folio || '',
        company: row.empresa || '',
        title: row.title || '',
        reference: row.reference || '',
        state: row.state || '',
        status: row.status || '',
        amount: Number(row.amount || 0)
      }))
    });
  }));

  app.post(
    `${apiPrefix}/documents/assign`,
    requireMobileAuth,
    uploadDocuments.array('files', MAX_DOCUMENTS_PER_REQUEST),
    asyncRoute(async (req, res) => {
      const files = Array.isArray(req.files) ? req.files : [];
      const scope = normalizeDocumentScope(req.body.scope);
      const targetId = Number(req.body.targetId || 0);
      const documentType = String(req.body.documentType || '').trim().slice(0, 80);
      const detail = String(req.body.detail || '').trim().slice(0, 500);
      const source = String(req.body.source || 'archivo').trim().slice(0, 40) || 'archivo';
      const amount = parsePositiveMoney(req.body.amount);
      const amountIncludesTax = ['1', 'true', 'si', 'sí'].includes(String(req.body.amountIncludesTax || '').trim().toLowerCase());
      const appliedAmount = amount
        ? Math.round((amountIncludesTax ? amount / 1.16 : amount) * 100) / 100
        : null;
      const allowedTypes = {
        PROJECT: new Set(['Comprobante', 'Factura', 'Orden de compra', 'Complemento de pago', 'Otro']),
        PAYABLE: new Set(['Factura', 'Comprobante de pago', 'Complemento de pago']),
        RECEIVABLE: new Set(['Factura', 'GR', 'Track ID', 'Comprobante de pago', 'Complemento de pago'])
      };

      if (!scope || !targetId || !allowedTypes[scope]?.has(documentType)) {
        removeUploadedDocuments(files);
        return res.status(400).json({ ok: false, message: 'Destino o tipo de documento inválido.' });
      }
      if (!files.length) return res.status(400).json({ ok: false, message: 'Selecciona al menos un archivo.' });
      if (scope === 'RECEIVABLE' && documentType === 'Comprobante de pago' && !amount) {
        removeUploadedDocuments(files);
        return res.status(400).json({ ok: false, message: 'Indica el monto real recibido para registrar el cobro.' });
      }
      const target = await resolveDocumentTarget(req.mobileUser, scope, targetId);
      if (!target) {
        removeUploadedDocuments(files);
        return res.status(403).json({ ok: false, message: 'No tienes acceso al destino seleccionado.' });
      }

      const connection = await pool.getConnection();
      const created = [];
      try {
        await connection.beginTransaction();
        for (const file of files) {
          const hash = crypto.createHash('sha256').update(fs.readFileSync(file.path)).digest('hex');
          const [duplicates] = await connection.execute(
            `SELECT id FROM mobile_document_assignments
              WHERE destino_tipo = ? AND destino_id = ? AND sha256 = ?
              LIMIT 1`,
            [scope, targetId, hash]
          );
          if (duplicates.length) {
            fs.promises.unlink(file.path).catch(() => {});
            created.push({ name: file.originalname, duplicate: true });
            continue;
          }
          const relativePath = path.relative(rootDir, file.path).split(path.sep).join('/');
          let sourceTable = '';
          let sourceId = 0;
          if (scope === 'PROJECT') {
            sourceTable = 'presupuesto_archivos';
            const [insert] = await connection.execute(
              `INSERT INTO presupuesto_archivos
                 (presupuesto_id, tipo, nombre, ruta, usuario_id)
               VALUES (?, ?, ?, ?, ?)`,
              [targetId, documentType, file.originalname, relativePath, Number(req.mobileUser.id || 0)]
            );
            sourceId = Number(insert.insertId);
          } else if (scope === 'PAYABLE') {
            sourceTable = 'cuentas_por_pagar_archivos';
            const [insert] = await connection.execute(
              `INSERT INTO cuentas_por_pagar_archivos
                 (cuenta_id, tipo, nombre, ruta, usuario_id)
               VALUES (?, ?, ?, ?, ?)`,
              [targetId, documentType, file.originalname, relativePath, Number(req.mobileUser.id || 0)]
            );
            sourceId = Number(insert.insertId);
          } else {
            sourceTable = 'cuentas_por_cobrar_archivos';
            const [insert] = await connection.execute(
              `INSERT INTO cuentas_por_cobrar_archivos
                 (cuenta_id, tipo, nombre, ruta, usuario_id)
               VALUES (?, ?, ?, ?, ?)`,
              [targetId, documentType, file.originalname, relativePath, Number(req.mobileUser.id || 0)]
            );
            sourceId = Number(insert.insertId);
          }

          const [audit] = await connection.execute(
            `INSERT INTO mobile_document_assignments
               (destino_tipo, destino_id, presupuesto_id, tabla_archivo, archivo_id,
                tipo_documento, detalle, monto, monto_aplicado, incluye_iva, origen,
                nombre_original, ruta, mime_type, size_bytes, sha256, usuario_id)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              scope,
              targetId,
              target.projectId || null,
              sourceTable,
              sourceId,
              documentType,
              detail,
              amount,
              appliedAmount,
              amountIncludesTax ? 1 : 0,
              source,
              file.originalname,
              relativePath,
              file.mimetype || 'application/octet-stream',
              Number(file.size || 0),
              hash,
              Number(req.mobileUser.id || 0)
            ]
          );
          created.push({ id: Number(audit.insertId), fileId: sourceId, name: file.originalname, duplicate: false });
        }

        if (scope === 'RECEIVABLE' && documentType === 'Comprobante de pago' && appliedAmount) {
          const paymentFile = created.find((item) => !item.duplicate && item.fileId);
          if (paymentFile) {
            const [accountRows] = await connection.execute(
              'SELECT monto FROM cuentas_por_cobrar WHERE id = ? LIMIT 1',
              [targetId]
            );
            const [paidRows] = await connection.execute(
              'SELECT COALESCE(SUM(monto), 0) AS pagado FROM cuentas_por_cobrar_pagos WHERE cuenta_id = ?',
              [targetId]
            );
            const outstanding = Math.max(0, Number(accountRows[0]?.monto || 0) - Number(paidRows[0]?.pagado || 0));
            if (appliedAmount > outstanding + 0.004 && outstanding > 0) {
              throw Object.assign(new Error(`El monto excede el saldo pendiente de ${outstanding.toFixed(2)}.`), { statusCode: 409 });
            }
            const [billingRows] = await connection.execute(
              `SELECT id FROM cuentas_por_cobrar_facturacion
                WHERE cuenta_id = ? AND LOWER(TRIM(estado)) <> 'cancelada'
                ORDER BY id ASC LIMIT 1`,
              [targetId]
            );
            await connection.execute(
              `INSERT INTO cuentas_por_cobrar_pagos
                 (cuenta_id, archivo_id, facturacion_id, monto, fecha_pago, referencia, usuario_id)
               VALUES (?, ?, ?, ?, CURDATE(), ?, ?)`,
              [targetId, paymentFile.fileId, billingRows[0]?.id || null, appliedAmount, detail || paymentFile.name, Number(req.mobileUser.id || 0)]
            );
          }
        }

        await connection.commit();
      } catch (error) {
        await connection.rollback();
        removeUploadedDocuments(files);
        const status = Number(error?.statusCode || 500);
        if (status >= 500) logServerError?.('mobile-document-assign', error);
        return res.status(status).json({ ok: false, message: error.message || 'No se pudieron asignar los archivos.' });
      } finally {
        connection.release();
      }

      if (scope === 'PAYABLE') await refreshMobilePayableStatus(targetId);
      if (scope === 'RECEIVABLE') await refreshMobileReceivableStatus(targetId);
      res.status(201).json({
        ok: true,
        assigned: created.filter((item) => !item.duplicate).length,
        duplicates: created.filter((item) => item.duplicate).length,
        receivedAmount: amount,
        appliedNetAmount: appliedAmount,
        files: created
      });
    })
  );

  const mobileFileTickets = new Map();

  function money(value) {
    const amount = Number(value || 0);
    return Number.isFinite(amount) ? Math.round(amount * 100) / 100 : 0;
  }

  function storedFilePath(relativePath) {
    const clean = String(relativePath || '').replace(/^\/+/, '');
    if (!clean) return '';
    const absolute = path.resolve(rootDir, clean);
    const root = path.resolve(rootDir) + path.sep;
    return absolute.startsWith(root) ? absolute : '';
  }

  async function mobileFileRecord(user, scope, fileId) {
    const id = Number(fileId || 0);
    if (!id) return null;
    const normalized = String(scope || '').toUpperCase();
    let row;
    let permission = 'modulo:presupuesto';
    if (normalized === 'BUDGET') {
      [[row]] = await pool.execute(
        `SELECT a.id, a.presupuesto_id, a.nombre, a.ruta, a.tipo
           FROM presupuesto_archivos a WHERE a.id = ? LIMIT 1`, [id]
      );
    } else if (normalized === 'PURCHASE') {
      permission = 'modulo:compras';
      [[row]] = await pool.execute(
        `SELECT a.id, a.presupuesto_id, a.nombre, a.ruta, a.tipo
           FROM ocp_proveedor_archivos a WHERE a.id = ? LIMIT 1`, [id]
      );
    } else if (normalized === 'PAYABLE' || normalized === 'RECEIVABLE') {
      const payable = normalized === 'PAYABLE';
      permission = payable ? 'modulo:cuentas-pagar' : 'modulo:cuentas-cobrar';
      const table = payable ? 'cuentas_por_pagar_archivos' : 'cuentas_por_cobrar_archivos';
      const account = payable ? 'cuentas_por_pagar' : 'cuentas_por_cobrar';
      [[row]] = await pool.execute(
        `SELECT a.id, c.presupuesto_id, a.nombre, a.ruta, a.tipo
           FROM ${table} a INNER JOIN ${account} c ON c.id = a.cuenta_id
          WHERE a.id = ? LIMIT 1`, [id]
      );
    } else {
      return null;
    }
    if (!row) return null;
    const allowed = row.presupuesto_id
      ? await canAccessBudget(user, row.presupuesto_id, permission, '')
      : await hasModulePermission(user, permission);
    if (!allowed) return null;
    const absolutePath = storedFilePath(row.ruta);
    if (!absolutePath || !fs.existsSync(absolutePath)) return null;
    return { ...row, absolutePath, scope: normalized };
  }

  app.post(`${apiPrefix}/files/:scope/:fileId/open`, requireMobileAuth, asyncRoute(async (req, res) => {
    const file = await mobileFileRecord(req.mobileUser, req.params.scope, req.params.fileId);
    if (!file) return res.status(404).json({ ok: false, message: 'Archivo no encontrado o sin acceso.' });
    const token = crypto.randomBytes(24).toString('hex');
    mobileFileTickets.set(token, {
      path: file.absolutePath,
      name: file.nombre || path.basename(file.absolutePath),
      expiresAt: Date.now() + 5 * 60 * 1000
    });
    const base = `${req.protocol}://${req.get('host')}`;
    res.json({ ok: true, url: `${base}${apiPrefix}/files/open/${token}`, expiresInSeconds: 300 });
  }));

  app.get(`${apiPrefix}/files/open/:token`, asyncRoute(async (req, res) => {
    const ticket = mobileFileTickets.get(String(req.params.token || ''));
    if (!ticket || ticket.expiresAt < Date.now()) {
      mobileFileTickets.delete(String(req.params.token || ''));
      return res.status(410).send('El enlace del archivo expiró. Ábrelo nuevamente desde Dalvo.');
    }
    if (!fs.existsSync(ticket.path)) return res.status(404).send('Archivo no encontrado.');
    res.setHeader('Content-Disposition', `inline; filename*=UTF-8''${encodeURIComponent(ticket.name)}`);
    return res.sendFile(ticket.path);
  }));

  app.get(`${apiPrefix}/budgets`, requireMobileAuth, asyncRoute(async (req, res) => {
    if (!(await hasModulePermission(req.mobileUser, 'modulo:presupuesto'))) {
      return res.status(403).json({ ok: false, message: 'No tienes permiso para consultar presupuestos.' });
    }
    const search = String(req.query.search || '').trim().slice(0, 120);
    const state = String(req.query.state || '').trim().slice(0, 40);
    const status = String(req.query.status || '').trim().slice(0, 80);
    const company = String(req.query.company || '').trim().slice(0, 120);
    const like = `%${search}%`;
    const conditions = [];
    const params = [];
    appendBudgetOwnerCondition(conditions, params, req.mobileUser, 'p', 'modulo:presupuesto');
    if (search) {
      conditions.push('(p.folio LIKE ? OR p.empresa LIKE ? OR p.titulo_proyecto LIKE ? OR p.po LIKE ? OR p.cliente_usuario LIKE ?)');
      params.push(like, like, like, like, like);
    }
    if (state) { conditions.push('p.estado = ?'); params.push(state); }
    if (status) { conditions.push('p.estatus = ?'); params.push(status); }
    if (company) { conditions.push('p.empresa = ?'); params.push(company); }
    const [rows] = await pool.execute(
      `SELECT p.id, p.empresa, p.sucursal, p.cliente_usuario, p.area, p.titulo_proyecto,
              p.folio, p.po, p.estado, p.estatus, p.created_at, p.updated_at,
              COALESCE(NULLIF(CONCAT_WS(' ', u.nombre, u.apellido), ''), u.usuario, '') AS owner,
              COALESCE((SELECT SUM(e.subtotal) FROM presupuesto_costos_equipos e WHERE e.presupuesto_id=p.id),0) AS equipos,
              COALESCE((SELECT SUM(c.subtotal) FROM presupuesto_costos_contratistas c WHERE c.presupuesto_id=p.id),0) AS contratistas,
              COALESCE((SELECT SUM(m.subtotal) FROM presupuesto_costos_mano_obra m WHERE m.presupuesto_id=p.id),0) AS mano_obra,
              COALESCE((SELECT SUM(mt.subtotal) FROM presupuesto_costos_materiales mt WHERE mt.presupuesto_id=p.id),0) AS materiales,
              COALESCE((SELECT SUM(a.monto) FROM presupuesto_adicionales a WHERE a.presupuesto_id=p.id),0) AS adicionales
         FROM presupuestos p LEFT JOIN usuarios u ON u.user_id=p.usuario_id
        ${conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''}
        ORDER BY p.updated_at DESC LIMIT 250`, params
    );
    res.json({ ok: true, budgets: rows.map((row) => ({
      id: Number(row.id), folio: row.folio || '', company: row.empresa || '', branch: row.sucursal || '',
      client: row.cliente_usuario || '', area: row.area || '', title: row.titulo_proyecto || '', po: row.po || '',
      state: row.estado || '', status: row.estatus || '', owner: row.owner || '',
      amount: money(Number(row.equipos)+Number(row.contratistas)+Number(row.mano_obra)+Number(row.materiales)+Number(row.adicionales)),
      createdAt: row.created_at, updatedAt: row.updated_at
    })) });
  }));

  app.get(`${apiPrefix}/budgets/:budgetId/full`, requireMobileAuth, asyncRoute(async (req, res) => {
    const budgetId = Number(req.params.budgetId || 0);
    if (!budgetId || !(await canAccessBudget(req.mobileUser, budgetId, 'modulo:presupuesto', ''))) {
      return res.status(404).json({ ok: false, message: 'Presupuesto no encontrado.' });
    }
    const [[budget]] = await pool.execute(
      `SELECT p.*, COALESCE(NULLIF(CONCAT_WS(' ',u.nombre,u.apellido),''),u.usuario,'') AS owner,
              COALESCE(u.comision_supervisor,0) AS commission_base,
              COALESCE(p.valor_venta_override, ce.valor_venta, c.valor_venta, 0) AS sale_factor
         FROM presupuestos p LEFT JOIN usuarios u ON u.user_id=p.usuario_id
         LEFT JOIN cliente_empresas ce ON ce.id=p.empresa_id
         LEFT JOIN clientes c ON c.id=p.cliente_id
        WHERE p.id=? LIMIT 1`, [budgetId]
    );
    if (!budget) return res.status(404).json({ ok: false, message: 'Presupuesto no encontrado.' });
    const [equipment] = await pool.execute('SELECT id,item AS description,cantidad_equipos AS quantity,unidad_medida AS unit,costo_unitario AS unitCost,subtotal FROM presupuesto_costos_equipos WHERE presupuesto_id=? ORDER BY id', [budgetId]);
    const [contractors] = await pool.execute('SELECT id,descripcion AS description,cantidad AS quantity,costo AS unitCost,subtotal FROM presupuesto_costos_contratistas WHERE presupuesto_id=? ORDER BY id', [budgetId]);
    const [labor] = await pool.execute('SELECT id,descripcion AS description,personas AS people,horas AS hours,costo_hora AS unitCost,subtotal FROM presupuesto_costos_mano_obra WHERE presupuesto_id=? ORDER BY id', [budgetId]);
    const [materials] = await pool.execute('SELECT id,descripcion AS description,cantidad AS quantity,unidad AS unit,costo AS unitCost,subtotal FROM presupuesto_costos_materiales WHERE presupuesto_id=? ORDER BY id', [budgetId]);
    const [additionals] = await pool.execute('SELECT id,bloque AS block,monto AS amount,created_at AS createdAt FROM presupuesto_adicionales WHERE presupuesto_id=? ORDER BY id', [budgetId]);
    const [files] = await pool.execute('SELECT id,tipo AS type,nombre AS name,created_at AS createdAt FROM presupuesto_archivos WHERE presupuesto_id=? ORDER BY id DESC', [budgetId]);
    const [history] = await pool.execute(
      `SELECT id,usuario AS user,accion AS action,detalle AS detail,created_at AS createdAt
         FROM control_cambios WHERE entidad_id=? AND (entidad LIKE '%presupuesto%' OR ruta LIKE ?)
        ORDER BY id DESC LIMIT 30`, [String(budgetId), `%/budgets/${budgetId}%`]
    );
    const [[quote]] = await pool.execute(
      `SELECT q.id,q.folio,q.version,q.estatus,COALESCE(SUM(i.subtotal),0)-COALESCE(q.descuento_monto,0) AS amount
         FROM cotizaciones_cliente q LEFT JOIN cotizacion_cliente_partidas i ON i.cotizacion_id=q.id
        WHERE q.presupuesto_id=? AND q.tipo='version'
        GROUP BY q.id,q.folio,q.version,q.estatus,q.descuento_monto ORDER BY q.version DESC,q.id DESC LIMIT 1`, [budgetId]
    );
    const totalEquipment = equipment.reduce((sum,row)=>sum+Number(row.subtotal||0),0);
    const totalContractors = contractors.reduce((sum,row)=>sum+Number(row.subtotal||0),0);
    const totalLabor = labor.reduce((sum,row)=>sum+Number(row.subtotal||0),0);
    const totalMaterials = materials.reduce((sum,row)=>sum+Number(row.subtotal||0),0);
    const totalAdditional = additionals.reduce((sum,row)=>sum+Number(row.amount||0),0);
    const totalProject = totalEquipment+totalContractors+totalLabor+totalMaterials+totalAdditional;
    const quotationCost = totalProject + (budget.sin_garantia ? 0 : totalProject * 0.05);
    const saleFactor = Number(budget.sale_factor || 0);
    const salePrice = quotationCost * saleFactor;
    const grossProfit = salePrice - quotationCost;
    const commissionPercent = Number(budget.comision_supervisor_override ?? budget.commission_base ?? 0);
    const commission = grossProfit * commissionPercent / 100;
    res.json({ ok:true, budget:{
      id:budgetId, company:budget.empresa||'', branch:budget.sucursal||'', client:budget.cliente_usuario||'', area:budget.area||'',
      date:budget.created_at, title:budget.titulo_proyecto||'', folio:budget.folio||'', po:budget.po||'', state:budget.estado||'',
      status:budget.estatus||'', owner:budget.owner||'', canApprove:normalizeRole(req.mobileUser.role)==='superadmin'
    }, costs:{ equipment, contractors, labor, materials, additionals }, files:files.map(row=>({...row,scope:'BUDGET'})), history,
    quote:quote?{id:Number(quote.id),folio:quote.folio||'',version:Number(quote.version||0),status:quote.estatus||'',amount:money(quote.amount)}:null,
    financial:{totalEquipment:money(totalEquipment),totalLabor:money(totalLabor+totalContractors),totalMaterials:money(totalMaterials),totalAdditional:money(totalAdditional),totalProject:money(totalProject),quotationCost:money(quotationCost),saleFactor, salePrice:money(salePrice),grossProfit:money(grossProfit),commissionPercent,commission:money(commission),totalProfit:money(grossProfit-commission)} });
  }));

  app.patch(`${apiPrefix}/budgets/:budgetId/status`, requireMobileAuth, asyncRoute(async (req,res)=>{
    if (normalizeRole(req.mobileUser.role)!=='superadmin') return res.status(403).json({ok:false,message:'Solo Superadmin puede aprobar o rechazar presupuestos.'});
    const budgetId=Number(req.params.budgetId||0);
    const action=String(req.body.action||'');
    if (!['approve','reject'].includes(action)) return res.status(400).json({ok:false,message:'Acción inválida.'});
    if (!(await canAccessBudget(req.mobileUser,budgetId,'modulo:presupuesto',''))) return res.status(404).json({ok:false,message:'Presupuesto no encontrado.'});
    const [[po]] = await pool.execute(`SELECT 1 AS present FROM presupuesto_po_cliente WHERE presupuesto_id=? AND COALESCE(estado_documento,'Activo')='Activo' AND deleted_at IS NULL AND (sin_po=1 OR NULLIF(numero_po,'') IS NOT NULL OR NULLIF(ruta,'') IS NOT NULL) LIMIT 1`,[budgetId]);
    await pool.execute('UPDATE presupuestos SET estado=?, estatus=? WHERE id=?',[po?'En proceso':'Abierta',action==='approve'?'Aprobado':'No aprobado',budgetId]);
    res.json({ok:true,status:action==='approve'?'Aprobado':'No aprobado'});
  }));

  app.get(`${apiPrefix}/purchases`, requireMobileAuth, asyncRoute(async (req,res)=>{
    if (!(await hasModulePermission(req.mobileUser,'modulo:compras'))) return res.status(403).json({ok:false,message:'No tienes permiso para consultar compras.'});
    const search=String(req.query.search||'').trim().slice(0,120); const status=String(req.query.status||'').trim().slice(0,60); const like=`%${search}%`;
    const conditions=["o.tipo='version'"]; const params=[];
    appendBudgetOwnerCondition(conditions,params,req.mobileUser,'p','modulo:compras');
    if(search){conditions.push('(o.folio LIKE ? OR p.folio LIKE ? OR p.empresa LIKE ? OR p.titulo_proyecto LIKE ? OR op.proveedor_nombre LIKE ?)');params.push(like,like,like,like,like);}
    if(status){conditions.push('o.estatus=?');params.push(status);}
    const [rows]=await pool.execute(`SELECT o.id,o.presupuesto_id,o.folio,o.version,o.estatus,o.created_at,o.updated_at,p.folio AS project_folio,p.empresa,p.titulo_proyecto,p.po,GROUP_CONCAT(DISTINCT op.proveedor_nombre ORDER BY op.proveedor_nombre SEPARATOR ', ') AS supplier,COALESCE(SUM(op.total),0) AS subtotal,(SELECT COUNT(*) FROM ocp_proveedor_archivos a WHERE a.ocp_id=o.id OR (a.ocp_id IS NULL AND a.presupuesto_id=o.presupuesto_id)) AS files_count FROM ocp_proveedor o INNER JOIN presupuestos p ON p.id=o.presupuesto_id LEFT JOIN ocp_proveedor_partidas op ON op.ocp_id=o.id WHERE ${conditions.join(' AND ')} GROUP BY o.id,o.presupuesto_id,o.folio,o.version,o.estatus,o.created_at,o.updated_at,p.folio,p.empresa,p.titulo_proyecto,p.po ORDER BY o.updated_at DESC LIMIT 250`,params);
    res.json({ok:true,purchases:rows.map(row=>({id:Number(row.id),projectId:Number(row.presupuesto_id),folio:row.folio||'',projectFolio:row.project_folio||'',company:row.empresa||'',title:row.titulo_proyecto||'',po:row.po||'',supplier:row.supplier||'Sin proveedor',status:row.estatus||'',amount:money(Number(row.subtotal||0)*1.16),filesCount:Number(row.files_count||0),updatedAt:row.updated_at}))});
  }));

  app.get(`${apiPrefix}/purchases/:orderId`, requireMobileAuth, asyncRoute(async (req,res)=>{
    const orderId=Number(req.params.orderId||0);
    const [[order]]=await pool.execute(`SELECT o.*,p.folio AS project_folio,p.empresa,p.titulo_proyecto,p.po FROM ocp_proveedor o INNER JOIN presupuestos p ON p.id=o.presupuesto_id WHERE o.id=? AND o.tipo='version' LIMIT 1`,[orderId]);
    if(!order || !(await canAccessBudget(req.mobileUser,order.presupuesto_id,'modulo:compras',''))) return res.status(404).json({ok:false,message:'Compra no encontrada.'});
    const [items]=await pool.execute('SELECT id,presupuesto_bloque AS block,proveedor_nombre AS supplier,descripcion AS description,cantidad AS quantity,precio_unitario AS unitPrice,total FROM ocp_proveedor_partidas WHERE ocp_id=? ORDER BY id',[orderId]);
    const [files]=await pool.execute('SELECT id,tipo AS type,nombre AS name,created_at AS createdAt FROM ocp_proveedor_archivos WHERE ocp_id=? OR (ocp_id IS NULL AND presupuesto_id=?) ORDER BY id DESC',[orderId,order.presupuesto_id]);
    const subtotal=items.reduce((sum,row)=>sum+Number(row.total||0),0);
    res.json({ok:true,purchase:{id:orderId,projectId:Number(order.presupuesto_id),folio:order.folio||'',projectFolio:order.project_folio||'',company:order.empresa||'',title:order.titulo_proyecto||'',po:order.po||'',status:order.estatus||'',subtotal:money(subtotal),iva:money(subtotal*.16),total:money(subtotal*1.16)},items,files:files.map(row=>({...row,scope:'PURCHASE'}))});
  }));

  app.get(`${apiPrefix}/tasks`, requireMobileAuth, asyncRoute(async (req,res)=>{
    if (!(await hasModulePermission(req.mobileUser,'modulo:tareas'))) return res.status(403).json({ok:false,message:'No tienes permiso para consultar tareas.'});
    const search=String(req.query.search||'').trim().slice(0,120), status=String(req.query.status||'').trim().slice(0,40), priority=String(req.query.priority||'').trim().slice(0,30), like=`%${search}%`;
    const conditions=[],params=[];
    if(!isMobileAdmin(req.mobileUser)){conditions.push('(t.asignado_a=? OR t.usuario_id=?)');params.push(Number(req.mobileUser.id),Number(req.mobileUser.id));}
    if(search){conditions.push('(t.titulo LIKE ? OR t.descripcion LIKE ? OR t.seguimiento LIKE ?)');params.push(like,like,like);}
    if(status){conditions.push('t.estatus=?');params.push(status);} if(priority){conditions.push('t.prioridad=?');params.push(priority);}
    const [rows]=await pool.execute(`SELECT t.id,t.titulo,t.descripcion,t.seguimiento,t.prioridad,t.estatus,t.fecha_limite,t.updated_at,COALESCE(NULLIF(CONCAT_WS(' ',u.nombre,u.apellido),''),u.usuario,'') AS assignedTo FROM tareas t LEFT JOIN usuarios u ON u.user_id=t.asignado_a ${conditions.length?`WHERE ${conditions.join(' AND ')}`:''} ORDER BY FIELD(t.estatus,'Pendiente','En proceso','Completada'),t.fecha_limite IS NULL,t.fecha_limite,t.updated_at DESC LIMIT 250`,params);
    res.json({ok:true,tasks:rows.map(row=>({id:Number(row.id),title:row.titulo||'',description:row.descripcion||'',followUp:row.seguimiento||'',priority:row.prioridad||'',status:row.estatus||'',dueDate:row.fecha_limite,assignedTo:row.assignedTo||'',updatedAt:row.updated_at}))});
  }));

  app.patch(`${apiPrefix}/tasks/:taskId/status`, requireMobileAuth, asyncRoute(async (req,res)=>{
    if (!(await hasModulePermission(req.mobileUser,'modulo:tareas'))) return res.status(403).json({ok:false,message:'Sin permiso.'});
    const taskId=Number(req.params.taskId||0), status=String(req.body.status||'');
    if(!['Pendiente','En proceso','Completada'].includes(status)) return res.status(400).json({ok:false,message:'Estatus inválido.'});
    const [[task]]=await pool.execute('SELECT usuario_id,asignado_a FROM tareas WHERE id=? LIMIT 1',[taskId]);
    if(!task || (!isMobileAdmin(req.mobileUser) && Number(task.usuario_id)!==Number(req.mobileUser.id) && Number(task.asignado_a)!==Number(req.mobileUser.id))) return res.status(404).json({ok:false,message:'Tarea no encontrada.'});
    await pool.execute('UPDATE tareas SET estatus=? WHERE id=?',[status,taskId]); res.json({ok:true,status});
  }));

  async function listMobileFinance(req, res, scope) {
    const permission = scope === 'PAYABLE' ? 'modulo:cuentas-pagar' : 'modulo:cuentas-cobrar';
    if (!(await hasModulePermission(req.mobileUser, permission))) {
      return res.status(403).json({ ok: false, message: 'No tienes permiso para consultar este módulo.' });
    }
    const table = scope === 'PAYABLE' ? 'cuentas_por_pagar' : 'cuentas_por_cobrar';
    const fileTable = scope === 'PAYABLE' ? 'cuentas_por_pagar_archivos' : 'cuentas_por_cobrar_archivos';
    const search = String(req.query.search || '').trim().slice(0, 120);
    const state = String(req.query.state || '').trim().slice(0, 80);
    const pending = String(req.query.pending || '').trim().slice(0, 120);
    const company = String(req.query.company || '').trim().slice(0, 120);
    const from = /^\d{4}-\d{2}-\d{2}$/.test(String(req.query.from || '')) ? String(req.query.from) : '';
    const to = /^\d{4}-\d{2}-\d{2}$/.test(String(req.query.to || '')) ? String(req.query.to) : '';
    const like = `%${search}%`;
    const conditions = [];
    const params = [];
    appendBudgetOwnerCondition(conditions, params, req.mobileUser, 'p', permission);
    if (search) {
      conditions.push('(p.folio LIKE ? OR p.empresa LIKE ? OR p.titulo_proyecto LIKE ? OR p.po LIKE ? OR CAST(c.id AS CHAR) LIKE ?)');
      params.push(like, like, like, like, like);
    }
    if (state) { conditions.push('c.estado = ?'); params.push(state); }
    if (pending) { conditions.push('c.pendiente = ?'); params.push(pending); }
    if (company) { conditions.push('p.empresa = ?'); params.push(company); }
    if (from) { conditions.push('DATE(c.created_at) >= ?'); params.push(from); }
    if (to) { conditions.push('DATE(c.created_at) <= ?'); params.push(to); }
    const [rows] = await pool.execute(
      `SELECT c.id, c.presupuesto_id, c.estado, c.pendiente, c.monto,
              p.folio, p.empresa, p.cliente_usuario, p.titulo_proyecto, p.po,
              c.dias_pago, c.fecha_pago, c.created_at, c.updated_at,
              COUNT(a.id) AS files_count,
              GROUP_CONCAT(DISTINCT a.tipo ORDER BY a.tipo SEPARATOR '||') AS file_types
         FROM ${table} c
         LEFT JOIN presupuestos p ON p.id = c.presupuesto_id
         LEFT JOIN ${fileTable} a ON a.cuenta_id = c.id
        ${conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''}
        GROUP BY c.id, c.presupuesto_id, c.estado, c.pendiente, c.monto,
                 p.folio, p.empresa, p.cliente_usuario, p.titulo_proyecto, p.po,
                 c.dias_pago, c.fecha_pago, c.created_at, c.updated_at
        ORDER BY c.updated_at DESC
        LIMIT 200`,
      params
    );
    return res.json({
      ok: true,
      accounts: rows.map((row) => ({
        id: Number(row.id),
        projectId: Number(row.presupuesto_id || 0),
        folio: row.folio || '',
        company: row.empresa || '',
        client: row.cliente_usuario || '',
        title: row.titulo_proyecto || '',
        po: row.po || '',
        state: row.estado || '',
        pending: row.pendiente || '',
        amount: Number(row.monto || 0),
        paymentDays: Number(row.dias_pago || 0),
        paymentDate: row.fecha_pago,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        filesCount: Number(row.files_count || 0),
        fileTypes: String(row.file_types || '').split('||').filter(Boolean)
      }))
    });
  }

  app.get(`${apiPrefix}/finance/payables`, requireMobileAuth, asyncRoute((req, res) => listMobileFinance(req, res, 'PAYABLE')));
  app.get(`${apiPrefix}/finance/receivables`, requireMobileAuth, asyncRoute((req, res) => listMobileFinance(req, res, 'RECEIVABLE')));

  async function financeDetail(req, res, scope) {
    const permission = scope === 'PAYABLE' ? 'modulo:cuentas-pagar' : 'modulo:cuentas-cobrar';
    if (!(await hasModulePermission(req.mobileUser, permission))) return res.status(403).json({ok:false,message:'Sin permiso.'});
    const accountId = Number(req.params.accountId || 0);
    const table = scope === 'PAYABLE' ? 'cuentas_por_pagar' : 'cuentas_por_cobrar';
    const fileTable = scope === 'PAYABLE' ? 'cuentas_por_pagar_archivos' : 'cuentas_por_cobrar_archivos';
    const [[row]] = await pool.execute(
      `SELECT c.*,p.folio,p.empresa,p.sucursal,p.cliente_usuario,p.area,p.titulo_proyecto,p.po,
              COALESCE(NULLIF(CONCAT_WS(' ',u.nombre,u.apellido),''),u.usuario,'') AS owner
         FROM ${table} c LEFT JOIN presupuestos p ON p.id=c.presupuesto_id
         LEFT JOIN usuarios u ON u.user_id=p.usuario_id WHERE c.id=? LIMIT 1`, [accountId]
    );
    if (!row || (row.presupuesto_id && !(await canAccessBudget(req.mobileUser,row.presupuesto_id,permission,'')))) return res.status(404).json({ok:false,message:'Cuenta no encontrada.'});
    const [files] = await pool.execute(`SELECT id,tipo AS type,nombre AS name,created_at AS createdAt FROM ${fileTable} WHERE cuenta_id=? ORDER BY id DESC`,[accountId]);
    let payments=[];
    if(scope==='RECEIVABLE') {
      [payments]=await pool.execute('SELECT id,monto AS amount,fecha_pago AS paymentDate,referencia AS reference,created_at AS createdAt FROM cuentas_por_cobrar_pagos WHERE cuenta_id=? ORDER BY id DESC',[accountId]);
    }
    res.json({ok:true,account:{id:accountId,projectId:Number(row.presupuesto_id||0),folio:row.folio||'',company:row.empresa||'',branch:row.sucursal||'',client:row.cliente_usuario||'',area:row.area||'',title:row.titulo_proyecto||'',po:row.po||'',owner:row.owner||'',state:row.estado||'',pending:row.pendiente||'',amount:money(row.monto),paymentDays:Number(row.dias_pago||0),paymentDate:row.fecha_pago,createdAt:row.created_at,updatedAt:row.updated_at},files:files.map(file=>({...file,scope})),payments});
  }
  app.get(`${apiPrefix}/finance/payables/:accountId`, requireMobileAuth, asyncRoute((req,res)=>financeDetail(req,res,'PAYABLE')));
  app.get(`${apiPrefix}/finance/receivables/:accountId`, requireMobileAuth, asyncRoute((req,res)=>financeDetail(req,res,'RECEIVABLE')));

  app.get(`${apiPrefix}/approvals/budgets`, requireMobileAuth, asyncRoute(async (req, res) => {
    if (normalizeRole(req.mobileUser?.role) !== 'superadmin') {
      return res.status(403).json({ ok: false, message: 'Solo Superadmin puede aprobar cotizaciones.' });
    }
    const search = String(req.query.search || '').trim().slice(0, 120);
    const like = `%${search}%`;
    const [rows] = await pool.execute(
      `SELECT q.id, q.presupuesto_id, q.folio, q.version, q.estatus, q.created_at,
              p.folio AS project_folio, p.empresa, p.titulo_proyecto,
              GREATEST(COALESCE(SUM(i.subtotal), 0) - COALESCE(q.descuento_monto, 0), 0) AS subtotal
         FROM cotizaciones_cliente q
         INNER JOIN presupuestos p ON p.id = q.presupuesto_id
         LEFT JOIN cotizacion_cliente_partidas i ON i.cotizacion_id = q.id
        WHERE q.tipo = 'version'
          AND LOWER(TRIM(q.estatus)) <> 'aprobada'
          AND (? = '' OR q.folio LIKE ? OR p.folio LIKE ? OR p.empresa LIKE ? OR p.titulo_proyecto LIKE ?)
        GROUP BY q.id, q.presupuesto_id, q.folio, q.version, q.estatus, q.created_at,
                 p.folio, p.empresa, p.titulo_proyecto, q.descuento_monto
        ORDER BY q.created_at DESC
        LIMIT 100`,
      [search, like, like, like, like]
    );
    res.json({ ok: true, approvals: rows.map((row) => ({
      id: Number(row.id), projectId: Number(row.presupuesto_id), quote: row.folio || '',
      projectFolio: row.project_folio || '', company: row.empresa || '', title: row.titulo_proyecto || '',
      version: Number(row.version || 0), status: row.estatus || '', subtotal: Number(row.subtotal || 0),
      createdAt: row.created_at
    })) });
  }));

  app.post(`${apiPrefix}/approvals/budgets/:quoteId/approve`, requireMobileAuth, asyncRoute(async (req, res) => {
    if (normalizeRole(req.mobileUser?.role) !== 'superadmin') {
      return res.status(403).json({ ok: false, message: 'Solo Superadmin puede aprobar cotizaciones.' });
    }
    const quoteId = Number(req.params.quoteId || 0);
    const [rows] = await pool.execute(
      `SELECT q.id, q.estatus, COUNT(i.id) AS items_count
         FROM cotizaciones_cliente q
         LEFT JOIN cotizacion_cliente_partidas i ON i.cotizacion_id = q.id
        WHERE q.id = ? AND q.tipo = 'version'
        GROUP BY q.id, q.estatus
        LIMIT 1`,
      [quoteId]
    );
    if (!rows.length) return res.status(404).json({ ok: false, message: 'Cotización no encontrada.' });
    if (!Number(rows[0].items_count || 0)) return res.status(400).json({ ok: false, message: 'La cotización no tiene partidas.' });
    if (String(rows[0].estatus || '').toLowerCase() === 'aprobada') {
      return res.status(409).json({ ok: false, message: 'La cotización ya está aprobada.' });
    }
    await pool.execute("UPDATE cotizaciones_cliente SET estatus = 'Aprobada', aprobada_at = NOW() WHERE id = ?", [quoteId]);
    let pdfUrl = '';
    if (typeof generateClientQuotePdf === 'function') {
      const pdfPath = await generateClientQuotePdf(quoteId);
      pdfUrl = pdfPath ? `/${String(pdfPath).replace(/^\/+/, '')}` : '';
    }
    res.json({ ok: true, pdfUrl });
  }));

  app.get(`${apiPrefix}/attendance/team`, requireMobileAuth, asyncRoute(async (req, res) => {
    if (!isMobileAdmin(req.mobileUser)) {
      return res.status(403).json({ ok: false, message: 'Solo administración puede consultar asistencias del equipo.' });
    }
    const date = /^\d{4}-\d{2}-\d{2}$/.test(String(req.query.date || '')) ? String(req.query.date) : null;
    const search = String(req.query.search || '').trim().slice(0, 120);
    const like = `%${search}%`;
    const [rows] = await pool.execute(
      `SELECT a.id, a.presupuesto_id, a.supervisor_id, a.evento, a.latitud, a.longitud,
              a.distancia_proyecto_metros, a.dentro_geocerca, a.created_at,
              p.folio, p.empresa, p.titulo_proyecto,
              COALESCE(NULLIF(CONCAT_WS(' ', u.nombre, u.apellido), ''), u.usuario, '') AS supervisor
         FROM proyecto_supervision_asistencias a
         INNER JOIN (
           SELECT supervisor_id, presupuesto_id, MAX(id) AS last_id
             FROM proyecto_supervision_asistencias
            WHERE (? IS NULL OR DATE(created_at) = ?)
            GROUP BY supervisor_id, presupuesto_id
         ) latest ON latest.last_id = a.id
         INNER JOIN presupuestos p ON p.id = a.presupuesto_id
         LEFT JOIN usuarios u ON u.user_id = a.supervisor_id
        WHERE (? = '' OR p.folio LIKE ? OR p.empresa LIKE ? OR p.titulo_proyecto LIKE ? OR u.usuario LIKE ? OR u.nombre LIKE ? OR u.apellido LIKE ?)
        ORDER BY a.created_at DESC
        LIMIT 200`,
      [date, date, search, like, like, like, like, like, like]
    );
    res.json({ ok: true, date: date || 'latest', attendance: rows.map((row) => ({
      id: Number(row.id), projectId: Number(row.presupuesto_id), supervisorId: Number(row.supervisor_id),
      supervisor: row.supervisor || '', event: row.evento || '', latitude: Number(row.latitud),
      longitude: Number(row.longitud), distanceMeters: Number(row.distancia_proyecto_metros || 0),
      insideGeofence: Boolean(row.dentro_geocerca), createdAt: row.created_at,
      folio: row.folio || '', company: row.empresa || '', project: row.titulo_proyecto || ''
    })) });
  }));

  app.get(`${apiPrefix}/reports/summary`, requireMobileAuth, asyncRoute(async (req, res) => {
    const projectConditions = [];
    const projectParams = [];
    appendBudgetOwnerCondition(projectConditions, projectParams, req.mobileUser, 'p', 'modulo:presupuesto');
    const [projectRows] = await pool.execute(
      `SELECT COUNT(*) AS total FROM presupuestos p ${projectConditions.length ? `WHERE ${projectConditions.join(' AND ')}` : ''}`,
      projectParams
    );
    const canPayables = await hasModulePermission(req.mobileUser, 'modulo:cuentas-pagar');
    const canReceivables = await hasModulePermission(req.mobileUser, 'modulo:cuentas-cobrar');
    const payableConditions = ["c.pendiente <> 'Sin pendientes de documentación'"];
    const payableParams = [];
    appendBudgetOwnerCondition(payableConditions, payableParams, req.mobileUser, 'p', 'modulo:cuentas-pagar');
    const receivableConditions = ["c.pendiente <> 'Sin pendientes de documentación'"];
    const receivableParams = [];
    appendBudgetOwnerCondition(receivableConditions, receivableParams, req.mobileUser, 'p', 'modulo:cuentas-cobrar');
    const [payableRows] = canPayables
      ? await pool.execute(`SELECT COUNT(*) AS total, COALESCE(SUM(c.monto),0) AS amount FROM cuentas_por_pagar c LEFT JOIN presupuestos p ON p.id = c.presupuesto_id WHERE ${payableConditions.join(' AND ')}`, payableParams)
      : [[{ total: 0, amount: 0 }]];
    const [receivableRows] = canReceivables
      ? await pool.execute(`SELECT COUNT(*) AS total, COALESCE(SUM(c.monto),0) AS amount FROM cuentas_por_cobrar c LEFT JOIN presupuestos p ON p.id = c.presupuesto_id WHERE ${receivableConditions.join(' AND ')}`, receivableParams)
      : [[{ total: 0, amount: 0 }]];
    const [reportRows] = await pool.execute(
      `SELECT COUNT(*) AS total
         FROM proyecto_reportes_supervision r
         INNER JOIN presupuestos p ON p.id = r.presupuesto_id
        WHERE r.estado = 'BORRADOR'${projectConditions.length ? ` AND ${projectConditions.join(' AND ')}` : ''}`,
      projectParams
    );
    res.json({ ok: true, summary: {
      projects: Number(projectRows[0]?.total || 0),
      pendingPayables: Number(payableRows[0]?.total || 0), payableAmount: Number(payableRows[0]?.amount || 0),
      pendingReceivables: Number(receivableRows[0]?.total || 0), receivableAmount: Number(receivableRows[0]?.amount || 0),
      draftSupervisionReports: Number(reportRows[0]?.total || 0)
    } });
  }));

  const mobileExportTickets = new Map();
  app.post(`${apiPrefix}/exports/:kind/open`, requireMobileAuth, asyncRoute(async (req,res)=>{
    const kind=String(req.params.kind||'').toLowerCase();
    if(!['payables','receivables','attendance'].includes(kind)) return res.status(404).json({ok:false,message:'Exportación no disponible.'});
    if(kind==='attendance' && !isMobileAdmin(req.mobileUser)) return res.status(403).json({ok:false,message:'Sin permiso.'});
    if(kind!=='attendance'){
      const permission=kind==='payables'?'modulo:cuentas-pagar':'modulo:cuentas-cobrar';
      if(!(await hasModulePermission(req.mobileUser,permission))) return res.status(403).json({ok:false,message:'Sin permiso.'});
    }
    const token=crypto.randomBytes(24).toString('hex');
    mobileExportTickets.set(token,{kind,userId:Number(req.mobileUser.id),expiresAt:Date.now()+5*60*1000});
    res.json({ok:true,url:`${req.protocol}://${req.get('host')}${apiPrefix}/exports/open/${token}`,expiresInSeconds:300});
  }));

  app.get(`${apiPrefix}/exports/open/:token`, asyncRoute(async (req,res)=>{
    const token=String(req.params.token||''), ticket=mobileExportTickets.get(token);
    if(!ticket || ticket.expiresAt<Date.now()){mobileExportTickets.delete(token);return res.status(410).send('El enlace de exportación expiró.');}
    const user=await loadMobileUserById(ticket.userId);
    if(!user) return res.status(401).send('Sesión no válida.');
    if(ticket.kind==='attendance'){
      if(!isMobileAdmin(user)) return res.status(403).send('Sin permiso.');
      const [rows]=await pool.execute(`SELECT p.folio,p.empresa,p.titulo_proyecto,COALESCE(NULLIF(CONCAT_WS(' ',u.nombre,u.apellido),''),u.usuario,'') AS supervisor,a.evento,a.distancia_proyecto_metros,a.dentro_geocerca,a.created_at FROM proyecto_supervision_asistencias a INNER JOIN presupuestos p ON p.id=a.presupuesto_id LEFT JOIN usuarios u ON u.user_id=a.supervisor_id ORDER BY a.created_at DESC LIMIT 5000`);
      return sendCsv(res,'asistencias-movil.csv',['Folio','Empresa','Proyecto','Supervisor','Evento','Distancia m','En ubicación','Fecha'],rows.map(row=>[row.folio,row.empresa,row.titulo_proyecto,row.supervisor,row.evento,row.distancia_proyecto_metros,row.dentro_geocerca?'Sí':'No',row.created_at]));
    }
    const payable=ticket.kind==='payables', permission=payable?'modulo:cuentas-pagar':'modulo:cuentas-cobrar', table=payable?'cuentas_por_pagar':'cuentas_por_cobrar';
    const conditions=[],params=[]; appendBudgetOwnerCondition(conditions,params,user,'p',permission);
    const [rows]=await pool.execute(`SELECT p.folio,p.empresa,p.titulo_proyecto,p.po,c.estado,c.pendiente,c.monto FROM ${table} c LEFT JOIN presupuestos p ON p.id=c.presupuesto_id ${conditions.length?`WHERE ${conditions.join(' AND ')}`:''} ORDER BY c.updated_at DESC LIMIT 5000`,params);
    return sendCsv(res,`${ticket.kind}-movil.csv`,['Folio','Empresa','Proyecto','PO','Estado','Pendiente','Monto'],rows.map(row=>[row.folio,row.empresa,row.titulo_proyecto,row.po,row.estado,row.pendiente,row.monto]));
  }));

  app.get(`${apiPrefix}/exports/:kind.csv`, requireMobileAuth, asyncRoute(async (req, res) => {
    const kind = String(req.params.kind || '').toLowerCase();
    if (!['payables', 'receivables', 'attendance'].includes(kind)) {
      return res.status(404).json({ ok: false, message: 'Exportación no disponible.' });
    }
    if (kind === 'attendance') {
      if (!isMobileAdmin(req.mobileUser)) return res.status(403).json({ ok: false, message: 'Sin permiso.' });
      const [rows] = await pool.execute(
        `SELECT p.folio, p.empresa, p.titulo_proyecto,
                COALESCE(NULLIF(CONCAT_WS(' ', u.nombre, u.apellido), ''), u.usuario, '') AS supervisor,
                a.evento, a.distancia_proyecto_metros, a.dentro_geocerca, a.created_at
           FROM proyecto_supervision_asistencias a
           INNER JOIN presupuestos p ON p.id = a.presupuesto_id
           LEFT JOIN usuarios u ON u.user_id = a.supervisor_id
          ORDER BY a.created_at DESC LIMIT 5000`
      );
      return sendCsv(res, 'asistencias-movil.csv', ['Folio', 'Empresa', 'Proyecto', 'Supervisor', 'Evento', 'Distancia m', 'En ubicación', 'Fecha'], rows.map((row) => [row.folio, row.empresa, row.titulo_proyecto, row.supervisor, row.evento, row.distancia_proyecto_metros, row.dentro_geocerca ? 'Sí' : 'No', row.created_at]));
    }
    const permission = kind === 'payables' ? 'modulo:cuentas-pagar' : 'modulo:cuentas-cobrar';
    if (!(await hasModulePermission(req.mobileUser, permission))) return res.status(403).json({ ok: false, message: 'Sin permiso.' });
    const table = kind === 'payables' ? 'cuentas_por_pagar' : 'cuentas_por_cobrar';
    const conditions = [];
    const params = [];
    appendBudgetOwnerCondition(conditions, params, req.mobileUser, 'p', permission);
    const [rows] = await pool.execute(
      `SELECT p.folio, p.empresa, p.titulo_proyecto, p.po, c.estado, c.pendiente, c.monto
         FROM ${table} c LEFT JOIN presupuestos p ON p.id = c.presupuesto_id
        ${conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''}
        ORDER BY c.updated_at DESC LIMIT 5000`,
      params
    );
    return sendCsv(res, `${kind}-movil.csv`, ['Folio', 'Empresa', 'Proyecto', 'PO', 'Estado', 'Pendiente', 'Monto'], rows.map((row) => [row.folio, row.empresa, row.titulo_proyecto, row.po, row.estado, row.pendiente, row.monto]));
  }));
}

module.exports = { registerMobileSupervisionRoutes };
