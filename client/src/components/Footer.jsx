import { useState } from "react";
import { Link } from "react-router-dom";
import { getFooterShopLinks } from "../constants/categories";
import { CONTACT } from "../constants/contact";

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
  { label: "Telegram", icon: "✈", href: CONTACT.telegram.url },
];

export default function Footer() {
  const [email, setEmail]         = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const lnk = { color: "#93c5fd", fontSize: "13px", textDecoration: "none", lineHeight: "2" };

  return (
    <footer style={{ background: "linear-gradient(180deg, #1e3a8a 0%, #1e40af 100%)" }}>

      {/* ── Newsletter strip ── */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "28px 0" }}>
        <div className="page-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
          <div>
            <p style={{ color: "#fff", fontWeight: 700, fontSize: "16px", margin: "0 0 2px" }}>
              📬 Subscribe for exclusive updates
            </p>
            <p style={{ color: "#93c5fd", fontSize: "13px", margin: 0 }}>
              New arrivals, special offers, and healthcare news.
            </p>
          </div>
          {subscribed ? (
            <span style={{ color: "#4ade80", fontWeight: 700, fontSize: "14px" }}>✓ You&apos;re subscribed!</span>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (email.trim()) setSubscribed(true); }}
              className="footer-newsletter-form">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{ background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.25)", color: "#fff", borderRadius: "50px", padding: "10px 20px", fontSize: "13px", outline: "none", fontFamily: "inherit", width: "220px" }} />
              <button type="submit"
                style={{ background: "#fff", color: "#1d4ed8", border: "none", borderRadius: "50px", padding: "10px 22px", fontWeight: 700, fontSize: "13px", cursor: "pointer", fontFamily: "inherit" }}>
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ── Main footer columns ── */}
      <div className="page-wrap" style={{ paddingTop: "56px", paddingBottom: "40px" }}>
        <div className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ background: "#fff", borderRadius: "10px", padding: "6px 10px", display: "inline-block", marginBottom: "16px" }}>
              <img src="/logo.png" alt="Unique Healthcare" style={{ height: "32px", width: "auto", display: "block" }} />
            </div>
            <p style={{ color: "#93c5fd", fontSize: "13px", lineHeight: 1.75, margin: "0 0 20px", maxWidth: "240px" }}>
              Ethiopia&apos;s trusted partner for premium medical equipment and healthcare supplies since 2014.
            </p>
            {/* Socials */}
            <div style={{ display: "flex", gap: "10px" }}>
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  style={{ width: "36px", height: "36px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "13px", fontWeight: 700, textDecoration: "none" }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, fontSize: "14px", margin: "0 0 16px", textTransform: "uppercase", letterSpacing: "1px" }}>Shop</h4>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {shop.map((l) => <Link key={l.label} to={l.to} style={lnk}>{l.label}</Link>)}
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, fontSize: "14px", margin: "0 0 16px", textTransform: "uppercase", letterSpacing: "1px" }}>Pages</h4>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {pages.map((l) => <Link key={l.label} to={l.to} style={lnk}>{l.label}</Link>)}
            </div>
          </div>

          {/* Account */}
          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, fontSize: "14px", margin: "0 0 16px", textTransform: "uppercase", letterSpacing: "1px" }}>Account</h4>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {account.map((l) => <Link key={l.label} to={l.to} style={lnk}>{l.label}</Link>)}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, fontSize: "14px", margin: "0 0 16px", textTransform: "uppercase", letterSpacing: "1px" }}>Contact Us</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { icon: "📍", text: CONTACT.address.short },
                ...CONTACT.phones.map((p) => ({
                  icon: "📞",
                  text: p.display,
                  href: `tel:${p.tel}`,
                })),
                { icon: "✉️", text: CONTACT.email, href: `mailto:${CONTACT.email}` },
                { icon: "🕐", text: CONTACT.hours.short },
              ].map((c) => (
                <div key={c.text} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "14px", flexShrink: 0 }}>{c.icon}</span>
                  {c.href ? (
                    <a href={c.href} style={{ color: "#93c5fd", fontSize: "13px", lineHeight: 1.5, textDecoration: "none" }}>
                      {c.text}
                    </a>
                  ) : (
                    <span style={{ color: "#93c5fd", fontSize: "13px", lineHeight: 1.5 }}>{c.text}</span>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link to="/contact"
              style={{ display: "inline-block", marginTop: "20px", background: "#fff", color: "#1d4ed8", padding: "10px 22px", borderRadius: "50px", fontWeight: 700, fontSize: "13px", textDecoration: "none" }}>
              Get a Quote →
            </Link>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "16px 0" }}>
        <div className="page-wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px", paddingTop: "16px", paddingBottom: "16px" }}>
          <p style={{ color: "#6b9fd4", fontSize: "12px", margin: 0 }}>
            © 2026 Unique Healthcare. All Rights Reserved.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map((t) => (
              <span key={t} style={{ color: "#6b9fd4", fontSize: "12px", cursor: "pointer" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
