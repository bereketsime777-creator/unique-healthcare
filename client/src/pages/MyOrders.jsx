import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const statusConfig = {
  Pending:    { color: "bg-yellow-100 text-yellow-700", icon: "⏳" },
  Processing: { color: "bg-blue-100 text-blue-700",    icon: "⚙️" },
  Shipped:    { color: "bg-purple-100 text-purple-700",icon: "🚚" },
  Delivered:  { color: "bg-green-100 text-green-700",  icon: "✅" },
  Cancelled:  { color: "bg-red-100 text-red-700",      icon: "❌" },
};

function MyOrders() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) { navigate("/login"); return; }
    API.get("/orders/my-orders")
      .then((r) => setOrders(r.data))
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [token, navigate]);

  if (!token) return null;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <span className="text-gray-800">My Orders</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="flex justify-between mb-4">
                  <div className="bg-gray-200 h-5 w-32 rounded" />
                  <div className="bg-gray-200 h-6 w-20 rounded-full" />
                </div>
                <div className="bg-gray-200 h-4 w-full rounded mb-2" />
                <div className="bg-gray-200 h-4 w-2/3 rounded" />
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-6">You haven&apos;t placed any orders. Start shopping!</p>
            <Link to="/products" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const status = statusConfig[order.orderStatus] || statusConfig.Pending;
              return (
                <div key={order._id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-sm transition-shadow">
                  {/* Order Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Order ID</p>
                        <p className="font-bold text-gray-800 text-sm">#{order._id.slice(-8).toUpperCase()}</p>
                      </div>
                      <div className="hidden md:block w-px h-8 bg-gray-200" />
                      <div className="hidden md:block">
                        <p className="text-xs text-gray-500 mb-0.5">Date</p>
                        <p className="text-sm text-gray-700">
                          {new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                        </p>
                      </div>
                      <div className="hidden md:block w-px h-8 bg-gray-200" />
                      <div className="hidden md:block">
                        <p className="text-xs text-gray-500 mb-0.5">Payment</p>
                        <span className={`text-xs font-semibold ${order.paymentStatus === "Paid" ? "text-green-600" : "text-yellow-600"}`}>
                          {order.paymentStatus}
                        </span>
                      </div>
                    </div>
                    <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${status.color}`}>
                      {status.icon} {order.orderStatus}
                    </span>
                  </div>

                  {/* Order Items */}
                  <div className="px-6 py-4">
                    <div className="space-y-2">
                      {order.items?.slice(0, 3).map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-700 truncate max-w-[60%]">
                            {item.name} <span className="text-gray-400">×{item.quantity}</span>
                          </span>
                          <span className="font-semibold text-gray-800">
                            ETB {(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                      {order.items?.length > 3 && (
                        <p className="text-xs text-gray-400">+{order.items.length - 3} more items</p>
                      )}
                    </div>
                  </div>

                  {/* Order Footer */}
                  <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50">
                    <div className="text-sm text-gray-500">
                      📍 {order.shippingAddress?.city}, {order.shippingAddress?.subCity}
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-extrabold text-blue-600 text-lg">
                        ETB {order.totalAmount?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;
