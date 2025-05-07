import express from 'express';
import fetch from 'node-fetch';
import { AI_CONFIG } from '../config/ai.js';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

const router = express.Router();

// @route   POST api/ai/generate
// @desc    Generate AI response
// @access  Public
router.post('/generate', async (req, res) => {
  try {
    const { model, input, parameters } = req.body;
    
    console.log('Received AI request:', {
      model,
      input,
      parameters
    });

    console.log('Environment variables:', {
      DASHSCOPE_API_KEY: process.env.DASHSCOPE_API_KEY,
      NODE_ENV: process.env.NODE_ENV
    });

    console.log('AI Config:', {
      apiKey: AI_CONFIG.apiKey,
      baseURL: AI_CONFIG.baseURL,
      defaultModel: AI_CONFIG.defaultModel
    });

    const requestBody = {
      model: model || AI_CONFIG.defaultModel,
      input: {
        messages: input.messages
      },
      parameters: {
        max_tokens: parameters?.max_tokens || AI_CONFIG.maxTokens,
        temperature: parameters?.temperature || AI_CONFIG.temperature
      }
    };

    console.log('Sending request to DashScope:', {
      url: `${AI_CONFIG.baseURL}/services/aigc/text-generation/generation`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_CONFIG.apiKey}`
      },
      body: requestBody
    });

    const response = await fetch(`${AI_CONFIG.baseURL}/services/aigc/text-generation/generation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_CONFIG.apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    console.log('DashScope API response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('DashScope API error:', errorData);
      throw new Error(`AI API error: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    console.log('DashScope API response:', data);
    
    // Transform the DashScope response to match the frontend's expected format
    const transformedResponse = {
      choices: [{
        message: {
          content: data.output?.text || data.output || data.message || 'No response from AI'
        }
      }]
    };
    
    res.json(transformedResponse);
  } catch (error) {
    console.error('AI generation error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

export default router; 