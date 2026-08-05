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

      console.log("Payment Success Page Loaded");
      console.log("Transaction Ref:", tx_ref);


      try {


        if (!tx_ref) {

          setMessage(
            "Transaction reference not found."
          );

          setLoading(false);

          return;
        }



        // Check duplicate payment

        const alreadyPaid =
          localStorage.getItem(
            `paid-${tx_ref}`
          );


        if (alreadyPaid) {

          console.log(
            "Payment already verified"
          );

          setMessage(
            "Payment Successful 🎉"
          );

          setLoading(false);

          return;

        }





        // Get pending order

        let pendingOrder;


        try {

          pendingOrder = JSON.parse(
            localStorage.getItem(
              "pendingOrder"
            )
          );


        } catch(error){

          console.log(
            "Pending order JSON error",
            error
          );

        }





        console.log(
          "Pending Order:",
          pendingOrder
        );




        if (!pendingOrder) {


          setMessage(
            "No pending order found."
          );

          setLoading(false);

          return;

        }






        // ===========================
        // Verify Chapa Payment
        // ===========================


        console.log(
          "Verifying Chapa payment..."
        );


        const verifyResponse =
          await API.get(
            `/payment/verify/${tx_ref}`
          );



        console.log(
          "Verify Response:",
          verifyResponse.data
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


        console.log(
          "Creating order..."
        );


        const orderResponse =
          await API.post(
            "/orders",
            {

              items:
                pendingOrder.items,

              totalAmount:
                pendingOrder.totalAmount,

              shippingAddress:
                pendingOrder.shippingAddress,

              paymentStatus:
                "Paid",

            }
          );



        console.log(
          "Order Created:",
          orderResponse.data
        );





        // Clear cart

        clearCart();




        // Remove temporary order

        localStorage.removeItem(
          "pendingOrder"
        );




        // Save payment completed

        localStorage.setItem(
          `paid-${tx_ref}`,
          "true"
        );




        setMessage(
          "Payment Successful 🎉"
        );




      } catch(error) {


        console.log(
          "Payment Error:",
          error
        );


        setMessage(
          error.response?.data?.message ||
          "Payment verification failed."
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

          <h1 className="text-3xl font-bold">

            Confirming Payment...

          </h1>


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

              <p className="mt-4">

                Your order has been placed successfully.

              </p>



              <button

                onClick={() =>
                  navigate("/my-orders")
                }

                className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"

              >

                View My Orders

              </button>


            </>

          )}






          {message !== "Payment Successful 🎉" && (

            <button

              onClick={() =>
                navigate("/")
              }

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