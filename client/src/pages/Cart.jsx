import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, totalPrice, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 inline-block">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Add products to get started</p>
            <Link
              to="/products"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-sm text-gray-500">{cart.length} item{cart.length !== 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={clearCart}
            className="text-sm text-red-500 hover:text-red-700 hover:underline"
          >
            Clear Cart
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3">
            {cart.map((item) => (
              <div key={item._id} className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col sm:flex-row gap-4 sm:items-center">
                {/* Image */}
                <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 border border-gray-100 overflow-hidden">
                  {item.image && item.image.startsWith("http") ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1"
                      onError={(e) => { e.target.style.display = "none"; }} />
                  ) : (
                    <span className="text-2xl">📦</span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 text-sm truncate">{item.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">ETB {item.price?.toLocaleString()} each</p>
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden shrink-0">
                  <button
                    onClick={() => decreaseQuantity(item._id)}
                    className="px-2.5 py-1.5 text-gray-500 hover:bg-gray-100 text-sm font-bold"
                  >
                    −
                  </button>
                  <span className="px-3 py-1.5 text-sm font-semibold border-x border-gray-200">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQuantity(item._id)}
                    className="px-2.5 py-1.5 text-gray-500 hover:bg-gray-100 text-sm font-bold"
                  >
                    +
                  </button>
                  </div>

                {/* Subtotal */}
                <div className="text-right shrink-0">
                  <p className="font-bold text-blue-600 text-sm">
                    ETB {(item.price * item.quantity).toLocaleString()}
                  </p>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-xs text-red-400 hover:text-red-600 mt-1 transition-colors"
                  >
                    Remove
                  </button>
                </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-100 p-5 sticky top-24">
              <h2 className="font-bold text-gray-900 text-lg mb-4">Order Summary</h2>

              <div className="space-y-2 mb-4">
                {cart.map((item) => (
                  <div key={item._id} className="flex justify-between text-sm">
                    <span className="text-gray-600 truncate max-w-[160px]">
                      {item.name} ×{item.quantity}
                    </span>
                    <span className="text-gray-800 font-medium shrink-0 ml-2">
                      ETB {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-3 mb-5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-extrabold text-xl text-blue-600">
                    ETB {totalPrice.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Shipping calculated at checkout</p>
              </div>

              <Link
                to="/checkout"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-center transition-colors mb-3"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/products"
                className="block w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-lg font-medium text-center transition-colors text-sm"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
