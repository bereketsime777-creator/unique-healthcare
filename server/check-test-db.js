require('dotenv').config();
const mongoose = require('mongoose');

console.log('=== Checking TEST Database ===\n');

mongoose.connect(process.env.MONGODB_URI, {family: 4, dbName: 'test'})
  .then(async () => {
    console.log('✅ Connected to database:', mongoose.connection.name);
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`\n📊 Collections in test database:`);
    
    for(const col of collections) {
      const count = await mongoose.connection.db.collection(col.name).countDocuments();
      console.log(`  - ${col.name}: ${count} documents`);
    }
    
    if (collections.some(c => c.name === 'users')) {
      const users = await mongoose.connection.db.collection('users').find({}).toArray();
      console.log(`\n👥 Users in test database: ${users.length}\n`);
      
      users.forEach((user, i) => {
        console.log(`User ${i + 1}:`);
        console.log(`  Name: ${user.name}`);
        console.log(`  Email: ${user.email}`);
        console.log(`  Role: ${user.role || 'customer'}`);
        console.log(`  Created: ${user.createdAt || 'N/A'}`);
        console.log('');
      });
    }
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  });