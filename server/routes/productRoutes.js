const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// ==============================
// Create Product (Admin)
// ==============================
router.post(
  "/",
  protect,
  adminOnly,
  upload.fields([{ name: "image", maxCount: 1 }, { name: "pdf", maxCount: 1 }]),
  createProduct
);

// ==============================
// Update Product (Admin)
// ==============================
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.fields([{ name: "image", maxCount: 1 }, { name: "pdf", maxCount: 1 }]),
  updateProduct
);

// ==============================
// Delete Product (Admin)
// ==============================
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteProduct
);

// ==============================
// Get All Products (Public)
// ==============================
router.get(
  "/",
  getProducts
);

// ==============================
// Get Single Product (Public)
// ==============================
router.get(
  "/:id",
  getProductById
);

module.exports = router;