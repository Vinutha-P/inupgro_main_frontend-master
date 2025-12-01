import React from "react";
import RoundedButton from "../atom/buttons/RoundedButton";
import EmailInput from "../atom/EmailInput";

const NewsCta = () => {
	return (
		<div className="bg-image-cta w-full h-[15.375rem] lg:h-[12.25rem] px-6 lg:px-20 py-[3.313rem] flex flex-col-reverse lg:flex-row items-center justify-center gap-2 lg:gap-4 bg-deepNavy rounded-lg">
			<div className="w-full flex flex-col gap-1 lg:gap-5 text-center lg:text-left">
				<p className="text-[1.75rem] lg:text-[2.15rem] text-white font-semibold">
					Weekly Newsletters
				</p>
				<div className="w-full flex flex-col gap-2">
					<p className="text-xl lg:text-[1.25rem] font-sembold lg:font-semibold text-white">
						Join our 25K subscribers
					</p>
					<p className="text-base lg:text-md font-light lg:font-normal text-white">
						Stay in the loop with everything you need to know.
					</p>
				</div>
			</div>
			<form
				action="submit"
				className="w-fit min-w-fit flex flex-col lg:flex-row items-center justify-end "
			>
				<div className="w-fit h-fit flex flex-col gap-[0.375rem]">
					<p className="text-xs text-white">Email</p>
					<EmailInput />
					<p className="text-xs text-white">
						We place the utmost importance on your privacy.
					</p>
				</div>
				<RoundedButton
					buttonName="Subscribe"
					height="1.5rem"
					withBackground
					fontBold
				/>
			</form>
		</div>
	);
};

export default NewsCta;
