import { useEffect, useMemo, useState, useCallback } from "react";
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
  const [error, setError] = useState(null);
  const [addedId, setAddedId] = useState(null);
  const [sortBy, setSortBy] = useState("default");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "";
  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Filter products by search and category
  const performClientSearch = useCallback((products, searchTerm, selectedCategory) => {
    if (!searchTerm && !selectedCategory) {
      return products;
    }

    return products.filter((product) => {
      const categoryMatch = !selectedCategory || product.category === selectedCategory;
      if (!categoryMatch) return false;
      if (!searchTerm) return true;

      const normalizedSearch = searchTerm.toLowerCase().trim();
      return (
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch) ||
        (product.manufacturer && product.manufacturer.toLowerCase().includes(normalizedSearch)) ||
        (product.model && product.model.toLowerCase().includes(normalizedSearch))
      );
    });
  }, []);

  const getBaseUrl = useCallback(() => {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return import.meta.env.VITE_FRONTEND_URL || 'https://unique-healthcare.vercel.app';
  }, []);

  // Set meta tags
  useMetaTags({
    title: categoryQuery ? `${categoryQuery} | Unique Healthcare` : 'Medical Equipment & Supplies | Unique Healthcare',
    description: categoryQuery 
      ? `Browse our range of ${categoryQuery.toLowerCase()} products from leading manufacturers. Fast delivery across Ethiopia.`
      : 'Browse 400+ certified medical devices from globally recognized brands. Hospital equipment, surgical instruments, diagnostic tools and more.',
    keywords: `${categoryQuery || 'medical equipment'}, healthcare supplies, ${categoryQuery || 'products'}, Ethiopia`,
    ogTitle: categoryQuery ? `${categoryQuery} Products | Unique Healthcare` : 'Medical Products | Unique Healthcare',
    ogDescription: 'Browse our complete catalog of certified medical equipment and healthcare supplies',
    ogImage: `${getBaseUrl()}/logo.png`,
    ogUrl: `${getBaseUrl()}/products${categoryQuery ? `?category=${encodeURIComponent(categoryQuery)}` : ''}`,
    ogType: 'website',
    ogSiteName: 'Unique Healthcare PLC',
    twitterCard: 'summary',
    twitterTitle: 'Medical Products | Unique Healthcare',
    twitterDescription: 'Browse certified medical equipment and healthcare supplies',
    twitterImage: `${getBaseUrl()}/logo.png`,
    canonical: `${getBaseUrl()}/products${categoryQuery ? `?category=${encodeURIComponent(categoryQuery)}` : ''}`,
  });

  // Fetch categories and products
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
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
      } catch (err) {
        setError('Failed to load products. Please try again.');
        console.error("Error fetching data:", err);
        setProducts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [searchQuery, categoryQuery]);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    const params = {};
    if (localSearch) params.search = localSearch;
    if (categoryQuery) params.category = categoryQuery;
    setSearchParams(params);
  }, [localSearch, categoryQuery, setSearchParams]);

  const handleCategory = useCallback((cat) => {
    const params = {};
    if (localSearch) params.search = localSearch;
    if (cat) params.category = cat;
    setSearchParams(params);
  }, [localSearch, setSearchParams]);

  const handleAddToCart = useCallback((product, e) => {
    e.preventDefault();
    addToCart(product);
    setAddedId(product._id);
    setTimeout(() => setAddedId(null), 1500);
  }, [addToCart]);

  const sortedProducts = useMemo(() => {
    const filtered = performClientSearch(products, localSearch, categoryQuery);
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
        return list.sort((a, b) => {
          const aPrice = a.priceType === 'quote' ? Infinity : (a.price || 0);
          const bPrice = b.priceType === 'quote' ? Infinity : (b.price || 0);
          return aPrice - bPrice;
        });
      case "price-desc":
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
        return list.sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );
    }
  }, [products, localSearch, categoryQuery, sortBy, performClientSearch]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-12 md:py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(/images/hero1.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <p className="text-white font-bold text-xs md:text-sm tracking-widest uppercase opacity-90 mb-3">
              {t(language, "products.browseTag")}
            </p>
            <h1 className="text-white font-bold text-3xl md:text-4xl lg:text-5xl mb-3 leading-tight">
              {categoryQuery || t(language, "products.allProducts")}
            </h1>
            <p className="text-blue-100 text-sm md:text-base lg:text-lg max-w-2xl mx-auto mb-4">
              {categoryQuery 
                ? t(language, "products.categoryDesc").replace("{category}", categoryQuery.toLowerCase())
                : t(language, "products.defaultDesc")}
            </p>
            {categoryQuery && (
              <div className="flex items-center justify-center gap-2 text-sm text-blue-100 flex-wrap">
                <Link to="/" className="hover:text-white transition-colors">{t(language, "nav.home")}</Link>
                <span>/</span>
                <Link to="/products" className="hover:text-white transition-colors">{t(language, "nav.products")}</Link>
                <span>/</span>
                <span className="font-semibold text-white">{categoryQuery}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex flex-col gap-3">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder={t(language, "products.search")}
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                aria-label="Search products by name, category, manufacturer, or model"
              />
              {localSearch && (
                <button
                  type="button"
                  onClick={() => setLocalSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                  title="Clear search"
                  aria-label="Clear search input"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>

            {/* Search and Clear Buttons */}
            <div className="flex gap-3 flex-wrap">
              <button
                type="submit"
                className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors"
              >
                {t(language, "products.searchButton")}
              </button>
              
              {(searchQuery || categoryQuery) && (
                <button
                  type="button"
                  onClick={() => { setLocalSearch(""); setSearchParams({}); }}
                  className="flex-1 sm:flex-none border border-gray-300 text-gray-600 hover:bg-gray-100 px-6 py-3 rounded-lg text-sm font-semibold transition-colors"
                  title="Clear all filters"
                  aria-label="Clear all filters"
                >
                  {t(language, "products.clear")}
                </button>
              )}
            </div>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar - Categories */}
          <aside className="md:col-span-1">
            <button
              type="button"
              onClick={() => setFiltersOpen((p) => !p)}
              className="w-full md:hidden bg-blue-600 text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors mb-4"
              aria-expanded={filtersOpen}
              aria-controls="category-list"
            >
              {filtersOpen ? t(language, "products.hideCategories") : t(language, "products.showCategories")}
            </button>

            <div className={`${filtersOpen ? "" : "hidden md:block"}`}>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                <div className="bg-blue-600 text-white px-4 py-3 font-semibold text-sm">
                  {t(language, "products.categories")}
                </div>
                <nav id="category-list" className="p-2 space-y-1">
                  <button
                    onClick={() => {
                      handleCategory("");
                      if (window.innerWidth <= 768) {
                        setFiltersOpen(false);
                      }
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all font-medium ${
                      !categoryQuery
                        ? "bg-blue-50 text-blue-600 font-semibold border-l-4 border-l-blue-600"
                        : "text-gray-700 hover:bg-gray-50 border-l-4 border-l-transparent"
                    }`}
                    aria-current={!categoryQuery ? "page" : undefined}
                  >
                    {t(language, "products.allProductsFilter")}
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat._id || cat.name}
                      onClick={() => {
                        handleCategory(cat.name);
                        if (window.innerWidth <= 768) {
                          setFiltersOpen(false);
                        }
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all font-medium ${
                        categoryQuery === cat.name
                          ? "bg-blue-50 text-blue-600 font-semibold border-l-4 border-l-blue-600"
                          : "text-gray-700 hover:bg-gray-50 border-l-4 border-l-transparent"
                      }`}
                      aria-current={categoryQuery === cat.name ? "page" : undefined}
                      title={cat.name}
                    >
                      {cat.name}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          {/* Main Content - Products */}
          <div className="md:col-span-3">
            {/* Results and Sort Bar */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <p className="text-sm text-gray-600 font-medium">
                {loading 
                  ? t(language, "products.loading") 
                  : t(language, "products.productsFound").replace("{count}", sortedProducts.length)}
              </p>
              <div className="flex items-center gap-2">
                <label htmlFor="sort-select" className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  Sort by:
                </label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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

            {/* Product Grid */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
                    <div className="bg-gray-200 h-40 w-full" />
                    <div className="p-4 space-y-3">
                      <div className="bg-gray-200 h-4 rounded w-3/4" />
                      <div className="bg-gray-200 h-3 rounded w-1/2" />
                      <div className="bg-gray-200 h-8 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <div className="text-4xl mb-4">⚠️</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Error Loading Products</h3>
                <p className="text-gray-600 mb-6">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{t(language, "products.noProducts")}</h3>
                <p className="text-gray-600 mb-6">
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
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  {t(language, "products.clearFilters")}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {sortedProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full"
                  >
                    {/* Product Image */}
                    <Link to={`/products/${product._id}`} className="flex-shrink-0">
                      <div className="bg-gray-50 flex items-center justify-center overflow-hidden h-40 md:h-48">
                        {product.image && product.image.startsWith("http") ? (
                          <img
                            src={getSafeOptimizedImage(product.image, 'card')}
                            alt={product.name}
                            className="w-full h-full object-contain p-2"
                            loading="lazy"
                            onError={(e) => {
                              e.target.style.display = "none";
                              if (e.target.nextSibling) e.target.nextSibling.style.display = "flex";
                            }}
                          />
                        ) : null}
                        <div
                          style={{ display: product.image && product.image.startsWith("http") ? "none" : "flex" }}
                          className="w-full h-full flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50"
                        >
                          <span className="text-3xl mb-2">🏥</span>
                          <span className="text-xs font-semibold text-blue-300">Medical Equipment</span>
                        </div>
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="p-3 md:p-4 flex flex-col flex-grow">
                      <Link to={`/products/${product._id}`} className="mb-2">
                        <h3 className="font-bold text-sm md:text-base text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>
                      </Link>

                      <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full mb-2 self-start uppercase">
                        {product.category}
                      </span>

                      {product.manufacturer && (
                        <p className="text-xs md:text-sm text-gray-600 mb-2 font-medium">{product.manufacturer}</p>
                      )}

                      {/* Compliance Badges */}
                      {(product.compliance?.EFDA || product.compliance?.CE || product.compliance?.FDA) && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {product.compliance?.EFDA && (
                            <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded border border-yellow-300" title="EFDA certified">
                              EFDA
                            </span>
                          )}
                          {product.compliance?.CE && (
                            <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded border border-blue-300" title="CE marked">
                              CE
                            </span>
                          )}
                          {product.compliance?.FDA && (
                            <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 text-xs font-bold px-2 py-1 rounded border border-purple-300" title="FDA approved">
                              FDA
                            </span>
                          )}
                        </div>
                      )}

                      {/* PDF Badge */}
                      {product.technicalSpecificationPdf?.url && (
                        <div className="mb-3">
                          <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-semibold px-2 py-1 rounded border border-green-200">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                              <polyline points="14 2 14 8 20 8" />
                            </svg>
                            PDF
                          </span>
                        </div>
                      )}

                      {/* Price and Action - Fill remaining space */}
                      <div className="mt-auto pt-3 border-t border-gray-200">
                        {product.priceType === 'quote' ? (
                          <p className="text-blue-600 font-bold text-xs md:text-sm mb-2">
                            {t(language, "products.priceOnRequest")}
                          </p>
                        ) : (
                          <p className="text-blue-700 font-bold text-sm md:text-base mb-2">
                            ETB {product.price?.toLocaleString()}
                          </p>
                        )}

                        {product.priceType === 'quote' ? (
                          <Link
                            to={`/contact?subject=Request a Quote&productId=${product._id}&productName=${encodeURIComponent(product.name)}`}
                            className="block w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-bold text-center rounded transition-colors"
                          >
                            {t(language, "products.requestQuote")}
                          </Link>
                        ) : (
                          <button
                            onClick={(e) => handleAddToCart(product, e)}
                            disabled={product.stock === 0}
                            className={`w-full py-2 text-xs md:text-sm font-bold rounded transition-colors ${
                              addedId === product._id
                                ? "bg-green-500 text-white"
                                : product.stock === 0
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                            aria-label={product.stock === 0 ? "Out of stock" : "Add to cart"}
                          >
                            {addedId === product._id 
                              ? `✓ ${t(language, "products.added")}`
                              : product.stock === 0
                              ? t(language, "products.outOfStock")
                              : t(language, "products.addToCart")}
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
