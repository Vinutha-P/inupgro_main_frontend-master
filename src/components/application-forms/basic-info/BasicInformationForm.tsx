import React, { useState } from "react";
import StudentDetails from "./StudentDetails";
import ParentsDetails from "./ParentsDetails";
import AddressDetails from "./AddressDetails";
import DocumentUploadProgress from "../DocumentUploadProgress";
import DocumentUploadBox from "../DocumentUploadBox";
import FormHeaderSection from "../FormHeaderSection";

const BasicInformationForm = ({
    show,
    onClose,
    onNext,
    orgType,
    setEmail,
    initialData,
    formData,
    setFormData,
}: {
    show: boolean;
    onClose: () => void;
    onNext?: () => void;
    orgType: string;
    setEmail: (email: string) => void;
    initialData: {
        studentName: string;
        studentEmail: string;
    };
    formData: any;
    setFormData: (data: any) => void;
}) => {
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const [uploaded, setUploaded] = useState<boolean>(false);

    const handleStudentChange = (updated: any) => {
        setFormData({ ...formData, student: { ...formData.student, ...updated } });
        if (updated.email) setEmail(updated.email);
    };

    const handleParentsChange = (updated: any) => {
        setFormData({ ...formData, parents: { ...formData.parents, ...updated } });
    };

    const handleFileChange = (newFile: File) => {
        setFile(newFile);
        setProgress(0);
        setUploaded(false);

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setUploaded(true);
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    };

    const handleDelete = () => {
        setFile(null);
        setProgress(0);
        setUploaded(false);
    };

    const leftProgress = 40;
    const rightProgress = 60;

    if (!show) return null;

    return (
        <div className="bg-white rounded-md shadow-lg w-[100vw] max-w-4xl relative max-h-[90vh] overflow-y-auto p-6">
            <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 text-2xl z-10"
            >
                &times;
            </button>

            <div className="max-w-3xl mx-auto mt-8">
                <FormHeaderSection orgType={orgType} />
                <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex gap-2">
                        <div className="relative w-full h-2 bg-gray-300 rounded-full mb-6 overflow-hidden">
                            <div
                                className="absolute h-2 bg-success rounded-full transition-all duration-300"
                                style={{ width: `${leftProgress}%` }}
                            />
                        </div>
                        <div className="relative w-full h-2 bg-gray-300 rounded-full mb-6 overflow-hidden">
                            <div
                                className="absolute h-2 bg-success rounded-full transition-all duration-300"
                                style={{ width: `${rightProgress}%` }}
                            />
                        </div>
                    </div>

                    <h3 className="text-gray-700 font-semibold text-base mb-4">
                        Basic Information of the student
                    </h3>

                    <StudentDetails
                        student={formData.student || {}}
                        setStudent={handleStudentChange}
                    />
                    <ParentsDetails
                        parents={formData.parents || {}}
                        setParents={handleParentsChange}
                    />
                    <AddressDetails />

                    {file ? (
                        <DocumentUploadProgress
                            file={file}
                            progress={progress}
                            uploaded={uploaded}
                            onFileChange={handleFileChange}
                            onDelete={handleDelete}
                            label="Upload passport size photo"
                        />
                    ) : (
                        <DocumentUploadBox
                            file={file}
                            onFileChange={handleFileChange}
                            label="Upload passport size photo"
                        />
                    )}

                    <div className="flex items-center justify-center gap-4 text-sm mt-6">
                        <button
                            type="button"
                            className="w-36 px-6 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
                        >
                            Save As Draft
                        </button>
                        <button
                            type="submit"
                            className="w-36 px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200"
                            onClick={onNext}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BasicInformationForm;
