import ProgressBar from "@/components/pages/ProgressBar";
import React, { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const applicationData = {
  title: "Application Status: English, French, German, Chinese",
  rounds: [
    {
      title: "Round 1",
      details: [
        { label: "Application Number", value: "2345" },
        { label: "Status", value: "Selected" },
        { label: "Demo Class", value: "1st June 2025" },
        { label: "Class", value: "8th-9th (English)" },
      ],
    },
    {
      title: "Round 2",
      details: [
        { label: "Interview", value: "30th June 2025" },
        { label: "Interviewer Name", value: "Dr. Riya Kumar (Principal)" },
      ],
    },
    {
      title: "Round 3",
      details: [
        { label: "Salary", value: "6 LPA" },
        {
          label: "Status",
          value: "Accepted",
          showButtons: true,
        },
      ],
    },
  ],

};

const ApplicationStatus = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleDropdown = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="mb-3">
      <div
        className="border rounded-lg shadow-sm bg-white cursor-pointer p-6"
        onClick={toggleDropdown}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">{applicationData.title}</h3>
          {expanded ? <AiOutlineUp size={20} /> : <AiOutlineDown size={20} />}
        </div>

        {expanded && (
          <div className="py-6 space-y-4">
            {applicationData.rounds.map((round, idx) => (
              <div key={idx}>
                <h3 className="font-semibold text-lg mb-2">{round.title}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {round.details.map((detail, i) => (
                    <div key={i} className={`${detail.showButtons ? 'col-span-2' : ''}`}>
                      <span className="text-gray-500">{detail.label}</span><br />
                      <span className="text-blue-600 font-medium">{detail.value}</span>

                      {detail.showButtons && (
                        <div className="mt-2 flex justify-end space-x-2">
                          <button className="bg-[#CCFBEF] text-[#15B79E] px-5 py-2 rounded-md text-xs font-semibold">
                            Accepted
                          </button>
                          <button className="border border-[#999999E5] text-[#999999E5] px-5 py-2 rounded-md text-xs font-semibold">
                            Rejected
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="my-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Activity on this application */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Activity on this application
            </h2>
            <div className="flex items-center space-x-6">
              <div>
                <div className="text-2xl font-bold text-gray-900">122</div>
                <div className="text-sm text-gray-500">Total applications</div>
              </div>
              <div className="border-l h-10"></div>
              <div>
                <div className="text-2xl font-bold text-gray-900">09</div>
                <div className="text-sm text-gray-500">Applications viewed by School</div>
              </div>
            </div>
          </div>
          <ProgressBar />



        </div>
      </div>
    </div>
  );
};

export default ApplicationStatus;
