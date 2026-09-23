import React from 'react';
import { useFormContext } from '../context/FormContext';
import ReviewCard from '../components/ReviewCard';
import '../styles/pages.css';

const Step4 = () => {
  const { formData, goToStep, isSubmitted, resetForm, submissions, deleteSubmission } = useFormContext();

  if (isSubmitted) {
    return (
      <div className="success-container">
        <div className="success-icon-circle">
          <svg
            className="success-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h3 className="success-title">Application Submitted!</h3>
        <p className="success-subtitle">
          {submissions.length} {submissions.length === 1 ? 'entry' : 'entries'} saved.
        </p>

        <div className="all-submissions">
          {[...submissions].reverse().map((entry, i) => {
            const num = submissions.length - i;
            const originalIndex = submissions.length - 1 - i;
            const entryId = entry._id || entry.id || originalIndex;
            const displayTime = entry.submittedAt
              ? new Date(entry.submittedAt).toLocaleString()
              : 'Just now';

            return (
              <div key={entryId || i} className="submission-card">
                <div className="submission-header">
                  <span className="submission-number">#{num}</span>
                  <span className="submission-time">{displayTime}</span>
                  <button
                    className="btn-delete-entry"
                    onClick={() => deleteSubmission(entryId)}
                    title="Delete this entry"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14H6L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4h6v2" />
                    </svg>
                  </button>
                </div>
                <div className="submitted-data-card">
                  <div className="data-row">
                    <span className="data-label">Full Name</span>
                    <span className="data-value">{entry.fullName}</span>
                  </div>
                  <div className="data-row">
                    <span className="data-label">Email</span>
                    <span className="data-value">{entry.email}</span>
                  </div>
                  <div className="data-row">
                    <span className="data-label">Portfolio</span>
                    <span className="data-value">{entry.portfolioUrl || '—'}</span>
                  </div>
                  <div className="data-row">
                    <span className="data-label">Track</span>
                    <span className="data-value">{entry.primaryTrack}</span>
                  </div>
                  <div className="data-row">
                    <span className="data-label">Experience</span>
                    <span className="data-value">{entry.experienceLevel}</span>
                  </div>
                  <div className="data-row data-row-stack">
                    <span className="data-label">Tech Stack</span>
                    <div className="data-chips">
                      {entry.techStack.map((tech) => (
                        <span key={tech} className="data-chip">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          className="btn-reset"
          onClick={resetForm}
        >
          Submit Another
        </button>
      </div>
    );
  }

  const personalItems = [
    { label: 'Full Name', value: formData.fullName },
    { label: 'Email Address', value: formData.email },
    { label: 'Portfolio / GitHub', value: formData.portfolioUrl }
  ];

  const preferenceItems = [
    { label: 'Primary Track', value: formData.primaryTrack },
    { label: 'Experience Level', value: formData.experienceLevel }
  ];

  return (
    <div className="step-container">
      <div className="step-heading">
        <h3 className="step-title">Review & Submit</h3>
        <p className="step-desc">
          Double-check your information before submitting your application.
        </p>
      </div>

      <div className="review-section">
        <ReviewCard
          title="Personal Information"
          onEdit={() => goToStep(1)}
          items={personalItems}
        />

        <ReviewCard
          title="Preferences"
          onEdit={() => goToStep(2)}
          items={preferenceItems}
        />

        <ReviewCard
          title="Tech Stack"
          onEdit={() => goToStep(3)}
          items={[]}
          badges={formData.techStack}
        />
      </div>
    </div>
  );
};

export default Step4;
