import React, { useState, useEffect } from "react";

const feesData = {
    "Year 1": {
        admissionFee: 2550,
        examFee: 700,
        depositFee: 2000,
        registrationFee: 400,
        tuitionFee: 200000,
        otherFee: 16500,
    },
    "Year 2": {
        admissionFee: 0,
        examFee: 700,
        depositFee: 0,
        registrationFee: 400,
        tuitionFee: 200000,
        otherFee: 16500,
    },
    "Year 3": {
        admissionFee: 0,
        examFee: 700,
        depositFee: 0,
        registrationFee: 400,
        tuitionFee: 200000,
        otherFee: 16500,
    },
    "Year 4": {
        admissionFee: 0,
        examFee: 700,
        depositFee: 0,
        registrationFee: 400,
        tuitionFee: 200000,
        otherFee: 16500,
    },
};

// Mapping labels from grid_data to your desired keys
const labelToKeyMap: Record<string, string> = {
    "Admission Fees": "admissionFee",
    "Exam Fees": "examFee",
    "Refundable Deposit": "depositFee",
    "Registration Fees": "registrationFee",
    "Tuition Fees": "tuitionFee",
    "Others": "otherFee",
};

const feeLabels = [
    { key: "admissionFee", label: "Admission Fee" },
    { key: "examFee", label: "Exam Fee" },
    { key: "depositFee", label: "Refundable Deposits" },
    { key: "registrationFee", label: "Registration Fees" },
    { key: "tuitionFee", label: "Tuition Fees" },
    { key: "otherFee", label: "Other" },
];

interface Props {
    selectedClass: string;
    selectedBranch: string;
}

const FeesBreakupTable: React.FC<Props> = ({ selectedClass, selectedBranch }) => {
    const [feesData, setFeesData] = useState<Record<string, Record<string, number>>>({});
    const [grandTotal, setGrandTotal] = useState<number>(0);

    useEffect(() => {
        const stored = localStorage.getItem("college_course_fees");
        if (!stored) return;

        try {
            const parsed = JSON.parse(stored);
            const course = parsed.college_fees.find(
                (item: any) => item.course_name === selectedClass
            );

            if (course && course.data[selectedBranch]) {
                const branchData = course.data[selectedBranch];
                const gridData = branchData.grid_data;

                const headers = gridData[0].slice(1); // ["Year 1", "Year 2", ...]
                const tempData: Record<string, Record<string, number>> = {};

                headers.forEach((year: string) => {
                    tempData[year] = {};
                });

                for (let i = 1; i < gridData.length - 1; i++) {
                    const [label, ...values] = gridData[i];
                    const key = labelToKeyMap[label];
                    if (!key) continue;

                    values.forEach((val: any, idx: number) => {
                        const year = headers[idx];
                        const numericValue = parseInt(val.replace(/[^\d]/g, ""), 10) || 0;
                        tempData[year][key] = numericValue;
                    });
                }

                setFeesData(tempData);
                setGrandTotal(branchData.grand_total || 0);
            } else {
                // Reset if no valid data found
                setFeesData({});
                setGrandTotal(0);
            }
        } catch (err) {
            console.error("Error parsing localStorage fee data", err);
        }
    }, [selectedClass, selectedBranch]);


    // useEffect(() => {
    //     const stored = localStorage.getItem("college_course_fees");
    //     if (!stored) return;

    //     try {
    //         const parsed = JSON.parse(stored);
    //         const course = parsed.college_fees.find(
    //             (item: any) => item.course_name === selectedClass
    //         );

    //         if (course) {
    //             const branches = course.data;
    //             const firstBranchKey = Object.keys(branches)[0]; // e.g., CSE or Finance
    //             const gridData = branches[firstBranchKey]?.grid_data;

    //             const headers = gridData[0].slice(1); // ["Year 1", "Year 2", ...]
    //             const tempData: Record<string, Record<string, number>> = {};

    //             headers.forEach((year: string) => {
    //               tempData[year] = {};
    //             });

    //             for (let i = 1; i < gridData.length - 1; i++) {
    //               const [label, ...values] = gridData[i];
    //               const key = labelToKeyMap[label];
    //               if (!key) continue;

    //               values.forEach((val:any, idx:any) => {
    //                 const year = headers[idx];
    //                 const numericValue = parseInt(val.replace(/[^\d]/g, ""), 10) || 0;
    //                 tempData[year][key] = numericValue;
    //               });
    //             }

    //             setFeesData(tempData);
    //             setGrandTotal(branches[firstBranchKey].grand_total || 0);
    //           }
    //         } catch (err) {
    //           console.error("Error parsing localStorage fee data", err);
    //         }
    //   }, [selectedClass]);


    const years = Object.keys(feesData);
    const totalsPerYear = years.map((year) =>
        Object.values(feesData[year] || {}).reduce((sum, val) => sum + val, 0)
    );

    const format = (val: number) => val.toLocaleString("en-IN");

    return (
        <div className="space-y-4">

            <div className="bg-[#eaf1ff] py-3 px-4">
                <div className="grid grid-cols-5 font-semibold text-xs text-gray-700">
                    <div className="">Fees</div>
                    {years.map((year) => (
                        <div key={year} className="text-center">
                            {year}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-[#edf4ff] p-4">

                {feeLabels.map(({ key, label }, index) => (
                    <div
                        key={key}
                        className={`grid grid-cols-5 text-xs text-darkBlue py-2 ${index !== feeLabels.length - 1 ? "border-gray-200" : ""
                            }`}
                    >
                        <div>{label}</div>
                        {years.map((year) => (
                            <div key={year} className="text-center">
                                {format(feesData[year]?.[key] || 0)}
                                {/* {format(
                                    feesData[year as keyof typeof feesData][
                                    key as keyof typeof feesData["Year 1"]
                                    ]
                                )} */}
                            </div>
                        ))}
                    </div>
                ))}

                <div className="grid grid-cols-5 text-xs text-gray-900 pt-3 pb-2 border-t border-gray-300 mt-2">
                    <div>Total All Fees</div>
                    {totalsPerYear.map((total, idx) => (
                        <div key={years[idx]} className="text-center">
                            {format(total)}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-5 font-bold text-darkBlue text-xs pt-2">
                    <div className="col-span-3 text-left pr-2">Grand Total:</div>
                    <div className="text-left text-black">{format(grandTotal)}</div>
                </div>
            </div>
        </div>
    );
};

export default FeesBreakupTable;
