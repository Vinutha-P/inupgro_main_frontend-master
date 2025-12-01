import React, { useState, useRef } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { FaChevronLeft, FaPlus } from "react-icons/fa";
import { uploadImageToS3 } from "@/utils/uploadImageToS3";
import { RiEdit2Fill } from "react-icons/ri";
import { IoCloseCircle } from "react-icons/io5";
import { LuLoaderCircle } from "react-icons/lu";

interface RoundedImageUploaderProps {
    image: string | null;
    setImage: (url: string) => void;
    setError: any;
}

const RoundedImageUploader: React.FC<RoundedImageUploaderProps> = ({
    image,
    setImage,
    setError,
}) => {

    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading?.(true);
        const { url, error } = await uploadImageToS3(file, "uploads");
        if (url) {
            setImage(url);
            setError("")
            console.log("Uploaded successfully:", url);
        } else if (error) {
            setError(error)
            setImage("");
        }

        setLoading?.(false);
    };

    const handleDeleteLogo = (e: React.MouseEvent) => {
        e.stopPropagation();
        setImage("");
    };

    return (
        <>
            <div
                className="w-24 h-24 bg-white rounded-full flex justify-center items-center border-2 border-blue-100 relative overflow-hidden cursor-pointer group"
                onClick={(e) => {
                    e.stopPropagation();
                    inputRef.current?.click();
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        inputRef.current?.click();
                    }
                }}
            >
                {image ? (
                    <>
                        <img
                            src={image}
                            alt="Profile"
                            className="w-full h-full object-cover rounded-full"
                        />
                        {/* Show icon only on hover */}
                        <div className="absolute inset-0 hidden group-hover:flex justify-center items-center rounded-full bg-black/40 transition duration-200 z-10">
                            <RiEdit2Fill className="text-white text-xl" />
                        </div>
                    </>
                ) : (
                    <div
                        className="bg-blue-100 rounded-full flex flex-col justify-center items-center border-2 border-blue-100"
                        style={{ width: "88px", height: "88px" }}
                    >
                        <IoPersonOutline className="text-xl mb-1 text-blue-600" />
                    </div>
                )}
            </div>

            {!image ? (
                <div className="absolute bottom-1 right-[45%] w-6 h-6 rounded-full border-2 border-white bg-primaryLight flex-box-center cursor-pointer shadow-md hover:scale-105 transition"
                    onClick={(e) => {
                        e.stopPropagation();
                        inputRef.current?.click();
                    }}
                >
                    <FaPlus className="text-white text-xs" />
                </div>
            )
                :
                (
                    <div className="absolute bottom-1 right-[45%] rounded-full border-2 border-white bg-white text-black flex-box-center items-center cursor-pointer shadow-md transition" onClick={handleDeleteLogo} >
                        <IoCloseCircle />
                    </div>

                )}
            {loading && (
                <div className="absolute inset-0 bg-white bg-opacity-60 flex justify-center items-center z-10 rounded-full">
                    <LuLoaderCircle className="animate-spin text-lg text-blue-600" />
                </div>
            )}

            <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={inputRef}
                onChange={handleImageChange}
            />
        </>
    )
}

export default RoundedImageUploader;