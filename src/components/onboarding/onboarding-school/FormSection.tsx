import React from "react";
import RoundedButton from "../../atom/buttons/RoundedButton";
import { BOARD_OPTIONS, CAMPUS_TYPE_OPTIONS, COED_STATUS_OPTIONS, OWNERSHIP_OPTIONS } from "@/utils/selectOptions/options";

const FormSection = () => {
	return (
		<div className="w-full p-4 text-deepBlue">
			<div className="mb-4">
				<label
					htmlFor="school-name"
					className="block text-[0.7rem] font-medium"
				>
					School Name <span className="text-red-500">*</span>
				</label>
				<input
					id="school-name"
					type="text"
					placeholder="Enter school name"
					className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{[
					{
						id: "registration-no",
						label: "Registration No.",
						placeholder: "Enter registration no.",
					},
					{
						id: "school-website",
						label: "School Website",
						placeholder: "Enter school website",
					},
					{
						id: "email-address",
						label: "Email Address",
						placeholder: "Enter email address",
					},
					{
						id: "phone-number",
						label: "Phone Number",
						placeholder: "Enter phone number",
					},
					{ id: "plot-no", label: "Plot No.", placeholder: "Enter plot no." },
					{
						id: "address-1",
						label: "Address 1",
						placeholder: "Enter address 1",
					},
					{ id: "landmark", label: "Landmark", placeholder: "Enter landmark" },
					{ id: "city", label: "City", placeholder: "Enter city" },
					{ id: "state", label: "State", placeholder: "Enter state" },
					{ id: "pincode", label: "Pincode", placeholder: "Enter pincode" },
				].map((field) => (
					<div key={field.id}>
						<label
							htmlFor={field.id}
							className="block text-[0.7rem] font-medium"
						>
							{field.label} <span className="text-red-500">*</span>
						</label>
						<input
							id={field.id}
							type="text"
							placeholder={field.placeholder}
							className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
						/>
					</div>
				))}
			</div>
			<h5 className="text-xs font-bold mt-6 mb-3">Key School Statistics</h5>

			{/* Select Fields */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{[
					{
						id: "ownership",
						label: "Ownership",
						options: OWNERSHIP_OPTIONS,
					},
					{
						id: "board",
						label: "Board",
						options: BOARD_OPTIONS,
					},
					{
						id: "establishment-year",
						label: "Year of Establishment",
						options: ["Select Year", "1990", "2000", "2010"],
					},
					{
						id: "coed-status",
						label: "Co-ed Status",
						options: COED_STATUS_OPTIONS,
					},
					{
						id: "campus-area",
						label: "Campus Area",
						options: ["Select Area", "1 acre", "2 acres", "5 acres"],
					},
					{
						id: "campus-type",
						label: "Campus Type",
						options: CAMPUS_TYPE_OPTIONS,
					},
				].map((field) => (
					<div key={field.id} className="flex flex-col w-full">
						<label
							htmlFor={field.id}
							className="text-[0.7rem] font-medium mb-1"
						>
							{field.label} <span className="text-red-500">*</span>
						</label>
						<select
							id={field.id}
							className="border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
						>
							{field.options.map((option, index) => (
								<option key={option} value={option.toLowerCase()}>
									{option}
								</option>
							))}
						</select>
					</div>
				))}
			</div>
			<div className="flex justify-end mt-6">
				<RoundedButton
					withBackground={true}
					buttonName="Save & Continue"
					textSize="0.7rem"
				/>
			</div>
		</div>
	);
};

export default FormSection;
