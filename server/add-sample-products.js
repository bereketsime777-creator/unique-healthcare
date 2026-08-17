require("dotenv").config();
const mongoose = require("mongoose");

const sampleProducts = [
  // Diagnostic Equipment
  {
    name: "Digital Blood Pressure Monitor",
    description: "Automatic upper arm blood pressure monitor with irregular heartbeat detection. Large LCD display, memory for 2 users with 60 readings each.",
    price: 2499,
    category: "Diagnostic Equipment",
    stock: 45,
    imageUrl: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=500",
  },
  {
    name: "Infrared Thermometer",
    description: "Non-contact forehead thermometer with 1-second measurement. Fever alarm, memory recall for last 32 readings.",
    price: 899,
    category: "Diagnostic Equipment",
    stock: 120,
    imageUrl: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=500",
  },
  {
    name: "Pulse Oximeter",
    description: "Fingertip pulse oximeter measures blood oxygen saturation and pulse rate. OLED display with 6 viewing modes.",
    price: 1299,
    category: "Diagnostic Equipment",
    stock: 80,
    imageUrl: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500",
  },

  // Patient Care Equipment
  {
    name: "Hospital Bed - Electric",
    description: "3-function electric hospital bed with side rails. Adjustable height, back rest, and leg section. Weight capacity 200kg.",
    price: 45000,
    category: "Patient Care Equipment",
    stock: 15,
    imageUrl: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500",
  },
  {
    name: "Wheelchair - Folding",
    description: "Lightweight aluminum folding wheelchair with padded armrests and footrests. Weight capacity 120kg.",
    price: 8500,
    category: "Patient Care Equipment",
    stock: 25,
    imageUrl: "https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=500",
  },
  {
    name: "Walking Aid Walker",
    description: "Adjustable height aluminum walker with wheels. Foldable design, hand brakes, and padded seat.",
    price: 4200,
    category: "Patient Care Equipment",
    stock: 35,
    imageUrl: "https://images.unsplash.com/photo-1609840112833-0b6a762d2cbb?w=500",
  },

  // Monitoring Devices
  {
    name: "ECG Machine - 12 Channel",
    description: "Digital 12-channel ECG machine with 10-inch touchscreen. Auto interpretation, USB connectivity, built-in printer.",
    price: 185000,
    category: "Monitoring Devices",
    stock: 8,
    imageUrl: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=500",
  },
  {
    name: "Patient Monitor - Multi-parameter",
    description: "15-inch multi-parameter patient monitor. Measures ECG, SpO2, NIBP, temperature, and respiration. Battery backup 4 hours.",
    price: 125000,
    category: "Monitoring Devices",
    stock: 12,
    imageUrl: "https://images.unsplash.com/photo-1581093458791-9d42e1b7c6e9?w=500",
  },
  {
    name: "Fetal Doppler",
    description: "Handheld fetal heart rate detector with LCD display and speaker. Water-resistant probe, battery powered.",
    price: 6500,
    category: "Monitoring Devices",
    stock: 40,
    imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=500",
  },

  // Surgical Instruments
  {
    name: "Surgical Instrument Set - Basic",
    description: "Stainless steel surgical instrument set including scissors, forceps, scalpel handles, and needle holders. 25-piece set in sterilization case.",
    price: 28000,
    category: "Surgical Instruments",
    stock: 20,
    imageUrl: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=500",
  },
  {
    name: "Operating Scissors - Mayo",
    description: "Surgical-grade stainless steel Mayo scissors. Curved blade, 6.5 inches. Autoclavable.",
    price: 1800,
    category: "Surgical Instruments",
    stock: 60,
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500",
  },
  {
    name: "Surgical Forceps Set",
    description: "Set of 5 surgical forceps including tissue forceps, Adson forceps, and dressing forceps. Stainless steel.",
    price: 4500,
    category: "Surgical Instruments",
    stock: 45,
    imageUrl: "https://images.unsplash.com/photo-1582719366862-1d6129f54cdd?w=500",
  },

  // Laboratory Equipment
  {
    name: "Microscope - Binocular",
    description: "LED binocular microscope with 40x-1000x magnification. Includes mechanical stage, LED illumination, and carrying case.",
    price: 35000,
    category: "Laboratory Equipment",
    stock: 18,
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500",
  },
  {
    name: "Centrifuge - Clinical",
    description: "Tabletop clinical centrifuge with 12-tube capacity. Speed up to 5000 RPM, digital timer and speed control.",
    price: 42000,
    category: "Laboratory Equipment",
    stock: 10,
    imageUrl: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=500",
  },
  {
    name: "Autoclave Sterilizer",
    description: "18L capacity autoclave sterilizer with digital display. Temperature and pressure control, automatic shut-off.",
    price: 55000,
    category: "Laboratory Equipment",
    stock: 14,
    imageUrl: "https://images.unsplash.com/photo-1582719366862-1d6129f54cdd?w=500",
  },

  // Imaging Systems
  {
    name: "Digital X-Ray Machine",
    description: "Mobile digital X-ray system with flat panel detector. 32kW high frequency generator, motorized movements.",
    price: 1250000,
    category: "Imaging Systems",
    stock: 3,
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500",
  },
  {
    name: "Ultrasound Machine - Portable",
    description: "Portable ultrasound scanner with 12-inch LED display. Multiple probes, USB connectivity, battery backup.",
    price: 385000,
    category: "Imaging Systems",
    stock: 6,
    imageUrl: "https://images.unsplash.com/photo-1581093458791-9d42e1b7c6e9?w=500",
  },

  // Disposables & Consumables
  {
    name: "Surgical Gloves - Latex (Box of 100)",
    description: "Powder-free latex surgical gloves. Sterile, textured grip, multiple sizes available.",
    price: 1200,
    category: "Disposables & Consumables",
    stock: 500,
    imageUrl: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=500",
  },
  {
    name: "Disposable Syringes 5ml (Pack of 100)",
    description: "Sterile disposable syringes with needle. Luer lock, graduated markings, individually packed.",
    price: 850,
    category: "Disposables & Consumables",
    stock: 800,
    imageUrl: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500",
  },
  {
    name: "Surgical Face Masks (Box of 50)",
    description: "3-ply disposable surgical face masks with earloops. Bacterial filtration efficiency >95%.",
    price: 450,
    category: "Disposables & Consumables",
    stock: 1000,
    imageUrl: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=500",
  },

  // Furniture & Fixtures
  {
    name: "Medical Examination Table",
    description: "Adjustable height examination table with paper roll holder. Upholstered cushion, metal frame, weight capacity 180kg.",
    price: 18500,
    category: "Furniture & Fixtures",
    stock: 22,
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500",
  },
  {
    name: "Medical Cabinet - Steel",
    description: "Lockable steel medical cabinet with glass doors. 3 adjustable shelves, wall-mountable, dimensions 80x40x180cm.",
    price: 15000,
    category: "Furniture & Fixtures",
    stock: 30,
    imageUrl: "https://images.unsplash.com/photo-1581093458791-9d42e1b7c6e9?w=500",
  },
  {
    name: "IV Stand - Stainless Steel",
    description: "4-hook IV pole with wheeled base. Height adjustable 120-200cm, chrome-plated stainless steel.",
    price: 3200,
    category: "Furniture & Fixtures",
    stock: 50,
    imageUrl: "https://images.unsplash.com/photo-1581093804475-577d72e38aa0?w=500",
  },
];

async function addProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
    console.log("✅ Connected to MongoDB\n");

    const Product = require("./models/Product");

    console.log(`📦 Adding ${sampleProducts.length} products across all categories...\n`);

    let added = 0;
    let skipped = 0;

    for (const productData of sampleProducts) {
      // Check if product already exists
      const existing = await Product.findOne({ name: productData.name });
      
      if (existing) {
        console.log(`⏭️  Skipped: ${productData.name} (already exists)`);
        skipped++;
        continue;
      }

      await Product.create(productData);
      console.log(`✅ Added: ${productData.name} - ${productData.category}`);
      added++;
    }

    console.log("\n" + "=".repeat(70));
    console.log("🎉 PRODUCTS ADDED SUCCESSFULLY!");
    console.log("=".repeat(70));
    console.log(`\n✅ Added: ${added} products`);
    console.log(`⏭️  Skipped: ${skipped} products (already existed)\n`);

    // Show category breakdown
    const allProducts = await Product.find();
    const categoryCount = {};
    
    allProducts.forEach(p => {
      categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
    });

    console.log("📊 Products by Category:");
    Object.entries(categoryCount).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
      console.log(`   ${cat}: ${count} products`);
    });

    console.log(`\n📦 Total Products in Database: ${allProducts.length}`);
    console.log("\n🌐 View products at: http://localhost:5173/products\n");

    process.exit(0);
  } catch (error) {
    console.log("❌ Error:", error.message);
    process.exit(1);
  }
}

addProducts();
