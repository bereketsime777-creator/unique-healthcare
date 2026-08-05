const axios = require("axios");


// ==============================
// Initialize Chapa Payment
// ==============================

const initializePayment = async (req, res) => {

  try {

    const {
      amount,
      email,
      first_name,
      phone_number
    } = req.body;



    const tx_ref =
      "unique-healthcare-" + Date.now();



    const FRONTEND_URL =
      process.env.FRONTEND_URL ||
      "https://unique-healthcare.vercel.app";



    const BACKEND_URL =
      process.env.BACKEND_URL ||
      "https://unique-healthcare-api.onrender.com";





    const response = await axios.post(

      "https://api.chapa.co/v1/transaction/initialize",

      {

        amount,

        currency: "ETB",

        email,

        first_name,

        phone_number,

        tx_ref,


        // Chapa server verification callback
        callback_url:
          `${BACKEND_URL}/api/payment/verify/${tx_ref}`,


        // Customer redirect after payment
        return_url:
          `${FRONTEND_URL}/payment-success?tx_ref=${tx_ref}`

      },


      {

        headers: {

          Authorization:
            `Bearer ${process.env.CHAPA_SECRET_KEY}`,

          "Content-Type":
            "application/json"

        }

      }

    );




    res.json({

      status: "success",

      checkout_url:
        response.data.data.checkout_url,

      tx_ref

    });



  } catch (error) {


    console.log(
      "Chapa Initialize Error:",
      error.response?.data || error.message
    );



    res.status(500).json({

      message:
        "Payment initialization failed"

    });


  }

};








// ==============================
// Verify Chapa Payment
// ==============================

const verifyPayment = async (req, res) => {


  try {


    const { tx_ref } = req.params;



    const response = await axios.get(


      `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,


      {

        headers: {

          Authorization:
            `Bearer ${process.env.CHAPA_SECRET_KEY}`

        }

      }


    );





    const data = response.data.data;




    if (data.status !== "success") {


      return res.status(400).json({

        message:
          "Payment not completed"

      });


    }





    // Redirect user back to React frontend

    return res.redirect(

      `${process.env.FRONTEND_URL}/payment-success?tx_ref=${tx_ref}`

    );





  } catch (error) {



    console.log(

      "Chapa Verify Error:",

      error.response?.data || error.message

    );



    res.status(500).json({

      message:
        "Payment verification failed"

    });


  }


};







module.exports = {

  initializePayment,

  verifyPayment

};