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

console.log('=== Reset User Password (Test Database) ===\n');

mongoose.connect(process.env.MONGODB_URI, {family: 4, dbName: 'test'})
  .then(async () => {
    console.log('✅ Connected to test database\n');
    
    const userEmail = 'bereketsime777@gmail.com'; // One of the users in test DB
    const newPassword = 'user123'; // Default password
    
    const user = await User.findOne({ email: userEmail });
    
    if (user) {
      console.log('Found user:');
      console.log(`Email: ${user.email}`);
      console.log(`Name: ${user.name}\n`);
      
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
      
      console.log('✅ User password has been reset successfully!\n');
      console.log('=== Login Credentials ===');
      console.log(`Email: ${userEmail}`);
      console.log(`Password: ${newPassword}`);
    } else {
      console.log('❌ User not found');
    }
    
    // Also reset another user
    const userEmail2 = 'bereketsime1a@gmail.com';
    const user2 = await User.findOne({ email: userEmail2 });
    
    if (user2) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user2.password = hashedPassword;
      await user2.save();
      console.log('\n✅ Also reset password for:', userEmail2);
      console.log(`Password: ${newPassword}`);
    }
    
    console.log('\n⚠️  Please login immediately and change your password!');
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });