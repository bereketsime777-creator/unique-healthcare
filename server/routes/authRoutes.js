const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyResetToken,
  changePassword,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/verify-reset-token/:token", verifyResetToken);
router.post("/change-password", protect, changePassword);

module.exports = router;
