import React from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { VscVerified } from "react-icons/vsc";
import { GrLocation } from "react-icons/gr";

interface FormHeaderSectionProps {
    orgType: string;
}

function FormHeaderSection({ orgType }: FormHeaderSectionProps) {
    return (
        <>
            <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                    {orgType} Admission Form
                </h2>
                <p className="text-gray-600 text-xs mt-1">
                    Complete the details below
                </p>
            </div>

            <div className="flex justify-center bg-gray-50 p-4 rounded-md mb-6">
                <div className="flex items-center gap-4">
                    <img
                        src="/School_logo.png"
                        alt="School Logo"
                        className="w-24 h-24 rounded-full border"
                        loading="lazy"
                    />
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800">
                            The Doon School
                        </h4>
                        <div className="flex items-center text-xs text-gray-700">
                            <GrLocation className="text-gray-700 mr-1 text-xl" />
                            Sector 50, Gurugram
                        </div>
                        <div className="flex items-center gap-2 text-sm mt-1">
                            <div className="flex items-center gap-1">
                                <MdOutlineRemoveRedEye className="text-gray-700 text-xl" />
                                <span className="text-xs text-gray-700">1K</span>
                            </div>
                            <div className="flex items-center gap-1 text-blue-500 font-semibold">
                                <VscVerified className="text-2xl" />
                                <span className="text-xs text-blue-500">Verified</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormHeaderSection;