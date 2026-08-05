import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../services/api";

const navItems = [
  { to: "/admin",             label: "Dashboard",   icon: "⊞" },
  { to: "/admin/products",    label: "Products",    icon: "📦" },
  { to: "/admin/add-product", label: "Add Product", icon: "＋" },
  { to: "/admin/orders",      label: "Orders",      icon: "🧾" },
  { to: "/admin/messages",    label: "Messages",    icon: "💬", badge: true },
];

function AdminSidebar({ open }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    API.get("/messages/unread-count")
      .then((r) => setUnread(r.data.count))
      .catch(() => {});
    const iv = setInterval(() => {
      API.get("/messages/unread-count")
        .then((r) => setUnread(r.data.count))
        .catch(() => {});
    }, 30000);
    return () => clearInterval(iv);
  }, []);

  const isActive = (path) =>
    path === "/admin"
      ? location.pathname === "/admin"
      : location.pathname.startsWith(path);

  const handleLogout = () => { logout(); navigate("/login"); };

  const sidebarStyle = {
    width: open ? "240px" : "64px",
    background: "#0f172a",
    display: "flex",
    flexDirection: "column",
    transition: "width 0.2s ease",
    flexShrink: 0,
    overflow: "hidden",
  };

  const logoAreaStyle = {
    height: "64px",
    display: "flex",
    alignItems: "center",
    padding: "0 16px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    flexShrink: 0,
  };

  const navAreaStyle = {
    flex: 1,
    padding: "16px 8px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  };

  const getNavItemStyle = (active) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 12px",
    borderRadius: "12px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: active ? "600" : "500",
    background: active ? "rgba(37,99,235,0.2)" : "transparent",
    color: active ? "#60a5fa" : "rgba(255,255,255,0.65)",
    transition: "background 0.15s, color 0.15s",
    position: "relative",
    whiteSpace: "nowrap",
  });

  const badgeStyle = {
    background: "#ef4444",
    color: "#fff",
    fontSize: "11px",
    fontWeight: "700",
    padding: "2px 6px",
    borderRadius: "999px",
    minWidth: "20px",
    textAlign: "center",
    marginLeft: "auto",
  };

  const dividerStyle = {
    height: "1px",
    background: "rgba(255,255,255,0.08)",
    margin: "8px 8px",
  };

  const bottomStyle = {
    borderTop: "1px solid rgba(255,255,255,0.08)",
    padding: "12px",
  };

  return (
    <aside style={sidebarStyle}>
      {/* Logo */}
      <div style={logoAreaStyle}>
        {open ? (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img src="/logo.png" alt="logo" style={{ height: "32px", width: "auto" }} />
          </div>
        ) : (
          <div style={{
            width: "36px", height: "36px", background: "#2563eb", borderRadius: "10px",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: "700", fontSize: "14px", margin: "0 auto",
          }}>
            U
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={navAreaStyle}>
        {navItems.map((item) => {
          const active = isActive(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              title={!open ? item.label : ""}
              style={getNavItemStyle(active)}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.color = "#fff";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                }
              }}
            >
              <span style={{ fontSize: "16px", flexShrink: 0 }}>{item.icon}</span>
              {open && <span style={{ flex: 1 }}>{item.label}</span>}
              {open && item.badge && unread > 0 && (
                <span style={badgeStyle}>{unread > 99 ? "99+" : unread}</span>
              )}
              {!open && item.badge && unread > 0 && (
                <span style={{
                  position: "absolute", top: "6px", right: "8px",
                  background: "#ef4444", color: "#fff", fontSize: "10px",
                  width: "16px", height: "16px", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: "700",
                }}>
                  {unread > 9 ? "9+" : unread}
                </span>
              )}
            </Link>
          );
        })}

        {/* Divider + View Store */}
        <div style={dividerStyle} />
        {open && (
          <div style={{ padding: "4px 12px 4px", fontSize: "11px", fontWeight: "600",
            color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Store
          </div>
        )}
        <Link
          to="/"
          title={!open ? "View Store" : ""}
          style={getNavItemStyle(false)}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.07)";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "rgba(255,255,255,0.65)";
          }}
        >
          <span style={{ fontSize: "16px", flexShrink: 0 }}>🏪</span>
          {open && <span>View Store</span>}
        </Link>
      </nav>

      {/* Bottom: User */}
      {open && (
        <div style={bottomStyle}>
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "8px 12px", borderRadius: "12px",
          }}>
            <div style={{
              width: "34px", height: "34px", borderRadius: "50%", background: "#2563eb",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: "700", fontSize: "13px", flexShrink: 0,
            }}>
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: "13px", fontWeight: "600", color: "#fff",
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", margin: 0 }}>
                {user?.name}
              </p>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", margin: 0 }}>
                Administrator
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              marginTop: "8px", width: "100%", display: "flex", alignItems: "center",
              gap: "8px", padding: "8px 12px", borderRadius: "12px",
              fontSize: "13px", fontWeight: "500", color: "#f87171",
              background: "transparent", border: "none", cursor: "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(239,68,68,0.1)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
          >
            <span>🚪</span> Logout
          </button>
        </div>
      )}
    </aside>
  );
}

export default AdminSidebar;
