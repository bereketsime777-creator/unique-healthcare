require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

console.log('=== Test Registration ===\n');
console.log('This will create a test user to verify which database is being used\n');

mongoose.connect(process.env.MONGODB_URI, {family: 4})
  .then(async () => {
    console.log('Connected to database:', mongoose.connection.name);
    console.log('Creating test user...\n');
    
    // Create a test user with timestamp
    const timestamp = new Date().toISOString();
    const testUser = await User.create({
      name: `Test User ${timestamp}`,
      email: `test-${Date.now()}@example.com`,
      password: 'test123456',
      role: 'user'
    });
    
    console.log('✅ Test user created successfully!');
    console.log('User ID:', testUser._id);
    console.log('User Email:', testUser.email);
    console.log('Database:', mongoose.connection.name);
    console.log('\n=== INSTRUCTIONS ===');
    console.log('1. Go to MongoDB Atlas');
    console.log('2. Look for the database:', mongoose.connection.name);
    console.log('3. Find the user with email:', testUser.email);
    console.log('4. If you find this user in the "test" database, there is a configuration issue');
    console.log('5. If you find this user in "unique-healthcare", your app is working correctly\n');
    
    // Ask if they want to delete the test user
    console.log('Test user created. You can delete this user after verification.');
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });