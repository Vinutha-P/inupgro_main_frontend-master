import React from "react";
import { LuIndianRupee } from "react-icons/lu";
import { FaRegCircleCheck } from "react-icons/fa6";

type Props = {
    isLoadings: boolean;
    isSelected: boolean;
    onSelect: () => void;
    onProceed: () => void;
};

const features = [
    "Enhance School Visibility",
    "Seamless Direct Admissions",
    "One-Click Onboarding for Students & Teachers",
    "Instant Curriculum Notifications",
    "Direct Result Publishing",
    "& many more...",
];

const YearlyPlanCard = ({ isLoadings, isSelected, onSelect, onProceed }: Props) => {
    return (
        <div
            onClick={onSelect}
            onKeyUp={(e) => e.key === "Enter" && onSelect()}
            className={`w-64 bg-white rounded-xl border shadow-lg p-4 cursor-pointer transition-all duration-200 ${isSelected ? "border-success ring-0 ring-success" : "border-gray-200"
                }`}
        >
            {isLoadings ? (
                <>
                    <div className="w-1/2 h-6 skeleton-medium-gray rounded mb-2" />
                    <div className="w-full h-5 skeleton-medium-gray rounded mb-2" />
                    <div className="w-1/3 h-6 skeleton-medium-gray rounded mb-4" />
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="w-full h-4 skeleton-medium-gray rounded mb-2"
                        />
                    ))}
                    <div className="w-full h-10 skeleton-medium-gray rounded mt-3" />
                </>
            ) : (
                <div className="flex flex-col gap-2 text-deepBlue">
                    <h2 className="text-sm font-semibold">Yearly</h2>
                    <p className="text-[0.7rem] text-gray-600">
                        Take Your Business to the Next Level with Yearly Plan.
                    </p>
                    <h3 className="text-xl font-semibold mt-2 flex items-center gap-1">
                        <LuIndianRupee size={30} /> 24,000
                    </h3>


                    <div className="flex flex-col gap-2 mt-3">
                        {features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                                <span className="text-green-600 pt-1">
                                    <FaRegCircleCheck color="#12B76A" size={15} />
                                </span>
                                <p className="text-[0.7rem]">{feature}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4">
                        <button
                            type="button"
                            onClick={onProceed}
                            className={`w-full px-6 py-2 text-[0.6rem] rounded-md border transition-all duration-200 ${isSelected
                                ? "bg-darkBlue text-white border-darkBlue"
                                : "bg-white text-darkBlue border-darkBlue hover:bg-gray-100"
                                }`}
                        >
                            Get Started
                        </button>


                    </div>
                </div>
            )}
        </div>
    );
};

export default YearlyPlanCard;
