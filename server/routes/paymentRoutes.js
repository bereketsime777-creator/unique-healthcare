const express = require("express");

const router = express.Router();


const {

  initializePayment,

  verifyPayment

} = require("../controllers/paymentController");




// Initialize Chapa

router.post(

  "/initialize",

  initializePayment

);




// Verify Chapa

router.get(

  "/verify/:tx_ref",

  verifyPayment

);



module.exports = router;