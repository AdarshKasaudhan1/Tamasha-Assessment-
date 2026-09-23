const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_REGEX = /^(https?:\/\/)?([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/i;

export const validateFullName = (name) => {
  if (!name || !name.trim()) {
    return 'Full Name is required.';
  }
  if (name.trim().length < 2) {
    return 'Full Name must be at least 2 characters.';
  }
  return null;
};

export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return 'Email address is required.';
  }
  if (!EMAIL_REGEX.test(email.trim())) {
    return 'Please enter a valid email address.';
  }
  return null;
};

export const validateUrl = (url) => {
  if (!url || !url.trim()) {
    return null;
  }
  if (!URL_REGEX.test(url.trim())) {
    return 'Please enter a valid URL (e.g. https://github.com/username).';
  }
  return null;
};

export const validateStep = (step, formData) => {
  const errors = {};

  if (step === 1) {
    const nameError = validateFullName(formData.fullName);
    if (nameError) errors.fullName = nameError;

    const emailError = validateEmail(formData.email);
    if (emailError) errors.email = emailError;

    const urlError = validateUrl(formData.portfolioUrl);
    if (urlError) errors.portfolioUrl = urlError;
  } else if (step === 2) {
    if (!formData.primaryTrack) {
      errors.primaryTrack = 'Please select a primary track.';
    }
    if (!formData.experienceLevel) {
      errors.experienceLevel = 'Please select an experience level.';
    }
  } else if (step === 3) {
    if (!formData.techStack || formData.techStack.length === 0) {
      errors.techStack = 'Please select at least one technology.';
    }
  }

  return errors;
};

export const isStepValid = (step, formData) => {
  const stepErrors = validateStep(step, formData);
  return Object.keys(stepErrors).length === 0;
};
