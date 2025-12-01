import React from "react";
import { FiUploadCloud } from "react-icons/fi";

type Props = {
    file: File | null;
    onFileChange: (file: File) => void;
    label: string;
    accept?: string;
};

const DocumentUploadBox: React.FC<Props> = ({
    file,
    onFileChange,
    label,
    accept = "image/png, image/jpeg",
}) => {
    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            onFileChange(selectedFile);
        }
    };

    return (
        <div className="mt-6">
            <label className="block text-[0.7rem] font-medium">
                {label} <span className="text-red-500">*</span>
            </label>

            <div className="mt-2 border border-gray-200 rounded-md p-2 flex flex-col items-center justify-center text-center bg-white">
                <input
                    type="file"
                    accept={accept}
                    onChange={handleFileInputChange}
                    className="hidden"
                    id="doc-upload"
                />
                <label htmlFor="doc-upload" className="cursor-pointer flex flex-col items-center justify-center">
                    <div className="bg-gray-100 rounded-full p-3 mb-2">
                        <FiUploadCloud />
                    </div>
                    <div className="block text-[0.7rem] font-medium">
                        <span className="text-blue-600 font-medium hover:underline">
                            Click to upload
                        </span>{" "}
                        or drag and drop
                    </div>
                    <p className="text-gray-400 mt-1 block text-[0.7rem] font-medium">
                        PNG or JPG (max. 350×350px)
                    </p>
                </label>

                {file && (
                    <p className="mt-3 text-sm text-green-600">
                        Selected file: {file.name}
                    </p>
                )}
            </div>
        </div>
    );
};

export default DocumentUploadBox;
