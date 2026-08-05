require("dotenv").config();

const mongoose = require("mongoose");
const dns = require("dns");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

console.log("🚀 Starting admin creation...");

const createAdmin = async () => {
  try {
    console.log("⏳ Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGODB_URI, {
      family: 4,
      serverSelectionTimeoutMS: 10000,
    });

    console.log("✅ MongoDB connected");

    const existingAdmin = await User.findOne({
      email: "admin@uniquehealthcare.com",
    });

    if (existingAdmin) {
      console.log("⚠️ Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(
      "Admin@12345",
      10
    );

    await User.create({
      name: "Unique Healthcare Admin",
      email: "admin@uniquehealthcare.com",
      phone: "0900000000",
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin created successfully");

    process.exit();

  } catch (error) {
    console.log("❌ ERROR:");
    console.log(error.message);
    process.exit(1);
  }
};

createAdmin();