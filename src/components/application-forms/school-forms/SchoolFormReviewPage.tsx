import React from "react";
import { FaPen, FaFilePdf, FaTimes } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import FormHeaderSection from "../FormHeaderSection";

type InfoItem = {
    label: string;
    value: string;
};

type FileItem = {
    label: string;
    name: string;
    size: string;
};

const infoSection = (title: string, items: InfoItem[]) => (
    <div className="p-6 mb-6 relative w-full max-w-3xl mx-auto bg-gray-50 rounded-md">
        <h2 className="text-md font-semibold mb-4 text-gray-700">{title}</h2>
        <button
            type="button"
            className="absolute top-4 right-4 text-blue-500 hover:text-blue-700 flex items-center text-sm"
        >
            <FaPen className="mr-1" /> Edit
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            {items.map((item) => (
                <div key={item.label}>
                    <p className="text-gray-500">{item.label}</p>
                    <p className="text-gray-800 font-medium">{item.value}</p>
                </div>
            ))}
        </div>
    </div>
);

const fileSection = (
    title: string,
    files: FileItem[],
    onRemove: (index: number) => void
) => (
    <div className="p-6 mb-6 relative w-full max-w-3xl mx-auto bg-gray-50 rounded-md">
        <h2 className="text-md font-semibold mb-4 text-gray-700">{title}</h2>
        <button
            type="button"
            className="absolute top-4 right-4 text-blue-500 hover:text-blue-700 flex items-center text-sm"
        >
            <FaPen className="mr-1" /> Edit
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 text-sm">
            {files.map((file, index) => (
                <div key={file.label}>
                    <p className="text-gray-500 text-xs">{file.label}</p>
                    <div className="w-64 flex items-center justify-between border p-1.5 rounded-lg">
                        <div className="flex items-center space-x-2">
                            <FaFilePdf className="text-red-500 text-lg" />
                            <div>
                                <p className="font-medium text-gray-800">{file.name}</p>
                                <p className="text-xs text-gray-500">{file.size}</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="text-gray-400 hover:text-red-500"
                            onClick={() => onRemove(index)}
                        >
                            <FaTimes />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const SchoolFormReviewPage = ({
    show,
    onClose,
    onPrevious,
    onNext,
    orgType,
    formData,
    email,
}: {
    show: boolean;
    onClose: () => void;
    onPrevious: () => void;
    onNext: () => void;
    orgType: string;
    formData: any;
    email: string;
}) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [documents, setDocuments] = React.useState<FileItem[]>([
        { label: "Marksheet of class 5th", name: "smitaagarwal.pdf", size: "1.5 MB" },
        { label: "Marksheet of class 4th", name: "smitaagarwal.pdf", size: "1.5 MB" },
        { label: "Marksheet of class 3rd", name: "smitaagarwal.pdf", size: "1.5 MB" },
        { label: "Marksheet of class 2nd", name: "smitaagarwal.pdf", size: "1.5 MB" },
        { label: "Academic certificates", name: "smitaagarwal.pdf", size: "1.5 MB" },
        { label: "Aadhar card", name: "smitaagarwal.pdf", size: "1.5 MB" },
    ]);

    const handleRemoveFile = (indexToRemove: number) => {
        setDocuments((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    };

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
                    <div className="flex flex-col items-center py-4 mb-6 bg-gray-50">
                        <h1 className="text-md font-semibold text-gray-800">Review Form</h1>
                        <div className="flex justify-center items-center relative mt-4">
                            <div className="w-24 h-24 bg-white rounded-full flex justify-center items-center border-2 border-blue-100 relative overflow-hidden cursor-pointer">
                                <div
                                    className="bg-blue-100 rounded-full flex flex-col justify-center items-center border-2 border-blue-100"
                                    style={{ width: "88px", height: "88px" }}
                                />
                            </div>
                            <div className="absolute bottom-1 right-[5%] w-6 h-6 rounded-full border-2 border-white bg-primaryLight flex-box-center cursor-pointer shadow-md hover:scale-105 transition">
                                <GoPencil className="text-white text-xs" />
                            </div>
                        </div>

                        {infoSection("Basic Info", [
                            { label: "Name", value: "Smita Agarwal" },
                            { label: "DOB (Date of Birth)", value: "10 Nov 1994" },
                            { label: "Age", value: "29" },
                            { label: "Gender", value: "Female" },
                            { label: "Student Email ID", value: "94guptanishu@gmail.com" },
                            { label: "Student number", value: "+91 9079248369" },
                            { label: "Parent's name", value: "Sidharth VP" },
                            { label: "Parent's Email ID", value: "sidharthvp87@gmail.com" },
                            { label: "Parent's number", value: "+91 97684945629" },
                            { label: "Address", value: "D-58, 80 feet road, Mahesh Nagar, Jaipur Rajasthan(302015)" },
                        ])}

                        {infoSection("Additional Info", [
                            { label: "Current school name", value: "Chinmaya Vidyalaya" },
                            { label: "Current class", value: "5th" },
                            { label: "Current medium", value: "English" },
                            { label: "Preferred medium", value: "English" },
                            { label: "Applying for class", value: "6th" },
                            { label: "Preferred additional subject", value: "French" },
                        ])}

                        {fileSection("Documents Info", documents, handleRemoveFile)}
                    </div>

                    <div className="flex items-start justify-start mt-6 text-xs text-gray-500">
                        <input
                            type="checkbox"
                            id="acknowledge"
                            className="mr-2 w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="acknowledge" className="cursor-pointer">
                            I acknowledge that above facts are provided to the best of my knowledge and are accurate.
                        </label>
                    </div>

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
                            className={`w-36 px-6 py-2 rounded text-white transition-all duration-200 ${isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                                }`}
                            onClick={onNext}
                            disabled={isLoading}
                        >
                            {isLoading ? "Submitting..." : "Next"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchoolFormReviewPage;
