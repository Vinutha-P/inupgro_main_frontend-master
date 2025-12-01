import React from "react";
import { FaPlus } from "react-icons/fa";

interface StudentTileProps {
    profilePicture?: string;
    fullName?: string;
    facultyName?: string;
    designation?: string;
    department?: string;
    marks?: string | number;
    onClick?: () => void;
    customClass?: string;
    isFaculty?: boolean;
}

const ProfileTile: React.FC<StudentTileProps> = ({
    profilePicture,
    fullName = "Student Name",
    facultyName,
    designation,
    department,
    marks = "Marks Scored",
    onClick,
    customClass = "",
    isFaculty = false,
}) => {
    return (
        <div className={`bg-background rounded-lg h-[15rem] flex flex-col overflow-hidden shadow-lg ${customClass}`}>
            <div className="h-[90%] flex-box-center bg-lightBlueCustom">
                {profilePicture ? (
                    <img src={profilePicture} alt="student" className="w-full h-full object-cover" />
                ) : (
                    <div
                        className="w-7 h-7 rounded-full border-2 border-white bg-primaryLight flex-box-center cursor-pointer shadow-md hover:scale-105 transition"
                        onClick={onClick}
                        onKeyUp={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                onClick?.();
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                onClick?.();
                            }
                        }}
                    >
                        <FaPlus className="text-white text-sm" />
                    </div>
                )}
            </div>

            {
                !isFaculty ?
                    <div className="h-[20%] bg-white flex flex-col">
                        <div className="flex-1 flex items-start justify-start ml-5 mt-2">
                            <p className="text-xs text-deepBlue font-semibold"> {fullName || "Student Name"}</p>
                        </div>
                        <div className="flex-1 flex items-start justify-start ml-5 mb-2">
                            <p className="text-xs text-gray-500">{marks}</p>
                        </div>
                    </div>
                    :

                    <div className="h-[30%] bg-white flex flex-col">
                        <div className="flex-1 flex items-start justify-start ml-5 mt-2">
                            <p className="text-xs text-deepBlue font-semibold">
                                {facultyName || "Faculty Name"}
                            </p>
                        </div>
                        <div className="flex-1 flex items-start justify-start ml-5">
                            <p className="text-xs text-gray-500">{designation || "Designation"}</p>
                        </div>
                        <div className="flex-1 flex items-start justify-start ml-5 mb-2">
                            <p className="text-xs text-gray-500">{department || "Department"}</p>
                        </div>
                    </div>
            }

        </div>
    );
};

export default ProfileTile;
