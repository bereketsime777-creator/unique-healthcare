import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiSearch, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
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

  const handleLogoClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    closeMobile();
  };

  const handleHomeClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 100 }}>
      <style>{`
        .navbar-desktop-links { display: flex; align-items: center; gap: 4px; flex: 1; justify-content: center; }
        .navbar-auth-desktop { display: flex; align-items: center; gap: 8px; }
        .navbar-hamburger { display: none; }
        .navbar-mobile-panel { display: none; }
        @media (max-width: 900px) {
          .navbar-desktop-links { display: none !important; }
          .navbar-auth-desktop { display: none !important; }
          .navbar-hamburger { display: flex !important; }
          .navbar-mobile-panel { display: block !important; }
          .navbar-inner { padding: 0 16px !important; }
        }
      `}</style>

      {/* Main nav */}
      <nav className="site-nav">
        <div className="navbar-inner page-wrap" style={{ height: "80px", display: "flex", alignItems: "center", gap: "24px" }}>

          <Link to="/" onClick={handleLogoClick} style={{ textDecoration: "none", display: "flex", alignItems: "center", flexShrink: 0 }}>
            <img src="/logo.png" alt="Unique Healthcare" style={{ height: "60px", width: "auto", display: "block" }} />
          </Link>

          <div className="navbar-desktop-links">
            {navLinks.map((l) => (
              <Link 
                key={l.to} 
                to={l.to} 
                className={`nav-link${isActive(l.to) ? " active" : ""}`}
                onClick={l.to === "/" ? handleHomeClick : undefined}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0, marginLeft: "auto" }}>

            <button
              type="button"
              onClick={() => setSearchOpen((p) => !p)}
              className="nav-icon-btn"
              aria-label="Search"
            >
              <FiSearch size={18} />
            </button>

            <Link to="/cart" onClick={closeMobile} className="nav-icon-btn" aria-label="Cart" style={{ position: "relative" }}>
              <FiShoppingCart size={18} />
              {cartCount > 0 && (
                <span style={{
                  position: "absolute", top: "-5px", right: "-5px",
                  background: "#ef4444", color: "#fff", fontSize: "10px", fontWeight: 800,
                  width: "18px", height: "18px", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: "2px solid #fff",
                }}>
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>

            <div className="navbar-auth-desktop">
              {token && user ? (
                <div style={{ position: "relative" }}>
                  <button
                    type="button"
                    onClick={() => setDropOpen((p) => !p)}
                    style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      background: "#eff6ff", border: "1px solid #bfdbfe", color: "#1e40af",
                      padding: "6px 14px 6px 6px", borderRadius: "50px",
                      cursor: "pointer", fontFamily: "inherit", fontSize: "13px", fontWeight: 600,
                    }}
                  >
                    <div style={{
                      width: "28px", height: "28px", background: "#2563eb", borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontWeight: 800, fontSize: "13px",
                    }}>
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    {user.name.split(" ")[0]}
                  </button>

                  {dropOpen && (
                    <>
                      <div onClick={() => setDropOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 10 }} />
                      <div style={{
                        position: "absolute", right: 0, top: "48px", width: "200px",
                        background: "#fff", borderRadius: "14px",
                        boxShadow: "0 8px 30px rgba(0,0,0,0.12)", border: "1px solid #f1f5f9",
                        overflow: "hidden", zIndex: 20,
                      }}>
                        <div style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9", background: "#f8fafc" }}>
                          <p style={{ fontWeight: 700, fontSize: "13px", color: "#0f172a", margin: 0 }}>{user.name}</p>
                          <p style={{ fontSize: "11px", color: "#94a3b8", margin: "2px 0 0" }}>{user.email}</p>
                        </div>
                        {user.role !== "admin" && (
                          <Link to="/my-orders" onClick={() => setDropOpen(false)}
                            style={{ display: "block", padding: "11px 16px", fontSize: "13px", color: "#374151", textDecoration: "none" }}>
                            My Orders
                          </Link>
                        )}
                        {user.role === "admin" && (
                          <Link to="/admin" onClick={() => setDropOpen(false)}
                            style={{ display: "block", padding: "11px 16px", fontSize: "13px", color: "#374151", textDecoration: "none" }}>
                            Admin Panel
                          </Link>
                        )}
                        <Link to="/change-password" onClick={() => setDropOpen(false)}
                          style={{ display: "block", padding: "11px 16px", fontSize: "13px", color: "#374151", textDecoration: "none", borderTop: "1px solid #f1f5f9" }}>
                          Change Password
                        </Link>
                        <div style={{ borderTop: "1px solid #f1f5f9" }}>
                          <button type="button" onClick={handleLogout}
                            style={{ width: "100%", textAlign: "left", padding: "11px 16px", fontSize: "13px", color: "#ef4444", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                            Logout
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div style={{ display: "flex", gap: "8px" }}>
                  <Link to="/login" className="btn btn-primary" style={{ padding: "9px 20px", fontSize: "13px" }}>
                    Login
                  </Link>
                  <Link to="/register" className="btn" style={{
                    padding: "9px 20px", fontSize: "13px",
                    background: "transparent", border: "2px solid #e2e8f0", color: "#374151",
                  }}>
                    Register
                  </Link>
                </div>
              )}
            </div>

            <button
              type="button"
              className="navbar-hamburger nav-icon-btn"
              onClick={() => setMobileOpen((p) => !p)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <>
          <div onClick={closeMobile} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 90 }} />
          <div className="navbar-mobile-panel" style={{
            position: "absolute", left: 0, right: 0, top: "100%",
            background: "#fff", borderTop: "1px solid #f1f5f9",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)", zIndex: 95,
            maxHeight: "calc(100vh - 110px)", overflowY: "auto",
          }}>
            <div style={{ padding: "12px 16px 20px" }}>
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={(e) => {
                    if (l.to === "/" && location.pathname === "/") {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                    closeMobile();
                  }}
                  className={`nav-link${isActive(l.to) ? " active" : ""}`}
                  style={{ display: "block", marginBottom: "4px" }}
                >
                  {l.label}
                </Link>
              ))}

              <div style={{ borderTop: "1px solid #f1f5f9", margin: "12px 0", paddingTop: "12px" }}>
                {token && user ? (
                  <>
                    <div style={{ padding: "8px 16px 12px" }}>
                      <p style={{ color: "#0f172a", fontWeight: 700, fontSize: "14px", margin: 0 }}>{user.name}</p>
                      <p style={{ color: "#94a3b8", fontSize: "12px", margin: "4px 0 0" }}>{user.email}</p>
                    </div>
                    {user.role !== "admin" && (
                      <Link to="/my-orders" onClick={closeMobile} className="nav-link" style={{ display: "block" }}>
                        My Orders
                      </Link>
                    )}
                    {user.role === "admin" && (
                      <Link to="/admin" onClick={closeMobile} className="nav-link" style={{ display: "block" }}>
                        Admin Panel
                      </Link>
                    )}
                    <Link to="/change-password" onClick={closeMobile} className="nav-link" style={{ display: "block" }}>
                      Change Password
                    </Link>
                    <button type="button" onClick={handleLogout}
                      style={{ width: "100%", textAlign: "left", padding: "12px 16px", fontSize: "14px", color: "#ef4444", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                      Logout
                    </button>
                  </>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "0 8px" }}>
                    <Link to="/login" onClick={closeMobile} className="btn btn-primary" style={{ textAlign: "center" }}>
                      Login
                    </Link>
                    <Link to="/register" onClick={closeMobile} className="btn" style={{
                      textAlign: "center", background: "transparent",
                      border: "2px solid #e2e8f0", color: "#374151",
                    }}>
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Search bar */}
      {searchOpen && (
        <div style={{ background: "#fff", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9", padding: "14px 0", boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}>
          <form onSubmit={handleSearch} style={{ maxWidth: "600px", margin: "0 auto", padding: "0 32px", display: "flex", gap: "10px" }}>
            <input
              autoFocus
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search medical equipment, brands..."
              style={{
                flex: 1, background: "#f8fafc", border: "1.5px solid #e2e8f0",
                color: "#0f172a", borderRadius: "12px", padding: "10px 18px",
                fontSize: "14px", outline: "none", fontFamily: "inherit",
              }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: "10px 22px" }}>
              Search
            </button>
            <button type="button" onClick={() => setSearchOpen(false)} className="nav-icon-btn">
              <FiX size={18} />
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
