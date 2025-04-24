import * as automationService from '../services/automationService.js';
import AutomationLog from '../models/AutomationLog.js';

// Get all automation logs for a user
export const getLogs = async (req, res) => {
  try {
    const logs = await AutomationLog.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(100);
    res.json(logs);
  } catch (error) {
    console.error('Get logs error:', error);
    res.status(500).send('Server error');
  }
};

// Document Translation
export const translateDocument = async (req, res) => {
  try {
    const { document, targetLanguage } = req.body;
    const translation = await automationService.translateDocument(
      req.user._id,
      document,
      targetLanguage
    );
    res.json({ translation });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).send('Server error');
  }
};

// Email Summarizer
export const summarizeEmail = async (req, res) => {
  try {
    const { emailContent } = req.body;
    const summary = await automationService.summarizeEmail(
      req.user._id,
      emailContent
    );
    res.json({ summary });
  } catch (error) {
    console.error('Email summarization error:', error);
    res.status(500).send('Server error');
  }
};

// Daily Planner Generator
export const generateDailyPlanner = async (req, res) => {
  try {
    const { tasks } = req.body;
    const planner = await automationService.generateDailyPlanner(
      req.user._id,
      tasks
    );
    res.json({ planner });
  } catch (error) {
    console.error('Daily planner generation error:', error);
    res.status(500).send('Server error');
  }
};

// Content Calendar Generator
export const generateContentCalendar = async (req, res) => {
  try {
    const { topics, startDate, endDate } = req.body;
    const calendar = await automationService.generateContentCalendar(
      req.user._id,
      topics,
      new Date(startDate),
      new Date(endDate)
    );
    res.json({ calendar });
  } catch (error) {
    console.error('Content calendar generation error:', error);
    res.status(500).send('Server error');
  }
};

// Sentiment Analysis
export const analyzeSentiment = async (req, res) => {
  try {
    const { text } = req.body;
    const sentiment = await automationService.analyzeSentiment(
      req.user._id,
      text
    );
    res.json({ sentiment });
  } catch (error) {
    console.error('Sentiment analysis error:', error);
    res.status(500).send('Server error');
  }
};

// Contract Reviewer
export const reviewContract = async (req, res) => {
  try {
    const { contractText } = req.body;
    const review = await automationService.reviewContract(
      req.user._id,
      contractText
    );
    res.json({ review });
  } catch (error) {
    console.error('Contract review error:', error);
    res.status(500).send('Server error');
  }
};

// SEO Score Generator
export const generateSEOScore = async (req, res) => {
  try {
    const { content } = req.body;
    const seoAnalysis = await automationService.generateSEOScore(
      req.user._id,
      content
    );
    res.json({ seoAnalysis });
  } catch (error) {
    console.error('SEO score generation error:', error);
    res.status(500).send('Server error');
  }
};

// PDF Content Extractor
export const extractPDFContent = async (req, res) => {
  try {
    const { pdfBuffer } = req.body;
    const content = await automationService.extractPDFContent(
      req.user._id,
      Buffer.from(pdfBuffer)
    );
    res.json({ content });
  } catch (error) {
    console.error('PDF extraction error:', error);
    res.status(500).send('Server error');
  }
};

// OCR from Images
export const performOCR = async (req, res) => {
  try {
    const { imageBuffer } = req.body;
    const text = await automationService.performOCR(
      req.user._id,
      Buffer.from(imageBuffer)
    );
    res.json({ text });
  } catch (error) {
    console.error('OCR error:', error);
    res.status(500).send('Server error');
  }
};

// Support Ticket Tagger
export const tagSupportTicket = async (req, res) => {
  try {
    const { ticketContent } = req.body;
    const tags = await automationService.tagSupportTicket(
      req.user._id,
      ticketContent
    );
    res.json({ tags });
  } catch (error) {
    console.error('Ticket tagging error:', error);
    res.status(500).send('Server error');
  }
}; 