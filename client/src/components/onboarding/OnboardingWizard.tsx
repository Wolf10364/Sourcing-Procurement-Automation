import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  component: React.ComponentType<any>;
  isCompleted: boolean;
}

interface OnboardingWizardProps {
  accountType: 'driver' | 'vehicle_owner' | 'both';
  onComplete: (data: any) => void;
}

const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ accountType, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [steps, setSteps] = useState<OnboardingStep[]>([
    {
      id: 1,
      title: 'Account Creation',
      description: 'Set up your basic account information',
      component: AccountCreationStep,
      isCompleted: false
    },
    {
      id: 2,
      title: 'Identity Verification',
      description: 'Upload and verify your identity documents',
      component: IdentityVerificationStep,
      isCompleted: false
    },
    {
      id: 3,
      title: 'Vehicle Registration',
      description: 'Register your vehicle and upload documents',
      component: VehicleRegistrationStep,
      isCompleted: false
    },
    {
      id: 4,
      title: 'Background Checks',
      description: 'Complete background verification process',
      component: BackgroundCheckStep,
      isCompleted: false
    },
    {
      id: 5,
      title: 'Training & Certification',
      description: 'Complete required training modules',
      component: TrainingStep,
      isCompleted: false
    },
    {
      id: 6,
      title: 'Final Approval',
      description: 'Submit for final review and approval',
      component: FinalApprovalStep,
      isCompleted: false
    }
  ]);

  const updateStepData = (stepId: number, data: any) => {
    setFormData(prev => ({ ...prev, [stepId]: data }));
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, isCompleted: true } : step
    ));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepComponent = steps.find(step => step.id === currentStep)?.component;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  step.id < currentStep 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : step.id === currentStep 
                    ? 'bg-blue-500 border-blue-500 text-white' 
                    : 'bg-gray-200 border-gray-300 text-gray-500'
                }`}>
                  {step.id < currentStep ? '✓' : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step.id < currentStep ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {steps.find(step => step.id === currentStep)?.title}
            </h2>
            <p className="text-gray-600 mt-2">
              {steps.find(step => step.id === currentStep)?.description}
            </p>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStepComponent && (
                <currentStepComponent
                  data={formData[currentStep] || {}}
                  onNext={updateStepData}
                  accountType={accountType}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-lg ${
                currentStep === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              Previous
            </button>
            
            <div className="flex space-x-4">
              <button
                onClick={() => {/* Save progress */}}
                className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Save Progress
              </button>
              
              {currentStep < steps.length ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={() => onComplete(formData)}
                  className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                >
                  Submit Application
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Step Components
const AccountCreationStep: React.FC<any> = ({ data, onNext, accountType }) => {
  const [formData, setFormData] = useState(data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(1, formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <input
            type="text"
            value={formData.firstName || ''}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <input
            type="text"
            value={formData.lastName || ''}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          value={formData.email || ''}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          value={formData.phone || ''}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Account Type
        </label>
        <select
          value={formData.accountType || accountType}
          onChange={(e) => setFormData({...formData, accountType: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="driver">Driver</option>
          <option value="vehicle_owner">Vehicle Owner</option>
          <option value="both">Both</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="terms"
          checked={formData.termsAccepted || false}
          onChange={(e) => setFormData({...formData, termsAccepted: e.target.checked})}
          className="rounded"
          required
        />
        <label htmlFor="terms" className="text-sm text-gray-700">
          I accept the terms and conditions
        </label>
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Continue
      </button>
    </form>
  );
};

const IdentityVerificationStep: React.FC<any> = ({ data, onNext }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Identity Verification</h3>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-800">
          Please upload clear photos of your identity documents. All documents will be securely verified.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Driver's License (Front)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <p className="text-gray-500">Click to upload or drag and drop</p>
            <input type="file" className="hidden" accept="image/*" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Driver's License (Back)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <p className="text-gray-500">Click to upload or drag and drop</p>
            <input type="file" className="hidden" accept="image/*" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selfie Photo
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <p className="text-gray-500">Take a clear photo of your face</p>
            <input type="file" className="hidden" accept="image/*" />
          </div>
        </div>
      </div>

      <button
        onClick={() => onNext(2, { documents: 'uploaded' })}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Upload Documents
      </button>
    </div>
  );
};

const VehicleRegistrationStep: React.FC<any> = ({ data, onNext }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Vehicle Registration</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vehicle Make
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Toyota"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vehicle Model
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Hiace"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="2020"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            License Plate
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="ABC-123"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Vehicle Type
        </label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
          <option value="">Select vehicle type</option>
          <option value="truck">Truck</option>
          <option value="van">Van</option>
          <option value="pickup">Pickup</option>
          <option value="trailer">Trailer</option>
        </select>
      </div>

      <button
        onClick={() => onNext(3, { vehicle: 'registered' })}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Register Vehicle
      </button>
    </div>
  );
};

const BackgroundCheckStep: React.FC<any> = ({ data, onNext }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Background Checks</h3>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">
          Background checks typically take 3-5 business days to complete. You'll be notified once the results are ready.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h4 className="font-medium">Driving Record Check</h4>
            <p className="text-sm text-gray-600">Verification of driving history and violations</p>
          </div>
          <span className="text-blue-600">In Progress</span>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h4 className="font-medium">Criminal Background Check</h4>
            <p className="text-sm text-gray-600">Verification of criminal history</p>
          </div>
          <span className="text-gray-500">Pending</span>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h4 className="font-medium">Employment Verification</h4>
            <p className="text-sm text-gray-600">Verification of previous employment</p>
          </div>
          <span className="text-gray-500">Pending</span>
        </div>
      </div>

      <button
        onClick={() => onNext(4, { backgroundChecks: 'initiated' })}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Initiate Background Checks
      </button>
    </div>
  );
};

const TrainingStep: React.FC<any> = ({ data, onNext }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Training & Certification</h3>
      
      <div className="space-y-4">
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Safety Training</h4>
            <span className="text-green-600">Completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">Score: 95%</p>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Platform Training</h4>
            <span className="text-blue-600">In Progress</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">3 of 5 modules completed</p>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Road Safety Test</h4>
            <span className="text-gray-500">Not Started</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gray-300 h-2 rounded-full" style={{ width: '0%' }}></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">Required for approval</p>
        </div>
      </div>

      <button
        onClick={() => onNext(5, { training: 'completed' })}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Continue Training
      </button>
    </div>
  );
};

const FinalApprovalStep: React.FC<any> = ({ data, onNext }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Final Approval</h3>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-green-800">
          Congratulations! You've completed all onboarding steps. Your application will be reviewed within 1-2 business days.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">✓</span>
          </div>
          <span>Account Creation</span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">✓</span>
          </div>
          <span>Identity Verification</span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">✓</span>
          </div>
          <span>Vehicle Registration</span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">✓</span>
          </div>
          <span>Background Checks</span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">✓</span>
          </div>
          <span>Training & Certification</span>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 mb-2">What happens next?</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Your application will be reviewed by our team</li>
          <li>• You'll receive an email notification with the decision</li>
          <li>• If approved, you can start accepting bookings immediately</li>
          <li>• If additional information is needed, we'll contact you</li>
        </ul>
      </div>

      <button
        onClick={() => onNext(6, { finalApproval: 'submitted' })}
        className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Submit Application
      </button>
    </div>
  );
};

export default OnboardingWizard; 