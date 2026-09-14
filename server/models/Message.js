const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      default: "",
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["unread", "read", "replied"],
      default: "unread",
    },
    reply: {
      type: String,
      default: "",
    },
    repliedAt: {
      type: Date,
    },
    // Proforma-specific fields (optional, only populated for proforma requests)
    requestType: {
      type: String,
      enum: ["general", "proforma"],
      default: "general",
    },
    organizationName: {
      type: String,
      default: "",
      trim: true,
    },
    location: {
      type: String,
      default: "",
      trim: true,
    },
    proformaNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    product: {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        default: null,
      },
      productName: {
        type: String,
        default: "",
      },
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);
