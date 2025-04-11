import axios from 'axios';
import nodemailer from 'nodemailer';
import { Configuration, OpenAIApi } from 'openai';

// HTTP Action Executor
export const executeHttpAction = async (config, triggerData) => {
  try {
    const { method, url, headers, body, queryParams } = config;
    
    // Replace variables in URL, headers, and body with trigger data
    const processedUrl = replaceVariables(url, triggerData);
    const processedHeaders = replaceVariables(headers, triggerData);
    const processedBody = replaceVariables(body, triggerData);
    const processedQueryParams = replaceVariables(queryParams, triggerData);

    const response = await axios({
      method,
      url: processedUrl,
      headers: processedHeaders,
      data: processedBody,
      params: processedQueryParams
    });

    return response.data;
  } catch (error) {
    console.error('Error executing HTTP action:', error);
    throw error;
  }
};

// Email Action Executor
export const executeEmailAction = async (config, triggerData) => {
  try {
    const { to, subject, body, smtpConfig } = config;
    
    // Replace variables in email content with trigger data
    const processedTo = replaceVariables(to, triggerData);
    const processedSubject = replaceVariables(subject, triggerData);
    const processedBody = replaceVariables(body, triggerData);

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.secure,
      auth: {
        user: smtpConfig.username,
        pass: smtpConfig.password
      }
    });

    // Send email
    await transporter.sendMail({
      from: smtpConfig.from,
      to: processedTo,
      subject: processedSubject,
      html: processedBody
    });
  } catch (error) {
    console.error('Error executing email action:', error);
    throw error;
  }
};

// AI Action Executor
export const executeAiAction = async (config, triggerData) => {
  try {
    const { model, prompt, maxTokens, temperature } = config;
    
    // Replace variables in prompt with trigger data
    const processedPrompt = replaceVariables(prompt, triggerData);

    // Initialize OpenAI API
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY
    });
    const openai = new OpenAIApi(configuration);

    // Generate completion
    const completion = await openai.createCompletion({
      model,
      prompt: processedPrompt,
      max_tokens: maxTokens,
      temperature
    });

    return completion.data.choices[0].text;
  } catch (error) {
    console.error('Error executing AI action:', error);
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