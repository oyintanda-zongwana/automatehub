import express from 'express';
import auth from '../middleware/auth.js';
import { AI_CONFIG } from '../config/ai.js';

const router = express.Router();

// @route   POST api/ai/generate
// @desc    Generate AI response
// @access  Private
router.post('/generate', auth, async (req, res) => {
  try {
    const { model, input, parameters } = req.body;
    
    // Debug logging
    console.log('AI Request:', {
      model: model || AI_CONFIG.defaultModel,
      input,
      parameters: {
        max_tokens: parameters?.max_tokens || AI_CONFIG.maxTokens,
        temperature: parameters?.temperature || AI_CONFIG.temperature
      }
    });
    console.log('API Key present:', !!AI_CONFIG.apiKey);
    console.log('Base URL:', AI_CONFIG.baseURL);

    const response = await fetch(`${AI_CONFIG.baseURL}/services/aigc/text-generation/generation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_CONFIG.apiKey}`
      },
      body: JSON.stringify({
        model: model || AI_CONFIG.defaultModel,
        input: {
          messages: input
        },
        parameters: {
          max_tokens: parameters?.max_tokens || AI_CONFIG.maxTokens,
          temperature: parameters?.temperature || AI_CONFIG.temperature
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('AI API Error:', {
        status: response.status,
        statusText: response.statusText,
        errorData
      });
      throw new Error(`AI API error: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('AI generation error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

export default router; 