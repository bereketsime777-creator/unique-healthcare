import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useCart } from "../context/CartContext";
import { categoryFilterUrl, getHomeCategoryBanners, normalizeCategory } from "../constants/categories";
import NewsletterSignup from "../components/NewsletterSignup";
import Testimonials from "../components/Testimonials";
import "../styles/home-enhancements.css";

const HERO_BG = "/images/hero1.png";
const categories = getHomeCategoryBanners();

const brands = ["Mindray", "Drager", "Philips", "Siemens Healthineers", "EDAN", "Getinge", "GE Healthcare", "Stryker"];

const stats = [
  { value: "200+", label: "Hospitals Served" },
  { value: "500+", label: "Products Available" },
  { value: "10+",  label: "Years Experience" },
  { value: "15+",  label: "Global Brands" },
];

const features = [
  { icon: "🏅", title: "100% Genuine Products",    desc: "Every product certified and sourced from globally recognized manufacturers." },
  { icon: "🚚", title: "Fast & Reliable Delivery", desc: "Nationwide delivery across Ethiopia with specialized safe packaging." },
  { icon: "🛠️", title: "Expert After-Sales Support", desc: "Installation, training, and ongoing technical support on every purchase." },
  { icon: "💰", title: "Competitive Pricing",       desc: "Best pricing with bulk discounts for hospitals and institutions." },
];

export default function Home() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts]   = useState([]);
  const [addedId, setAddedId]     = useState(null);

  useEffect(() => {
    API.get("/products").then((r) => setProducts(r.data.map((p) => ({
      ...p,
      category: normalizeCategory(p.category),
    })))).catch(() => {});
  }, []);

  const handleAdd = (product) => {
    addToCart(product);
    setAddedId(product._id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const featured = products.slice(0, 4);
  const latest   = products.length > 4 ? products.slice(4, 8) : products.slice(0, 4);

  return (
    <div>
      <style>{`
        @keyframes scroll-indicator {
          0% { opacity: 1; transform: translate(-50%, 0); }
          100% { opacity: 0; transform: translate(-50%, 20px); }
        }
      `}</style>

      {/* HERO - Modern Centered Design */}
      <section
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
        className="hero-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 text-center">
          <div className="hero-content" style={{ maxWidth: "900px", margin: "0 auto" }}>
            <p style={{ 
              color: "#fff", 
              fontWeight: 700, 
              fontSize: "14px", 
              letterSpacing: "4px", 
              textTransform: "uppercase", 
              marginBottom: "24px",
              opacity: 0.9
            }}>
              Trusted by 200+ Hospitals Across Ethiopia
            </p>

            <h1 style={{ 
              color: "#ffffff", 
              fontWeight: 900, 
              fontSize: "clamp(36px, 6vw, 72px)", 
              lineHeight: 1.1, 
              marginBottom: "24px",
              textShadow: "0 4px 20px rgba(0,0,0,0.3)"
            }}>
              Your Trusted Partner in<br />
              <span style={{
                color: "#1e40af",
                display: "inline-block",
                textShadow: "0 2px 4px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.5)"
              }}>Hospital Equipment</span>
            </h1>

            <p style={{ 
              color: "#ffffff", 
              fontSize: "clamp(16px, 2vw, 20px)", 
              lineHeight: 1.7, 
              marginBottom: "48px", 
              maxWidth: "700px",
              margin: "0 auto 48px",
              opacity: 0.95,
              textShadow: "0 2px 8px rgba(0,0,0,0.2)"
            }}>
              High-quality certified medical equipment delivered with reliability<br />and professional support across Ethiopia
            </p>

            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                to="/products"
                className="cta-button cta-button-primary"
                style={{
                  color: "#fff",
                  padding: "16px 40px",
                  borderRadius: "50px",
                  fontWeight: 700,
                  fontSize: "16px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                Explore Products
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link
                to="/contact"
                className="cta-button cta-button-secondary"
                style={{
                  color: "#fff",
                  padding: "16px 40px",
                  borderRadius: "50px",
                  fontWeight: 700,
                  fontSize: "16px",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          animation: "float 2s ease-in-out infinite"
        }}>
          <div style={{
            width: "30px",
            height: "50px",
            border: "2px solid rgba(255,255,255,0.5)",
            borderRadius: "25px",
            position: "relative"
          }}>
            <div style={{
              width: "6px",
              height: "10px",
              background: "rgba(255,255,255,0.8)",
              borderRadius: "3px",
              position: "absolute",
              top: "8px",
              left: "50%",
              transform: "translateX(-50%)",
              animation: "scroll-indicator 1.5s infinite"
            }}></div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ background: "#1d4ed8", padding: "20px 0" }}>
        <div className="page-wrap">
          <div className="stats-bar-grid">
            {stats.map((s, i) => (
              <div key={s.label} style={{
                textAlign: "center",
                padding: "8px 16px",
                borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.3)" : "none",
              }}>
                <p style={{ color: "#fff", fontWeight: 900, fontSize: "28px", margin: 0 }}>{s.value}</p>
                <p style={{ color: "#bfdbfe", fontSize: "12px", margin: "2px 0 0", fontWeight: 500 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY BANNERS */}
      <section className="section-pad" style={{ background: "#fff" }}>
        <div className="page-wrap">
          <p style={{ color: "#2563eb", fontWeight: 700, fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "6px" }}>Browse by Category</p>
          <div className="section-header">
            <h2 style={{ color: "#0f172a", fontWeight: 800, fontSize: "28px", margin: 0 }}>Shop by Equipment Type</h2>
            <Link to="/products" style={{ color: "#2563eb", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
              View all →
            </Link>
          </div>

          <div className="responsive-grid-4" style={{ gap: "16px" }}>
            {categories.map((cat) => (
              <div
                key={cat.label}
                onClick={() => navigate(categoryFilterUrl(cat.label))}
                className="category-card"
                style={{
                  height: "200px",
                  borderRadius: "16px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={cat.bg}
                  alt={cat.label}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  onError={(e) => { e.target.parentElement.style.background = "#1e40af"; e.target.style.display = "none"; }}
                />
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "55%",
                  background: "linear-gradient(to top, rgba(0,0,0,0.65), transparent)",
                }} />
                <div className="category-card-content" style={{ position: "absolute", bottom: "16px", left: "16px" }}>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: "15px", margin: "0 0 8px" }}>{cat.label}</p>
                  <span style={{
                    background: "#2563eb",
                    color: "#fff",
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "5px 14px",
                    borderRadius: "50px",
                  }}>
                    Shop now
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section-pad" style={{ background: "#f8fafc" }}>
        <div className="page-wrap">
          <div className="section-header" style={{ marginBottom: "32px" }}>
            <div>
              <p style={{ color: "#2563eb", fontWeight: 700, fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "4px" }}>Top Picks</p>
              <h2 style={{ color: "#0f172a", fontWeight: 800, fontSize: "28px", margin: 0 }}>Featured Products</h2>
            </div>
            <Link to="/products" style={{ color: "#2563eb", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
              View all →
            </Link>
          </div>

          {featured.length === 0 ? (
            <div className="responsive-grid-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{ background: "#e2e8f0", borderRadius: "16px", height: "320px" }} />
              ))}
            </div>
          ) : (
            <div className="responsive-grid-4">
              {featured.map((p) => (
                <ProductCard key={p._id} product={p} onAdd={handleAdd} isAdded={addedId === p._id} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section-pad" style={{ background: "#fff" }}>
        <div className="page-wrap">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ color: "#2563eb", fontWeight: 700, fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "8px" }}>Why Us</p>
            <h2 style={{ color: "#0f172a", fontWeight: 800, fontSize: "28px", margin: "0 0 10px" }}>Why Choose Unique Healthcare?</h2>
            <p style={{ color: "#64748b", fontSize: "15px", maxWidth: "480px", margin: "0 auto" }}>
              We go beyond just supply - we are your long-term healthcare equipment partner.
            </p>
          </div>
          <div className="responsive-grid-4" style={{ gap: "24px" }}>
            {features.map((f) => (
              <div key={f.title} className="feature-card" style={{
                background: "#fff",
                border: "1.5px solid #e2e8f0",
                borderRadius: "20px",
                padding: "28px 24px",
                textAlign: "center",
              }}>
                <div className="feature-icon" style={{
                  width: "56px",
                  height: "56px",
                  background: "#eff6ff",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  margin: "0 auto 16px",
                }}>
                  {f.icon}
                </div>
                <h3 style={{ color: "#0f172a", fontWeight: 700, fontSize: "16px", margin: "0 0 10px" }}>{f.title}</h3>
                <p style={{ color: "#64748b", fontSize: "13px", lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST PRODUCTS */}
      {products.length > 0 && (
        <section className="section-pad" style={{ background: "#f8fafc" }}>
          <div className="page-wrap">
            <div className="section-header" style={{ marginBottom: "32px" }}>
              <div>
                <p style={{ color: "#2563eb", fontWeight: 700, fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "4px" }}>Just Added</p>
                <h2 style={{ color: "#0f172a", fontWeight: 800, fontSize: "28px", margin: 0 }}>Latest Products</h2>
              </div>
              <Link to="/products" style={{ color: "#2563eb", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
                View all →
              </Link>
            </div>
            <div className="responsive-grid-4">
              {latest.map((p) => (
                <ProductCard key={p._id} product={p} onAdd={handleAdd} isAdded={addedId === p._id} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BRANDS */}
      <section style={{ background: "#fff", borderTop: "1px solid #f1f5f9", padding: "56px 0" }}>
        <div className="page-wrap">
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <p style={{ color: "#2563eb", fontWeight: 700, fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "8px" }}>Partners</p>
            <h2 style={{ color: "#0f172a", fontWeight: 800, fontSize: "28px", margin: "0 0 8px" }}>
              Discover Our Brands
            </h2>
            <p style={{ color: "#64748b", fontSize: "14px" }}>
              Official distributor of top global medical equipment manufacturers
            </p>
          </div>
          <div className="responsive-grid-8">
            {brands.map((b) => (
              <div key={b} className="brand-badge" style={{
                background: "#f8fafc",
                border: "1.5px solid #e2e8f0",
                borderRadius: "12px",
                padding: "14px 8px",
                textAlign: "center",
              }}>
                <span style={{ color: "#475569", fontWeight: 700, fontSize: "12px" }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section
        className="cta-banner"
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
          padding: "64px 0",
        }}
      >
        <div className="page-wrap" style={{ textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(26px, 5vw, 38px)", marginBottom: "12px" }}>
            Ready to Equip Your Facility?
          </h2>
          <p style={{ color: "#fff", fontSize: "16px", marginBottom: "32px", opacity: 0.9 }}>
            Browse 500+ certified medical products or contact us for a custom quote.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/products" className="cta-button" style={{
              background: "#2563eb",
              color: "#fff",
              padding: "14px 36px",
              borderRadius: "50px",
              fontWeight: 700,
              fontSize: "14px",
              textDecoration: "none",
            }}>
              Shop Now
            </Link>
            <Link to="/contact" className="cta-button" style={{
              background: "rgba(255,255,255,0.15)",
              border: "2px solid rgba(255,255,255,0.7)",
              color: "#fff",
              padding: "14px 36px",
              borderRadius: "50px",
              fontWeight: 700,
              fontSize: "14px",
              textDecoration: "none",
            }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials limit={3} title="Trusted by Healthcare Professionals Across Ethiopia" />

      {/* NEWSLETTER */}
      <section className="section-pad" style={{ background: "#fff" }}>
        <div className="page-wrap" style={{ maxWidth: "560px", textAlign: "center", margin: "0 auto" }}>
          <NewsletterSignup variant="home" />
        </div>
      </section>

    </div>
  );
}

/* PRODUCT CARD */
function ProductCard({ product, onAdd, isAdded }) {
  const [imgErr, setImgErr] = useState(false);
  const hasImage = product.image && product.image.startsWith("http") && !imgErr;

  return (
    <div className="product-card" style={{
      background: "#fff",
      borderRadius: "16px",
      overflow: "hidden",
      border: "1.5px solid #f1f5f9",
    }}>
      {/* Image */}
      <Link to={`/products/${product._id}`} className="product-image-wrapper" style={{ display: "block", height: "220px", overflow: "hidden", background: "#f8fafc" }}>
        {hasImage ? (
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            onError={() => setImgErr(true)}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#eff6ff,#e0f2fe)" }}>
            <span style={{ fontSize: "48px" }}>🏥</span>
            <span style={{ color: "#93c5fd", fontSize: "11px", fontWeight: 600, marginTop: "8px" }}>Medical Equipment</span>
          </div>
        )}
      </Link>

      {/* Info */}
      <div style={{ padding: "16px" }}>
        <span style={{
          background: "#eff6ff",
          color: "#2563eb",
          fontSize: "11px",
          fontWeight: 700,
          padding: "3px 10px",
          borderRadius: "50px",
          display: "inline-block",
          marginBottom: "10px",
        }}>
          {product.category}
        </span>

        <Link to={`/products/${product._id}`} style={{ textDecoration: "none" }}>
          <h3 style={{
            color: "#0f172a",
            fontWeight: 700,
            fontSize: "14px",
            lineHeight: 1.4,
            margin: "0 0 6px",
            minHeight: "40px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
            {product.name}
          </h3>
        </Link>

        {product.manufacturer && (
          <p style={{ color: "#94a3b8", fontSize: "12px", margin: "0 0 12px" }}>{product.manufacturer}</p>
        )}

        {product.priceType === 'quote' ? (
          <div style={{ marginBottom: "14px" }}>
            <p style={{ color: "#2563eb", fontWeight: 700, fontSize: "14px", margin: 0 }}>
              Price on Request
            </p>
          </div>
        ) : (
          <p style={{ color: "#2563eb", fontWeight: 800, fontSize: "18px", margin: "0 0 14px" }}>
            ETB {product.price?.toLocaleString()}
          </p>
        )}

        {product.priceType === 'quote' ? (
          <Link
            to="/contact"
            style={{
              display: "block",
              width: "100%",
              padding: "11px",
              borderRadius: "50px",
              border: "none",
              fontWeight: 700,
              fontSize: "13px",
              textAlign: "center",
              textDecoration: "none",
              background: "#2563eb",
              color: "#ffffff",
              transition: "background 0.2s",
            }}
          >
            Request a Quote
          </Link>
        ) : (
          <button
            onClick={() => onAdd(product)}
            disabled={product.stock === 0}
            style={{
              width: "100%",
              padding: "11px",
              borderRadius: "50px",
              border: "none",
              fontWeight: 700,
              fontSize: "13px",
              cursor: product.stock === 0 ? "not-allowed" : "pointer",
              background: isAdded ? "#22c55e" : product.stock === 0 ? "#e2e8f0" : "#2563eb",
              color: product.stock === 0 ? "#94a3b8" : "#fff",
              transition: "background 0.2s",
            }}
          >
            {isAdded ? "✓  Added to Cart" : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        )}
      </div>
    </div>
  );
}
