"use client";
import React from "react";
import OrganisationDetailCard from "@/components/molecule/OrganisationDetailCard";
import Chips from "@/components/atom/Chips";
import RoundedButton from "@/components/atom/buttons/RoundedButton";
import Image from "next/image";

const OverviewPanelSkelton = ({ details }: any) => {
	return (
		<>
			<div className="w-full p-2 md:p-5 flex justify-start items-center gap-5 overflow-x-auto bg-white rounded-lg no-scrollbar">
				<button
					type="button"
					className="w-[195px]  px-5 py-[0.594rem] h-[40px] flex-box-center font-semibold rounded-lg text-brandPrimary bg-mutedGray border border-brandSecondary"
				/>
				{Array(4)
					?.fill(null)
					?.map((_, index) => {
						return (
							<button
								key={index}
								type="button"
								className="w-[195px]  px-5 py-[0.594rem] h-[40px] flex-box-center font-semibold rounded-lg text-brandPrimary bg-[#fff] border border-brandSecondary"
							/>
						);
					})}
			</div>
		</>
	);
};

export default OverviewPanelSkelton;
