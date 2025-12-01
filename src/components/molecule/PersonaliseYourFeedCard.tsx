import React from "react";
import SideCardsContainer from "../containers/SideCardsContainer";
import PersonaliseImage from "@/assets/Personalise_Card_Image.png";
import Image from "next/image";
import RoundedButton from "../atom/buttons/RoundedButton";
import { useRouter } from 'next/navigation'

interface PersonaliseYourFeedCardProps {
	className?: string;
	isLoadings: boolean;
}

const PersonaliseYourFeedCard = ({
	className,
	isLoadings
}: PersonaliseYourFeedCardProps) => {
	const router = useRouter()
	const handleGetStarted = () => {
		router.push('/register');
	};
	const handleGetLogin = () => {
		router.push('/login');
	};
	return (
		<>
			<SideCardsContainer className={className} isLoadings={isLoadings}>
				<div className={`w-full flex flex-col gap-5`}>
					<div className="w-full flex flex-col gap-[0.625rem]">
						{isLoadings
							?
							(
								<h6 className="w-full h-7 skeleton-medium-gray rounded-lg"></h6>
							)
							:
							(
								// <h6 className="text-xl lg:text-[1.3rem] font-semibold text-deepBlue">
								<h6 className="text-deepBlue">
									Personalise Your feed</h6>
							)}
						{isLoadings
							?
							(
								<div className="w-full h-11 skeleton-medium-gray rounded-lg"></div>
							)
							:
							(
								<p className="text-deepBlue text-sm">
									Keep up with the topics, feeds and trends that matters to you. All
									in one place.
								</p>
							)}
					</div>
					<div>
						{isLoadings
							?
							(
								<div className="w-full h-[150px] skeleton-medium-gray rounded-lg"></div>
							)
							:
							(
								<Image
									width={0}
									height={0}
									sizes="100vh"
									src={PersonaliseImage}
									priority
									alt="PerSonalise"
									className="w-full h-[9.375rem] "
								/>
							)}

					</div>
					<div className="w-ful flex-box-center gap-2">

						{isLoadings
							?
							(
								<div className="w-[48%] h-10 skeleton-medium-gray rounded-lg"></div>
							)
							:
							(
								<RoundedButton
									width="100%"
									height="28px"
									buttonName="Get Started"
									withBackground={true}
									fontBold={true}
									// onClick={() => router.push('/register')}
									onClick={handleGetStarted}
								/>
							)}
						{isLoadings
							?
							(
								<div className="w-[48%] h-10 skeleton-medium-gray rounded-lg"></div>
							)
							:
							(
								<RoundedButton
									width="100%"
									buttonName="Login"
									withBackground={false}
									fontBold={true}
									height="28px"
									onClick={handleGetLogin}
								// onClick={() => router.push('/login')}
								/>
							)}


					</div>
				</div>
			</SideCardsContainer>
		</>
	);
};

export default PersonaliseYourFeedCard;
