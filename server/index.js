const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Submission = require('./models/Submission');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/assessment_db';

app.use(cors({
  origin: ['http://localhost:3001'],
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.get('/api/submissions', async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ submittedAt: -1 });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch submissions', details: err.message });
  }
});

app.post('/api/submissions', async (req, res) => {
  try {
    const {
      fullName,
      email,
      portfolioUrl,
      primaryTrack,
      experienceLevel,
      techStack
    } = req.body;

    if (!fullName || !email || !primaryTrack || !experienceLevel) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newSubmission = new Submission({
      fullName,
      email,
      portfolioUrl,
      primaryTrack,
      experienceLevel,
      techStack
    });

    const saved = await newSubmission.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save submission', details: err.message });
  }
});

app.delete('/api/submissions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Submission.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    res.json({ success: true, message: 'Submission deleted', id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete submission', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Assessment API server running on http://localhost:${PORT}`);
});
