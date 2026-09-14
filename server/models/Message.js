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
    // After-Sales Service fields (optional, only populated for after-sales requests)
    requestType: {
      type: String,
      enum: ["general", "proforma", "after_sales_service"],
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
    products: [{
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        default: null,
      },
      productName: {
        type: String,
        default: "",
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },
    }],
    // Legacy single-product fields (for backward compatibility)
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
    // After-Sales Service Request fields (optional, only populated for after_sales_service requests)
    serviceType: {
      type: String,
      enum: ["installation", "maintenance", "repair", "troubleshooting", "training", "other"],
      default: "",
    },
    equipment: {
      type: String,
      default: "",
    },
    equipmentProductId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },
    serialNumber: {
      type: String,
      default: "",
    },
    purchaseDate: {
      type: Date,
      default: null,
    },
    preferredServiceDate: {
      type: Date,
      default: null,
    },
    serviceDescription: {
      type: String,
      default: "",
    },
    serviceLocation: {
      type: String,
      default: "",
    },
    serviceRequestNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    serviceStatus: {
      type: String,
      enum: ["new", "in_progress", "scheduled", "completed", "cancelled"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);
