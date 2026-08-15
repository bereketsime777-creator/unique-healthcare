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

console.log('=== Test Login Credentials ===\n');

mongoose.connect(process.env.MONGODB_URI, {family: 4, dbName: 'test'})
  .then(async () => {
    console.log('✅ Connected to test database\n');
    
    const users = await User.find({}).select('+password');
    console.log('Available users for login:\n');
    
    users.forEach((user, i) => {
      console.log(`${i + 1}. Email: ${user.email}`);
      console.log(`   Name: ${user.name}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Password: [You need to know the original password]`);
      console.log('');
    });
    
    console.log('=== Admin Account Information ===\n');
    const admin = users.find(u => u.role === 'admin');
    if (admin) {
      console.log('Admin user found:');
      console.log(`Email: ${admin.email}`);
      console.log(`Name: ${admin.name}`);
      console.log('\n⚠️  If you don\'t remember the admin password, you can reset it.');
    } else {
      console.log('❌ No admin user found in test database');
      console.log('Creating a new admin user...\n');
      
      const defaultPassword = 'admin123';
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);
      
      await User.create({
        name: 'Admin User',
        email: 'admin@uniquehealthcare.com',
        password: hashedPassword,
        role: 'admin'
      });
      
      console.log('✅ New admin user created!');
      console.log('Email: admin@uniquehealthcare.com');
      console.log('Password: admin123');
      console.log('\nPlease login with these credentials and change the password immediately.');
    }
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });