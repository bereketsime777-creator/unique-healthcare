const Order = require("../models/Order");


// ==============================
// Create Order (Customer)
// ==============================

const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress, paymentStatus } = req.body;

    const order = await Order.create({
      customer: req.user.id,
      items,
      totalAmount,
      shippingAddress,
      // Use paymentStatus from request (Paid after successful Chapa payment)
      paymentStatus: paymentStatus || "Pending",
      orderStatus: "Pending",
    });

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ==============================
// Customer Get My Orders
// ==============================

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ==============================
// Admin Get All Orders
// ==============================

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer", "name email phone")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ==============================
// Admin Get Single Order
// ==============================

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "customer",
      "name email phone"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ==============================
// Admin Update Order Status
// ==============================

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = req.body.status;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
};
