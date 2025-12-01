// src/components/auth-pages/teachers-profile-details/ParentForm.tsx
"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useEditStudentProfileMutation } from "@/features/api/studentsApiSlice";
import {
  StudentProfileResponse,
  EditProfileRequest,
} from "@/types/student.type";

export default function ParentForm({
  profile,
  setEditingSection,
}: {
  profile?: any;
  setEditingSection?: any;
}) {
  const [formData, setFormData] = useState<EditProfileRequest>({
    fatherName: `${profile.parentFirstName ?? ""} ${profile.parentLastName ?? ""}`.trim(),
    motherName: profile.motherName || "",
    fatherEmail: profile.parentEmail || "",
    fatherCountryCode: profile.parentCountryCode || "",
    fatherMobile: profile.parentMobile || "",
    guardianName: profile.guardianName || "",
    guardianCountryCode: profile.guardianCountryCode || "91",
    guardianMobile: profile.guardianMobile || "",

  });

  const [editProfile, { isLoading, error }] = useEditStudentProfileMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "fatherCountryCode" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await editProfile(formData).unwrap();
      setEditingSection("");
    } catch (err) {
      console.error("Failed to update parent info:", err);
    }
  };

  const handleCancel = () => {
    setEditingSection("");
  };

  return (
    <div className="mt-4">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <h2 className="col-span-1 text-xl font-semibold">Parent's Info</h2>
            <div className="col-span-1 flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="text-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-indigo-600 font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Father Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName || ""}
            onChange={handleChange}
            className="w-full border rounded-full px-4 py-2 focus:outline-none"
            placeholder="Enter Father Name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Mother Name
          </label>
          <input
            type="text"
            name="motherName"
            value={formData.motherName || ""}
            onChange={handleChange}
            className="w-full border rounded-full px-4 py-2 focus:outline-none"
            placeholder="Enter Mother Name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Father's Mobile Number<span className="text-red-500">*</span>
          </label>
          <div className="flex items-center border rounded-full px-4 py-2">
            <span className="text-gray-500 mr-2">
              +{formData.fatherCountryCode || 91}
            </span>
            <input
              type="text"
              name="fatherMobile"
              value={formData.fatherMobile || ""}
              onChange={handleChange}
              className="w-full focus:outline-none"
            placeholder="(XXXXXXXXXX)"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Father's Email Id<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="fatherEmail"
            value={formData.fatherEmail || ""}
            onChange={handleChange}
            className="w-full border rounded-full px-4 py-2 focus:outline-none"
            placeholder="Enter Father's Email Id"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
          Guardian’s Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="guardianName"
            value={formData.guardianName || ""}
            onChange={handleChange}
            className="w-full border rounded-full px-4 py-2 focus:outline-none"
            placeholder="Enter Guardian's Name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
          Guardian’s Mobile Number<span className="text-red-500">*</span>
          </label>
          <div className="flex items-center border rounded-full px-4 py-2">
            <span className="text-gray-500 mr-2">
              +{formData.guardianCountryCode || 91}
            </span>
            <input
              type="text"
              name="guardianMobile"
              value={formData.guardianMobile || ""}
              onChange={handleChange}
              className="w-full focus:outline-none"
            placeholder="(XXXXXXXXXX)"
            />
          </div>
        </div>
        {/* Guardian fields can be added if separate fields exist in API */}
      </form>
      {/* {error && (
        <div className="text-red-500 mt-2">
          {(error as any)?.message || "Error saving parent info"}
        </div>
      )} */}
    </div>
  );
}
