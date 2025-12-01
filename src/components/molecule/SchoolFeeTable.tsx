import React from "react";

interface FeeStructure {
	type: string;
	amount: string;
	frequency: string;
}

interface SchoolFeeTableProps {
	title: string;
	feeData: FeeStructure[];
	className?: string;
	isLoadings: boolean;
}

const SchoolFeeTable: React.FC<SchoolFeeTableProps> = ({
	title,
	feeData,
	className,
	isLoadings,
}) => {
	return (
		<div
			className={`w-full lg:h-[27rem] md:px-[0.9375rem] pt-4 lg:pb-[8.2rem] flex flex-col gap-4 rounded-lg text-deepBlue ${className || ""} ${isLoadings ? "skeleton-dark-gray" : "bg-background"}">`}
		>
			{isLoadings ? (
				<h5
					className="w-[50%] h-7 skeleton-medium-gray rounded-lg"
					aria-label="Loading title"
				/>
			) : (
				<h5 className="text-lg font-semibold">{title}</h5>
			)}
			<div className="w-full flex flex-col gap-4">
				{/* Table Header */}
				<div className="w-full grid grid-cols-3 font-semibold">
					{isLoadings ? (
						<strong className="w-[90%] h-6 skeleton-medium-gray rounded-lg" />
					) : (
						<strong>Types</strong>
					)}
					{isLoadings ? (
						<strong className="w-[90%] h-6 skeleton-medium-gray rounded-lg" />
					) : (
						<strong className="text-center">Amount</strong>
					)}
					{isLoadings ? (
						<strong className="w-[90%] h-6 skeleton-medium-gray rounded-lg" />
					) : (
						<strong className="text-right">Frequency</strong>
					)}
				</div>

				{/* Table Rows */}
				{feeData.map((fee, index) => (
					<div key={index} className="w-full grid grid-cols-3 text-xs">
						{isLoadings ? (
							<p className="w-[90%] h-4 skeleton-medium-gray rounded-lg" />
						) : (
							<p>{fee.type}</p>
						)}
						{isLoadings ? (
							<p className="w-[90%] h-4 skeleton-medium-gray rounded-lg" />
						) : (
							<p className="font-semibold text-center">{fee.amount}</p>
						)}
						{isLoadings ? (
							<p className="w-[90%] h-4 skeleton-medium-gray rounded-lg" />
						) : (
							<p className="text-right">{fee.frequency}</p>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default SchoolFeeTable;
