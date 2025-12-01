import React from "react";
import { LuImagePlus } from "react-icons/lu";
import { MdEdit, MdClose } from "react-icons/md";

interface ImageUploaderProps {
	id: string;
	imageUrl: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onDelete?: () => void;
	className?: string;
	altText?: string;
	labelText?: string;
	isLoading?: boolean;
}

const ImageUploadCard: React.FC<ImageUploaderProps> = ({
	id,
	imageUrl,
	onChange,
	onDelete,
	className = "w-full md:w-[30%] bg-[#f0f5fd] h-48 rounded-lg relative",
	altText = "Uploaded Image",
	labelText = "Suggested size 300 x 300px",
	isLoading
}) => {
	return (
		<div className={`${className} group overflow-hidden`}>
			<input
				type="file"
				accept="image/*"
				className="hidden"
				id={id}
				onChange={onChange}
			/>

			{
				isLoading ? (
					<div className="flex items-center justify-center h-full">
						<div className="loader border-4 border-blue-300 border-t-blue-600 rounded-full w-8 h-8 animate-spin"></div>
					</div>
				) :
					imageUrl ? (
						<div className="w-full h-full relative rounded-md overflow-hidden">
							<img
								src={imageUrl}
								alt={altText}
								className="w-full h-full object-cover z-0"
							/>

							{/* Edit Icon (hover) */}
							<label
								htmlFor={id}
								className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-200 z-10 pointer-events-none"
							>
								<MdEdit className="text-white text-2xl pointer-events-auto" />
							</label>

							{/* Delete Icon (always visible) */}
							{onDelete && (
								<button
									type="button"
									onClick={onDelete}
									className="absolute top-1 right-1 bg-white text-black rounded-full p-1 shadow hover:bg-gray-200 transition z-20"
								>
									<MdClose className="text-base" />
								</button>
							)}
						</div>
					) : (
						<label
							htmlFor={id}
							className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
						>
							<div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
								<LuImagePlus className="text-primaryLight text-lg" />
							</div>
							<p className="text-[0.6rem] text-gray-500 text-center mt-2 whitespace-nowrap">
								{labelText}
							</p>
						</label>
					)}
		</div>
	);
};

export default ImageUploadCard;
