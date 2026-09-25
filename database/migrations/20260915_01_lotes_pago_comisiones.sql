-- DALVO SYSTEM
-- 2026-09-15
-- Lotes de pago para seleccionar y liquidar varias comisiones en una sola operación.

CREATE TABLE IF NOT EXISTS lotes_pago_comisiones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  folio VARCHAR(60) NOT NULL,
  estado VARCHAR(30) NOT NULL DEFAULT 'Pagado',
  modo_agrupacion VARCHAR(20) NOT NULL DEFAULT 'persona',
  total DECIMAL(14,2) NOT NULL DEFAULT 0,
  fecha_pago DATE NOT NULL,
  pdf_ruta VARCHAR(360) NOT NULL DEFAULT '',
  usuario_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_lotes_pago_comisiones_folio (folio),
  INDEX idx_lotes_pago_comisiones_fecha (fecha_pago),
  INDEX idx_lotes_pago_comisiones_estado (estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS lotes_pago_comisiones_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lote_id INT NOT NULL,
  cuenta_id INT NOT NULL,
  comision_id INT NOT NULL,
  movimiento_id INT NULL,
  supervisor_id INT NULL,
  supervisor_nombre VARCHAR(220) NOT NULL DEFAULT '',
  empresa VARCHAR(180) NOT NULL DEFAULT '',
  proyecto VARCHAR(220) NOT NULL DEFAULT '',
  folio_presupuesto VARCHAR(60) NOT NULL DEFAULT '',
  folio_occom VARCHAR(60) NOT NULL DEFAULT '',
  monto_bruto DECIMAL(14,2) NOT NULL DEFAULT 0,
  adeudo_monto DECIMAL(14,2) NOT NULL DEFAULT 0,
  monto_pagado DECIMAL(14,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_lotes_pago_comisiones_item (comision_id),
  INDEX idx_lotes_pago_comisiones_items_lote (lote_id),
  INDEX idx_lotes_pago_comisiones_items_cuenta (cuenta_id),
  INDEX idx_lotes_pago_comisiones_items_supervisor (supervisor_id),
  CONSTRAINT fk_lotes_pago_comisiones_items_lote
    FOREIGN KEY (lote_id) REFERENCES lotes_pago_comisiones(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
