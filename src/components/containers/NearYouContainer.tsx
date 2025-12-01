import { useEffect, useState } from "react";
import RoundedButton from "../atom/buttons/RoundedButton";

interface NearYuoContainer {
	groupHeading: string;
	children: React.ReactNode;
	showViewAll: boolean;
	viewAllClick?: () => void;
}

const ViewAllContainer: React.FC<any> = ({
	groupHeading="",
	children=null,
	showViewAll = true,
	viewAllClick,
}) => {
	const [isLoadings, setIsLoadings] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoadings(false);
		}, 1000);
	}, []);

	return (
		<section className={`w-full h-fit p-3 md:p-8 lg:p-5 flex mx-auto xl:mx-0 flex-col gap-3 md:gap-4 rounded-lg  lg:max-w-[100%] overflow-x-auto no-scrollbar ${isLoadings ? "sekleton-light-gray" : "bg-white"}`}>
			<div className="w-full flex-box-between md:mb-1">
				{isLoadings ? (
					<h6 className="w-[300px] h-10 skeleton-medium-gray" />
				) : (
					<div className="w-fit min-w-fit">
						<h6 className="text-deepBlue">
							{groupHeading}
						</h6>
					</div>
				)}
				<div>
					{isLoadings ? (
						<div className="w-[100px] h-[40px] skeleton-medium-gray" />
					) : (
						showViewAll && (
							<RoundedButton
								buttonName="View All"
								height="1.625rem"
								onClick={viewAllClick}
								withBackground={false}
								fontBold
								textColor="primaryOverlay"
							/>
						)
					)}
				</div>
			</div>
			<div className="">{children}</div>
		</section>
	);
};

export default ViewAllContainer;
