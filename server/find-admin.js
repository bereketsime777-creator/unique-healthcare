require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {family: 4})
  .then(async () => {
    console.log('✅ Connected to MongoDB\n');
    
    // Search for admin email
    const adminUser = await mongoose.connection.db.collection('users').findOne({
      email: 'admin@uniquehealthcare.com'
    });
    
    if (adminUser) {
      console.log('✅ Admin account found!\n');
      console.log('Details:');
      console.log(`  ID: ${adminUser._id}`);
      console.log(`  Name: ${adminUser.name}`);
      console.log(`  Email: ${adminUser.email}`);
      console.log(`  Role: ${adminUser.role || 'customer'}`);
      console.log(`  Created: ${adminUser.createdAt || 'N/A'}`);
      console.log(`  Updated: ${adminUser.updatedAt || 'N/A'}`);
      console.log(`  Has Password: ${adminUser.password ? 'Yes' : 'No'}`);
    } else {
      console.log('❌ Admin account NOT found in database');
      console.log('\nSearching all emails...\n');
      
      const allUsers = await mongoose.connection.db.collection('users').find({}).toArray();
      console.log(`Total users: ${allUsers.length}`);
      allUsers.forEach(u => {
        console.log(`  - ${u.email} (${u.role || 'customer'})`);
      });
    }
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  });
