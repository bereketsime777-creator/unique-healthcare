require("dotenv").config();
const mongoose = require("mongoose");

const sampleModels = {
  "Digital Blood Pressure Monitor": "Standard, Deluxe, Professional",
  "Pulse Oximeter": "Adult, Pediatric, Neonatal",
  "Infrared Thermometer": "Standard, Pro",
  "Hospital Bed - Electric": "3-Function, 5-Function",
  "Wheelchair - Folding": "Standard, Heavy Duty, Lightweight",
  "ECG Machine - 12 Channel": "Basic, Advanced, Touch Screen",
  "Patient Monitor - Multi-parameter": "5-Parameter, 7-Parameter, 12-Parameter",
  "Surgical Instrument Set - Basic": "25-Piece, 50-Piece, 100-Piece",
  "Microscope - Binocular": "40x-400x, 40x-1000x, 40x-1600x",
  "Ultrasound Machine - Portable": "B&W, Color Doppler, 4D",
  "Digital X-Ray Machine": "Mobile, Fixed, Portable",
};

async function addSampleModels() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
    console.log("✅ Connected to MongoDB\n");

    const Product = require("./models/Product");

    console.log("📦 Adding sample models to products...\n");

    let updated = 0;

    for (const [productName, models] of Object.entries(sampleModels)) {
      const products = await Product.find({ 
        name: { $regex: new RegExp(productName, 'i') }
      });

      for (const product of products) {
        if (!product.model) {
          product.model = models;
          await product.save();
          console.log(`✅ ${product.name}`);
          console.log(`   Models: ${models}\n`);
          updated++;
        }
      }
    }

    console.log("=".repeat(70));
    console.log("🎉 SAMPLE MODELS ADDED!");
    console.log("=".repeat(70));
    console.log(`\n✅ Updated: ${updated} products`);

    // Show products with models
    const productsWithModels = await Product.find({ model: { $ne: "" } })
      .select('name model')
      .sort('name');

    if (productsWithModels.length > 0) {
      console.log("\n📋 Products with Models:\n");
      productsWithModels.forEach(p => {
        console.log(`   ${p.name}`);
        console.log(`   → ${p.model}\n`);
      });
    }

    console.log(`\n📦 Total products with models: ${productsWithModels.length}`);
    console.log("\n🌐 View at: http://localhost:5173/products\n");

    process.exit(0);
  } catch (error) {
    console.log("❌ Error:", error.message);
    process.exit(1);
  }
}

addSampleModels();
