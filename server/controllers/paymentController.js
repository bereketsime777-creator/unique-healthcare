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





    console.log("Initializing Chapa Payment...");
    console.log("Amount:", amount);
    console.log("Email:", email);
    console.log("TX REF:", tx_ref);





    const response = await axios.post(

      "https://api.chapa.co/v1/transaction/initialize",

      {

        amount: amount,

        currency: "ETB",

        email: email,

        first_name: first_name,

        phone_number: phone_number,

        tx_ref: tx_ref,


        callback_url:
          `${BACKEND_URL}/api/payment/verify/${tx_ref}`,


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





    console.log(
      "Chapa Initialize Success"
    );





    return res.json({

      status: "success",

      checkout_url:
        response.data.data.checkout_url,

      tx_ref: tx_ref

    });





  } catch (error) {


    console.log(
      "CHAPA INITIALIZE ERROR:"
    );


    console.log(
      error.response?.data ||
      error.message
    );



    return res.status(500).json({

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


    const {
      tx_ref
    } = req.params;



    console.log(
      "Verifying transaction:",
      tx_ref
    );






    const response = await axios.get(


      `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,


      {

        headers: {

          Authorization:
            `Bearer ${process.env.CHAPA_SECRET_KEY}`

        }

      }


    );






    console.log(
      "CHAPA VERIFY RESPONSE:"
    );


    console.log(

      JSON.stringify(
        response.data,
        null,
        2
      )

    );







    const data =
      response.data.data;







    if (

      response.data.status !== "success"

      ||

      !data

      ||

      data.status !== "success"

    ) {


      return res.status(400).json({

        status:
          "failed",

        message:
          "Payment not completed"

      });


    }







    console.log(
      "Payment verified successfully"
    );






    // IMPORTANT:
    // React will handle redirect
    // Return JSON only

    return res.json({

      status:
        "success",


      message:
        "Payment verified successfully",


      data:
        data

    });






  } catch(error) {



    console.log(
      "CHAPA VERIFY ERROR:"
    );


    console.log(

      error.response?.data ||

      error.message

    );





    return res.status(500).json({

      message:
        "Payment verification failed"

    });



  }


};






module.exports = {

  initializePayment,

  verifyPayment

};