import React from 'react';
import { useFormContext } from '../context/FormContext';
import '../styles/form.css';

const DraftIndicator = () => {
  const { isDraftSaved, isSubmitted } = useFormContext();

  if (isSubmitted) {
    return null;
  }

  return (
    <div
      className={`draft-indicator ${
        isDraftSaved ? 'draft-saved' : 'draft-saving'
      }`}
      aria-live="polite"
    >
      {isDraftSaved ? (
        <>
          <svg
            className="draft-check-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Draft Saved</span>
        </>
      ) : (
        <>
          <div className="draft-spinner" />
          <span>Saving draft...</span>
        </>
      )}
    </div>
  );
};

export default DraftIndicator;
