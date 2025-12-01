import React from "react";

type ParentsData = {
    name: string;
    surname: string;
    email: string;
    phone: string;
};

const ParentsDetails = ({
    parents,
    setParents,
}: {
    parents: ParentsData;
    setParents: (p: ParentsData) => void;
}) => {

    const handleParentsChange = (updated: any) => {
        setParents({
            ...parents,
            ...updated,
        });
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                    <label htmlFor="parentsName" className="block text-[0.7rem] font-medium">
                        Parent's Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        value={parents.name}
                        onChange={handleParentsChange}
                        id="parentsName"
                        type="text"
                        placeholder="Enter your parent's name"
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div>
                    <label htmlFor="parentsSurname" className="block text-[0.7rem] font-medium">
                        Parent's Surname <span className="text-red-500">*</span>
                    </label>
                    <input
                        value={parents.surname}
                        onChange={handleParentsChange}
                        id="parentsSurname"
                        type="text"
                        placeholder="Enter your parent's surname"
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div>
                    <label htmlFor="parentsEmail" className="block text-[0.7rem] font-medium">
                        Parent's Email ID <span className="text-red-500">*</span>
                    </label>
                    <input
                        value={parents.email}
                        onChange={(e) => handleParentsChange({ email: e.target.value })}
                        id="parentsEmail"
                        type="email"
                        placeholder="abc@xyz.com"
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div>
                    <label htmlFor="parentsPhoneNumber" className="block text-[0.7rem] font-medium">
                        Parent's Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center mt-1 border bg-white border-gray-300 rounded px-3 py-2 text-[0.7rem] focus-within:ring-2 focus-within:ring-blue-200">
                        <span className="text-gray-500 mr-2 whitespace-nowrap text-xs">+91 |</span>
                        <input
                            value={parents.phone}
                            onChange={handleParentsChange}
                            id="parentsPhoneNumber"
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

export default ParentsDetails;
