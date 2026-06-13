// localStorageHelper.js
// Utility to manage localStorage fallback when the backend (PostgreSQL) is unavailable.
// This does NOT replace or interfere with the real backend/PostgreSQL logic.

export const LS_KEYS = {
  PRODUCTS: "ls_products",
  CUSTOMERS: "ls_customers",
  INVOICES: "ls_invoices",
  INVENTORY_LOGS: "ls_inventory_logs",
  SALES_WEEKLY: "ls_sales_weekly",
};

export function lsGet(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function lsSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage quota exceeded or not available — silently ignore
  }
}

// Generate a simple incremental ID for localStorage-only records
export function lsNextId(items) {
  if (!items || items.length === 0) return 1;
  return Math.max(...items.map((i) => i.id || 0)) + 1;
}
