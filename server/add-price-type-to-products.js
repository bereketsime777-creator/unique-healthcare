require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

async function addPriceTypeToProducts() {
  try {
    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB\n");

    // Find products without priceType field
    const products = await Product.find({ priceType: { $exists: false } });

    console.log(`📦 Found ${products.length} products without priceType field\n`);

    if (products.length === 0) {
      console.log("✅ All products already have priceType field!");
      await mongoose.connection.close();
      return;
    }

    console.log("🔄 Adding priceType: 'fixed' to all products...\n");

    for (const product of products) {
      product.priceType = 'fixed';
      await product.save();
      console.log(`✓ Updated: ${product.name}`);
    }

    console.log(`\n✅ Successfully updated ${products.length} products!`);
    console.log("   All products now have priceType field set to 'fixed'\n");

    await mongoose.connection.close();
    console.log("🔒 Database connection closed");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

addPriceTypeToProducts();
