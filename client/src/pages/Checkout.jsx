import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Checkout() {
  const navigate = useNavigate();
  const { cart, totalPrice } = useCart();
  const { token, user } = useAuth();

  const [form, setForm] = useState({ fullName: "", phone: "", city: "", subCity: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setError("");
    if (cart.length === 0) { setError("Your cart is empty."); return; }
    try {
      setLoading(true);
      const items = cart.map((item) => ({
        product: item._id, name: item.name, image: item.image, price: item.price, quantity: item.quantity,
      }));
      const paymentResponse = await API.post("/payment/initialize", {
        amount: totalPrice, email: user?.email, first_name: form.fullName, phone_number: form.phone,
      });
      if (paymentResponse.data.status === "success") {
        localStorage.setItem("pendingOrder", JSON.stringify({
          items, totalAmount: totalPrice, shippingAddress: form, tx_ref: paymentResponse.data.tx_ref,
        }));
        window.location.href = paymentResponse.data.checkout_url;
      }
    } catch (err) {
      setError(err.response?.data?.message || "Payment initialization failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) return null;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link to="/cart" className="hover:text-blue-600">Cart</Link>
            <span>/</span>
            <span className="text-gray-800">Checkout</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Steps */}
        <div className="flex items-center gap-2 mb-8">
          {["Cart", "Shipping", "Payment"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                i <= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
              }`}>
                {i < 1 ? "✓" : i + 1}
              </div>
              <span className={`text-sm font-medium ${i <= 1 ? "text-blue-600" : "text-gray-400"}`}>{step}</span>
              {i < 2 && <div className={`w-10 h-0.5 ${i < 1 ? "bg-blue-600" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <p className="text-gray-500 mb-4">Your cart is empty.</p>
            <Link to="/products" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Shipping Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  Shipping Details
                </h2>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mb-4 text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleCheckout} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required
                        placeholder="Enter your full name"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                      <input type="text" name="phone" value={form.phone} onChange={handleChange} required
                        placeholder="+251 9XX XXX XXX"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                      <input type="text" name="city" value={form.city} onChange={handleChange} required
                        placeholder="e.g. Addis Ababa"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sub City *</label>
                      <input type="text" name="subCity" value={form.subCity} onChange={handleChange} required
                        placeholder="e.g. Bole"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address *</label>
                    <textarea name="address" value={form.address} onChange={handleChange} required rows="3"
                      placeholder="Street address, building, floor, landmark..."
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none" />
                  </div>

                  {/* Payment method indicator */}
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Payment Method</p>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white ring-2 ring-blue-600" />
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-800">Chapa Payment</span>
                        <span className="text-xs text-gray-400">(Telebirr, CBE, and more)</span>
                      </div>
                    </div>
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold text-base transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <><span className="animate-spin">↻</span> Redirecting to Chapa...</>
                    ) : (
                      <>Continue to Payment →</>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
                <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>

                <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                  {cart.map((item) => (
                    <div key={item._id} className="flex gap-3">
                      <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 border border-gray-100">
                        <img src={item.image || "https://via.placeholder.com/48"} alt={item.name}
                          className="w-10 h-10 object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-800 line-clamp-2 leading-tight">{item.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">×{item.quantity}</p>
                      </div>
                      <p className="text-xs font-bold text-gray-800 shrink-0">
                        ETB {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-3 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cart.length} items)</span>
                    <span>ETB {totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-extrabold text-xl text-blue-600">ETB {totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
