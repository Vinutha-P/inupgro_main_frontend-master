// 'use client';
// import React, { useState, useEffect } from "react";
// // import type React from "react";
// import SelectButtonRounded from "../atom/buttons/SelectButtonRounded";

// interface FilterRowProps {
// 	showSchoolType?: boolean;
// }

// const FilterRow: React.FC<FilterRowProps> = ({ showSchoolType }) => {
// 	const defaultFilters = ["Location", "Class", "Ranking"];
// 	const [isLoadings, setIsLoadings] = useState(true);

// 	const appliedFilters = showSchoolType
// 		? ["School Type", ...defaultFilters]
// 		: defaultFilters;
// 	const [selectedButton, setSelectedButton] = useState(appliedFilters[0]);

// 	useEffect(() => {
// 		setTimeout(() => {
// 			setIsLoadings(false);
// 		}, 1000);
// 	}, []);

// 	return (
// 		<>
// 			<div className="w-full flex items-center justify-start gap-3 md:gap-4 overflow-x-auto no-scrollbar">
// 				{isLoadings ? (
// 					appliedFilters?.map((filter) => (
// 						<div key={filter} className="w-24 h-8 lg:w-28 lg:h-10 skeleton-medium-gray rounded" />
// 					))
// 				) : (
// 					appliedFilters?.map((filter) => (
// 						<SelectButtonRounded
// 							key={filter}
// 							buttonName={filter}
// 							isSelected={selectedButton === filter}
// 							onClick={() => setSelectedButton(filter)}
// 						/>
						
// 					))
// 				)}
// 			</div>
// 		</>
// 	);
// };

// export default FilterRow;

// SINGLE 



'use client'

import React, { useState, useEffect } from 'react'
import SelectButtonRounded from '../atom/buttons/SelectButtonRounded'

interface FilterRowProps {
  showSchoolType?: boolean
  onFilterChange?: (type: string, value: string) => void
}

const FilterRow: React.FC<FilterRowProps> = ({ showSchoolType, onFilterChange }) => {
  const defaultFilters = ['Location', 'Class', 'Ranking']
  const [isLoading, setIsLoading] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)

  const appliedFilters = showSchoolType ? ['School Type', ...defaultFilters] : defaultFilters

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter)
    // Simulate filter value for demo; in practice, this would come from user input or dropdown
    const filterValueMap: { [key: string]: string } = {
      'Location': 'New York',
      'Class': 'Mathematics',
      'Ranking': 'Mid-Level',
      'School Type': '676a7949ef30d85d647d5426', // Example instituteId
    }
    const value = filterValueMap[filter] || ''
    onFilterChange?.(filter === 'School Type' ? 'Institute' : filter, value)
  }

  return (
    <div className="w-full flex items-center justify-start gap-3 md:gap-4 overflow-x-auto no-scrollbar">
      {isLoading ? (
        appliedFilters?.map((filter) => (
          <div key={filter} className="w-24 h-8 lg:w-28 lg:h-10 skeleton-medium-gray rounded" />
        ))
      ) : (
        appliedFilters?.map((filter) => (
          <SelectButtonRounded
            key={filter}
            buttonName={filter}
            isSelected={selectedFilter === filter}
            onClick={() => handleFilterClick(filter)}
          />
        ))
      )}
    </div>
  )
}

export default FilterRow