"use client";
import React, { useState } from "react";
import MarksheetModal from "../DashboardModal";
import { FaArrowLeft } from "react-icons/fa";

const PDFIcon = () => (
  <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 2a2 2 0 0 0-2 2v16c0 1.103.897 2 2 2h12a2 2 0 0 0 2-2V8l-6-6H6zm7 1.5L18.5 9H13V3.5zM8 13h1.5v4H8v-4zm2.5 0H13a1.5 1.5 0 1 1 0 3H12v1h-1.5v-4zm3.5 0h2v1h-0.5v3H14v-3h-0.5v-1z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    className="w-5 h-5 text-gray-600"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const ChevronUpIcon = () => (
  <svg
    className="w-5 h-5 text-gray-600"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
  </svg>
);

const educationData = [
  {
    school: "The Doon School (Co-ed)",
    duration: "2022–Present",
    classInfo: "Class 11th, PCM",
    expanded: true,
    documents: [],
  },
  {
    school: "SRN International School",
    duration: "2021–2022",
    classInfo: "Class 7th–10th, All Subjects",
    expanded: true,
    classes: [
      {
        name: "Class 10th",
        subjects: "All Subjects + Hindi",
        files: ["Marksheet.PDF", "TC.PDF", "Migrant.PDF"],
      },
      {
        name: "Class 9th",
        subjects: "All Subjects + Hindi",
        files: ["Certificate.PDF"],
      },
      {
        name: "Class 8th",
        subjects: "All Subjects + Hindi",
        files: ["Certificate.PDF"],
      },
      {
        name: "Class 7th",
        subjects: "All Subjects + Hindi",
        files: ["Certificate.PDF"],
      },
    ],
  },
  {
    school: "British International School Jaipur",
    duration: "2014–2023",
    classInfo: "Class Nursery–6th, All Subjects",
    expanded: false,
    documents: [],
  },
];

const documentsInfo = [
  {
    title: "Academic certificates",
    file: "Certificate.PDF",
  },
  {
    title: "Aadhar card",
    file: "Certificate.PDF",
  },
];

const StudentsApplicationForm = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleExpand = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <>
      <div className="bg-white flex items-center gap-2 rounded-[16px] mb-5 mx-5 text-lg text-[#2A2A2A] font-medium p-4">
        <FaArrowLeft />
        All Students
      </div>
      <div className="bg-white text-slate-800 font-sans p-10 mx-5 min-h-screen">
        <div className="">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-base font-semibold">
                Student ID: <span className="text-indigo-800">#123456789</span>
              </h1>
            </div>
            <div className="space-x-2">
              <button className="bg-[#D92D20] text-white px-5 py-2 rounded hover:bg-red-700">
                ✖ Reject
              </button>
              <button className="bg-[#12B76A] text-white px-5 py-2 rounded hover:bg-green">
                ✓ Accept
              </button>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center mb-8">
            <div className="h-32 w-32 rounded-full border-2 bg-gray-300 border-gray-300 flex items-center justify-center text-gray-400">
              {/* <img src="https://placehold.co/96x96" alt="Profile" className="rounded-full" /> */}
            </div>
          </div>

          {/* Student Info */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Student Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-[#667085]">
                Name
                <br />
                <strong> Smita Agarwal</strong>
              </div>
              <div className="text-[#667085]">
                DOB (Date of Birth)
                <br />
                <strong> 10 Nov 1994</strong>
              </div>
              <div className="text-[#667085]">
                Age
                <br /> <strong> 29</strong>
              </div>
              <div className="text-[#667085]">
                Gender
                <br />
                <strong> Female</strong>
              </div>
              <div className="text-[#667085]">
                Email
                <br />
                <strong>94guptanishu@gmail.com</strong>
              </div>
              <div className="text-[#667085]">
                Mobile number
                <br />
                <strong>+91 9079248369</strong>
              </div>
              <div className="col-span-3 text-[#667085]">
                Address
                <br />
                <strong>
                  {" "}
                  D-58, 80 feet road, Mahesh Nagar, Jaipur, Rajasthan (302015)
                </strong>
              </div>
            </div>
          </section>

          {/* Parent's Info */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Parent’s Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-[#667085]">
                Father’s name
                <br /> <strong> Sidharth VP</strong>
              </div>
              <div className="text-[#667085]">
                Father’s Email
                <br /> <strong> 94guptanishu@gmail.com</strong>
              </div>
              <div className="text-[#667085]">
                Father’s number
                <br /> <strong> +91 9079248369</strong>
              </div>

              <div className="text-[#667085]">
                Mother’s name
                <br /> <strong> Sidharth VP</strong>
              </div>
              <div className="text-[#667085]">
                Mother’s Email
                <br /> <strong> -</strong>
              </div>
              <div className="text-[#667085]">
                Mother’s number
                <br /> <strong> +91 9079248369</strong>
              </div>

              <div className="text-[#667085]">
                Guardian’s name
                <br /> <strong> Sidharth VP</strong>
              </div>
              <div className="text-[#667085]">
                Guardian’s Email
                <br /> <strong> 94guptanishu@gmail.com</strong>
              </div>
              <div className="text-[#667085]">
                Guardian’s number
                <br /> <strong> +91 9079248369</strong>
              </div>
            </div>
          </section>

          {/* Additional Info */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Additional Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-[#667085]">
                Current school name
                <br />
                <strong> Chinmaya Vidhyalaya</strong>
              </div>
              <div className="text-[#667085]">
                Current class
                <br />
                <strong>5th</strong>
              </div>
              <div className="text-[#667085]">
                Current medium
                <br />
                <strong>English</strong>
              </div>

              <div className="text-[#667085]">
                Preferred medium
                <br />
                <strong>English</strong>
              </div>
              <div className="text-[#667085]">
                Applying for class
                <br />
                <strong>6th</strong>
              </div>
              <div className="text-[#667085]">
                Preferred additional subject
                <br />
                <strong>French</strong>
              </div>
            </div>
          </section>

          <div className="font-sans text-sm">
            <h2 className="text-lg font-bold mb-4">Education</h2>

            {educationData.map((school, index) => (
              <div key={index} className="border-b py-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{school.school}</h3>
                    <p className="text-gray-500 text-xs">{school.duration}</p>
                    <p>{school.classInfo}</p>
                  </div>
                  <button onClick={() => toggleExpand(index)}>
                    {activeIndex === index ? (
                      <ChevronUpIcon />
                    ) : (
                      <ChevronDownIcon />
                    )}
                  </button>
                </div>

                {activeIndex === index && (
                  <div className="mt-3 space-y-3">
                    {school.classes ? (
                      school.classes.map((cls, i) => (
                        <div key={i} className="flex justify-between">
                          <div>
                            <p className="font-medium">{cls.name}</p>
                            <p className="text-gray-600 text-xs">
                              {cls.subjects}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {cls.files.map((file, fIdx) => (
                              <button
                                key={fIdx}
                                className="flex items-center gap-1 bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs"
                                onClick={() => setIsOpen(true)}
                              >
                                <PDFIcon /> {file}
                              </button>
                            ))}
                          </div>

                          {/* Modal */}
                          {isOpen && (
                            <>
                              <MarksheetModal setIsOpen={setIsOpen} />
                            </>
                          )}
                        </div>
                      ))
                    ) : school.documents && school.documents.length > 0 ? (
                      <div className="pl-4">
                        <div className="flex flex-wrap gap-2 mt-1">
                          {school.documents.map((file, fIdx) => (
                            <button
                              key={fIdx}
                              className="flex items-center gap-1 bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs"
                            >
                              <PDFIcon /> {file}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            ))}

            <div className="mt-6">
              <h2 className="text-lg font-bold mb-2">Documents Info</h2>
              <div className="flex gap-4">
                {documentsInfo.map((doc, index) => (
                  <div key={index}>
                    <p className="text-sm font-medium">{doc.title}</p>
                    <button className="flex items-center gap-1 bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs mt-1">
                      <PDFIcon /> {doc.file}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentsApplicationForm;
