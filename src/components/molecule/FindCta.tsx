'use client'
import React, { useEffect, useState } from "react";
import { PiHeadphonesBold } from "react-icons/pi";

interface FindCtaProps {
	ctaHeading: string;
	ctaSubheading: string;
}

const FindCta: React.FC<FindCtaProps> = ({ ctaHeading, ctaSubheading }) => {

	const [bgImage, setBgImage] = useState('');
	const [isLoadings, setIsLoadings] = useState(true);

	useEffect(() => {
		const handleResize = () => {
			setBgImage(window.innerWidth > 1020 ? '/Cta_Web_Bg.png' : '/Cta_Mobile_Bg.png');
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setIsLoadings(false);
		}, 1000);
	}, []);


	return (

		<>
			

			<div
				className={`bg-cover bg-center bg-no-repeat w-full h-fit px-4 md:px-10 py-[3.313rem] flex flex-col lg:flex-row items-center justify-center gap-4 rounded-lg ${isLoadings ? "sekleton-light-gray" : "bg-deepNavy"}`}
				style={{
					backgroundImage: isLoadings ? "" : `url(${bgImage})`
				}}
			>
				<div className="w-full flex flex-col gap-5 text-center lg:text-left">
					{isLoadings ? (
						<div className="w-[90%] h-10 skeleton-medium-gray" />
					) : (
						<h2 className="text-[1.75rem] lg:text-[2.2rem] text-white font-semibold">
							{ctaHeading}
						</h2>
					)}

					{isLoadings ? (
						<div className="max-w-[450px] h-20 skeleton-medium-gray" />
					) : (
						<p className="text-[1rem] md:text-[1.15rem] font-light lg:font-normal text-white max-w-[450px]">
							{ctaSubheading}
						</p>
					)}
				</div>

				{isLoadings ? (
					<div className="w-[160px] h-14 skeleton-medium-gray" />
				) : (
					<button className="w-full lg:w-fit min-w-fit h-[37px] md:h-fit px-7 py-4 flex-box-center gap-2 bg-white rounded-lg border border-grayText">
						<PiHeadphonesBold />
						<span className="text-[16px] font-semibold">Need Help</span>
					</button>
				)}
			</div>

		</>
	);
};

export default FindCta;
