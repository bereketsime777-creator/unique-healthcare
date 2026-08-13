import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { PRODUCT_CATEGORIES, normalizeCategory } from "../constants/categories";

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
  transition: "border-color 0.15s",
};

const labelStyle = {
  display: "block",
  fontSize: "14px",
  fontWeight: "500",
  color: "#374151",
  marginBottom: "6px",
};

const cardStyle = {
  background: "#fff",
  borderRadius: "16px",
  border: "1px solid #f1f5f9",
  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  padding: "24px",
};

const sectionTitleStyle = {
  fontSize: "11px",
  fontWeight: "700",
  color: "#64748b",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  marginBottom: "16px",
};

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", category: "", manufacturer: "", price: "",
    stock: "", description: "", specifications: "",
  });
  const [currentImage, setCurrentImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ text: "", type: "" });

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((r) => {
        const p = r.data;
        setForm({
          name: p.name || "", category: normalizeCategory(p.category) || "", manufacturer: p.manufacturer || "",
          price: p.price || "", stock: p.stock || "",
          description: p.description || "", specifications: p.specifications || "",
        });
        setCurrentImage(p.image || "");
      })
      .catch(() => alert("Failed to load product"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await API.put(`/products/${id}`, form);
      setStatus({ text: "Product updated successfully!", type: "success" });
      setTimeout(() => navigate("/admin/products"), 1200);
    } catch (err) {
      setStatus({ text: err.response?.data?.message || "Update failed", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const focusInput = (e) => { e.currentTarget.style.borderColor = "#2563eb"; };
  const blurInput = (e) => { e.currentTarget.style.borderColor = "#e2e8f0"; };

  if (loading) {
    return (
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <div className="responsive-grid-sidebar">
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ ...cardStyle, opacity: 0.5 }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{ background: "#e2e8f0", height: "40px", borderRadius: "12px", marginBottom: "12px" }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a", margin: "0 0 4px" }}>
            Edit Product
          </h1>
          <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>
            Update product information
          </p>
        </div>
        <Link to="/admin/products" style={{ fontSize: "14px", color: "#64748b", textDecoration: "none" }}>
          ← Back
        </Link>
      </div>

      {status.text && (
        <div style={{
          padding: "14px 16px", borderRadius: "12px", marginBottom: "20px",
          fontSize: "14px", fontWeight: "500",
          display: "flex", alignItems: "center", gap: "8px",
          background: status.type === "success" ? "#f0fdf4" : "#fef2f2",
          color: status.type === "success" ? "#16a34a" : "#dc2626",
          border: `1px solid ${status.type === "success" ? "#bbf7d0" : "#fecaca"}`,
        }}>
          {status.type === "success" ? "✓" : "⚠"} {status.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="responsive-grid-sidebar">
          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={cardStyle}>
              <p style={sectionTitleStyle}>Basic Information</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Product Name *</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange}
                    required style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
                </div>
                <div className="responsive-grid-form-2">
                  <div>
                    <label style={labelStyle}>Category *</label>
                    <select name="category" value={form.category} onChange={handleChange}
                      required style={inputStyle} onFocus={focusInput} onBlur={blurInput}>
                      <option value="">Select category</option>
                      {PRODUCT_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Manufacturer</label>
                    <input type="text" name="manufacturer" value={form.manufacturer}
                      onChange={handleChange}
                      style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
                  </div>
                </div>
                <div className="responsive-grid-form-2">
                  <div>
                    <label style={labelStyle}>Price (ETB) *</label>
                    <input type="number" name="price" value={form.price} onChange={handleChange}
                      required min="0"
                      style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
                  </div>
                  <div>
                    <label style={labelStyle}>Stock Quantity *</label>
                    <input type="number" name="stock" value={form.stock} onChange={handleChange}
                      required min="0"
                      style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
                  </div>
                </div>
              </div>
            </div>

            <div style={cardStyle}>
              <p style={sectionTitleStyle}>Description &amp; Specs</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Description</label>
                  <textarea name="description" value={form.description} onChange={handleChange}
                    rows="4" style={{ ...inputStyle, resize: "none" }}
                    onFocus={focusInput} onBlur={blurInput} />
                </div>
                <div>
                  <label style={labelStyle}>Specifications</label>
                  <textarea name="specifications" value={form.specifications} onChange={handleChange}
                    rows="4" style={{ ...inputStyle, resize: "none" }}
                    onFocus={focusInput} onBlur={blurInput} />
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {currentImage && (
              <div style={cardStyle}>
                <p style={sectionTitleStyle}>Current Image</p>
                <div style={{ background: "#f8fafc", borderRadius: "12px", padding: "8px" }}>
                  <img src={currentImage} alt="Current"
                    style={{ width: "100%", height: "176px", objectFit: "contain", borderRadius: "8px" }} />
                </div>
                <p style={{ fontSize: "12px", color: "#94a3b8", textAlign: "center", marginTop: "8px" }}>
                  Image update not supported yet
                </p>
              </div>
            )}

            <div style={{ ...cardStyle, display: "flex", flexDirection: "column", gap: "12px" }}>
              <button type="submit" disabled={saving}
                style={{
                  width: "100%", background: saving ? "#93c5fd" : "#2563eb",
                  color: "#fff", padding: "12px", borderRadius: "12px",
                  fontSize: "14px", fontWeight: "700", border: "none",
                  cursor: saving ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => { if (!saving) e.currentTarget.style.background = "#1d4ed8"; }}
                onMouseLeave={(e) => { if (!saving) e.currentTarget.style.background = "#2563eb"; }}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button type="button" onClick={() => navigate("/admin/products")}
                style={{
                  width: "100%", background: "#fff",
                  color: "#64748b", padding: "12px", borderRadius: "12px",
                  fontSize: "14px", fontWeight: "500",
                  border: "1px solid #e2e8f0", cursor: "pointer",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"}
                onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
