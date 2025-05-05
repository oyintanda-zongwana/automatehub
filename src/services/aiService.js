import { AI_CONFIG } from '../config/ai';

class AIService {
  constructor() {
    this.apiKey = AI_CONFIG.apiKey;
    this.baseURL = '/api'; // Use our backend API endpoint
  }

  async makeRequest(messages) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${this.baseURL}/ai/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          model: AI_CONFIG.defaultModel,
          input: {
            messages: messages
          },
          parameters: {
            max_tokens: AI_CONFIG.maxTokens,
            temperature: AI_CONFIG.temperature
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`AI API error: ${errorData.message || response.statusText}`);
      }

      const data = await response.json();
      return {
        choices: [{
          message: {
            content: data.output.text
          }
        }]
      };
    } catch (error) {
      console.error('AI request failed:', error);
      throw error;
    }
  }

  async summarizeText(text) {
    return this.makeRequest([
      {
        role: 'system',
        content: 'You are a helpful assistant that summarizes text.'
      },
      {
        role: 'user',
        content: `Please summarize the following text:\n\n${text}`
      }
    ]);
  }

  async translateText(text, targetLanguage) {
    return this.makeRequest([
      {
        role: 'system',
        content: `You are a helpful assistant that translates text to ${targetLanguage}.`
      },
      {
        role: 'user',
        content: `Please translate the following text to ${targetLanguage}:\n\n${text}`
      }
    ]);
  }

  async classifyContent(text, categories) {
    return this.makeRequest([
      {
        role: 'system',
        content: `You are a helpful assistant that classifies text into the following categories: ${categories.join(', ')}.`
      },
      {
        role: 'user',
        content: `Please classify the following text into one of these categories: ${categories.join(', ')}\n\n${text}`
      }
    ]);
  }

  async extractInformation(text, fields) {
    return this.makeRequest([
      {
        role: 'system',
        content: `You are a helpful assistant that extracts specific information from text. Please extract the following fields: ${fields.join(', ')}.`
      },
      {
        role: 'user',
        content: `Please extract the following information from this text: ${fields.join(', ')}\n\n${text}`
      }
    ]);
  }
}

export const aiService = new AIService(); 