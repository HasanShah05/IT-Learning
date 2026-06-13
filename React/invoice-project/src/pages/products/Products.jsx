import { useEffect, useState } from "react";
import axios from "axios";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import "./Products.css";
import { Pagination } from '@mantine/core';
import { LS_KEYS, lsGet, lsSet, lsNextId } from "../../utils/localStorageHelper";


function Products() {
  const [opened, { open, close }] = useDisclosure(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState(""); 
  const [searchQuery, setSearchQuery] = useState("");

  let sortedProducts = [...products];

  if (sortBy === "name") {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "price-low") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }


  const [formData, setFormData] = useState({
    name: "",
    price: "",
    unit: "kg",
    quantity: 0
  });

  const [editId, setEditId] = useState(null);

  
  async function fetchProducts(query = "", p = 1) {
    try {
      const res = await axios.get(
        `http://localhost:5001/products?search=${query}&page=${p}`
      );
      // Save fresh data to localStorage for offline fallback
      lsSet(LS_KEYS.PRODUCTS, res.data.data);
      setProducts(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch {
      // Backend unavailable — use localStorage fallback
      const cached = lsGet(LS_KEYS.PRODUCTS) || [];
      const filtered = query
        ? cached.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
        : cached;
      const limit = 10;
      const offset = (p - 1) * limit;
      const paginated = filtered.slice(offset, offset + limit);
      setProducts(paginated);
      setTotalPages(Math.max(1, Math.ceil(filtered.length / limit)));
    }
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProducts(searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);
  
  function resetForm() {
    setFormData({
      name: "",
      price: "",
      unit: "kg",
      quantity: 0
    });
    setEditId(null);
  }

  function handleOpenAddModal() {
    resetForm();
    open();
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name.trim() || !formData.price || !formData.unit) {
      alert("Please fill all required fields");
      return;
    }

    try {
      if (editId) {
        await axios.put(`http://localhost:5001/products/${editId}`, formData);
      } else {
        await axios.post("http://localhost:5001/products", formData);
      }

      fetchProducts(searchQuery);
      resetForm();
      close();
    } catch (error) {
      console.error("Submit product error:", error);
      // Backend unavailable — apply change to localStorage fallback
      if (!error.response) {
        const cached = lsGet(LS_KEYS.PRODUCTS) || [];
        if (editId) {
          const updated = cached.map((p) =>
            p.id === editId ? { ...p, ...formData } : p
          );
          lsSet(LS_KEYS.PRODUCTS, updated);
        } else {
          const newProduct = { ...formData, id: lsNextId(cached), quantity: formData.quantity || 0 };
          lsSet(LS_KEYS.PRODUCTS, [newProduct, ...cached]);
        }
        fetchProducts(searchQuery);
        resetForm();
        close();
      } else {
        alert(error.response?.data?.error || "Product save failed");
      }
    }
  }

  function handleEdit(product) {
    setFormData({
      name: product.name,
      price: product.price,
      unit: product.unit,
      quantity: product.quantity
    });

    setEditId(product.id);
    open();
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:5001/products/${id}`);
      fetchProducts(searchQuery);
    } catch (error) {
      console.error("Delete product error:", error);
      // Backend unavailable — apply deletion to localStorage fallback
      if (!error.response) {
        const cached = lsGet(LS_KEYS.PRODUCTS) || [];
        lsSet(LS_KEYS.PRODUCTS, cached.filter((p) => p.id !== id));
        fetchProducts(searchQuery);
      } else {
        alert(error.response?.data?.error || "Product delete failed");
      }
    }
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <div className="step-badge">1</div>

        <div>
          <h2>Products</h2>
          <p>Add products that can be added to invoices</p>
        </div>
      </div>

      <div className="products-top">
        <h3 className="form-title">PRODUCTS LIST</h3>

        <div className="products-controls">
          <input
            type="text"
            placeholder="Search by name,price"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            className="products-search-input"
          />

          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="products-sort-select"
          >
            <option value="">Default Sorting</option>
            <option value="name">Name (A to Z)</option>
            <option value="price-low">Price (Lowest first)</option>
            <option value="price-high">Price (Highest first)</option>
          </select>

          <button
            type="button"
            className="add-btn"
            onClick={handleOpenAddModal}
          >
            + Add Product
          </button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="products-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Prouct Name</th>
              <th>Price</th>
              <th>Remaining Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              sortedProducts.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>Rs. {item.price}</td>
                  <td>
                    <span className={item.quantity <= 5 ? "low-stock" : "in-stock"}>
                      {item.quantity} {item.unit}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        type="button"
                        className="edit-btn"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  No products added
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        opened={opened}
        onClose={() => {
          resetForm();
          close();
        }}
        title={editId ? "Edit Product" : "Add Product"}
        centered
        size="md"
        radius="md"
      >
        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name *</label>
            <p>e.g. Rice, Sugar, Cooking Oil</p>
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Price (per unit) *</label>
            <p>Price in Rupees</p>
            <input
              type="number"
              name="price"
              placeholder="e.g. 60"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Unit *</label>
            <p>How is this product measured?</p>
            <select name="unit" value={formData.unit} onChange={handleChange}>
              <option value="kg">kg</option>
              <option value="piece">piece</option>
              <option value="litre">litre</option>
              <option value="dozen">dozen</option>
              <option value="packet">packet</option>
              <option value="box">box</option>
            </select>
          </div>

          <div className="form-group">
            <label>Quantity (stock)</label>
            <p>How many quantity do you have in stock?</p>
            <input type="number"
            name="quantity"
            placeholder="e.g. 100"
            min="0"
            value={formData.quantity}
            onChange={handleChange}
            />
          </div>

          <div className="button-group">
            <button type="submit" className="add-btn">
              {editId ? "Update Product" : "+ Add Product"}
            </button>

            <button
              type="button"
              className="clear-btn"
              onClick={() => {
                resetForm();
                close();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Products;
