const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const MOBILE_SESSION_DAYS = 30;
const MAX_PHOTO_BYTES = 12 * 1024 * 1024;
const MAX_PHOTOS_PER_REQUEST = 10;

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
    logServerError
  } = options;

  if (!app || !pool) throw new Error('registerMobileSupervisionRoutes requiere app y pool.');

  const rootDir = projectRoot || process.cwd();
  const uploadRoot = path.join(rootDir, 'uploads', 'supervision');
  fs.mkdirSync(uploadRoot, { recursive: true });

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
    { key: 'compras', label: 'Compras', permission: 'modulo:compras', mobileAvailable: false },
    { key: 'cuentas-pagar', label: 'Cuentas por pagar', permission: 'modulo:cuentas-pagar', mobileAvailable: false },
    { key: 'cuentas-cobrar', label: 'Cuentas por cobrar', permission: 'modulo:cuentas-cobrar', mobileAvailable: false },
    { key: 'inventario', label: 'Inventario', permission: 'modulo:inventario', mobileAvailable: false },
    { key: 'tareas', label: 'Tareas', permission: 'modulo:tareas', mobileAvailable: false },
    { key: 'exportaciones', label: 'Exportaciones', permission: 'modulo:exportaciones', mobileAvailable: false },
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
    if (!rows.length) return null;
    return {
      projectId: Number(rows[0].presupuesto_id),
      name: rows[0].nombre_ubicacion || '',
      latitude: Number(rows[0].latitud),
      longitude: Number(rows[0].longitud),
      radiusMeters: Number(rows[0].radio_metros || 150),
      updatedAt: rows[0].updated_at
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
}

module.exports = { registerMobileSupervisionRoutes };
