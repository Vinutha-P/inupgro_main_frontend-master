// BasicInfoForm.tsx
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNotification } from "@/features/notification/notificationSlice";

interface BasicInfoFormProps {
  setEditingSection: any;
  profile?: any;
  teacherProfile: any;
  onSave: (data: any) => Promise<any>;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
  setEditingSection,
  profile,
  teacherProfile,
  onSave,
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<any>({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    studentMobile: "",
    studentEmail: "",
    studentCountryCode: "",
    email: "",
    countryCode: "",
    mobile: "",
    address: "",
    houseName: "",
    landmark: "",
    state: "",
    pinCode: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (teacherProfile) {
      setFormData({
        firstName: teacherProfile.firstName || profile.name.split(" ")[0],
        lastName: teacherProfile.lastName || profile.name.split(" ")[1] || "",
        dob: teacherProfile.dob || profile.dob,
        gender: teacherProfile.gender || profile.gender,
        email: teacherProfile.email || profile.email,
        countryCode:
          teacherProfile.countryCode ||
          profile.phone.split(" ")[0]?.replace("+", "") ||
          "",
        mobile: teacherProfile.mobile || profile.phone.split(" ")[1] || "",
        address: teacherProfile.address || profile.address,
        studentMobile: "",
        studentEmail: "",
        studentCountryCode: "",
        houseName: "",
        landmark: "",
        state: "",
        pinCode: "",
      });
    } else {
      setFormData({
        firstName: profile.firstName,
        lastName: profile.lastName,
        dob: profile.dob.split("T")[0], // Format date
        gender: profile.gender,
        studentMobile: profile.studentMobile,
        studentEmail: profile.studentEmail,
        studentCountryCode: profile.studentCountryCode,
        address: profile.address,
        houseName: profile.houseName,
        landmark: profile.landmark,
        state: profile.state,
        pinCode: profile.pinCode,
      });
    }
  }, [teacherProfile, profile]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";

    if (!teacherProfile) {
      // Student fields
      if (!formData.studentEmail) newErrors.studentEmail = "Email is required";
      if (!formData.studentCountryCode) newErrors.studentCountryCode = "Country code is required";
      if (!formData.studentMobile) newErrors.studentMobile = "Mobile number is required";
    } else {
      // Teacher fields
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.countryCode) newErrors.countryCode = "Country code is required";
      if (!formData.mobile) newErrors.mobile = "Mobile number is required";
    }

    if (!formData.address) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (teacherProfile) {
        await onSave({ ...teacherProfile, ...formData });
      } else {
        await onSave({ ...profile, ...formData });
      }
      dispatch(
        addNotification({
          message: "Basic info updated successfully",
          type: "SUCCESS",
        })
      );
      setEditingSection(null);
    } catch (error) {
      dispatch(
        addNotification({
          message: "Failed to update basic info",
          type: "ERROR",
        })
      );
    }
  };

  return (
    <div className="mt-2">
      <h2 className="text-xl font-semibold">Basic Info</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              className="w-full border rounded-full px-4 py-2 focus:outline-none"
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className="w-full border rounded-full px-4 py-2 focus:outline-none"
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium">
              DOB <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={(e) =>
                setFormData({ ...formData, dob: e.target.value })
              }
              className="w-full border rounded-full px-4 py-2 focus:outline-none"
            />
            {errors.dob && (
              <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              className="w-full border rounded-full px-4 py-2 focus:outline-none"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type={`${!teacherProfile ? "studentEmail" : "email"}`}
              name={`${!teacherProfile ? "studentEmail" : "email"}`}
              value={`${!teacherProfile ? formData.studentEmail : formData.email}`}
              onChange={(e) =>
                setFormData(
                  !teacherProfile
                    ? { ...formData, studentEmail: e.target.value }
                    : { ...formData, email: e.target.value }
                )
              }
              className="w-full border rounded-full px-4 py-2 focus:outline-none"
            />
            {(!teacherProfile ? errors.studentEmail : errors.email) && (
              <p className="text-red-500 text-xs mt-1">
              {!teacherProfile ? errors.studentEmail : errors.email}
              </p>
            )}
          </div>
            <div>
            <label className="text-sm font-medium">
              Mobile <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
              type="text"
              name={`${!teacherProfile ? "studentCountryCode" : "countryCode"}`}
              value={
                !teacherProfile
                ? formData.studentCountryCode
                : formData.countryCode
              }
              onChange={(e) =>
                setFormData(
                !teacherProfile
                  ? { ...formData, studentCountryCode: e.target.value }
                  : { ...formData, countryCode: e.target.value }
                )
              }
              className="w-20 border rounded-full px-4 py-2 focus:outline-none"
              placeholder="+91"
              />
              <input
              type="text"
              name={`${!teacherProfile ? "studentMobile" : "mobile"}`}
              value={
                !teacherProfile
                ? formData.studentMobile
                : formData.mobile
              }
              onChange={(e) =>
                setFormData(
                !teacherProfile
                  ? { ...formData, studentMobile: e.target.value }
                  : { ...formData, mobile: e.target.value }
                )
              }
              className="w-full border rounded-full px-4 py-2 focus:outline-none"
              />
            </div>
            {(
              !teacherProfile
              ? errors.studentCountryCode || errors.studentMobile
              : errors.countryCode || errors.mobile
            ) && (
              <p className="text-red-500 text-xs mt-1">
              {
                !teacherProfile
                ? errors.studentCountryCode || errors.studentMobile
                : errors.countryCode || errors.mobile
              }
              </p>
            )}
            </div>
          <div className="col-span-2">
            <label className="text-sm font-medium">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full border rounded-md px-4 py-2 focus:outline-none"
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address}</p>
            )}
          </div>
        </div>
        <div className="flex gap-4">
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

export default BasicInfoForm;
