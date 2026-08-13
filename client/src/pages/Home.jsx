import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useCart } from "../context/CartContext";

const HERO_BG = "/images/hero1.jpg";

const categories = [
  { label: "Diagnostic Equipment",  bg: "/images/category-diagnostic.jpg" },
  { label: "Surgical Instruments",  bg: "/images/category-surgical.jpg" },
  { label: "Monitoring Devices",    bg: "/images/category-monitoring.jpg" },
  { label: "Laboratory Equipment",  bg: "/images/category-lab.jpg" },
];

const brands = ["Mindray", "Dräger", "Philips", "Siemens Healthineers", "EDAN", "Getinge", "GE Healthcare", "Stryker"];

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
  const [email, setEmail]         = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    API.get("/products").then((r) => setProducts(r.data)).catch(console.log);
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

      {/* ─────────────────────────────────────
          HERO — pure background image, white text
      ───────────────────────────────────── */}
      <section
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="flex items-center hero-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 w-full">
          <div className="max-w-lg">
            <p style={{ color: "#fff", fontWeight: 700, fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px" }}>
              Trusted by 200+ Hospitals
            </p>

            <h1 className="hero-title" style={{ color: "#ffffff", fontWeight: 900, lineHeight: 1.15, marginBottom: "20px" }}>
              Your Trusted Partner in<br />
              <span style={{ color: "#ffffff" }}>Hospital Equipment</span>
            </h1>

            <p style={{ color: "#ffffff", fontSize: "17px", lineHeight: 1.7, marginBottom: "36px", maxWidth: "440px" }}>
              High-quality certified medical equipment delivered with reliability and professional support across Ethiopia.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link
                to="/products"
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  padding: "14px 32px",
                  borderRadius: "50px",
                  fontWeight: 700,
                  fontSize: "14px",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Shop Products →
              </Link>
              <Link
                to="/contact"
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "2px solid rgba(255,255,255,0.7)",
                  color: "#fff",
                  padding: "14px 32px",
                  borderRadius: "50px",
                  fontWeight: 700,
                  fontSize: "14px",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────
          STATS BAR
      ───────────────────────────────────── */}
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

      {/* ─────────────────────────────────────
          CATEGORY BANNERS
      ───────────────────────────────────── */}
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
                onClick={() => navigate(`/products?category=${encodeURIComponent(cat.label)}`)}
                style={{
                  position: "relative",
                  height: "200px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                <img
                  src={cat.bg}
                  alt={cat.label}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  onError={(e) => { e.target.parentElement.style.background = "#1e40af"; e.target.style.display = "none"; }}
                />
                {/* Only a bottom fade so image is visible */}
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "55%",
                  background: "linear-gradient(to top, rgba(0,0,0,0.65), transparent)",
                }} />
                <div style={{ position: "absolute", bottom: "16px", left: "16px" }}>
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

      {/* ─────────────────────────────────────
          FEATURED PRODUCTS
      ───────────────────────────────────── */}
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

      {/* ─────────────────────────────────────
          WHY CHOOSE US
      ───────────────────────────────────── */}
      <section className="section-pad" style={{ background: "#fff" }}>
        <div className="page-wrap">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ color: "#2563eb", fontWeight: 700, fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "8px" }}>Why Us</p>
            <h2 style={{ color: "#0f172a", fontWeight: 800, fontSize: "28px", margin: "0 0 10px" }}>Why Choose Unique Healthcare?</h2>
            <p style={{ color: "#64748b", fontSize: "15px", maxWidth: "480px", margin: "0 auto" }}>
              We go beyond just supply — we are your long-term healthcare equipment partner.
            </p>
          </div>
          <div className="responsive-grid-4" style={{ gap: "24px" }}>
            {features.map((f) => (
              <div key={f.title} style={{
                background: "#fff",
                border: "1.5px solid #e2e8f0",
                borderRadius: "20px",
                padding: "28px 24px",
                textAlign: "center",
              }}>
                <div style={{
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

      {/* ─────────────────────────────────────
          LATEST PRODUCTS
      ───────────────────────────────────── */}
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

      {/* ─────────────────────────────────────
          BRANDS
      ───────────────────────────────────── */}
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
              <div key={b} style={{
                background: "#f8fafc",
                border: "1.5px solid #e2e8f0",
                borderRadius: "12px",
                padding: "14px 8px",
                textAlign: "center",
                cursor: "pointer",
              }}>
                <span style={{ color: "#475569", fontWeight: 700, fontSize: "12px" }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────
          CTA BANNER — solid blue
      ───────────────────────────────────── */}
      <section
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
            <Link to="/products" style={{
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
            <Link to="/contact" style={{
              background: "rgba(255,255,255,0.15)",
              border: "2px solid rgba(255,255,255,0.7)",
              color: "#fff",
              padding: "14px 36px",
              borderRadius: "50px",
              fontWeight: 700,
              fontSize: "14px",
              textDecoration: "none",
            }}>
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────
          NEWSLETTER
      ───────────────────────────────────── */}
      <section className="section-pad" style={{ background: "#fff" }}>
        <div className="page-wrap" style={{ maxWidth: "560px", textAlign: "center", margin: "0 auto" }}>
          {subscribed ? (
            <div>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
              <h2 style={{ color: "#0f172a", fontWeight: 800, fontSize: "24px", margin: "0 0 8px" }}>You&apos;re subscribed!</h2>
              <p style={{ color: "#64748b", fontSize: "14px" }}>We&apos;ll keep you updated on new products and offers.</p>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: "44px", marginBottom: "16px" }}>📬</div>
              <h2 style={{ color: "#0f172a", fontWeight: 800, fontSize: "26px", margin: "0 0 10px" }}>
                Subscribe for <span style={{ color: "#2563eb" }}>exclusive updates</span>
              </h2>
              <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "28px" }}>
                Be the first to know about new arrivals, special offers, and healthcare news.
              </p>
              <form
                onSubmit={(e) => { e.preventDefault(); if (email.trim()) setSubscribed(true); }}
                className="newsletter-form-inline"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  style={{
                    flex: 1,
                    border: "2px solid #e2e8f0",
                    borderRadius: "50px",
                    padding: "12px 20px",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
                <button type="submit" style={{
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50px",
                  padding: "12px 24px",
                  fontWeight: 700,
                  fontSize: "14px",
                  cursor: "pointer",
                }}>
                  Subscribe
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}

/* ─────────────────────────────────────
   PRODUCT CARD
───────────────────────────────────── */
function ProductCard({ product, onAdd, isAdded }) {
  const [imgErr, setImgErr] = useState(false);
  const hasImage = product.image && product.image.startsWith("http") && !imgErr;

  return (
    <div style={{
      background: "#fff",
      borderRadius: "16px",
      overflow: "hidden",
      border: "1.5px solid #f1f5f9",
      transition: "box-shadow 0.2s, transform 0.2s",
    }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.10)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
    >
      {/* Image */}
      <Link to={`/products/${product._id}`} style={{ display: "block", height: "220px", overflow: "hidden", background: "#f8fafc" }}>
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

        <p style={{ color: "#2563eb", fontWeight: 800, fontSize: "18px", margin: "0 0 14px" }}>
          ETB {product.price?.toLocaleString()}
        </p>

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
      </div>
    </div>
  );
}
