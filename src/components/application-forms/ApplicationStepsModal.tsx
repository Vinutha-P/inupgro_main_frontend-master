// "use client";
// import React, { useEffect, useState } from "react";
// import BasicInformationForm from "../application-forms/basic-info/BasicInformationForm";
// import SuccessfulSubmission from "./SuccessfulSubmission";
// import CollegeAdditionalInfoForm from "./college-forms/CollegeAdditionalInfoForm";
// import CoachingAdditionalInfoForm from "./institute-forms/CoachingAdditionalInfoForm";
// import SchoolAdditionalInfoForm from "./school-forms/SchoolAdditionalInfoForm";
// import SchoolFormReviewPage from "./school-forms/SchoolFormReviewPage";
// import CollegeFormReviewPage from "./college-forms/CollegeFormReviewPage";
// import CoachingFormReviewPage from "./institute-forms/CoachingFormReviewPage";
// import { usePathname } from "next/navigation";
// import EmailVerification from "./EmailVerification";

// type Step = {
//   id: number;
//   name: string;
//   component: React.ReactNode;
// };

// type OrgType = 'School' | 'College' | 'Coaching';

// const ApplicationStepsModal = ({
//   show,
//   onClose,
//   organisationId,
//   orgType: propOrgType
// }: {
//   show: boolean;
//   onClose: () => void;
//   organisationId: string;
//   orgType?: OrgType;
// }) => {
//   const pathname = usePathname();
//   const [currentStep, setCurrentStep] = useState(1);
//   const [isVisible, setIsVisible] = useState(false);
//   const [email, setEmail] = useState("");
//   const [formData, setFormData] = useState<any>({});

//   useEffect(() => {
//     if (show) {
//       setIsVisible(true);
//       const scrollY = window.scrollY;
//       document.body.style.position = "fixed";
//       document.body.style.top = `-${scrollY}px`;
//       document.body.style.width = "100%";

//       return () => {
//         const scrollY = document.body.style.top;
//         document.body.style.position = "";
//         document.body.style.top = "";
//         document.body.style.width = "";
//         window.scrollTo(0, Number.parseInt(scrollY || "0") * -1);
//       };
//     }
//   }, [show]);

//   const getOrgTypeFromPath = (): OrgType => {
//     if (propOrgType) return propOrgType;
//     if (pathname.includes("school")) return "School";
//     if (pathname.includes("college")) return "College";
//     if (pathname.includes("institute")) return "Coaching";
//     return "School";
//   };

//   const orgType = getOrgTypeFromPath();

//   const handleNext = (data?: any) => {
//     if (currentStep === 4) {
//       const otpArray = data?.otp;
//       const otp = otpArray?.join("")?.trim();

//       if (currentStep === 4) {
//         const otpArray = data?.otp;
//         const otp = otpArray?.join("")?.trim();

//         if (!otp || otp.length < 4) {
//           if (data?.setOtpError) {
//             data.setOtpError("Please enter all 4 digits of the OTP");
//           }
//           return;
//         }
//       }
//     }

//     if (data) {
//       setFormData((prev: any) => ({ ...prev, ...data }));
//     }

//     setCurrentStep(prev => prev + 1);
//   };

//   const handlePrevious = () => setCurrentStep(prev => prev - 1);

//   const handleEmailVerified = () => {
//     setCurrentStep(5);
//   };

//   const getAdditionalInfoForm = () => {
//     switch (orgType) {
//       case 'College':
//         return (
//           <CollegeAdditionalInfoForm
//             show={currentStep === 2}
//             onClose={onClose}
//             onPrevious={handlePrevious}
//             onNext={handleNext}
//             orgType={orgType}
//             setEmail={setEmail}
//             initialData={formData}
//           />
//         );
//       case 'Coaching':
//         return (
//           <CoachingAdditionalInfoForm
//             show={currentStep === 2}
//             onClose={onClose}
//             onPrevious={handlePrevious}
//             onNext={handleNext}
//             orgType={orgType}
//             setEmail={setEmail}
//             initialData={formData}
//           />
//         );
//       default:
//         return (
//           <SchoolAdditionalInfoForm
//             show={currentStep === 2}
//             onClose={onClose}
//             onPrevious={handlePrevious}
//             onNext={handleNext}
//             orgType={orgType}
//             setEmail={setEmail}
//             initialData={formData}
//           />
//         );
//     }
//   };

//   const getFormReviewPage = () => {
//     switch (orgType) {
//       case 'College':
//         return (
//           <CollegeFormReviewPage
//             show={currentStep === 3}
//             onClose={onClose}
//             onPrevious={handlePrevious}
//             onNext={handleNext}
//             orgType={orgType}
//             formData={formData}
//             email={email}
//           />
//         );
//       case 'Coaching':
//         return (
//           <CoachingFormReviewPage
//             show={currentStep === 3}
//             onClose={onClose}
//             onPrevious={handlePrevious}
//             onNext={handleNext}
//             orgType={orgType}
//             formData={formData}
//             email={email}
//           />
//         );
//       default:
//         return (
//           <SchoolFormReviewPage
//             show={currentStep === 3}
//             onClose={onClose}
//             onPrevious={handlePrevious}
//             onNext={handleNext}
//             orgType={orgType}
//             formData={formData}
//             email={email}
//           />
//         );
//     }
//   };

//   const steps: Step[] = [
//     {
//       id: 1,
//       name: "Basic Information",
//       component: (
//         <BasicInformationForm
//           show={currentStep === 1}
//           onClose={onClose}
//           onNext={handleNext}
//           orgType={orgType}
//           setEmail={setEmail}
//           initialData={formData}
//           formData={formData}
//           setFormData={setFormData}
//         />
//       )
//     },
//     {
//       id: 2,
//       name: "Additional Information",
//       component: getAdditionalInfoForm()
//     },
//     {
//       id: 3,
//       name: "Form Review",
//       component: getFormReviewPage()
//     },
//     {
//       id: 4,
//       name: "Email Verification",
//       component: (
//         <EmailVerification
//           show={currentStep === 4}
//           onClose={onClose}
//           onVerified={handleEmailVerified}
//           email={email}
//           selectedType={orgType}
//           onPrevious={handlePrevious}
//           onNext={handleNext}
//           formData={formData}
//         />
//       )
//     },
//     {
//       id: 5,
//       name: "Successful Submission",
//       component: (
//         <SuccessfulSubmission
//           show={currentStep === 5}
//           onClose={onClose}
//           name={formData.name || ""}
//         />
//       )
//     },
//   ];

//   if (!show) return null;

//   return (
//     <div onClick={() => setIsVisible(false)}>
//       <div className="fixed inset-0 top-[4rem] bg-black bg-opacity-50 z-[1000] flex justify-center items-start overflow-y-auto py-8" >
//         <div className="w-full max-w-4xl mx-auto px-4">
//           <div
//             className={`
//         bg-white rounded-lg shadow-xl transform transition-all duration-300 ease-out
//         ${isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"}
//       `}
//           >
//             {steps.find(step => step.id === currentStep)?.component}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApplicationStepsModal;



"use client";
import React, { useEffect, useState } from "react";
import BasicInformationForm from "../application-forms/basic-info/BasicInformationForm";
import SuccessfulSubmission from "./SuccessfulSubmission";
import CollegeAdditionalInfoForm from "./college-forms/CollegeAdditionalInfoForm";
import CoachingAdditionalInfoForm from "./institute-forms/CoachingAdditionalInfoForm";
import SchoolAdditionalInfoForm from "./school-forms/SchoolAdditionalInfoForm";
import SchoolFormReviewPage from "./school-forms/SchoolFormReviewPage";
import CollegeFormReviewPage from "./college-forms/CollegeFormReviewPage";
import CoachingFormReviewPage from "./institute-forms/CoachingFormReviewPage";
import { usePathname } from "next/navigation";
import EmailVerification from "./EmailVerification";

type Step = {
  id: number;
  name: string;
  component: React.ReactNode;
};

type OrgType = 'School' | 'College' | 'Coaching';

const ApplicationStepsModal = ({
  show,
  onClose,
  organisationId,
  orgType: propOrgType
}: {
  show: boolean;
  onClose: () => void;
  organisationId: string;
  orgType?: OrgType;
}) => {
  const pathname = usePathname();
  const [currentStep, setCurrentStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState<any>({});

  // Lock scroll when modal is shown
  useEffect(() => {
    if (show) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      setIsVisible(true);

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
        setIsVisible(false);
      };
    }
  }, [show]);

  const getOrgTypeFromPath = (): OrgType => {
    if (propOrgType) return propOrgType;
    if (pathname.includes("school")) return "School";
    if (pathname.includes("college")) return "College";
    if (pathname.includes("institute")) return "Coaching";
    return "School";
  };

  const orgType = getOrgTypeFromPath();

  const handleNext = (data?: any) => {
    if (currentStep === 4) {
      const otpArray = data?.otp;
      const otp = otpArray?.join("")?.trim();
      if (!otp || otp.length < 4) {
        if (data?.setOtpError) {
          data.setOtpError("Please enter all 4 digits of the OTP");
        }
        return;
      }
    }

    if (data) {
      setFormData((prev: any) => ({ ...prev, ...data }));
    }

    setCurrentStep(prev => prev + 1);
  };

  const handlePrevious = () => setCurrentStep(prev => prev - 1);

  const handleEmailVerified = () => {
    setCurrentStep(5);
  };

  const getAdditionalInfoForm = () => {
    switch (orgType) {
      case 'College':
        return (
          <CollegeAdditionalInfoForm
            show={currentStep === 2}
            onClose={onClose}
            onPrevious={handlePrevious}
            onNext={handleNext}
            orgType={orgType}
            setEmail={setEmail}
            initialData={formData}
          />
        );
      case 'Coaching':
        return (
          <CoachingAdditionalInfoForm
            show={currentStep === 2}
            onClose={onClose}
            onPrevious={handlePrevious}
            onNext={handleNext}
            orgType={orgType}
            setEmail={setEmail}
            initialData={formData}
          />
        );
      default:
        return (
          <SchoolAdditionalInfoForm
            show={currentStep === 2}
            onClose={onClose}
            onPrevious={handlePrevious}
            onNext={handleNext}
            orgType={orgType}
            setEmail={setEmail}
            initialData={formData}
          />
        );
    }
  };

  const getFormReviewPage = () => {
    switch (orgType) {
      case 'College':
        return (
          <CollegeFormReviewPage
            show={currentStep === 3}
            onClose={onClose}
            onPrevious={handlePrevious}
            onNext={handleNext}
            orgType={orgType}
            formData={formData}
            email={email}
          />
        );
      case 'Coaching':
        return (
          <CoachingFormReviewPage
            show={currentStep === 3}
            onClose={onClose}
            onPrevious={handlePrevious}
            onNext={handleNext}
            orgType={orgType}
            formData={formData}
            email={email}
          />
        );
      default:
        return (
          <SchoolFormReviewPage
            show={currentStep === 3}
            onClose={onClose}
            onPrevious={handlePrevious}
            onNext={handleNext}
            orgType={orgType}
            formData={formData}
            email={email}
          />
        );
    }
  };

  const steps: Step[] = [
    {
      id: 1,
      name: "Basic Information",
      component: (
        <BasicInformationForm
          show={currentStep === 1}
          onClose={onClose}
          onNext={handleNext}
          orgType={orgType}
          setEmail={setEmail}
          initialData={formData}
          formData={formData}
          setFormData={setFormData}
        />
      )
    },
    {
      id: 2,
      name: "Additional Information",
      component: getAdditionalInfoForm()
    },
    {
      id: 3,
      name: "Form Review",
      component: getFormReviewPage()
    },
    {
      id: 4,
      name: "Email Verification",
      component: (
        <EmailVerification
          show={currentStep === 4}
          onClose={onClose}
          onVerified={handleEmailVerified}
          email={email}
          selectedType={orgType}
          onPrevious={handlePrevious}
          onNext={handleNext}
          formData={formData}
        />
      )
    },
    {
      id: 5,
      name: "Successful Submission",
      component: (
        <SuccessfulSubmission
          show={currentStep === 5}
          onClose={onClose}
          name={formData.name || ""}
        />
      )
    },
  ];

  return (
    isVisible && (
      <div
        className="fixed inset-0 top-[4rem] bg-black bg-opacity-50 z-[1000] flex justify-center items-start overflow-y-auto py-8"
        onClick={() => {
          // const confirmClose = window.confirm("Are you sure you want to close the form?");
          // if (confirmClose) {
          if (show) {
            setIsVisible(false);
            onClose();
          }
        }}
      >
        <div className="w-full max-w-4xl mx-auto px-4">
          <div
            className={`
              bg-white rounded-lg shadow-xl transform transition-all duration-300 ease-out
              ${isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"}
            `}
            onClick={(e) => e.stopPropagation()}
          >
            {steps.find(step => step.id === currentStep)?.component}
          </div>
        </div>
      </div>
    )
  );
};

export default ApplicationStepsModal;