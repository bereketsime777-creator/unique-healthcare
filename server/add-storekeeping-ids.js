require("dotenv").config();
const mongoose = require("mongoose");

async function addStorekeepingIds() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
    console.log("✅ Connected to MongoDB\n");

    const Product = require("./models/Product");

    // Get all products without storekeeping ID
    const productsWithoutId = await Product.find({ 
      $or: [
        { storekeepingId: { $exists: false } },
        { storekeepingId: null },
        { storekeepingId: "" }
      ]
    });

    if (productsWithoutId.length === 0) {
      console.log("✅ All products already have storekeeping IDs!");
      process.exit(0);
    }

    console.log(`📦 Found ${productsWithoutId.length} products without storekeeping IDs\n`);

    const year = new Date().getFullYear();
    let counter = 1;

    // Check for existing IDs to continue numbering
    const latestProduct = await Product.findOne({ 
      storekeepingId: { $regex: `^UHC-${year}-` } 
    })
      .sort({ storekeepingId: -1 })
      .select('storekeepingId');

    if (latestProduct && latestProduct.storekeepingId) {
      const lastNumber = parseInt(latestProduct.storekeepingId.split('-')[2]);
      counter = lastNumber + 1;
      console.log(`📊 Continuing from last ID: ${latestProduct.storekeepingId}\n`);
    }

    let updated = 0;

    for (const product of productsWithoutId) {
      const storekeepingId = `UHC-${year}-${counter.toString().padStart(3, '0')}`;
      
      product.storekeepingId = storekeepingId;
      await product.save();

      console.log(`✅ ${storekeepingId} → ${product.name}`);
      
      counter++;
      updated++;
    }

    console.log("\n" + "=".repeat(70));
    console.log("🎉 STOREKEEPING IDs ADDED SUCCESSFULLY!");
    console.log("=".repeat(70));
    console.log(`\n✅ Updated: ${updated} products`);

    // Show all products with their IDs
    const allProducts = await Product.find().select('storekeepingId name category').sort('storekeepingId');
    
    console.log("\n📋 All Products with Storekeeping IDs:\n");
    
    allProducts.forEach(p => {
      console.log(`   ${p.storekeepingId || 'NO-ID'} - ${p.name} (${p.category})`);
    });

    console.log(`\n📦 Total Products: ${allProducts.length}`);
    console.log("\n✅ All products now have unique storekeeping IDs!");
    console.log("\n🌐 View in admin: http://localhost:5173/admin/products\n");

    process.exit(0);
  } catch (error) {
    console.log("❌ Error:", error.message);
    process.exit(1);
  }
}

addStorekeepingIds();
