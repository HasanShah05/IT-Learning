import { LS_KEYS, lsGet, lsSet } from "./localStorageHelper";

export function seedLocalStorageIfEmpty() {
  // Check if we've already seeded the data
  if (lsGet("is_seeded")) return;

  const dummyProducts = [
    { id: 1, name: "Premium Basmati Rice", price: 80, unit: "kg", quantity: 50 },
    { id: 2, name: "Refined Sugar", price: 45, unit: "kg", quantity: 100 },
    { id: 3, name: "Sunflower Cooking Oil", price: 150, unit: "litre", quantity: 30 },
    { id: 4, name: "Whole Wheat Flour", price: 40, unit: "kg", quantity: 80 },
    { id: 5, name: "Tata Salt", price: 25, unit: "packet", quantity: 150 }
  ];

  const dummyCustomers = [
    { id: 1, name: "Rahul Sharma", phone: "9876543210", address: "123 Main St, Mumbai" },
    { id: 2, name: "Priya Patel", phone: "8765432109", address: "45 Park Ave, Delhi" },
    { id: 3, name: "Amit Singh", phone: "7654321098", address: "78 Lake View, Bangalore" }
  ];

  const dummyInvoices = [
    {
      id: 1,
      customer_id: 1,
      customer_name: "Rahul Sharma",
      phone: "9876543210",
      address: "123 Main St, Mumbai",
      invoice_date: new Date().toISOString().split("T")[0],
      subtotal: 800,
      gst: 144,
      grand_total: 944,
      items: [
        { id: 101, product_id: 1, product_name: "Premium Basmati Rice", price: 80, qty: 5, unit: "kg", total: 400 },
        { id: 102, product_id: 3, product_name: "Sunflower Cooking Oil", price: 150, qty: 2, unit: "litre", total: 300 },
        { id: 103, product_id: 5, product_name: "Tata Salt", price: 25, qty: 4, unit: "packet", total: 100 } 
      ]
    }
  ];

  const dummyLogs = [
    { id: 1, product_id: 1, product_name: "Premium Basmati Rice", transaction_type: "IN", quantity_changed: 50, notes: "Initial Stock", timestamp: new Date(Date.now() - 86400000).toISOString() },
    { id: 2, product_id: 2, product_name: "Refined Sugar", transaction_type: "IN", quantity_changed: 100, notes: "Initial Stock", timestamp: new Date(Date.now() - 86400000).toISOString() },
    { id: 3, product_id: 3, product_name: "Sunflower Cooking Oil", transaction_type: "IN", quantity_changed: 30, notes: "Initial Stock", timestamp: new Date(Date.now() - 86400000).toISOString() },
    { id: 4, product_id: 4, product_name: "Whole Wheat Flour", transaction_type: "IN", quantity_changed: 80, notes: "Initial Stock", timestamp: new Date(Date.now() - 86400000).toISOString() },
    { id: 5, product_id: 5, product_name: "Tata Salt", transaction_type: "IN", quantity_changed: 150, notes: "Initial Stock", timestamp: new Date(Date.now() - 86400000).toISOString() }
  ];

  const dummySales = [
    { week: "01 May", total: "2500" },
    { week: "08 May", total: "4200" },
    { week: "15 May", total: "3100" },
    { week: "22 May", total: "5400" },
  ];

  // Set to local storage if they don't already exist
  if (!lsGet(LS_KEYS.PRODUCTS)) lsSet(LS_KEYS.PRODUCTS, dummyProducts);
  if (!lsGet(LS_KEYS.CUSTOMERS)) lsSet(LS_KEYS.CUSTOMERS, dummyCustomers);
  if (!lsGet(LS_KEYS.INVOICES)) lsSet(LS_KEYS.INVOICES, dummyInvoices);
  if (!lsGet(LS_KEYS.INVENTORY_LOGS)) lsSet(LS_KEYS.INVENTORY_LOGS, dummyLogs);
  if (!lsGet(LS_KEYS.SALES_WEEKLY)) lsSet(LS_KEYS.SALES_WEEKLY, dummySales);

  // Mark as seeded so we don't overwrite user actions in the future
  lsSet("is_seeded", true);
}
