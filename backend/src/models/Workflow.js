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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive'
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
      type: mongoose.Schema.Types.Mixed
    }
  }],
  schedule: {
    type: String,
    trim: true
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
workflowSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Add indexes for better query performance
workflowSchema.index({ user: 1, status: 1 });
workflowSchema.index({ user: 1, lastRun: -1 });

const Workflow = mongoose.model('Workflow', workflowSchema);

export default Workflow;