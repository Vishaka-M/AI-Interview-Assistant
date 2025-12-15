const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middleware/auth');
const { uploadAudio } = require('../middleware/audioUpload');
const {
  createInterview,
  getInterview,
  uploadAudio: handleAudioUpload,
  submitFeedback
} = require('../controllers/interviewController');

// Protected routes
router.use(auth);

// Create new interview
router.post('/', createInterview);

// Get interview by ID
router.get('/:id', getInterview);

// Upload interview audio
router.post('/:id/audio', uploadAudio, handleAudioUpload);

// Submit interview feedback (recruiter only)
router.post('/:id/feedback', checkRole(['recruiter', 'admin']), submitFeedback);

module.exports = router;