'use client'
import SelectButtonRoudedDark from "@/components/atom/buttons/SelectButtonRoudedDark";
import FeeStructureCard from "@/components/molecule/FeeStructureCard";
import FeeStructureProgressCard from "@/components/molecule/FeeStructureProgressCard";
import PrincipalProfileCard from "@/components/molecule/PrincipalProfileCard";
import SchoolFeeTable from "@/components/molecule/SchoolFeeTable";
import React, { useState, useMemo, useEffect } from "react";

type FeeDetail = {
	total_cost_of_admission?: number;
	[key: string]: any;
};

const FeeStructureSchool = ({ details }: any) => {
	const [selectedClass, setSelectedClass] = useState<string | null>(null);
	const [selectedStream, setSelectedStream] = useState<string | null>(null);
	const [isLoadings, setIsLoadings] = useState(true);

	const classes = useMemo(
		() => details && Object.keys(details?.fees?.data || {}),
		[details],
	);

	const streams = useMemo(() => {
		if (selectedClass) {
			const classData = details?.fees?.data?.[selectedClass] || {};
			const keys = Object.keys(classData);
			if (keys.length === 1 && keys[0] === selectedClass) {
				return []; // No stream
			}
			return keys;
		}
		return [];
	}, [details, selectedClass]);

	const selectedFeeData = useMemo(() => {
		if (selectedClass && selectedStream) {
			if (!details?.fees?.data[selectedClass]?.[selectedStream]) return null;
			return details?.fees?.data[selectedClass][selectedStream];
		}
	}, [details, selectedClass, selectedStream]);

	const formattedFeeData = useMemo(() => {
		if (!Array.isArray(selectedFeeData?.fees)) return [];
		return selectedFeeData.fees.map((fee: any) => ({
			type: fee?.fees_type,
			amount: `₹${fee?.fees_value?.toLocaleString()}`,
			frequency:
				fee?.fees_frequency === "OneTime" ? "One Time" : fee?.fees_frequency,
		}));
	}, [selectedFeeData]);

	const getTotalFeesAmount = (selectedFeeData: any) => {
		if (!selectedFeeData || !Array.isArray(selectedFeeData.fees)) {
			return {
				total: 0,
				averageMonthly: 0,
			};
		}

		const total = selectedFeeData.fees.reduce((sum: any, fee: any) => {
			return sum + Number(fee.fees_value || 0);
		}, 0);

		const count = selectedFeeData.fees.length;
		const average = count === 0 ? 0 : total / count;

		const averageMonthly = Math.floor(average / 12);

		return {
			total,
			averageMonthly,
		};
	};

	const totalSchoolFee = getTotalFeesAmount(selectedFeeData);

	useEffect(() => {
		if (classes?.length > 0 && !selectedClass) {
			const firstClass = classes[0];
			setSelectedClass(firstClass);
			const availableStreams = details?.fees?.data[firstClass]
				? Object.keys(details?.fees?.data[firstClass])
				: [];
			setSelectedStream(availableStreams[0] || null);
		}
	}, [classes, details, selectedClass]);

	useEffect(() => {
		setTimeout(() => {
			setIsLoadings(false);
		}, 1000);
	}, []);

	const handleClassSelect = (option: string) => {
		const newClass = option;
		setSelectedClass(newClass);
		const availableStreams = details?.fees?.data[newClass]
			? Object.keys(details?.fees?.data[newClass])
			: [];
		setSelectedStream(availableStreams[0] || null);
	};

	return (
		<div className="w-full h-fit flex flex-col lg:flex-row items-start gap-5 md:gap-4">
			<div className={`w-full h-fit px-3 lg:px-5 lg:py-5 flex flex-col gap-4 py-3 rounded-lg ${isLoadings ? "sekleton-light-gray" : "bg-white"}`}>
				<div className="flex-between">
					{isLoadings ? (
						<h6 className="w-[25%] h-10 skeleton-medium-gray rounded-lg"></h6>
					) : (
						<h6 className="text-darkBlue">
							Fee Structure ({details?.fees?.year})
						</h6>
					)}
					<div className="w-fit min-w-fit flex items-center justify-end gap-2">
						{isLoadings ? (
							<div className="w-[125px] h-10 skeleton-medium-gray rounded-lg"></div>
						) : (
							<>
								{selectedClass && (
									<SelectButtonRoudedDark
										buttonName={selectedClass}
										placeholder="Select Class"
										options={Array.isArray(classes) ? classes.map((c: any) => `${c}`) : []}
										onSelect={handleClassSelect}
									/>
								)}
								{streams && streams.length > 0 && selectedStream && (
									<SelectButtonRoudedDark
										buttonName={selectedStream}
										options={streams}
										onSelect={(option: string) => {
											setSelectedStream(option);
										}}
									/>
								)}
							</>
						)}
					</div>
				</div>

				<div className="w-full flex flex-col gap-4">
					<div className="w-full h-full flex flex-col lg:flex-row gap-5 items-center lg:items-start justify-start">
						<div className="w-full lg:max-w-[12.25rem] flex flex-col gap-4">
							<FeeStructureCard
								cardSubText="For the first year"
								cardTitle="Total Cost of New Admission"
								cardValue={totalSchoolFee?.total ? `₹${totalSchoolFee?.total}` : "NA"}
								isLoadings={isLoadings}
							/>
							<FeeStructureCard
								cardSubText="Monthly Cost"
								cardTitle="Total Monthly Cost"
								cardValue={totalSchoolFee?.averageMonthly ? `₹${totalSchoolFee?.averageMonthly}` : "NA"}
								isLoadings={isLoadings}
							/>
							<FeeStructureProgressCard
								cardTitle="Cost Indexing"
								cardSubText="Gurugram Region Schools Only"
								progressBar={{
									backgroundClr: "#1C315E",
									leftValue: "₹3,800",
									rightValue: "₹23,800",
									width: "40%",
								}}
								isLoadings={isLoadings}
							/>
						</div>
						{streams && (
							<SchoolFeeTable
								title={`Fee Structure for Class ${selectedClass}${streams.length > 1 ? ` - ${selectedStream}` : ""}`}
								feeData={formattedFeeData}
								isLoadings={isLoadings}
							/>
						)}
					</div>
				</div>
			</div>

			<div className={`w-full lg:max-w-[21rem] h-full pb-10 rounded-lg ${isLoadings ? "sekleton-light-gray" : "bg-white"}`}>
				<PrincipalProfileCard
					principalImage={details?.principal?.profile_picture}
					principalAge={details?.principal?.age ? `${details.principal.age} years old` : "NA"}
					principalName={details?.principal?.name || "NA"}
					degree={details?.principal?.metadata || "NA"}
					personality={details?.principal?.personality || []}
					experience={details?.principal?.experience ? `${details.principal.experience} Years of Experience` : "NA"}
					award={details?.principalDetail?.award || details?.principal?.award || "Awarded as best principal, Zone (2023)"}
					height="18.75rem"
				/>
			</div>
		</div>
	);
};

export default FeeStructureSchool;
