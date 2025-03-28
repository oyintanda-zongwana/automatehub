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
      enum: ['http', 'email', 'delay', 'condition']
    },
    config: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    }
  }],
  status: {
    type: String,
    enum: ['active', 'inactive', 'error'],
    default: 'inactive'
  },
  lastRun: {
    type: Date
  },
  successCount: {
    type: Number,
    default: 0
  },
  failureCount: {
    type: Number,
    default: 0
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
workflowSchema.index({ user: 1, status: 1 });
workflowSchema.index({ user: 1, lastRun: -1 });

const Workflow = mongoose.model('Workflow', workflowSchema);

export default Workflow;