import axios from 'axios';
import { AI_CONFIG } from '../config/ai';

class AIService {
  constructor() {
    // Remove baseURL since we're using the full path in requests
  }

  async makeRequest(messages) {
    try {
      const response = await axios.post('/api/ai/generate', {
        model: AI_CONFIG.defaultModel,
        input: messages, // Send messages directly
        parameters: {
          max_tokens: AI_CONFIG.maxTokens,
          temperature: AI_CONFIG.temperature
        }
      });
      return response.data;
    } catch (error) {
      console.error('AI request failed:', error);
      throw new Error(error.response?.data?.message || error.message);
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