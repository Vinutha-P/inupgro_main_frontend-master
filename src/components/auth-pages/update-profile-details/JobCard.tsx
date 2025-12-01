"use client";
import React from "react";

const JobCard = () => {
    
  const job = {
    title: "Bio teacher (12th class), 3 exp yrs",
    school: "Mahveer Public School",
    location: "Bangalore, India",
    buttonText: "Apply",
  };

  if (!job) {
    return (
      <div className="bg-white p-4 rounded shadow text-center text-gray-400 min-h-[270px]">
        No job openings currently.
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Hiring Open</h3>
      <div className="bg-white p-4 rounded-[10px] shadow min-h-[270px]">
        <div className="w-full h-[120px] bg-gray-100 rounded-[10px] mb-2"></div>
        <div className="mt-3.5 text-[15px] text-[#999999] leading-5">{job.title}</div>
        <div className="text-xs text-gray-500 mb-2">
          <div className="text-xl font-semibold text-[#444444] pt-2">{job.school}</div>
          <div className="mt-1.5 text-[15px] text-[#999999]">{job.location}</div>
        </div>
        <button className="w-full mt-2 px-3 py-1.5 font-medium border border-blue-500 hover:bg-blue-500 text-blue-500 hover:text-white  rounded-lg">
          {job.buttonText}
        </button>
      </div>
    </div>
  );
};

export default JobCard;
