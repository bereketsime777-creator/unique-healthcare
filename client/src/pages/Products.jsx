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
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <span className="text-gray-800">Products</span>
            {categoryQuery && (
              <>
                <span>/</span>
                <span className="text-blue-600">{categoryQuery}</span>
              </>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {categoryQuery || "All Healthcare Products"}
          </h1>
        </div>
      </div>

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
                            style={{ color: '#ffffff' }}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded-full text-xs font-semibold text-center transition-colors"
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
