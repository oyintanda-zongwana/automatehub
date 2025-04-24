import mongoose from 'mongoose';

const automationLogSchema = new mongoose.Schema({
  automationType: {
    type: String,
    required: true,
    enum: [
      'document_translation',
      'email_summarizer',
      'daily_planner',
      'content_calendar',
      'sentiment_analysis',
      'contract_review',
      'seo_score',
      'pdf_extraction',
      'ocr',
      'ticket_tagger'
    ]
  },
  status: {
    type: String,
    required: true,
    enum: ['success', 'error', 'in_progress'],
    default: 'in_progress'
  },
  input: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  output: {
    type: mongoose.Schema.Types.Mixed
  },
  error: {
    message: String,
    stack: String
  },
  executionTime: {
    start: Date,
    end: Date
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
automationLogSchema.index({ automationType: 1, createdAt: -1 });
automationLogSchema.index({ user: 1, createdAt: -1 });

const AutomationLog = mongoose.model('AutomationLog', automationLogSchema);

export default AutomationLog; 