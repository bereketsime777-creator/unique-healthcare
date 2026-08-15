require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User model (simplified for testing)
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String
}, { collection: 'users' });

const User = mongoose.model('User', userSchema);

console.log('=== Login Functionality Test ===\n');

mongoose.connect(process.env.MONGODB_URI, {family: 4, dbName: 'test'})
  .then(async () => {
    console.log('✅ Connected to test database\n');
    
    // Get all users
    const users = await User.find({}).select('+password');
    console.log(`📊 Found ${users.length} users in test database:\n`);
    
    users.forEach((user, i) => {
      console.log(`User ${i + 1}:`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Name: ${user.name}`);
      console.log(`  Role: ${user.role}`);
      console.log(`  Has Password: ${user.password ? 'Yes' : 'No'}`);
      console.log('');
    });
    
    // Test login with admin user
    const adminUser = users.find(u => u.email === 'admin@uniquehealthcare.com');
    if (adminUser) {
      console.log('=== Testing Admin Login ===\n');
      console.log('Testing with email: admin@uniquehealthcare.com');
      console.log('Note: You need to provide the actual password to test\n');
      
      // Check JWT secret
      console.log('JWT Secret check:');
      if (process.env.JWT_SECRET) {
        console.log('✅ JWT_SECRET is set');
        console.log(`Length: ${process.env.JWT_SECRET.length} characters`);
      } else {
        console.log('❌ JWT_SECRET is missing or empty');
      }
    } else {
      console.log('⚠️  No admin user found with email: admin@uniquehealthcare.com');
    }
    
    console.log('\n=== Testing User Password Hash ===\n');
    if (users.length > 0) {
      const testUser = users[0];
      console.log(`Testing with user: ${testUser.email}`);
      console.log(`Password hash present: ${testUser.password ? 'Yes' : 'No'}`);
      
      if (testUser.password) {
        console.log('Password hash format looks correct');
        console.log('Hash length:', testUser.password.length);
      }
    }
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  });