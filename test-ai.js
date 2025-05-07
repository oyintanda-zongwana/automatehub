const fetch = require('node-fetch');

async function testAI() {
  try {
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
              role: 'system',
              content: 'You are a helpful assistant.'
            },
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

    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

testAI(); 