const mongoose = require('mongoose');

const executionSchema = new mongoose.Schema({
  workflow: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workflow',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'running', 'completed', 'failed'],
    default: 'pending'
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  },
  error: {
    message: String,
    stack: String
  },
  input: {
    type: mongoose.Schema.Types.Mixed
  },
  output: {
    type: mongoose.Schema.Types.Mixed
  },
  duration: {
    type: Number // in milliseconds
  }
});

// Calculate duration when execution is completed
executionSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'completed') {
    this.completedAt = Date.now();
    this.duration = this.completedAt - this.startedAt;
  }
  next();
});

module.exports = mongoose.model('Execution', executionSchema); 