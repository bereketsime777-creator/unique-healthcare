const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");


const getDashboardStats = async (req, res) => {
  try {
    const products = await Product.countDocuments();

    const orders = await Order.countDocuments();

    // Count all non-admin users (registered customers)
    const customers = await User.countDocuments({ role: "user" });

    // Revenue from paid orders
    const revenueResult = await Order.aggregate([
      { $match: { paymentStatus: "Paid" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const revenue =
      revenueResult.length > 0 ? revenueResult[0].total : 0;

    res.json({ products, orders, customers, revenue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { getDashboardStats };
