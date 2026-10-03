import { Link } from "react-router-dom";
import { FiMapPin, FiPhone, FiMail, FiClock, FiArrowRight } from "react-icons/fi";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { t } from "../translations/translations";
import { getFooterShopLinks, HOME_FEATURED_CATEGORIES, categoryFilterUrl } from "../constants/categories";
import { CONTACT } from "../constants/contact";
import NewsletterSignup from "./NewsletterSignup";

const pages = [
  { key: "nav.home", to: "/" },
  { key: "nav.products", to: "/products" },
  { key: "nav.services", to: "/services" },
  { key: "nav.about", to: "/about" },
  { key: "nav.contact", to: "/contact" },
];

const company = [
  { key: "About Us", to: "/about" },
  { key: "Services", to: "/services" },
  { key: "Brands", to: "/products" },
  { key: "Contact Us", to: "/contact" },
  { key: "Request Quote", to: "/contact?subject=Request a Quote" },
];

const resources = [
  { key: "Product Catalog", to: "/products" },
  { key: "Technical Documents", to: "/products" },
  { key: "Compliance Info", to: "/about" },
  { key: "User Manuals", to: "/products" },
  { key: "FAQs", to: "/contact" },
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
  
  const footerSectionTitleStyle = {
    color: "#fff",
    fontWeight: 700,
    fontSize: "13px",
    margin: "0 0 16px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const footerLinkStyle = {
    color: "#cbd5e1",
    fontSize: "14px",
    textDecoration: "none",
    lineHeight: "1.8",
    transition: "color 0.3s ease, transform 0.2s ease",
    display: "inline-block",
    cursor: "pointer",
  };

  const footerLinkHoverStyle = {
    color: "#60a5fa",
    transform: "translateX(4px)",
  };

  return (
    <footer style={{
      background: "linear-gradient(180deg, #0f172a 0%, #1e3a8a 100%)",
      color: "#cbd5e1",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    }}>
      {/* Newsletter Strip */}
      <div style={{
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(30, 58, 138, 0.5)",
        padding: "32px 0",
        backdropFilter: "blur(10px)",
      }}>
        <div className="page-wrap" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          flexWrap: "wrap",
        }}>
          <div>
            <p style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: "18px",
              margin: "0 0 6px",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}>
              {t(language, "footer.newsletter")}
            </p>
            <p style={{
              color: "#cbd5e1",
              fontSize: "14px",
              margin: 0,
              fontWeight: 400,
            }}>
              {t(language, "footer.newsletterDesc")}
            </p>
          </div>
          <NewsletterSignup variant="footer" />
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="page-wrap" style={{
        paddingTop: "48px",
        paddingBottom: "32px",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "40px",
          "@media (max-width: 768px)": {
            gridTemplateColumns: "1fr",
            gap: "32px",
          }
        }}>
          {/* Column 1: Logo & Company Description */}
          <div style={{ gridColumn: "span 1" }}>
            <div style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "16px",
            }}>
              <img
                src="/logo.png"
                alt="Unique Healthcare"
                style={{
                  height: "52px",
                  width: "auto",
                  display: "block",
                  marginBottom: "16px",
                  filter: "brightness(1.1)",
                  borderRadius: "8px",
                }}
              />
            </div>
            <p style={{
              color: "#cbd5e1",
              fontSize: "14px",
              lineHeight: 1.7,
              margin: "0 0 16px",
              fontWeight: 400,
            }}>
              <strong style={{ color: "#60a5fa" }}>Unique Healthcare PLC</strong> – Leading medical equipment supplier in Ethiopia since 2014. We provide certified, professional-grade healthcare solutions for hospitals, clinics, and institutions.
            </p>
            <div style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}>
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "rgba(96, 165, 250, 0.1)",
                      border: "1px solid rgba(96, 165, 250, 0.3)",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#60a5fa",
                      fontSize: "16px",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(96, 165, 250, 0.2)";
                      e.currentTarget.style.borderColor = "rgba(96, 165, 250, 0.5)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(96, 165, 250, 0.1)";
                      e.currentTarget.style.borderColor = "rgba(96, 165, 250, 0.3)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Products */}
          <div>
            <h4 style={footerSectionTitleStyle}>PRODUCTS</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {HOME_FEATURED_CATEGORIES.map((cat) => (
                <Link
                  key={cat}
                  to={categoryFilterUrl(cat)}
                  style={footerLinkStyle}
                  onMouseEnter={(e) => {
                    Object.assign(e.currentTarget.style, footerLinkHoverStyle);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#cbd5e1";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  {cat}
                </Link>
              ))}
              <Link
                to="/products"
                style={{
                  ...footerLinkStyle,
                  marginTop: "12px",
                  color: "#60a5fa",
                  fontWeight: 600,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#93c5fd";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#60a5fa";
                }}
              >
                ➜ View All Products
              </Link>
            </div>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 style={footerSectionTitleStyle}>COMPANY</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {company.map((item) => (
                <Link
                  key={item.key}
                  to={item.to}
                  style={footerLinkStyle}
                  onMouseEnter={(e) => {
                    Object.assign(e.currentTarget.style, footerLinkHoverStyle);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#cbd5e1";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  {item.key}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h4 style={footerSectionTitleStyle}>RESOURCES</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {resources.map((item) => (
                <Link
                  key={item.key}
                  to={item.to}
                  style={footerLinkStyle}
                  onMouseEnter={(e) => {
                    Object.assign(e.currentTarget.style, footerLinkHoverStyle);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#cbd5e1";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  {item.key}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 5: Contact Info */}
          <div>
            <h4 style={footerSectionTitleStyle}>CONTACT INFO</h4>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}>
              {/* Address */}
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <FiMapPin
                  size={16}
                  style={{
                    color: "#60a5fa",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                />
                <span style={{
                  color: "#cbd5e1",
                  fontSize: "14px",
                  lineHeight: 1.6,
                }}>
                  {CONTACT.address.lines.map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </span>
              </div>

              {/* Phone */}
              {CONTACT.phones.map((p) => (
                <div
                  key={p.tel}
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <FiPhone
                    size={16}
                    style={{
                      color: "#60a5fa",
                      flexShrink: 0,
                    }}
                  />
                  <a
                    href={`tel:${p.tel}`}
                    style={{
                      color: "#cbd5e1",
                      fontSize: "14px",
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#60a5fa";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#cbd5e1";
                    }}
                  >
                    {p.display}
                  </a>
                </div>
              ))}

              {/* Email */}
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <FiMail
                  size={16}
                  style={{
                    color: "#60a5fa",
                    flexShrink: 0,
                  }}
                />
                <a
                  href={`mailto:${CONTACT.email}`}
                  style={{
                    color: "#cbd5e1",
                    fontSize: "14px",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#60a5fa";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#cbd5e1";
                  }}
                >
                  {CONTACT.email}
                </a>
              </div>

              {/* Hours */}
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <FiClock
                  size={16}
                  style={{
                    color: "#60a5fa",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                />
                <span style={{
                  color: "#cbd5e1",
                  fontSize: "14px",
                  lineHeight: 1.6,
                }}>
                  {CONTACT.hours.lines.map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </span>
              </div>
            </div>

            {/* Request Quote Button */}
            <Link
              to="/contact?subject=Request a Quote"
              style={{
                marginTop: "16px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                color: "#fff",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.3s ease",
                border: "1px solid rgba(96, 165, 250, 0.3)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, #1d4ed8, #1e40af)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(37, 99, 235, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, #2563eb, #1d4ed8)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Get Quote <FiArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(15, 23, 42, 0.8)",
        padding: "20px 0",
        marginTop: "32px",
      }}>
        <div className="page-wrap" style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          "@media (max-width: 768px)": {
            flexDirection: "column",
            textAlign: "center",
          }
        }}>
          <p style={{
            color: "#94a3b8",
            fontSize: "13px",
            margin: 0,
            fontWeight: 400,
          }}>
            © 2024-2026 Unique Healthcare PLC. All rights reserved. | Professional Medical Equipment Supplier
          </p>
          <div style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}>
            {legal.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                style={{
                  color: "#94a3b8",
                  fontSize: "13px",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#60a5fa";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#94a3b8";
                }}
              >
                {t(language, item.key)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
