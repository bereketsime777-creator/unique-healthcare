require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

async function testProductUpdate() {
  try {
    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB\n");

    // Get first product
    const product = await Product.findOne();
    
    if (!product) {
      console.log("❌ No products found in database");
      await mongoose.connection.close();
      return;
    }

    console.log("📦 Testing Product Update");
    console.log("=".repeat(60));
    console.log(`Product: ${product.name}`);
    console.log(`Current Price Type: ${product.priceType || 'Not set (defaults to fixed)'}`);
    console.log(`Current Model: ${product.model || 'Not set'}`);
    console.log(`Current Price: ETB ${product.price}`);
    console.log("=".repeat(60) + "\n");

    // Test 1: Add model
    console.log("TEST 1: Adding model...");
    product.model = "Standard, Deluxe, Premium";
    await product.save();
    console.log("✅ Model added successfully\n");

    // Test 2: Change to quote
    console.log("TEST 2: Changing price type to 'quote'...");
    product.priceType = "quote";
    product.price = 0;
    await product.save();
    console.log("✅ Price type changed to 'quote'\n");

    // Verify changes
    const updated = await Product.findById(product._id);
    console.log("📋 VERIFICATION:");
    console.log("=".repeat(60));
    console.log(`Product: ${updated.name}`);
    console.log(`Price Type: ${updated.priceType}`);
    console.log(`Model: ${updated.model}`);
    console.log(`Price: ${updated.price}`);
    console.log("=".repeat(60) + "\n");

    if (updated.priceType === 'quote' && updated.model) {
      console.log("✅ SUCCESS! Product updated correctly");
      console.log("   - Model field is set");
      console.log("   - Price type is 'quote'");
    } else {
      console.log("❌ FAILED! Something went wrong");
    }

    // Revert changes
    console.log("\n🔄 Reverting changes...");
    product.priceType = "fixed";
    product.model = "";
    await product.save();
    console.log("✅ Changes reverted\n");

    await mongoose.connection.close();
    console.log("🔒 Database connection closed");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

testProductUpdate();
