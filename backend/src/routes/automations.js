import express from 'express';
import { body } from 'express-validator';
import auth from '../middleware/auth.js';
import * as automationController from '../controllers/automationController.js';

const router = express.Router();

// Get automation logs
router.get('/logs', auth, automationController.getLogs);

// Document Translation
router.post('/translate', [
  auth,
  body('document', 'Document is required').not().isEmpty(),
  body('targetLanguage', 'Target language is required').not().isEmpty()
], automationController.translateDocument);

// Email Summarizer
router.post('/summarize-email', [
  auth,
  body('emailContent', 'Email content is required').not().isEmpty()
], automationController.summarizeEmail);

// Daily Planner Generator
router.post('/daily-planner', [
  auth,
  body('tasks', 'Tasks array is required').isArray()
], automationController.generateDailyPlanner);

// Content Calendar Generator
router.post('/content-calendar', [
  auth,
  body('topics', 'Topics array is required').isArray(),
  body('startDate', 'Start date is required').isISO8601(),
  body('endDate', 'End date is required').isISO8601()
], automationController.generateContentCalendar);

// Sentiment Analysis
router.post('/sentiment-analysis', [
  auth,
  body('text', 'Text is required').not().isEmpty()
], automationController.analyzeSentiment);

// Contract Reviewer
router.post('/contract-review', [
  auth,
  body('contractText', 'Contract text is required').not().isEmpty()
], automationController.reviewContract);

// SEO Score Generator
router.post('/seo-score', [
  auth,
  body('content', 'Content is required').not().isEmpty()
], automationController.generateSEOScore);

// PDF Content Extractor
router.post('/pdf-extract', [
  auth,
  body('pdfBuffer', 'PDF buffer is required').not().isEmpty()
], automationController.extractPDFContent);

// OCR from Images
router.post('/ocr', [
  auth,
  body('imageBuffer', 'Image buffer is required').not().isEmpty()
], automationController.performOCR);

// Support Ticket Tagger
router.post('/ticket-tag', [
  auth,
  body('ticketContent', 'Ticket content is required').not().isEmpty()
], automationController.tagSupportTicket);

export default router; 