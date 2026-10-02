import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import API from "../services/api";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { t } from "../translations/translations";
import { useMetaTags } from "../hooks/useMetaTags";
import { normalizeCategory } from "../constants/categories";
import { getSafeOptimizedImage } from "../utils/imageOptimizer";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  const { language } = useLanguage();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState(null);
  const [sortBy, setSortBy] = useState("default");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "";
  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Get base URL for absolute URLs
  const getBaseUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return process.env.VITE_FRONTEND_URL || 'https://unique-healthcare.vercel.app';
  };

  // Set products page meta tags
  useMetaTags({
    title: categoryQuery ? `${categoryQuery} | Unique Healthcare` : 'Medical Equipment & Supplies | Unique Healthcare',
    description: categoryQuery 
      ? `Browse our range of ${categoryQuery.toLowerCase()} products from leading manufacturers. Fast delivery across Ethiopia.`
      : 'Browse 500+ certified medical devices from globally recognized brands. Hospital equipment, surgical instruments, diagnostic tools and more.',
    keywords: `${categoryQuery || 'medical equipment'}, healthcare supplies, ${categoryQuery || 'products'}, Ethiopia`,
    
    // OpenGraph tags
    ogTitle: categoryQuery ? `${categoryQuery} Products | Unique Healthcare` : 'Medical Products | Unique Healthcare',
    ogDescription: 'Browse our complete catalog of certified medical equipment and healthcare supplies',
    ogImage: `${getBaseUrl()}/logo.png`,
    ogUrl: `${getBaseUrl()}/products${categoryQuery ? `?category=${encodeURIComponent(categoryQuery)}` : ''}`,
    ogType: 'website',
    ogSiteName: 'Unique Healthcare PLC',
    
    // Twitter tags
    twitterCard: 'summary',
    twitterTitle: 'Medical Products | Unique Healthcare',
    twitterDescription: 'Browse certified medical equipment and healthcare supplies',
    twitterImage: `${getBaseUrl()}/logo.png`,
    
    // Canonical
    canonical: `${getBaseUrl()}/products${categoryQuery ? `?category=${encodeURIComponent(categoryQuery)}` : ''}`,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch categories and products in parallel
        const [categoriesRes, productsRes] = await Promise.all([
          API.get("/categories"),
          (() => {
            const params = {};
            if (searchQuery) params.search = searchQuery;
            if (categoryQuery) params.category = categoryQuery;
            return API.get("/products", { params });
          })()
        ]);

        setCategories(categoriesRes.data);
        setProducts(
          productsRes.data.map((p) => ({
            ...p,
            category: normalizeCategory(p.category),
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        setProducts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [searchQuery, categoryQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    const p = {};
    if (localSearch) p.search = localSearch;
    if (categoryQuery) p.category = categoryQuery;
    setSearchParams(p);
  };

  const handleCategory = (cat) => {
    const p = {};
    if (localSearch) p.search = localSearch;
    if (cat) p.category = cat;
    setSearchParams(p);
  };

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    addToCart(product);
    setAddedId(product._id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const sortedProducts = useMemo(() => {
    const list = [...products];
    switch (sortBy) {
      case "price-asc":
        return list.sort((a, b) => (a.price || 0) - (b.price || 0));
      case "price-desc":
        return list.sort((a, b) => (b.price || 0) - (a.price || 0));
      case "newest":
        return list.sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );
      default:
        return list;
    }
  }, [products, sortBy]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <style>{`
        @keyframes scroll-indicator {
          0% { opacity: 1; transform: translate(-50%, 0); }
          100% { opacity: 0; transform: translate(-50%, 20px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      {/* Hero Section */}
      <section
        className="hero-section"
        style={{
          background: "#1d4ed8",
          backgroundImage: 'url(/images/hero1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: "40px 0 50px",
          textAlign: "center",
          position: "relative",
          minHeight: "35vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 32px" }}>
          <div className="hero-content">
            <p style={{ 
              color: "#fff", 
              fontWeight: 700, 
              fontSize: "12px", 
              letterSpacing: "3px", 
              textTransform: "uppercase", 
              marginBottom: "14px",
              opacity: 0.9
            }}>
              {t(language, "products.browseTag")}
            </p>
            <h1 style={{ 
              color: "#ffffff", 
              fontWeight: 900, 
              fontSize: "clamp(28px, 4.5vw, 40px)", 
              margin: "0 0 12px",
              lineHeight: 1.2,
              textShadow: "0 4px 20px rgba(0,0,0,0.3)"
            }}>
              {categoryQuery || t(language, "products.allProducts")}
            </h1>
            <p style={{ 
              color: "#ffffff", 
              fontSize: "15px", 
              lineHeight: 1.6, 
              margin: "0 auto 18px",
              maxWidth: "650px",
              opacity: 0.95,
              textShadow: "0 2px 8px rgba(0,0,0,0.2)"
            }}>
              {categoryQuery 
                ? t(language, "products.categoryDesc").replace("{category}", categoryQuery.toLowerCase())
                : t(language, "products.defaultDesc")}
            </p>
            {categoryQuery && (
              <div className="flex items-center gap-2 justify-center text-sm" style={{ color: "#ffffff", opacity: 0.9 }}>
                <Link to="/" style={{ color: "#ffffff", textDecoration: "none" }}>{t(language, "nav.home")}</Link>
                <span>/</span>
                <Link to="/products" style={{ color: "#ffffff", textDecoration: "none" }}>{t(language, "nav.products")}</Link>
                <span>/</span>
                <span style={{ fontWeight: 600 }}>{categoryQuery}</span>
              </div>
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          animation: "float 2s ease-in-out infinite"
        }}>
          <div style={{
            width: "26px",
            height: "42px",
            border: "2px solid rgba(255,255,255,0.5)",
            borderRadius: "20px",
            position: "relative"
          }}>
            <div style={{
              width: "5px",
              height: "8px",
              background: "rgba(255,255,255,0.8)",
              borderRadius: "3px",
              position: "absolute",
              top: "6px",
              left: "50%",
              transform: "translateX(-50%)",
              animation: "scroll-indicator 1.5s infinite"
            }}></div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 mb-6">
          <input
            type="text"
            placeholder={t(language, "products.search")}
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md text-sm font-semibold transition-colors"
          >
            {t(language, "products.searchButton")}
          </button>
          {(searchQuery || categoryQuery) && (
            <button
              type="button"
              onClick={() => { setLocalSearch(""); setSearchParams({}); }}
              className="border border-gray-300 text-gray-600 hover:bg-gray-100 px-4 py-2.5 rounded-md text-sm transition-colors"
            >
              {t(language, "products.clear")}
            </button>
          )}
        </form>

        <div className="products-layout">
          {/* ── Sidebar ── */}
          <aside className="products-sidebar">
            <button
              type="button"
              onClick={() => setFiltersOpen((p) => !p)}
              className="products-filter-toggle w-full mb-3 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold"
            >
              {filtersOpen ? t(language, "products.hideCategories") : t(language, "products.showCategories")}
            </button>
            <div className={`products-sidebar-inner ${filtersOpen ? "" : "collapsed"}`}>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden md:block">
              <div className="bg-blue-600 text-white px-4 py-3 font-semibold text-sm">
                {t(language, "products.categories")}
              </div>
              <div className="p-2">
                <button
                  onClick={() => handleCategory("")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    !categoryQuery
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {t(language, "products.allProductsFilter")}
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat._id || cat.name}
                    onClick={() => handleCategory(cat.name)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      categoryQuery === cat.name
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
            </div>
          </aside>

          {/* ── Product Grid ── */}
          <div className="flex-1">
            {/* Results bar */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
              <p className="text-sm text-gray-500">
                {loading ? t(language, "products.loading") : t(language, "products.productsFound").replace("{count}", products.length)}
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 w-full sm:w-auto"
              >
                <option value="default">{t(language, "products.sortDefault")}</option>
                <option value="price-asc">{t(language, "products.sortPriceAsc")}</option>
                <option value="price-desc">{t(language, "products.sortPriceDesc")}</option>
                <option value="newest">{t(language, "products.sortNewest")}</option>
              </select>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
                    <div className="bg-gray-200 h-40 rounded-lg mb-3" />
                    <div className="bg-gray-200 h-4 rounded mb-2" />
                    <div className="bg-gray-200 h-3 rounded w-2/3 mb-3" />
                    <div className="bg-gray-200 h-8 rounded" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{t(language, "products.noProducts")}</h3>
                <p className="text-gray-500 mb-4">{t(language, "products.noProductsDesc")}</p>
                <button
                  onClick={() => { setLocalSearch(""); setSearchParams({}); }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-semibold"
                >
                  {t(language, "products.clearFilters")}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {sortedProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow overflow-hidden group"
                  >
                    <Link to={`/products/${product._id}`}>
                      <div className="bg-gray-50 h-44 flex items-center justify-center overflow-hidden p-2">
                        {product.image && product.image.startsWith("http") ? (
                          <img
                            src={getSafeOptimizedImage(product.image, 'card')}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                        ) : null}
                        <div
                          style={{ display: product.image && product.image.startsWith("http") ? "none" : "flex" }}
                          className="w-full h-full flex-col items-center justify-center text-gray-300"
                        >
                          <svg className="w-14 h-14 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-xs text-gray-400">No image</span>
                        </div>
                      </div>
                    </Link>

                  <div className="p-3">
                      <p className="text-xs text-blue-600 font-semibold mb-1 truncate uppercase" style={{ letterSpacing: "0.5px" }}>{product.category}</p>
                      <Link to={`/products/${product._id}`}>
                        <h3 className="text-sm font-bold text-gray-900 mb-1 hover:text-blue-600 transition-colors line-clamp-2 min-h-[2.5rem] leading-snug">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-gray-500 mb-2 font-medium">{product.manufacturer}</p>

                      <div className="flex items-center justify-between mb-3">
                        {product.priceType === 'quote' ? (
                          <p className="text-blue-600 font-bold text-sm">
                            Price on Request
                          </p>
                        ) : (
                          <p className="text-blue-600 font-extrabold text-base">
                            ETB {product.price?.toLocaleString()}
                          </p>
                        )}
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase ${
                          product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`} style={{ letterSpacing: "0.3px" }}>
                          {product.stock > 0 ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>

                      <div className="flex gap-1.5">
                        <Link
                          to={`/products/${product._id}`}
                          className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 py-1.5 rounded-full text-xs font-semibold text-center transition-colors"
                        >
                          {t(language, "products.details")}
                        </Link>
                        {product.priceType === 'quote' ? (
                          <Link
                            to={`/contact?subject=Request Proforma&productId=${product._id}&productName=${encodeURIComponent(product.name)}`}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded-full text-xs font-semibold text-center transition-colors"
                            style={{ color: '#ffffff' }}
                          >
                            {t(language, "products.requestQuote")}
                          </Link>
                        ) : (
                          <button
                            onClick={(e) => handleAddToCart(product, e)}
                            disabled={product.stock === 0}
                            className={`flex-1 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center justify-center gap-1 ${
                              addedId === product._id
                                ? "bg-green-500 text-white"
                                : product.stock === 0
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                          >
                            {addedId === product._id ? `✓ ${t(language, "products.added")}` : t(language, "products.addToCart")}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
