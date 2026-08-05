import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminTopbar({ onToggleSidebar }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/admin/products?search=${encodeURIComponent(search)}`);
  };

  const handleLogout = () => { logout(); navigate("/login"); };

  const topbarStyle = {
    height: "64px",
    background: "#fff",
    borderBottom: "1px solid #f1f5f9",
    display: "flex",
    alignItems: "center",
    padding: "0 24px",
    gap: "16px",
    flexShrink: 0,
    zIndex: 10,
  };

  const iconBtnStyle = {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "10px",
    color: "#64748b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.15s, color 0.15s",
  };

  return (
    <header style={topbarStyle}>
      {/* Hamburger */}
      <button
        onClick={onToggleSidebar}
        style={iconBtnStyle}
        onMouseEnter={(e) => { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.color = "#0f172a"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b"; }}
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Search */}
      <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: "400px" }}>
        <div style={{ position: "relative" }}>
          <svg style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)",
            width: "16px", height: "16px", color: "#94a3b8", pointerEvents: "none" }}
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products, orders..."
            style={{
              width: "100%", paddingLeft: "38px", paddingRight: "16px",
              paddingTop: "8px", paddingBottom: "8px",
              background: "#f8fafc", border: "1px solid #e2e8f0",
              borderRadius: "12px", fontSize: "14px",
              outline: "none", boxSizing: "border-box",
              color: "#0f172a",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#2563eb"; e.currentTarget.style.background = "#fff"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#f8fafc"; }}
          />
        </div>
      </form>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Notifications */}
      <button
        style={iconBtnStyle}
        onMouseEnter={(e) => { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.color = "#0f172a"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b"; }}
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </button>

      {/* Admin dropdown */}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setDropdownOpen((p) => !p)}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "6px 12px 6px 8px", borderRadius: "12px",
            background: "transparent", border: "none", cursor: "pointer",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "#f1f5f9"}
          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
        >
          <div style={{
            width: "32px", height: "32px", borderRadius: "50%", background: "#2563eb",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: "700", fontSize: "13px",
          }}>
            {user?.name?.charAt(0)?.toUpperCase() || "A"}
          </div>
          <span style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>
            {user?.name}
          </span>
          <svg width="14" height="14" fill="none" stroke="#94a3b8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {dropdownOpen && (
          <>
            <div
              style={{ position: "fixed", inset: 0, zIndex: 10 }}
              onClick={() => setDropdownOpen(false)}
            />
            <div style={{
              position: "absolute", right: 0, top: "52px", width: "192px",
              background: "#fff", borderRadius: "14px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
              border: "1px solid #f1f5f9",
              padding: "4px 0", zIndex: 20,
            }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9" }}>
                <p style={{ fontSize: "14px", fontWeight: "600", color: "#0f172a", margin: 0 }}>{user?.name}</p>
                <p style={{ fontSize: "12px", color: "#94a3b8", margin: "2px 0 0" }}>{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  width: "100%", textAlign: "left", padding: "10px 16px",
                  fontSize: "14px", color: "#ef4444", background: "transparent",
                  border: "none", cursor: "pointer", transition: "background 0.15s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#fef2f2"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                Sign out
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default AdminTopbar;
