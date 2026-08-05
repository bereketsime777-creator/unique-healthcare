require("dotenv").config();
const mongoose = require("mongoose");

console.log("Starting MongoDB test...");

mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 10000,
})
.then(() => {
  console.log("✅ MongoDB connection successful");
  process.exit(0);
})
.catch((err) => {
  console.log("❌ Connection failed");
  console.log(err.message);
  process.exit(1);
});