import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { PRODUCT_CATEGORIES } from "../constants/categories";

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

function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "", category: "", manufacturer: "", price: "",
    stock: "", description: "", specifications: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) { setImage(file); setPreview(URL.createObjectURL(file)); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setStatus({ text: "", type: "" });
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
      if (image) fd.append("image", image);
      await API.post("/products", fd, { headers: { "Content-Type": "multipart/form-data" } });
      setStatus({ text: "Product added successfully!", type: "success" });
      setTimeout(() => navigate("/admin/products"), 1200);
    } catch (err) {
      setStatus({ text: err.response?.data?.message || "Failed to add product", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const focusInput = (e) => { e.currentTarget.style.borderColor = "#2563eb"; };
  const blurInput = (e) => { e.currentTarget.style.borderColor = "#e2e8f0"; };

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a", margin: "0 0 4px" }}>
            Add New Product
          </h1>
          <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>
            Fill in the details below to add a product
          </p>
        </div>
        <Link to="/admin/products" style={{ fontSize: "14px", color: "#64748b",
          textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>
          ← Back to Products
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
          {/* Left: Main info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Basic Information */}
            <div style={cardStyle}>
              <p style={sectionTitleStyle}>Basic Information</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Product Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange}
                    required placeholder="e.g. Multipara Patient Monitor"
                    style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
                </div>
                <div className="responsive-grid-form-2">
                  <div>
                    <label style={labelStyle}>Category *</label>
                    <select name="category" value={formData.category} onChange={handleChange}
                      required style={inputStyle} onFocus={focusInput} onBlur={blurInput}>
                      <option value="">Select category</option>
                      {PRODUCT_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Manufacturer</label>
                    <input type="text" name="manufacturer" value={formData.manufacturer}
                      onChange={handleChange} placeholder="e.g. Mindray"
                      style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
                  </div>
                </div>
                <div className="responsive-grid-form-2">
                  <div>
                    <label style={labelStyle}>Price (ETB) *</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange}
                      required min="0" placeholder="0"
                      style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
                  </div>
                  <div>
                    <label style={labelStyle}>Stock Quantity *</label>
                    <input type="number" name="stock" value={formData.stock} onChange={handleChange}
                      required min="0" placeholder="0"
                      style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
                  </div>
                </div>
              </div>
            </div>

            {/* Description & Specs */}
            <div style={cardStyle}>
              <p style={sectionTitleStyle}>Description &amp; Specs</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Product Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange}
                    rows="4" placeholder="Describe the product features, use cases..."
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={focusInput} onBlur={blurInput} />
                </div>
                <div>
                  <label style={labelStyle}>Technical Specifications</label>
                  <textarea name="specifications" value={formData.specifications} onChange={handleChange}
                    rows="4" placeholder="Technical specs, dimensions, power requirements..."
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={focusInput} onBlur={blurInput} />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Image + Submit */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Image Upload */}
            <div style={cardStyle}>
              <p style={sectionTitleStyle}>Product Image</p>
              <div
                onClick={() => document.getElementById("imageInput").click()}
                style={{
                  border: "2px dashed #e2e8f0", borderRadius: "12px",
                  padding: "16px", textAlign: "center", cursor: "pointer",
                  transition: "border-color 0.15s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "#2563eb"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "#e2e8f0"}
              >
                {preview ? (
                  <img src={preview} alt="Preview"
                    style={{ width: "100%", height: "160px", objectFit: "contain", borderRadius: "8px" }} />
                ) : (
                  <div style={{ padding: "32px 0" }}>
                    <div style={{ fontSize: "36px", marginBottom: "8px" }}>📷</div>
                    <p style={{ fontSize: "14px", color: "#64748b", margin: "0 0 4px" }}>
                      Click to upload image
                    </p>
                    <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                )}
              </div>
              <input id="imageInput" type="file" accept="image/*"
                onChange={handleImageChange} style={{ display: "none" }} />
              {preview && (
                <button type="button"
                  onClick={() => { setImage(null); setPreview(null); }}
                  style={{
                    width: "100%", marginTop: "8px", padding: "4px",
                    fontSize: "12px", color: "#ef4444",
                    background: "transparent", border: "none", cursor: "pointer",
                  }}>
                  Remove image
                </button>
              )}
            </div>

            {/* Actions */}
            <div style={{ ...cardStyle, display: "flex", flexDirection: "column", gap: "12px" }}>
              <button type="submit" disabled={loading}
                style={{
                  width: "100%", background: loading ? "#93c5fd" : "#2563eb",
                  color: "#fff", padding: "12px", borderRadius: "12px",
                  fontSize: "14px", fontWeight: "700", border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "#1d4ed8"; }}
                onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = "#2563eb"; }}
              >
                {loading ? "Adding..." : "Add Product"}
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

export default AddProduct;
