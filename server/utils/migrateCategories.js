/**
 * One-time script: update legacy category names in MongoDB.
 * Run from server folder: node utils/migrateCategories.js
 */
require("dotenv").config();

const connectDB = require("../config/db");
const Product = require("../models/Product");
const { LEGACY_CATEGORY_ALIASES } = require("./categories");

async function migrateCategories() {
  await connectDB();

  let updated = 0;
  for (const [legacy, current] of Object.entries(LEGACY_CATEGORY_ALIASES)) {
    const result = await Product.updateMany(
      { category: legacy },
      { $set: { category: current } }
    );
    if (result.modifiedCount > 0) {
      console.log(`Updated ${result.modifiedCount} product(s): "${legacy}" → "${current}"`);
      updated += result.modifiedCount;
    }
  }

  console.log(updated === 0 ? "No legacy categories found." : `Done. ${updated} product(s) updated.`);
  process.exit(0);
}

migrateCategories().catch((err) => {
  console.error(err);
  process.exit(1);
});
