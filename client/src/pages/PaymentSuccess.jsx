import { useEffect, useState } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import API from "../services/api";
import { useCart } from "../context/CartContext";

function PaymentSuccess() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const tx_ref = searchParams.get("tx_ref");

  const { clearCart } = useCart();

  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState(
    "Verifying your payment..."
  );

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (!tx_ref) {
          setMessage(
            "Transaction reference not found."
          );
          setLoading(false);
          return;
        }

        const pendingOrder = JSON.parse(
          localStorage.getItem("pendingOrder")
        );

        if (!pendingOrder) {
          setMessage("No pending order found.");
          setLoading(false);
          return;
        }

        // ===========================
        // Verify payment with backend
        // ===========================

        const verifyResponse = await API.get(
          `/payment/verify/${tx_ref}`
        );

        if (
          verifyResponse.data.status !== "success" ||
          verifyResponse.data.data.status !== "success"
        ) {
          setMessage(
            "Payment verification failed."
          );
          setLoading(false);
          return;
        }

        // ===========================
        // Create Order
        // ===========================

        await API.post("/orders", {
          items: pendingOrder.items,
          totalAmount: pendingOrder.totalAmount,
          shippingAddress: pendingOrder.shippingAddress,
          paymentStatus: "Paid",
        });

        clearCart();

        localStorage.removeItem(
          "pendingOrder"
        );

        setMessage(
          "Payment Successful 🎉"
        );

        setTimeout(() => {
          navigate("/my-orders");
        }, 2000);

      } catch (error) {
        console.log(error);

        setMessage(
          error.response?.data?.message ||
            "Payment verification failed."
        );
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [tx_ref, clearCart, navigate]);

  return (
    <div className="max-w-2xl mx-auto text-center py-20">
      {loading ? (
        <>
          <h1 className="text-3xl font-bold">
            Confirming Payment...
          </h1>

          <p className="mt-4 text-gray-600">
            Please wait while we verify your payment.
          </p>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-green-600">
            {message}
          </h1>

          {message === "Payment Successful 🎉" && (
            <p className="mt-4">
              Your order has been placed successfully.
            </p>
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