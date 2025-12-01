// SkillsForm.tsx
import React, { useState, useEffect, useCallback } from "react";
import { FaPlusCircle, FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addNotification } from "@/features/notification/notificationSlice";

// --- Types ---
interface Skill {
  hobby: string;
  description: string;
}

interface SkillsFormProps {
  setEditingSection: any;
  skills: Skill[];
  teacherProfile: any;
  onSave: (data: any) => Promise<any>;
  skillsEditData: any;
}

// --- Component ---
const SkillsForm: React.FC<SkillsFormProps> = ({
  setEditingSection,
  skills,
  teacherProfile,
  onSave,
  skillsEditData,
}) => {
  const dispatch = useDispatch();

  const [skillsList, setSkillsList] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState<Skill>({
    hobby: "",
    description: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setSkillsList(skills || []);
  }, [skills]);

  useEffect(() => {
    if (skillsEditData) {
      setNewSkill({
        hobby: skillsEditData.hobby || "",
        description: skillsEditData.description || "",
      });
      setEditingIndex(
        skillsList.findIndex((skill) => skill.hobby === skillsEditData.hobby)
      );
    }
  }, [skillsEditData, skillsList]);

  const validateSkill = useCallback(
    (skill: Skill): { [key: string]: string } => {
      const newErrors: { [key: string]: string } = {};

      if (!skill.hobby.trim()) {
        newErrors.hobby = "Skill name is required";
      }

      const duplicate = skillsList.some(
        (s, idx) =>
          s.hobby.toLowerCase() === skill.hobby.toLowerCase() &&
          (editingIndex === null || idx !== editingIndex)
      );
      if (duplicate) {
        newErrors.hobby = "This skill already exists";
      }

      if (skill.description.length < 50) {
        newErrors.description = "Description must be at least 50 characters";
      }
      if (skill.description.length > 500) {
        newErrors.description = "Description cannot exceed 500 characters";
      }

      return newErrors;
    },
    [skillsList, editingIndex]
  );

  const handleAddOrUpdateSkillAndSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const validationErrors = validateSkill(newSkill);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    let updatedSkillsList = [...skillsList];

    if (editingIndex !== null) {
      updatedSkillsList = updatedSkillsList.map((skill, idx) =>
        idx === editingIndex ? newSkill : skill
      );
    } else {
      updatedSkillsList.push(newSkill);
    }

    if (updatedSkillsList.length === 0) {
      dispatch(
        addNotification({
          message: "Please add at least one skill before saving",
          type: "ERROR",
        })
      );
      return;
    }

    setIsSaving(true);
    try {
      await onSave({ ...teacherProfile, skills: updatedSkillsList });
      dispatch(
        addNotification({
          message: "Skills updated successfully",
          type: "SUCCESS",
        })
      );
      setSkillsList(updatedSkillsList);
      setEditingSection(null);
      setNewSkill({ hobby: "", description: "" });
      setEditingIndex(null);
      setErrors({});
    } catch (error) {
      dispatch(
        addNotification({
          message: "Failed to update skills",
          type: "ERROR",
        })
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Calculate remaining characters for description
  const remainingChars = 500 - newSkill.description.length;

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills</h2>
      <div className="border-t pt-4">
        <form>
          <h3 className="text-md font-semibold text-gray-700 mb-4">
            {editingIndex !== null ? "Edit Skill" : "Add a New Skill"}
          </h3>
          <div className="mb-4">
            <label
              htmlFor="hobby"
              className="text-sm font-medium text-gray-700"
            >
              Skill Name <span className="text-red-500">*</span>
            </label>
            <select
              id="hobby"
              value={newSkill.hobby}
              onChange={(e) =>
                setNewSkill((prev) => ({
                  ...prev,
                  hobby: e.target.value,
                }))
              }
              className="w-full border rounded-full px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-invalid={!!errors.hobby}
              aria-describedby={errors.hobby ? "hobby-error" : undefined}
            >
              <option value="">Select Skill</option>
              <option value="Maths">Maths</option>
              <option value="AI & ML">AI & ML</option>
              <option value="Programming">Programming</option>
              <option value="Physics">Physics</option>
              <option value="Communication">Communication</option>
            </select>
            {errors.hobby && (
              <p id="hobby-error" className="text-red-500 text-xs mt-1">
                {errors.hobby}
              </p>
            )}
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              value={newSkill.description}
              onChange={(e) =>
                setNewSkill((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Describe your skill in detail"
              className="w-full mt-1 p-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={4}
              maxLength={500}
              aria-invalid={!!errors.description}
              aria-describedby={
                errors.description ? "description-error" : undefined
              }
            />
            <div className="absolute bottom-2 right-3 flex items-center gap-2 text-xs">
              <span
                className={
                  remainingChars < 0 ? "text-red-500" : "text-gray-400"
                }
              >
                {remainingChars} characters remaining
              </span>
            </div>
            {errors.description && (
              <p id="description-error" className="text-red-500 text-xs mt-1">
                {errors.description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddOrUpdateSkillAndSave}
            className="flex items-center gap-2 text-blue-600 text-sm font-medium hover:underline mb-6"
            aria-label={editingIndex !== null ? "Update Skill" : "Add Skill"}
          >
            <FaPlusCircle className="h-5 w-5" />
            {editingIndex !== null ? "Update Skill" : "Add Skill"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SkillsForm;
