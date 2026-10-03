import { useEffect, useState } from "react";
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
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [imageZoomed, setImageZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Get base URL for absolute OG URLs
  const getBaseUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return process.env.VITE_FRONTEND_URL || 'https://unique-healthcare.vercel.app';
  };

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((r) => setProduct(r.data))
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [id]);

  // Update meta tags when product loads
  useMetaTags({
    title: product ? `${product.name} | Unique Healthcare PLC` : 'Product Details | Unique Healthcare PLC',
    description: product?.description || 'Medical equipment from Unique Healthcare PLC',
    keywords: product ? `${product.name}, ${product.category}, ${product.manufacturer || 'medical equipment'}` : 'medical equipment',
    
    // OpenGraph tags for social sharing
    ogTitle: product?.name || 'Unique Healthcare Product',
    ogDescription: product?.description?.substring(0, 160) || 'High-quality certified medical equipment from Unique Healthcare PLC',
    ogImage: product?.image || `${getBaseUrl()}/logo.png`,
    ogUrl: `${getBaseUrl()}/products/${id}`,
    ogType: 'product',
    ogSiteName: 'Unique Healthcare PLC',
    
    // Twitter Card tags
    twitterCard: 'summary_large_image',
    twitterTitle: product?.name || 'Unique Healthcare Product',
    twitterDescription: product?.description?.substring(0, 200) || 'Medical equipment from Unique Healthcare',
    twitterImage: product?.image || `${getBaseUrl()}/logo.png`,
    
    // Canonical URL
    canonical: `${getBaseUrl()}/products/${id}`,
  });

  // Add JSON-LD structured data for Product schema
  useJsonLd(product ? {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image || `${getBaseUrl()}/logo.png`,
    "brand": {
      "@type": "Brand",
      "name": "Unique Healthcare PLC"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": product.manufacturer || "Unique Healthcare PLC"
    },
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

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Handle image zoom
  const handleImageMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
        {/* Breadcrumb skeleton */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex gap-2 h-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-16" />
              <div className="h-4 bg-gray-200 rounded w-24" />
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid md:grid-cols-3 gap-8 animate-pulse">
            <div className="md:col-span-2 bg-gray-200 h-96 rounded-2xl" />
            <div className="space-y-4">
              <div className="bg-gray-200 h-8 rounded w-3/4" />
              <div className="bg-gray-200 h-4 rounded w-1/2" />
              <div className="bg-gray-200 h-32 rounded w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-24 bg-gradient-to-b from-blue-50 to-white min-h-screen">
        <div className="text-6xl mb-4">📦</div>
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Product Not Found</h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">The product you're looking for is no longer available or has been removed.</p>
        <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* ═══════════════════ BREADCRUMB NAVIGATION ═══════════════════ */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <Link 
              to="/" 
              className="text-gray-500 hover:text-blue-600 transition-colors font-medium flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
            <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link 
              to="/products" 
              className="text-gray-500 hover:text-blue-600 transition-colors font-medium"
            >
              Products
            </Link>
            <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-semibold text-xs">
              {product.category}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 md:py-16">
        {/* ═══════════════════ MAIN PRODUCT LAYOUT ═══════════════════ */}
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* ───────────────── LEFT: PRODUCT GALLERY ───────────────── */}
          <div className="md:col-span-2">
            <div 
              className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden"
              onMouseMove={handleImageMouseMove}
              onMouseEnter={() => setImageZoomed(true)}
              onMouseLeave={() => setImageZoomed(false)}
            >
              <div className="relative w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center group overflow-hidden">
                {product.image && product.image.startsWith("http") ? (
                  <img
                    src={getSafeOptimizedImage(product.image, 'detail')}
                    alt={product.name}
                    className={`object-contain h-full w-full transition-transform duration-300 ${imageZoomed ? 'scale-150' : 'scale-100'}`}
                    style={imageZoomed ? {
                      transformOrigin: `${mousePos.x}% ${mousePos.y}%`
                    } : {}}
                    onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                  />
                ) : null}
                <div
                  style={{ display: product.image && product.image.startsWith("http") ? "none" : "flex" }}
                  className="w-full h-full flex-col items-center justify-center text-gray-300 bg-gradient-to-br from-gray-50 to-gray-100"
                >
                  <svg className="w-20 h-20 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm text-gray-400">No image available</span>
                </div>
                {product.image && (
                  <div className="absolute top-4 right-4 bg-gray-900 bg-opacity-60 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                    </svg>
                    Hover to zoom
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ───────────────── RIGHT: PRODUCT INFO SECTION ───────────────── */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 h-full">
              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-block bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-900 text-xs font-bold px-4 py-2 rounded-full border border-blue-200">
                  {product.category}
                </span>
              </div>

              {/* Product Name */}
              <h1 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">
                {product.name}
              </h1>

              {/* Manufacturer */}
              {product.manufacturer && (
                <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v-1h8v1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  <strong className="text-gray-900">{product.manufacturer}</strong>
                </p>
              )}

              {/* Divider */}
              <div className="border-t border-gray-200 my-4"></div>

              {/* Key Product Details Grid */}
              <div className="space-y-3 mb-6">
                {product.model && (
                  <div className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold text-sm flex-shrink-0">📋</span>
                    <div>
                      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Model</p>
                      <p className="text-sm font-bold text-gray-900">{product.model}</p>
                    </div>
                  </div>
                )}

                {product.storekeepingId && (
                  <div className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold text-sm flex-shrink-0">🏷️</span>
                    <div>
                      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">SKU / Product Code</p>
                      <p className="text-sm font-mono font-bold text-gray-900">{product.storekeepingId}</p>
                    </div>
                  </div>
                )}

                {/* Stock Status */}
                <div className="flex items-start gap-3">
                  <span className={`text-lg flex-shrink-0 ${product.stock > 0 ? '✅' : '❌'}`}></span>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Stock Status</p>
                    <p className={`text-sm font-bold ${product.stock > 0 ? 'text-green-700' : 'text-red-700'}`}>
                      {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-4"></div>

              {/* Compliance Badges */}
              {(product.compliance?.EFDA || product.compliance?.CE || product.compliance?.FDA) && (
                <div className="mb-6">
                  <p className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">Certifications</p>
                  <div className="flex flex-wrap gap-2">
                    {product.compliance?.EFDA && (
                      <div className="flex items-center gap-2 px-3 py-2 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-200 text-xs font-bold" title="Ethiopian Food and Drug Authority">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 3.062v6.757a1 1 0 01-.267 2.693H3.462a1 1 0 01-.267-2.693v-6.757a3.066 3.066 0 012.812-3.062zM9 11a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                        </svg>
                        EFDA
                      </div>
                    )}
                    {product.compliance?.CE && (
                      <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-800 rounded-lg border border-blue-200 text-xs font-bold" title="European Conformity">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 3.062v6.757a1 1 0 01-.267 2.693H3.462a1 1 0 01-.267-2.693v-6.757a3.066 3.066 0 012.812-3.062zM9 11a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                        </svg>
                        CE
                      </div>
                    )}
                    {product.compliance?.FDA && (
                      <div className="flex items-center gap-2 px-3 py-2 bg-purple-50 text-purple-800 rounded-lg border border-purple-200 text-xs font-bold" title="FDA Approved">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 3.062v6.757a1 1 0 01-.267 2.693H3.462a1 1 0 01-.267-2.693v-6.757a3.066 3.066 0 012.812-3.062zM9 11a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                        </svg>
                        FDA
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="border-t border-gray-200 my-4"></div>

              {/* Price Section */}
              <div className="mb-6">
                {product.priceType === 'quote' ? (
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4">
                    <p className="text-xs font-bold text-blue-900 uppercase tracking-wide mb-1">Pricing Model</p>
                    <p className="text-xl font-extrabold text-blue-900 mb-2">Request a Quote</p>
                    <p className="text-sm text-blue-800">Contact us for custom pricing and bulk discounts</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">Price</p>
                    <p className="text-4xl font-extrabold text-blue-600">
                      ETB {product.price?.toLocaleString()}
                    </p>
                    {product.stock > 0 && (
                      <p className="text-xs text-gray-500 mt-2">Including all applicable taxes</p>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {product.priceType === 'quote' ? (
                  <Link
                    to={`/contact?subject=Request a Quote&productId=${product._id}&productName=${encodeURIComponent(product.name)}`}
                    className="block w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-center transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Request a Quote
                  </Link>
                ) : (
                  <>
                    {product.stock > 0 && (
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden bg-white">
                          <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="px-3 py-2 text-gray-600 hover:bg-gray-100 font-bold"
                          >
                            −
                          </button>
                          <span className="px-4 py-2 font-bold text-gray-800 border-x-2 border-gray-300 min-w-12 text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                            className="px-3 py-2 text-gray-600 hover:bg-gray-100 font-bold"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={handleAddToCart}
                          className={`flex-1 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg ${
                            added
                              ? "bg-green-500 hover:bg-green-600 text-white"
                              : "bg-blue-600 hover:bg-blue-700 text-white"
                          }`}
                        >
                          {added ? (
                            <>
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              Added to Cart
                            </>
                          ) : (
                            <>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                              Add to Cart
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    <Link
                      to={`/contact?subject=Request Information&productId=${product._id}&productName=${encodeURIComponent(product.name)}`}
                      className="block w-full py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-xl font-bold text-center transition-all"
                    >
                      Request Information
                    </Link>

                    {product.technicalSpecificationPdf?.url && (
                      <a
                        href={product.technicalSpecificationPdf.url}
                        download={product.technicalSpecificationPdf.fileName || "technical-specifications.pdf"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-bold text-center transition-all"
                      >
                        <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Download Specs
                      </a>
                    )}

                    {inCart && (
                      <button
                        onClick={() => navigate("/cart")}
                        className="w-full py-3 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-2 border-green-300 hover:from-green-100 hover:to-emerald-100 rounded-xl font-bold transition-all"
                      >
                        View Cart
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* Trust Indicators */}
              <div className="border-t border-gray-200 mt-6 pt-4 grid grid-cols-2 gap-2">
                {[
                  { icon: "✓", text: "Genuine" },
                  { icon: "🚚", text: "Fast Delivery" },
                  { icon: "🛡️", text: "Warranty" },
                  { icon: "↩️", text: "Easy Returns" },
                ].map((t) => (
                  <div key={t.text} className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-lg">
                    <span className="text-sm">{t.icon}</span>
                    <span className="font-medium">{t.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════ SPECIFICATIONS TABLE ═══════════════════ */}
        {product.specifications && (
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden mb-10">
            <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                Technical Specifications
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <tbody>
                  {product.model && (
                    <tr className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                      <td className="px-8 py-4 font-bold text-gray-900 bg-gray-50 w-1/3">Model</td>
                      <td className="px-8 py-4 text-gray-700">{product.model}</td>
                    </tr>
                  )}
                  {product.category && (
                    <tr className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                      <td className="px-8 py-4 font-bold text-gray-900 bg-gray-50 w-1/3">Category</td>
                      <td className="px-8 py-4 text-gray-700">{product.category}</td>
                    </tr>
                  )}
                  {product.manufacturer && (
                    <tr className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                      <td className="px-8 py-4 font-bold text-gray-900 bg-gray-50 w-1/3">Manufacturer</td>
                      <td className="px-8 py-4 text-gray-700">{product.manufacturer}</td>
                    </tr>
                  )}
                  {product.storekeepingId && (
                    <tr className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                      <td className="px-8 py-4 font-bold text-gray-900 bg-gray-50 w-1/3">SKU / Product Code</td>
                      <td className="px-8 py-4 text-gray-700 font-mono">{product.storekeepingId}</td>
                    </tr>
                  )}
                  {product.specifications && (
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="px-8 py-4 font-bold text-gray-900 bg-gray-50 w-1/3 align-top">Specifications</td>
                      <td className="px-8 py-4 text-gray-700 whitespace-pre-wrap">{product.specifications}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ═══════════════════ DESCRIPTION & DOCUMENTS TABS ═══════════════════ */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-200 bg-gray-50">
            {["description", ...(product.technicalSpecificationPdf?.url ? ["documents"] : [])].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-bold capitalize transition-all ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-600 bg-white"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {tab === "documents" ? "📄 Technical Documents" : "📝 Description"}
              </button>
            ))}
          </div>
          
          <div className="p-8">
            {activeTab === "description" && (
              <div>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                  {product.description || "No description available for this product."}
                </p>
              </div>
            )}

            {activeTab === "documents" && product.technicalSpecificationPdf?.url && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center border-2 border-blue-300">
                      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Technical Specifications PDF</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Download the complete technical documentation for this medical equipment.
                      </p>
                      <a
                        href={product.technicalSpecificationPdf.url}
                        download={product.technicalSpecificationPdf.fileName || "technical-specifications.pdf"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors shadow-md hover:shadow-lg"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download PDF
                      </a>
                      {product.technicalSpecificationPdf.fileName && (
                        <p className="text-xs text-gray-500 mt-2">File: {product.technicalSpecificationPdf.fileName}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
