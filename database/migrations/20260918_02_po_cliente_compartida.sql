-- DALVO SYSTEM
-- 2026-09-18
-- Una sola PO de cliente puede respaldar varios presupuestos/proyectos.

CREATE TABLE IF NOT EXISTS po_cliente_compartidas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  numero_po VARCHAR(120) NOT NULL,
  monto_total DECIMAL(14,2) NOT NULL DEFAULT 0,
  empresa VARCHAR(180) NOT NULL DEFAULT '',
  nombre VARCHAR(260) NOT NULL DEFAULT '',
  ruta VARCHAR(360) NOT NULL DEFAULT '',
  estado VARCHAR(30) NOT NULL DEFAULT 'Activa',
  usuario_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_po_cliente_compartidas_numero (numero_po),
  INDEX idx_po_cliente_compartidas_empresa (empresa),
  INDEX idx_po_cliente_compartidas_estado (estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE presupuesto_po_cliente
  ADD COLUMN po_compartida_id INT NULL AFTER presupuesto_id,
  ADD COLUMN monto_asignado DECIMAL(14,2) NOT NULL DEFAULT 0 AFTER ruta,
  ADD INDEX idx_presupuesto_po_compartida (po_compartida_id),
  ADD CONSTRAINT fk_presupuesto_po_compartida
    FOREIGN KEY (po_compartida_id) REFERENCES po_cliente_compartidas(id)
    ON DELETE SET NULL;
