import axios from 'axios';
import nodemailer from 'nodemailer';
import OpenAI from 'openai';

// Execute HTTP action
export const executeHttpAction = async (config) => {
  try {
    const response = await axios({
      method: config.method || 'GET',
      url: config.url,
      headers: config.headers,
      data: config.body
    });
    return response.data;
  } catch (error) {
    console.error('HTTP action execution failed:', error);
    throw error;
  }
};

// Execute email action
export const executeEmailAction = async (config) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: config.to,
      subject: config.subject,
      text: config.body,
      html: config.html
    });
  } catch (error) {
    console.error('Email action execution failed:', error);
    throw error;
  }
};

// Execute AI action
export const executeAiAction = async (config) => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const completion = await openai.chat.completions.create({
      model: config.model || 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: config.prompt
        }
      ],
      max_tokens: config.maxTokens || 1000,
      temperature: config.temperature || 0.7
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('AI action execution failed:', error);
    throw error;
  }
};

// Helper function to replace variables in strings/objects
function replaceVariables(input, data) {
  if (!input) return input;
  
  if (typeof input === 'string') {
    return input.replace(/\${([^}]+)}/g, (match, key) => {
      const value = getNestedValue(data, key);
      return value !== undefined ? value : match;
    });
  }
  
  if (typeof input === 'object') {
    const result = Array.isArray(input) ? [] : {};
    for (const key in input) {
      result[key] = replaceVariables(input[key], data);
    }
    return result;
  }
  
  return input;
}

// Helper function to get nested values from objects
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
} 