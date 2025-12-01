// import React from 'react'

// const ModalCard = () => {
//     return (
//         <>
//             <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-xl w-full">
//                 <img
//                     src="/computer-login.png"
//                     alt="Profile Update"
//                     className="mx-auto mb-4 w-[380px] h-[260px] object-cover rounded-full"
//                 />
//                 <h2 className="text-2xl font-semibold text-darkBlue  mb-2">Profile Update Required</h2>
//                 <p className="text-[#000000] text-base mb-4">
//                 Your profile is not updated yet. Please update your profile to access this feature.
//                 </p>
//                 <button
//                     className="bg-blue-600 text-[white] px-5 py-2 rounded hover:bg-blue-700 transition"

//                 >
//                     Get Started
//                 </button>
//             </div>
//         </>
//     )
// }

// export default ModalCard

"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ModalCard = ({ role }: { role?: any }) => {
  const router = useRouter();

  // const handleClick = () => {
  //     router.push('/');
  // };

  // const handleUpdateProfile = (): void => {
  // 	if (role === "student") {
  // 		router.push("/student/profile");
  // 	}
  // 	if (role === "teacher") {
  // 		router.push("/teacher/profile");
  // 	}
  // 	if (role === "institute") {
  // 		router.push("/institute-profile");
  // 	}
  // };
  const handleUpdateProfile = (): void => {
    if (role === "Student") {
      router.push("/student/profile");
    }
    if (role === "teacher") {
      router.push("/teacher/profile");
    }
    if (role === "institute") {
      router.push("/onboarding-school");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-xl w-full">
      <Image
        src="/computer-login.png"
        alt="computer-login"
        width={380}
        height={260}
        className="mx-auto mb-4 object-cover rounded-full"
      />
      <h2 className="text-2xl font-semibold text-darkBlue mb-2">
        Profile Update Required
      </h2>
      <p className="text-[#000000] text-base mb-4">
        Your profile is not updated yet. Please update your profile to access
        this feature.
      </p>
      <button
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        onClick={handleUpdateProfile}
      >
        {role == "Student" ? "Update Profile" : "Get Started"}
      </button>
    </div>
  );
};

export default ModalCard;
