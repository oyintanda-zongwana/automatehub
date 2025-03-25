const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['http', 'email', 'slack', 'database', 'custom']
  },
  config: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  order: {
    type: Number,
    required: true
  }
});

const triggerSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['webhook', 'schedule', 'event', 'manual']
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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  trigger: {
    type: triggerSchema,
    required: true
  },
  actions: [actionSchema],
  status: {
    type: String,
    enum: ['draft', 'active', 'inactive', 'archived'],
    default: 'draft'
  },
  lastRun: {
    type: Date
  },
  nextRun: {
    type: Date
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
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Workflow', workflowSchema); 