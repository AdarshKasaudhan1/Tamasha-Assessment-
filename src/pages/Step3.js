import React from 'react';
import { useFormContext } from '../context/FormContext';
import { TECH_STACK_MAP } from '../utils/techOptions';
import '../styles/pages.css';

const Step3 = () => {
  const { formData, toggleTech, touched, errors, goToStep } = useFormContext();

  const currentTrack = formData.primaryTrack;
  const options = currentTrack ? TECH_STACK_MAP[currentTrack] || [] : [];

  const handleKeyDown = (e, tech) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggleTech(tech);
    }
  };

  if (!currentTrack) {
    return (
      <div className="step-container">
        <div className="step-heading">
          <h3 className="step-title">Tech Stack</h3>
          <p className="step-desc">
            Select the technologies you have experience with or enjoy using.
          </p>
        </div>

        <div className="no-track-container">
          <p className="no-track-text">
            No primary track selected yet. Please select a track first.
          </p>
          <button
            type="button"
            className="btn-back-step"
            onClick={() => goToStep(2)}
          >
            ← Back to Preferences
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="step-container">
      <div className="step-heading">
        <h3 className="step-title">Tech Stack</h3>
        <p className="step-desc">
          Select your core technologies for the chosen track:
        </p>
        <div className="track-badge">
          Track: {currentTrack}
        </div>
      </div>

      <div className="tech-grid" role="group" aria-label="Select Technologies">
        {options.map((tech) => {
          const isSelected = formData.techStack.includes(tech);

          return (
            <div
              key={tech}
              role="checkbox"
              tabIndex={0}
              aria-checked={isSelected}
              className={`checkbox-card ${isSelected ? 'selected' : ''}`}
              onClick={() => toggleTech(tech)}
              onKeyDown={(e) => handleKeyDown(e, tech)}
            >
              <div className="checkbox-box">
                {isSelected && (
                  <svg
                    className="checkbox-check-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <span className="tech-name">{tech}</span>
            </div>
          );
        })}
      </div>

      {touched.techStack && errors.techStack && (
        <div className="step-error-text" role="alert">
          {errors.techStack}
        </div>
      )}
    </div>
  );
};

export default Step3;
