import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { getProducts(); }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      setDeletingId(id);
      await API.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (e) {
      alert("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = products.filter(
    (p) =>
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const cardStyle = {
    background: "#fff",
    borderRadius: "16px",
    border: "1px solid #f1f5f9",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  };

  const inputStyle = {
    width: "100%",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "10px 16px",
    fontSize: "14px",
    outline: "none",
    color: "#0f172a",
    background: "#fff",
    boxSizing: "border-box",
  };

  const thStyle = {
    padding: "12px 20px",
    textAlign: "left",
    fontSize: "11px",
    fontWeight: "600",
    color: "#94a3b8",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a", margin: "0 0 4px" }}>
            Products
          </h1>
          <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>
            {products.length} total products
          </p>
        </div>
        <Link
          to="/admin/add-product"
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: "#2563eb", color: "#fff",
            padding: "10px 20px", borderRadius: "12px",
            fontSize: "14px", fontWeight: "600",
            textDecoration: "none",
            boxShadow: "0 2px 8px rgba(37,99,235,0.3)",
          }}
        >
          <span style={{ fontSize: "16px" }}>+</span> Add Product
        </Link>
      </div>

      {/* Search */}
      <div style={{ ...cardStyle, padding: "16px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={inputStyle}
          onFocus={(e) => e.currentTarget.style.borderColor = "#2563eb"}
          onBlur={(e) => e.currentTarget.style.borderColor = "#e2e8f0"}
        />
      </div>

      {/* Table */}
      <div style={{ ...cardStyle, overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                <div style={{ width: "52px", height: "52px", background: "#e2e8f0", borderRadius: "12px" }} />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ background: "#e2e8f0", height: "14px", borderRadius: "6px", width: "33%" }} />
                  <div style={{ background: "#e2e8f0", height: "12px", borderRadius: "6px", width: "25%" }} />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "64px", textAlign: "center" }}>
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>📦</div>
            <p style={{ fontWeight: "600", color: "#374151", marginBottom: "4px" }}>No products found</p>
            <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "16px" }}>
              {search ? "Try a different search term" : "Add your first product to get started"}
            </p>
            <Link to="/admin/add-product" style={{
              background: "#2563eb", color: "#fff", padding: "8px 20px",
              borderRadius: "10px", fontSize: "14px", fontWeight: "600", textDecoration: "none",
            }}>
              Add Product
            </Link>
          </div>
        ) : (
          <div className="table-scroll">
          <table style={{ width: "100%", fontSize: "14px", borderCollapse: "collapse", minWidth: "640px" }}>
            <thead style={{ background: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
              <tr>
                <th style={thStyle}>Product</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Price</th>
                <th style={thStyle}>Stock</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product, idx) => (
                <tr key={product._id}
                  style={{ borderBottom: idx < filtered.length - 1 ? "1px solid #f8fafc" : "none" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <td style={{ padding: "14px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{
                        width: "48px", height: "48px", background: "#f8fafc",
                        borderRadius: "12px", overflow: "hidden",
                        border: "1px solid #f1f5f9", flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {product.image && product.image.startsWith("http") ? (
                          <img src={product.image} alt={product.name}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            onError={(e) => { e.target.style.display = "none"; }} />
                        ) : (
                          <span style={{ fontSize: "20px" }}>📦</span>
                        )}
                      </div>
                      <div>
                        <p style={{ fontWeight: "600", color: "#0f172a", margin: "0 0 2px", fontSize: "14px" }}>
                          {product.name}
                        </p>
                        <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>
                          {product.manufacturer}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <span style={{
                      background: "#eff6ff", color: "#2563eb",
                      fontSize: "12px", fontWeight: "500",
                      padding: "4px 10px", borderRadius: "999px",
                    }}>
                      {product.category}
                    </span>
                  </td>
                  <td style={{ padding: "14px 20px", fontWeight: "700", color: "#0f172a" }}>
                    ETB {product.price?.toLocaleString()}
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <span style={{
                      padding: "4px 10px", borderRadius: "999px",
                      fontSize: "12px", fontWeight: "600",
                      background: product.stock > 10 ? "#f0fdf4" : product.stock > 0 ? "#fffbeb" : "#fef2f2",
                      color: product.stock > 10 ? "#16a34a" : product.stock > 0 ? "#d97706" : "#dc2626",
                    }}>
                      {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                    </span>
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <Link
                        to={`/admin/edit-product/${product._id}`}
                        style={{
                          background: "#eff6ff", color: "#2563eb",
                          padding: "6px 12px", borderRadius: "8px",
                          fontSize: "12px", fontWeight: "600",
                          textDecoration: "none", transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "#dbeafe"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "#eff6ff"}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteProduct(product._id)}
                        disabled={deletingId === product._id}
                        style={{
                          background: "#fef2f2", color: "#dc2626",
                          padding: "6px 12px", borderRadius: "8px",
                          fontSize: "12px", fontWeight: "600",
                          border: "none", cursor: "pointer",
                          opacity: deletingId === product._id ? 0.5 : 1,
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => { if (deletingId !== product._id) e.currentTarget.style.background = "#fee2e2"; }}
                        onMouseLeave={(e) => e.currentTarget.style.background = "#fef2f2"}
                      >
                        {deletingId === product._id ? "..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageProducts;
