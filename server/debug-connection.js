require('dotenv').config();
const mongoose = require('mongoose');

console.log('=== MongoDB Connection Debug ===\n');
console.log('MONGODB_URI from .env:');
console.log(process.env.MONGODB_URI);
console.log('\n=== Analyzing Connection String ===\n');

const uri = process.env.MONGODB_URI;

// Check if database name is specified in connection string
if (uri.includes('/unique-healthcare')) {
  console.log('✅ Database name "unique-healthcare" is specified in connection string');
} else if (uri.includes('/test')) {
  console.log('❌ Database name "test" is specified in connection string');
} else {
  console.log('⚠️  No specific database name in connection string');
  console.log('MongoDB might be connecting to default "test" database');
}

mongoose.connect(uri, {family: 4})
  .then(async () => {
    console.log('\n=== Actual Connection Details ===\n');
    console.log('Connected to database:', mongoose.connection.name);
    console.log('Connection host:', mongoose.connection.host);
    
    // Check if we're in the right database
    if (mongoose.connection.name === 'unique-healthcare') {
      console.log('✅ Correctly connected to "unique-healthcare" database');
    } else if (mongoose.connection.name === 'test') {
      console.log('❌ Connected to "test" database - this is wrong!');
      console.log('Please update your MONGODB_URI to include /unique-healthcare');
    } else {
      console.log('⚠️  Connected to unexpected database:', mongoose.connection.name);
    }
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  });