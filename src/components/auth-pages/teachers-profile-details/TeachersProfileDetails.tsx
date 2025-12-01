// TeacherProfileDetails.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Toast from "@/components/organism/Toast";
import { MdOutlineEdit } from "react-icons/md";
import { FaPlusCircle, FaCalendarAlt } from "react-icons/fa";
import BasicInfoForm from "./BasicInfoForm";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperiencesForm";
import SkillsForm from "./Skills";
import ParentForm from "./ParentForm";
import SchoolForm from "../student-profile-details/SchoolForm";
import {
  useGetStudentProfileQuery,
  useRemoveStudentSchoolMutation,
  useRemoveStudentMarksheetMutation,
  useEditStudentProfileMutation,
} from "@/features/api/studentsApiSlice";
import {
  useGetTeacherProfileQuery,
  useUpdateTeacherProfileMutation,
  useRemoveEducationMutation,
  useRemoveExperienceMutation,
} from "@/features/api/teacherApiSlice";
import { formatYear } from "../../../utils/helper";
import { addNotification } from "@/features/notification/notificationSlice";
import AboutMeForm from "./AboutMe";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";

// --- Types ---
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

interface SchoolItem {
  schools: string;
  degree: string;
  years: string;
  logo: string;
}

interface Skill {
  hobby: string;
  description: string;
}

interface ProfileData {
  name: string;
  dob: string;
  age: number;
  phone: string;
  email: string;
  gender: string;
  address: string;
  about: string;
  education: EducationItem[];
  experiences: ExperienceItem[];
  school: SchoolItem[];
  skills: Skill[];
  resume: {
    fileName: string;
    size: string;
    lastUpdated: string;
    previewIcon: string;
    url: string;
  };
}

// --- Sample Data (used as fallback) ---
const profile: ProfileData = {
  name: "Smita Agarwal",
  dob: "10 Nov 1994",
  age: 29,
  phone: "+91 9079248369",
  email: "94guptanishu@gmail.com",
  gender: "Female",
  address: "D– 58, 80 feet road, Mahesh Nagar, Jaipur Rajasthan(302015)",
  about: "Tell people about you",
  education: [
    {
      institution: "Global Institute of technology, Jaipur",
      degree: "Master of Engineering, Computer Science",
      years: "2017 - 2019",
      logo: "/rew.png",
      collegeId: "",
      subject: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ],
  school: [
    {
      schools: "Global Institute of technology, Jaipur",
      degree: "Master of Engineering, Computer Science",
      years: "2017 - 2019",
      logo: "/rew.png",
    },
  ],
  experiences: [
    {
      company: "Global Institute of technology, Jaipur",
      role: "Teaching Engineering, Computer Science",
      years: "2023 - 2024",
      logo: "/user.png",
      schoolId: "",
      designation: "",
      expertise: "",
      className: "",
      isCurrentSchool: false,
      startDate: "",
      endDate: "",
      description: "",
    },
    {
      company: "Global Institute of technology, Jaipur",
      role: "Teaching Engineering, Computer Science",
      years: "2022 - 2023",
      logo: "/user.png",
      schoolId: "",
      designation: "",
      expertise: "",
      className: "",
      isCurrentSchool: false,
      startDate: "",
      endDate: "",
      description: "",
    },
  ],
  skills: [],
  resume: {
    fileName: "smitaagarwal.pdf",
    size: "1.5 MB",
    lastUpdated: "23rd July 23",
    previewIcon: "/pdfimg.png",
    url: "",
  },
};

// --- Reusable Section Header ---
const SectionHeader = ({
  title,
  onEdit,
}: {
  title: string;
  onEdit?: () => void;
}) => (
  <div className="flex justify-between items-center">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    {onEdit && (
      <button onClick={onEdit} className="text-[#586AF5] flex items-center text-sm">
        <MdOutlineEdit />
        <span className="ml-1">Edit</span>
      </button>
    )}
  </div>
);

// --- Main Component ---
const TeacherProfileDetails = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [editingSection, setEditingSection] = useState<
    | null
    | "basic"
    | "parent"
    | "about"
    | "education"
    | "experiences"
    | "skills"
    | "school"
    | "resume"
  >(null);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeLoading, setResumeLoading] = useState(false);
  const [adharLoading, setAdharLoading] = useState(false);
  const [adharFile, setAdharFile] = useState<File | null>(null);
  const [adharId, setAdharId] = useState<string | null>(null);
  const [skillsEditData, setSkillsEditData] = useState<any>();
  const [schoolId, setSchoolId] = useState<string | null>(null);
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  // Student profile query
  const {
    data: studentProfile,
    isLoading: isStudentLoading,
    error: studentError,
  } = useGetStudentProfileQuery(undefined, {
    skip: pathname !== "/student/profile",
  });

  // Teacher profile query
  const {
    data: teacherProfile,
    isLoading: isTeacherLoading,
    error: teacherError,
  } = useGetTeacherProfileQuery(undefined, {
    skip: pathname !== "/teacher/profile",
  });

  const [updateTeacherProfile] = useUpdateTeacherProfileMutation();
  const [editProfile, { isLoading, error }] = useEditStudentProfileMutation();

  const [removeEducation] = useRemoveEducationMutation();
  const [removeExperience] = useRemoveExperienceMutation();

  const [removeSchool] = useRemoveStudentSchoolMutation();
  const [removeMarksheet] = useRemoveStudentMarksheetMutation();

  // Transform teacher profile to match ProfileData structure
  const transformTeacherProfile = (data: any): ProfileData => {
    return {
      name: `${data?.firstName || ""} ${data?.lastName || ""}`,
      dob: data?.dob
        ? new Date(data.dob).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        : "-",
      age: data?.dob
        ? Math.floor(
          (Date.now() - new Date(data.dob).getTime()) /
          (1000 * 60 * 60 * 24 * 365)
        )
        : 0,
      phone: `+${data?.countryCode || ""} ${data?.mobile || ""}`,
      email: data?.email || "",
      gender: data?.gender || "",
      address: data?.address || "-",
      about: data?.aboutMe || "Tell people about you",
      education:
        data?.teachereducations?.map((edu: any) => ({
          _id: edu._id,
          institution: edu.collegeId,
          collegeName: edu?.college?.name,
          degree: edu.degree,
          years: `${new Date(edu.startDate).getFullYear()} - ${new Date(
            edu.endDate
          ).getFullYear()}`,
          logo: "/rew.png",
          collegeId: edu.collegeId,
          subject: edu.subject,
          startDate: edu.startDate,
          endDate: edu.endDate,
          description: edu.description,
        })) || [],
      experiences:
        data?.teacherexperiences?.map((exp: any) => ({
          _id: exp._id,
          company: exp.schoolId,
          role: exp.designation,
          years: `${new Date(exp.startDate).getFullYear()} - ${exp.isCurrentSchool
            ? "Present"
            : new Date(exp.endDate).getFullYear()
            }`,
          logo: "/user.png",
          schoolId: exp.schoolId,
          schoolName: exp.school?.name,
          designation: exp.designation,
          expertise: exp.expertise,
          className: exp.className,
          isCurrentSchool: exp.isCurrentSchool,
          startDate: exp.startDate,
          endDate: exp.endDate,
          description: exp.description,
        })) || [],
      school: [],
      skills: data?.skills || [],
      resume: {
        fileName: data?.resume?.split("/").pop() || "smitaagarwal.pdf",
        size: "1.5 MB",
        lastUpdated: data?.updatedAt
          ? new Date(data.updatedAt).toLocaleDateString()
          : "23rd July 23",
        previewIcon: "/pdfimg.png",
        url: data?.resume || "",
      },
    };
  };

  // Determine which profile data to use
  const profileData: ProfileData =
    pathname === "/teacher/profile" && teacherProfile
      ? transformTeacherProfile(teacherProfile)
      : pathname === "/student/profile" && studentProfile
        ? studentProfile
        : profile;

  // Handle loading and error states
  if (pathname === "/student/profile" && isStudentLoading)
    return <div>Loading...</div>;
  if (pathname === "/student/profile" && studentError)
    return (
      <div>
        Error: {(studentError as any)?.message || "Failed to load profile"}
      </div>
    );
  if (pathname === "/teacher/profile" && isTeacherLoading)
    return <div>Loading...</div>;
  if (pathname === "/teacher/profile" && teacherError)
    return (
      <div>
        Error: {(teacherError as any)?.message || "Failed to load profile"}
      </div>
    );

  // S3 Upload Function
  // S3 Upload Function (without useCallback)
  const uploadToS3 = async (file: File, type: string): Promise<string> => {
    try {
      const bucketName = "Inupgro-prod";
      const fileName = encodeURIComponent(file.name);
      const key = `${bucketName}/documents/${type}s/${Date.now()}_${fileName}`;
      const res = await fetch(
        `${baseURL}/v1/s3?bucketName=${bucketName}&key=${key}`
      );

      if (!res.ok) throw new Error("Failed to get pre-signed URL");
      const presignedUrl = await res.text();

      if (!presignedUrl.startsWith("https://"))
        throw new Error("Invalid pre-signed URL");
      const uploadRes = await fetch(presignedUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!uploadRes.ok) throw new Error("Failed to upload file to S3");
      return presignedUrl.split("?")[0];
    } catch (error: any) {
      dispatch(
        addNotification({
          message: `Failed to upload ${type}: ${error.message || "Unknown error"
            }`,
          type: "ERROR",
        })
      );
      throw error;
    }
  };

  // Handle Resume Save
  const handleSaveResume = async () => {
    setResumeLoading(true);
    if (!resumeFile) {
      setEditingSection(null);
      setResumeFile(null);
      return;
    }
    try {
      const url = await uploadToS3(resumeFile, "resume");
      const updatedProfile = {
        ...teacherProfile,
        resume: url,
      };
      await updateTeacherProfile(updatedProfile as any).unwrap();
      setEditingSection(null);
      setResumeFile(null);
      setResumeLoading(false);
      dispatch(
        addNotification({
          message: "Resume updated successfully",
          type: "SUCCESS",
        })
      );
    } catch (error) {
      setResumeLoading(false);
      dispatch(
        addNotification({ message: "Failed to update resume", type: "ERROR" })
      );
    }
  };

  const handleSaveAdharCard = async () => {
    setAdharLoading(true);
    if (!adharFile) {
      setEditingSection(null);
      setAdharFile(null);
      return;
    }
    try {
      const url = await uploadToS3(adharFile, "adhar");
      const updatedProfile = {
        ...studentProfile,
        aadharCard: url,
      };
      await editProfile(updatedProfile).unwrap();
      setEditingSection(null);
      setAdharFile(null);
      setAdharLoading(false);
      dispatch(
        addNotification({
          message: "Adhar Card updated successfully",
          type: "SUCCESS",
        })
      );
    } catch (error) {
      setAdharLoading(false);
      dispatch(
        addNotification({
          message: "Failed to update Adhar Card",
          type: "ERROR",
        })
      );
    }
  };

  const handleRemoveSchool = async (id: any) => {
    try {
      await removeSchool(id).unwrap();
      dispatch(
        addNotification({
          message: "School removed successfully",
          type: "SUCCESS",
        })
      );
    } catch (err) {
      dispatch(
        addNotification({ message: "Failed to remove school", type: "ERROR" })
      );
    }
  };

  const handleRemoveMarksheet = async (id: any) => {
    try {
      await removeMarksheet(id).unwrap();
      dispatch(
        addNotification({
          message: "Marksheet removed successfully",
          type: "SUCCESS",
        })
      );
    } catch (err) {
      dispatch(
        addNotification({
          message: "Failed to remove marksheet",
          type: "ERROR",
        })
      );
    }
  };

  const handleRemoveEducation = async (id: string) => {
    try {
      await removeEducation(id).unwrap();
      dispatch(
        addNotification({
          message: "Education removed successfully",
          type: "SUCCESS",
        })
      );
    } catch (error) {
      dispatch(
        addNotification({
          message: "Failed to remove education",
          type: "ERROR",
        })
      );
    }
  };

  const handleRemoveExperience = async (id: string) => {
    try {
      await removeExperience(id).unwrap();
      dispatch(
        addNotification({
          message: "Experience removed successfully",
          type: "SUCCESS",
        })
      );
    } catch (error) {
      dispatch(
        addNotification({
          message: "Failed to remove experience",
          type: "ERROR",
        })
      );
    }
  };
  
  return (
    <>
      <div className="bg-white p-10 rounded shadow space-y-6">
        <Toast />

        {/* Basic Info */}
        <div>
          {editingSection === "basic" ? (
            <BasicInfoForm
              setEditingSection={setEditingSection}
              profile={
                pathname === "/student/profile" ? studentProfile : profileData
              }
              teacherProfile={teacherProfile}
              onSave={
                pathname === "/student/profile"
                  ? editProfile
                  : updateTeacherProfile
              }
            />
          ) : (
            <>
              <SectionHeader
                title="Basic Info"
                onEdit={() => setEditingSection("basic")}
              />
              <div className="grid grid-cols-3 gap-4 text-sm mt-2">
                {pathname === "/student/profile" && studentProfile ? (
                  <>
                    <Info
                      label="Name"
                      value={
                        `${studentProfile.firstName} ${studentProfile.lastName}` ||
                        "-"
                      }
                    />
                    <Info
                      label="DOB"
                      value={
                        studentProfile.dob
                          ? new Date(studentProfile.dob).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                          : "-"
                      }
                    />
                    <Info
                      label="Age"
                      value={String(
                        Math.floor(
                          (Date.now() -
                            new Date(studentProfile.dob).getTime()) /
                          (1000 * 60 * 60 * 24 * 365)
                        ) || "-"
                      )}
                    />
                    <Info
                      label="Mobile number"
                      value={
                        `+${studentProfile.studentCountryCode} ${studentProfile.studentMobile}` ||
                        "-"
                      }
                    />
                    <Info
                      label="Email ID"
                      value={studentProfile.studentEmail || "-"}
                    />
                    <Info label="Gender" value={studentProfile.gender || "-"} />
                    <div className="col-span-2">
                      <span className="text-xs text-[#999999]">Address:</span>
                      <br />
                      <strong className="text-md text-[#444444] font-semibold">
                        {studentProfile.address || "-"}
                      </strong>
                    </div>
                  </>
                ) : (
                  <>
                    <Info label="Name" value={profileData.name} />
                    <Info label="DOB" value={profileData.dob} />
                    <Info label="Age" value={profileData.age.toString()} />
                    <Info label="Mobile number" value={profileData.phone} />
                    <Info label="Email ID" value={profileData.email} />
                    <Info label="Gender" value={profileData.gender} />
                    <div className="col-span-2">
                      <span className="text-xs text-[#999999]">Address:</span>
                      <br />
                      <strong className="text-md text-[#444444] font-semibold">
                        {profileData.address}
                      </strong>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>

        <hr />

        {/* Student's Parent Info */}
        <div>
          {pathname === "/student/profile" &&
            (editingSection === "parent" ? (
              <ParentForm
                setEditingSection={setEditingSection}
                profile={studentProfile}
              />
            ) : (
              <>
                <SectionHeader
                  title="Parent's info"
                  onEdit={() => setEditingSection("parent")}
                />
                <div className="grid grid-cols-3 gap-4 text-sm mt-2">
                  <Info
                    label="Father Name"
                    value={
                      `${studentProfile?.parentFirstName} ${studentProfile?.parentLastName}` ||
                      "-"
                    }
                  />
                  <Info
                    label="Mother Name"
                    value={studentProfile?.motherName || "-"}
                  />
                  <Info
                    label="Father Email ID"
                    value={studentProfile?.parentEmail || "-"}
                  />
                  <Info
                    label="Father's Mobile number"
                    value={
                      studentProfile?.parentMobile
                        ? `+${studentProfile.parentCountryCode} ${studentProfile.parentMobile}`
                        : "-"
                    }
                  />
                  <Info
                    label="Guardian's Name"
                    value={studentProfile?.guardianName || "-"}
                  />
                  <Info
                    label="Guardian's Mobile number"
                    value={
                      studentProfile?.guardianMobile
                        ? `+${studentProfile.guardianCountryCode} ${studentProfile.guardianMobile}`
                        : "-"
                    }
                  />
                </div>
              </>
            ))}
        </div>

        {/* About */}
        <div>
          {editingSection === "about" ? (
            <AboutMeForm
              setEditingSection={setEditingSection}
              profile={
                pathname === "/student/profile" ? studentProfile : profileData
              }
              teacherProfile={teacherProfile}
              onSave={
                pathname === "/student/profile"
                  ? editProfile
                  : updateTeacherProfile
              }
            />
          ) : (
            <>
              {/* <SectionHeader
                title="About me"
                onEdit={() => setEditingSection("about")}
              /> */}
              <div className="bg-cloudGray rounded-lg shadow p-3 mt-2">
                <p className="text-sm text-gray-500">
                  {pathname === "/student/profile"
                    ? studentProfile?.aboutMe || "Tell people about you"
                    : profileData.about}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Education (Teacher Profile) */}
        <div>
          {pathname === "/teacher/profile" &&
            (editingSection === "education" ? (
              <EducationForm
                setEditingSection={setEditingSection}
                education={
                  editingItemId
                    ? profileData.education.find((e) => e._id === editingItemId)
                    : undefined
                }
                onSave={updateTeacherProfile}
                teacherProfile={teacherProfile}
                editingItemId={editingItemId}
              />
            ) : (
              <>
                <SectionHeader title="Education" />
                {profileData.education.length > 0 ? (
                  profileData.education.map((edu: any, idx) => (
                    <div
                      key={edu._id || idx}
                      className="flex justify-between items-start mt-3"
                    >
                      <div className="flex items-center gap-4">
                        <Image
                          src={edu.logo}
                          width={40}
                          height={40}
                          alt="edu-logo"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-medium text-sm">{edu.collegeName}</h5>
                            <GoDotFill className="text-gray-400 text-xs" size={10} />
                            <span className="text-xs text-gray-500">{edu.years}</span>
                          </div>
                          <p className="text-xs text-gray-600">{edu.degree}</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <button
                          onClick={() => {
                            setEditingSection("education");
                            setEditingItemId(edu._id);
                          }}
                          className="text-[#586AF5] flex items-center text-sm"
                        >
                          <MdOutlineEdit />
                          <span className="ml-1">Edit</span>
                        </button>
                        {edu._id && (
                          <button
                            onClick={() => handleRemoveEducation(edu._id)}
                            className="text-red-500 flex items-center text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 mt-2">
                    No education added yet.
                  </p>
                )}
                <AddButton
                  label="Add Education"
                  onEdit={() => {
                    setEditingSection("education");
                    setEditingItemId(null);
                  }}
                />
              </>
            ))}
        </div>

        {/* Experiences (Teacher Profile) */}
        <div>
          {pathname === "/teacher/profile" &&
            (editingSection === "experiences" ? (
              <ExperienceForm
                setEditingSection={setEditingSection}
                experience={
                  editingItemId
                    ? profileData.experiences.find(
                      (e) => e._id === editingItemId
                    )
                    : undefined
                }
                onSave={updateTeacherProfile}
                teacherProfile={teacherProfile}
                editingItemId={editingItemId}
              />
            ) : (
              <>
                <SectionHeader title="Experiences" />
                <div className="space-y-2">
                  {profileData.experiences.length > 0 ? (
                    profileData.experiences.map((exp: any, idx) => (
                      <div
                        key={exp._id || idx}
                        className="flex justify-between items-start"
                      >
                        <div className="flex items-center gap-4">
                          <Image
                            src={exp.logo}
                            width={40}
                            height={40}
                            alt="exp-logo"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="font-medium text-sm">{exp?.schoolName}</h5>
                              <GoDotFill className="text-gray-400 text-xs" size={10} />
                              <span className="text-xs text-gray-500">{exp.years}</span>
                            </div>
                            <p className="text-sm text-gray-600">{exp.role}</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <button
                            onClick={() => {
                              setEditingSection("experiences");
                              setEditingItemId(exp._id);
                            }}
                            className="text-[#586AF5] flex items-center text-sm"
                          >
                            <MdOutlineEdit />
                            <span className="ml-1">Edit</span>
                          </button>
                          {exp._id && (
                            <button
                              onClick={() => handleRemoveExperience(exp._id)}
                              className="text-red-500 flex items-center text-sm"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 mt-2">
                      No experiences added yet.
                    </p>
                  )}
                </div>
                <AddButton
                  label="Add Experiences"
                  onEdit={() => {
                    setEditingSection("experiences");
                    setEditingItemId(null);
                  }}
                />
              </>
            ))}
        </div>

        {/* Skills (Teacher Profile) */}
        <div>
          {pathname === "/teacher/profile" &&
            (editingSection === "skills" ? (
              <SkillsForm
                setEditingSection={setEditingSection}
                skills={profileData.skills}
                teacherProfile={teacherProfile}
                onSave={updateTeacherProfile}
                skillsEditData={skillsEditData}
              />
            ) : (
              <>
                <SectionHeader title="Skills" />
                <div className="space-y-2">
                  {profileData.skills.length > 0 ? (
                    profileData.skills.map((skill, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-start"
                      >
                        <div>
                          <h5 className="font-medium text-sm">{skill.hobby}</h5>
                          <p className="text-xs text-gray-600">
                            {skill.description}
                          </p>
                        </div>
                        <div className="flex gap-4">
                          <button
                            onClick={() => { setSkillsEditData(skill); setEditingSection("skills") }}
                            className="text-[#586AF5] flex items-center text-sm"
                          >
                            <MdOutlineEdit />
                            <span className="ml-1">Edit</span>
                          </button>
                          <button
                            onClick={async () => {
                              if (
                                !window.confirm(
                                  "Are you sure you want to remove this skill?"
                                )
                              )
                                return;
                              const updatedSkills = profileData.skills.filter(
                                (_, i) => i !== idx
                              );
                              try {
                                await updateTeacherProfile({
                                  ...teacherProfile,
                                  skills: updatedSkills,
                                }).unwrap();
                                dispatch(
                                  addNotification({
                                    message: "Skill removed successfully",
                                    type: "SUCCESS",
                                  })
                                );
                              } catch (error) {
                                dispatch(
                                  addNotification({
                                    message: "Failed to remove skill",
                                    type: "ERROR",
                                  })
                                );
                              }
                            }}
                            className="text-red-500 flex items-center text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 mt-2">
                      No skills added yet.
                    </p>
                  )}
                </div>
                <AddButton
                  label="Add Skills"
                  onEdit={() => { setSkillsEditData(""); setEditingSection("skills") }}
                />
              </>
            ))}
        </div>

        {/* School (Student Profile) */}
        <div>
          {pathname === "/student/profile" &&
            (editingSection === "school" ? (
              schoolId ? (
                <SchoolForm
                  schoolId={schoolId}
                  schoolData={studentProfile?.studentschools?.find(
                    (s: any) => s?._id === schoolId
                  )}
                  setEditingSection={setEditingSection}
                />
              ) : (
                <SchoolForm setEditingSection={setEditingSection} />
              )
            ) : (
              <>
                <SectionHeader title="School" />
                <div className="space-y-2">
                  {studentProfile?.studentschools?.map((school: any) => (
                    <div
                      key={school._id}
                      className="flex justify-between items-start"
                    >
                      <div className="flex items-center gap-4">
                        <Image
                          src="/rew.png"
                          width={40}
                          height={40}
                          alt="school-logo"
                        />
                        <div>
                          <div className="flex items-center gap-8">
                            <h5 className="font-medium">
                              {school?.school?.name}
                            </h5>
                            <span className="text-sm text-gray-500">{`${formatYear(
                              school.startDate
                            )} - ${formatYear(school.endDate)}`}</span>
                          </div>
                          <p className="text-sm text-gray-600">{`${school.fromClass} to ${school.toClass}`}</p>
                          <div>
                            {school?.marksheets?.map(
                              (marksheet: any, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2"
                                >
                                  <span>Class {marksheet?.className}</span>
                                  <a
                                    href={marksheet?.image}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500"
                                  >
                                    View
                                  </a>
                                  <button
                                    onClick={() =>
                                      handleRemoveMarksheet(marksheet._id)
                                    }
                                    className="text-red-500 text-sm"
                                  >
                                    Remove
                                  </button>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <button
                          onClick={() => {
                            setSchoolId(school._id);
                            setEditingSection("school");
                          }}
                          className="text-[#586AF5] flex items-center"
                        >
                          <MdOutlineEdit />
                          <span className="ml-1">Edit</span>
                        </button>
                        <button
                          onClick={() => handleRemoveSchool(school._id)}
                          className="text-red-500 flex items-center"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <AddButton
                  label="Add School"
                  onEdit={() => {
                    setEditingSection("school");
                    setSchoolId("");
                  }}
                />
              </>
            ))}
        </div>

        {/* Resume (Teacher Profile) */}
        <div>
          {pathname === "/teacher/profile" &&
            (editingSection === "resume" ? (
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                  className="mb-4"
                />
                <div className="flex gap-4">
                  <button
                    disabled={resumeLoading}
                    onClick={handleSaveResume}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    {resumeLoading ? "Resume Uploading..." : "Save"}
                  </button>
                  <button
                    onClick={() => {
                      setEditingSection(null);
                      setResumeFile(null);
                    }}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Resume
                </h2>
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm px-4 pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-red-100 p-2 rounded">
                        <Image
                          src={profileData.resume.previewIcon}
                          alt="PDF icon"
                          width={24}
                          height={24}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-darkBlue font-semibold text-sm">
                          {profileData.resume.fileName}
                        </p>
                        <p className="text-sm text-gray-400">
                          {profileData.resume.size}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setEditingSection("resume")}
                      className="text-[#586AF5] flex items-center text-sm"
                    >
                      <MdOutlineEdit />
                      <span className="ml-1">Edit</span>
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Last update on {profileData.resume.lastUpdated}
                  </p>
                  <div className="bg-gray-100 mt-4 h-32 flex items-center justify-center rounded text-gray-400">
                    {/* <p className="text-sm">Image preview</p> */}
                    <iframe
                      src={profileData?.resume?.url}
                      width="100%"
                      height="100%"
                    ></iframe>

                    {/* <iframe src={"https://inupgro.s3.ap-south-1.amazonaws.com/documents/resumes/1747410257074_Surender%20deora%20%28Resume%29.pdf"} width="100%" height="100%"></iframe> */}
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Transfer Certificate (Student Profile) */}
        <div>
          {pathname === "/student/profile" && (
            <div>
              <h3 className="text-md font-semibold text-gray-700 mb-2">
                Documents Info
              </h3>
              <p className="text-xs font-medium text-gray-700 mb-2">
                Upload Aadhar Card <span className="text-red-500">*</span>
              </p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                <input
                  type="file"
                  id="aadharCard"
                  name="aadharCard"
                  className="hidden"
                  accept="image/png, image/jpeg"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setAdharLoading(true);
                    setAdharFile(file);
                    try {
                      const url = await uploadToS3(file, "adhar");
                      const updatedProfile = {
                        ...studentProfile,
                        aadharCard: url,
                      };
                      await editProfile(updatedProfile).unwrap();
                      setAdharLoading(false);
                      setAdharFile(null);
                      dispatch(
                        addNotification({
                          message: "Aadhar Card updated successfully",
                          type: "SUCCESS",
                        })
                      );
                    } catch (error) {
                      setAdharLoading(false);
                      setAdharFile(null);
                      dispatch(
                        addNotification({
                          message: "Failed to update Aadhar Card",
                          type: "ERROR",
                        })
                      );
                    }
                  }}
                  disabled={adharLoading}
                />
                <label
                  htmlFor="aadharCard"
                  className={`flex flex-col items-center cursor-pointer ${adharLoading ? "opacity-50 pointer-events-none" : ""
                    }`}
                >
                  {studentProfile?.aadharCard ? (
                    <Link
                      href={studentProfile.aadharCard}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-red-100 p-2 rounded group"
                    >
                      <Image
                        src={"/pdfimg.png"}
                        alt="PDF icon"
                        width={24}
                        height={24}
                        className="group-hover:scale-110 transition-transform duration-200 ease-in-out"
                      />
                    </Link>
                  ) : (
                    <Image
                      src={"https://placehold.co/50x50"}
                      alt="Upload Icon"
                      width={50}
                      height={50}
                      className="mb-2 object-cover rounded"
                    />
                  )}

                  <p className="text-xs text-gray-500">
                    <span className="text-blue-500 underline">
                      {adharLoading ? "Uploading..." : "Click to upload"}
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">
                    PNG or JPG (max. 350x350px)
                  </p>
                </label>
                {studentProfile?.aadharCard && (
                  <a
                    href={studentProfile.aadharCard}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 text-blue-600 underline text-xs"
                  >
                    View Aadhar Card
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// --- Helper Components ---
const Info = ({ label, value }: { label: string; value: string }) => (
  <div>
    <span className="text-xs text-[#999999]">{label}:</span>
    <br />
    <strong className="text-md text-[#444444] font-semibold">
      {value}
    </strong>
  </div>
);

const AddButton = ({
  label,
  onEdit,
}: {
  label: string;
  onEdit?: () => void;
}) => {
  return onEdit ? (
    <button
      onClick={onEdit}
      className="text-[#0070F0E5] flex items-center font-semibold mt-5 text-sm"
    >
      <FaPlusCircle />
      <span className="ml-1.5">{label}</span>
    </button>
  ) : null;
};

export default TeacherProfileDetails;
