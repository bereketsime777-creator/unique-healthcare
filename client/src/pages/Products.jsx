import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import API from "../services/api";
import { useCart } from "../context/CartContext";
import { PRODUCT_CATEGORIES, normalizeCategory } from "../constants/categories";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState(null);
  const [sortBy, setSortBy] = useState("default");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "";
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = {};
        if (searchQuery) params.search = searchQuery;
        if (categoryQuery) params.category = categoryQuery;
        const res = await API.get("/products", { params });
        setProducts(
          res.data.map((p) => ({
            ...p,
            category: normalizeCategory(p.category),
          }))
        );
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
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
          padding: "64px 0",
          textAlign: "center",
          position: "relative",
          minHeight: "50vh",
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
              fontSize: "14px", 
              letterSpacing: "4px", 
              textTransform: "uppercase", 
              marginBottom: "20px",
              opacity: 0.9
            }}>
              Browse Our Complete Catalog
            </p>
            <h1 style={{ 
              color: "#ffffff", 
              fontWeight: 900, 
              fontSize: "clamp(32px, 5vw, 48px)", 
              margin: "0 0 16px",
              lineHeight: 1.2,
              textShadow: "0 4px 20px rgba(0,0,0,0.3)"
            }}>
              {categoryQuery || "Premium Medical Equipment"}
            </h1>
            <p style={{ 
              color: "#ffffff", 
              fontSize: "16px", 
              lineHeight: 1.7, 
              margin: "0 auto 24px",
              maxWidth: "650px",
              opacity: 0.95,
              textShadow: "0 2px 8px rgba(0,0,0,0.2)"
            }}>
              {categoryQuery 
                ? `Explore our range of ${categoryQuery.toLowerCase()} products from leading manufacturers`
                : "500+ certified medical devices from globally recognized brands"}
            </p>
            {categoryQuery && (
              <div className="flex items-center gap-2 justify-center text-sm" style={{ color: "#ffffff", opacity: 0.9 }}>
                <Link to="/" style={{ color: "#ffffff", textDecoration: "none" }}>Home</Link>
                <span>/</span>
                <Link to="/products" style={{ color: "#ffffff", textDecoration: "none" }}>Products</Link>
                <span>/</span>
                <span style={{ fontWeight: 600 }}>{categoryQuery}</span>
              </div>
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{
          position: "absolute",
          bottom: "30px",
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

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 mb-6">
          <input
            type="text"
            placeholder="Search products, brands or categories..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md text-sm font-semibold transition-colors"
          >
            Search
          </button>
          {(searchQuery || categoryQuery) && (
            <button
              type="button"
              onClick={() => { setLocalSearch(""); setSearchParams({}); }}
              className="border border-gray-300 text-gray-600 hover:bg-gray-100 px-4 py-2.5 rounded-md text-sm transition-colors"
            >
              Clear
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
              {filtersOpen ? "Hide Categories ✕" : "Show Categories ☰"}
            </button>
            <div className={`products-sidebar-inner ${filtersOpen ? "" : "collapsed"}`}>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden md:block">
              <div className="bg-blue-600 text-white px-4 py-3 font-semibold text-sm">
                Categories
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
                  All Products
                </button>
                {PRODUCT_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      categoryQuery === cat
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {cat}
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
                {loading ? "Loading..." : `${products.length} product${products.length !== 1 ? "s" : ""} found`}
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 w-full sm:w-auto"
              >
                <option value="default">Sort: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
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
                <h3 className="text-xl font-bold text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filter</p>
                <button
                  onClick={() => { setLocalSearch(""); setSearchParams({}); }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-semibold"
                >
                  Clear Filters
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
                            src={product.image}
                            alt={product.name}
                            className="h-40 object-contain group-hover:scale-105 transition-transform duration-300"
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
                      <p className="text-xs text-blue-600 font-semibold mb-1 truncate">{product.category}</p>
                      <Link to={`/products/${product._id}`}>
                        <h3 className="text-sm font-semibold text-gray-900 mb-1 hover:text-blue-600 transition-colors line-clamp-2 min-h-[2.5rem] leading-snug">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-gray-400 mb-2">{product.manufacturer}</p>

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
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}>
                          {product.stock > 0 ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>

                      <div className="flex gap-1.5">
                        <Link
                          to={`/products/${product._id}`}
                          className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 py-1.5 rounded-full text-xs font-semibold text-center transition-colors"
                        >
                          Details
                        </Link>
                        {product.priceType === 'quote' ? (
                          <Link
                            to="/contact"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded-full text-xs font-semibold text-center transition-colors"
                            style={{ color: '#ffffff' }}
                          >
                            Request Quote
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
                            {addedId === product._id ? "✓ Added" : "Add to Cart"}
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
