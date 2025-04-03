import mongoose from 'mongoose';

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
  steps: [{
    type: {
      type: String,
      required: true,
      enum: ['trigger', 'action', 'condition']
    },
    name: {
      type: String,
      required: true
    },
    config: {
      type: Map,
      of: mongoose.Schema.Types.Mixed
    }
  }],
  status: {
    type: String,
    enum: ['active', 'inactive', 'draft'],
    default: 'draft'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastRun: {
    type: Date
  },
  nextRun: {
    type: Date
  },
  schedule: {
    type: String,
    enum: ['manual', 'daily', 'weekly', 'monthly', 'custom'],
    default: 'manual'
  },
  scheduleConfig: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  successCount: {
    type: Number,
    default: 0
  },
  failureCount: {
    type: Number,
    default: 0
  },
  errorLog: [{
    timestamp: Date,
    message: String,
    details: mongoose.Schema.Types.Mixed
  }]
}, {
  timestamps: true
});

// Index for faster queries
workflowSchema.index({ user: 1, status: 1 });
workflowSchema.index({ nextRun: 1 });

const Workflow = mongoose.model('Workflow', workflowSchema);

export default Workflow; 