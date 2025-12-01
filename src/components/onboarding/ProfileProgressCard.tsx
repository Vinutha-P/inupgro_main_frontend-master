import React from "react";
import SideCardsContainer from "../containers/SideCardsContainer";
import {
	CircularProgressbarWithChildren,
	buildStyles,
} from "react-circular-progressbar";
import { GoCheck } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import "react-circular-progressbar/dist/styles.css";

const ProfileProgressCard = () => {
	const completionPercentage = 38;
	const strokeWidth = 10;

	const checklistItems = [
		{ text: "Basic Information", completed: true },
		{ text: "Key School Statistics", completed: false },
		{ text: "Fee Structure", completed: true },
		{ text: "Academics Statistics", completed: false },
		{ text: "Admission Criteria & Eligibility", completed: false },
		{ text: "School Results", completed: false },
		{ text: "Facilities", completed: false },
		{ text: "Principal's Profile", completed: false },
		{ text: "School Clubs", completed: false },
		{ text: "Photo Gallery", completed: false },
	];

	return (
		<SideCardsContainer className="w-full h-[35%]">
			<div className="w-full flex flex-col">
				<div className="w-full flex flex-col text-deepBlue">
					<h4 className="text-xl lg:text-[1.1rem] font-semibold text-left">
						Complete Your Profile
					</h4>
				</div>

				<div
					style={{
						width: 90,
						height: 90,
						margin: "auto",
						marginTop: 20,
						marginBottom: 20,
					}}
				>
					<svg style={{ position: "absolute", width: 0, height: 0 }}>
						<title>Gradient for progress bar</title>
						<defs>
							<linearGradient
								id="blueToCyanGradient"
								x1="0%"
								y1="0%"
								x2="100%"
								y2="100%"
							>
								<stop offset="0%" stopColor="#0000FF" />
								<stop offset="100%" stopColor="#00FFFF" />
							</linearGradient>
						</defs>
					</svg>
					<CircularProgressbarWithChildren
						value={completionPercentage}
						strokeWidth={strokeWidth}
						styles={buildStyles({
							pathColor: "url(#blueToCyanGradient)",
							trailColor: "#d6d6d6",
						})}
					>
						<div style={{ fontSize: 20, fontWeight: "bold", color: "#1C315E" }}>
							{`${completionPercentage}%`}
						</div>
					</CircularProgressbarWithChildren>
				</div>

				<div>
					<ul className="space-y-2">
						{checklistItems.map((item) => (
							<li key={item.text} className="flex items-center text-xs">
								{item.completed ? (
									<GoCheck className=" mr-2 w-4 h-4" />
								) : (
									<RxCross2 className=" mr-2 w-4 h-4" />
								)}
								<span
									className={
										item.completed
											? "text-deepBlue"
											: "text-deepBlue text-opacity-50"
									}
								>
									{item.text}
								</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</SideCardsContainer>
	);
};

export default ProfileProgressCard;
