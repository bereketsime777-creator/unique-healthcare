const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Category = require("./models/Category");

dotenv.config();

const DEFAULT_CATEGORIES = [
  {
    name: "Diagnostic Equipment",
    description: "Medical devices for diagnosis and examination",
    image: "/images/category-diagnostic.jpg",
  },
  {
    name: "Laboratory Equipment", 
    description: "Lab instruments and testing equipment",
    image: "/images/category-lab.jpg",
  },
  {
    name: "Surgical Instruments",
    description: "Surgical tools and operating equipment",
    image: "/images/category-surgical.jpg",
  },
  {
    name: "Patient Monitoring",
    description: "Monitoring and life support systems",
    image: "/images/category-monitoring.jpg",
  },
  {
    name: "Imaging Equipment",
    description: "X-ray, ultrasound, and imaging systems",
    image: "",
  },
  {
    name: "Emergency Equipment",
    description: "Emergency and critical care equipment",
    image: "",
  },
  {
    name: "Rehabilitation Equipment",
    description: "Physical therapy and rehabilitation tools",
    image: "",
  },
  {
    name: "Sterilization Equipment",
    description: "Autoclaves and sterilization systems", 
    image: "",
  },
];

async function migrateCategories() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Check if categories already exist
    const existingCount = await Category.countDocuments();
    if (existingCount > 0) {
      console.log(`📋 ${existingCount} categories already exist. Skipping migration.`);
      return;
    }

    // Create default categories
    const categories = DEFAULT_CATEGORIES.map(cat => ({
      ...cat,
      slug: cat.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    }));

    await Category.insertMany(categories);
    console.log(`✅ Successfully created ${categories.length} default categories:`);
    
    categories.forEach(cat => {
      console.log(`   - ${cat.name} (${cat.slug})`);
    });

  } catch (error) {
    console.error("❌ Migration failed:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

// Run if called directly
if (require.main === module) {
  console.log("🚀 Starting category migration...");
  migrateCategories();
}

module.exports = migrateCategories;