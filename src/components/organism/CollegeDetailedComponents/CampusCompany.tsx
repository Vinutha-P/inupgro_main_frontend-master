// 'use client';
// import React, { useEffect, useState } from "react";
// import SelectButtonRoudedDark from "../../atom/buttons/SelectButtonRoudedDark";
// import CompanyCard from "../../atom/CompanyCard";

// interface Company {
//   company_name: string;
//   company_logo: string;
//   _id: string;
// }

// interface YearData {
//   placement_count: number;
//   companies: Company[];
//   _id: string;
// }

// const CampusCompany = ({ placementData }: any) => {
//   const [selectedYear, setSelectedYear] = useState<string | null>(null);

//   const availableYears = Object.keys(placementData);

//   const handleYearSelect = (year: string) => {
//     setSelectedYear(year);
//   };

//   const currentYearData = selectedYear ? placementData[selectedYear] : null;

//   useEffect(() => {
//     setSelectedYear(Object.keys(placementData)[0]);
//   }, [placementData]);

//   return (
//     <section className="w-full h-fit px-2 md:px-6 py-[1.625rem] flex flex-col gap-3 bg-white rounded-lg max-w-[68vw]">
//       <div className="flex-between">
//         <div className="flex flex-col">
//           {/* <h4 className="text-xl lg:text-[1.75rem] font-semibold text-deepBlue"> */}
//           <h4 className="">
//             200+ Campus Company
//           </h4>
//           {/* {currentYearData && (
//             <p className="text-sm text-gray-600">
//               Total Placements: {currentYearData.placement_count}
//             </p>
//           )} */}
//         </div>
//         <div className="w-fit min-w-fit flex items-center justify-end gap-2">
//           <SelectButtonRoudedDark
//             buttonName={selectedYear}
//             options={availableYears}
//             onSelect={handleYearSelect}
//           />
//         </div>
//       </div>
//       <div className="w-full inline-flex overflow-x-auto  gap-5">
//         {currentYearData?.companies.map((company: any) => (
//           <div className="w-[15rem]">
//             <CompanyCard
//               key={company._id}
//               companyName={company.company_name}
//               companyLogo={company.company_logo}
//             />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default CampusCompany;

'use client';
import React, { useEffect, useRef, useState } from "react";
import SelectButtonRoudedDark from "../../atom/buttons/SelectButtonRoudedDark";
import CompanyCard from "../../atom/CompanyCard";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

interface Company {
  company_name: string;
  company_logo: string;
  _id: string;
}

interface YearData {
  placement_count: number;
  companies: Company[];
  _id: string;
}

const CampusCompany = ({ placementData }: any) => {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const availableYears = Object.keys(placementData);

  const handleYearSelect = (year: string) => {
    setSelectedYear(year);
  };

  const currentYearData = selectedYear ? placementData[selectedYear] : null;

  useEffect(() => {
    if (placementData && Object.keys(placementData).length > 0) {
      setSelectedYear(Object.keys(placementData)[0]);
    }
  }, [placementData]);

  return (
    <section className="w-full h-fit px-2 md:px-6 py-[1.625rem] flex flex-col gap-3 md:gap-4 bg-white rounded-lg max-w-[100%] ">
      <div className="flex-box-between">
        <div className="flex flex-col">
          <h6 className="text-deepBlue">
            200+ Campus Company
          </h6>
        </div>
        <div className="w-fit min-w-fit flex items-center justify-end gap-2">
          <SelectButtonRoudedDark
            buttonName={selectedYear}
            options={availableYears}
            onSelect={handleYearSelect}
          />
        </div>
      </div>

        <div
          ref={carouselRef}
          className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3 md:gap-4"
        >
          {Array.isArray(currentYearData?.companies) && currentYearData?.companies?.map((company: any,index:number) => (
            <div key={company._id || index} className="col-span-1">
              <CompanyCard
                companyName={company?.company_name || "NA"}
                companyLogo={company?.company_logo}
              />
            </div>
          ))}
        </div>
    </section>
  );
};
export default CampusCompany;
