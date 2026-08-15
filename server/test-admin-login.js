require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

mongoose.connect(process.env.MONGODB_URI, {family: 4})
  .then(async () => {
    console.log('✅ Connected to MongoDB\n');
    
    // Get admin user from database
    const user = await mongoose.connection.db.collection('users').findOne({
      email: 'admin@uniquehealthcare.com'
    });
    
    if (!user) {
      console.log('❌ Admin user not found');
      process.exit(1);
    }
    
    console.log('📊 Database Record:');
    console.log(`  Email: ${user.email}`);
    console.log(`  Role: ${user.role}`);
    console.log(`  Name: ${user.name}`);
    
    // Test password
    const isMatch = await bcrypt.compare('Admin@123', user.password);
    console.log(`\n🔐 Password Check: ${isMatch ? '✅ Valid' : '❌ Invalid'}`);
    
    if (isMatch) {
      // Generate token like the login endpoint does
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      
      console.log('\n🎫 JWT Token Generated:');
      console.log(token);
      
      // Decode to verify
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('\n🔍 Token Decoded:');
      console.log(`  User ID: ${decoded.id}`);
      console.log(`  Role: ${decoded.role}`);
      
      console.log('\n✅ Login should return:');
      console.log(JSON.stringify({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }, null, 2));
    }
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });
