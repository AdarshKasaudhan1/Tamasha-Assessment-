const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    portfolioUrl: {
      type: String,
      trim: true,
      default: ''
    },
    primaryTrack: {
      type: String,
      required: true
    },
    experienceLevel: {
      type: String,
      required: true
    },
    techStack: {
      type: [String],
      default: []
    },
    submittedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Submission', submissionSchema);
