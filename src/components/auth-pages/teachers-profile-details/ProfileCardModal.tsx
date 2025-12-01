"use client";
import { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import TeacherCard from "../update-profile-details/TeacherCard";
import JobCard from "../update-profile-details/JobCard";
import { usePathname } from "next/navigation";

export default function ProfileCardModal() {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <div>
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        <TeacherCard />
        {pathName != "/teacher/profile" && <JobCard />}
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={handleOutsideClick}
        >
          <div className="bg-white rounded-xl shadow-lg p-6 relative max-w-md w-full">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
            >
              &times;
            </button>
            <ProfileCard />
          </div>
        </div>
      )}
    </div>
  );
}
