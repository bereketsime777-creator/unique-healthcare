import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function ResetPassword() {
  const { token }   = useParams();
  const navigate    = useNavigate();

  const [tokenValid, setTokenValid]   = useState(null); // null=checking, true, false
  const [userName, setUserName]       = useState("");
  const [form, setForm]               = useState({ password: "", confirmPassword: "" });
  const [showPass, setShowPass]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading]         = useState(false);
  const [done, setDone]               = useState(false);
  const [error, setError]             = useState("");

  // Verify token on mount
  useEffect(() => {
    API.get(`/auth/verify-reset-token/${token}`)
      .then((r) => { setTokenValid(true); setUserName(r.data.name); })
      .catch(() => setTokenValid(false));
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    try {
      setLoading(true);
      await API.post(`/auth/reset-password/${token}`, { password: form.password });
      setDone(true);
      setTimeout(() => navigate("/login", { state: { message: "Password reset successfully. Please sign in." } }), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    border: "1.5px solid #e2e8f0",
    borderRadius: "12px",
    padding: "13px 16px 13px 16px",
    paddingRight: "48px",
    fontSize: "14px",
    outline: "none",
    fontFamily: "inherit",
    color: "#0f172a",
    background: "#f8fafc",
    boxSizing: "border-box",
  };

  const EyeIcon = ({ open }) => open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );

  // Password strength
  const getStrength = (pwd) => {
    if (!pwd) return null;
    if (pwd.length < 6) return { label: "Too short", color: "#ef4444", width: "20%" };
    if (pwd.length < 8) return { label: "Weak", color: "#f97316", width: "40%" };
    if (!/[A-Z]/.test(pwd) || !/[0-9]/.test(pwd)) return { label: "Fair", color: "#eab308", width: "60%" };
    if (pwd.length >= 10) return { label: "Strong", color: "#22c55e", width: "100%" };
    return { label: "Good", color: "#3b82f6", width: "80%" };
  };

  const strength = getStrength(form.password);

  return (
    <div className="auth-page">

      {/* Left panel */}
      <div className="auth-brand-panel" style={{
        background: "linear-gradient(145deg, #1e3a8a 0%, #2563eb 50%, #1d4ed8 100%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "48px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "280px", height: "280px", background: "rgba(255,255,255,0.05)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "220px", height: "220px", background: "rgba(255,255,255,0.05)", borderRadius: "50%" }} />

        <div style={{ background: "#fff", borderRadius: "16px", padding: "10px 18px", marginBottom: "40px" }}>
          <img src="/logo.png" alt="Unique Healthcare" style={{ height: "40px", width: "auto", display: "block" }} />
        </div>

        <h2 style={{ color: "#fff", fontWeight: 900, fontSize: "30px", textAlign: "center", lineHeight: 1.25, margin: "0 0 16px" }}>
          Set a New Password
        </h2>
        <p style={{ color: "#bfdbfe", fontSize: "15px", textAlign: "center", lineHeight: 1.7, maxWidth: "300px", margin: "0 0 40px" }}>
          Choose a strong password to keep your account secure.
        </p>

        {/* Tips */}
        <div style={{ width: "100%", maxWidth: "300px", background: "rgba(255,255,255,0.08)", borderRadius: "14px", padding: "20px" }}>
          <p style={{ color: "#fff", fontWeight: 700, fontSize: "13px", margin: "0 0 12px" }}>Password Tips</p>
          {[
            "At least 8 characters long",
            "Include uppercase and lowercase letters",
            "Add numbers and special characters",
            "Don't reuse old passwords",
          ].map((tip) => (
            <div key={tip} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "8px" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5" style={{ marginTop: "2px", flexShrink: 0 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
              <span style={{ color: "#dbeafe", fontSize: "12px", lineHeight: 1.5 }}>{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 32px" }}>
        <div style={{ width: "100%", maxWidth: "420px" }}>

          {/* Checking token */}
          {tokenValid === null && (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "48px", height: "48px", border: "3px solid #e2e8f0", borderTopColor: "#2563eb", borderRadius: "50%", margin: "0 auto 16px", animation: "spin 1s linear infinite" }} />
              <p style={{ color: "#64748b", fontSize: "14px" }}>Verifying your reset link...</p>
            </div>
          )}

          {/* Invalid token */}
          {tokenValid === false && (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "64px", height: "64px", background: "#fff1f2", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
              </div>
              <h1 style={{ color: "#0f172a", fontWeight: 900, fontSize: "24px", margin: "0 0 10px" }}>
                Link Expired or Invalid
              </h1>
              <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 28px", lineHeight: 1.7 }}>
                This reset link is no longer valid. It may have expired or already been used.
              </p>
              <Link to="/forgot-password" style={{ display: "inline-block", background: "#2563eb", color: "#fff", padding: "12px 28px", borderRadius: "12px", fontWeight: 700, fontSize: "14px", textDecoration: "none", marginBottom: "12px" }}>
                Request New Link
              </Link>
              <br />
              <Link to="/login" style={{ color: "#2563eb", fontSize: "13px", textDecoration: "none" }}>
                Back to Sign In
              </Link>
            </div>
          )}

          {/* Success */}
          {done && (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "64px", height: "64px", background: "#f0fdf4", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <h1 style={{ color: "#0f172a", fontWeight: 900, fontSize: "26px", margin: "0 0 10px" }}>
                Password Reset!
              </h1>
              <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 6px" }}>
                Your password has been changed successfully.
              </p>
              <p style={{ color: "#94a3b8", fontSize: "13px", margin: "0 0 28px" }}>
                Redirecting to sign in...
              </p>
              <Link to="/login" style={{ display: "inline-block", background: "#2563eb", color: "#fff", padding: "12px 28px", borderRadius: "12px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
                Sign In Now
              </Link>
            </div>
          )}

          {/* Form */}
          {tokenValid === true && !done && (
            <>
              <div style={{ marginBottom: "32px" }}>
                <h1 style={{ color: "#0f172a", fontWeight: 900, fontSize: "28px", margin: "0 0 6px" }}>
                  Reset your password
                </h1>
                <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
                  Hi <strong>{userName}</strong>, enter your new password below.
                </p>
              </div>

              {error && (
                <div style={{ background: "#fff1f2", border: "1.5px solid #fecdd3", color: "#be123c", borderRadius: "12px", padding: "12px 16px", fontSize: "13px", marginBottom: "20px", display: "flex", gap: "8px", alignItems: "center" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* New password */}
                <div style={{ marginBottom: "8px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "7px" }}>
                    New Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPass ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => { setForm({ ...form, password: e.target.value }); setError(""); }}
                      required placeholder="Enter new password"
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = "#2563eb"; e.target.style.background = "#fff"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; }}
                    />
                    <button type="button" onClick={() => setShowPass((p) => !p)}
                      style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", display: "flex", alignItems: "center" }}>
                      <EyeIcon open={showPass} />
                    </button>
                  </div>
                </div>

                {/* Strength bar */}
                {form.password && (
                  <div style={{ marginBottom: "18px" }}>
                    <div style={{ height: "4px", background: "#e2e8f0", borderRadius: "4px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: strength?.width, background: strength?.color, borderRadius: "4px", transition: "width 0.3s, background 0.3s" }} />
                    </div>
                    <p style={{ fontSize: "12px", color: strength?.color, margin: "4px 0 0", fontWeight: 600 }}>
                      {strength?.label}
                    </p>
                  </div>
                )}

                {/* Confirm password */}
                <div style={{ marginBottom: "28px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "7px" }}>
                    Confirm Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={form.confirmPassword}
                      onChange={(e) => { setForm({ ...form, confirmPassword: e.target.value }); setError(""); }}
                      required placeholder="Repeat your new password"
                      style={{
                        ...inputStyle,
                        borderColor: form.confirmPassword && form.confirmPassword !== form.password ? "#ef4444" : "#e2e8f0",
                      }}
                      onFocus={(e) => { e.target.style.borderColor = "#2563eb"; e.target.style.background = "#fff"; }}
                      onBlur={(e) => {
                        e.target.style.borderColor = form.confirmPassword && form.confirmPassword !== form.password ? "#ef4444" : "#e2e8f0";
                        e.target.style.background = "#f8fafc";
                      }}
                    />
                    <button type="button" onClick={() => setShowConfirm((p) => !p)}
                      style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", display: "flex", alignItems: "center" }}>
                      <EyeIcon open={showConfirm} />
                    </button>
                  </div>
                  {form.confirmPassword && form.confirmPassword !== form.password && (
                    <p style={{ fontSize: "12px", color: "#ef4444", margin: "4px 0 0" }}>
                      Passwords do not match
                    </p>
                  )}
                </div>

                <button type="submit" disabled={loading}
                  style={{
                    width: "100%",
                    background: loading ? "#93c5fd" : "linear-gradient(135deg, #2563eb, #1d4ed8)",
                    color: "#fff", border: "none", borderRadius: "12px", padding: "14px",
                    fontWeight: 700, fontSize: "15px",
                    cursor: loading ? "not-allowed" : "pointer",
                    fontFamily: "inherit",
                    boxShadow: "0 4px 14px rgba(37,99,235,0.3)",
                  }}>
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            </>
          )}

        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
