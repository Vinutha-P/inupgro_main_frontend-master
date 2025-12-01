import React from 'react';
import { FiUpload } from "react-icons/fi";
import { BiLoaderAlt } from "react-icons/bi";
import ImageUrlInput from '@/components/atom/inputs/ImageUrlInput';

type CampusProps = {
    id: any;
    company_name: string;
    company_logo: any;
};

type CampusCompanyProps = {
    formData: CampusProps[];
    error: any;
    handleChange: (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleUploadImg: any;
    loading: any;
};

type CompanyFieldKey = keyof CampusProps;

const CampusOpportunity = ({ formData, handleChange, handleUploadImg, error, loading }: CampusCompanyProps) => {
    const campusFields: {
        label: string;
        key: CompanyFieldKey;
        placeholder: string;
    }[] = [
            { label: "Company Name", key: "company_name", placeholder: "Enter company name" },
        ];
    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <h5 className="text-xs font-bold mt-5">Campus Opportunities</h5>
            </div>
            {
                formData?.map((student: CampusProps, index: any) => (
                    <div className="w-full text-deepBlue mb-6" key={index}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            {campusFields?.map(({ label, key, placeholder }) => (
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
                                        value={student[key as keyof CampusProps]}
                                        onChange={(e) => handleChange(index, e)}
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
                                name="company_logo"
                                placeholder="Upload logo"
                                value={formData[index]?.company_logo || ""}
                                onChange={handleUploadImg}
                                error={error?.[index]?.company_logo}
                                loading={loading?.[index]}
                                label="Company Logo"
                            />
                        </div>
                    </div>
                ))
            }
        </div >
    );
}

export default CampusOpportunity;
