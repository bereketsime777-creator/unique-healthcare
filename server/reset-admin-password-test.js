require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Simple user schema for testing
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String
}, { collection: 'users' });

const User = mongoose.model('User', userSchema);

console.log('=== Reset Admin Password (Test Database) ===\n');

mongoose.connect(process.env.MONGODB_URI, {family: 4, dbName: 'test'})
  .then(async () => {
    console.log('✅ Connected to test database\n');
    
    const adminEmail = 'admin@uniquehealthcare.com';
    const newPassword = 'admin123'; // Default password
    
    const admin = await User.findOne({ email: adminEmail });
    
    if (admin) {
      console.log('Found admin user:');
      console.log(`Email: ${admin.email}`);
      console.log(`Name: ${admin.name}\n`);
      
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      admin.password = hashedPassword;
      await admin.save();
      
      console.log('✅ Admin password has been reset successfully!\n');
      console.log('=== Login Credentials ===');
      console.log(`Email: ${adminEmail}`);
      console.log(`Password: ${newPassword}`);
      console.log('\n⚠️  Please login immediately and change your password!');
    } else {
      console.log('❌ Admin user not found. Creating new admin user...\n');
      
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      await User.create({
        name: 'Admin User',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      });
      
      console.log('✅ New admin user created!\n');
      console.log('=== Login Credentials ===');
      console.log(`Email: ${adminEmail}`);
      console.log(`Password: ${newPassword}`);
      console.log('\n⚠️  Please login immediately and change your password!');
    }
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });