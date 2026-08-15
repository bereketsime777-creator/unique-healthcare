require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect(process.env.MONGODB_URI, {family: 4})
  .then(async () => {
    console.log('✅ Connected to MongoDB\n');
    
    // Find and update the admin user
    const result = await mongoose.connection.db.collection('users').updateOne(
      { email: 'admin@uniquehealthcare.com' },
      {
        $set: {
          role: 'admin',
          name: 'Admin User',
          password: await bcrypt.hash('Admin@123', 10),
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );
    
    if (result.upsertedCount > 0) {
      console.log('✅ Admin account created');
    } else if (result.modifiedCount > 0) {
      console.log('✅ Admin account updated');
    } else {
      console.log('ℹ️  Admin account already correct');
    }
    
    // Verify
    const admin = await mongoose.connection.db.collection('users').findOne({
      email: 'admin@uniquehealthcare.com'
    });
    
    console.log('\n📊 Admin Account Details:');
    console.log(`  Email: ${admin.email}`);
    console.log(`  Role: ${admin.role}`);
    console.log(`  Name: ${admin.name}`);
    
    console.log('\n🔐 Login Credentials:');
    console.log('  Email: admin@uniquehealthcare.com');
    console.log('  Password: Admin@123');
    
    console.log('\n⚠️  IMPORTANT NEXT STEPS:');
    console.log('  1. Make sure your backend server is running');
    console.log('  2. Go to: http://localhost:5173/clear-auth.html');
    console.log('  3. Click "Clear Authentication"');
    console.log('  4. Go to login page and login with credentials above');
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });
