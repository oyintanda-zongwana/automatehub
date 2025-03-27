const axios = require('axios');
const nodemailer = require('nodemailer');
const { Configuration, OpenAIApi } = require('openai');

// Initialize OpenAI configuration
const openaiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(openaiConfig);

// Initialize email transporter
const emailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Execute HTTP action
exports.executeHttpAction = async (config) => {
  try {
    const { method, url, headers = {}, body } = config;
    
    const response = await axios({
      method: method.toLowerCase(),
      url,
      headers,
      data: body ? JSON.parse(body) : undefined
    });

    return {
      status: response.status,
      statusText: response.statusText,
      data: response.data
    };
  } catch (error) {
    throw new Error(`HTTP request failed: ${error.message}`);
  }
};

// Execute email action
exports.executeEmailAction = async (config) => {
  try {
    const { to, subject, body } = config;

    const info = await emailTransporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html: body
    });

    return {
      messageId: info.messageId,
      response: info.response
    };
  } catch (error) {
    throw new Error(`Email sending failed: ${error.message}`);
  }
};

// Execute AI action
exports.executeAiAction = async (config) => {
  try {
    const { model, prompt } = config;

    const completion = await openai.createChatCompletion({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 500
    });

    return {
      response: completion.data.choices[0].message.content,
      usage: completion.data.usage
    };
  } catch (error) {
    throw new Error(`AI task failed: ${error.message}`);
  }
}; 