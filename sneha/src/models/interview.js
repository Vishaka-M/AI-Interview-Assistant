const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: Date,
  skillLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  topics: [{
    type: String,
    required: true
  }],
  totalScore: {
    type: Number,
    min: 0,
    max: 100
  },
  feedback: String,
  audioUrl: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Interview', interviewSchema);