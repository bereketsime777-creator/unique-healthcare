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

  // Improved search filtering logic - searches across multiple fields
  const performClientSearch = (products, searchTerm, selectedCategory) => {
    if (!searchTerm && !selectedCategory) {
      return products;
    }

    return products.filter((product) => {
      // Check category filter
      const categoryMatch = !selectedCategory || product.category === selectedCategory;
      
      if (!categoryMatch) return false;

      // If no search term, category match is enough
      if (!searchTerm) return true;

      // Normalize search term for comparison
      const normalizedSearch = searchTerm.toLowerCase().trim();

      // Search across multiple fields
      return (
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch) ||
        (product.manufacturer && product.manufacturer.toLowerCase().includes(normalizedSearch)) ||
        (product.model && product.model.toLowerCase().includes(normalizedSearch))
      );
    });
  };

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
      : 'Browse 400+ certified medical devices from globally recognized brands. Hospital equipment, surgical instruments, diagnostic tools and more.',
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
    // First apply search + category filtering
    const filtered = performClientSearch(products, localSearch, categoryQuery);
    
    // Then apply sorting
    const list = [...filtered];
    switch (sortBy) {
      case "name-asc":
        return list.sort((a, b) => 
          (a.name || "").toLowerCase().localeCompare((b.name || "").toLowerCase())
        );
      case "name-desc":
        return list.sort((a, b) => 
          (b.name || "").toLowerCase().localeCompare((a.name || "").toLowerCase())
        );
      case "price-asc":
        // Sort by price, with "Price on Request" products at the end
        return list.sort((a, b) => {
          const aPrice = a.priceType === 'quote' ? Infinity : (a.price || 0);
          const bPrice = b.priceType === 'quote' ? Infinity : (b.price || 0);
          return aPrice - bPrice;
        });
      case "price-desc":
        // Sort by price descending, with "Price on Request" products at the end
        return list.sort((a, b) => {
          const aPrice = a.priceType === 'quote' ? -Infinity : (a.price || 0);
          const bPrice = b.priceType === 'quote' ? -Infinity : (b.price || 0);
          return bPrice - aPrice;
        });
      case "newest":
        return list.sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );
      default:
        // Default: show newest first (by creation date)
        return list.sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );
    }
  }, [products, localSearch, categoryQuery, sortBy]);

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
        {/* Search Bar with improved UX */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex flex-col gap-2 sm:gap-2">
            {/* Search input with integrated clear button */}
            <div className="flex-1 relative">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder={t(language, "products.search")}
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  aria-label="Search products by name, category, manufacturer, or model"
                />
                {localSearch && (
                  <button
                    type="button"
                    onClick={() => setLocalSearch("")}
                    className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors p-1"
                    title="Clear search"
                    aria-label="Clear search input"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="4" y1="4" x2="12" y2="12" />
                      <line x1="12" y1="4" x2="4" y2="12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            
            {/* Search and Clear buttons - flex row to keep them together */}
            <div className="flex gap-2 sm:gap-2">
              <button
                type="submit"
                className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2.5 rounded-md text-sm font-semibold transition-colors"
              >
                {t(language, "products.searchButton")}
              </button>
              
              {/* Clear all filters button - only show if filters are active */}
              {(searchQuery || categoryQuery) && (
                <button
                  type="button"
                  onClick={() => { setLocalSearch(""); setSearchParams({}); }}
                  className="flex-1 sm:flex-none border border-gray-300 text-gray-600 hover:bg-gray-100 px-4 py-2.5 rounded-md text-sm transition-colors"
                  title="Clear all search and category filters"
                  aria-label="Clear all filters"
                >
                  {t(language, "products.clear")}
                </button>
              )}
            </div>
          </div>
        </form>

        <div className="products-layout">
          {/* ── Sidebar ── */}
          <aside className="products-sidebar">
            <button
              type="button"
              onClick={() => setFiltersOpen((p) => !p)}
              className="products-filter-toggle w-full mb-3 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
              aria-expanded={filtersOpen}
              aria-controls="category-list"
            >
              {filtersOpen ? t(language, "products.hideCategories") : t(language, "products.showCategories")}
            </button>
            <div className={`products-sidebar-inner ${filtersOpen ? "" : "collapsed"}`}>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden md:block">
                <div className="bg-blue-600 text-white px-4 py-3 font-semibold text-sm">
                  {t(language, "products.categories")}
                </div>
                <div id="category-list" className="p-2 space-y-1">
                  <button
                    onClick={() => {
                      handleCategory("");
                      // Auto-close mobile sidebar after selection
                      if (window.innerWidth <= 768) {
                        setFiltersOpen(false);
                      }
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 font-medium ${
                      !categoryQuery
                        ? "bg-blue-50 text-blue-600 font-semibold border-l-4 border-l-blue-600"
                        : "text-gray-700 hover:bg-gray-50 border-l-4 border-l-transparent"
                    }`}
                    aria-current={!categoryQuery ? "true" : "false"}
                  >
                    {t(language, "products.allProductsFilter")}
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat._id || cat.name}
                      onClick={() => {
                        handleCategory(cat.name);
                        // Auto-close mobile sidebar after selection
                        if (window.innerWidth <= 768) {
                          setFiltersOpen(false);
                        }
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 font-medium ${
                        categoryQuery === cat.name
                          ? "bg-blue-50 text-blue-600 font-semibold border-l-4 border-l-blue-600"
                          : "text-gray-700 hover:bg-gray-50 border-l-4 border-l-transparent"
                      }`}
                      aria-current={categoryQuery === cat.name ? "true" : "false"}
                      title={cat.name}
                    >
                      <span className="break-words">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* ── Product Grid ── */}
          <div className="flex-1">
            {/* Results bar */}
            <div className="flex flex-col gap-3 mb-4">
              <p className="text-sm text-gray-500">
                {loading 
                  ? t(language, "products.loading") 
                  : t(language, "products.productsFound").replace("{count}", sortedProducts.length)}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <label htmlFor="sort-select" className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  Sort by:
                </label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 flex-1 sm:flex-none"
                  aria-label="Sort products by"
                >
                  <option value="default">{t(language, "products.sortNewest")}</option>
                  <option value="name-asc">{t(language, "products.sortNameAsc")}</option>
                  <option value="name-desc">{t(language, "products.sortNameDesc")}</option>
                  <option value="price-asc">{t(language, "products.sortPriceAsc")}</option>
                  <option value="price-desc">{t(language, "products.sortPriceDesc")}</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
                    <div className="bg-gray-200 h-32 sm:h-40 rounded-lg mb-3" />
                    <div className="bg-gray-200 h-4 rounded mb-2" />
                    <div className="bg-gray-200 h-3 rounded w-2/3 mb-3" />
                    <div className="bg-gray-200 h-8 rounded" />
                  </div>
                ))}
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 sm:p-16 text-center">
                <div className="text-4xl sm:text-5xl mb-4">🔍</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                  {searchQuery || categoryQuery 
                    ? t(language, "products.noProducts")
                    : t(language, "products.noProducts")}
                </h3>
                <p className="text-sm sm:text-base text-gray-500 mb-6">
                  {searchQuery && categoryQuery
                    ? `No products match "${searchQuery}" in ${categoryQuery}. Try a different search or category.`
                    : searchQuery
                    ? `No products match "${searchQuery}". Try a different search term.`
                    : categoryQuery
                    ? `No products found in ${categoryQuery}. Browse other categories.`
                    : t(language, "products.noProductsDesc")}
                </p>
                <button
                  onClick={() => { setLocalSearch(""); setSearchParams({}); }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-md text-sm font-semibold transition-colors"
                >
                  {t(language, "products.clearFilters")}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {sortedProducts.map((product) => (
                  <div
                    key={product._id}
                    style={{
                      background: "#fff",
                      borderRadius: "16px",
                      overflow: "hidden",
                      border: "1.5px solid #f1f5f9",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <Link to={`/products/${product._id}`}>
                      <div style={{ background: "#f8fafc", height: "clamp(140px, 30vw, 220px)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "8px" }}>
                        {product.image && product.image.startsWith("http") ? (
                          <img
                            src={getSafeOptimizedImage(product.image, 'card')}
                            alt={product.name}
                            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                            loading="lazy"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                        ) : null}
                        <div
                          style={{ display: product.image && product.image.startsWith("http") ? "none" : "flex", width: "100%", height: "100%", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#eff6ff,#e0f2fe)" }}
                        >
                          <span style={{ fontSize: "clamp(32px, 8vw, 48px)" }}>🏥</span>
                          <span style={{ color: "#93c5fd", fontSize: "11px", fontWeight: 600, marginTop: "8px" }}>Medical Equipment</span>
                        </div>
                      </div>
                    </Link>

                  <div style={{ padding: "clamp(12px, 3vw, 16px)", display: "flex", flexDirection: "column", flex: 1 }}>
                      <Link to={`/products/${product._id}`} style={{ textDecoration: "none" }}>
                        <h3 style={{
                          color: "#0f172a",
                          fontWeight: 700,
                          fontSize: "clamp(13px, 3.5vw, 15px)",
                          lineHeight: 1.4,
                          margin: "0 0 8px",
                          minHeight: "42px",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}>
                          {product.name}
                        </h3>
                      </Link>

                      <span style={{
                        background: "#eff6ff",
                        color: "#2563eb",
                        fontSize: "clamp(10px, 2.5vw, 11px)",
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: "50px",
                        display: "inline-block",
                        marginBottom: "8px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        height: "2.5rem",
                        overflow: "hidden",
                        lineHeight: 1.2,
                        alignContent: "center",
                        maxWidth: "100%",
                      }}>
                        {product.category}
                      </span>

                      {product.manufacturer && (
                        <p style={{ color: "#64748b", fontSize: "clamp(11px, 2.5vw, 12px)", margin: "0 0 12px", fontWeight: 500 }}>{product.manufacturer}</p>
                      )}

                      {/* Regulatory Compliance Badges */}
                      {(product.compliance?.EFDA || product.compliance?.CE || product.compliance?.FDA) && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
                          {product.compliance?.EFDA && (
                            <div
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "#fef3c7",
                                color: "#92400e",
                                fontSize: "10px",
                                fontWeight: 700,
                                padding: "3px 8px",
                                borderRadius: "4px",
                                border: "1px solid #fcd34d",
                                cursor: "help",
                                position: "relative",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                              }}
                              title="EFDA: Ethiopian Food and Drug Authority"
                              aria-label="EFDA certified: Ethiopian Food and Drug Authority approval"
                            >
                              EFDA
                            </div>
                          )}
                          {product.compliance?.CE && (
                            <div
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "#dbeafe",
                                color: "#0c4a6e",
                                fontSize: "10px",
                                fontWeight: 700,
                                padding: "3px 8px",
                                borderRadius: "4px",
                                border: "1px solid #7dd3fc",
                                cursor: "help",
                                position: "relative",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                              }}
                              title="CE: European conformity marking"
                              aria-label="CE marked: European conformity certification"
                            >
                              CE
                            </div>
                          )}
                          {product.compliance?.FDA && (
                            <div
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "#f3e8ff",
                                color: "#581c87",
                                fontSize: "10px",
                                fontWeight: 700,
                                padding: "3px 8px",
                                borderRadius: "4px",
                                border: "1px solid #e9d5ff",
                                cursor: "help",
                                position: "relative",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                              }}
                              title="FDA: U.S. Food and Drug Administration"
                              aria-label="FDA approved: U.S. Food and Drug Administration certification"
                            >
                              FDA
                            </div>
                          )}
                        </div>
                      )}

                      {/* Technical Specification PDF Badge - displays only if PDF is available */}
                      {product.technicalSpecificationPdf?.url && (
                        <div style={{ marginBottom: "12px" }}>
                          <span style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            background: "#f0fdf4",
                            color: "#16a34a",
                            fontSize: "clamp(10px, 2.5vw, 11px)",
                            fontWeight: 600,
                            padding: "4px 8px",
                            borderRadius: "6px",
                            border: "1px solid #dcfce7",
                          }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                              <polyline points="14 2 14 8 20 8" />
                              <line x1="12" y1="19" x2="12" y2="11" />
                              <polyline points="9 14 12 11 15 14" />
                            </svg>
                            {t(language, "products.specAvailable")}
                          </span>
                        </div>
                      )}

                      {product.priceType === 'quote' ? (
                        <div style={{ marginBottom: "14px" }}>
                          <p style={{ color: "#2563eb", fontWeight: 700, fontSize: "clamp(12px, 3vw, 14px)", margin: 0 }}>
                            {t(language, "products.priceOnRequest")}
                          </p>
                        </div>
                      ) : (
                        <p style={{ color: "#2563eb", fontWeight: 800, fontSize: "clamp(16px, 4vw, 18px)", margin: "0 0 14px" }}>
                          ETB {product.price?.toLocaleString()}
                        </p>
                      )}

                      {product.priceType === 'quote' ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "auto" }}>
                          <Link
                            to={`/contact?subject=Request a Quote&productId=${product._id}&productName=${encodeURIComponent(product.name)}`}
                            style={{
                              display: "block",
                              width: "100%",
                              padding: "clamp(9px, 2.5vw, 11px)",
                              borderRadius: "50px",
                              border: "none",
                              fontWeight: 700,
                              fontSize: "clamp(12px, 3vw, 13px)",
                              textAlign: "center",
                              textDecoration: "none",
                              background: "#2563eb",
                              color: "#fff",
                              transition: "background 0.2s",
                            }}
                          >
                            {t(language, "products.requestQuote")}
                          </Link>
                          {/* PDF Download Button for "Request Quote" products */}
                          {product.technicalSpecificationPdf?.url && (
                            <a
                              href={product.technicalSpecificationPdf.url}
                              download={product.technicalSpecificationPdf.fileName || "technical-specifications.pdf"}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "6px",
                                width: "100%",
                                padding: "clamp(9px, 2.5vw, 11px)",
                                borderRadius: "50px",
                                border: "1.5px solid #e0e7ff",
                                fontWeight: 600,
                                fontSize: "clamp(12px, 3vw, 13px)",
                                textAlign: "center",
                                textDecoration: "none",
                                background: "#ffffff",
                                color: "#2563eb",
                                transition: "all 0.2s",
                                cursor: "pointer",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#eff6ff";
                                e.currentTarget.style.borderColor = "#2563eb";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = "#ffffff";
                                e.currentTarget.style.borderColor = "#e0e7ff";
                              }}
                              aria-label={`Download technical specifications PDF for ${product.name}`}
                              title="Download Technical Specifications PDF"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                              </svg>
                              {t(language, "products.downloadSpec")}
                            </a>
                          )}
                        </div>
                      ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "auto" }}>
                          <button
                            onClick={(e) => handleAddToCart(product, e)}
                            disabled={product.stock === 0}
                            style={{
                              width: "100%",
                              padding: "clamp(9px, 2.5vw, 11px)",
                              borderRadius: "50px",
                              border: "none",
                              fontWeight: 700,
                              fontSize: "clamp(12px, 3vw, 13px)",
                              cursor: product.stock === 0 ? "not-allowed" : "pointer",
                              background: addedId === product._id ? "#22c55e" : product.stock === 0 ? "#e2e8f0" : "#2563eb",
                              color: product.stock === 0 ? "#94a3b8" : "#fff",
                              transition: "background 0.2s",
                            }}
                          >
                            {addedId === product._id ? `✓ ${t(language, "products.added")}` : product.stock === 0 ? t(language, "products.outOfStock") : t(language, "products.addToCart")}
                          </button>
                          {/* PDF Download Button for fixed price products */}
                          {product.technicalSpecificationPdf?.url && (
                            <a
                              href={product.technicalSpecificationPdf.url}
                              download={product.technicalSpecificationPdf.fileName || "technical-specifications.pdf"}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "6px",
                                width: "100%",
                                padding: "clamp(9px, 2.5vw, 11px)",
                                borderRadius: "50px",
                                border: "1.5px solid #e0e7ff",
                                fontWeight: 600,
                                fontSize: "clamp(12px, 3vw, 13px)",
                                textAlign: "center",
                                textDecoration: "none",
                                background: "#ffffff",
                                color: "#2563eb",
                                transition: "all 0.2s",
                                cursor: "pointer",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#eff6ff";
                                e.currentTarget.style.borderColor = "#2563eb";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = "#ffffff";
                                e.currentTarget.style.borderColor = "#e0e7ff";
                              }}
                              aria-label={`Download technical specifications PDF for ${product.name}`}
                              title="Download Technical Specifications PDF"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                              </svg>
                              {t(language, "products.downloadSpec")}
                            </a>
                          )}
                        </div>
                      )}
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
