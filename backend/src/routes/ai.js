import express from 'express';
import { AI_CONFIG } from '../config/ai.js';

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

    const response = await fetch(`${AI_CONFIG.baseURL}/services/aigc/text-generation/generation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_CONFIG.apiKey}`
      },
      body: JSON.stringify({
        model: model || AI_CONFIG.defaultModel,
        input: input,
        parameters: {
          max_tokens: parameters?.max_tokens || AI_CONFIG.maxTokens,
          temperature: parameters?.temperature || AI_CONFIG.temperature
        }
      })
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