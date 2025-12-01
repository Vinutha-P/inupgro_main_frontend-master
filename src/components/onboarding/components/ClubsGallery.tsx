"use client";
import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaPlus, FaCheckCircle } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { FiUpload } from "react-icons/fi";
import { getFirstPathSegment, Validators } from "@/utils/helper";
import OnboardingFormTemplate from "../OnboardingFormTemplate";
import RoundedButton from "@/components/atom/buttons/RoundedButton";
import { uploadImageToS3 } from "@/utils/uploadImageToS3";
import { useCreateCoachingMutation } from "@/features/api/instituteApiSlice";
import LoaderTextButton from "@/components/atom/buttons/LoaderTextButton";
import { clearMultipleLocalStorageItems } from "@/utils/localStorageClear";

type ErrorType = {
    [key: string]: string;
};

type Image = {
    link: string;
    // Add any other properties your image objects may have
};
type SubjectFeeItem = {
  subject: string;
  seats: number;
  fees: string;
  batch: string;
  duration: string;
};

const ClubsAndGallery = () => {
    const [loading, setLoading] = useState(false);
    const [skipLoader, setSkipLoader] = useState(false);
    const [galleryImages, setGalleryImages] = useState(Array(1).fill(null));
    const [selectedGalleryImg, setSelectedGalleryImg] = useState<Image[]>([]);
    const [galleryError, setGalleryError] = useState("");
    const [errors, setErrors] = useState<ErrorType[]>([]);
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

    const [createCoaching] = useCreateCoachingMutation();
    const numberOfImagesInRow = 4;

    const router = useRouter();
    // useEffect(()=>{clearMultipleLocalStorageItems("coaching")},[])

    useEffect(() => {
        try {
            const storedData = localStorage.getItem("coaching-data");
            if (!storedData) return;

            const parsedData = JSON.parse(storedData);
            const photos = parsedData?.photos;

            if (!Array.isArray(photos)) return;

            // All gallery images
            const allImages = photos;

            // Filter images with category 1 (Clubs & Gallery)
            const selectedImages = allImages.filter(
                (img: any) => Array.isArray(img.categories) && img.categories.includes(0)
            );

            // Update state
            setGalleryImages(allImages); // all photos shown in grid
            setSelectedGalleryImg(selectedImages); // only checked ones

            // Set selected indexes for checkboxes
            const indexes = selectedImages.map((img: any) =>
                allImages.findIndex((i: any) => i.link === img.link)
            );
            setSelectedIndexes(indexes);
        } catch (error) {
            console.error("Error loading gallery data from localStorage:", error);
        }
    }, []);

    const handleCheckboxChange = (index: number, isChecked: boolean) => {
        // Filter out null values from galleryImages before selecting the image
        const validGalleryImages = galleryImages.filter((img) => img !== null);
        const selectedImage = validGalleryImages[index]; // Get the selected image object

        if (isChecked) {
            if (selectedIndexes.length >= 3) {
                setGalleryError('You can only select up to 3 images.');
                return;
            }

            if (selectedIndexes.includes(index)) return;
            setSelectedGalleryImg((prev: any) => [...prev, selectedImage]);
            setSelectedIndexes((prev) => [...prev, index]);
            setGalleryError('');
        } else {
            // Remove the valid image from selectedGalleryImg state
            setSelectedGalleryImg((prev: any) => prev.filter((img: any) => img.link !== selectedImage.link));

            // Remove the index from selectedIndexes
            setSelectedIndexes((prev) => prev.filter((i) => i !== index));
            setGalleryError('');
        }
    };

    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const { url, error } = await uploadImageToS3(file, "uploads");
        if (!url) return;

        const newImage = {
            link: url,
            name: file.name,
            categories: ["Campus"],
        };
        setGalleryImages(prev => [...prev, newImage]);
        setGalleryError("");
        console.log("Uploaded successfully:", url);
    };

    const handlePreviousPage = () => router.push(`/onboarding-coaching/principal-profile`);

    const handleSkip = () => {
        setSkipLoader(true);
        setTimeout(() => {
            try {
                // router.push("/subscription/subscription-plans");
                router.push("/dashboard");
            } catch (error) {
                console.error("Navigation error:", error);
                setSkipLoader(false);
            }
        }, 0);
    };

    const handleContinue = async () => {
        if (galleryImages.filter(Boolean).length < 3) {
            setGalleryError("Please upload at least 3 photos to the gallery.");
            setLoading(false)
            return;
        }

        if (selectedIndexes.length < 3) {
            setGalleryError("Please select 3 photos to the gallery.");
            setLoading(false)
            return;
        }

        setLoading(true)
        try {
            const validGalleryImages = galleryImages.filter(Boolean); // remove any nulls
            // Create final gallery data with selected/unselected image info
            const galleryData = validGalleryImages.map((image, index) => ({
                link: image?.link,
                categories: [selectedIndexes.includes(index) ? 0 : 1],
            }));

            const existingData = JSON.parse(localStorage.getItem("coaching-data") || "{}");
            
         if (existingData.subject_fees) {
      Object.keys(existingData.subject_fees).forEach((exam) => {
        const value = existingData.subject_fees?.[exam];
        if (Array.isArray(value)) {
          const converted: { [key: string]: SubjectFeeItem } = {};
          value.forEach((item, index) => {
            converted[String(index)] = item;
          });
          existingData.subject_fees[exam] = converted;
        }
      });
    }

            const updatedData = {
                ...existingData,
                photos: galleryData,
                isActive: false
            };

            localStorage.setItem("coaching-data", JSON.stringify(updatedData));
            localStorage.setItem("form_completed", "true");
            localStorage.removeItem("onboarding_skipped");
            await createCoaching(updatedData).unwrap();
            let ldata = localStorage.getItem("payment_successfull")
            if (ldata === "true") {
                router.push("/find/institute-detail");
                localStorage.removeItem("payment_successfull")
            } else {
                router.push("/find/institute-detail")
            }

            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error("Error creating coaching:", error);
        }
    };

    return (
        <OnboardingFormTemplate>
            <div className="w-full p-4 text-deepBlue bg-white rounded-xl">
                <div className="w-full text-deepBlue">
                    <h4 className="text-md lg:text-[0.9rem] font-semibold text-left">
                        Add Institute
                    </h4>
                    <hr className="border-t border-gray-300" />
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <h5 className="text-xs font-bold mt-5">Photo Gallery</h5>

                </div>

                {/* Image Upload + First Image Row */}
                <div className="grid grid-cols-[repeat(auto-fill,_minmax(8rem,_1fr))] gap-4 mb-4">
                    {/* Upload Image Box */}
                    <div className="bg-white p-1.5 rounded-xl w-[10rem] h-[8rem] border border-dotted border-gray-300 relative">
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="gallery-upload"
                            onChange={handleImageUpload}
                        />
                        <label
                            htmlFor="gallery-upload"
                            className="flex-1 h-full flex-box-center bg-lightBlueCustom rounded-md cursor-pointer overflow-hidden"
                        >
                            <div className="w-7 h-7 rounded-full border-2 border-white bg-primaryLight flex-box-center shadow-md hover:scale-105 transition">
                                <FaPlus className="text-white text-sm" />
                            </div>
                        </label>
                    </div>

                    {/* First 4 Images */}
                    {galleryImages
                        .filter((img) => img?.link)
                        .slice(0, 4)
                        .map((image, index) => {
                            const isSelected = selectedIndexes.includes(index);
                            return (
                                <div
                                    key={`gallery-image-${index}`}
                                    onClick={() =>
                                        handleCheckboxChange(index, !selectedIndexes.includes(index))
                                    }
                                    className={`relative cursor-pointer w-full h-[8rem] rounded-xl overflow-hidden border border-dotted border-gray-300 transition`}
                                >
                                    <img
                                        src={image.link}
                                        alt={`Gallery ${index + 1}`}
                                        className={`w-full h-full object-cover rounded-md transition duration-200 ${isSelected ? "opacity-60" : ""
                                            }`}
                                    />
                                    {isSelected && (
                                        <div className="absolute inset-0 bg-black bg-opacity-20 rounded-md flex items-start justify-end p-1">
                                            <FaCheckCircle className="text-green-500 text-xl shadow-md" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                </div>

                {/* Scrollable Remaining Images */}
                <div className="max-h-[25rem] overflow-y-auto pr-1">
                    <div className="grid grid-cols-[repeat(auto-fill,_minmax(8rem,_1fr))] gap-4">
                        {galleryImages
                            .filter((img) => img?.link)
                            .slice(4)
                            .map((image, index) => {
                                const actualIndex = index + 4;
                                const isSelected = selectedIndexes.includes(actualIndex);
                                return (
                                    <div
                                        key={`gallery-image-rest-${actualIndex}`}
                                        onClick={() =>
                                            handleCheckboxChange(actualIndex, !isSelected)
                                        }
                                        className={`relative cursor-pointer w-full h-[8rem] rounded-xl overflow-hidden border border-dotted border-gray-300 transition`}
                                    >
                                        <img
                                            src={image.link}
                                            alt={`Gallery ${actualIndex + 1}`}
                                            className={`w-full h-full object-cover rounded-md transition duration-200 ${isSelected ? "opacity-60" : ""
                                                }`}
                                        />
                                        {isSelected && (
                                            <div className="absolute inset-0 bg-black bg-opacity-20 rounded-md flex items-start justify-end p-1">
                                                <FaCheckCircle className="text-green-500 text-xl shadow-md" />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                </div>

                <div className="flex justify-end mt-6 gap-5 text-xs">
                    <LoaderTextButton
                        withBackground={false}
                        fontBold={true}
                        buttonName="Skip"
                        textColor="#2E90FA"
                        textSize="0.7rem"
                        width="6rem"
                        height="2.37rem"
                        onClick={handleSkip}
                        isLoading={skipLoader}
                    />
                    <RoundedButton
                        withBackground={false}
                        buttonName="Go Back"
                        textColor="#2E90FA"
                        fontBold={true}
                        icon={FaChevronLeft}
                        width="6rem"
                        height="2.37rem"
                        onClick={handlePreviousPage}
                    />
                    <LoaderTextButton
                        withBackground={true}
                        buttonName="Save & Continue"
                        textSize="0.7rem"
                        onClick={handleContinue}
                        isLoading={loading}
                    />
                </div>
                {galleryError && (
                    <p className="text-red-600 font-semibold text-xs mt-5 text-right">{galleryError}</p>
                )}
            </div >
        </OnboardingFormTemplate >
    );
};

export default ClubsAndGallery;
