// AboutMeForm.tsx
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNotification } from "@/features/notification/notificationSlice";

interface AboutMeFormProps {
  setEditingSection: any;
  profile: any;
  teacherProfile: any;
  onSave: any;
}

const AboutMeForm: React.FC<AboutMeFormProps> = ({
  setEditingSection,
  profile,
  teacherProfile,
  onSave,
}) => {
  const dispatch = useDispatch();
  const [aboutMe, setAboutMe] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setAboutMe(teacherProfile?.aboutMe || profile?.aboutMe);
  }, [teacherProfile, profile]);

  const validateForm = () => {
    if (aboutMe.length < 50) {
      setError("About me should be at least 50 characters long");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (teacherProfile) {
        await onSave({ ...teacherProfile, aboutMe }).unwrap();
      } else {
        await onSave({ ...profile, aboutMe }).unwrap();
      }
      dispatch(
        addNotification({
          message: "About me updated successfully",
          type: "SUCCESS",
        })
      );
      setEditingSection(null);
    } catch (error) {
      dispatch(
        addNotification({ message: "Failed to update about me", type: "ERROR" })
      );
    }
  };

  return (
    <div className="mt-2">
      <h2 className="text-xl font-semibold">About Me</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          className="w-full mt-1 p-3 border rounded-md bg-gray-50 resize-none"
          placeholder="Tell us about yourself"
          value={aboutMe}
          onChange={(e) => setAboutMe(e.target.value)}
          rows={4}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setEditingSection(null)}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AboutMeForm;
