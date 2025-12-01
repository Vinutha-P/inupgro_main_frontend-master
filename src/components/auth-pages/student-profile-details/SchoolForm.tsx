"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  useEditStudentProfileMutation,
  useEditStudentSchoolMutation,
  useAddStudentMarksheetMutation,
  useRemoveStudentMarksheetMutation,
} from "@/features/api/studentsApiSlice";
import { useGetAllSchoolsQuery } from "@/features/api/schoolApiSlice";
import {
  EditSchoolRequest,
  AddMarksheetRequest,
  EditProfileRequest,
} from "@/types/student.type";
import { addNotification } from "@/features/notification/notificationSlice";
import Image from "next/image";
import { RiDeleteBin5Line } from "react-icons/ri";

interface FormData {
  schoolId: string; // School _id
  board: string;
  medium: string;
  fromClass: string;
  toClass: string;
  startDate: string;
  endDate: string;
  transferCertificate: { file: File | null; url: string | null };
  migrationCertificate: { file: File | null; url: string | null };
}

interface Marksheet {
  _id?: string; // For existing marksheets
  className: string;
  file: File | null;
  url: string | null;
  required: boolean;
}

interface School {
  _id: string;
  name: string;
}

interface SchoolFormProps {
  schoolId?: string;
  schoolData?: {
    schoolId: string;
    board: string;
    medium: string;
    fromClass: string;
    toClass: string;
    startDate: string;
    endDate: string;
    transferCertificate?: string;
    migrationCertificate?: string;
    marksheet: Marksheet[];
  };
  setEditingSection?: (section: string) => void;
}

const SchoolForm = ({
  schoolId,
  schoolData,
  setEditingSection,
}: {
  schoolId?: any;
  schoolData?: any;
  setEditingSection?: any;
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<FormData>({
    schoolId: schoolData?.schoolId || "",
    board: schoolData?.board || "",
    medium: schoolData?.medium || "",
    fromClass: schoolData?.fromClass || "",
    toClass: schoolData?.toClass || "",
    startDate: schoolData?.startDate || "",
    endDate: schoolData?.endDate || "",
    transferCertificate: {
      file: null,
      url: schoolData?.transferCertificate || null,
    },
    migrationCertificate: {
      file: null,
      url: schoolData?.migrationCertificate || null,
    },
  });

  const [marksheets, setMarksheets] = useState<Marksheet[]>(
    schoolData?.marksheets || [
      { className: "10", file: null, url: null, required: false },
      { className: "9", file: null, url: null, required: false },
      { className: "8", file: null, url: null, required: false },
    ]
  );

  // State for the modal and marksheet upload
  const [isMarksheetModalOpen, setIsMarksheetModalOpen] = useState(false);
  const [newSchoolId, setNewSchoolId] = useState<string | null>(null);
  const [modalMarksheets, setModalMarksheets] = useState<Marksheet[]>([
    { className: "10", file: null, url: null, required: true },
    { className: "9", file: null, url: null, required: true },
  ]);
  const [isModalSubmitting, setIsModalSubmitting] = useState(false);
  const [modalUploadingFiles, setModalUploadingFiles] = useState<Set<string>>(new Set());

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  
  const [editProfile, { isLoading: isEditingProfile }] =
    useEditStudentProfileMutation();
  const [editSchool, { isLoading: isEditingSchool }] =
    useEditStudentSchoolMutation();
  const [addMarksheet] = useAddStudentMarksheetMutation();
  const [removeMarksheet] = useRemoveStudentMarksheetMutation();
  const {
    data: schoolsData,
    isLoading: isSchoolsLoading,
    error: schoolsError,
  } = useGetAllSchoolsQuery({});

  // Pre-fill form data and marksheets when editing
  useEffect(() => {
    if (schoolData) {
      setFormData({
        schoolId: schoolData.schoolId || "",
        board: schoolData.board || "",
        medium: schoolData.medium || "",
        fromClass: schoolData.fromClass || "",
        toClass: schoolData.toClass || "",
        startDate: schoolData.startDate || "",
        endDate: schoolData.endDate || "",
        transferCertificate: {
          file: null,
          url: schoolData.transferCertificate || null,
        },
        migrationCertificate: {
          file: null,
          url: schoolData.migrationCertificate || null,
        },
      });

      // Initialize marksheets with mandatory 10th and 9th
      const existingMarksheets = schoolData.marksheet || [];
      const mandatoryClasses = ["10", "9"];

      const mergedMarksheets = mandatoryClasses.map((className) => {
        const existing = existingMarksheets.find(
          (m: any) => m.className === className
        );
        return existing
          ? { ...existing, file: null, required: true }
          : { className, file: null, url: null, required: true };
      });

      // Add other classes
      existingMarksheets.forEach((m: any) => {
        if (!mandatoryClasses.includes(m.className)) {
          mergedMarksheets.push({ ...m, file: null, required: false });
        }
      });
      setMarksheets(mergedMarksheets);
      // setMarksheets(
      //   schoolData.marksheet?.map((m: any) => ({ ...m, file: null })) || []
      // );
    } else {
      // Default marksheets for new school
      setMarksheets([
        { className: "10", file: null, url: null, required: true },
        { className: "9", file: null, url: null, required: true },
      ]);
    }
  }, [schoolData]);

  // Upload file to S3
  const uploadToS3 = useCallback(
    async (file: File, type: "marksheet" | "certificate"): Promise<string> => {
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
    },
    [dispatch]
  );

  // Handle file change for certificates
  const handleFileChange = useCallback(
    async (name: keyof FormData, file: File | null) => {
      if (!file) return;
      setUploadingFiles((prev) => new Set(prev).add(name));
      try {
        const url = await uploadToS3(file, "certificate");
        setFormData((prev: any) => ({ ...prev, [name]: { file, url } }));
        dispatch(
          addNotification({
            message: `${name === "transferCertificate" ? "Transfer" : "Migration"
              } Certificate uploaded`,
            type: "SUCCESS",
          })
        );
      } catch {
        setFormData((prev: any) => ({
          ...prev,
          [name]: { file: null, url: prev[name].url },
        }));
      } finally {
        setUploadingFiles((prev) => {
          const newSet = new Set(prev);
          newSet.delete(name);
          return newSet;
        });
      }
    },
    [uploadToS3, dispatch]
  );

  // Handle marksheet file change
  const handleMarksheetChange = useCallback(
    async (index: number, file: File | null, isModal: boolean = false) => {
      if (!file) return;
      const setFiles = isModal ? setModalUploadingFiles : setUploadingFiles;
      const setMarksheetsList = isModal ? setModalMarksheets : setMarksheets;
      const marksheetsList = isModal ? modalMarksheets : marksheets;

      setFiles((prev) => new Set(prev).add(`marksheet-${index}`));
      try {
        const url = await uploadToS3(file, "marksheet");
        setMarksheetsList((prev) =>
          prev?.map((m, i) => (i === index ? { ...m, file, url } : m))
        );
        dispatch(
          addNotification({
            message: `Marksheet for Class ${marksheetsList[index]?.className} uploaded`,
            type: "SUCCESS",
          })
        );
      } catch {
        setMarksheetsList((prev) =>
          prev?.map((m, i) =>
            i === index ? { ...m, file: null, url: m.url } : m
          )
        );
      } finally {
        setFiles((prev) => {
          const newSet = new Set(prev);
          newSet.delete(`marksheet-${index}`);
          return newSet;
        });
      }
    },
    [uploadToS3, marksheets, modalMarksheets, dispatch]
  );

  // Remove marksheet
  // const handleRemoveMarksheet = useCallback(
  //   async (marksheetId: any) => {
  //     try {
  //       await removeMarksheet(marksheetId).unwrap();
  //       setMarksheets((prev) => prev.filter((m) => m._id !== marksheetId));
  //       dispatch(
  //         addNotification({
  //           message: "Marksheet removed successfully",
  //           type: "SUCCESS",
  //         })
  //       );
  //     } catch (error: any) {
  //       dispatch(
  //         addNotification({
  //           message: `Failed to remove marksheet: ${
  //             error.message || "Unknown error"
  //           }`,
  //           type: "ERROR",
  //         })
  //       );
  //     }
  //   },
  //   [removeMarksheet, dispatch]
  // );

  const handleRemoveMarksheet = useCallback(
    async (index: number) => {
      const mark = marksheets[index];
      try {
        if (mark._id) {
          await removeMarksheet({ id: mark._id }).unwrap();
        }

        if (mark.required) {
          // Reset required marksheets
          setMarksheets((prev) =>
            prev.map((m, i) =>
              i === index ? { ...m, url: null, _id: undefined } : m
            )
          );
        } else {
          // Remove non-required marksheets
          setMarksheets((prev) => prev.filter((_, i) => i !== index));
        }

        dispatch(
          addNotification({
            message: "Marksheet removed successfully",
            type: "SUCCESS",
          })
        );
      } catch (error: any) {
        dispatch(
          addNotification({
            message: `Failed to remove marksheet: ${error.message || "Unknown error"
              }`,
            type: "ERROR",
          })
        );
      }
    },
    [marksheets, removeMarksheet, dispatch]
  );

  // Add additional marksheet
  const handleAddMarksheet = useCallback(
    (isModal: boolean = false) => {
      const setMarksheetsList = isModal ? setModalMarksheets : setMarksheets;
      const marksheetsList = isModal ? modalMarksheets : marksheets;

      const lastClass =
        parseInt(marksheetsList[marksheetsList.length - 1]?.className) - 1;
      setMarksheetsList((prev) => [
        ...prev,
        {
          className: lastClass.toString(),
          file: null,
          url: null,
          required: false,
        },
      ]);
      dispatch(
        addNotification({
          message: `Added marksheet slot for Class ${lastClass}`,
          type: "SUCCESS",
        })
      );
    },
    [marksheets, modalMarksheets, dispatch]
  );

  // Validate form
  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.schoolId) newErrors.schoolId = "School is required";
    if (!formData.board) newErrors.board = "Board is required";
    if (!formData.medium) newErrors.medium = "Medium is required";
    if (!formData.fromClass) newErrors.fromClass = "From class is required";
    if (!formData.toClass) newErrors.toClass = "To class is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";

    const requiredMarksheets = marksheets.filter((m) => m.required && !m.url);
    // if (requiredMarksheets.length > 0) {
    //   dispatch(
    //     addNotification({
    //       message: "Please upload required marksheets for Class 10 and 9",
    //       type: "ERROR",
    //     })
    //   );
    //   return false;
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, marksheets, dispatch]);


  const handleModalSubmit = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      if (!newSchoolId) return;

      setIsModalSubmitting(true);
      try {
        for (const marksheet of modalMarksheets) {
          if (marksheet.file && marksheet.url) {
            const marksheetRequest: AddMarksheetRequest = {
              studentSchoolId: newSchoolId,
              className: marksheet.className,
              image: marksheet.url,
            };
            await addMarksheet(marksheetRequest).unwrap();
          }
        }
        dispatch(
          addNotification({
            message: "Marksheets saved successfully",
            type: "SUCCESS",
          })
        );
        setIsMarksheetModalOpen(false);
        setModalMarksheets([
          { className: "10", file: null, url: null, required: true },
          { className: "9", file: null, url: null, required: true },
        ]);
        if (setEditingSection) setEditingSection("");
      } catch (error: any) {
        dispatch(
          addNotification({
            message: `Failed to save marksheets: ${error.message || "Unknown error"}`,
            type: "ERROR",
          })
        );
      } finally {
        setIsModalSubmitting(false);
      }
    },
    [newSchoolId, modalMarksheets, addMarksheet, setEditingSection, dispatch]
  );


  // Handle form submission
  const handleSubmit = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      if (!validateForm()) return;

      setIsSubmitting(true);
      try {
        const schoolPayload = {
          schoolId: formData.schoolId,
          board: formData.board,
          medium: formData.medium,
          fromClass: formData.fromClass,
          toClass: formData.toClass,
          startDate: formData.startDate,
          endDate: formData.endDate,
          transferCertificate: formData.transferCertificate.url || undefined,
          migrationCertificate: formData.migrationCertificate.url || undefined,
        };

        let newSchoolId = schoolId;

        if (schoolId) {
          const schoolRequest: EditSchoolRequest = {
            id: schoolId,
            data: schoolPayload,
          };
          await editSchool(schoolRequest).unwrap();
          dispatch(
            addNotification({
              message: "School updated successfully",
              type: "SUCCESS",
            })
          );
          if (setEditingSection) setEditingSection("");
        } else {
          const profileRequest: EditProfileRequest = {
            schools: [schoolPayload],
          };
          const response = await editProfile(profileRequest).unwrap();

          // Extract the newly added school's ID from the API response
          // newSchoolId = response.results?.schools?.[0]?.id;
          newSchoolId = "fkjlnlnvdsdkknlknnldsn";
          if (newSchoolId) {
            setNewSchoolId(newSchoolId);
            setIsMarksheetModalOpen(true); // Open modal for marksheet upload
          }

          dispatch(
            addNotification({
              message: "School added successfully",
              type: "SUCCESS",
            })
          );
        }

        // Only handle marksheets in the form for edit flow
        if (schoolId) {
          for (const marksheet of marksheets) {
            if (marksheet.file && marksheet.url && newSchoolId) {
              const marksheetRequest: AddMarksheetRequest = {
                studentSchoolId: newSchoolId,
                className: marksheet.className,
                image: marksheet.url,
              };
              await addMarksheet(marksheetRequest).unwrap();
            }
          }
          dispatch(
            addNotification({
              message: "Marksheets saved successfully",
              type: "SUCCESS",
            })
          );
        }
      } catch (error: any) {
        dispatch(
          addNotification({
            message: `Failed to save: ${error.message || "Unknown error"}`,
            type: "ERROR",
          })
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      formData,
      marksheets,
      schoolId,
      editSchool,
      editProfile,
      addMarksheet,
      setEditingSection,
      validateForm,
      dispatch,
    ]
  );

  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    },
    []
  );

  // Memoized options
  const boardOptions = useMemo(() => ["CBSE", "ICSE", "State Board"], []);
  const mediumOptions = useMemo(() => ["English", "Hindi"], []);
  const classOptions = useMemo(() => ["8th", "9th", "10th"], []);

  const schoolOptions = useMemo(() => {
    if (!schoolsData || !Array.isArray(schoolsData.data)) return [];
    return schoolsData.data?.map((school: School) => ({
      value: school._id,
      label: school.name,
    }));
  }, [schoolsData]);

  // Get today's date
  const getTodayDate = useCallback(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(today.getDate()).padStart(2, "0")}`;
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        {schoolId ? "Edit School" : "Add School"}
      </h2>
      <div className="flex justify-end space-x-4 mb-4">
        <button
          onClick={() => setEditingSection && setEditingSection("")}
          className="text-gray-500 hover:underline"
          disabled={
            isSubmitting ||
            uploadingFiles.size > 0 ||
            isEditingProfile ||
            isEditingSchool
          }
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="text-blue-600 font-semibold hover:underline"
          disabled={
            isSubmitting ||
            uploadingFiles.size > 0 ||
            isEditingProfile ||
            isEditingSchool
          }
        >
          {isSubmitting || isEditingProfile || isEditingSchool
            ? "Saving..."
            : "Save"}
        </button>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectField
            label="School Name *"
            id="schoolId"
            name="schoolId"
            value={formData.schoolId}
            onChange={handleInputChange}
            options={schoolOptions}
            error={errors.schoolId}
            isLoading={isSchoolsLoading}
            loadingError={schoolsError}
          />
          <SelectField
            label="School Board *"
            id="board"
            name="board"
            value={formData.board}
            onChange={handleInputChange}
            options={boardOptions}
            error={errors.board}
          />
          <SelectField
            label="Medium *"
            id="medium"
            name="medium"
            value={formData.medium}
            onChange={handleInputChange}
            options={mediumOptions}
            error={errors.medium}
          />
          <SelectField
            label="From Class *"
            id="fromClass"
            name="fromClass"
            value={formData.fromClass}
            onChange={handleInputChange}
            options={classOptions}
            error={errors.fromClass}
          />
          <SelectField
            label="To Class *"
            id="toClass"
            name="toClass"
            value={formData.toClass}
            onChange={handleInputChange}
            options={classOptions}
            error={errors.toClass}
          />
          <InputField
            label="Start Date *"
            id="startDate"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleInputChange}
            error={errors.startDate}
            max={getTodayDate()}
          />
          <InputField
            label="End Date *"
            id="endDate"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleInputChange}
            error={errors.endDate}
            max={getTodayDate()}
          />
        </div>

        <div>
          <h3 className="text-md font-semibold text-gray-700 mb-2">
            Upload Marksheet *
          </h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg divide-y">
            {marksheets?.map((m, index) => (
              <div
                key={m._id || index}
                className="flex justify-between items-center px-4 py-3"
              >
                <span>
                  Class {m.className} {m.required ? "*" : ""}
                </span>
                {m.url ? (
                  <div className="flex items-center gap-2">
                    <a
                      href={m.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View
                    </a>
                    <button
                      onClick={() => handleRemoveMarksheet(index)}
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                    {/* {m._id && (
                      <button
                        onClick={() => handleRemoveMarksheet(m._id!)}
                        className="text-red-500 text-sm"
                      >
                        Remove
                      </button>
                    )} */}
                  </div>
                ) : (
                  <div>
                    <input
                      type="file"
                      id={`marksheet${index}`}
                      name={`marksheet${index}`}
                      className="hidden"
                      accept="image/png,image/jpeg"
                      onChange={(e) =>
                        handleMarksheetChange(
                          index,
                          e.target.files?.[0] || null
                        )
                      }
                      disabled={uploadingFiles.has(`marksheet-${index}`)}
                    />
                    <label
                      htmlFor={`marksheet${index}`}
                      className="text-blue-500 cursor-pointer underline"
                    >
                      {uploadingFiles.has(`marksheet-${index}`)
                        ? "Uploading..."
                        : "Upload"}
                    </label>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            className="mt-3 w-full flex justify-center items-center text-sm text-blue-600 font-medium hover:underline"
            onClick={() => handleAddMarksheet()}
            disabled={
              isSubmitting ||
              uploadingFiles.size > 0 ||
              isEditingProfile ||
              isEditingSchool
            }
          >
            + Add Additional Class Mark List
          </button>
        </div>

        <div>
          <h3 className="text-md font-semibold text-gray-700 mb-2">
            Transfer Certificate
          </h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
            {formData.transferCertificate.url ? (
              <div className="flex justify-center items-center gap-6">
                <a
                  href={formData.transferCertificate.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Transfer Certificate
                </a>

                <button
                  type="button"
                  className="text-red-500 hover:text-red-700"
                  title="Remove"
                  onClick={() =>
                    setFormData((prev: any) => ({
                      ...prev,
                      transferCertificate: { file: null, url: null },
                    }))
                  }
                >
                  <RiDeleteBin5Line className="text-xl" />
                </button>
              </div>
            ) : (
              <>
                <input
                  type="file"
                  id="transferCertificate"
                  name="transferCertificate"
                  className="hidden"
                  accept="image/png,image/jpeg"
                  onChange={(e) =>
                    handleFileChange(
                      "transferCertificate",
                      e.target.files?.[0] || null
                    )
                  }
                  disabled={uploadingFiles.has("transferCertificate")}
                />
                <label
                  htmlFor="transferCertificate"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <Image
                    src="https://placehold.co/50x50"
                    alt="Upload Icon"
                    width={50}
                    height={50}
                    className="mb-2"
                  />
                  <span className="text-blue-500 underline">
                    {uploadingFiles.has("transferCertificate")
                      ? "Uploading..."
                      : formData.transferCertificate.file?.name ||
                      "Click to upload"}
                  </span>
                  <p className="text-xs text-gray-500">or drag and drop</p>
                  <p className="text-xs text-gray-400">
                    PNG or JPG (max. 350x350px)
                  </p>
                </label>
              </>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-md font-semibold text-gray-700 mb-2">
            Migration Certificate
          </h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
            {formData.migrationCertificate.url ? (
              <div className="flex justify-center items-center gap-6">
                <a
                  href={formData.migrationCertificate.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Migration Certificate
                </a>
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700"
                  title="Remove"
                  onClick={() =>
                    setFormData((prev: any) => ({
                      ...prev,
                      migrationCertificate: { file: null, url: null },
                    }))
                  }
                >
                  <RiDeleteBin5Line className="text-xl" />
                </button>
              </div>
            ) : (
              <>
                <input
                  type="file"
                  id="migrationCertificate"
                  name="migrationCertificate"
                  className="hidden"
                  accept="image/png,image/jpeg"
                  onChange={(e) =>
                    handleFileChange(
                      "migrationCertificate",
                      e.target.files?.[0] || null
                    )
                  }
                  disabled={uploadingFiles.has("migrationCertificate")}
                />
                <label
                  htmlFor="migrationCertificate"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <Image
                    src="https://placehold.co/50x50"
                    alt="Upload Icon"
                    width={50}
                    height={50}
                    className="mb-2"
                  />
                  <span className="text-blue-500 underline">
                    {uploadingFiles.has("migrationCertificate")
                      ? "Uploading..."
                      : formData.migrationCertificate.file?.name ||
                      "Click to upload"}
                  </span>
                  <p className="text-xs text-gray-500">or drag and drop</p>
                  <p className="text-xs text-gray-400">
                    PNG or JPG (max. 350x350px)
                  </p>
                </label>
              </>
            )}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          disabled={
            isSubmitting ||
            uploadingFiles.size > 0 ||
            isEditingProfile ||
            isEditingSchool
          }
        >
          {isSubmitting || isEditingProfile || isEditingSchool
            ? "Saving..."
            : "Save"}
        </button>
      </div>

      {/* Marksheet Upload Modal (Only for Add Flow) */}
      {isMarksheetModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Upload Marksheets for New School
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg divide-y">
                {modalMarksheets?.map((m, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center px-4 py-3"
                  >
                    <span>
                      Class {m.className} {m.required ? "*" : ""}
                    </span>
                    {m.url ? (
                      <div className="flex items-center gap-2">
                        <a
                          href={m.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          View
                        </a>
                        <button
                          onClick={() =>
                            setModalMarksheets((prev) =>
                              prev.map((mark, i) =>
                                i === index
                                  ? { ...mark, file: null, url: null }
                                  : mark
                              )
                            )
                          }
                          className="text-red-500 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div>
                        <input
                          type="file"
                          id={`modal-marksheet${index}`}
                          name={`modal-marksheet${index}`}
                          className="hidden"
                          accept="image/png,image/jpeg"
                          onChange={(e) =>
                            handleMarksheetChange(
                              index,
                              e.target.files?.[0] || null,
                              true
                            )
                          }
                          disabled={modalUploadingFiles.has(`marksheet-${index}`)}
                        />
                        <label
                          htmlFor={`modal-marksheet${index}`}
                          className="text-blue-500 cursor-pointer underline"
                        >
                          {modalUploadingFiles.has(`marksheet-${index}`)
                            ? "Uploading..."
                            : "Upload"}
                        </label>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="w-full flex justify-center items-center text-sm text-blue-600 font-medium hover:underline"
                onClick={() => handleAddMarksheet(true)}
                disabled={isModalSubmitting || modalUploadingFiles.size > 0}
              >
                + Add Additional Class Mark List
              </button>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => {
                  setIsMarksheetModalOpen(false);
                  if (setEditingSection) setEditingSection("");
                }}
                className="text-gray-500 hover:underline"
                disabled={isModalSubmitting || modalUploadingFiles.size > 0}
              >
                Cancel
              </button>
              <button
                onClick={handleModalSubmit}
                className="text-blue-600 font-semibold hover:underline"
                disabled={isModalSubmitting || modalUploadingFiles.size > 0}
              >
                {isModalSubmitting ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Input Field
const InputField = ({
  label,
  id,
  name,
  type,
  value,
  onChange,
  error,
  max,
}: {
  label: string;
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  max?: string;
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      max={max}
      className={`w-full border ${error ? "border-red-500" : "border-gray-300"
        } rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
    />
    {error && (
      <p id={`${id}-error`} className="mt-1 text-sm text-red-500">
        {error}
      </p>
    )}
  </div>
);

// Reusable Select Field
const SelectField = ({
  label,
  id,
  name,
  value,
  onChange,
  options,
  error,
  isLoading,
  loadingError,
}: {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[] | string[];
  error?: string;
  isLoading?: boolean;
  loadingError?: any;
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full border ${error ? "border-red-500" : "border-gray-300"
        } rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      disabled={isLoading}
    >
      <option value="">Select</option>
      {isLoading ? (
        <option value="" disabled>
          Loading...
        </option>
      ) : loadingError ? (
        <option value="" disabled>
          Failed to load options
        </option>
      ) : Array.isArray(options) && typeof options[0] === "string" ? (
        (options as string[])?.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))
      ) : (
        (options as { value: string; label: string }[])?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))
      )}
    </select>
    {error && (
      <p id={`${id}-error`} className="mt-1 text-sm text-red-500">
        {error}
      </p>
    )}
  </div>
);

export default SchoolForm;
