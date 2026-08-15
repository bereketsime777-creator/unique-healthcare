require('dotenv').config();
const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

console.log('=== Testing API Endpoints ===\n');

async function testEndpoint(endpoint, method, data) {
  try {
    console.log(`Testing ${method} ${endpoint}...`);
    
    const response = await axios({
      method,
      url: `${API_URL}${endpoint}`,
      data,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Success!');
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(response.data, null, 2));
    console.log('');
    return true;
  } catch (error) {
    console.log('❌ Failed!');
    console.log('Error:', error.response?.data || error.message);
    console.log('');
    return false;
  }
}

async function runTests() {
  console.log('1. Testing Server Health...');
  try {
    const response = await axios.get('http://localhost:5000');
    console.log('✅ Server is running:', response.data);
  } catch (error) {
    console.log('❌ Server not responding:', error.message);
    return;
  }
  
  console.log('\n2. Testing Registration...');
  await testEndpoint('/auth/register', 'post', {
    name: 'Test User',
    email: `test${Date.now()}@example.com`,
    password: 'test123456'
  });
  
  console.log('3. Testing Login with Admin...');
  await testEndpoint('/auth/login', 'post', {
    email: 'admin@uniquehealthcare.com',
    password: 'admin123'
  });
  
  console.log('4. Testing Login with User...');
  await testEndpoint('/auth/login', 'post', {
    email: 'bereketsime777@gmail.com',
    password: 'user123'
  });
  
  console.log('5. Testing Products Endpoint...');
  await testEndpoint('/products', 'get');
  
  console.log('=== Tests Complete ===');
}

runTests().then(() => process.exit(0)).catch(err => {
  console.error('Test suite error:', err.message);
  process.exit(1);
});