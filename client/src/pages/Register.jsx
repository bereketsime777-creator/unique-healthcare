import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) { setError("Passwords do not match."); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    try {
      setLoading(true);
      await API.post("/auth/register", {
        name: form.name, email: form.email, phone: form.phone, password: form.password,
      });
      navigate("/login", { state: { message: "Account created successfully! Please sign in." } });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    border: "1.5px solid #e2e8f0",
    borderRadius: "12px",
    padding: "13px 16px",
    fontSize: "14px",
    outline: "none",
    fontFamily: "inherit",
    color: "#0f172a",
    background: "#f8fafc",
    boxSizing: "border-box",
  };

  const onFocus = (e) => { e.target.style.borderColor = "#2563eb"; e.target.style.background = "#fff"; };
  const onBlur  = (e) => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; };

  const benefits = [
    "Access to 500+ certified medical products",
    "Fast delivery across all of Ethiopia",
    "Exclusive bulk order pricing",
    "Dedicated after-sales technical support",
    "Track all your orders in one place",
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#f1f5f9" }}>

      {/* ── Left branding panel ── */}
      <div style={{
        width: "42%",
        background: "linear-gradient(145deg, #1e3a8a 0%, #2563eb 60%, #1d4ed8 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "56px 48px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative */}
        <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "320px", height: "320px", background: "rgba(255,255,255,0.04)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: "-80px", left: "-80px", width: "260px", height: "260px", background: "rgba(255,255,255,0.04)", borderRadius: "50%" }} />

        <div style={{ background: "#fff", borderRadius: "16px", padding: "10px 18px", display: "inline-block", marginBottom: "40px", alignSelf: "flex-start" }}>
          <img src="/logo.png" alt="Unique Healthcare" style={{ height: "38px", width: "auto", display: "block" }} />
        </div>

        <h2 style={{ color: "#fff", fontWeight: 900, fontSize: "30px", lineHeight: 1.25, margin: "0 0 14px" }}>
          Join Unique Healthcare
        </h2>
        <p style={{ color: "#bfdbfe", fontSize: "14px", lineHeight: 1.7, margin: "0 0 36px", maxWidth: "300px" }}>
          Create your account and get access to Ethiopia&apos;s largest medical equipment catalog.
        </p>

        {/* Benefits list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {benefits.map((b) => (
            <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <div style={{ width: "22px", height: "22px", background: "rgba(255,255,255,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#fff", flexShrink: 0, marginTop: "1px" }}>
                ✓
              </div>
              <span style={{ color: "#dbeafe", fontSize: "13px", lineHeight: 1.5 }}>{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 32px", overflowY: "auto" }}>
        <div style={{ width: "100%", maxWidth: "440px" }}>

          <h1 style={{ color: "#0f172a", fontWeight: 900, fontSize: "28px", margin: "0 0 6px" }}>
            Create your account
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 28px" }}>
            Join thousands of healthcare professionals
          </p>

          {error && (
            <div style={{ background: "#fff1f2", border: "1.5px solid #fecdd3", color: "#be123c", borderRadius: "12px", padding: "12px 16px", fontSize: "13px", marginBottom: "20px", display: "flex", gap: "8px", alignItems: "center" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "7px" }}>Full Name *</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} required
                placeholder="Dr. Abebe Kebede"
                style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "7px" }}>Email Address *</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required
                placeholder="you@hospital.com"
                style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "7px" }}>Phone Number</label>
              <input type="text" name="phone" value={form.phone} onChange={handleChange}
                placeholder="+251 9XX XXX XXX"
                style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "26px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "7px" }}>Password *</label>
                <input type="password" name="password" value={form.password} onChange={handleChange} required
                  placeholder="Min. 6 characters"
                  style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "7px" }}>Confirm *</label>
                <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required
                  placeholder="Repeat password"
                  style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>
            </div>

            <button type="submit" disabled={loading}
              style={{
                width: "100%",
                background: loading ? "#93c5fd" : "linear-gradient(135deg, #2563eb, #1d4ed8)",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                padding: "14px",
                fontWeight: 700,
                fontSize: "15px",
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "inherit",
                boxShadow: "0 4px 14px rgba(37,99,235,0.35)",
              }}>
              {loading ? "Creating account..." : "Create Account →"}
            </button>
          </form>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "22px 0" }}>
            <div style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
            <span style={{ color: "#94a3b8", fontSize: "12px" }}>Already have an account?</span>
            <div style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
          </div>

          <Link to="/login" style={{
            display: "block",
            textAlign: "center",
            border: "1.5px solid #2563eb",
            color: "#2563eb",
            borderRadius: "12px",
            padding: "13px",
            fontWeight: 700,
            fontSize: "14px",
            textDecoration: "none",
          }}>
            Sign In Instead
          </Link>

        </div>
      </div>
    </div>
  );
}
