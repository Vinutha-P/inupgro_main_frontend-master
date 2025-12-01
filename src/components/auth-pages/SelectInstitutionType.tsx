import React from "react";
import { useRouter } from "next/navigation";

interface SelectInstitutionTypeProps {
    selectedType: string;
    setSelectedType: (type: string) => void;
}

const SelectInstitutionType: React.FC<SelectInstitutionTypeProps> = ({
    selectedType,
    setSelectedType,
}) => {
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value;
        setSelectedType(selected);

        if (selected === "School") {
            router.push("/onboarding-school/school-details");
        } else if (selected === "College") {
            router.push("/onboarding-college/college-details");
        } else if (selected === "Institute") {
            router.push("/onboarding-coaching/coaching-details");
        }
    };

    return (
        <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
            <option value="School">School</option>
            <option value="College">College</option>
            <option value="Coaching">Coaching</option>
        </select>

    );
};

export default SelectInstitutionType;
