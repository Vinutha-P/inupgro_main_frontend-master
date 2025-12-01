import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addNotification } from "@/features/notification/notificationSlice";
import { useGetAllCollegesQuery } from "../../../features/api/collegeApiSlice";
import { useEditEducationMutation } from "@/features/api/teacherApiSlice";

interface EducationItem {
  institution: string;
  degree: string;
  years: string;
  logo: string;
  _id?: string;
  collegeId: string;
  subject: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface EducationFormProps {
  setEditingSection: any;
  education?: EducationItem;
  teacherProfile: any;
  onSave: any;
  editingItemId: string | null;
}

const EducationForm: React.FC<EducationFormProps> = ({
  setEditingSection,
  education,
  teacherProfile,
  onSave,
  editingItemId,
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    collegeId: "",
    degree: "",
    subject: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const {
    data: collegeData,
    isLoading: isCollegeLoading,
    error: collegeError,
  } = useGetAllCollegesQuery({ limit: 100 });
  const [editEducation] = useEditEducationMutation();

  useEffect(() => {
    if (education) {
      setFormData({
        collegeId: education.collegeId || "",
        degree: education.degree || "",
        subject: education.subject || "",
        startDate: education.startDate ? education.startDate.split("T")[0] : "",
        endDate: education.endDate ? education.endDate.split("T")[0] : "",
        description: education.description || "",
      });
    } else {
      setFormData({
        collegeId: "",
        degree: "",
        subject: "",
        startDate: "",
        endDate: "",
        description: "",
      });
    }
  }, [education, editingItemId]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.collegeId) newErrors.collegeId = "Institute is required";
    if (!formData.degree) newErrors.degree = "Degree is required";
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (new Date(formData.endDate) < new Date(formData.startDate))
      newErrors.endDate = "End date cannot be before start date";
    if (formData.description.length < 200)
      newErrors.description = "Description must be at least 200 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editingItemId) {
        // Edit existing education using the editEducation API
        await editEducation({
          id: editingItemId,
          data: formData,
        }).unwrap();
        dispatch(
          addNotification({
            message: "Education updated successfully",
            type: "SUCCESS",
          })
        );
      } else {
        // Add new education using the previous logic
        let updatedEducations = teacherProfile?.teachereducations || [];
        updatedEducations = [...(teacherProfile?.educations || []), formData];;

        await onSave({
          ...teacherProfile,
          educations: updatedEducations,
        }).unwrap();

        dispatch(
          addNotification({
            message: "Education added successfully",
            type: "SUCCESS",
          })
        );
      }

      setEditingSection(null);
      setFormData({
        collegeId: "",
        degree: "",
        subject: "",
        startDate: "",
        endDate: "",
        description: "",
      });
    } catch (error) {
      dispatch(
        addNotification({
          message: "Failed to update education",
          type: "ERROR",
        })
      );
    }
  };

  const collegeOptions = useMemo(() => {
    if (!collegeData || !Array.isArray(collegeData.data)) return [];
    return collegeData.data.map((school: any) => ({
      value: school._id,
      label: school.name,
    }));
  }, [collegeData]);

  const remainingChars = 500 - formData.description.length;

  return (
    <div className="mt-2">
      <h2 className="text-xl font-semibold">Education</h2>
      {editingItemId && education && (
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-4">
            <Image src={education.logo} width={40} height={40} alt="edu-logo" />
            <div>
              <p className="font-medium text-gray-800">
                <span className="inline-flex items-center gap-2">
                  🎓 {education.institution}
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  {education.years}
                </span>
              </p>
              <p className="text-sm text-gray-600">{education.degree}</p>
            </div>
          </div>
        </div>
      )}
      <div className="border-t pt-4">
        <h3 className="text-md font-semibold mb-4">
          {editingItemId ? "Edit Education" : "Add Education"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">
                Institute/College Name <span className="text-red-500">*</span>
              </label>
              <select
                name="collegeId"
                value={formData.collegeId}
                onChange={(e) =>
                  setFormData({ ...formData, collegeId: e.target.value })
                }
                className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isCollegeLoading}
                aria-invalid={!!errors.collegeId}
                aria-describedby={errors.collegeId ? "collegeId-error" : undefined}
              >
                <option value="">Select Institute</option>
                {collegeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.collegeId && (
                <p id="collegeId-error" className="text-red-500 text-xs mt-1">
                  {errors.collegeId}
                </p>
              )}
              {isCollegeLoading && (
                <p className="text-gray-500 text-xs mt-1">Loading colleges...</p>
              )}
              {!!collegeError && (
                <p className="text-red-500 text-xs mt-1">Failed to load colleges</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">
                Degree <span className="text-red-500">*</span>
              </label>
              <select
                name="degree"
                value={formData.degree}
                onChange={(e) =>
                  setFormData({ ...formData, degree: e.target.value })
                }
                className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-invalid={!!errors.degree}
                aria-describedby={errors.degree ? "degree-error" : undefined}
              >
                <option value="">Select Degree</option>
                <option value="B.Tech">Bachelor of Technology</option>
                <option value="M.Tech">Master of Engineering</option>
                <option value="PhD">PhD</option>
                <option value="Diploma">Diploma</option>
              </select>
              {errors.degree && (
                <p id="degree-error" className="text-red-500 text-xs mt-1">
                  {errors.degree}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">
                Subject <span className="text-red-500">*</span>
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? "subject-error" : undefined}
              >
                <option value="">Select Subject</option>
                <option value="CS">Computer Science</option>
                <option value="EE">Electrical Engineering</option>
                <option value="ME">Mechanical Engineering</option>
                <option value="CE">Civil Engineering</option>
              </select>
              {errors.subject && (
                <p id="subject-error" className="text-red-500 text-xs mt-1">
                  {errors.subject}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">
                Start Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-invalid={!!errors.startDate}
                  aria-describedby={errors.startDate ? "startDate-error" : undefined}
                />
                <FaCalendarAlt className="absolute right-3 top-3.5 h-4 w-4 text-gray-400" />
              </div>
              {errors.startDate && (
                <p id="startDate-error" className="text-red-500 text-xs mt-1">
                  {errors.startDate}
                </p>
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
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-invalid={!!errors.endDate}
                  aria-describedby={errors.endDate ? "endDate-error" : undefined}
                />
                <FaCalendarAlt className="absolute right-3 top-3.5 h-4 w-4 text-gray-400" />
              </div>
              {errors.endDate && (
                <p id="endDate-error" className="text-red-500 text-xs mt-1">
                  {errors.endDate}
                </p>
              )}
            </div>
          </div>
          <div className="mt-4 relative">
            <label className="text-sm font-medium">
              Description <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <textarea
                name="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full mt-1 p-3 border rounded-md bg-gray-50 pr-28 pb-10 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tell us about your study"
                maxLength={500}
                aria-invalid={!!errors.description}
                aria-describedby={errors.description ? "description-error" : undefined}
              />
              <div className="absolute bottom-2 right-3 text-xs text-gray-400">
                {remainingChars} characters remaining
              </div>
            </div>
            {errors.description && (
              <p id="description-error" className="text-red-500 text-xs mt-1">
                {errors.description}
              </p>
            )}
          </div>
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setEditingSection(null);
                setFormData({
                  collegeId: "",
                  degree: "",
                  subject: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                });
              }}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EducationForm;