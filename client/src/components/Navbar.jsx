import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { label: "Home",       to: "/" },
  { label: "Products",   to: "/products" },
  { label: "Services",   to: "/services" },
  { label: "About Us",   to: "/about" },
  { label: "Contact Us", to: "/contact" },
];

export default function Navbar() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { cart }  = useCart();
  const { user, token, logout } = useAuth();

  const [searchOpen, setSearchOpen]   = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [dropOpen, setDropOpen]       = useState(false);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const isActive  = (to) => to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  useEffect(() => {
    setMobileOpen(false);
    setDropOpen(false);
  }, [location.pathname]);

  const closeMobile = () => setMobileOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setDropOpen(false);
    setMobileOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
      setMobileOpen(false);
    }
  };

  const mobileLinkStyle = (to) => ({
    display: "block",
    color: isActive(to) ? "#fff" : "rgba(255,255,255,0.85)",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: isActive(to) ? 700 : 500,
    padding: "12px 16px",
    borderRadius: "10px",
    background: isActive(to) ? "rgba(255,255,255,0.15)" : "transparent",
  });

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 100 }}>
      <style>{`
        .navbar-desktop-links { display: flex; align-items: center; gap: 2px; flex: 1; }
        .navbar-auth-desktop { display: flex; align-items: center; gap: 8px; }
        .navbar-hamburger { display: none; }
        .navbar-mobile-panel { display: none; }
        @media (max-width: 900px) {
          .navbar-desktop-links { display: none !important; }
          .navbar-auth-desktop { display: none !important; }
          .navbar-hamburger { display: flex !important; }
          .navbar-mobile-panel { display: block !important; }
          .navbar-inner { padding: 0 16px !important; gap: 12px !important; }
        }
      `}</style>

      {/* ── Main nav ── */}
      <nav style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #1e40af 100%)", boxShadow: "0 4px 20px rgba(29,78,216,0.3)" }}>
        <div className="navbar-inner" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px", height: "68px", display: "flex", alignItems: "center", gap: "24px" }}>

          {/* Logo */}
          <Link to="/" onClick={closeMobile} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            <div style={{ background: "#fff", borderRadius: "10px", padding: "4px 8px" }}>
              <img src="/logo.png" alt="Unique Healthcare" style={{ height: "34px", width: "auto", display: "block" }} />
            </div>
          </Link>

          {/* Nav links — desktop */}
          <div className="navbar-desktop-links">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} style={{
                color: isActive(l.to) ? "#fff" : "rgba(255,255,255,0.8)",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: isActive(l.to) ? 700 : 500,
                padding: "8px 14px",
                borderRadius: "8px",
                background: isActive(l.to) ? "rgba(255,255,255,0.15)" : "transparent",
                borderBottom: isActive(l.to) ? "2px solid #fff" : "2px solid transparent",
                transition: "all 0.15s",
              }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0, marginLeft: "auto" }}>

            {/* Search */}
            <button onClick={() => setSearchOpen((p) => !p)}
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", width: "38px", height: "38px", borderRadius: "10px", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              🔍
            </button>

            {/* Cart */}
            <Link to="/cart" onClick={closeMobile} style={{ position: "relative", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", width: "38px", height: "38px", borderRadius: "10px", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
              🛒
              {cartCount > 0 && (
                <span style={{ position: "absolute", top: "-6px", right: "-6px", background: "#ef4444", color: "#fff", fontSize: "10px", fontWeight: 800, width: "18px", height: "18px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #2563eb" }}>
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>

            {/* Auth — desktop */}
            <div className="navbar-auth-desktop">
              {token && user ? (
                <div style={{ position: "relative" }}>
                  <button onClick={() => setDropOpen((p) => !p)}
                    style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "6px 14px 6px 8px", borderRadius: "50px", cursor: "pointer", fontFamily: "inherit", fontSize: "13px", fontWeight: 600 }}>
                    <div style={{ width: "28px", height: "28px", background: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb", fontWeight: 800, fontSize: "13px" }}>
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    {user.name.split(" ")[0]}
                    <span style={{ fontSize: "10px" }}>▾</span>
                  </button>

                  {dropOpen && (
                    <>
                      <div onClick={() => setDropOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 10 }} />
                      <div style={{ position: "absolute", right: 0, top: "48px", width: "190px", background: "#fff", borderRadius: "14px", boxShadow: "0 8px 30px rgba(0,0,0,0.15)", border: "1px solid #f1f5f9", overflow: "hidden", zIndex: 20 }}>
                        <div style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9", background: "#f8fafc" }}>
                          <p style={{ fontWeight: 700, fontSize: "13px", color: "#0f172a", margin: 0 }}>{user.name}</p>
                          <p style={{ fontSize: "11px", color: "#94a3b8", margin: "2px 0 0" }}>{user.email}</p>
                        </div>
                        {user.role !== "admin" && (
                          <Link to="/my-orders" onClick={() => setDropOpen(false)}
                            style={{ display: "block", padding: "11px 16px", fontSize: "13px", color: "#374151", textDecoration: "none" }}>
                            📦 My Orders
                          </Link>
                        )}
                        {user.role === "admin" && (
                          <Link to="/admin" onClick={() => setDropOpen(false)}
                            style={{ display: "block", padding: "11px 16px", fontSize: "13px", color: "#374151", textDecoration: "none" }}>
                            ⚙️ Admin Panel
                          </Link>
                        )}
                        <div style={{ borderTop: "1px solid #f1f5f9" }}>
                          <button onClick={handleLogout}
                            style={{ width: "100%", textAlign: "left", padding: "11px 16px", fontSize: "13px", color: "#ef4444", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                            🚪 Logout
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div style={{ display: "flex", gap: "8px" }}>
                  <Link to="/login"
                    style={{ background: "#fff", color: "#2563eb", padding: "8px 20px", borderRadius: "50px", fontWeight: 700, fontSize: "13px", textDecoration: "none" }}>
                    Login
                  </Link>
                  <Link to="/register"
                    style={{ background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.5)", color: "#fff", padding: "8px 20px", borderRadius: "50px", fontWeight: 700, fontSize: "13px", textDecoration: "none" }}>
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Hamburger — mobile */}
            <button
              type="button"
              className="navbar-hamburger"
              onClick={() => setMobileOpen((p) => !p)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#fff",
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "18px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <>
          <div
            onClick={closeMobile}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 90 }}
          />
          <div
            className="navbar-mobile-panel"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "68px",
              background: "linear-gradient(180deg, #1e40af 0%, #1d4ed8 100%)",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              zIndex: 95,
              maxHeight: "calc(100vh - 68px)",
              overflowY: "auto",
            }}
          >
            <div style={{ padding: "12px 16px 20px" }}>
              {navLinks.map((l) => (
                <Link key={l.to} to={l.to} onClick={closeMobile} style={mobileLinkStyle(l.to)}>
                  {l.label}
                </Link>
              ))}

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", margin: "12px 0", paddingTop: "12px" }}>
                {token && user ? (
                  <>
                    <div style={{ padding: "8px 16px 12px" }}>
                      <p style={{ color: "#fff", fontWeight: 700, fontSize: "14px", margin: 0 }}>{user.name}</p>
                      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", margin: "4px 0 0" }}>{user.email}</p>
                    </div>
                    {user.role !== "admin" && (
                      <Link to="/my-orders" onClick={closeMobile} style={mobileLinkStyle("/my-orders")}>
                        📦 My Orders
                      </Link>
                    )}
                    {user.role === "admin" && (
                      <Link to="/admin" onClick={closeMobile} style={mobileLinkStyle("/admin")}>
                        ⚙️ Admin Panel
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={handleLogout}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "12px 16px",
                        fontSize: "15px",
                        color: "#fca5a5",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      🚪 Logout
                    </button>
                  </>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "0 8px" }}>
                    <Link
                      to="/login"
                      onClick={closeMobile}
                      style={{
                        display: "block",
                        textAlign: "center",
                        background: "#fff",
                        color: "#2563eb",
                        padding: "12px",
                        borderRadius: "10px",
                        fontWeight: 700,
                        fontSize: "14px",
                        textDecoration: "none",
                      }}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={closeMobile}
                      style={{
                        display: "block",
                        textAlign: "center",
                        background: "rgba(255,255,255,0.15)",
                        border: "1.5px solid rgba(255,255,255,0.4)",
                        color: "#fff",
                        padding: "12px",
                        borderRadius: "10px",
                        fontWeight: 700,
                        fontSize: "14px",
                        textDecoration: "none",
                      }}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Search bar ── */}
      {searchOpen && (
        <div style={{ background: "#1e40af", borderTop: "1px solid rgba(255,255,255,0.1)", padding: "14px 0" }}>
          <form onSubmit={handleSearch} style={{ maxWidth: "600px", margin: "0 auto", padding: "0 32px", display: "flex", gap: "10px" }}>
            <input autoFocus type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search medical equipment, brands..."
              style={{ flex: 1, background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.3)", color: "#fff", borderRadius: "12px", padding: "10px 18px", fontSize: "14px", outline: "none", fontFamily: "inherit" }} />
            <button type="submit"
              style={{ background: "#fff", color: "#2563eb", border: "none", borderRadius: "12px", padding: "10px 22px", fontWeight: 700, fontSize: "14px", cursor: "pointer", fontFamily: "inherit" }}>
              Search
            </button>
            <button type="button" onClick={() => setSearchOpen(false)}
              style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "none", borderRadius: "12px", padding: "10px 14px", cursor: "pointer", fontFamily: "inherit", fontSize: "16px" }}>
              ✕
            </button>
          </form>
        </div>
      )}

    </header>
  );
}
