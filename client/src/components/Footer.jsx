import { Link } from "react-router-dom";
import { FiMapPin, FiPhone, FiMail, FiClock, FiArrowRight } from "react-icons/fi";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { t } from "../translations/translations";
import { getFooterShopLinks } from "../constants/categories";
import { CONTACT } from "../constants/contact";
import NewsletterSignup from "./NewsletterSignup";

const shop = getFooterShopLinks();

const pages = [
  { key: "nav.home", to: "/" },
  { key: "nav.products", to: "/products" },
  { key: "nav.services", to: "/services" },
  { key: "nav.about", to: "/about" },
  { key: "nav.contact", to: "/contact" },
];

const account = [
  { key: "nav.cart", to: "/cart" },
  { key: "nav.myOrders", to: "/my-orders" },
  { key: "nav.register", to: "/register" },
  { key: "nav.login", to: "/login" },
];

const socials = [
  { label: "Telegram", icon: FaTelegramPlane, href: CONTACT.telegram.url },
  { label: "WhatsApp", icon: FaWhatsapp, href: `https://wa.me/${CONTACT.phones[0].tel.replace(/\+/g, '')}` },
];

const legal = [
  { key: "footer.privacy", to: "/privacy" },
  { key: "footer.terms", to: "/terms" },
  { key: "footer.refund", to: "/refund" },
];

export default function Footer() {
  const { language } = useLanguage();
  const lnk = { color: "#dbeafe", fontSize: "13px", textDecoration: "none", lineHeight: "2", transition: "color 0.15s" };

  return (
    <footer style={{ background: "linear-gradient(180deg, #0f172a 0%, #1e3a8a 100%)" }}>

      {/* Newsletter strip */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "20px 0" }}>
        <div className="page-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" }}>
          <div>
            <p style={{ color: "#fff", fontWeight: 700, fontSize: "18px", margin: "0 0 2px" }}>
              {t(language, "footer.newsletter")}
            </p>
            <p style={{ color: "#dbeafe", fontSize: "14px", margin: 0 }}>
              {t(language, "footer.newsletterDesc")}
            </p>
          </div>
          <NewsletterSignup variant="footer" />
        </div>
      </div>

      {/* Main footer */}
      <div className="page-wrap" style={{ paddingTop: "36px", paddingBottom: "28px" }}>
        <div className="footer-grid">

          <div>
            <img src="/logo.png" alt="Unique Healthcare" style={{ 
              height: "48px", 
              width: "auto", 
              display: "block", 
              marginBottom: "14px", 
              filter: "brightness(1.2)", 
              borderRadius: "8px",
              padding: "8px",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.15)"
            }} />
            <p style={{ color: "#dbeafe", fontSize: "13px", lineHeight: 1.7, margin: "0 0 16px", maxWidth: "260px" }}>
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
            <h4 style={{ color: "#fff", fontWeight: 700, fontSize: "14px", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "1.5px" }}>{t(language, "footer.shop")}</h4>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {shop.map((l) => <Link key={l.label} to={l.to} style={lnk}>{l.label}</Link>)}
            </div>
          </div>

          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, fontSize: "14px", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "1.5px" }}>{t(language, "footer.pages")}</h4>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {pages.map((l) => <Link key={l.key} to={l.to} style={lnk}>{t(language, l.key)}</Link>)}
            </div>
          </div>

          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, fontSize: "14px", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "1.5px" }}>{t(language, "footer.account")}</h4>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {account.map((l) => <Link key={l.key} to={l.to} style={lnk}>{t(language, l.key)}</Link>)}
            </div>
          </div>

          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, fontSize: "14px", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "1.5px" }}>Contact Us</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                <FiMapPin size={14} style={{ color: "#60a5fa", flexShrink: 0, marginTop: "2px" }} />
                <span style={{ color: "#dbeafe", fontSize: "13px", lineHeight: 1.5 }}>{CONTACT.address.short}</span>
              </div>
              {CONTACT.phones.map((p) => (
                <div key={p.tel} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <FiPhone size={14} style={{ color: "#60a5fa", flexShrink: 0 }} />
                  <a href={`tel:${p.tel}`} style={{ color: "#dbeafe", fontSize: "13px", textDecoration: "none" }}>{p.display}</a>
                </div>
              ))}
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <FiMail size={14} style={{ color: "#60a5fa", flexShrink: 0 }} />
                <a href={`mailto:${CONTACT.email}`} style={{ color: "#dbeafe", fontSize: "13px", textDecoration: "none" }}>{CONTACT.email}</a>
              </div>
              <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                <FiClock size={14} style={{ color: "#60a5fa", flexShrink: 0, marginTop: "2px" }} />
                <span style={{ color: "#dbeafe", fontSize: "13px", lineHeight: 1.5 }}>{CONTACT.hours.short}</span>
              </div>
            </div>

            <Link to="/contact" className="btn btn-white" style={{ marginTop: "16px", padding: "8px 18px", fontSize: "13px" }}>
              {t(language, "footer.getQuote")} <FiArrowRight size={13} />
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "14px 0" }}>
        <div className="page-wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
          <p style={{ color: "#ffffff", fontSize: "12px", margin: 0 }}>
            © 2026 Unique Healthcare. {t(language, "footer.allRights")}
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {legal.map((item) => (
              <Link key={item.to} to={item.to} style={{ color: "#ffffff", fontSize: "12px", textDecoration: "none" }}>
                {t(language, item.key)}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
