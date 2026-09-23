import React from 'react';
import { useFormContext } from '../context/FormContext';
import { TRACKS, EXPERIENCE_LEVELS } from '../utils/techOptions';
import '../styles/pages.css';

const Step2 = () => {
  const { formData, updateField, touched, errors } = useFormContext();

  const handleKeyDown = (e, field, value) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      updateField(field, value);
    }
  };

  return (
    <div className="step-container">
      <div className="step-heading">
        <h3 className="step-title">Track & Preferences</h3>
        <p className="step-desc">
          Choose your primary development focus and current level of expertise.
        </p>
      </div>

      <div className="pref-section">
        <div className="pref-section-header">
          <span className="pref-section-title">Primary Track</span>
        </div>

        <div className="card-grid" role="radiogroup" aria-label="Primary Track">
          {TRACKS.map((track) => {
            const isSelected = formData.primaryTrack === track.id;
            return (
              <div
                key={track.id}
                role="radio"
                tabIndex={0}
                aria-checked={isSelected}
                className={`radio-card ${isSelected ? 'selected' : ''}`}
                onClick={() => updateField('primaryTrack', track.id)}
                onKeyDown={(e) => handleKeyDown(e, 'primaryTrack', track.id)}
              >
                <div className="radio-circle">
                  {isSelected && <div className="radio-dot" />}
                </div>
                <div className="card-content">
                  <div className="card-label">{track.label}</div>
                  <div className="card-desc">{track.description}</div>
                </div>
              </div>
            );
          })}
        </div>

        {touched.primaryTrack && errors.primaryTrack && (
          <div className="step-error-text" role="alert">
            {errors.primaryTrack}
          </div>
        )}
      </div>

     
      <div className="pref-section">
        <div className="pref-section-header">
          <span className="pref-section-title">Experience Level</span>
        </div>

        <div
          className="exp-grid"
          role="radiogroup"
          aria-label="Experience Level"
        >
          {EXPERIENCE_LEVELS.map((lvl) => {
            const isSelected = formData.experienceLevel === lvl.id;
            return (
              <div
                key={lvl.id}
                role="radio"
                tabIndex={0}
                aria-checked={isSelected}
                className={`radio-card ${isSelected ? 'selected' : ''}`}
                onClick={() => updateField('experienceLevel', lvl.id)}
                onKeyDown={(e) => handleKeyDown(e, 'experienceLevel', lvl.id)}
              >
                <div className="radio-circle">
                  {isSelected && <div className="radio-dot" />}
                </div>
                <div className="card-content">
                  <div className="card-label">{lvl.label}</div>
                  <div className="card-desc">{lvl.description}</div>
                </div>
              </div>
            );
          })}
        </div>

        {touched.experienceLevel && errors.experienceLevel && (
          <div className="step-error-text" role="alert">
            {errors.experienceLevel}
          </div>
        )}
      </div>
    </div>
  );
};

export default Step2;
