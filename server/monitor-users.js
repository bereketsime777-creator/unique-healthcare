require('dotenv').config();
const mongoose = require('mongoose');

console.log('=== Real-time User Monitor ===\n');
console.log('This script will check for new users every 5 seconds');
console.log('Press Ctrl+C to stop\n');

mongoose.connect(process.env.MONGODB_URI, {family: 4})
  .then(async () => {
    console.log('✅ Connected to database:', mongoose.connection.name);
    console.log('Monitoring for new users...\n');
    
    let previousUsers = [];
    
    const checkForNewUsers = async () => {
      const users = await mongoose.connection.db.collection('users').find({}).toArray();
      
      if (users.length > previousUsers.length) {
        const newUser = users[users.length - 1];
        console.log('🆕 NEW USER DETECTED!');
        console.log('   Name:', newUser.name);
        console.log('   Email:', newUser.email);
        console.log('   Database:', mongoose.connection.name);
        console.log('   Time:', new Date().toLocaleString());
        console.log('');
      }
      
      previousUsers = users;
    };
    
    // Initial check
    await checkForNewUsers();
    console.log(`Current users in ${mongoose.connection.name}:`, previousUsers.length);
    console.log('Register a new user in your website to see where it goes...\n');
    
    // Check every 5 seconds
    setInterval(checkForNewUsers, 5000);
  })
  .catch(err => {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  });