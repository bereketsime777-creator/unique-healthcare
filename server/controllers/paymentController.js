const axios = require("axios");
const Order = require("../models/Order");


// ==============================
// Initialize Chapa Payment
// ==============================

const initializePayment = async (req, res) => {

  try {

    const {
      amount,
      email,
      first_name,
      phone_number,
      orderData
    } = req.body;



    const tx_ref =
      "unique-healthcare-" + Date.now();



    // Save pending order temporarily in response
    // Frontend will store it locally until payment succeeds


    const response = await axios.post(

      "https://api.chapa.co/v1/transaction/initialize",

      {

        amount,

        currency: "ETB",

        email,

        first_name,

        phone_number,

        tx_ref,


        callback_url:
          `${process.env.BACKEND_URL || "http://localhost:5000"}/api/payment/verify/${tx_ref}`,

        return_url:
          `${process.env.FRONTEND_URL || "http://localhost:5173"}/payment-success?tx_ref=${tx_ref}`


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

      status:"success",

      checkout_url:
        response.data.data.checkout_url,

      tx_ref


    });



  } catch(error){


    console.log(
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


const verifyPayment = async(req,res)=>{


  try{


    const {tx_ref}=req.params;



    const response = await axios.get(


      `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,


      {

        headers:{

          Authorization:
          `Bearer ${process.env.CHAPA_SECRET_KEY}`

        }

      }


    );





    const data = response.data.data;





    if(data.status !== "success"){


      return res.status(400).json({

        message:
        "Payment not completed"

      });


    }





    res.json({

      status:"success",

      message:
      "Payment verified successfully",

      data


    });





  }catch(error){


    console.log(
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