import React, { useState, useCallback } from "react";
import FormFields from "./FormFields";
import DocumentSection from "../DocumentSection";
import FormHeaderSection from "../FormHeaderSection";

type FileUploadState = {
    file: File | null;
    progress: number;
    uploaded: boolean;
};

const CoachingAdditionalInfoForm = ({
    show,
    onClose,
    onPrevious,
    onNext,
    orgType,
    setEmail,
    initialData
}: {
    show: boolean;
    onClose: () => void;
    onPrevious: () => void;
    onNext: () => void;
    orgType: string;
    setEmail: (email: string) => void;
    initialData: {
        studentName: string;
        studentEmail: string;
    };
}) => {
    const [aadharCard, setAadharCard] = useState<FileUploadState>({
        file: null,
        progress: 0,
        uploaded: false
    });

    const handleFileChange = useCallback((type: 'aadhar') => (newFile: File) => {
        const setState = setAadharCard;

        setState({
            file: newFile,
            progress: 0,
            uploaded: false
        });

        const interval = setInterval(() => {
            setState(prev => {
                const newProgress = prev.progress + 10;
                if (newProgress >= 100) {
                    clearInterval(interval);
                    return { ...prev, progress: 100, uploaded: true };
                }
                return { ...prev, progress: newProgress };
            });
        }, 200);

        return () => clearInterval(interval);
    }, []);

    const handleDelete = useCallback((type: 'aadhar') => () => {
        const setState = setAadharCard;

        setState({
            file: null,
            progress: 0,
            uploaded: false
        });
    }, []);

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
            <div className="min-h-screen bg-white px-6 py-10">
                <div className="max-w-3xl mx-auto">
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
                            Additional Information
                        </h3>

                        <FormFields />

                        <DocumentSection
                            type="aadhar"
                            state={aadharCard}
                            onFileChange={handleFileChange('aadhar')}
                            onDelete={handleDelete('aadhar')}
                            label="Soft KYC - Upload Aadhar Card"
                        />
                        <div className="flex items-center justify-center gap-4 text-sm mt-6">
                            <button
                                type="button"
                                className="w-36 px-6 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
                                onClick={onPrevious}
                            >
                                Previous
                            </button>
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
        </div>
    );
};

export default CoachingAdditionalInfoForm;
