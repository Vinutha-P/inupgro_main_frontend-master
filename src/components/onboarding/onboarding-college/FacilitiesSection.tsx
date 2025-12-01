import { facilitiesData } from "@/utils/constants";
// import { additionalFacilitiesData, facilitiesData } from "@/utils/constants";
import React from "react";

interface FacilitiesSectionProps {
    checkedFacilities: { [key: string]: boolean };
    setCheckedFacilities: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
    onChange?: () => void;
}


const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({ checkedFacilities, setCheckedFacilities, onChange }) => {
    return (
        <>
            <h5 className="text-xs font-bold mt-7">Facilities <span className="text-red-500">*</span></h5>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-4">
                {facilitiesData.map((facility) => (
                    <div key={facility.heading} className="bg-white">
                        <h6 className="text-[0.7rem] font-semibold text-deepBlue mb-3">
                            {facility.heading}
                        </h6>
                        <div className="flex flex-col gap-8">
                            {facility.options.map((option) => (
                                <label
                                    key={option}
                                    className="inline-flex items-center gap-2 text-[0.7rem] text-deepBlue"
                                >
                                    <input
                                        type="checkbox"
                                        className="form-checkbox text-primaryLight border-gray-300 rounded-sm"
                                        checked={!!checkedFacilities[option]}
                                        onChange={(e) => {
                                            setCheckedFacilities((prev) => ({
                                                ...prev,
                                                [option]: e.target.checked,
                                            }));
                                            onChange?.();
                                        }}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-4">
                {additionalFacilitiesData.map((facility) => (
                    <div key={facility.heading} className="bg-white">
                        <h6 className="text-[0.7rem] font-semibold text-deepBlue mb-5 mt-2">
                            {facility.heading}
                        </h6>
                        <div className="flex flex-col gap-8">
                            {facility.options.map((option) => (
                                <label
                                    key={option}
                                    className="inline-flex items-center gap-2 text-[0.7rem] text-deepBlue"
                                >
                                    <input
                                        type="checkbox"
                                        className="form-checkbox text-primaryLight border-gray-300 rounded-sm"
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div> */}
        </>
    );
};

export default FacilitiesSection;
