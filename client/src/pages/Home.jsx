import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { t } from "../translations/translations";
import { categoryFilterUrl, normalizeCategory, CATEGORY_IMAGES } from "../constants/categories";
import { useMetaTags } from "../hooks/useMetaTags";
import { getSafeOptimizedImage } from "../utils/imageOptimizer";
import NewsletterSignup from "../components/NewsletterSignup";
import Testimonials from "../components/Testimonials";
import "../styles/home-enhancements.css";

const HERO_BG = "/images/hero1.png";

const brands = ["Mindray", "Drager", "Philips", "Siemens Healthineers", "EDAN", "Getinge", "GE Healthcare", "Stryker"];

export default function Home() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { language } = useLanguage();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [addedId, setAddedId] = useState(null);

  // Get base URL for absolute URLs
  const getBaseUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return process.env.VITE_FRONTEND_URL || 'https://unique-healthcare.vercel.app';
  };

  // Set home page meta tags
  useMetaTags({
    title: 'Unique Healthcare | Hospital Equipment & Medical Supplies in Ethiopia',
    description: 'Ethiopia\'s trusted partner for certified hospital equipment, medical devices, and healthcare supplies. Serving 200+ hospitals nationwide with fast delivery and professional support.',
    keywords: 'hospital equipment, medical supplies, healthcare devices, Ethiopia, diagnostic equipment, surgical instruments',
    
    // OpenGraph tags for social sharing
    ogTitle: 'Unique Healthcare - Hospital Equipment & Medical Supplies',
    ogDescription: 'Access 500+ certified medical products with fast delivery across Ethiopia. Trusted by 200+ hospitals.',
    ogImage: `${getBaseUrl()}/logo.png`,
    ogUrl: getBaseUrl(),
    ogType: 'website',
    ogSiteName: 'Unique Healthcare PLC',
    
    // Twitter Card tags
    twitterCard: 'summary_large_image',
    twitterTitle: 'Unique Healthcare | Hospital Equipment',
    twitterDescription: 'Certified medical equipment and healthcare supplies for Ethiopia',
    twitterImage: `${getBaseUrl()}/logo.png`,
    
    // Canonical URL
    canonical: getBaseUrl(),
  });

  useEffect(() => {
    // Fetch products and categories in parallel
    Promise.all([
      API.get("/products"),
      API.get("/categories")
    ])
      .then(([productsRes, categoriesRes]) => {
        setProducts(productsRes.data.map((p) => ({
          ...p,
          category: normalizeCategory(p.category),
        })));
        setCategories(categoriesRes.data.slice(0, 4)); // Show first 4 categories
      })
      .catch(() => {});
  }, []);

  const handleAdd = (product) => {
    addToCart(product);
    setAddedId(product._id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const featured = products.slice(0, 4);
  const latest = products.length > 4 ? products.slice(4, 8) : products.slice(0, 4);

  const stats = [
    { value: "200+", label: t(language, "home.stats.hospitalsServed") },
    { value: "500+", label: t(language, "home.stats.productsAvailable") },
    { value: "10+", label: t(language, "home.stats.yearsExperience") },
    { value: "15+", label: t(language, "home.stats.globalBrands") },
  ];

  const features = [
    { 
      icon: "🏅", 
      title: t(language, "home.features.genuine"), 
      desc: t(language, "home.features.genuineDesc") 
    },
    { 
      icon: "🚚", 
      title: t(language, "home.features.delivery"), 
      desc: t(language, "home.features.deliveryDesc") 
    },
    { 
      icon: "🛠️", 
      title: t(language, "home.features.support"), 
      desc: t(language, "home.features.supportDesc") 
    },
    { 
      icon: "💰", 
      title: t(language, "home.features.pricing"), 
      desc: t(language, "home.features.pricingDesc") 
    },
  ];

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
              {t(language, "home.heroTag")}
            </p>

            <h1 style={{ 
              color: "#ffffff", 
              fontWeight: 900, 
              fontSize: "clamp(36px, 6vw, 72px)", 
              lineHeight: 1.1, 
              marginBottom: "32px",
              textShadow: "0 4px 20px rgba(0,0,0,0.3)"
            }}>
              {t(language, "home.heroTitle")}
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
              {t(language, "home.heroDesc")}
            </p>

            {/* Trust Badges */}
            <div style={{ 
              display: "flex", 
              gap: "16px", 
              justifyContent: "center", 
              flexWrap: "wrap",
              marginBottom: "40px",
              flexDirection: "row"
            }}>
              <div style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: "50px",
                padding: "8px 16px",
                color: "#fff",
                fontSize: "12px",
                fontWeight: 600,
              }}>
                ✓ {t(language, "home.trustBadge1")}
              </div>
              <div style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: "50px",
                padding: "8px 16px",
                color: "#fff",
                fontSize: "12px",
                fontWeight: 600,
              }}>
                ✓ {t(language, "home.trustBadge2")}
              </div>
              <div style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: "50px",
                padding: "8px 16px",
                color: "#fff",
                fontSize: "12px",
                fontWeight: 600,
              }}>
                ✓ {t(language, "home.trustBadge3")}
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                to="/contact?subject=Request a Quote"
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
                  background: "#2563eb",
                }}
              >
                {t(language, "home.requestQuote")}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link
                to="/products"
                className="cta-button cta-button-secondary"
                style={{
                  color: "#fff",
                  padding: "16px 40px",
                  borderRadius: "50px",
                  fontWeight: 700,
                  fontSize: "16px",
                  textDecoration: "none",
                  display: "inline-block",
                  background: "rgba(255,255,255,0.15)",
                  border: "2px solid rgba(255,255,255,0.3)",
                }}
              >
                {t(language, "home.exploreProducts")}
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
          <p style={{ color: "#2563eb", fontWeight: 700, fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "6px" }}>
            {t(language, "home.browseCategory")}
          </p>
          <div className="section-header">
            <h2 style={{ color: "#0f172a", fontWeight: 800, fontSize: "28px", margin: 0 }}>
              {t(language, "home.shopByType")}
            </h2>
            <Link to="/products" style={{ color: "#2563eb", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
              {t(language, "home.viewAll")} →
            </Link>
          </div>

          <div className="responsive-grid-4" style={{ gap: "16px" }}>
            {categories.map((cat) => (
              <div
                key={cat._id}
                onClick={() => navigate(categoryFilterUrl(cat.name))}
                className="category-card"
                style={{
                  height: "200px",
                  borderRadius: "16px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={cat.image || CATEGORY_IMAGES[cat.name] || "/images/hero1.png"}
                  alt={cat.name}
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
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: "15px", margin: "0 0 8px" }}>{cat.name}</p>
                  <span style={{
                    background: "#2563eb",
                    color: "#fff",
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "5px 14px",
                    borderRadius: "50px",
                  }}>
                    {t(language, "home.shopNow")}
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
              <p style={{ color: "#2563eb", fontWeight: 700, fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "4px" }}>
                {t(language, "home.topPicks")}
              </p>
              <h2 style={{ color: "#0f172a", fontWeight: 800, fontSize: "28px", margin: 0 }}>
                {t(language, "home.featuredProducts")}
              </h2>
            </div>
            <Link to="/products" style={{ color: "#2563eb", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
              {t(language, "home.viewAll")} →
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
            <p style={{ color: "#2563eb", fontWeight: 700, fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "8px" }}>
              {t(language, "home.whyUs")}
            </p>
            <h2 style={{ color: "#0f172a", fontWeight: 800, fontSize: "28px", margin: "0 0 10px" }}>
              {t(language, "home.whyChoose")}
            </h2>
            <p style={{ color: "#64748b", fontSize: "15px", maxWidth: "480px", margin: "0 auto" }}>
              {t(language, "home.whyDesc")}
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
                <p style={{ color: "#2563eb", fontWeight: 700, fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "4px" }}>
                  {t(language, "home.justAdded")}
                </p>
                <h2 style={{ color: "#0f172a", fontWeight: 800, fontSize: "28px", margin: 0 }}>
                  {t(language, "home.latestProducts")}
                </h2>
              </div>
              <Link to="/products" style={{ color: "#2563eb", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
                {t(language, "home.viewAll")} →
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
            <p style={{ color: "#2563eb", fontWeight: 700, fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "8px" }}>
              {t(language, "home.partners")}
            </p>
            <h2 style={{ color: "#0f172a", fontWeight: 800, fontSize: "28px", margin: "0 0 8px" }}>
              {t(language, "home.discoverBrands")}
            </h2>
            <p style={{ color: "#64748b", fontSize: "14px" }}>
              {t(language, "home.brandsDesc")}
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
            {t(language, "home.readyTitle")}
          </h2>
          <p style={{ color: "#fff", fontSize: "16px", marginBottom: "32px", opacity: 0.9 }}>
            {t(language, "home.readyDesc")}
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
              {t(language, "home.shopNow")}
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
              {t(language, "home.contactUs")}
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
  const { language } = useLanguage();
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
            src={getSafeOptimizedImage(product.image, 'card')}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            loading="lazy"
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
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}>
          {product.category}
        </span>

        <Link to={`/products/${product._id}`} style={{ textDecoration: "none" }}>
          <h3 style={{
            color: "#0f172a",
            fontWeight: 700,
            fontSize: "15px",
            lineHeight: 1.4,
            margin: "0 0 6px",
            minHeight: "42px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
            {product.name}
          </h3>
        </Link>

        {product.manufacturer && (
          <p style={{ color: "#64748b", fontSize: "12px", margin: "0 0 12px", fontWeight: 500 }}>{product.manufacturer}</p>
        )}

        {product.priceType === 'quote' ? (
          <div style={{ marginBottom: "14px" }}>
            <p style={{ color: "#2563eb", fontWeight: 700, fontSize: "14px", margin: 0 }}>
              {t(language, "products.priceOnRequest")}
            </p>
          </div>
        ) : (
          <p style={{ color: "#2563eb", fontWeight: 800, fontSize: "18px", margin: "0 0 14px" }}>
            ETB {product.price?.toLocaleString()}
          </p>
        )}

        {product.priceType === 'quote' ? (
          <Link
            to="/contact?subject=Request a Quote"
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
              color: "#fff",
              transition: "background 0.2s",
            }}
          >
            {t(language, "products.requestQuote")}
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
            {isAdded ? `✓ ${t(language, "products.added")}` : product.stock === 0 ? t(language, "products.outOfStock") : t(language, "products.addToCart")}
          </button>
        )}
      </div>
    </div>
  );
}
