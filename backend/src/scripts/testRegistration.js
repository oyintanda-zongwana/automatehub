import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = process.env.API_URL || 'https://automatehub-pdpd.onrender.com';
const EMAIL = `test${Date.now()}@example.com`;

async function testRegistration() {
  try {
    console.log('Testing registration endpoint...');
    console.log(`API URL: ${API_URL}`);
    console.log(`Test email: ${EMAIL}`);
    
    // Registration data
    const userData = {
      name: 'Test User',
      email: EMAIL,
      password: 'password123'
    };
    
    console.log('Sending registration request with data:', {
      ...userData,
      password: '[REDACTED]'
    });
    
    // Make the request
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers.raw());
    
    const data = await response.json();
    console.log('Response data:', data);
    
    if (response.ok) {
      console.log('✅ Registration test passed!');
    } else {
      console.log('❌ Registration test failed!');
    }
  } catch (error) {
    console.error('Test error:', error);
  }
}

testRegistration(); 