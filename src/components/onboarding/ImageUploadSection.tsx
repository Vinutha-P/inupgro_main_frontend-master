import { useUploadSchoolLogoMutation } from "@/features/api/schoolApiSlice";
import { uploadImageToS3 } from "@/utils/uploadImageToS3";
import type React from "react";
import { useRef, useState } from "react";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import { LuLoaderCircle } from "react-icons/lu";
import { RiEdit2Fill } from "react-icons/ri";
import { IoCloseCircle } from "react-icons/io5";

interface ImageUploadSectionProps {
	logoImage: string | null;
	setLogoImage: (url: string) => void;
	coverImage: string | null;
	setCoverImage: (url: string) => void;
	bannerError?: string | null;
	setError: React.Dispatch<React.SetStateAction<Record<string, string | null>>>;
}

const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({
	logoImage,
	setLogoImage,
	coverImage,
	setCoverImage,
	bannerError,
	setError
}) => {
	const coverInputRef = useRef<HTMLInputElement>(null);
	const logoInputRef = useRef<HTMLInputElement>(null);
	const [isLogoUploading, setIsLogoUploading] = useState(false);
	const [coverLoading, setCoverLoading] = useState(false);

	const handleImageChange = async (
		e: React.ChangeEvent<HTMLInputElement>,
		folder: string,
		setImage: (url: string) => void,
		key: string, 
		setLoading?: (loading: boolean) => void
	) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setLoading?.(true);
		const { url, error } = await uploadImageToS3(file, folder);
		if (url) {
			setImage(url);
			setError(prev => ({
				...prev,
				[key]: "",
			}))
			console.log("Uploaded successfully:", url);
		} else if (error) {
			setError(prev => ({
				...prev,
				[key]: error,
			}))
			setImage("");
		}

		setLoading?.(false);
	};

	const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleImageChange(e, "uploads", setCoverImage, "coverImage", setCoverLoading);
	};

	const handleLogoImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleImageChange(e, "logos", setLogoImage, "logoImage", setIsLogoUploading);
	};

	const handleDeleteLogo = (e: React.MouseEvent) => {
		e.stopPropagation();
		setLogoImage("");
	};

	return (
		<div className="w-full flex flex-col p-4">
			<div className="w-full text-deepBlue mt-4">
				<h5 className="text-xs font-bold">Basic Information</h5>
			</div>

			<div
				className="relative w-full h-72 border-2 border-dotted border-gray-200 rounded-lg p-4 mt-4 flex flex-col justify-center items-center text-center cursor-pointer overflow-hidden"
			>
				<div
					className="w-full h-full flex flex-col justify-center items-center text-center cursor-pointer"
					onClick={() => coverInputRef.current?.click()}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							coverInputRef.current?.click();
						}
					}}
				>
					{coverImage ? (
						<>
							<img
								src={coverImage}
								alt="Cover Preview"
								className="absolute inset-0 w-full h-full object-cover rounded-lg"
							/>

							<IoCloseCircle
								onClick={(e) => {
									e.stopPropagation(); // taaki click container ko na lage
									setCoverImage("");
								}}
								className="absolute top-2 right-2 cursor-pointer rounded-full bg-white text-black shadow-md
                 w-7 h-7 flex justify-center items-center hover:text-black/70 z-20"
								size={22}
							/>
						</>
					) : (
						<>
							<FiUpload className="text-2xl mb-2" />
							<p className="text-[0.6rem] font-bold text-deepBlue">
								Add Cover Image
							</p>
							<p className="text-[0.5rem] text-gray-800">
								Suggested Size 1230x X 385x
							</p>
						</>
					)}
					{bannerError && (
						<p className="text-red-500 text-xs mt-1">{bannerError}</p>
					)}
				</div>
				{coverLoading && (
					<div className="absolute inset-0 bg-white bg-opacity-60 flex justify-center items-center z-20 rounded-lg">
						<LuLoaderCircle className="animate-spin text-4xl text-blue-600" />
					</div>
				)}
				<input
					type="file"
					accept="image/*"
					className="hidden"
					ref={coverInputRef}
					onChange={handleCoverImageChange}
				/>

				<div
					className="absolute bottom-0 left-0 mb-4 ml-4 flex flex-col items-center cursor-pointer z-10"
					onClick={(e) => {
						e.stopPropagation();
						logoInputRef.current?.click();
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							logoInputRef.current?.click();
						}
					}}
				>
					<div
						className="group relative w-24 h-24 bg-white rounded-full border-2 border-gray-200 cursor-pointer flex justify-center items-center"
					>
						{logoImage && (
							<>
								<img
									src={logoImage}
									alt="Logo Preview"
									className="w-full h-full object-cover rounded-full"
								/>

								{/* Delete Icon */}
								<IoCloseCircle
									onClick={handleDeleteLogo}
									className="absolute bottom-1 right-1 z-[999] cursor-pointer rounded-full bg-white text-black shadow-md
                                    flex justify-center items-center"

									size={22}
								/>

								{/* Show icon only on hover */}
								<div className="absolute inset-0 hidden group-hover:flex justify-center items-center rounded-full bg-black/40 transition duration-200 z-10">
									<RiEdit2Fill className="text-white text-xl" />
								</div>

							</>
						)}

						{!logoImage && !isLogoUploading && (
							<div
								className="bg-blue-100 rounded-full flex flex-col justify-center items-center border-2 border-gray-200"
								style={{ width: "88px", height: "88px" }}
							>
								<FiUpload className="text-xl mb-1" />
								<p className="text-[0.6rem] font-bold text-deepBlue">Add Logo</p>
							</div>
						)}

						{isLogoUploading && (
							<div className="absolute inset-0 bg-white bg-opacity-60 flex justify-center items-center z-10 rounded-full">
								<LuLoaderCircle className="animate-spin text-lg text-blue-600" />
							</div>
						)}
					</div>

				</div>

				<input
					type="file"
					accept="image/*"
					className="hidden"
					ref={logoInputRef}
					onChange={handleLogoImageChange}
				/>
			</div>
		</div>
	);
};

export default ImageUploadSection;
