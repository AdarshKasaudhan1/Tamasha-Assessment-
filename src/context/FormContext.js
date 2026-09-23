import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { validateStep, isStepValid } from '../utils/validation';

const STORAGE_KEY = 'tamasha_onboarding_draft';
const SUBMISSIONS_KEY = 'tamasha_submissions';
const API_BASE_URL = 'http://localhost:5000/api/submissions';

const INITIAL_FORM_DATA = {
  fullName: '',
  email: '',
  portfolioUrl: '',
  primaryTrack: '',
  experienceLevel: '',
  techStack: []
};

const FormContext = createContext(null);

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.formData) {
          return { ...INITIAL_FORM_DATA, ...parsed.formData };
        }
      }
    } catch (err) {
      console.error('Failed to restore draft from localStorage:', err);
    }
    return INITIAL_FORM_DATA;
  });

  const [currentStep, setCurrentStep] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          parsed &&
          typeof parsed.currentStep === 'number' &&
          parsed.currentStep >= 1 &&
          parsed.currentStep <= 4
        ) {
          return parsed.currentStep;
        }
      }
    } catch (err) {
      console.error('Failed to restore step from localStorage:', err);
    }
    return 1;
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isDraftSaved, setIsDraftSaved] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissions, setSubmissions] = useState(() => {
    try {
      const saved = localStorage.getItem(SUBMISSIONS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (err) {}
    return [];
  });

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await fetch(API_BASE_URL);
        if (res.ok) {
          const data = await res.json();
          setSubmissions(data);
          try {
            localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(data));
          } catch (e) {}
        }
      } catch (err) {}
    };
    fetchSubmissions();
  }, []);

  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    if (isSubmitted) return;

    setIsDraftSaved(false);

    const timer = setTimeout(() => {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            formData,
            currentStep
          })
        );
        setIsDraftSaved(true);
      } catch (err) {
        console.error('Failed to save draft to localStorage:', err);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [formData, currentStep, isSubmitted]);

  useEffect(() => {
    const stepErrors = validateStep(currentStep, formData);
    setErrors(stepErrors);
  }, [formData, currentStep]);

  const updateField = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };

      if (field === 'primaryTrack' && value !== prev.primaryTrack) {
        updated.techStack = [];
      }

      return updated;
    });
  };

  const toggleTech = (tech) => {
    setFormData((prev) => {
      const exists = prev.techStack.includes(tech);
      const updatedStack = exists
        ? prev.techStack.filter((t) => t !== tech)
        : [...prev.techStack, tech];

      return {
        ...prev,
        techStack: updatedStack
      };
    });
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true
    }));
  };

  const currentStepIsValid = isStepValid(currentStep, formData);

  const nextStep = () => {
    if (currentStep === 1) {
      setTouched((prev) => ({
        ...prev,
        fullName: true,
        email: true,
        portfolioUrl: true
      }));
    } else if (currentStep === 2) {
      setTouched((prev) => ({
        ...prev,
        primaryTrack: true,
        experienceLevel: true
      }));
    } else if (currentStep === 3) {
      setTouched((prev) => ({
        ...prev,
        techStack: true
      }));
    }

    if (!currentStepIsValid) {
      return;
    }

    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToStep = (stepNumber) => {
    if (stepNumber >= 1 && stepNumber <= 4) {
      setCurrentStep(stepNumber);
    }
  };

  const submitForm = async () => {
    console.log('Submission Successful! Form Data:', formData);

    let savedEntry = null;
    try {
      const res = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        savedEntry = await res.json();
      }
    } catch (err) {}

    if (!savedEntry) {
      savedEntry = {
        ...formData,
        _id: 'local_' + Date.now(),
        submittedAt: new Date().toISOString()
      };
    }

    setSubmissions((prev) => {
      const entryId = savedEntry._id || savedEntry.id;
      const filtered = prev.filter((item) => (item._id || item.id) !== entryId);
      const updated = [savedEntry, ...filtered];
      try {
        localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(updated));
      } catch (err) {}
      return updated;
    });

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {}

    setIsSubmitted(true);
    setIsDraftSaved(false);
  };

  const resetForm = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {}
    setFormData(INITIAL_FORM_DATA);
    setCurrentStep(1);
    setTouched({});
    setErrors({});
    setIsDraftSaved(true);
    setIsSubmitted(false);
  };

  const deleteSubmission = async (targetIdOrIndex) => {
    let idToDelete = targetIdOrIndex;
    if (typeof targetIdOrIndex === 'number') {
      const targetEntry = submissions[targetIdOrIndex];
      idToDelete = targetEntry?._id || targetEntry?.id || targetIdOrIndex;
    }

    if (typeof idToDelete === 'string' && !idToDelete.startsWith('local_')) {
      try {
        await fetch(`${API_BASE_URL}/${idToDelete}`, {
          method: 'DELETE'
        });
      } catch (err) {}
    }

    setSubmissions((prev) => {
      const updated = prev.filter((entry, idx) => {
        const currentId = entry._id || entry.id;
        if (currentId && idToDelete) {
          return currentId !== idToDelete;
        }
        return idx !== targetIdOrIndex;
      });

      try {
        localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(updated));
      } catch (err) {}
      return updated;
    });
  };


  return (
    <FormContext.Provider
      value={{
        currentStep,
        formData,
        errors,
        touched,
        isDraftSaved,
        isSubmitted,
        submissions,
        currentStepIsValid,
        updateField,
        toggleTech,
        handleBlur,
        nextStep,
        prevStep,
        goToStep,
        submitForm,
        resetForm,
        deleteSubmission
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
