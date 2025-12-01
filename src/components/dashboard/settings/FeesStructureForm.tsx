"use client";
import React, { useState } from "react";
import { FaRupeeSign } from "react-icons/fa";

export default function FeesStructureForm() {
  const [formData, setFormData] = useState({
    registrationFee: "",
    registrationFrequency: "",
    admissionFee: "",
    admissionFrequency: "",
    transportationFee: "",
    transportationFrequency: "",
    academicFee: "",
    academicFrequency: "",
    applicationFee: "",
    applicationFrequency: "",
    miscFee: "",
    miscFrequency: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="">
      <div className="">
        <h2 className="text-lg font-semibold mb-6">Fees Structure</h2>

        {/* Top Right Buttons */}
        <div className="flex justify-end space-x-4 mb-4">
          <button className="bg-blue-900 text-white px-4 py-1 rounded-lg text-sm">
            2024 - 2025
          </button>
          <button className="bg-blue-900 text-white px-4 py-1 rounded-lg text-sm">
            Nursery
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Registration Fees */}
          <div>
            <label className="block text-sm font-medium mb-1">Registration Fees</label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
              <select
                name="registrationFee"
                value={formData.registrationFee}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              >
                <option>Select</option>
              </select>
              <FaRupeeSign className="text-gray-500 ml-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Frequency of Registration fees</label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
              <select
                name="registrationFrequency"
                value={formData.registrationFrequency}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              >
                <option>Select</option>
              </select>
            </div>
          </div>

          {/* Admission Fees */}
          <div>
            <label className="block text-sm font-medium mb-1">Admission Fees</label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
              <select
                name="admissionFee"
                value={formData.admissionFee}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              >
                <option>Select</option>
              </select>
              <FaRupeeSign className="text-gray-500 ml-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Frequency of Admission fees</label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
              <select
                name="admissionFrequency"
                value={formData.admissionFrequency}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              >
                <option>Select</option>
              </select>
            </div>
          </div>

          {/* Transportation Fees */}
          <div>
            <label className="block text-sm font-medium mb-1">Transportation Fees</label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
              <select
                name="transportationFee"
                value={formData.transportationFee}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              >
                <option>Select</option>
              </select>
              <FaRupeeSign className="text-gray-500 ml-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Frequency of Transportation fees</label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
              <select
                name="transportationFrequency"
                value={formData.transportationFrequency}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              >
                <option>Select</option>
              </select>
            </div>
          </div>

          {/* Academic Fees */}
          <div>
            <label className="block text-sm font-medium mb-1">Frequency of Academic fees</label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
              <select
                name="academicFrequency"
                value={formData.academicFrequency}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              >
                <option>Select</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Academic Fees</label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
              <select
                name="academicFee"
                value={formData.academicFee}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              >
                <option>Select</option>
              </select>
              <FaRupeeSign className="text-gray-500 ml-2" />
            </div>
          </div>

          {/* Application Fees */}
          <div>
            <label className="block text-sm font-medium mb-1">Application Fees</label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
              <select
                name="applicationFee"
                value={formData.applicationFee}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              >
                <option>Select</option>
              </select>
              <FaRupeeSign className="text-gray-500 ml-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Frequency of Application fees</label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
              <select
                name="applicationFrequency"
                value={formData.applicationFrequency}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              >
                <option>Select</option>
              </select>
            </div>
          </div>

          {/* Misc Fees */}
          <div>
            <label className="block text-sm font-medium mb-1">Other Misc Fees</label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
              <select
                name="miscFee"
                value={formData.miscFee}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              >
                <option>Select</option>
              </select>
              <FaRupeeSign className="text-gray-500 ml-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Frequency of Misc fees</label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
              <select
                name="miscFrequency"
                value={formData.miscFrequency}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              >
                <option>Select</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

