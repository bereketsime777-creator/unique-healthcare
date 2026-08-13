import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import API from "../services/api";
import { useCart } from "../context/CartContext";

function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tx_ref = searchParams.get("tx_ref");
  const { clearCart } = useCart();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Verifying your payment...");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (!tx_ref) {
          setMessage("Transaction reference missing");
          setLoading(false);
          return;
        }

        const paid = localStorage.getItem(`paid-${tx_ref}`);
        if (paid) {
          setMessage("Payment Successful 🎉");
          setLoading(false);
          return;
        }

        const pendingOrder = JSON.parse(localStorage.getItem("pendingOrder"));
        if (!pendingOrder) {
          setMessage("No pending order found");
          setLoading(false);
          return;
        }

        const verifyResponse = await API.get(`/payment/verify/${tx_ref}`);
        if (verifyResponse.data.status !== "success") {
          setMessage("Payment verification failed");
          setLoading(false);
          return;
        }

        await API.post("/orders", {
          items: pendingOrder.items,
          totalAmount: pendingOrder.totalAmount,
          shippingAddress: pendingOrder.shippingAddress,
          paymentStatus: "Paid",
        });

        clearCart();
        localStorage.removeItem("pendingOrder");
        localStorage.setItem(`paid-${tx_ref}`, "true");
        setMessage("Payment Successful 🎉");
      } catch (error) {
        setMessage(
          error.response?.data?.message || "Payment verification failed"
        );
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [tx_ref, clearCart]);

  return (
    <div className="max-w-2xl mx-auto text-center py-20">
      {loading ? (
        <>
          <h1 className="text-3xl font-bold">Confirming Payment...</h1>
          <p className="mt-4 text-gray-600">
            Please wait while we verify your payment.
          </p>
        </>
      ) : (
        <>
          <h1
            className={
              message === "Payment Successful 🎉"
                ? "text-4xl font-bold text-green-600"
                : "text-4xl font-bold text-red-600"
            }
          >
            {message}
          </h1>

          {message === "Payment Successful 🎉" && (
            <>
              <p className="mt-4">Your order has been placed successfully.</p>
              <button
                onClick={() => navigate("/my-orders")}
                className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg"
              >
                View My Orders
              </button>
            </>
          )}

          {message !== "Payment Successful 🎉" && (
            <button
              onClick={() => navigate("/")}
              className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              Back to Home
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default PaymentSuccess;
