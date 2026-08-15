require('dotenv').config();
const mongoose = require('mongoose');

console.log('=== MongoDB Connection Information ===\n');
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('\n=== Connection Details ===\n');

mongoose.connect(process.env.MONGODB_URI, {family: 4})
  .then(async () => {
    console.log('✅ Connected successfully');
    console.log('Database Name:', mongoose.connection.name);
    console.log('Host:', mongoose.connection.host);
    console.log('Port:', mongoose.connection.port);
    
    const adminDb = mongoose.connection.db.admin();
    const serverInfo = await adminDb.serverInfo();
    console.log('MongoDB Version:', serverInfo.version);
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  });