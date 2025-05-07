const fetch = require('node-fetch');
require('dotenv').config();

async function testDashScope() {
  try {
    const apiKey = process.env.DASHSCOPE_API_KEY;
    console.log('API Key:', apiKey);
    console.log('API Key length:', apiKey?.length);

    const requestBody = {
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
    };

    console.log('Request body:', JSON.stringify(requestBody, null, 2));
    console.log('Testing DashScope API directly...');
    
    const response = await fetch('https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers.raw());
    const data = await response.json();
    console.log('Response data:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      stack: error.stack
    });
  }
}

console.log('Starting DashScope test...');
testDashScope().then(() => console.log('Test completed')); 