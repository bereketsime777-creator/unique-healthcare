import { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useCart } from "../context/CartContext";
import { useMetaTags, useJsonLd } from "../hooks/useMetaTags";
import { getSafeOptimizedImage } from "../utils/imageOptimizer";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  const getBaseUrl = useCallback(() => {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return import.meta.env.VITE_FRONTEND_URL || 'https://unique-healthcare.vercel.app';
  }, []);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await API.get(`/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to load product. Please try again.');
        console.error('Product fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  // Update meta tags when product loads
  useMetaTags({
    title: product ? `${product.name} | Unique Healthcare PLC` : 'Product Details | Unique Healthcare PLC',
    description: product?.description || 'Medical equipment from Unique Healthcare PLC',
    keywords: product ? `${product.name}, ${product.category}, ${product.manufacturer || 'medical equipment'}` : 'medical equipment',
    ogTitle: product?.name || 'Unique Healthcare Product',
    ogDescription: product?.description?.substring(0, 160) || 'High-quality certified medical equipment from Unique Healthcare PLC',
    ogImage: product?.image || `${getBaseUrl()}/logo.png`,
    ogUrl: `${getBaseUrl()}/products/${id}`,
    ogType: 'product',
    ogSiteName: 'Unique Healthcare PLC',
    twitterCard: 'summary_large_image',
    twitterTitle: product?.name || 'Unique Healthcare Product',
    twitterDescription: product?.description?.substring(0, 200) || 'Medical equipment from Unique Healthcare',
    twitterImage: product?.image || `${getBaseUrl()}/logo.png`,
    canonical: `${getBaseUrl()}/products/${id}`,
  });

  // Add JSON-LD structured data
  useJsonLd(product ? {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image || `${getBaseUrl()}/logo.png`,
    "brand": { "@type": "Brand", "name": "Unique Healthcare PLC" },
    "manufacturer": { "@type": "Organization", "name": product.manufacturer || "Unique Healthcare PLC" },
    "url": `${getBaseUrl()}/products/${id}`,
    ...(product.priceType === 'fixed' && product.price ? {
      "offers": {
        "@type": "Offer",
        "url": `${getBaseUrl()}/products/${id}`,
        "priceCurrency": "ETB",
        "price": product.price.toString(),
        "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
      }
    } : {})
  } : null);

  const inCart = cart.find((i) => i._id === product?._id);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }, [product, quantity, addToCart]);

  const handleQuantityChange = useCallback((newQuantity) => {
    setQuantity(Math.max(1, Math.min(product?.stock || 1, newQuantity)));
  }, [product?.stock]);

  // Loading state
  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid md:grid-cols-2 gap-8 animate-pulse">
            <div className="bg-gray-200 h-96 rounded-xl" />
            <div className="space-y-4">
              <div className="bg-gray-200 h-8 rounded w-3/4" />
              <div className="bg-gray-200 h-4 rounded w-1/2" />
              <div className="bg-gray-200 h-10 rounded w-1/3" />
              <div className="bg-gray-200 h-20 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error or not found state
  if (error || !product) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="text-5xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {error ? 'Could Not Load Product' : 'Product Not Found'}
          </h2>
          <p className="text-gray-600 mb-6">{error || 'This product does not exist.'}</p>
          <Link 
            to="/products" 
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm flex-wrap" aria-label="Breadcrumb">
            <Link 
              to="/" 
              className="text-gray-500 hover:text-blue-600 transition-colors font-medium flex items-center gap-1"
              aria-label="Home"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link 
              to="/products" 
              className="text-gray-500 hover:text-blue-600 transition-colors font-medium"
            >
              Products
            </Link>
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full text-xs">
              {product.category}
            </span>
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-800 font-medium truncate max-w-[200px] sm:max-w-md" aria-current="page">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Product Main Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Product Image */}
            <div className="bg-gray-50 flex items-center justify-center p-8 min-h-[420px] md:border-r border-gray-100">
              {product.image && product.image.startsWith("http") ? (
                <img
                  src={getSafeOptimizedImage(product.image, 'detail')}
                  alt={product.name}
                  className="max-h-80 w-full object-contain"
                  loading="lazy"
                  onError={(e) => { 
                    e.target.style.display = "none"; 
                    if (e.target.nextSibling) e.target.nextSibling.style.display = "flex"; 
                  }}
                />
              ) : null}
              <div
                style={{ display: product.image && product.image.startsWith("http") ? "none" : "flex" }}
                className="w-full h-full flex-col items-center justify-center text-gray-200 min-h-64"
                aria-label="Product image unavailable"
              >
                <svg className="w-24 h-24 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-gray-400">No image available</span>
              </div>
            </div>

            {/* Product Information */}
            <div className="p-8">
              <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                {product.category}
              </span>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>

              <p className="text-gray-500 text-sm mb-4">
                By <span className="font-semibold text-gray-700">{product.manufacturer || "Unknown Manufacturer"}</span>
              </p>

              {/* Compliance Badges */}
              {(product.compliance?.EFDA || product.compliance?.CE || product.compliance?.FDA) && (
                <div className="mb-5 flex flex-wrap gap-3">
                  {product.compliance?.EFDA && (
                    <div
                      className="flex items-center gap-2 px-3 py-2 bg-yellow-100 text-yellow-900 rounded-lg border border-yellow-300"
                      title="EFDA: Ethiopian Food and Drug Authority"
                      role="img"
                      aria-label="EFDA certified: Ethiopian Food and Drug Authority approval"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-bold">EFDA</span>
                    </div>
                  )}
                  {product.compliance?.CE && (
                    <div
                      className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-900 rounded-lg border border-blue-300"
                      title="CE: European conformity marking"
                      role="img"
                      aria-label="CE marked: European conformity certification"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-bold">CE</span>
                    </div>
                  )}
                  {product.compliance?.FDA && (
                    <div
                      className="flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-900 rounded-lg border border-purple-300"
                      title="FDA: U.S. Food and Drug Administration"
                      role="img"
                      aria-label="FDA approved: U.S. Food and Drug Administration certification"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-bold">FDA</span>
                    </div>
                  )}
                </div>
              )}

              {/* Models/Variants */}
              {product.model && (
                <div className="mb-5 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    Available Models / Variants:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.model.split(',').map((model, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-white text-blue-700 text-sm font-semibold rounded-lg border-2 border-blue-300 shadow-sm hover:shadow-md hover:border-blue-400 transition-all"
                      >
                        ✓ {model.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-5">
                {product.stock > 0 ? (
                  <span className="flex items-center gap-1.5 text-green-600 text-sm font-semibold">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-red-500 text-sm font-semibold">
                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Price Section */}
              <div className="mb-6">
                {product.priceType === 'quote' ? (
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                    <p className="text-lg font-bold text-blue-900 mb-1">Price Available on Request</p>
                    <p className="text-sm text-blue-700">Contact us for pricing and custom quotes</p>
                  </div>
                ) : (
                  <p className="text-3xl font-extrabold text-blue-600">
                    ETB {product.price?.toLocaleString()}
                  </p>
                )}
              </div>

              {/* Add to Cart / Request Quote */}
              {product.priceType === 'quote' ? (
                <Link
                  to={`/contact?subject=Request a Quote&productId=${product._id}&productName=${encodeURIComponent(product.name)}`}
                  className="block w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-bold text-center transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Request Proforma
                </Link>
              ) : product.stock > 0 ? (
                <div className="flex items-center gap-3 mb-6 flex-wrap">
                  {/* Quantity Selector */}
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 font-bold transition-colors"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="px-6 py-2 font-semibold text-gray-800 border-x border-gray-300 min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 font-bold transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                      added
                        ? "bg-green-500 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                    disabled={added}
                    aria-label={added ? "Added to cart" : "Add to cart"}
                  >
                    {added ? (
                      <>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to Cart
                      </>
                    )}
                  </button>

                  {/* View Cart Button */}
                  {inCart && (
                    <button
                      onClick={() => navigate("/cart")}
                      className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                      View Cart
                    </button>
                  )}
                </div>
              ) : null}

              {/* Trust Badges */}
              <div className="border-t border-gray-100 pt-5 grid grid-cols-2 gap-3">
                {[
                  { icon: "✓", text: "Genuine Product" },
                  { icon: "🚚", text: "Fast Delivery" },
                  { icon: "🛡️", text: "Warranty Support" },
                  { icon: "↩️", text: "Easy Returns" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-xs text-gray-600">
                    <span aria-hidden="true">{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {["description", "specifications", ...(product.technicalSpecificationPdf?.url ? ["pdf"] : [])].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-semibold capitalize transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
                aria-selected={activeTab === tab}
                role="tab"
              >
                {tab === "pdf" ? "Technical Specifications" : tab}
              </button>
            ))}
          </div>
          <div className="p-6">
            {activeTab === "description" && (
              <div>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {product.description || "No description available for this product."}
                </p>
              </div>
            )}
            {activeTab === "specifications" && (
              <div>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {product.specifications || "No specifications available for this product."}
                </p>
              </div>
            )}
            {activeTab === "pdf" && product.technicalSpecificationPdf?.url && (
              <div className="space-y-4">
                <p className="text-gray-700">Technical Specifications PDF Document</p>
                <a
                  href={product.technicalSpecificationPdf.url}
                  download={product.technicalSpecificationPdf.fileName || "technical-specifications.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2m0 0v-8m0 8H3m0 0h18" />
                  </svg>
                  Download {product.technicalSpecificationPdf.fileName ? `(${product.technicalSpecificationPdf.fileName})` : "PDF"}
                </a>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductDetails;
