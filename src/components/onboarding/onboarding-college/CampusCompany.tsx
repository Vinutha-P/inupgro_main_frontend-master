import ImageUrlInput from '@/components/atom/inputs/ImageUrlInput';
import React from 'react';
import { FiUpload } from "react-icons/fi";

type CompanyProps = {
    id: any;
    name: string;
    package: string;
    category: string;
    company: string;
    company_image: any;
};

type CampusCompanyProps = {
    studentCompany: CompanyProps[];
    error: any; 
    handleStudentChange: (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleImageChange: any;
    loading: any;
};

type CompanyFieldKey = keyof CompanyProps;

const CampusCompany = ({ studentCompany, handleStudentChange, handleImageChange, error,loading }: CampusCompanyProps) => {
    const companyFields: {
        label: string;
        key: CompanyFieldKey;
        placeholder: string;
    }[] = [
            { label: "Name", key: "name", placeholder: "Enter name" },
            { label: "Package", key: "package", placeholder: "Enter package" },
            { label: "Category", key: "category", placeholder: "Enter category" },
            { label: "Company Name", key: "company", placeholder: "Enter company name" },
        ];
    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <h5 className="text-xs font-bold mt-5">Campus Company</h5>
            </div>
            {
                studentCompany?.map((student: CompanyProps, index: any) => (
                    <div className="w-full text-deepBlue mb-6" key={index}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            {companyFields?.map(({ label, key, placeholder }) => (
                                <div key={key}>
                                    <label
                                        htmlFor={key}
                                        className="block text-xs font-medium text-gray-700 mb-1"
                                    >
                                        {label} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id={key}
                                        name={key}
                                        type="text"
                                        placeholder={placeholder}
                                        value={student[key as keyof CompanyProps]}
                                        onChange={(e) => handleStudentChange(index, e)}
                                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    />
                                    {error?.[index]?.[key] && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {error[index][key]}
                                        </p>
                                    )}
                                </div>
                            ))}

                            <ImageUrlInput
                                index={index}
                                name="campus_image"
                                placeholder="Upload image"
                                value={studentCompany[index]?.company_image || ""}
                                onChange={handleImageChange}
                                error={error[index]?.company_image}
                                loading={loading?.[index]}
                                label="Upload Image"
                            />

                            {/* Image upload input — placed outside the loop */}
                            {/* <div className="relative">
                                <label
                                    htmlFor={`company_image-${index}`}
                                    className="block text-xs font-medium text-gray-700 mb-1"
                                >
                                    Upload Image <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    id={`company_image-${index}`}
                                    onChange={(e) => handleImageChange(e,index)}
                                />

                                <input
                                    readOnly
                                    id={`company_image-${index}`}
                                    type="text"
                                    placeholder="Upload Image"
                                    value={studentCompany[index]?.company_image || ""}
                                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 pr-10 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
                                />

                                <label htmlFor={`company_image-${index}`}>
                                    <FiUpload className="absolute right-3 top-[30px] text-gray-500 text-sm cursor-pointer" />
                                </label>

                                {error[index]?.company_image && (
                                    <p className="text-red-500 text-xs mt-1">{error[index].company_image}</p>
                                )}
                            </div> */}
                        </div>
                    </div>
                ))
            }
        </div >
    );
}

export default CampusCompany;
