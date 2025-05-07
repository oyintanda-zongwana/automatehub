const fetch = require('node-fetch');

async function testBackendAI() {
  try {
    console.log('Testing backend AI endpoint...');
    const response = await fetch('http://localhost:5000/api/ai/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'qwen-plus',
        input: {
          messages: [
            {
              role: 'user',
              content: 'Hello, how are you?'
            }
          ]
        },
        parameters: {
          max_tokens: 2000,
          temperature: 0.7
        }
      })
    });

    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Response data:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      stack: error.stack
    });
  }
}

console.log('Starting backend test...');
testBackendAI().then(() => console.log('Test completed')); 