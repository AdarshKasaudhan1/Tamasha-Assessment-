import React from 'react';
import { useFormContext } from '../context/FormContext';
import FormField from '../components/FormField';
import '../styles/pages.css';

const Step1 = () => {
  const { formData, updateField, handleBlur, touched, errors } = useFormContext();

  return (
    <div className="step-container">
      <div className="step-heading">
        <h3 className="step-title">Personal Information</h3>
        <p className="step-desc">
          Please provide your contact details and links so we can get to know you.
        </p>
      </div>

      <FormField
        id="fullName"
        name="fullName"
        label="Full Name"
        placeholder="e.g. Adarsh Gupta"
        required={true}
        value={formData.fullName}
        onChange={(e) => updateField('fullName', e.target.value)}
        onBlur={() => handleBlur('fullName')}
        error={touched.fullName ? errors.fullName : null}
      />

      <FormField
        id="email"
        name="email"
        type="email"
        label="Email Address"
        placeholder="adarsh.gupta@example.com"
        required={true}
        value={formData.email}
        onChange={(e) => updateField('email', e.target.value)}
        onBlur={() => handleBlur('email')}
        error={touched.email ? errors.email : null}
      />

      <FormField
        id="portfolioUrl"
        name="portfolioUrl"
        type="url"
        label="Portfolio / GitHub URL"
        placeholder="https://github.com/AdarshGupta"
        required={false}
        value={formData.portfolioUrl}
        onChange={(e) => updateField('portfolioUrl', e.target.value)}
        onBlur={() => handleBlur('portfolioUrl')}
        error={touched.portfolioUrl ? errors.portfolioUrl : null}
        helperText="Link to your portfolio site, GitHub profile, or online resume."
      />
    </div>
  );
};

export default Step1;
