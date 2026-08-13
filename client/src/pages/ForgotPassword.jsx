import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

export default function ForgotPassword() {
  const [email, setEmail]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [sent, setSent]         = useState(false);
  const [error, setError]       = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      await API.post("/auth/forgot-password", { email: email.trim().toLowerCase() });
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    try {
      setLoading(true);
      await API.post("/auth/forgot-password", { email: email.trim().toLowerCase() });
    } catch (err) {
      setError(err.response?.data?.message || "Could not resend email. Try again.");
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

  return (
    <div className="auth-page">

      {/* Left branding panel */}
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
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "280px", height: "280px", background: "rgba(255,255,255,0.05)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "220px", height: "220px", background: "rgba(255,255,255,0.05)", borderRadius: "50%" }} />

        <div style={{ background: "#fff", borderRadius: "16px", padding: "10px 18px", marginBottom: "40px" }}>
          <img src="/logo.png" alt="Unique Healthcare" style={{ height: "40px", width: "auto", display: "block" }} />
        </div>

        <h2 style={{ color: "#fff", fontWeight: 900, fontSize: "30px", textAlign: "center", lineHeight: 1.25, margin: "0 0 16px" }}>
          Account Recovery
        </h2>
        <p style={{ color: "#bfdbfe", fontSize: "15px", textAlign: "center", lineHeight: 1.7, maxWidth: "300px", margin: "0 0 40px" }}>
          We'll send a secure reset link to your registered email address.
        </p>

        {/* Steps */}
        <div style={{ width: "100%", maxWidth: "300px", display: "flex", flexDirection: "column", gap: "16px" }}>
          {[
            { num: "1", text: "Enter your email address below" },
            { num: "2", text: "Check your inbox for the reset link" },
            { num: "3", text: "Click the link and set a new password" },
          ].map((s) => (
            <div key={s.num} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ width: "32px", height: "32px", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "14px", flexShrink: 0 }}>
                {s.num}
              </div>
              <span style={{ color: "#dbeafe", fontSize: "13px" }}>{s.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 32px" }}>
        <div style={{ width: "100%", maxWidth: "420px" }}>

          {sent ? (
            /* ── Success state ── */
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "64px", height: "64px", background: "#f0fdf4", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 style={{ color: "#0f172a", fontWeight: 900, fontSize: "26px", margin: "0 0 10px" }}>
                Check your email
              </h1>
              <p style={{ color: "#64748b", fontSize: "14px", lineHeight: 1.7, margin: "0 0 8px" }}>
                If an account exists for <strong style={{ color: "#0f172a" }}>{email}</strong>, a password reset link has been sent.
              </p>
              <p style={{ color: "#94a3b8", fontSize: "13px", margin: "0 0 24px" }}>
                The link expires in 1 hour. Check your spam folder if you don't see it.
              </p>
              {error && (
                <div style={{ background: "#fff1f2", border: "1.5px solid #fecdd3", color: "#be123c", borderRadius: "12px", padding: "12px 16px", fontSize: "13px", marginBottom: "16px" }}>
                  {error}
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={loading}
                  style={{ background: "#fff", color: "#2563eb", border: "1.5px solid #2563eb", padding: "12px 32px", borderRadius: "12px", fontWeight: 700, fontSize: "14px", cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit" }}
                >
                  {loading ? "Sending..." : "Resend Email"}
                </button>
                <Link to="/login" style={{ display: "inline-block", background: "#2563eb", color: "#fff", padding: "12px 32px", borderRadius: "12px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
                  Back to Sign In
                </Link>
              </div>
            </div>
          ) : (
            /* ── Form state ── */
            <>
              <div style={{ marginBottom: "32px" }}>
                <h1 style={{ color: "#0f172a", fontWeight: 900, fontSize: "30px", margin: "0 0 8px" }}>
                  Forgot your password?
                </h1>
                <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
                  Enter your email and we'll send you a reset link.
                </p>
              </div>

              {error && (
                <div style={{ background: "#fff1f2", border: "1.5px solid #fecdd3", color: "#be123c", borderRadius: "12px", padding: "12px 16px", fontSize: "13px", marginBottom: "20px", display: "flex", gap: "8px", alignItems: "center" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "7px" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    required
                    placeholder="you@hospital.com"
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = "#2563eb"; e.target.style.background = "#fff"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; }}
                  />
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
                    boxShadow: "0 4px 14px rgba(37,99,235,0.3)",
                  }}
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>

              <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "24px 0" }}>
                <div style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
                <span style={{ color: "#94a3b8", fontSize: "12px" }}>Remember your password?</span>
                <div style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
              </div>

              <Link to="/login" style={{ display: "block", textAlign: "center", border: "1.5px solid #2563eb", color: "#2563eb", borderRadius: "12px", padding: "13px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
                Back to Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
