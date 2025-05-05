import OpenAI from 'openai';
import { AI_CONFIG } from '../config/ai';

class AIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: AI_CONFIG.apiKey,
      baseURL: AI_CONFIG.baseURL
    });
  }

  async makeRequest(messages) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: AI_CONFIG.defaultModel,
        messages,
        max_tokens: AI_CONFIG.maxTokens,
        temperature: AI_CONFIG.temperature
      }, {
        path: '/services/aigc/text-generation/generation'
      });
      return completion;
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