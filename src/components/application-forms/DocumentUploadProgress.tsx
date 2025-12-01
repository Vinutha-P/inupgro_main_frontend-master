import React, { useRef } from "react";
import { LuTrash2 } from "react-icons/lu";
import { HiOutlineDocument } from "react-icons/hi2";
import { FiUploadCloud } from "react-icons/fi";
import { FaFilePdf, FaRegCheckCircle, FaTimes } from "react-icons/fa";

type Props = {
    file: File | null;
    progress: number;
    uploaded: boolean;
    onFileChange: (file: File) => void;
    onDelete: () => void;
    label: string;
};

const getSize = (size: number) => {
    if (size < 1024) return `${size} bytes`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / 1024 / 1024).toFixed(1)} MB`;
};

const DocumentUploadProgress = ({
    file,
    progress,
    uploaded,
    onFileChange,
    onDelete,
    label,
}: Props) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            onFileChange(selectedFile);
        }
    };

    if (uploaded && progress === 100 && file) {
        return (
            <div className="mt-2 w-full bg-white">
                <p className="text-gray-500 text-xs">{label}</p>
                <div className="w-64 flex items-center justify-between border p-1.5 rounded-lg">
                    <div className="flex items-center space-x-2">
                        <FaFilePdf className="text-red-500 text-lg" />
                        <div>
                            <p className="font-medium text-gray-800 text-xs">{file.name}</p>
                            <p className="text-xs text-gray-500">{getSize(file.size)}</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="text-gray-400 hover:text-red-500"
                        onClick={onDelete}

                    >
                        <FaTimes />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-2 w-full">
            <p className="text-gray-500 text-xs mb-1">{label}</p>

            {file ? (
                <div className="flex flex-col border p-1.5 rounded-lg bg-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 overflow-hidden">
                            <FaFilePdf className="text-red-500 text-lg flex-shrink-0" />
                            <div className="min-w-0"> {/* Added to handle text overflow */}
                                <p className="font-medium text-gray-800 text-xs truncate">{file.name}</p>
                                <p className="text-xs text-gray-500">{getSize(file.size)}</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="text-gray-400 hover:text-red-500 flex-shrink-0 ml-2"
                            onClick={onDelete}
                        >
                            <FaTimes />
                        </button>
                    </div>
                    <div className="mt-2">
                        <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-300"
                                style={{
                                    width: `${progress}%`,
                                    backgroundColor: progress > 0 ? '#22c55e' : 'transparent',
                                }}
                            />
                        </div>
                        <div className="text-right text-xs text-gray-600 mt-1">{progress}%</div>
                    </div>
                </div>
            ) : (
                <div className="border border-gray-200 rounded-md p-4 flex flex-col items-center justify-center text-center bg-white">
                    <input
                        type="file"
                        onChange={handleChange}
                        ref={fileInputRef}
                        className="hidden"
                        id="doc-upload"
                    />
                    <label htmlFor="doc-upload" className="cursor-pointer flex flex-col items-center justify-center w-full">
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
                </div>
            )}
        </div>
    );
};

export default DocumentUploadProgress;