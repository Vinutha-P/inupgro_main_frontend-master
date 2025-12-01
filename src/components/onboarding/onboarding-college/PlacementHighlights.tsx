
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import CollegeDropdowns from "./CollegeDropdowns";
import CampusCompany from "./CampusCompany";
import SolidButton from "@/components/atom/buttons/SolidButton";
import { getCurrentYear } from "@/utils/helper";

type Workshop = {
    id: number;
    totalCompanies: string;
    totalRegistration: string;
    totalOffers: string;
    achievements: string;
};

type CompanyProps = {
    id: any;
    name: string;
    package: string;
    category: string;
    company: string;
    company_image: any;
};

type PlacementHighlightsProps = {
    placementWorkshops: Workshop[];
    handleWorkshopChange: (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleImageChange: any;
    handleAdd: () => void; // This should be a function that adds a new workshop
    formData: {
        highestCTC: string;
        lowestCTC: string;
    };
    handleFieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    errors: Record<string, string>;
    companyErrors: any;
    workshopErrors: Record<number, Record<string, string>>;
    studentCompany: CompanyProps[];
    companyLoader: any;
    handleStudentChange: (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

const PlacementHighlights = ({
    placementWorkshops,
    studentCompany,
    handleWorkshopChange,
    handleStudentChange,
    handleAdd,
    formData,
    handleFieldChange,
    errors,
    companyErrors,
    workshopErrors,
    handleImageChange,
    companyLoader
}: PlacementHighlightsProps) => {

    const currentYear = getCurrentYear().toString();

    const workshopFields: {
        label: string;
        key: keyof Workshop;
        placeholder: string;
    }[] = [
            { label: "Total Companies", key: "totalCompanies", placeholder: "Enter Total Companies" },
            { label: "Total Registrations", key: "totalRegistration", placeholder: "Enter Total Registration" },
            { label: "Total Offers", key: "totalOffers", placeholder: "Enter Total Offers" },
        ];

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <h5 className="text-xs font-bold mt-5">Placement Highlights</h5>
                <div className="flex items-center gap-2 flex-wrap mt-5">
                    <div className="w-fit text-[0.8rem]">
                        <SolidButton buttonName={currentYear} />
                        {/* <CollegeDropdowns showSessionDropdown={false}
                            selectedYear={""}
                            setSelectedYear={() => { }}
                            selectedSession=""
                            setSelectedSession={() => { }}
                            selectedCourse=""
                            setSelectedCourse={() => { }}
                            selectedBranch=""
                            setSelectedBranch={() => { }}
                        /> */}
                    </div>
                </div>
            </div>

            {placementWorkshops?.map((workshop: Workshop, index: number) => (
                <div key={workshop?.id} className="w-full text-deepBlue mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        {workshopFields?.map(({ label, key, placeholder }) => (
                            <div key={key}>
                                <label
                                    htmlFor={`${key}`}
                                    className="block text-xs font-medium text-gray-700 mb-1"
                                >
                                    {label} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id={`${key}`}
                                    type="text"
                                    placeholder={placeholder}
                                    value={workshop[key as keyof typeof workshop]}
                                    onChange={(e) => handleWorkshopChange(index, e)}
                                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
                                />
                                {workshopErrors?.[index]?.[key] && (
                                    <p className="text-xs text-red-500 mt-1">
                                        {workshopErrors[index][key]}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-4">
                        <label
                            htmlFor={`achievements-${index}`}
                            className="block text-[0.7rem] font-medium"
                        >
                            Achievements <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="achievements"
                            name="achievements"
                            type="text"
                            placeholder="Enter any achievements"
                            value={workshop?.achievements}
                            onChange={(e) => handleWorkshopChange(index, e)}
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                        {workshopErrors?.[index]?.achievements && (
                            <p className="text-xs text-red-500 mt-1">
                                {workshopErrors[index].achievements}
                            </p>
                        )}
                    </div>
                </div>
            ))}

            <div className="flex gap-4">
                <div className="w-1/2">
                    <label htmlFor="highestCTC" className="block text-xs font-medium mb-1">
                        Highest CTC <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="highestCTC"
                        name="highestCTC"
                        type="text"
                        value={formData?.highestCTC}
                        placeholder="Enter highest ctc"
                        onChange={handleFieldChange}
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    {errors.highestCTC && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.highestCTC}
                        </p>
                    )}
                </div>

                <div className="w-1/2">
                    <label htmlFor="lowestCTC" className="block text-xs font-medium mb-1">
                        Lowest CTC <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="lowestCTC"
                        type="text"
                        name="lowestCTC"
                        value={formData?.lowestCTC}
                        placeholder="Enter lowest ctc"
                        onChange={handleFieldChange}
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    {errors.lowestCTC && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.lowestCTC}
                        </p>
                    )}
                </div>
            </div>

            <CampusCompany
                studentCompany={studentCompany}
                handleStudentChange={handleStudentChange}
                handleImageChange={handleImageChange}
                error={companyErrors}
                loading={companyLoader}
            />

            <div className="mt-7 flex justify-center">
                <button
                    type="button"
                    onClick={handleAdd}
                    className="text-xs font-semibold text-darkBlue flex items-right gap-2"
                >
                    <FaPlus className="text-sm" /> Add Additional Companies
                </button>
            </div>
        </div>
    );
}

export default PlacementHighlights;
