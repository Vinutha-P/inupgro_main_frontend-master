'use client'
import React, { useState, useEffect } from 'react';
import SelectButtonRoudedDark from "@/components/atom/buttons/SelectButtonRoudedDark";

const CollegeFeesBreakUp = ({ feesData }) => {

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);

  useEffect(() => {
    if (Array.isArray(feesData) && feesData.length > 0) {
      const firstCourse = feesData[0]?.course_name || null;
      setSelectedCourse(firstCourse);

      const firstBranch = Object.keys(feesData[0]?.data || {})[0] || null;
      setSelectedBranch(firstBranch);
    }
  }, [feesData]);

  const currentFeeData = selectedCourse && selectedBranch
    ? feesData.find(course => course?.course_name === selectedCourse)?.data[selectedBranch]
    : null;

  const calculateRowTotal = (rowIndex) => {
    if (!currentFeeData || !currentFeeData?.grid_data?.[rowIndex + 1]) return "NA";

    const rowValues = currentFeeData?.grid_data[rowIndex + 1].slice(1)?.map(fee =>
      parseInt(fee.replace("₹", "").replace(",", ""))
    );

    return `₹${rowValues.reduce((a, b) => a + b, 0).toLocaleString('en-IN')}`;
  };

  // Prepare course and branch options
  const courseOptions = feesData?.map(course => course?.course_name);
  const branchOptions = selectedCourse
    ? Object.keys(feesData.find(course => course?.course_name === selectedCourse)?.data || {})
    : [];

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-darkBlue mb-6">Fees Breakup</h2>

      <div className="flex-between mb-4">
        {/* <h4 className="text-xl lg:text-[1.75rem] font-semibold text-darkBlue"> */}
        <h6 className="text-darkBlue">
          Courses
        </h6>
        <div className="w-fit min-w-fit flex items-center justify-end gap-2">
          <SelectButtonRoudedDark
            buttonName={selectedCourse || "Select Course"}
            options={courseOptions}
            onSelect={(option) => {
              setSelectedCourse(option);
              // Reset branch when course changes
              const firstBranch = feesData?.find(course => course?.course_name === option)?.data
                ? Object.keys(feesData?.find(course => course?.course_name === option)?.data || {})[0]
                : null;
              setSelectedBranch(firstBranch);
            }}
          />
          <SelectButtonRoudedDark
            buttonName={selectedBranch || "Select Branch"}
            options={branchOptions}
            onSelect={(option) => setSelectedBranch(option)}
          />
        </div>
      </div>

      {currentFeeData && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {(currentFeeData?.grid_data?.[0] || [])?.map((header, index) => (
                  <th
                    key={index}
                    className="bg-softWhite text-darkBlue font-medium py-3 px-4 text-left"
                  >
                    {header}
                  </th>
                ))}
                <th className="bg-softWhite text-darkBlue font-medium py-3 px-4 text-left">
                  Total
                </th>
              </tr>
            </thead>

            <tbody>
              {currentFeeData?.grid_data.slice(1)?.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-softWhite'}
                >
                  {row?.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="py-3 px-4 text-charcoal"
                    >
                      {cell}
                    </td>
                  ))}
                  <td className="py-3 px-4 text-charcoal font-medium">
                    {calculateRowTotal(rowIndex)}
                  </td>
                </tr>
              ))}
              {/* <tr className="bg-softWhite">
                <td className="py-3 px-4 font-semibold text-darkBlue">
                  Total All Fees
                </td>
                {currentFeeData?.grid_data[0].slice(1).map((_, index) => (
                  <td 
                    key={index}
                    className="py-3 px-4 font-semibold text-darkBlue"
                  >
                    {`₹${(currentFeeData?.grand_total / 4).toLocaleString('en-IN')}` || "-"}
                  </td>
                ))}
                <td className="py-3 px-4 font-semibold text-darkBlue">
                  ₹{currentFeeData?.grand_total.toLocaleString('en-IN') || "-"}
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CollegeFeesBreakUp;