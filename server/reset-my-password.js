require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

async function resetPassword() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
    console.log("✅ Connected to MongoDB\n");

    const User = require("./models/User");

    // Reset password for admin@test.com
    const email = "admin@test.com";
    const newPassword = "admin123";

    const user = await User.findOne({ email });

    if (!user) {
      console.log(`❌ User ${email} not found`);
      process.exit(1);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    console.log("✅ Password reset successful!\n");
    console.log("📧 Email:", email);
    console.log("🔑 Password:", newPassword);
    console.log("👤 Role:", user.role);
    console.log("\nYou can now login at: http://localhost:5173/login\n");

    process.exit(0);
  } catch (error) {
    console.log("❌ Error:", error.message);
    process.exit(1);
  }
}

resetPassword();
