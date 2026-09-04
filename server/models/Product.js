const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    storekeepingId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    manufacturer: {
      type: String,
      trim: true,
      default: "",
    },

    model: {
      type: String,
      trim: true,
      default: "",
    },

    price: {
      type: Number,
      required: function() {
        return this.priceType === 'fixed';
      },
      min: 0,
      default: 0,
    },

    priceType: {
      type: String,
      enum: ['fixed', 'quote'],
      default: 'fixed',
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    description: {
      type: String,
      default: "",
    },

    specifications: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
