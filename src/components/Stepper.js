import React from 'react';
import { useFormContext } from '../context/FormContext';
import '../styles/stepper.css';

const STEPS = [
  { step: 1, label: 'Personal Info' },
  { step: 2, label: 'Preferences' },
  { step: 3, label: 'Tech Stack' },
  { step: 4, label: 'Review & Submit' }
];

const Stepper = () => {
  const { currentStep, goToStep } = useFormContext();

  return (
    <nav className="stepper-container" aria-label="Progress">
      {STEPS.map(({ step, label }) => {
        const isCompleted = currentStep > step;
        const isActive = currentStep === step;
        const isClickable = step < currentStep;

        let itemClass = 'step-item';
        if (isActive) itemClass += ' active';
        if (isCompleted) itemClass += ' completed';

        return (
          <div key={step} className={itemClass}>
            <div
              className={`step-line ${isCompleted ? 'completed-line' : ''}`}
            />

            <button
              type="button"
              className={`step-button ${isClickable ? 'clickable' : ''}`}
              onClick={() => {
                if (isClickable) goToStep(step);
              }}
              disabled={!isClickable}
              aria-current={isActive ? 'step' : undefined}
            >
              <div className="step-circle">
                {isCompleted ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  step
                )}
              </div>
              <span className="step-label">{label}</span>
            </button>
          </div>
        );
      })}
    </nav>
  );
};

export default Stepper;
