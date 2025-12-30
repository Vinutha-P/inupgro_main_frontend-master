"use client"; // if using in Next.js with client components

import React, { useState } from "react";
import TextEditor from "./TextEditor";
import MarksheetModal from "../DashboardModal";

// Input Component with Props Interface
interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ label, type = "text", placeholder }) => (
  <div className="flex flex-col">
    <label className="text-sm text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

// Select Component with Props Interface
interface SelectProps {
  label: string;
}

const Select: React.FC<SelectProps> = ({ label }) => (
  <div className="flex flex-col">
    <label className="text-sm text-gray-700 mb-1">{label}</label>
    <select className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
      <option>Select...</option>
    </select>
  </div>
);

// TextArea Component with Props Interface
interface TextAreaProps {
  label: string;
  placeholder?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, placeholder }) => (
  <div className="flex flex-col">
    <label className="text-sm text-gray-700 mb-1">{label}</label>
    <textarea
      placeholder={placeholder}
      className="border border-gray-300 px-4 py-2 h-24 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
    ></textarea>
  </div>
);

// Main Form Component
export default function PostJobForm() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="min-h-screen px-6">
      <div className="bg-white p-8 rounded-lg shadow">
        <div className="border-b-2 border-[#D0D5DD]">
          <h2 className="text-2xl font-semibold mb-6">Post a job</h2>
        </div>
        <div className="mt-6">
          <form className="space-y-6">
            {/* Job Title */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                placeholder="Add job title, role, vacancies etc"
                className="w-full border border-gray-200 rounded-md p-2.5 text-sm"
              />
            </div>

            {/* Tags and Job Role */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Tags
                </label>
                <input
                  type="text"
                  placeholder="Job keyword, tags etc..."
                  className="w-full border border-gray-200 rounded-md p-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Job Role
                </label>
                <select className="w-full border border-gray-200 rounded-md p-2.5 text-sm text-gray-500">
                  <option value="">Select...</option>
                </select>
              </div>
            </div>

            {/* Salary Row */}
            <div>
              <h3 className="text-md font-bold text-gray-700 mb-2">Salary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Min Salary
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-md">
                    <input
                      type="text"
                      placeholder="Minimum salary..."
                      className="flex-1 p-2.5 text-sm border-none focus:ring-0"
                    />
                    <span className="px-3 text-sm text-gray-500 border-l border-gray-200">
                      INR
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Max Salary
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-md">
                    <input
                      type="text"
                      placeholder="Maximum salary..."
                      className="flex-1 p-2.5 text-sm border-none focus:ring-0"
                    />
                    <span className="px-3 text-sm text-gray-500 border-l border-gray-200">
                      INR
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Salary Type
                  </label>
                  <select className="w-full border border-gray-200 rounded-md p-2.5 text-sm text-gray-500">
                    <option value="">Select...</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Advance Information */}
            <div>
              <h3 className="text-md font-bold text-gray-700 mb-2">
                Advance Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Education
                  </label>
                  <select className="w-full border border-gray-200 rounded-md p-2.5 text-sm text-gray-500">
                    <option value="">Select...</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Experience
                  </label>
                  <select className="w-full border border-gray-200 rounded-md p-2.5 text-sm text-gray-500">
                    <option value="">Select...</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Job Type
                  </label>
                  <select className="w-full border border-gray-200 rounded-md p-2.5 text-sm text-gray-500">
                    <option value="">Select...</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Vacancies
                  </label>
                  <select className="w-full border border-gray-200 rounded-md p-2.5 text-sm text-gray-500">
                    <option value="">Select...</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Expiration Date
                  </label>
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    className="w-full border border-gray-200 rounded-md p-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Job Level
                  </label>
                  <select className="w-full border border-gray-200 rounded-md p-2.5 text-sm text-gray-500">
                    <option value="">Select...</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h2 className="text-md font-bold text-[#0A150F] mb-2">
                Description & Responsibility
              </h2>
              <TextEditor title="Description" />
              <TextEditor title="Responsibilities" />
            </div>

            {/* <div className="text-end">
              <button
                className="bg-[#2E90FA] text-white px-6 py-2 rounded-md hover:bg-blue-700"
                onClick={() => setIsOpen(true)}
              >
                Post Job →
              </button>

            </div>
            <div className="text-right">
              {isOpen && (
                <>
                  <MarksheetModal setIsOpen={setIsOpen} />
                </>
              )}
            </div> */}
          </form>
        </div>
        <div className="text-end mt-5">
          <button
            className="bg-[#2E90FA] text-white px-6 py-2 rounded-md hover:bg-blue-700"
            onClick={() => setIsOpen(true)}
          >
            Post Job →
          </button>
        </div>
        <div className="text-right">
          {isOpen && (
            <>
              <MarksheetModal setIsOpen={setIsOpen} />
            </>
          )}
          {/* <button className="">
               
              </button> */}
        </div>
      </div>
    </div>
  );
}
