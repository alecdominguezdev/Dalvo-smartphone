-- DALVO SYSTEM
-- 2026-09-18
-- Agrupación de varias cuentas por cobrar en un solo cobro general.

CREATE TABLE IF NOT EXISTS lotes_cobro_clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  folio VARCHAR(60) NOT NULL,
  estado VARCHAR(30) NOT NULL DEFAULT 'Pendiente',
  empresa VARCHAR(180) NOT NULL DEFAULT '',
  intermediario VARCHAR(180) NOT NULL DEFAULT '',
  referencia_externa VARCHAR(160) NOT NULL DEFAULT '',
  porcentaje_descuento DECIMAL(8,4) NOT NULL DEFAULT 0,
  monto_original DECIMAL(14,2) NOT NULL DEFAULT 0,
  descuento_monto DECIMAL(14,2) NOT NULL DEFAULT 0,
  monto_cobrar DECIMAL(14,2) NOT NULL DEFAULT 0,
  fecha_cobro DATE NULL,
  pdf_ruta VARCHAR(360) NOT NULL DEFAULT '',
  observaciones VARCHAR(500) NOT NULL DEFAULT '',
  usuario_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_lotes_cobro_clientes_folio (folio),
  INDEX idx_lotes_cobro_clientes_estado (estado),
  INDEX idx_lotes_cobro_clientes_empresa (empresa),
  INDEX idx_lotes_cobro_clientes_fecha (fecha_cobro)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS lotes_cobro_clientes_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lote_id INT NOT NULL,
  cuenta_id INT NOT NULL,
  cotizacion_cliente_id INT NOT NULL,
  presupuesto_id INT NOT NULL,
  folio_cotizacion VARCHAR(80) NOT NULL DEFAULT '',
  folio_presupuesto VARCHAR(80) NOT NULL DEFAULT '',
  po_cliente VARCHAR(120) NOT NULL DEFAULT '',
  proyecto VARCHAR(220) NOT NULL DEFAULT '',
  monto_original DECIMAL(14,2) NOT NULL DEFAULT 0,
  porcentaje_descuento DECIMAL(8,4) NOT NULL DEFAULT 0,
  descuento_monto DECIMAL(14,2) NOT NULL DEFAULT 0,
  ajuste_redondeo DECIMAL(14,2) NOT NULL DEFAULT 0,
  monto_cobrar DECIMAL(14,2) NOT NULL DEFAULT 0,
  pago_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_lotes_cobro_item_cuenta (cuenta_id),
  UNIQUE KEY uq_lotes_cobro_item_cotizacion (cotizacion_cliente_id),
  INDEX idx_lotes_cobro_items_lote (lote_id),
  INDEX idx_lotes_cobro_items_presupuesto (presupuesto_id),
  CONSTRAINT fk_lotes_cobro_items_lote FOREIGN KEY (lote_id)
    REFERENCES lotes_cobro_clientes(id) ON DELETE CASCADE,
  CONSTRAINT fk_lotes_cobro_items_cuenta FOREIGN KEY (cuenta_id)
    REFERENCES cuentas_por_cobrar(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS lotes_cobro_clientes_archivos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lote_id INT NOT NULL,
  item_id INT NULL,
  tipo VARCHAR(80) NOT NULL DEFAULT 'Comprobante de pago',
  nombre VARCHAR(260) NOT NULL DEFAULT '',
  ruta VARCHAR(360) NOT NULL DEFAULT '',
  usuario_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_lotes_cobro_archivos_lote (lote_id),
  INDEX idx_lotes_cobro_archivos_item (item_id),
  CONSTRAINT fk_lotes_cobro_archivos_lote FOREIGN KEY (lote_id)
    REFERENCES lotes_cobro_clientes(id) ON DELETE CASCADE,
  CONSTRAINT fk_lotes_cobro_archivos_item FOREIGN KEY (item_id)
    REFERENCES lotes_cobro_clientes_items(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
