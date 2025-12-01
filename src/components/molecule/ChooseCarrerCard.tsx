import React from "react";
import SideCardsContainer from "../containers/SideCardsContainer";
import CareerImage from "@/assets/career-page.png";
import Image from "next/image";
import RoundedButton from "../atom/buttons/RoundedButton";

const ChooseCarrerCard = ({ isLoadings }: { isLoadings: Boolean }) => {
	return (
		<>
			<SideCardsContainer isLoadings={isLoadings}>
				<div className={`w-full flex flex-col `}>
					{isLoadings
						? (<div className="w-full h-7 skeleton-medium-gray rounded-lg">
						</div>)
						: (
							<div className="w-full text-deepBlue">
								{/* <h6 className="text-xl lg:text-[1.3rem] font-semibold text-left"> */}
								<h6 className="text-left">
									Choose Your Career
								</h6>
							</div>
						)
					}
					{isLoadings
						? (<div className="w-full h-[233px] skeleton-medium-gray rounded-lg my-3">
						</div>)
						: (
							<Image
								width={0}
								height={0}
								sizes="100%"
								src={CareerImage}
								priority
								alt="PerSonalise"
								className="w-full my-3 "
							/>
						)
					}
					{
						isLoadings ? (<div className="w-full h-10 skeleton-medium-gray rounded-lg mb-2">
						</div>) : (<p className="text-center text-deepBlue text-sm mb-2">
							No coding required—just creativity & problem-solving skills!
						</p>)
					}

					{
						isLoadings ? (<div className="w-full h-10 skeleton-medium-gray rounded-lg ">
						</div>) : (
							<RoundedButton
								width="100%"
								height="28px"
								buttonName="Start Your Career"
								withBackground={true}
								fontBold={true}
							/>
						)
					}



				</div>
			</SideCardsContainer>
		</>
	);
};

export default ChooseCarrerCard;
