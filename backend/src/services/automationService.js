import cron from 'node-cron';
import { Configuration, OpenAIApi } from 'openai';
import { GoogleTranslate } from '@google-cloud/translate';
import { PDFDocument } from 'pdf-lib';
import Tesseract from 'tesseract.js';
import AutomationLog from '../models/AutomationLog.js';

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}));

const translate = new GoogleTranslate({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

// Helper function to create and update logs
async function createLog(automationType, userId, input) {
  return await AutomationLog.create({
    automationType,
    user: userId,
    input,
    executionTime: { start: new Date() }
  });
}

async function updateLog(logId, updates) {
  return await AutomationLog.findByIdAndUpdate(
    logId,
    { ...updates, 'executionTime.end': new Date() },
    { new: true }
  );
}

// Document Translation
export async function translateDocument(userId, document, targetLanguage) {
  const log = await createLog('document_translation', userId, { document, targetLanguage });
  
  try {
    const [translation] = await translate.translate(document, targetLanguage);
    await updateLog(log._id, {
      status: 'success',
      output: { translation }
    });
    return translation;
  } catch (error) {
    await updateLog(log._id, {
      status: 'error',
      error: { message: error.message, stack: error.stack }
    });
    throw error;
  }
}

// Email Summarizer
export async function summarizeEmail(userId, emailContent) {
  const log = await createLog('email_summarizer', userId, { emailContent });
  
  try {
    const completion = await openai.createCompletion({
      model: "gpt-3.5-turbo",
      prompt: `Summarize this email:\n\n${emailContent}`,
      max_tokens: 150
    });
    
    const summary = completion.data.choices[0].text.trim();
    await updateLog(log._id, {
      status: 'success',
      output: { summary }
    });
    return summary;
  } catch (error) {
    await updateLog(log._id, {
      status: 'error',
      error: { message: error.message, stack: error.stack }
    });
    throw error;
  }
}

// Daily Planner Generator
export async function generateDailyPlanner(userId, tasks) {
  const log = await createLog('daily_planner', userId, { tasks });
  
  try {
    const completion = await openai.createCompletion({
      model: "gpt-3.5-turbo",
      prompt: `Create a daily planner for these tasks:\n\n${JSON.stringify(tasks)}`,
      max_tokens: 300
    });
    
    const planner = completion.data.choices[0].text.trim();
    await updateLog(log._id, {
      status: 'success',
      output: { planner }
    });
    return planner;
  } catch (error) {
    await updateLog(log._id, {
      status: 'error',
      error: { message: error.message, stack: error.stack }
    });
    throw error;
  }
}

// Content Calendar Generator
export async function generateContentCalendar(userId, topics, startDate, endDate) {
  const log = await createLog('content_calendar', userId, { topics, startDate, endDate });
  
  try {
    const completion = await openai.createCompletion({
      model: "gpt-3.5-turbo",
      prompt: `Create a content calendar for these topics from ${startDate} to ${endDate}:\n\n${JSON.stringify(topics)}`,
      max_tokens: 500
    });
    
    const calendar = completion.data.choices[0].text.trim();
    await updateLog(log._id, {
      status: 'success',
      output: { calendar }
    });
    return calendar;
  } catch (error) {
    await updateLog(log._id, {
      status: 'error',
      error: { message: error.message, stack: error.stack }
    });
    throw error;
  }
}

// Sentiment Analysis
export async function analyzeSentiment(userId, text) {
  const log = await createLog('sentiment_analysis', userId, { text });
  
  try {
    const completion = await openai.createCompletion({
      model: "gpt-3.5-turbo",
      prompt: `Analyze the sentiment of this text:\n\n${text}`,
      max_tokens: 100
    });
    
    const sentiment = completion.data.choices[0].text.trim();
    await updateLog(log._id, {
      status: 'success',
      output: { sentiment }
    });
    return sentiment;
  } catch (error) {
    await updateLog(log._id, {
      status: 'error',
      error: { message: error.message, stack: error.stack }
    });
    throw error;
  }
}

// Contract Reviewer
export async function reviewContract(userId, contractText) {
  const log = await createLog('contract_review', userId, { contractText });
  
  try {
    const completion = await openai.createCompletion({
      model: "gpt-3.5-turbo",
      prompt: `Review this contract and highlight important points and potential issues:\n\n${contractText}`,
      max_tokens: 500
    });
    
    const review = completion.data.choices[0].text.trim();
    await updateLog(log._id, {
      status: 'success',
      output: { review }
    });
    return review;
  } catch (error) {
    await updateLog(log._id, {
      status: 'error',
      error: { message: error.message, stack: error.stack }
    });
    throw error;
  }
}

// SEO Score Generator
export async function generateSEOScore(userId, content) {
  const log = await createLog('seo_score', userId, { content });
  
  try {
    const completion = await openai.createCompletion({
      model: "gpt-3.5-turbo",
      prompt: `Analyze this content for SEO and provide a score and recommendations:\n\n${content}`,
      max_tokens: 300
    });
    
    const seoAnalysis = completion.data.choices[0].text.trim();
    await updateLog(log._id, {
      status: 'success',
      output: { seoAnalysis }
    });
    return seoAnalysis;
  } catch (error) {
    await updateLog(log._id, {
      status: 'error',
      error: { message: error.message, stack: error.stack }
    });
    throw error;
  }
}

// PDF Content Extractor
export async function extractPDFContent(userId, pdfBuffer) {
  const log = await createLog('pdf_extraction', userId, { pdfBuffer });
  
  try {
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const pages = pdfDoc.getPages();
    const content = [];
    
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const text = await page.getText();
      content.push(text);
    }
    
    await updateLog(log._id, {
      status: 'success',
      output: { content }
    });
    return content;
  } catch (error) {
    await updateLog(log._id, {
      status: 'error',
      error: { message: error.message, stack: error.stack }
    });
    throw error;
  }
}

// OCR from Images
export async function performOCR(userId, imageBuffer) {
  const log = await createLog('ocr', userId, { imageBuffer });
  
  try {
    const result = await Tesseract.recognize(imageBuffer);
    await updateLog(log._id, {
      status: 'success',
      output: { text: result.data.text }
    });
    return result.data.text;
  } catch (error) {
    await updateLog(log._id, {
      status: 'error',
      error: { message: error.message, stack: error.stack }
    });
    throw error;
  }
}

// Support Ticket Tagger
export async function tagSupportTicket(userId, ticketContent) {
  const log = await createLog('ticket_tagger', userId, { ticketContent });
  
  try {
    const completion = await openai.createCompletion({
      model: "gpt-3.5-turbo",
      prompt: `Analyze this support ticket and suggest appropriate tags:\n\n${ticketContent}`,
      max_tokens: 100
    });
    
    const tags = completion.data.choices[0].text.trim();
    await updateLog(log._id, {
      status: 'success',
      output: { tags }
    });
    return tags;
  } catch (error) {
    await updateLog(log._id, {
      status: 'error',
      error: { message: error.message, stack: error.stack }
    });
    throw error;
  }
}

// Schedule automations
export function scheduleAutomations() {
  // Schedule daily planner generation at 6 AM
  cron.schedule('0 6 * * *', async () => {
    // Get users with daily planner enabled
    const users = await User.find({ 'preferences.dailyPlanner': true });
    
    for (const user of users) {
      try {
        const tasks = await getTasksForUser(user._id);
        await generateDailyPlanner(user._id, tasks);
      } catch (error) {
        console.error(`Failed to generate daily planner for user ${user._id}:`, error);
      }
    }
  });

  // Schedule content calendar generation every Monday at 9 AM
  cron.schedule('0 9 * * 1', async () => {
    const users = await User.find({ 'preferences.contentCalendar': true });
    
    for (const user of users) {
      try {
        const topics = await getTopicsForUser(user._id);
        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 7);
        
        await generateContentCalendar(user._id, topics, startDate, endDate);
      } catch (error) {
        console.error(`Failed to generate content calendar for user ${user._id}:`, error);
      }
    }
  });
} 