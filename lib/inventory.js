'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');

const MAX_IMAGES = 5;
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const INVENTORY_COLUMNS = {
  folio: 'VARCHAR(80) NULL', descripcion: 'TEXT NULL', numero_serie: "VARCHAR(180) NOT NULL DEFAULT ''",
  modelo: "VARCHAR(180) NOT NULL DEFAULT ''", tipo_herramienta: "VARCHAR(120) NOT NULL DEFAULT ''",
  observaciones: 'TEXT NULL', ubicacion: "VARCHAR(180) NOT NULL DEFAULT ''",
  unidad: "VARCHAR(30) NOT NULL DEFAULT 'pieza'", version: 'INT NOT NULL DEFAULT 1'
};
const PHOTO_TABLE = `CREATE TABLE IF NOT EXISTS inventario_imagenes (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, inventario_id INT NOT NULL,
  nombre VARCHAR(255) NOT NULL, archivo VARCHAR(100) NOT NULL, mime VARCHAR(40) NOT NULL,
  bytes INT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_inventario_imagenes_producto (inventario_id),
  CONSTRAINT fk_inventario_imagenes_producto FOREIGN KEY (inventario_id) REFERENCES inventario(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`;
const MOVEMENT_TABLE = `CREATE TABLE IF NOT EXISTS inventario_movimientos (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, inventario_id INT NOT NULL,
  tipo VARCHAR(20) NOT NULL, cantidad_anterior INT NOT NULL, cantidad_nueva INT NOT NULL,
  usuario_id INT NULL, origen VARCHAR(20) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_inventario_movimientos_producto (inventario_id),
  CONSTRAINT fk_inventario_movimientos_producto FOREIGN KEY (inventario_id) REFERENCES inventario(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`;
function failure(message, statusCode = 400) { return Object.assign(new Error(message), { statusCode }); }
function imageFormat(buffer) {
  if (!Buffer.isBuffer(buffer)) throw failure('La imagen no es válida.');
  if (buffer.length > MAX_IMAGE_BYTES) throw failure('Cada imagen debe pesar hasta 8 MB.');
  if (buffer.length >= 24 && buffer.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) return { ext: 'png', mime: 'image/png' };
  if (buffer.length >= 4 && buffer[0] === 255 && buffer[1] === 216 && buffer[2] === 255) return { ext: 'jpg', mime: 'image/jpeg' };
  if (buffer.length >= 12 && buffer.toString('ascii',0,4) === 'RIFF' && buffer.toString('ascii',8,12) === 'WEBP') return { ext: 'webp', mime: 'image/webp' };
  throw failure('Usa fotografías JPG, PNG o WEBP. El archivo seleccionado no es una imagen compatible.');
}
function text(value, label, max, required = false) {
  const result = String(value ?? '').trim();
  if ((required && !result) || result.length > max) throw failure(`${label}: ${required ? 'completa este campo y usa' : 'usa'} hasta ${max} caracteres.`);
  return result;
}
function parseItem(body = {}, editing = false) {
  let source = body;
  if (body.item != null) {
    try { source = JSON.parse(body.item); } catch (_) { throw failure('Los datos del artículo no son válidos.'); }
  }
  if (!source || Array.isArray(source) || typeof source !== 'object') throw failure('Los datos del artículo no son válidos.');
  const quantity = source.quantity === '' || source.quantity == null ? NaN : Number(source.quantity);
  if (!Number.isSafeInteger(quantity) || quantity < 0 || quantity > 2147483647) throw failure('La cantidad debe ser un número entero mayor o igual a cero.');
  const version = Number(source.version);
  if (editing && (!Number.isSafeInteger(version) || version < 1)) throw failure('Abre nuevamente el artículo antes de editarlo.');
  const removed = source.removedImageIds ?? [];
  if (!Array.isArray(removed) || removed.length > MAX_IMAGES || removed.some(id => !Number.isSafeInteger(Number(id)) || Number(id) < 1)) throw failure('La selección de imágenes no es válida.');
  return {
    name: text(source.name, 'Nombre', 255, true), quantity,
    description: text(source.description, 'Descripción', 5000), serialNumber: text(source.serialNumber, 'Número de serie', 180),
    model: text(source.model, 'Modelo', 180), toolType: text(source.toolType, 'Tipo de herramienta', 120, true),
    observations: text(source.observations, 'Observaciones', 5000), location: text(source.location, 'Ubicación', 180),
    unit: text(source.unit || 'pieza', 'Unidad', 30), version,
    removedImageIds: [...new Set(removed.map(Number))]
  };
}
function permissionsFor(user, access = {}) {
  const all = new Set(access.permissions || []);
  const superadmin = String(user?.role || '').toLowerCase() === 'superadmin';
  const canRead = superadmin || all.has('modulo:*') || all.has('modulo:inventario');
  return { canRead, canCreate: canRead && (superadmin || all.has('accion:crear')), canEdit: canRead && (superadmin || all.has('accion:editar')) };
}
function createInventoryService({ pool, rootDir }) {
  const directory = path.join(rootDir, 'storage', 'inventory');
  let ready;
  async function ensureSchema() {
    if (!ready) ready = (async () => {
      await pool.execute(`CREATE TABLE IF NOT EXISTS inventario (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, producto VARCHAR(255) NOT NULL,
        stock INT DEFAULT 0, precio DECIMAL(12,2) DEFAULT 0.00, usuario_id INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
      const [columns] = await pool.execute("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'inventario'");
      const existing = new Set(columns.map(row => row.COLUMN_NAME));
      for (const [name, definition] of Object.entries(INVENTORY_COLUMNS)) {
        if (existing.has(name)) continue;
        try { await pool.execute(`ALTER TABLE inventario ADD COLUMN ${name} ${definition}`); }
        catch (error) { if (error.code !== 'ER_DUP_FIELDNAME') throw error; }
      }
      await pool.execute("UPDATE inventario SET folio = CONCAT('INV-', LPAD(id, GREATEST(6, CHAR_LENGTH(id)), '0')) WHERE folio IS NULL OR folio = ''");
      await pool.execute(PHOTO_TABLE);
      await pool.execute(MOVEMENT_TABLE);
      await fs.promises.mkdir(directory, { recursive: true });
    })().catch(error => { ready = null; throw error; });
    return ready;
  }
  function serialize(row, images = [], prefix = '/api/inventory') {
    return { id: Number(row.id), folio: row.folio || `INV-${String(row.id).padStart(6,'0')}`, name: row.producto,
      quantity: Number(row.stock || 0), description: row.descripcion || '', serialNumber: row.numero_serie || '',
      model: row.modelo || '', toolType: row.tipo_herramienta || '', observations: row.observaciones || '',
      location: row.ubicacion || '', unit: row.unidad || 'pieza', version: Number(row.version || 1),
      createdAt: row.created_at, updatedAt: row.updated_at,
      images: images.map(photo => ({ id: Number(photo.id), name: photo.nombre, url: `${prefix}/images/${photo.id}` })) };
  }
  async function get(id, prefix, executor = pool) {
    const [rows] = await executor.execute('SELECT * FROM inventario WHERE id = ? LIMIT 1', [id]);
    if (!rows.length) throw failure('Artículo no encontrado.',404);
    const [photos] = await executor.execute('SELECT * FROM inventario_imagenes WHERE inventario_id = ? ORDER BY id', [id]);
    const [history] = await executor.execute('SELECT tipo, cantidad_anterior, cantidad_nueva, origen, created_at FROM inventario_movimientos WHERE inventario_id = ? ORDER BY id DESC LIMIT 30', [id]);
    return { ...serialize(rows[0],photos,prefix), movements: history.map(row => ({type:row.tipo, previousQuantity:Number(row.cantidad_anterior), quantity:Number(row.cantidad_nueva), source:row.origen, createdAt:row.created_at})) };
  }
  async function list(query = {}, prefix) {
    const conditions = [], params = [];
    const search = String(query.search || '').trim().slice(0,255);
    if (search) {
      conditions.push('(producto LIKE ? OR folio LIKE ? OR numero_serie LIKE ? OR modelo LIKE ? OR tipo_herramienta LIKE ? OR descripcion LIKE ? OR ubicacion LIKE ?)');
      for (let i=0;i<7;i++) params.push(`%${search}%`);
    }
    const type = String(query.type || '').trim().slice(0,120);
    if (type) { conditions.push('tipo_herramienta = ?'); params.push(type); }
    if (query.availability === 'available') conditions.push('stock > 0');
    if (query.availability === 'empty') conditions.push('COALESCE(stock,0) = 0');
    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const page = Math.max(1, Math.min(1000000, Math.trunc(Number(query.page) || 1)));
    const limit = Math.max(1, Math.min(100, Math.trunc(Number(query.limit) || 24)));
    const [[count]] = await pool.execute(`SELECT COUNT(*) AS total FROM inventario ${where}`, params);
    // MySQL/MariaDB reject placeholders for LIMIT on some driver versions; these are bounded integers.
    const [rows] = await pool.execute(`SELECT * FROM inventario ${where} ORDER BY id DESC LIMIT ${limit} OFFSET ${(page-1)*limit}`,params);
    let photos=[];
    if (rows.length) [photos] = await pool.execute(`SELECT * FROM inventario_imagenes WHERE inventario_id IN (${rows.map(()=>'?').join(',')}) ORDER BY id`,rows.map(row=>row.id));
    const [[summary]] = await pool.execute('SELECT COUNT(*) AS articles, COALESCE(SUM(stock),0) AS units, COALESCE(SUM(CASE WHEN COALESCE(stock,0) = 0 THEN 1 ELSE 0 END),0) AS empty FROM inventario');
    const [types] = await pool.execute("SELECT DISTINCT tipo_herramienta AS type FROM inventario WHERE tipo_herramienta <> '' ORDER BY tipo_herramienta");
    return { items: rows.map(row=>serialize(row,photos.filter(photo=>Number(photo.inventario_id)===Number(row.id)),prefix)),
      total:Number(count.total),page,limit,hasMore:page*limit<Number(count.total),
      summary:{articles:Number(summary.articles),units:Number(summary.units),empty:Number(summary.empty)},types:types.map(row=>row.type) };
  }
  async function save({ id, body, files = [], userId, source, prefix }) {
    const editing = Boolean(id), item = parseItem(body, editing);
    if (files.length > MAX_IMAGES) throw failure('Puedes guardar hasta 5 imágenes por artículo.');
    const staged = files.map(file => ({...file,...imageFormat(file.buffer)}));
    const written = [], oldPaths = [];
    const connection = await pool.getConnection();
    let committed = false;
    try {
      await connection.beginTransaction();
      let previous = 0, existingPhotos = [];
      if (editing) {
        const [[row]] = await connection.execute('SELECT id, stock, version FROM inventario WHERE id = ? LIMIT 1 FOR UPDATE',[id]);
        if (!row) throw failure('Artículo no encontrado.',404);
        if (Number(row.version || 1) !== item.version) throw failure('El artículo cambió en otro dispositivo. Vuelve a abrirlo para editar la versión actual.',409);
        previous = Number(row.stock || 0);
        [existingPhotos] = await connection.execute('SELECT * FROM inventario_imagenes WHERE inventario_id = ? ORDER BY id',[id]);
        if (item.removedImageIds.some(photoId=>!existingPhotos.some(photo=>Number(photo.id)===photoId))) throw failure('Una de las imágenes no pertenece a este artículo.');
      } else if (item.removedImageIds.length) throw failure('No puedes retirar imágenes de un artículo nuevo.');
      if (existingPhotos.length - item.removedImageIds.length + staged.length > MAX_IMAGES) throw failure('Puedes guardar hasta 5 imágenes por artículo.');
      const fields = [item.name,item.quantity,item.description,item.serialNumber,item.model,item.toolType,item.observations,item.location,item.unit];
      if (editing) {
        await connection.execute('UPDATE inventario SET producto = ?, stock = ?, descripcion = ?, numero_serie = ?, modelo = ?, tipo_herramienta = ?, observaciones = ?, ubicacion = ?, unidad = ?, version = version + 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?',[...fields,id]);
      } else {
        const [result] = await connection.execute('INSERT INTO inventario (producto, stock, descripcion, numero_serie, modelo, tipo_herramienta, observaciones, ubicacion, unidad, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',[...fields,userId]);
        id = result.insertId;
        await connection.execute('UPDATE inventario SET folio = ? WHERE id = ?',[`INV-${String(id).padStart(6,'0')}`,id]);
      }
      for (const photoId of item.removedImageIds) {
        const photo=existingPhotos.find(photo=>Number(photo.id)===photoId);
        await connection.execute('DELETE FROM inventario_imagenes WHERE id = ? AND inventario_id = ?',[photoId,id]);
        oldPaths.push(path.join(directory,path.basename(photo.archivo)));
      }
      for (const file of staged) {
        const filename = `${crypto.randomBytes(24).toString('hex')}.${file.ext}`;
        const destination = path.join(directory, filename);
        await fs.promises.writeFile(destination,file.buffer,{flag:'wx'}); written.push(destination);
        await connection.execute('INSERT INTO inventario_imagenes (inventario_id, nombre, archivo, mime, bytes) VALUES (?, ?, ?, ?, ?)',[id,path.basename(file.originalname || 'Imagen').slice(0,255),filename,file.mime,file.buffer.length]);
      }
      if (!editing || previous !== item.quantity) await connection.execute('INSERT INTO inventario_movimientos (inventario_id, tipo, cantidad_anterior, cantidad_nueva, usuario_id, origen) VALUES (?, ?, ?, ?, ?, ?)',[id,editing?'Ajuste':'Alta',previous,item.quantity,userId,source]);
      const result=await get(id,prefix,connection);
      await connection.commit();committed = true;
      for (const filename of oldPaths) await fs.promises.unlink(filename).catch(()=>{});
      return result;
    } catch (error) {
      if (!committed) {
        await connection.rollback().catch(()=>{});
        for (const filename of written) await fs.promises.unlink(filename).catch(()=>{});
      }
      throw error;
    } finally { connection.release(); }
  }
  async function image(id) {
    const [[row]] = await pool.execute('SELECT archivo, mime FROM inventario_imagenes WHERE id = ? LIMIT 1',[id]);
    if (!row) throw failure('Imagen no encontrada.',404);
    const filename=path.join(directory,path.basename(row.archivo));
    if (!fs.existsSync(filename)) throw failure('Imagen no encontrada.',404);
    return {filename,mime:row.mime};
  }
  return {ensureSchema,get,list,save,image};
}
function registerInventoryRoutes({ app, pool, rootDir, webAuth, mobileAuth, getAccess, logServerError }) {
  const service = createInventoryService({pool,rootDir});
  const upload = multer({storage:multer.memoryStorage(),limits:{fileSize:MAX_IMAGE_BYTES,files:MAX_IMAGES,fields:2,fieldSize:64*1024}}).array('images',MAX_IMAGES);
  const guarded = handler => async (req,res) => {
    try { await service.ensureSchema();await handler(req,res); }
    catch (error) { if (!error.statusCode) logServerError?.('inventory',error);res.status(error.statusCode || 500).json({ok:false,message:error.statusCode?error.message:'No se pudo completar la operación de inventario.'}); }
  };
  for (const [prefix,auth,source] of [['/api/inventory',webAuth,'web'],['/api/mobile/v1/inventory',mobileAuth,'app']]) {
    if (typeof auth !== 'function') continue;
    async function access(req,res,next) {
      try {
        const user = source==='web'?req.session?.user:req.mobileUser;
        req.inventoryUser=user;req.inventoryAccess=permissionsFor(user,await getAccess(user));
        if (!req.inventoryAccess.canRead) return res.status(403).json({ok:false,message:'No tienes acceso a Inventario.'});
        res.setHeader('Cache-Control','private, no-store');next();
      } catch(error) {logServerError?.('inventory-access',error);res.status(500).json({ok:false,message:'No se pudieron validar los permisos.'});}
    }
    app.get(prefix,auth,access,guarded(async(req,res)=>res.json({ok:true,...await service.list(req.query,prefix),permissions:req.inventoryAccess})));
    app.get(`${prefix}/images/:imageId`,auth,access,guarded(async(req,res)=>{
      const photo=await service.image(Number(req.params.imageId));res.type(photo.mime);res.setHeader('X-Content-Type-Options','nosniff');res.sendFile(photo.filename);
    }));
    app.get(`${prefix}/:itemId`,auth,access,guarded(async(req,res)=>res.json({ok:true,item:await service.get(Number(req.params.itemId),prefix),permissions:req.inventoryAccess})));
    const canWrite=editing=>(req,res,next)=>{
      if (!(editing?req.inventoryAccess.canEdit:req.inventoryAccess.canCreate)) return res.status(403).json({ok:false,message:editing?'No tienes permiso para editar artículos.':'No tienes permiso para dar de alta artículos.'});next();
    };
    const multipart=(req,res,next)=>{
      if (!req.is('multipart/form-data')) return next();
      upload(req,res,error=>error?res.status(400).json({ok:false,message:error.code==='LIMIT_FILE_SIZE'?'Cada imagen debe pesar hasta 8 MB.':'Usa hasta 5 imágenes y revisa los archivos seleccionados.'}):next());
    };
    const save=editing=>guarded(async(req,res)=>{
      const id=editing?Number(req.params.itemId):null;
      if (editing && (!Number.isSafeInteger(id) || id<1)) throw failure('Artículo inválido.');
      const item=await service.save({id,body:req.body,files:req.files||[],userId:Number(req.inventoryUser.id),source,prefix});
      res.status(editing?200:201).json({ok:true,item,message:editing?'Cambios guardados.':'Artículo registrado correctamente.'});
    });
    app.post(prefix,auth,access,canWrite(false),multipart,save(false));
    app.put(`${prefix}/:itemId`,auth,access,canWrite(true),multipart,save(true));
  }
  return service;
}
module.exports={registerInventoryRoutes,createInventoryService,parseItem,imageFormat,permissionsFor,INVENTORY_COLUMNS,PHOTO_TABLE,MOVEMENT_TABLE};
