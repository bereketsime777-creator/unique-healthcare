import { Link } from "react-router-dom";
import { FiMapPin, FiPhone, FiMail, FiClock, FiArrowRight } from "react-icons/fi";
import { FaTelegramPlane } from "react-icons/fa";
import { getFooterShopLinks } from "../constants/categories";
import { CONTACT } from "../constants/contact";
import NewsletterSignup from "./NewsletterSignup";

const shop = getFooterShopLinks();

const pages = [
  { label: "Home",       to: "/" },
  { label: "Products",   to: "/products" },
  { label: "Services",   to: "/services" },
  { label: "About Us",   to: "/about" },
  { label: "Contact Us", to: "/contact" },
];

const account = [
  { label: "My Cart",    to: "/cart" },
  { label: "My Orders",  to: "/my-orders" },
  { label: "Register",   to: "/register" },
  { label: "Login",      to: "/login" },
];

const socials = [
  { label: "Telegram", icon: FaTelegramPlane, href: CONTACT.telegram.url },
];

const legal = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Service", to: "/terms" },
  { label: "Refund Policy", to: "/refund" },
];

export default function Footer() {
  const lnk = { color: "#93c5fd", fontSize: "13px", textDecoration: "none", lineHeight: "2.2", transition: "color 0.15s" };

  return (
    <footer style={{ background: "linear-gradient(180deg, #0f172a 0%, #1e3a8a 100%)" }}>

      {/* Newsletter strip */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "32px 0" }}>
        <div className="page-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
          <div>
            <p style={{ color: "#fff", fontWeight: 700, fontSize: "16px", margin: "0 0 4px" }}>
              Subscribe for exclusive updates
            </p>
            <p style={{ color: "#93c5fd", fontSize: "13px", margin: 0 }}>
              New arrivals, special offers, and healthcare news.
            </p>
          </div>
          <NewsletterSignup variant="footer" />
        </div>
      </div>

      {/* Main footer */}
      <div className="page-wrap" style={{ paddingTop: "56px", paddingBottom: "40px" }}>
        <div className="footer-grid">

          <div>
            <img src="/logo.png" alt="Unique Healthcare" style={{ height: "36px", width: "auto", display: "block", marginBottom: "16px", filter: "brightness(0) invert(1)" }} />
            <p style={{ color: "#93c5fd", fontSize: "13px", lineHeight: 1.75, margin: "0 0 20px", maxWidth: "260px" }}>
              Ethiopia&apos;s trusted partner for premium medical equipment and healthcare supplies since 2014.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                    style={{
                      width: "38px", height: "38px", background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)", borderRadius: "10px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontSize: "16px", textDecoration: "none",
                      transition: "background 0.15s, border-color 0.15s",
                    }}>
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, fontSize: "13px", margin: "0 0 16px", textTransform: "uppercase", letterSpacing: "1.5px" }}>Shop</h4>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {shop.map((l) => <Link key={l.label} to={l.to} style={lnk}>{l.label}</Link>)}
            </div>
          </div>

          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, fontSize: "13px", margin: "0 0 16px", textTransform: "uppercase", letterSpacing: "1.5px" }}>Pages</h4>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {pages.map((l) => <Link key={l.label} to={l.to} style={lnk}>{l.label}</Link>)}
            </div>
          </div>

          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, fontSize: "13px", margin: "0 0 16px", textTransform: "uppercase", letterSpacing: "1.5px" }}>Account</h4>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {account.map((l) => <Link key={l.label} to={l.to} style={lnk}>{l.label}</Link>)}
            </div>
          </div>

          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, fontSize: "13px", margin: "0 0 16px", textTransform: "uppercase", letterSpacing: "1.5px" }}>Contact Us</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <FiMapPin size={15} style={{ color: "#60a5fa", flexShrink: 0, marginTop: "2px" }} />
                <span style={{ color: "#93c5fd", fontSize: "13px", lineHeight: 1.5 }}>{CONTACT.address.short}</span>
              </div>
              {CONTACT.phones.map((p) => (
                <div key={p.tel} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <FiPhone size={15} style={{ color: "#60a5fa", flexShrink: 0 }} />
                  <a href={`tel:${p.tel}`} style={{ color: "#93c5fd", fontSize: "13px", textDecoration: "none" }}>{p.display}</a>
                </div>
              ))}
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <FiMail size={15} style={{ color: "#60a5fa", flexShrink: 0 }} />
                <a href={`mailto:${CONTACT.email}`} style={{ color: "#93c5fd", fontSize: "13px", textDecoration: "none" }}>{CONTACT.email}</a>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <FiClock size={15} style={{ color: "#60a5fa", flexShrink: 0, marginTop: "2px" }} />
                <span style={{ color: "#93c5fd", fontSize: "13px", lineHeight: 1.5 }}>{CONTACT.hours.short}</span>
              </div>
            </div>

            <Link to="/contact" className="btn btn-white" style={{ marginTop: "20px", padding: "10px 22px", fontSize: "13px" }}>
              Get a Quote <FiArrowRight size={14} />
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "16px 0" }}>
        <div className="page-wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
          <p style={{ color: "#64748b", fontSize: "12px", margin: 0 }}>
            © 2026 Unique Healthcare. All Rights Reserved.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {legal.map((t) => (
              <Link key={t.to} to={t.to} style={{ color: "#64748b", fontSize: "12px", textDecoration: "none" }}>
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
