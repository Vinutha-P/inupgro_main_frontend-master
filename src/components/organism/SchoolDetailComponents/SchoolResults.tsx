"use client";
import type React from "react";
import { useEffect, useState } from "react";
import SelectButtonRoudedDark from "@/components/atom/buttons/SelectButtonRoudedDark";
import SchoolCarousel from "./SchoolCarousel";


// Define proper interfaces for your data structure
interface Student {
	student_name: string;
	marks: string | number;
	exam_type: string;
	profile_picture?: string;
}

interface ClassData {
	class_name: string;
	students: Student[];
}

interface YearData {
	classes: ClassData[];
}

interface SchoolData {
	[year: string]: YearData;
}

interface SchoolResultsProps {
	data: SchoolData;
}

const SchoolResults: React.FC<SchoolResultsProps> = ({ data }) => {
	const [selectedYear, setSelectedYear] = useState<string | null>(null);
	const [selectedClass, setSelectedClass] = useState<string | null>(null);
	const [currentStudents, setCurrentStudents] = useState<Student[]>([]);
	
	useEffect(() => {
		if (data) {
			const years = Object.keys(data);
			if (years.length > 0) {
				const firstYear = years[0];
				setSelectedYear(firstYear);

				if (data[firstYear]?.classes?.length > 0) {
					setSelectedClass(data[firstYear]?.classes[0]?.class_name);
				}
			}
		}
	}, [data]);

	useEffect(() => {
		if (selectedYear && selectedClass && data[selectedYear]) {
			const classData = data[selectedYear]?.classes?.find(
				(c) => c?.class_name === selectedClass,
			);
			setCurrentStudents(classData?.students || []);
		}
	}, [selectedYear, selectedClass, data]);

	const getClassOptions = (): string[] => {
		if (!selectedYear || !data[selectedYear]) return [];
		return data[selectedYear]?.classes?.map((c: ClassData) => {
		const className = c?.class_name || "";
		// return className.includes("Class") ? className : `Class ${className}`;
		return className;
	});
	};

	const getYearOptions = (): string[] => {
		return Object.keys(data);
	};
	return (
		<section className="w-full h-fit p-3 md:p-5 flex flex-col gap-3 bg-white rounded-lg">
			<div className="w-full flex flex-col md:flex-row gap-2 justify-between items-center">
				<h6 className=" text-deepBlue">
					Scholarship Student List
				</h6>
				<div className="w-fit min-w-fit flex items-center justify-end gap-2">
					<SelectButtonRoudedDark
						buttonName={selectedYear ? `Year ${selectedYear}` : "Select Year"}
						options={getYearOptions()}
						onSelect={(year: string) => setSelectedYear(year)}
					/>
					<SelectButtonRoudedDark
						buttonName={
							selectedClass ? selectedClass : "Select Class"
						}
						options={getClassOptions()}
						onSelect={(option: string) =>
							// setSelectedClass(option.replace("Class ", ""))
							setSelectedClass(option)
						}
					/>
				</div>
			</div>
			<div className="w-full flex flex-col gap-[0.625rem]">
				<p className="text-base lg:text-lg font-semibold">
				{selectedClass?.includes("Class") ? "" : `Class`} {selectedClass} <span>Results</span>
				</p>
				{currentStudents?.length > 0 && (
					<SchoolCarousel currentStudents={currentStudents} />
				)}
			</div>

		</section>
	);
};

export default SchoolResults;
