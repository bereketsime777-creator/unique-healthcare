import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((r) => setProduct(r.data))
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [id]);

  const inCart = cart.find((i) => i._id === product?._id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-8 animate-pulse">
          <div className="bg-gray-200 h-96 rounded-xl" />
          <div className="space-y-4">
            <div className="bg-gray-200 h-8 rounded w-3/4" />
            <div className="bg-gray-200 h-4 rounded w-1/2" />
            <div className="bg-gray-200 h-10 rounded w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">😕</div>
        <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
        <Link to="/products" className="text-blue-600 hover:underline">← Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-blue-600">Products</Link>
          <span>/</span>
          <span className="text-gray-400">{product.category}</span>
          <span>/</span>
          <span className="text-gray-800 truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Product Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left: Image */}
            <div className="bg-gray-50 flex items-center justify-center p-8 min-h-[420px] border-r border-gray-100">
              {product.image && product.image.startsWith("http") ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-80 object-contain"
                  onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                />
              ) : null}
              <div
                style={{ display: product.image && product.image.startsWith("http") ? "none" : "flex" }}
                className="w-full h-full flex-col items-center justify-center text-gray-200 min-h-64"
              >
                <svg className="w-24 h-24 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-gray-400">No image available</span>
              </div>
            </div>

            {/* Right: Info */}
            <div className="p-8">
              <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                {product.category}
              </span>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>

              <p className="text-gray-500 text-sm mb-4">
                By <span className="font-semibold text-gray-700">{product.manufacturer || "Unknown"}</span>
              </p>

              {/* Stock */}
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

              {/* Price */}
              <div className="mb-6">
                <p className="text-3xl font-extrabold text-blue-600">
                  ETB {product.price?.toLocaleString()}
                </p>
              </div>

              {/* Quantity + Cart */}
              {product.stock > 0 && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 font-bold"
                    >
                      −
                    </button>
                    <span className="px-4 py-2 font-semibold text-gray-800 border-x border-gray-300">
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
                    className={`flex-1 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                      added
                        ? "bg-green-500 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {added ? (
                      <>✓ Added to Cart</>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to Cart
                      </>
                    )}
                  </button>

                  {inCart && (
                    <button
                      onClick={() => navigate("/cart")}
                      className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-lg font-semibold transition-colors"
                    >
                      View Cart
                    </button>
                  )}
                </div>
              )}

              {/* Trust icons */}
              <div className="border-t border-gray-100 pt-5 grid grid-cols-2 gap-3">
                {[
                  { icon: "✓", text: "Genuine Product" },
                  { icon: "🚚", text: "Fast Delivery" },
                  { icon: "🛡️", text: "Warranty Support" },
                  { icon: "↩️", text: "Easy Returns" },
                ].map((t) => (
                  <div key={t.text} className="flex items-center gap-2 text-xs text-gray-600">
                    <span>{t.icon}</span>
                    <span>{t.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs: Description / Specifications */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex border-b border-gray-200">
            {["description", "specifications"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-semibold capitalize transition-colors ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-6">
            {activeTab === "description" ? (
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {product.description || "No description available for this product."}
              </p>
            ) : (
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {product.specifications || "No specifications available for this product."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
