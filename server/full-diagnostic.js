require('dotenv').config();
const mongoose = require('mongoose');

console.log('=== Full Database Diagnostic ===\n');

console.log('1. CONNECTION STRING ANALYSIS');
console.log('==============================');
const uri = process.env.MONGODB_URI;
console.log('Your connection string (hidden password):');
const maskedUri = uri.replace(/:([^:@]{8})[^:@]*@/, ':****@');
console.log(maskedUri);

console.log('\n2. DATABASE NAME CHECK');
console.log('======================');
if (uri.includes('/unique-healthcare')) {
  console.log('✅ Connection string specifies database: unique-healthcare');
} else if (uri.includes('/test')) {
  console.log('❌ Connection string specifies database: test');
} else if (uri.match(/\/[^/?]/)) {
  const match = uri.match(/\/([^/?]+)/);
  console.log(`⚠️  Connection string specifies database: ${match[1]}`);
} else {
  console.log('⚠️  No database specified in connection string');
  console.log('MongoDB will default to "test" database');
}

console.log('\n3. TESTING ACTUAL CONNECTION');
console.log('=============================');

mongoose.connect(uri, {family: 4})
  .then(async () => {
    console.log('✅ Connected successfully');
    console.log('Actual database in use:', mongoose.connection.name);
    console.log('Connection host:', mongoose.connection.host);
    
    console.log('\n4. CHECKING ALL DATABASES ON CLUSTER');
    console.log('====================================');
    
    const adminDb = mongoose.connection.db.admin();
    const databases = await adminDb.listDatabases();
    
    console.log('Available databases on this cluster:');
    databases.databases.forEach(db => {
      const sizeOnDisk = db.sizeOnDisk ? `${(db.sizeOnDisk / 1024).toFixed(2)} KB` : 'empty';
      console.log(`  - ${db.name} (${sizeOnDisk})`);
    });
    
    console.log('\n5. CURRENT DATABASE CONTENTS');
    console.log('============================');
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`Database "${mongoose.connection.name}" contains ${collections.length} collections:`);
    
    for(const col of collections) {
      const count = await mongoose.connection.db.collection(col.name).countDocuments();
      console.log(`  - ${col.name}: ${count} documents`);
    }
    
    console.log('\n6. RECOMMENDATION');
    console.log('==================');
    if (mongoose.connection.name === 'unique-healthcare') {
      console.log('✅ Your application is correctly configured!');
      console.log('✅ New registrations should go to "unique-healthcare" database');
      console.log('');
      console.log('If you still see users in "test" database:');
      console.log('1. Make sure your .env file is being loaded correctly');
      console.log('2. Restart your server after any .env changes');
      console.log('3. Check if you have multiple .env files in different directories');
      console.log('4. Verify you are looking at the correct cluster in MongoDB Atlas');
    } else {
      console.log('❌ Your application is connected to wrong database!');
      console.log(`❌ Currently using: ${mongoose.connection.name}`);
      console.log('❌ Should be using: unique-healthcare');
      console.log('');
      console.log('To fix this, update your MONGODB_URI to include /unique-healthcare');
    }
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  });