import React, { useState } from "react";

const AddressDetails = () => {
    const [formData, setFormData] = useState({
        houseName: "",
        address1: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value,
        }));
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                    <label htmlFor="houseName" className="block text-[0.7rem] font-medium">
                        House Name
                    </label>
                    <input
                        id="houseName"
                        type="text"
                        value={formData.houseName}
                        onChange={handleChange}
                        placeholder="Enter your house name"
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div>
                    <label htmlFor="address1" className="block text-[0.7rem] font-medium">
                        Address 1 <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="address1"
                        type="text"
                        value={formData.address1}
                        onChange={handleChange}
                        placeholder="Enter your address"
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div>
                    <label htmlFor="landmark" className="block text-[0.7rem] font-medium">
                        Landmark
                    </label>
                    <input
                        id="landmark"
                        type="text"
                        value={formData.landmark}
                        onChange={handleChange}
                        placeholder="Nearby place or landmark"
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div>
                    <label htmlFor="city" className="block text-[0.7rem] font-medium">
                        City <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="city"
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter your city"
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div>
                    <label htmlFor="state" className="block text-[0.7rem] font-medium">
                        State <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                        <option value="">Select state</option>
                        <option value="rajasthan">Rajasthan</option>
                        <option value="haryana">Haryana</option>
                        <option value="karnataka">Karnataka</option>

                    </select>
                </div>

                <div>
                    <label htmlFor="pincode" className="block text-[0.7rem] font-medium">
                        Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="pincode"
                        type="text"
                        value={formData.pincode}
                        onChange={handleChange}
                        maxLength={6}
                        placeholder="Enter pincode"
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                </div>
            </div>
        </div>
    );
};

export default AddressDetails;
