require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

console.log("=== FULL AUTHENTICATION FLOW TEST ===\n");

async function testAuthFlow() {
  try {
    // Step 1: Connect to database
    console.log("Step 1: Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI, {
      family: 4,
      serverSelectionTimeoutMS: 10000,
    });
    console.log("✅ Connected to database:", mongoose.connection.name);

    const User = require("./models/User");

    // Step 2: Test user creation (like registration)
    console.log("\nStep 2: Testing User Registration...");
    const testEmail = `test_${Date.now()}@test.com`;
    const testPassword = "test123456";

    const hashedPassword = await bcrypt.hash(testPassword, 10);
    const testUser = await User.create({
      name: "Test User",
      email: testEmail,
      phone: "+251900000000",
      password: hashedPassword,
      role: "user",
    });
    console.log("✅ Test user created:", testUser.email);

    // Step 3: Test password verification (like login)
    console.log("\nStep 3: Testing Login (Password Verification)...");
    const foundUser = await User.findOne({ email: testEmail });
    const isPasswordValid = await bcrypt.compare(testPassword, foundUser.password);
    
    if (!isPasswordValid) {
      console.log("❌ Password verification failed!");
      process.exit(1);
    }
    console.log("✅ Password verified successfully");

    // Step 4: Test JWT token generation
    console.log("\nStep 4: Testing JWT Token Generation...");
    const token = jwt.sign(
      { id: foundUser._id, role: foundUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    console.log("✅ JWT token generated");
    console.log("   Token preview:", token.substring(0, 50) + "...");

    // Step 5: Test JWT token verification
    console.log("\nStep 5: Testing JWT Token Verification...");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token verified successfully");
    console.log("   User ID from token:", decoded.id);
    console.log("   Role from token:", decoded.role);

    // Step 6: Test finding user by ID (like protect middleware)
    console.log("\nStep 6: Testing User Lookup by ID...");
    const userFromToken = await User.findById(decoded.id).select("-password");
    if (!userFromToken) {
      console.log("❌ User not found by ID!");
      process.exit(1);
    }
    console.log("✅ User found:", userFromToken.email);

    // Cleanup
    console.log("\nStep 7: Cleaning up test data...");
    await User.deleteOne({ _id: testUser._id });
    console.log("✅ Test user deleted");

    console.log("\n" + "=".repeat(50));
    console.log("🎉 ALL AUTHENTICATION TESTS PASSED!");
    console.log("=".repeat(50));
    console.log("\n✅ Your authentication system is working correctly!");
    console.log("\nYou can now:");
    console.log("  1. Start the backend: npm start");
    console.log("  2. Start the frontend: cd ../client && npm run dev");
    console.log("  3. Register a new account");
    console.log("  4. Login with your credentials");

    process.exit(0);
  } catch (error) {
    console.log("\n❌ Test failed:", error.message);
    console.log("\nPossible issues:");
    console.log("  • MongoDB password not set in .env");
    console.log("  • Database connection failed");
    console.log("  • JWT_SECRET not set");
    console.log("\nRun: node diagnose-auth.js for detailed diagnostics");
    process.exit(1);
  }
}

testAuthFlow();
