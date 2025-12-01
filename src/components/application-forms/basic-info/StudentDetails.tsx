import React from "react";

const StudentDetails = ({
    student,
    setStudent,
}: {
    student: {
        firstName: string;
        surname: string;
        email: string;
        phoneNumber: string;
        dob: string;
        gender: string;
    };
    setStudent: (s: any) => void;
}) => {

    const handleStudentChange = (updated: any) => {
        setStudent({
            ...student,
            ...updated,
        });
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="firstName" className="block text-[0.7rem] font-medium">
                        First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        value={student.firstName}
                        onChange={handleStudentChange}
                        id="firstName"
                        type="text"
                        placeholder="Enter your first name"
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div>
                    <label htmlFor="surname" className="block text-[0.7rem] font-medium">
                        Surname <span className="text-red-500">*</span>
                    </label>
                    <input
                        value={student.surname}
                        onChange={handleStudentChange}
                        id="surname"
                        type="text"
                        placeholder="Enter your surname"
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div>
                    <label htmlFor="dob" className="block text-[0.7rem] font-medium">
                        Date of Birth (DOB) <span className="text-red-500">*</span>
                    </label>
                    <input
                        value={student.dob}
                        onChange={handleStudentChange}
                        id="dob"
                        type="date"
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div>
                    <label htmlFor="gender" className="block text-[0.7rem] font-medium">
                        Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={student.gender}
                        onChange={handleStudentChange}
                        id="gender"
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                        <option value="">Select the gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="email" className="block text-[0.7rem] font-medium">
                        Student Email ID <span className="text-red-500">*</span>
                    </label>
                    <input
                        value={student.email}
                        onChange={handleStudentChange}
                        id="email"
                        type="email"
                        placeholder="abc@xyz.com"
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div>
                    <label htmlFor="phoneNumber" className="block text-[0.7rem] font-medium">
                        Student Number
                    </label>
                    <div className="flex items-center mt-1 border bg-white border-gray-300 rounded px-3 py-2 text-[0.7rem] focus-within:ring-2 focus-within:ring-blue-200">
                        <span className="text-gray-500 mr-2 whitespace-nowrap text-xs">
                            +91 |
                        </span>
                        <input
                            value={student.phoneNumber}
                            onChange={handleStudentChange}
                            id="phoneNumber"
                            type="tel"
                            placeholder="Enter phone number"
                            className="flex-1 border-none outline-none text-xs"
                            maxLength={10}
                        />
                    </div>
                </div>
            </div>

            <hr className="my-6 border-t border-gray-300" />
        </div>
    );
};

export default StudentDetails;
