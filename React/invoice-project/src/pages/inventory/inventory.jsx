import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "@mantine/core";
import { LS_KEYS, lsGet, lsSet, lsNextId } from "../../utils/localStorageHelper";
import "./inventory.css";

export function Inventory() {
  const [products, setProducts] = useState([]);
  const [logs, setLogs] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedProductId, setSelectedProductId] = useState("");
  const [qty, setQty] = useState("");
  const [notes, setNotes] = useState("");

  const [mode, setMode] = useState("add"); // add or deduct
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchLogs(page);
  }, [page]);

  async function fetchProducts() {
    try {
      const res = await axios.get("http://localhost:5001/products");
      // Save fresh data to localStorage for offline fallback
      lsSet(LS_KEYS.PRODUCTS, res.data.data);
      setProducts(res.data.data);
    } catch {
      // Backend unavailable — use localStorage fallback
      const cached = lsGet(LS_KEYS.PRODUCTS) || [];
      setProducts(cached);
    }
  }

  async function fetchLogs(p) {
    try {
      const res = await axios.get(`http://localhost:5001/inventory-logs?page=${p}`);
      // Save fresh logs to localStorage for offline fallback
      lsSet(LS_KEYS.INVENTORY_LOGS, res.data.data);
      setLogs(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch {
      // Backend unavailable — use localStorage fallback (all logs, paginated client-side)
      const cached = lsGet(LS_KEYS.INVENTORY_LOGS) || [];
      const limit = 10;
      const offset = (p - 1) * limit;
      setLogs(cached.slice(offset, offset + limit));
      setTotalPages(Math.max(1, Math.ceil(cached.length / limit)));
    }
  }

  async function handleSubmit() {
    if (!selectedProductId || !qty) {
      setMsg("Select product and quantity");
      return;
    }

    const product = products.find(p => p.id == selectedProductId);

    try {
      if (mode === "add") {
        await axios.post("http://localhost:5001/inventory/add", {
          product_id: product.id,
          product_name: product.name,
          quantity: Number(qty),
          notes
        });
      } else {
        await axios.post("http://localhost:5001/inventory/deduct", {
          product_id: product.id,
          product_name: product.name,
          quantity: Number(qty),
          notes
        });
      }

      setMsg("Success");
      setQty("");
      setNotes("");
      setSelectedProductId("");

      fetchProducts();
      fetchLogs(1);
      setPage(1);

    } catch (err) {
      console.error(err);
      // Backend unavailable — apply change to localStorage fallback
      if (!err.response) {
        const cachedProducts = lsGet(LS_KEYS.PRODUCTS) || [];
        const cachedLogs = lsGet(LS_KEYS.INVENTORY_LOGS) || [];
        const qty_num = Number(qty);

        if (mode === "deduct") {
          const current = product.quantity || 0;
          if (qty_num > current) {
            setMsg(`Not enough stock. Available: ${current}`);
            return;
          }
        }

        // Update product quantity in localStorage
        const updatedProducts = cachedProducts.map((p) =>
          p.id === product.id
            ? {
                ...p,
                quantity:
                  mode === "add"
                    ? (p.quantity || 0) + qty_num
                    : (p.quantity || 0) - qty_num,
              }
            : p
        );
        lsSet(LS_KEYS.PRODUCTS, updatedProducts);

        // Add log entry in localStorage
        const newLog = {
          id: lsNextId(cachedLogs),
          product_id: product.id,
          product_name: product.name,
          transaction_type: mode === "add" ? "IN" : "OUT",
          quantity_changed: qty_num,
          notes: notes || (mode === "add" ? "Stock Added" : "Manual Deduction"),
          timestamp: new Date().toISOString(),
        };
        lsSet(LS_KEYS.INVENTORY_LOGS, [newLog, ...cachedLogs]);

        setMsg("Success");
        setQty("");
        setNotes("");
        setSelectedProductId("");
        fetchProducts();
        fetchLogs(1);
        setPage(1);
      } else {
        setMsg(err.response?.data?.error || "Error");
      }
    }
  }

  return (
  <div className="inventory-page">

    {/* HEADER */}
    <div className="inventory-header">
      <div>
        <h2>Inventory</h2>
        <p>Manage stock movements (IN / OUT)</p>
      </div>
    </div>

    {/* MODE SWITCH */}
    <div className="mode-switch">
      <button
        className={`mode-btn ${mode === "add" ? "active" : ""}`}
        onClick={() => setMode("add")}
      >
        Add Stock
      </button>

      <button
        className={`mode-btn ${mode === "deduct" ? "active" : ""}`}
        onClick={() => setMode("deduct")}
      >
        Deduct Stock
      </button>
    </div>

    {/* FORM */}
    <div className="inventory-form">
      <select
        value={selectedProductId}
        onChange={(e) => setSelectedProductId(e.target.value)}
      >
        <option value="">Select Product</option>
        {products.map(p => (
          <option key={p.id} value={p.id}>
            {p.name} (Stock: {p.quantity})
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Quantity"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
      />

      <input
        type="text"
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button onClick={handleSubmit}>
        {mode === "add" ? "Add Stock" : "Deduct Stock"}
      </button>

      <p className={`msg ${msg === "Success" ? "success" : "error"}`}>
        {msg}
      </p>
    </div>

    {/* TABLE */}
    <div className="log-table-wrapper">
      <table className="log-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Product</th>
            <th>Type</th>
            <th>Qty</th>
            <th>Notes</th>
          </tr>
        </thead>

        <tbody>
          {logs.map(log => (
            <tr key={log.id}>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
              <td>{log.product_name}</td>
              <td className={log.transaction_type === "IN" ? "in-type" : "out-type"}>
                {log.transaction_type}
              </td>
              <td>{log.quantity_changed}</td>
              <td>{log.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* PAGINATION */}
    <div className="pagination-wrapper">
      <Pagination
        value={page}
        onChange={setPage}
        total={totalPages}
      />
    </div>

  </div>
)}