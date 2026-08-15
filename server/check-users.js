require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {family: 4})
  .then(async () => {
    console.log('✅ Connected to MongoDB\n');
    
    const users = await mongoose.connection.db.collection('users').find({}).toArray();
    
    console.log(`📊 Total Users: ${users.length}\n`);
    
    users.forEach((user, i) => {
      console.log(`User ${i + 1}:`);
      console.log(`  Name: ${user.name}`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Role: ${user.role || 'customer'}`);
      console.log(`  Created: ${user.createdAt || 'N/A'}`);
      console.log('');
    });
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  });
