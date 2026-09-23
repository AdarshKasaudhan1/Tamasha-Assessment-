import React, { useState, useEffect } from 'react';
import { useFormContext } from '../context/FormContext';

const Toast = () => {
  const { isSubmitted } = useFormContext();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [isSubmitted]);

  if (!visible) return null;

  return (
    <div className="toast-notification" role="status" aria-live="polite">
      <div className="toast-icon-circle">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="toast-check-icon"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <div className="toast-content">
        <div className="toast-title">Success!</div>
        <div className="toast-message">Application Submitted Successfully!</div>
      </div>
      <button
        type="button"
        className="toast-close-btn"
        onClick={() => setVisible(false)}
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
