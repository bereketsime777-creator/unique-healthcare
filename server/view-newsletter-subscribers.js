require("dotenv").config();
const mongoose = require("mongoose");
const NewsletterSubscriber = require("./models/NewsletterSubscriber");

async function viewSubscribers() {
  try {
    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB\n");

    const subscribers = await NewsletterSubscriber.find().sort({ createdAt: -1 });

    if (subscribers.length === 0) {
      console.log("📭 No newsletter subscribers yet.\n");
    } else {
      console.log(`📧 NEWSLETTER SUBSCRIBERS (${subscribers.length} total)\n`);
      console.log("=".repeat(80));
      
      subscribers.forEach((sub, index) => {
        console.log(`\n${index + 1}. Email: ${sub.email}`);
        console.log(`   Subscribed: ${sub.createdAt.toLocaleString()}`);
        console.log(`   ID: ${sub._id}`);
      });
      
      console.log("\n" + "=".repeat(80));
      console.log(`\n✅ Total: ${subscribers.length} subscriber${subscribers.length !== 1 ? 's' : ''}\n`);
      
      // Export as CSV format
      console.log("\n📋 CSV FORMAT (for Excel/Google Sheets):");
      console.log("Email,Subscribed Date,ID");
      subscribers.forEach(sub => {
        console.log(`${sub.email},${sub.createdAt.toISOString()},${sub._id}`);
      });
    }

    await mongoose.connection.close();
    console.log("\n🔒 Database connection closed");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

viewSubscribers();
