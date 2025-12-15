const Interview = require('../models/interview');
const User = require('../models/user');
const s3Service = require('../services/s3');
const { calculateScore } = require('../services/scoring');

exports.createInterview = async (req, res) => {
  try {
    const interview = new Interview({
      userId: req.user.id,
      ...req.body
    });
    await interview.save();
    
    // Add interview to user's interviews array
    await User.findByIdAndUpdate(req.user.id, {
      $push: { interviews: interview._id }
    });
    
    res.status(201).json(interview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }
    res.json(interview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.uploadAudio = async (req, res) => {
  try {
    const { file } = req;
    const url = await s3Service.uploadFile(file);
    
    const interview = await Interview.findByIdAndUpdate(
      req.params.id,
      { audioUrl: url },
      { new: true }
    );
    
    res.json(interview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.submitFeedback = async (req, res) => {
  try {
    const { feedback, scores } = req.body;
    const totalScore = calculateScore(scores);
    
    const interview = await Interview.findByIdAndUpdate(
      req.params.id,
      {
        feedback,
        totalScore,
        status: 'completed'
      },
      { new: true }
    );
    
    res.json(interview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};