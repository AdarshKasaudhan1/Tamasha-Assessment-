import React from 'react';
import { FormProvider, useFormContext } from './context/FormContext';
import Stepper from './components/Stepper';
import DraftIndicator from './components/DraftIndicator';
import Toast from './components/Toast';
import Step1 from './pages/Step1';
import Step2 from './pages/Step2';
import Step3 from './pages/Step3';
import Step4 from './pages/Step4';
import './styles/global.css';

const OnboardingWizard = () => {
  const {
    currentStep,
    currentStepIsValid,
    isSubmitted,
    nextStep,
    prevStep,
    submitForm
  } = useFormContext();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      default:
        return <Step1 />;
    }
  };

  return (
    <main className="page-wrapper">
      <Toast />
      <div className="wizard-card">
        <header className="wizard-header">
          <div className="wizard-top-row">
            <h1 className="wizard-main-title">Complete Your Developer Profile</h1>
            <DraftIndicator />
          </div>
          <p className="wizard-main-subtitle">
            Finish your onboarding in 4 simple steps
          </p>
        </header>

        <Stepper />

        <div className="wizard-content-area">
          {renderCurrentStep()}
        </div>

        {!isSubmitted && (
          <footer className="wizard-footer">
            {currentStep > 1 ? (
              <button
                type="button"
                className="btn-outline"
                onClick={prevStep}
              >
                ← Previous
              </button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                className="btn-primary"
                onClick={nextStep}
                disabled={!currentStepIsValid}
              >
                Next Step →
              </button>
            ) : (
              <button
                type="button"
                className="btn-primary"
                onClick={submitForm}
              >
                Submit Application
              </button>
            )}
          </footer>
        )}
      </div>
    </main>
  );
};

const App = () => {
  return (
    <FormProvider>
      <OnboardingWizard />
    </FormProvider>
  );
};

export default App;
