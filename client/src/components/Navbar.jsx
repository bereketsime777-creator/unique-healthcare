import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiSearch, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { t } from "../translations/translations";

export default function Navbar() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { cart }  = useCart();
  const { user, token, logout } = useAuth();
  const { language, toggleLanguage } = useLanguage();

  // B2B Professional navigation structure
  const navLinks = [
    { label: t(language, "nav.home"),     to: "/" },
    { label: t(language, "nav.products"), to: "/products" },
    { label: "Solutions",                 to: "/services" },
    { label: "Brands",                    to: "/brands", comingSoon: true },
    { label: t(language, "nav.about"),    to: "/about" },
    { label: "Resources",                 to: "#", comingSoon: true },
    { label: t(language, "nav.contact"),  to: "/contact" },
  ];

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

  const handleLogout = () => {
    logout();
    navigate("/login");
    setDropOpen(false);
    setMobileOpen(false);
  };

  const handleRequestQuote = () => {
    navigate("/contact");
    closeMobile();
    setDropOpen(false);
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
    <header style={{ position: "sticky", top: 0, zIndex: 100, background: "#fff", borderBottom: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
      <style>{`
        .navbar-desktop-links { display: flex; align-items: center; gap: 2px; flex: 1; justify-content: center; }
        .navbar-auth-desktop { display: flex; align-items: center; gap: 12px; }
        .navbar-hamburger { display: none; }
        .navbar-mobile-panel { display: none; }
        .nav-link {
          padding: 8px 14px;
          font-size: 14px;
          font-weight: 500;
          color: #475569;
          border-radius: 6px;
          transition: all 0.2s;
          text-decoration: none;
          position: relative;
          white-space: nowrap;
        }
        .nav-link:hover {
          color: #2563eb;
          background-color: rgba(37, 99, 235, 0.08);
        }
        .nav-link.active {
          color: #2563eb;
          font-weight: 600;
          background-color: rgba(37, 99, 235, 0.1);
        }
        .nav-icon-btn {
          background: none;
          border: none;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #475569;
          border-radius: 6px;
          transition: all 0.2s;
          font-family: inherit;
        }
        .nav-icon-btn:hover {
          color: #2563eb;
          background-color: rgba(37, 99, 235, 0.08);
        }
        @media (max-width: 1024px) {
          .navbar-desktop-links { display: none !important; }
          .navbar-auth-desktop { display: none !important; }
          .navbar-hamburger { display: flex !important; }
          .navbar-mobile-panel { display: block !important; }
          .navbar-inner { padding: 0 16px !important; }
        }
      `}</style>

      {/* Main nav */}
      <nav className="site-nav" style={{ background: "#fff" }}>
        <div className="navbar-inner page-wrap" style={{ height: "70px", display: "flex", alignItems: "center", gap: "20px" }}>

          {/* Logo Section */}
          <Link to="/" onClick={handleLogoClick} style={{ textDecoration: "none", display: "flex", alignItems: "center", flexShrink: 0 }}>
            <img src="/logo.png" alt="Unique Healthcare" style={{ height: "55px", width: "auto", display: "block" }} />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="navbar-desktop-links">
            {navLinks.map((l) => (
              <div key={l.to} style={{ position: "relative" }}>
                <Link 
                  to={l.comingSoon ? "#" : l.to} 
                  className={`nav-link${isActive(l.to) ? " active" : ""}`}
                  onClick={(e) => {
                    if (l.comingSoon) e.preventDefault();
                    if (l.to === "/" && location.pathname === "/") {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  style={{ opacity: l.comingSoon ? 0.6 : 1, cursor: l.comingSoon ? "not-allowed" : "pointer" }}
                  title={l.comingSoon ? "Coming soon" : ""}
                >
                  {l.label}
                  {l.comingSoon && <span style={{ fontSize: "10px", marginLeft: "4px", color: "#94a3b8" }}>Soon</span>}
                </Link>
              </div>
            ))}
          </div>

          {/* Right Section - Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0, marginLeft: "auto" }}>

            {/* Search Icon */}
            <button
              type="button"
              onClick={() => setSearchOpen((p) => !p)}
              className="nav-icon-btn"
              aria-label="Search"
              title="Search products"
            >
              <FiSearch size={18} />
            </button>

            {/* Cart Icon */}
            <Link to="/cart" onClick={closeMobile} className="nav-icon-btn" aria-label="Cart" style={{ position: "relative" }} title="Shopping cart">
              <FiShoppingCart size={18} />
              {cartCount > 0 && (
                <span style={{
                  position: "absolute", top: "-5px", right: "-5px",
                  background: "#2563eb", color: "#fff", fontSize: "10px", fontWeight: 800,
                  width: "18px", height: "18px", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: "2px solid #fff",
                }}>
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>

            {/* Language Switcher */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="nav-icon-btn"
              style={{
                background: "rgba(37, 99, 235, 0.1)",
                border: "1px solid #2563eb",
                borderRadius: "8px",
                padding: "6px 12px",
                fontSize: "13px",
                fontWeight: 600,
                color: "#2563eb",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                transition: "all 0.2s",
              }}
              title="Switch Language / ቋንቋ ቀይር"
              onMouseEnter={(e) => e.target.style.background = "rgba(37, 99, 235, 0.15)"}
              onMouseLeave={(e) => e.target.style.background = "rgba(37, 99, 235, 0.1)"}
            >
              🌐 {language === "en" ? "En" : "አማ"}
            </button>

            {/* Request Quote CTA Button - Prominent */}
            <button
              type="button"
              onClick={handleRequestQuote}
              style={{
                background: "#2563eb",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "all 0.2s",
                boxShadow: "0 2px 8px rgba(37, 99, 235, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#1e40af";
                e.target.style.boxShadow = "0 4px 12px rgba(37, 99, 235, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#2563eb";
                e.target.style.boxShadow = "0 2px 8px rgba(37, 99, 235, 0.3)";
              }}
              title="Request a quote for equipment"
            >
              📋 {language === "en" ? "Request Quote" : "ጥቅስ ይጠይቁ"}
            </button>

            {/* User Authentication */}
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
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => e.target.style.background = "#dbeafe"}
                    onMouseLeave={(e) => e.target.style.background = "#eff6ff"}
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
                        position: "absolute", right: 0, top: "48px", width: "220px",
                        background: "#fff", borderRadius: "12px",
                        boxShadow: "0 8px 30px rgba(0,0,0,0.12)", border: "1px solid #f1f5f9",
                        overflow: "hidden", zIndex: 20,
                      }}>
                        <div style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9", background: "#f8fafc" }}>
                          <p style={{ fontWeight: 700, fontSize: "13px", color: "#0f172a", margin: 0 }}>{user.name}</p>
                          <p style={{ fontSize: "11px", color: "#94a3b8", margin: "2px 0 0", wordBreak: "break-all" }}>{user.email}</p>
                        </div>
                        {user.role !== "admin" && (
                          <Link to="/my-orders" onClick={() => setDropOpen(false)}
                            style={{ display: "block", padding: "11px 16px", fontSize: "13px", color: "#374151", textDecoration: "none", transition: "all 0.2s" }}
                            onMouseEnter={(e) => e.target.style.background = "#f8fafc"}
                            onMouseLeave={(e) => e.target.style.background = "transparent"}>
                            {t(language, "nav.myOrders")}
                          </Link>
                        )}
                        {user.role === "admin" && (
                          <Link to="/admin" onClick={() => setDropOpen(false)}
                            style={{ display: "block", padding: "11px 16px", fontSize: "13px", color: "#374151", textDecoration: "none", transition: "all 0.2s" }}
                            onMouseEnter={(e) => e.target.style.background = "#f8fafc"}
                            onMouseLeave={(e) => e.target.style.background = "transparent"}>
                            {t(language, "nav.dashboard")}
                          </Link>
                        )}
                        <Link to="/change-password" onClick={() => setDropOpen(false)}
                          style={{ display: "block", padding: "11px 16px", fontSize: "13px", color: "#374151", textDecoration: "none", borderTop: "1px solid #f1f5f9", transition: "all 0.2s" }}
                          onMouseEnter={(e) => e.target.style.background = "#f8fafc"}
                          onMouseLeave={(e) => e.target.style.background = "transparent"}>
                          {language === "en" ? "Change Password" : "ይለውጡ ይለውጡ"}
                        </Link>
                        <div style={{ borderTop: "1px solid #f1f5f9" }}>
                          <button type="button" onClick={handleLogout}
                            style={{ width: "100%", textAlign: "left", padding: "11px 16px", fontSize: "13px", color: "#ef4444", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}
                            onMouseEnter={(e) => e.target.style.background = "#fef2f2"}
                            onMouseLeave={(e) => e.target.style.background = "transparent"}>
                            {t(language, "nav.logout")}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div style={{ display: "flex", gap: "8px" }}>
                  <Link to="/login" className="btn btn-primary" style={{ padding: "10px 18px", fontSize: "13px", borderRadius: "8px" }}>
                    {t(language, "nav.login")}
                  </Link>
                  <Link to="/register" className="btn" style={{
                    padding: "10px 18px", fontSize: "13px", borderRadius: "8px",
                    background: "transparent", border: "1.5px solid #2563eb", color: "#2563eb",
                    fontWeight: 600, transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { e.target.style.background = "rgba(37, 99, 235, 0.05)"; }}
                  onMouseLeave={(e) => { e.target.style.background = "transparent"; }}>
                    {t(language, "nav.register")}
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu */}
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
            <div style={{ padding: "16px" }}>
              {/* Mobile Request Quote Button */}
              <button
                type="button"
                onClick={handleRequestQuote}
                style={{
                  width: "100%",
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => e.target.style.background = "#1e40af"}
                onMouseLeave={(e) => e.target.style.background = "#2563eb"}
              >
                📋 {language === "en" ? "Request Quote" : "ጥቅስ ይጠይቁ"}
              </button>

              {/* Mobile Navigation Links */}
              <div style={{ borderBottom: "1px solid #f1f5f9", paddingBottom: "12px", marginBottom: "12px" }}>
                {navLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.comingSoon ? "#" : l.to}
                    onClick={(e) => {
                      if (l.comingSoon) e.preventDefault();
                      if (l.to === "/" && location.pathname === "/") {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                      closeMobile();
                    }}
                    className={`nav-link${isActive(l.to) ? " active" : ""}`}
                    style={{ 
                      display: "block", 
                      marginBottom: "4px", 
                      padding: "10px 12px",
                      opacity: l.comingSoon ? 0.6 : 1,
                      cursor: l.comingSoon ? "not-allowed" : "pointer"
                    }}
                    title={l.comingSoon ? "Coming soon" : ""}
                  >
                    {l.label}
                    {l.comingSoon && <span style={{ fontSize: "10px", marginLeft: "4px", color: "#94a3b8" }}>Soon</span>}
                  </Link>
                ))}
              </div>

              {/* Mobile Auth Section */}
              <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "12px" }}>
                {token && user ? (
                  <>
                    <div style={{ padding: "12px 0 16px" }}>
                      <p style={{ color: "#0f172a", fontWeight: 700, fontSize: "14px", margin: 0 }}>{user.name}</p>
                      <p style={{ color: "#94a3b8", fontSize: "12px", margin: "4px 0 0", wordBreak: "break-all" }}>{user.email}</p>
                    </div>
                    {user.role !== "admin" && (
                      <Link to="/my-orders" onClick={closeMobile} className="nav-link" style={{ display: "block", marginBottom: "4px" }}>
                        {t(language, "nav.myOrders")}
                      </Link>
                    )}
                    {user.role === "admin" && (
                      <Link to="/admin" onClick={closeMobile} className="nav-link" style={{ display: "block", marginBottom: "4px" }}>
                        {t(language, "nav.dashboard")}
                      </Link>
                    )}
                    <Link to="/change-password" onClick={closeMobile} className="nav-link" style={{ display: "block", marginBottom: "8px" }}>
                      {language === "en" ? "Change Password" : "ይለውጡ ይለውጡ"}
                    </Link>
                    <button type="button" onClick={handleLogout}
                      style={{ width: "100%", textAlign: "left", padding: "10px 12px", fontSize: "14px", color: "#ef4444", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", borderRadius: "6px" }}>
                      {t(language, "nav.logout")}
                    </button>
                  </>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <Link to="/login" onClick={closeMobile} className="btn btn-primary" style={{ textAlign: "center", padding: "12px 16px", borderRadius: "8px" }}>
                      {t(language, "nav.login")}
                    </Link>
                    <Link to="/register" onClick={closeMobile} className="btn" style={{
                      textAlign: "center", padding: "12px 16px", borderRadius: "8px",
                      background: "transparent",
                      border: "1.5px solid #2563eb", color: "#2563eb", fontWeight: 600,
                    }}>
                      {t(language, "nav.register")}
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
              placeholder={language === "en" ? "Search medical equipment, brands..." : "ምርቶችን ያስሱ..."}
              style={{
                flex: 1, background: "#f8fafc", border: "1.5px solid #e2e8f0",
                color: "#0f172a", borderRadius: "8px", padding: "12px 16px",
                fontSize: "14px", outline: "none", fontFamily: "inherit", transition: "all 0.2s",
              }}
              onFocus={(e) => e.target.style.borderColor = "#2563eb"}
              onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: "12px 22px", borderRadius: "8px", fontWeight: 600 }}>
              {language === "en" ? "Search" : "ፈልግ"}
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
