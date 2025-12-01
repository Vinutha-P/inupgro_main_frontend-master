import React, { useState, useEffect } from "react";
import StudentRegistrationForm from "./register-tabs/student/StudentRegistrationForm";
import TeacherRegistrationForm from "./register-tabs/teacher/TeacherRegistrationForm";
import InstitutionalRegistrationForm from "./register-tabs/institution/InstitutionalRegistrationForm";
import { useRouter } from "next/navigation";
import PublicAuthPageTemplate from "../templates-auth-page/PublicAuthPageTemplate";
import SelectInstitutionType from "./SelectInstitutionType";
import { clearMultipleLocalStorageItems } from "@/utils/localStorageClear";

const RegistrationFormPage = () => {
  const [activeTab, setActiveTab] = useState<
    "student" | "teacher" | "institute"
  >("student");
  const [selectedType, setSelectedType] = useState("School");
  const router = useRouter();

  useEffect(() => {
    clearMultipleLocalStorageItems("school");
    clearMultipleLocalStorageItems("college");
    clearMultipleLocalStorageItems("coaching");
    localStorage.removeItem("selected_type");
    localStorage.removeItem("form_completed");
  }, []);

  const steps = [
    { key: "student", label: "I am a Student" },
    { key: "teacher", label: "I am a Teacher" },
    { key: "institute", label: "I am an Institution" },
  ];

  const renderForm = () => {
    switch (activeTab) {
      case "student":
        return (
          <StudentRegistrationForm
            selectedType={selectedType}
            selectedTab={activeTab}
          />
        );
      case "teacher":
        return (
          <TeacherRegistrationForm
            selectedType={selectedType}
            selectedTab={activeTab}
          />
        );
      case "institute":
        return (
          <InstitutionalRegistrationForm
            selectedType={selectedType}
            selectedTab={activeTab}
          />
        );
      default:
        return null;
    }
  };

	useEffect(()=>{
       localStorage.removeItem("institute-register-address")
       localStorage.removeItem("institute-register")
       localStorage.removeItem("payment_successfull")
       localStorage.removeItem("onboarding_skipped")
	},[])

  const getStepIndex = (key: string) =>
    steps.findIndex((step) => step.key === key);

  const handleBackButtonClick = () => {
    router.push("/");
  };

  return (
    <PublicAuthPageTemplate>
      <div className="min-h-screen bg-white px-2 md:px-6 py-4 lg:py-10 rounded-lg">
        <div className="max-w-3xl mx-auto mt-5">
          <h6 className="text-gray-800 mb-4 text-center">
            Create Your Profile
          </h6>
          {/* <div className="w-full h-[2px] bg-gray-100 mb-5" /> */}

          {/* Progress Bar */}
          <div className="relative w-full h-2 bg-gray-300 rounded-full mb-6">
            <div
              className="absolute h-2 bg-green-500 rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((getStepIndex(activeTab) + 1) / steps.length) * 100
                }%`,
              }}
            />
          </div>

          <p className="text-sm font-semibold text-gray-800 mb-4">Basic Info</p>

          <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
            <div className="border border-gray-300 rounded-md p-1 flex space-x-3">
              {steps.map((step) => (
                <button
                  type="button"
                  key={step.key}
                  className={`px-4 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                    activeTab === step.key
                      ? "bg-primaryLight text-white"
                      : "text-gray-800"
                  }`}
                  onClick={() => setActiveTab(step.key as any)}
                >
                  {step.label}
                </button>
              ))}
            </div>

            <SelectInstitutionType
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
          </div>

          <div className="">{renderForm()}</div>
        </div>
      </div>
    </PublicAuthPageTemplate>
  );
};

export default RegistrationFormPage;
