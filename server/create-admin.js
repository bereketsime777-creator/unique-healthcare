require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect(process.env.MONGODB_URI, {family: 4})
  .then(async () => {
    console.log('✅ Connected to MongoDB\n');
    
    // Check if admin already exists
    const existing = await mongoose.connection.db.collection('users').findOne({
      email: 'admin@uniquehealthcare.com'
    });
    
    if (existing) {
      console.log('⚠️  Admin account already exists!');
      process.exit(0);
    }
    
    // Create admin account
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    
    const adminUser = {
      name: 'Admin User',
      email: 'admin@uniquehealthcare.com',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await mongoose.connection.db.collection('users').insertOne(adminUser);
    
    console.log('✅ Admin account created successfully!\n');
    console.log('Login credentials:');
    console.log('  Email: admin@uniquehealthcare.com');
    console.log('  Password: Admin@123');
    console.log('\n⚠️  IMPORTANT: Change this password after first login!');
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });
