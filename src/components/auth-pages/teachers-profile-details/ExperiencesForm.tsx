import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addNotification } from "@/features/notification/notificationSlice";
import { useGetAllSchoolsQuery } from "../../../features/api/schoolApiSlice";
import { useEditExperienceMutation } from "@/features/api/teacherApiSlice";

interface ExperienceItem {
  company: string;
  role: string;
  years: string;
  logo: string;
  _id?: string;
  schoolId: string;
  designation: string;
  expertise: string;
  className: string;
  isCurrentSchool: boolean;
  startDate: string;
  endDate: string;
  description: string;
}

interface ExperienceFormProps {
  setEditingSection: any;
  experience?: ExperienceItem;
  teacherProfile: any;
  onSave: any;
  editingItemId: string | null;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({
  setEditingSection,
  experience,
  teacherProfile,
  onSave,
  editingItemId,
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    schoolId: "",
    designation: "",
    expertise: "",
    className: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [isCurrentSchool, setIsCurrentSchool] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const {
    data: schoolsData,
    isLoading: isSchoolsLoading,
    error: schoolsError,
  } = useGetAllSchoolsQuery({ limit: 100 });
  const [editExperience] = useEditExperienceMutation();

  useEffect(() => {
    if (experience) {
      setFormData({
        schoolId: experience.schoolId || "",
        designation: experience.designation || "",
        expertise: experience.expertise || "",
        className: experience.className || "",
        startDate: experience.startDate ? experience.startDate.split("T")[0] : "",
        endDate: experience.endDate ? experience.endDate.split("T")[0] : "",
        description: experience.description || "",
      });
      setIsCurrentSchool(experience.isCurrentSchool || false);
    } else {
      setFormData({
        schoolId: "",
        designation: "",
        expertise: "",
        className: "",
        startDate: "",
        endDate: "",
        description: "",
      });
      setIsCurrentSchool(false);
    }
  }, [experience, editingItemId]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.schoolId) newErrors.schoolId = "School is required";
    if (!formData.designation) newErrors.designation = "Designation is required";
    if (!formData.expertise) newErrors.expertise = "Expertise is required";
    if (!formData.className) newErrors.className = "Class is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!isCurrentSchool && !formData.endDate)
      newErrors.endDate = "End date is required";
    if (formData.description.length < 200)
      newErrors.description = "Description must be at least 200 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const data = { ...formData, isCurrentSchool };
      if (editingItemId) {
        // Edit existing experience using the editExperience API
        await editExperience({
          id: editingItemId,
          data,
        }).unwrap();
        dispatch(
          addNotification({
            message: "Experience updated successfully",
            type: "SUCCESS",
          })
        );
      } else {
        // Add new experience using the previous logic
        let updatedExperiences = teacherProfile?.teacherexperiences || [];
        updatedExperiences = [...(teacherProfile?.experiences || []), data];

        await onSave({
          ...teacherProfile,
          experiences: updatedExperiences,
        }).unwrap();

        dispatch(
          addNotification({
            message: "Experience added successfully",
            type: "SUCCESS",
          })
        );
      }

      setEditingSection(null);
      setFormData({
        schoolId: "",
        designation: "",
        expertise: "",
        className: "",
        startDate: "",
        endDate: "",
        description: "",
      });
      setIsCurrentSchool(false);
    } catch (error) {
      dispatch(
        addNotification({
          message: "Failed to update experience",
          type: "ERROR",
        })
      );
    }
  };

  const schoolOptions = useMemo(() => {
    if (!schoolsData || !Array.isArray(schoolsData.data)) return [];
    return schoolsData.data?.map((school: any) => ({
      value: school._id,
      label: school.name,
    }));
  }, [schoolsData]);

  return (
    <div className="">
      <h2 className="text-xl font-semibold">Experiences</h2>
      {editingItemId && experience && (
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-4">
            <Image src={experience.logo} width={40} height={40} alt="exp-logo" />
            <div>
              <div className="flex items-center gap-8">
                <h5 className="font-medium">{experience.company}</h5>
                <span className="text-sm text-gray-500">{experience.years}</span>
              </div>
              <p className="text-sm text-gray-600">{experience.role}</p>
            </div>
          </div>
        </div>
      )}
      <div className="border-t pt-4">
        <h3 className="text-md font-semibold mb-4">
          {editingItemId ? "Edit Experience" : "Add Experience"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">
                Current working school <span className="text-red-500">*</span>
              </label>
              <select
                name="schoolId"
                value={formData.schoolId}
                onChange={(e) => setFormData({ ...formData, schoolId: e.target.value })}
                className="w-full border rounded-full px-4 py-2 focus:outline-none"
                disabled={isSchoolsLoading}
              >
                <option value="">Select School</option>
                {schoolOptions?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.schoolId && (
                <p className="text-red-500 text-xs mt-1">{errors.schoolId}</p>
              )}
              {isSchoolsLoading && (
                <p className="text-gray-500 text-xs mt-1">Loading schools...</p>
              )}
              {/* {schoolsError && (
                <p className="text-red-500 text-xs mt-1">
                  Failed to load schools: {typeof schoolsError === "string" ? schoolsError : JSON.stringify(schoolsError)}
                </p>
              )} */}
            </div>
            <div>
              <label className="text-sm font-medium">
                Designation Name <span className="text-red-500">*</span>
              </label>
              <select
                name="designation"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full border rounded-full px-4 py-2 focus:outline-none"
              >
                <option value="">Select Designation</option>
                <option value="PGT">PGT</option>
                <option value="TGT">TGT</option>
                <option value="PRT">PRT</option>
                <option value="Principal">Principal</option>
              </select>
              {errors.designation && (
                <p className="text-red-500 text-xs mt-1">{errors.designation}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">
                Expertise <span className="text-red-500">*</span>
              </label>
              <select
                name="expertise"
                value={formData.expertise}
                onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                className="w-full border rounded-full px-4 py-2 focus:outline-none"
              >
                <option value="">Select</option>
                <option value="Maths">Maths</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
                <option value="History">History</option>
              </select>
              {errors.expertise && (
                <p className="text-red-500 text-xs mt-1">{errors.expertise}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">
                Class <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="className"
                value={formData.className}
                onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                placeholder="Enter class (e.g. 6th, 7th)"
                className="w-full border rounded-full px-4 py-2 focus:outline-none"
              />
              {errors.className && (
                <p className="text-red-500 text-xs mt-1">{errors.className}</p>
              )}
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isCurrentSchool}
              onChange={() => setIsCurrentSchool(!isCurrentSchool)}
              className="w-4 h-4"
            />
            <label className="text-sm text-gray-600">
              I am currently working in the same school
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-sm font-medium">
                Start Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full border rounded-full px-4 py-2 focus:outline-none"
                />
                <FaCalendarAlt className="absolute right-3 top-3.5 h-4 w-4 text-gray-400" />
              </div>
              {errors.startDate && (
                <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">
                End Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full border rounded-full px-4 py-2 focus:outline-none"
                  disabled={isCurrentSchool}
                />
                <FaCalendarAlt className="absolute right-3 top-3.5 h-4 w-4 text-gray-400" />
              </div>
              {errors.endDate && (
                <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>
              )}
            </div>
          </div>
          <div className="mt-4 relative">
            <label className="text-sm font-medium">Job description</label>
            <div className="relative">
              <textarea
                name="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full mt-1 p-3 border rounded-md bg-gray-50 pr-32 pb-10 resize-none"
                placeholder="Tell us about your job"
                maxLength={500}
              />
              <div className="absolute bottom-2 right-3 text-xs text-gray-400">
                Minimum 200 words
              </div>
            </div>
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setEditingSection(null);
                setFormData({
                  schoolId: "",
                  designation: "",
                  expertise: "",
                  className: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                });
                setIsCurrentSchool(false);
              }}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperienceForm;