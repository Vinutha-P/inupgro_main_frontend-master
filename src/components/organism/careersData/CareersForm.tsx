

"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import BasicInfoForm, { BasicInfoFormRef } from "./BasicInfoForm";
import ProfessionalForm, { ProfessionalFormRef } from "./PerofessionalForm";
import ReviewProfile, { ReviewProfileRef } from "./ReviewProfile";
import WelComePage from "./WelComePage";

interface CreateProfileFormProps {
    jobId?: string;
}

const useIsMobileOrTablet = () => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  useEffect(() => {
    const check = () => setIsMobileOrTablet(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobileOrTablet;
};

const getStepFromPath = (pathname: string): number => {
  if (pathname.includes("/careers/perofessional-form")) return 2;
  if (pathname.includes("/profile/step3")) return 3;
  if (pathname.includes("/profile/step4")) return 4;
  return 1;
};

const CareersForm: React.FC<CreateProfileFormProps> = ({ jobId }) => {
  const [step, setStep] = useState<number>(1);
  const [isBasicInfoValid, setIsBasicInfoValid] = useState<boolean>(false);
  const [isProfessionalInfoValid, setIsProfessionalInfoValid] =
    useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();
  const isMobileOrTablet = useIsMobileOrTablet();
  const basicInfoFormRef = useRef<BasicInfoFormRef>(null);
  const professionalFormRef = useRef<ProfessionalFormRef>(null);
  const reviewProfileRef = useRef<ReviewProfileRef>(null);

  useEffect(() => {
    if (isMobileOrTablet) {
      const newStep = getStepFromPath(pathname);
      setStep(newStep);
    }
  }, [pathname, isMobileOrTablet]);

  const goToStep = (stepNumber: number) => {
    if (isMobileOrTablet) {
      const paths: Record<number, string> = {
        1: '/careers/basic-form',
        2: '/careers/perofessional-form',
        3: '/profile/step3',
        4: '/profile/step4',
      };
      router.push(paths[stepNumber]);
    } else {
      setStep(stepNumber);
    }
  };

  const handleNextStep1 = async () => {
    if (basicInfoFormRef.current) {
      await basicInfoFormRef.current.submitForm();
    }
  };

  const handleNext = async () => {
    if (step === 1 && basicInfoFormRef.current) {
      await basicInfoFormRef.current.submitForm();
    } else if (step === 2 && professionalFormRef.current) {
      await professionalFormRef.current.submitForm();
    } else if (step === 3 && reviewProfileRef.current) {
      await reviewProfileRef.current.submitForm();
    }
  };

  const handleBackStep2 = () => goToStep(1);
  const handleBackStep3 = () => goToStep(2);
  const handleSubmitted = () => goToStep(4);
  const handleSaveDraft = () => console.log("Draft saved!");
  const handleCancel = () => goToStep(1);

  const progressWidthStep1 = step > 1 ? 100 : 0;
  const progressWidthStep2 = step > 2 ? 100 : 0;

  return (
    <div>
      {(step === 1 || step === 2) && (
        <h2 className="text-center text-2xl font-semibold text-gray-900 mb-6">
          Create Profile
        </h2>
      )}

      {(step === 1 || step === 2) && (
        <div className="grid grid-cols-2 gap-4">
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-6">
            <div
              className="bg-green h-1.5 rounded-full"
              style={{ width: `${progressWidthStep1}%` }}
            ></div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-6">
            <div
              className="bg-green h-1.5 rounded-full"
              style={{ width: `${progressWidthStep2}%` }}
            ></div>
          </div>
        </div>
      )}

      {step === 1 && (
        <BasicInfoForm
          ref={basicInfoFormRef}
          onValidationChange={setIsBasicInfoValid}
          onNext={() => goToStep(2)}
        />
      )}
      {step === 2 && (
        <ProfessionalForm
          ref={professionalFormRef}
          onValidationChange={setIsProfessionalInfoValid}
          onNext={() => goToStep(3)}
        />
      )}
      {step === 3 && (
        <ReviewProfile
          ref={reviewProfileRef}
          onSubmit={handleSubmitted}
          jobId={jobId}
        />
      )}
      {step === 4 && <WelComePage />}

      <div className="flex justify-between items-center mt-6 text-sm">
        {(step === 1 || step === 2) && (
          <div className="text-gray-500 flex items-center space-x-1">
            <span>ℹ️</span>
            <span>Fill all fields that have an asterisk</span>
          </div>
        )}

        <div>
          {step === 1 && (
            <div className="space-x-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleNextStep1}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-x-2">
              <button
                onClick={handleBackStep2}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Next
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-x-2">
              <button
                onClick={handleBackStep3}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Submit
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="mx-auto space-x-2">
              <button
                onClick={handleSaveDraft}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100"
              >
                Go to home page
              </button>
              <button
                onClick={handleSubmitted}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Apply for Job
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareersForm;