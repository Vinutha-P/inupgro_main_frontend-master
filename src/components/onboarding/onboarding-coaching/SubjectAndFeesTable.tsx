import React, { useEffect, useState } from "react";

interface SubjectData {
    subject: string;
    seats: number;
    fees: string;
    batch: string;
    duration: string;
}

interface Props {
    selectedClass: string;
    selectedStream?: string;
    selectedBranch?: string;
}
const feesData = {
    physics: {
        Seats: 150,
        Fees: 15000,
        Batch: "Morning",
        Duration: "3 Months",
    },
    chemistry: {
        Seats: 150,
        Fees: 15000,
        Batch: "Morning",
        Duration: "6 Months",
    },
    maths: {
        Seats: 150,
        Fees: 15000,
        Batch: "Morning",
        Duration: "3 Months",
    },
    english: {
        Seats: 150,
        Fees: 15000,
        Batch: "Morning",
        Duration: "1 year",
    },
};

const feeLabels = [
    { key: "physics", label: "Physics" },
    { key: "chemistry", label: "Chemistry" },
    { key: "maths", label: "Maths" },
    { key: "english", label: "English" },
];
const columns = ["Seats", "Fees", "Batch", "Duration"];

const SubjectAndFeesTable: React.FC<Props> = ({ selectedClass, selectedBranch }) => {
    const [subjectData, setSubjectData] = useState<SubjectData[]>([]);
    const format = (val: number | string) =>
        typeof val === "number" ? val.toLocaleString("en-IN") : val;

    useEffect(() => {
        const localData = localStorage.getItem("coaching-fees") || localStorage.getItem("coaching-data");
        if (localData) {
            const parsed = JSON.parse(localData);
            const subjectFees = parsed?.subject_fees;
            if (!subjectFees || typeof subjectFees !== "object") {
                setSubjectData([]);
                return;
            }

            let result: SubjectData[] = [];
            const selectedData = subjectFees[selectedClass];

            if (typeof selectedData === "object" && !Array.isArray(selectedData)) {
                if (selectedBranch) {
                    const branchData = selectedData[selectedBranch];
                    if (Array.isArray(branchData)) {
                        result = branchData;
                    }
                } else {
                    // Branch required but not selected
                    result = []; // blank result
                }
            } else if (Array.isArray(selectedData)) {
                result = selectedData;
            }

            setSubjectData(result);
        }
    }, [selectedClass, selectedBranch]);


    return (
        <div className="space-y-4">
            <div className="bg-[#eaf1ff] py-3 px-4">
                <div className="grid grid-cols-5 font-semibold text-xs text-gray-700">
                    <div className="">Subject</div>
                    {columns?.map((col) => (
                        <div key={col} className="text-center">
                            {col}
                        </div>
                    ))}
                </div>
            </div>
            {
                subjectData?.length > 0 &&
                <div className="bg-[#edf4ff] p-4">
                    {subjectData?.map((item, index) => {
                        const subjectKey = item.subject.toLowerCase();

                        return (
                            <div key={index} className="grid grid-cols-5 text-xs text-darkBlue py-2">
                                <div>{item.subject}</div>
                                {columns?.map((col) => {
                                    let col_name = col?.toLocaleLowerCase()
                                    return (
                                        <div key={col_name} className="text-center">
                                            {format(item[col_name as keyof SubjectData])}
                                        </div>
                                    )
                                })}
                            </div>
                        );
                    })}
                </div>
            }
        </div>
    );
};

export default SubjectAndFeesTable;
