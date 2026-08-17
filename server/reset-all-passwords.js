require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

async function resetAllPasswords() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
    console.log("✅ Connected to MongoDB\n");

    const User = require("./models/User");

    // Password for all users
    const defaultPassword = "test123";
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    // Get all users
    const users = await User.find();

    console.log(`Found ${users.length} users. Resetting all passwords...\n`);

    // Update all users
    for (const user of users) {
      user.password = hashedPassword;
      await user.save();
      console.log(`✅ ${user.email} - Password reset`);
    }

    console.log("\n" + "=".repeat(60));
    console.log("🎉 ALL PASSWORDS RESET SUCCESSFULLY!");
    console.log("=".repeat(60));
    console.log("\n🔑 Default Password for ALL users: test123\n");

    console.log("📋 You can now login with any of these accounts:\n");

    const admins = users.filter((u) => u.role === "admin");
    const regularUsers = users.filter((u) => u.role !== "admin");

    console.log("👑 ADMIN ACCOUNTS:");
    admins.forEach((u) => {
      console.log(`   📧 ${u.email}`);
      console.log(`   🔑 test123`);
      console.log(`   👤 ${u.name}\n`);
    });

    console.log("👥 USER ACCOUNTS:");
    regularUsers.forEach((u) => {
      console.log(`   📧 ${u.email}`);
      console.log(`   🔑 test123`);
      console.log(`   👤 ${u.name}\n`);
    });

    console.log("🌐 Login at: http://localhost:5173/login\n");

    process.exit(0);
  } catch (error) {
    console.log("❌ Error:", error.message);
    process.exit(1);
  }
}

resetAllPasswords();
