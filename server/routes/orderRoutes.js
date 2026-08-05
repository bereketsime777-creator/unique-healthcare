const express = require("express");

const router = express.Router();



const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");



const {

  createOrder,

  getMyOrders,

  getAllOrders,

  getOrderById,

  updateOrderStatus,

} = require("../controllers/orderController");





// ==============================
// Customer Create Order
// ==============================

router.post(

  "/",

  protect,

  createOrder

);








// ==============================
// Customer View Own Orders
// ==============================

router.get(

  "/my-orders",

  protect,

  getMyOrders

);








// ==============================
// Admin Get All Orders
// ==============================

router.get(

  "/",

  protect,

  adminOnly,

  getAllOrders

);








// ==============================
// Admin Get Single Order Details
// ==============================

router.get(

  "/:id",

  protect,

  adminOnly,

  getOrderById

);








// ==============================
// Admin Update Order Status
// ==============================

router.put(

  "/:id",

  protect,

  adminOnly,

  updateOrderStatus

);






module.exports = router;