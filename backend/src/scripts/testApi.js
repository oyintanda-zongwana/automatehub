import fetch from 'node-fetch';

const API_URL = process.env.API_URL || 'https://automatehub-pdpd.onrender.com';

async function testApi() {
  try {
    // Test root endpoint
    console.log('Testing root endpoint...');
    const rootResponse = await fetch(`${API_URL}/`);
    const rootData = await rootResponse.json();
    console.log('Root endpoint response:', rootData);

    // Test registration
    console.log('\nTesting registration endpoint...');
    const registerResponse = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        password: 'password123'
      })
    });
    
    if (registerResponse.ok) {
      const registerData = await registerResponse.json();
      console.log('Registration successful:', registerData);
    } else {
      const errorData = await registerResponse.json();
      console.error('Registration failed:', errorData);
    }
  } catch (error) {
    console.error('API test error:', error);
  }
}

testApi(); 