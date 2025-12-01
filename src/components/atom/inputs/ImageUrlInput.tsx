import React from "react";
import { FiUpload } from "react-icons/fi";
import { LuLoaderCircle } from "react-icons/lu";

interface ImageUrlProps {
    index: number;
    name: string;
    placeholder: string;
    value: string;
    onChange: (...args: any[]) => void;
    error?: string;
    loading?: boolean;
    label?: string;
    extraParams?: any[];
}

const ImageUrlInput: React.FC<ImageUrlProps> = ({
    index,
    name,
    placeholder,
    value,
    onChange,
    error,
    loading,
    label,
    extraParams
}) => {
    const inputId = `${name}-${index}`;
    return (
        <div className="relative">
            <label
                htmlFor={inputId}
                className="block text-xs font-medium text-gray-700 mb-1"
            >
                {label && label} <span className="text-red-500">*</span>
            </label>

            {/* Hidden file input */}
            <input
                type="file"
                accept="image/*"
                className="hidden"
                id={inputId}
                onChange={(e) =>
                    extraParams
                        ? onChange(e, ...extraParams)
                        : index !== undefined
                            ? onChange(e, index)
                            : onChange(e)
                }
            />

            {/* Read-only input showing file name */}
            <input
                readOnly
                id={inputId}
                type="text"
                placeholder={placeholder}
                value={value}
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 pr-10 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
            />

            <label htmlFor={inputId}>
                {loading ? (
                    <LuLoaderCircle className="absolute right-3 top-[30px] text-gray-500 text-sm cursor-pointer" />
                ) : (
                    <FiUpload className="absolute right-3 top-[30px] text-gray-500 text-sm cursor-pointer" />
                )}
            </label>

            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default ImageUrlInput;
