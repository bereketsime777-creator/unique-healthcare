import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineShieldCheck, HiOutlineTruck, HiOutlineWrenchScrewdriver, HiOutlineCurrencyDollar } from "react-icons/hi2";
import { FiArrowRight } from "react-icons/fi";
import API from "../services/api";
import { useCart } from "../context/CartContext";
import { categoryFilterUrl, getHomeCategoryBanners, normalizeCategory } from "../constants/categories";

const HERO_BG = "/images/hero1.jpg";
const categories = getHomeCategoryBanners();

const brands = ["Mindray", "Dräger", "Philips", "Siemens Healthineers", "EDAN", "Getinge", "GE Healthcare", "Stryker"];

const stats = [
  { value: "200+", label: "Hospitals Served" },
  { value: "500+", label: "Products Available" },
  { value: "10+",  label: "Years Experience" },
  { value: "15+",  label: "Global Brands" },
];

const features = [
  { icon: HiOutlineShieldCheck, title: "100% Genuine Products", desc: "Every product certified and sourced from globally recognized manufacturers." },
  { icon: HiOutlineTruck, title: "Fast & Reliable Delivery", desc: "Nationwide delivery across Ethiopia with specialized safe packaging." },
  { icon: HiOutlineWrenchScrewdriver, title: "Expert After-Sales Support", desc: "Installation, training, and ongoing technical support on every purchase." },
  { icon: HiOutlineCurrencyDollar, title: "Competitive Pricing", desc: "Best pricing with bulk discounts for hospitals and institutions." },
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

      {/* Hero */}
      <section
        className="flex items-center hero-section hero-overlay"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-20 sm:py-28 w-full">
          <div className="max-w-xl">
            <p style={{ color: "#93c5fd", fontWeight: 700, fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px" }}>
              Trusted by 200+ Hospitals
            </p>

            <h1 className="hero-title" style={{ color: "#ffffff", fontWeight: 800, lineHeight: 1.12, marginBottom: "20px" }}>
              Your Trusted Partner in Hospital Equipment
            </h1>

            <p style={{ color: "rgba(255,255,255,0.88)", fontSize: "17px", lineHeight: 1.75, marginBottom: "36px", maxWidth: "480px" }}>
              High-quality certified medical equipment delivered with reliability and professional support across Ethiopia.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link to="/products" className="btn btn-primary">
                Shop Products <FiArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn btn-outline-white">
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-bar">
        <div className="page-wrap">
          <div className="stats-bar-grid">
            {stats.map((s, i) => (
              <div key={s.label} style={{
                textAlign: "center",
                padding: "8px 16px",
                borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.25)" : "none",
              }}>
                <p style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(24px, 4vw, 32px)", margin: 0 }}>{s.value}</p>
                <p style={{ color: "#bfdbfe", fontSize: "13px", margin: "4px 0 0", fontWeight: 500 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-pad" style={{ background: "#fff" }}>
        <div className="page-wrap">
          <span className="section-tag">Browse by Category</span>
          <div className="section-header">
            <h2 className="section-title">Shop by Equipment Type</h2>
            <Link to="/products" className="link-arrow">
              View all <FiArrowRight size={14} />
            </Link>
          </div>

          <div className="responsive-grid-4" style={{ gap: "16px" }}>
            {categories.map((cat) => (
              <div
                key={cat.label}
                className="category-card"
                onClick={() => navigate(categoryFilterUrl(cat.label))}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && navigate(categoryFilterUrl(cat.label))}
              >
                <img
                  src={cat.bg}
                  alt={cat.label}
                  onError={(e) => { e.target.parentElement.style.background = "#1e40af"; e.target.style.display = "none"; }}
                />
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: "60%",
                  background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)",
                }} />
                <div style={{ position: "absolute", bottom: "18px", left: "18px", right: "18px" }}>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: "15px", margin: "0 0 10px" }}>{cat.label}</p>
                  <span style={{
                    background: "#2563eb", color: "#fff", fontSize: "11px", fontWeight: 700,
                    padding: "6px 16px", borderRadius: "50px", display: "inline-block",
                  }}>
                    Shop now
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-pad" style={{ background: "#f8fafc" }}>
        <div className="page-wrap">
          <div className="section-header" style={{ marginBottom: "32px" }}>
            <div>
              <span className="section-tag">Top Picks</span>
              <h2 className="section-title">Featured Products</h2>
            </div>
            <Link to="/products" className="link-arrow">
              View all <FiArrowRight size={14} />
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

      {/* Why Choose Us */}
      <section className="section-pad" style={{ background: "#fff" }}>
        <div className="page-wrap">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span className="section-tag">Why Us</span>
            <h2 className="section-title" style={{ marginBottom: "12px" }}>Why Choose Unique Healthcare?</h2>
            <p style={{ color: "#64748b", fontSize: "15px", maxWidth: "520px", margin: "0 auto" }}>
              We go beyond just supply — we are your long-term healthcare equipment partner.
            </p>
          </div>
          <div className="responsive-grid-4" style={{ gap: "24px" }}>
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="feature-card">
                  <div className="feature-icon">
                    <Icon />
                  </div>
                  <h3 style={{ color: "#0f172a", fontWeight: 700, fontSize: "16px", margin: "0 0 10px" }}>{f.title}</h3>
                  <p style={{ color: "#64748b", fontSize: "13px", lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Products */}
      {products.length > 0 && (
        <section className="section-pad" style={{ background: "#f8fafc" }}>
          <div className="page-wrap">
            <div className="section-header" style={{ marginBottom: "32px" }}>
              <div>
                <span className="section-tag">Just Added</span>
                <h2 className="section-title">Latest Products</h2>
              </div>
              <Link to="/products" className="link-arrow">
                View all <FiArrowRight size={14} />
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

      {/* Brands */}
      <section style={{ background: "#fff", borderTop: "1px solid #f1f5f9", padding: "64px 0" }}>
        <div className="page-wrap">
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <span className="section-tag">Partners</span>
            <h2 className="section-title" style={{ marginBottom: "8px" }}>Discover Our Brands</h2>
            <p style={{ color: "#64748b", fontSize: "14px" }}>
              Official distributor of top global medical equipment manufacturers
            </p>
          </div>
          <div className="responsive-grid-8">
            {brands.map((b) => (
              <div key={b} className="brand-pill">
                <span style={{ color: "#334155", fontWeight: 700, fontSize: "12px" }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="page-wrap" style={{ textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(26px, 5vw, 38px)", marginBottom: "12px" }}>
            Ready to Equip Your Facility?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "16px", marginBottom: "32px", maxWidth: "520px", margin: "0 auto 32px" }}>
            Browse 500+ certified medical products or contact us for a custom quote.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/products" className="btn btn-white">
              Shop Now
            </Link>
            <Link to="/contact" className="btn btn-outline-white">
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

function ProductCard({ product, onAdd, isAdded }) {
  const [imgErr, setImgErr] = useState(false);
  const hasImage = product.image && product.image.startsWith("http") && !imgErr;

  return (
    <div className="product-card">
      <Link to={`/products/${product._id}`} style={{ display: "block", height: "220px", overflow: "hidden", background: "#f8fafc" }}>
        {hasImage ? (
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            onError={() => setImgErr(true)}
          />
        ) : (
          <div style={{
            width: "100%", height: "100%", display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            background: "linear-gradient(135deg,#eff6ff,#e0f2fe)",
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span style={{ color: "#93c5fd", fontSize: "11px", fontWeight: 600, marginTop: "8px" }}>Medical Equipment</span>
          </div>
        )}
      </Link>

      <div style={{ padding: "18px" }}>
        <span style={{
          background: "#eff6ff", color: "#2563eb", fontSize: "11px", fontWeight: 700,
          padding: "4px 12px", borderRadius: "50px", display: "inline-block", marginBottom: "10px",
        }}>
          {product.category}
        </span>

        <Link to={`/products/${product._id}`} style={{ textDecoration: "none" }}>
          <h3 style={{
            color: "#0f172a", fontWeight: 700, fontSize: "14px", lineHeight: 1.4,
            margin: "0 0 6px", minHeight: "40px",
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
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
          type="button"
          onClick={() => onAdd(product)}
          disabled={product.stock === 0}
          className="btn btn-primary"
          style={{
            width: "100%", padding: "11px",
            background: isAdded ? "#16a34a" : product.stock === 0 ? "#e2e8f0" : undefined,
            color: product.stock === 0 ? "#94a3b8" : "#fff",
            cursor: product.stock === 0 ? "not-allowed" : "pointer",
            boxShadow: product.stock === 0 || isAdded ? "none" : undefined,
          }}
        >
          {isAdded ? "Added to Cart" : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
