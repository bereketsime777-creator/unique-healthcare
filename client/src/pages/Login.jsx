import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { login } = useAuth();

  const successMessage = location.state?.message || "";
  const [form, setForm]     = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const res = await API.post("/auth/login", form);
      login(res.data.token, res.data.user);
      navigate(res.data.user.role === "admin" ? "/admin" : "/");
    } catch (err) {
      if (!err.response) {
        setError("Cannot reach the server. Make sure the backend is running and try again.");
      } else {
        setError(err.response.data?.message || "Login failed. Please try again.");
      }
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
    transition: "border-color 0.2s",
  };

  return (
    <div className="auth-page">

      {/* ── Left panel — blue branding ── */}
      <div className="auth-brand-panel" style={{
        background: "linear-gradient(145deg, #1e3a8a 0%, #2563eb 50%, #1d4ed8 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "280px", height: "280px", background: "rgba(255,255,255,0.05)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "220px", height: "220px", background: "rgba(255,255,255,0.05)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", top: "40%", right: "-40px", width: "160px", height: "160px", background: "rgba(255,255,255,0.04)", borderRadius: "50%" }} />

        {/* Logo */}
        <div style={{ background: "#fff", borderRadius: "16px", padding: "10px 18px", marginBottom: "40px" }}>
          <img src="/logo.png" alt="Unique Healthcare" style={{ height: "40px", width: "auto", display: "block" }} />
        </div>

        {/* Tagline */}
        <h2 style={{ color: "#fff", fontWeight: 900, fontSize: "32px", textAlign: "center", lineHeight: 1.25, margin: "0 0 16px" }}>
          Your Trusted Partner in<br />Hospital Equipment
        </h2>
        <p style={{ color: "#bfdbfe", fontSize: "15px", textAlign: "center", lineHeight: 1.7, maxWidth: "320px", margin: "0 0 48px" }}>
          High-quality certified medical equipment delivered with reliability across Ethiopia.
        </p>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", width: "100%", maxWidth: "320px" }}>
          {[
            { val: "200+", lbl: "Hospitals Served" },
            { val: "500+", lbl: "Products" },
            { val: "10+",  lbl: "Years Experience" },
            { val: "98%",  lbl: "Satisfaction" },
          ].map((s) => (
            <div key={s.lbl} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "14px", padding: "16px", textAlign: "center" }}>
              <p style={{ color: "#fff", fontWeight: 900, fontSize: "24px", margin: "0 0 2px" }}>{s.val}</p>
              <p style={{ color: "#bfdbfe", fontSize: "12px", margin: 0 }}>{s.lbl}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 32px" }}>
        <div style={{ width: "100%", maxWidth: "420px" }}>

          {/* Heading */}
          <h1 style={{ color: "#0f172a", fontWeight: 900, fontSize: "30px", margin: "0 0 6px" }}>
            Welcome back
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 32px" }}>
            Sign in to your account to continue
          </p>

          {/* Success message */}
          {successMessage && (
            <div style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0", color: "#15803d", borderRadius: "12px", padding: "12px 16px", fontSize: "13px", marginBottom: "20px", display: "flex", gap: "8px", alignItems: "center" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              {successMessage}
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{ background: "#fff1f2", border: "1.5px solid #fecdd3", color: "#be123c", borderRadius: "12px", padding: "12px 16px", fontSize: "13px", marginBottom: "20px", display: "flex", gap: "8px", alignItems: "center" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "7px" }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@hospital.com"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = "#2563eb"; e.target.style.background = "#fff"; }}
                onBlur={(e) => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; }}
              />
            </div>

            <div style={{ marginBottom: "26px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "7px" }}>
                <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>
                  Password
                </label>
                <Link to="/forgot-password" style={{ fontSize: "12px", color: "#2563eb", textDecoration: "none", fontWeight: 500 }}>
                  Forgot password?
                </Link>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  style={{ ...inputStyle, paddingRight: "48px" }}
                  onFocus={(e) => { e.target.style.borderColor = "#2563eb"; e.target.style.background = "#fff"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", display: "flex", alignItems: "center" }}
                >
                  {showPass ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
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
                transition: "all 0.2s",
              }}
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "24px 0" }}>
            <div style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
            <span style={{ color: "#94a3b8", fontSize: "12px" }}>Don&apos;t have an account?</span>
            <div style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
          </div>

          <Link to="/register" style={{
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
            Create Free Account
          </Link>

        </div>
      </div>
    </div>
  );
}
