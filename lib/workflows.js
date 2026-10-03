"use strict";

const FIXED_EXPENSE_RECURRENCES = Object.freeze({
  mensual: Object.freeze({ months: 1, label: "Mensual" }),
  bimestral: Object.freeze({ months: 2, label: "Bimestral" }),
  trimestral: Object.freeze({ months: 3, label: "Trimestral" }),
  semestral: Object.freeze({ months: 6, label: "Semestral" }),
  anual: Object.freeze({ months: 12, label: "Anual" })
});

const FIXED_EXPENSE_RECORD_STATES = Object.freeze(["Activo", "Suspendido", "Finalizado"]);
const PAYABLE_RECORD_STATES = Object.freeze(["Activa", "Cerrada", "Cancelada"]);
const PAYABLE_PAYMENT_STATUSES = Object.freeze(["Pendiente", "Pago parcial", "Pagada"]);
const PAYMENT_MOVEMENT_TYPES = Object.freeze(["Anticipo", "Abono", "Liquidación"]);
const PAYMENT_MOVEMENT_STATUSES = Object.freeze(["Pendiente", "Aplicado", "Cancelado"]);

function normalizeFixedExpenseRecurrence(value) {
  const key = String(value || "").trim().toLowerCase();
  return FIXED_EXPENSE_RECURRENCES[key] ? key : "mensual";
}

function fixedExpenseRecurrenceLabel(value) {
  return FIXED_EXPENSE_RECURRENCES[normalizeFixedExpenseRecurrence(value)].label;
}

function toDateOnly(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate()));
  }
  const match = String(value || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return null;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDateOnly(value) {
  const date = toDateOnly(value);
  return date ? date.toISOString().slice(0, 10) : null;
}

function clampGenerationDay(value) {
  const day = Math.trunc(Number(value || 1));
  return Math.min(28, Math.max(1, Number.isFinite(day) ? day : 1));
}

function dateWithGenerationDay(value, generationDay) {
  const date = toDateOnly(value);
  if (!date) return null;
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), clampGenerationDay(generationDay)));
}

function addRecurrence(value, recurrence, generationDay) {
  const date = toDateOnly(value);
  if (!date) return null;
  const months = FIXED_EXPENSE_RECURRENCES[normalizeFixedExpenseRecurrence(recurrence)].months;
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + months, clampGenerationDay(generationDay || date.getUTCDate())));
}

function firstScheduledDate({ startDate, recurrence, generationDay, today = new Date() }) {
  const start = toDateOnly(startDate) || toDateOnly(today);
  const current = toDateOnly(today);
  let candidate = dateWithGenerationDay(start, generationDay);
  if (candidate < start) candidate = addRecurrence(candidate, recurrence, generationDay);
  while (candidate < current && formatDateOnly(candidate).slice(0, 7) < formatDateOnly(start).slice(0, 7)) {
    candidate = addRecurrence(candidate, recurrence, generationDay);
  }
  return candidate;
}

function paymentDocumentStatus(files = []) {
  const types = new Set(files.map((file) => String(file?.tipo || "")));
  if (!types.has("Factura")) return { status: "Factura pendiente", pending: "Cargar factura del proveedor" };
  if (!types.has("Comprobante de pago")) return { status: "Comprobante pendiente", pending: "Cargar comprobante de pago" };
  if (!types.has("Complemento de pago")) return { status: "Complemento pendiente", pending: "Cargar complemento de pago" };
  return { status: "Completa", pending: "Sin pendientes de documentación" };
}

function payableSummary(totalInput, appliedInput, legacyPaid = false) {
  const total = Math.max(0, Number(totalInput || 0));
  let applied = Math.max(0, Number(appliedInput || 0));
  if (legacyPaid && applied < total) applied = total;
  applied = Math.min(applied, total);
  const remaining = Math.max(0, Math.round((total - applied) * 100) / 100);
  const paymentStatus = remaining <= 0.009 ? "Pagada" : applied > 0.009 ? "Pago parcial" : "Pendiente";
  return {
    total: Math.round(total * 100) / 100,
    applied: Math.round(applied * 100) / 100,
    remaining,
    paymentStatus,
    paid: paymentStatus === "Pagada"
  };
}

function normalizePaymentMovementType(value, remaining = 0) {
  const normalized = String(value || "").trim();
  if (PAYMENT_MOVEMENT_TYPES.includes(normalized)) return normalized;
  return Number(remaining || 0) > 0 ? "Abono" : "Liquidación";
}


function appliedPercentageAmount(baseInput, percentageInput = 100) {
  const base = Math.max(0, Number(baseInput || 0));
  const rawPercentage = Number(percentageInput);
  const percentage = Number.isFinite(rawPercentage) ? Math.min(100, Math.max(0, rawPercentage)) : 100;
  return Math.round(base * (percentage / 100) * 100) / 100;
}

function paymentDaysFromTerms(terms, creditDays, defaultCreditDays = 30) {
  const normalized = String(terms || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  if (!normalized.includes("credito")) return 0;
  const hasCreditDays = creditDays !== null && creditDays !== undefined && String(creditDays).trim() !== "";
  const days = Number(creditDays);
  if (hasCreditDays && Number.isFinite(days) && days >= 0) return Math.trunc(days);
  return Math.max(0, Math.trunc(Number(defaultCreditDays || 0)));
}

module.exports = {
  FIXED_EXPENSE_RECURRENCES,
  FIXED_EXPENSE_RECORD_STATES,
  PAYABLE_RECORD_STATES,
  PAYABLE_PAYMENT_STATUSES,
  PAYMENT_MOVEMENT_TYPES,
  PAYMENT_MOVEMENT_STATUSES,
  normalizeFixedExpenseRecurrence,
  fixedExpenseRecurrenceLabel,
  toDateOnly,
  formatDateOnly,
  clampGenerationDay,
  dateWithGenerationDay,
  addRecurrence,
  firstScheduledDate,
  paymentDocumentStatus,
  payableSummary,
  normalizePaymentMovementType,
  appliedPercentageAmount,
  paymentDaysFromTerms
};
