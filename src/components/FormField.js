import React from 'react';
import '../styles/form.css';

const FormField = ({
  id,
  name,
  label,
  type = 'text',
  value = '',
  placeholder = '',
  required = false,
  error = null,
  helperText = null,
  onChange,
  onBlur
}) => {
  const hasError = Boolean(error);

  return (
    <div className="field-group">
      <div className="label-wrapper">
        <label htmlFor={id} className="form-label">
          {label}
          {required && <span className="required-star">*</span>}
        </label>
        {!required && <span className="optional-badge">Optional</span>}
      </div>

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={hasError}
        aria-describedby={
          hasError
            ? `${id}-error`
            : helperText
            ? `${id}-helper`
            : undefined
        }
        className={`form-input ${hasError ? 'input-error' : ''}`}
      />

      {hasError && (
        <span id={`${id}-error`} className="field-error" role="alert">
          {error}
        </span>
      )}

      {!hasError && helperText && (
        <span id={`${id}-helper`} className="field-helper">
          {helperText}
        </span>
      )}
    </div>
  );
};

export default FormField;
