import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/store";

const RegisteredOnboarding = ({
  type,
  name,
  show,
  onClose,
}: {
  type?: any;
  show: boolean;
  onClose: () => void;
  name: string;
}) => {
  const router = useRouter();
  const [isType, setIsType] = useState("");

  const role = useSelector((state: RootState) => state.auth.role);

  useEffect(() => {
    let data = localStorage.getItem("selected_type");
    if (data) setIsType(data);
  });

  const handleHomePage = () => {
    if (role === "Institute") {
        router.push("/dashboard");
    }
    if (role === "Student") {
        router.push("/student/profile");
    }
    if (role === "Teacher") {
      router.push("/");
    }
  };

  const handleUpdateProfile = (): void => {
    if (role === "Student") {
      router.push("/student/book-library");
    }
    if (role === "Teacher") {
      router.push("/");
    }
    if (role === "Institute") {
      if (isType === "School") {
        router.push("/onboarding-school");
      } else if (isType === "College") {
        router.push("/onboarding-college");
      } else {
        router.push("/onboarding-coaching");
      }
    }
  };

  useEffect(() => {
    const scrollY = window.scrollY;
    Object.assign(document.body.style, {
      position: "fixed",
      top: `-${scrollY}px`,
      width: "100%",
      overflowY: "scroll",
    });

    return () => {
      Object.assign(document.body.style, {
        position: "",
        top: "",
        width: "",
        overflowY: "",
      });
      window.scrollTo(0, scrollY);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex-box-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl text-center relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 text-xl"
        >
          &times;
        </button>

        <div className="flex justify-center mb-10">
          <div className="flex-box-center">
            <img
              src="/onboarding-image.png"
              alt="Onboarding"
              className="w-[60%] h-auto "
            />
          </div>
        </div>

        <p className="text-sm text-deepBlue mb-4">
          Hi
          <span className="font-semibold"> {name}, </span>
          Welcome to INUPGRO. Your profile has been created successfully. Kindly
          complete your profile so that everyone can view your school’s profile.
        </p>

        <div className="flex-box-center gap-4 text-xs mt-10">
          {role !== "Teacher" && (
            <button
              type="button"
              className={`w-36 px-6 py-1.5 rounded border border-gray-300 text-gray-600 hover:bg-gray-100`}
              onClick={() => handleHomePage()}
            >
              {role == "Student" ? "Go to profile" : "Go to home page"}
            </button>
          )}

          <button
            type="submit"
            className={`${role == "Teacher" ? "w-72" : "w-36"
              } px-6 py-1.5 rounded bg-slate-300 text-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-200`}
            onClick={handleUpdateProfile}
          >
            {role == "Student"
              ? "Access Platform"
              : role == "Teacher"
                ? "Go to home page"
                : "Complete profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisteredOnboarding;
