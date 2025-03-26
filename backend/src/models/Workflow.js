import mongoose from 'mongoose';

const actionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: [
      // AI Actions
      'text_generation', 'image_generation', 'text_analysis',
      'sentiment_analysis', 'document_processing', 'translation',
      'summarization', 'classification',
      // Data Processing Actions
      'data_transformation', 'data_validation', 'data_enrichment',
      // Communication Actions
      'email', 'slack', 'webhook', 'sms', 'push_notification',
      // Integration Actions
      'api_request', 'database_operation', 'file_operation', 'queue_message',
      // System Actions
      'script', 'function', 'shell_command'
    ]
  },
  config: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
});

const workflowSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'draft'],
    default: 'draft'
  },
  triggerType: {
    type: String,
    required: true,
    enum: [
      'manual',
      'schedule',
      'webhook',
      'event',
      'file_change',
      'email_received',
      'database_change',
      'api_response',
      'form_submission',
      'message_queue'
    ]
  },
  triggerConfig: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    default: {}
  },
  actions: [actionSchema],
  lastRun: Date,
  nextRun: Date,
  successCount: {
    type: Number,
    default: 0
  },
  failureCount: {
    type: Number,
    default: 0
  },
  averageExecutionTime: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for better query performance
workflowSchema.index({ createdBy: 1, status: 1 });
workflowSchema.index({ triggerType: 1 });
workflowSchema.index({ nextRun: 1 }, { sparse: true });

export default mongoose.model('Workflow', workflowSchema); 