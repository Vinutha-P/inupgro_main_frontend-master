import type React from "react";
import { useRef } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { LuTrash2 } from "react-icons/lu";
import { GrUploadOption } from "react-icons/gr";
import { FaFilePdf, FaTimes } from "react-icons/fa";

type Props = {
    className: string;
    required?: boolean;
    file: File | null;
    progress: number;
    uploaded: boolean;
    onFileChange: (file: File) => void;
    onDelete: () => void;
    customStyle?: boolean;
};

const MarksheetUploadProgress = ({
    className,
    required,
    file,
    progress,
    uploaded,
    onFileChange,
    onDelete,
    customStyle = false,
}: Props) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = () => {
        fileInputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            onFileChange(selectedFile);
        }
    };

    // Format file size
    const getSize = (size: number) => {
        const kb = size / 1024;
        return kb > 1024
            ? `${(kb / 1024).toFixed(2)} MB`
            : `${kb.toFixed(1)} KB`;
    };

    if (uploaded && progress === 100 && file) {
        return (
            <div className="p-0 mb-0 relative w-full grid grid-cols-12 items-start gap-4 rounded-md">
                <div className={`${customStyle ? 'col-span-3' : 'col-span-2'}`}>
                    <span className={`text-xs font-medium ${customStyle ? 'text-blue-800' : 'text-gray-700'} whitespace-nowrap`}>
                        {className} {required && <span className="text-red-500">*</span>}
                    </span>
                </div>

                <div className={`${customStyle ? 'col-span-9' : 'col-span-10'} flex justify-between items-center`}>
                    <div className="flex items-center space-x-3">
                        <FaFilePdf className="text-red-500 text-lg" />
                        <div>
                            <p className="text-xs font-medium text-gray-800 line-clamp-1 max-w-60">{file.name}</p>
                            <p className="text-xs text-gray-500">{getSize(file.size)}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            className="bg-white px-3 py-1 text-xs rounded border transition flex items-center gap-1 min-w-24 justify-center text-green-600 border-green-600"
                        >
                            <FaRegCheckCircle className="w-3.5 h-3.5 text-success" />
                            Uploaded
                        </button>

                        <button
                            type="button"
                            onClick={onDelete}
                            className="p-1.5 rounded text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete"
                            aria-label="Delete file"
                        >
                            <LuTrash2 className="w-4.5 h-4.5" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`grid grid-cols-12 gap-4 items-center w-full ${customStyle ? 'custom-upload-style' : ''}`}>
            <div className={`${customStyle ? 'col-span-3' : 'col-span-2'}`}>
                <span className={`text-xs font-medium ${customStyle ? 'text-blue-800' : 'text-gray-700'} whitespace-nowrap`}>
                    {className} {required && <span className="text-red-500">*</span>}
                </span>
            </div>

            <div className={`flex items-center ${customStyle ? 'col-span-6 gap-2' : 'col-span-7 gap-4'}`}>
                <div className={`flex-1 rounded-full overflow-hidden ${customStyle ? 'h-3 bg-blue-100' : 'h-2 bg-gray-200'}`}>
                    <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                            width: `${progress}%`,
                            backgroundColor: progress > 0
                                ? (customStyle ? '#3b82f6' : '#22c55e')
                                : 'transparent',
                        }}
                    />
                </div>
                <span className={`${customStyle ? 'text-sm font-medium text-darkBlue' : 'text-xs text-gray-500'} w-8 text-right`}>
                    {progress}%
                </span>
            </div>

            <div className="col-span-3 flex items-center justify-end gap-4">
                <button
                    type="button"
                    onClick={handleFileSelect}
                    className={`bg-white px-3 py-1 text-xs rounded border transition flex items-center gap-1 min-w-24 justify-center
                        ${uploaded ? "text-green-600 border-green-600" : "text-darkBlue border-gray-200"}
                    `}
                >
                    {uploaded ? (
                        <>
                            <FaRegCheckCircle className="w-3.5 h-3.5 text-success" />
                            Uploaded
                        </>
                    ) : (
                        <>
                            <GrUploadOption className="w-3.5 h-3.5" />
                            Upload
                        </>
                    )}
                </button>

                <button
                    type="button"
                    onClick={onDelete}
                    className="p-1.5 rounded text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete"
                    aria-label="Delete file"
                >
                    <LuTrash2 className="w-4.5 h-4.5" />
                </button>

                <input
                    type="file"
                    onChange={handleChange}
                    ref={fileInputRef}
                    className="hidden"
                />
            </div>
        </div>
    );
};

export default MarksheetUploadProgress;
