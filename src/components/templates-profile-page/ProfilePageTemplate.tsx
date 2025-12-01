import type { TemplateDefaultProps } from "@/types";
import type React from "react";
import Header from "../organism/Header";

import ProfileCardModal from "../auth-pages/teachers-profile-details/ProfileCardModal";
import UpdateProfileTabButton from "../auth-pages/update-profile-details/UpdateProfileTabButton";
// import TeacherCard from '../update-profile-details/TeacherCard';


const ProfilePageTemplate: React.FC<
	React.PropsWithChildren<{ className?: string }>
> = ({ children, className }) => {
	return (
		<div className="">
			<main
				className={`${className} px-20 `}>
				<div className={` ${className}  max-w-[95rem] mx-auto`}>
					<div className="">
						<UpdateProfileTabButton />
						<div className="flex gap-6 pb-12 pt-6">
							<div className="w-64">
								<ProfileCardModal />
							</div>
							<div className="flex-1">
								{children}
							</div>
						</div>
					</div>

				</div>
			</main>

		</div>

	);
};

export default ProfilePageTemplate;
