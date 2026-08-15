require("dotenv").config();
const mongoose = require("mongoose");

console.log("=== AUTHENTICATION DIAGNOSTIC ===\n");

// Check environment variables
console.log("1. Environment Configuration:");
console.log("   ✓ MONGODB_URI:", process.env.MONGODB_URI ? "SET" : "❌ MISSING");
console.log("   ✓ JWT_SECRET:", process.env.JWT_SECRET ? "SET" : "❌ MISSING");
console.log("   ✓ FRONTEND_URL:", process.env.FRONTEND_URL || "NOT SET (will use default)");
console.log("   ✓ PORT:", process.env.PORT || "5000 (default)");

// Check database connection
console.log("\n2. Testing Database Connection...");
mongoose
  .connect(process.env.MONGODB_URI, {
    family: 4,
    serverSelectionTimeoutMS: 10000,
  })
  .then(async () => {
    console.log("   ✓ MongoDB connected successfully");
    console.log("   ✓ Database:", mongoose.connection.name);
    console.log("   ✓ Host:", mongoose.connection.host);

    // Check User model
    const User = require("./models/User");
    const userCount = await User.countDocuments();
    console.log(`\n3. User Collection:`);
    console.log(`   ✓ Total users: ${userCount}`);

    if (userCount > 0) {
      const users = await User.find().select("name email role createdAt");
      console.log("\n   Users in database:");
      users.forEach((u) => {
        console.log(`   - ${u.email} (${u.role}) - Created: ${u.createdAt.toLocaleDateString()}`);
      });
    } else {
      console.log("   ⚠ No users found. You may need to register.");
    }

    console.log("\n4. CORS Configuration:");
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:5174",
    ].filter(Boolean);
    console.log("   Allowed origins:");
    allowedOrigins.forEach((origin) => console.log(`   - ${origin}`));

    console.log("\n✅ All checks passed! Server should work correctly.");
    console.log("\nNext steps:");
    console.log("1. Make sure frontend is running on http://localhost:5173");
    console.log("2. Start the server with: npm start");
    console.log("3. Try logging in or registering a new account");

    process.exit(0);
  })
  .catch((err) => {
    console.log("   ❌ Database connection failed:", err.message);
    process.exit(1);
  });
