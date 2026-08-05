const express = require("express");
const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");

const {
  sendMessage,
  getAllMessages,
  getMessageById,
  replyToMessage,
  deleteMessage,
  getUnreadCount,
} = require("../controllers/messageController");

// Public — anyone can send a message
router.post("/", sendMessage);

// Admin only
router.get("/", protect, adminOnly, getAllMessages);
router.get("/unread-count", protect, adminOnly, getUnreadCount);
router.get("/:id", protect, adminOnly, getMessageById);
router.post("/:id/reply", protect, adminOnly, replyToMessage);
router.delete("/:id", protect, adminOnly, deleteMessage);

module.exports = router;
