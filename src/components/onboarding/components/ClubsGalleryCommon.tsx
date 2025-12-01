"use client";
import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaPlus, FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Validators } from "@/utils/helper";
import OnboardingFormTemplate from "../OnboardingFormTemplate";
import RoundedButton from "@/components/atom/buttons/RoundedButton";
import { uploadImageToS3 } from "@/utils/uploadImageToS3";
import { CLUB_ACTIVITY_OPTIONS } from "@/utils/selectOptions/options";
import ImageUrlInput from "@/components/atom/inputs/ImageUrlInput";
import LoaderTextButton from "@/components/atom/buttons/LoaderTextButton";

type ClubsGalleryProps = {
    heading: string;
    localStorageKey: string;
    submitFunction: (data: any) => any;
    redirectPath: string;
    previousPath: string;
};

type ErrorType = {
    [key: string]: string;
};

type ClubType = {
    id: number;
    name: string;
    activities: string;
    image: string;
    description: string;
}

const initialClub: ClubType = {
    id: Date.now(),
    name: "",
    activities: "",
    image: "",
    description: "",
};

type Image = {
    link: string;
};

const ClubsAndGallery = ({
    heading,
    localStorageKey,
    submitFunction,
    redirectPath,
    previousPath
}: ClubsGalleryProps) => {
    const [loading, setLoading] = useState(false)
    const [skipLoader, setSkipLoader] = useState(false);
    const [galleryImages, setGalleryImages] = useState(Array(1).fill(null));
    const [selectedGalleryImg, setSelectedGalleryImg] = useState<Image[]>([]);
    const [clubs, setClubs] = useState<ClubType[]>([initialClub]);
    const [galleryError, setGalleryError] = useState("");
    const [errors, setErrors] = useState<ErrorType[]>([]);
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
    const [clubLoading, setClubLoading] = useState<Record<number, boolean>>({});
    const [imageLoading, setImageLoading] = useState<{ [key: number]: boolean }>({});

    const router = useRouter();

    useEffect(() => {
        const storedData = localStorage.getItem(localStorageKey);
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);

                // === CLUBS ===
                if (parsedData?.clubs && Array.isArray(parsedData.clubs)) {
                    const loadedClubs = parsedData.clubs.map((club: any, index: number) => ({
                        id: Date.now() + index,
                        name: club.clubName || "",
                        activities: "",
                        image: club.clubImage || "",
                        description: club.club_description || "",
                    }));
                    setClubs(loadedClubs.length > 0 ? loadedClubs : [initialClub]);
                }

                // === GALLERY IMAGES ===
                if (parsedData?.photos && Array.isArray(parsedData.photos)) {
                    const galleryImgs = parsedData.photos.map((photo: any, index: number) => ({
                        id: Date.now() + index,
                        link: photo.link,
                        categories: photo.categories || [],
                    }));

                    // Step 1: Set all gallery images
                    setGalleryImages(galleryImgs);

                    // Step 2: Determine pre-selected (checked) images based on categories: [0]
                    const selectedIndices = galleryImgs.reduce((acc: number[], img: any, idx: any) => {
                        if (img.categories.includes(0)) {
                            acc.push(idx);
                        }
                        return acc;
                    }, []);

                    setSelectedIndexes(selectedIndices);

                    // Step 3: Also set selected images state
                    const selectedImgs = selectedIndices.map((idx: any) => galleryImgs[idx]);
                    setSelectedGalleryImg(selectedImgs);
                }

            } catch (error) {
                console.error("Failed to parse localStorage data", error);
            }
        }
    }, [localStorageKey]);

    const handleImageLoad = (index: number) => {
        setImageLoading((prev) => ({ ...prev, [index]: false }));
    };

    const handleAddClub = () => {
        setClubs(prev => [...prev,
        { id: Date.now() + prev.length, name: "", activities: "", image: "", description: "" }]);
    }

    const handleCheckboxChange = (index: number, isChecked: boolean) => {
        const validGalleryImages = galleryImages.filter((img) => img !== null);
        const selectedImage = validGalleryImages[index]; // Get the selected image object

        if (isChecked) {
            if (selectedIndexes.length >= 3) {
                setGalleryError('You can only select up to 3 images.');
                return;
            }

            // Add the valid image to the selectedGalleryImg state
            setSelectedGalleryImg((prev: any) => [...prev, selectedImage]);

            // Add the index to selectedIndexes
            setSelectedIndexes((prev) => [...prev, index]);
            setGalleryError('');
        } else {
            // Remove the valid image from selectedGalleryImg state
            setSelectedGalleryImg((prev: any) => prev.filter((img: any) => img !== selectedImage));

            // Remove the index from selectedIndexes
            setSelectedIndexes((prev) => prev.filter((i) => i !== index));
            setGalleryError('');
        }
    };

    // useEffect(() => {
    //     if (galleryImages.length > 0) {
    //         const lastIndex = galleryImages.length - 1;

    //         if (galleryImages[lastIndex]?.link) {
    //             setImageLoading((prev) => ({
    //                 ...prev,
    //                 [lastIndex]: true,
    //             }));
    //         }
    //     }
    // }, [galleryImages]);


    const handleImageUpload = async (
        e: any,
        type: "gallery" | "club",
        index: number
    ) => {
        const file = e.target.files?.[0];
        let newIndex = index;
        if (!file) return;
        if (type === "club") {
            setClubLoading((prev: any) => ({ ...prev, [index]: true }));
        } if (type === "gallery") {
            newIndex = galleryImages.length;
            setGalleryImages((prev) => [
                ...prev,
                { link: "", name: file.name, categories: [] },
            ]);
            setImageLoading((prev) => ({ ...prev, [newIndex]: true }));
        }
        const { url, error } = await uploadImageToS3(file, "uploads");
        if (!url) {
            if (type === "gallery") {
                setImageLoading((prev) => ({ ...prev, [newIndex]: false }));
                setGalleryImages((prev) => prev.filter((_, i) => i !== newIndex));
            }
            if (type === "club") {
                setClubLoading((prev: any) => ({ ...prev, [index]: false }));
            }
            return;
        }

        if (type === "gallery") {
            setGalleryImages((prev) => {
                const updated = [...prev];
                updated[newIndex] = {
                    link: url,
                    name: file.name,
                    categories: [selectedIndexes.includes(newIndex) ? 0 : 1],
                };
                return updated;
            });
            setImageLoading((prev) => ({ ...prev, [newIndex]: false }));
            setGalleryError("");
        }
        if (type === "club") {
            try {
                handleInputChange(index, "image", url);
            }
            finally {
                setClubLoading((prev: any) => ({ ...prev, [index]: false }))
            }
        }
        console.log("Uploaded successfully:", url);
    };

    const handlePreviousPage = () => router.push(previousPath);

    const validateClub = (club: any) => {
        const errors: { name?: string; description?: string; image?: string } = {};

        if (club?.name.trim()) {
            // Validate name
            const nameError = Validators.maxLength(club?.name, 30, "Club Name");
            if (nameError) errors.name = nameError;

            // Description required + validate
            if (!club?.description.trim()) {
                errors.description = "Description is required";
            } else {
                const descError = Validators.maxLength(club?.description, 100, "Description");
                if (descError) errors.description = descError;
            }

            // Image required
            if (!club?.image) {
                errors.image = "Image is required";
            }
        }

        // If club?.name is empty, we return no errors at all
        return errors;
    };

    const handleInputChange = (index: number, field: string, value: string) => {
        const updatedClubs: any = [...clubs];
        updatedClubs[index][field] = value;
        setClubs(updatedClubs);

        setErrors(prevErrors => {
            const newErrors = [...prevErrors];
            newErrors[index] = { ...newErrors[index] };
            const isEmptyName = field === "name" && value.trim() === "";
            if (isEmptyName) {
                ["name", "description", "image"].forEach(key => {
                    delete newErrors[index][key];
                });
            } else {
                const max = field === "name" ? 30 : 200;
                const label = field === "name" ? "Club Name" : "Description";
                const fieldError = Validators.maxLength(value, max, label);

                if (fieldError) {
                    newErrors[index][field] = fieldError;
                } else {
                    delete newErrors[index][field];
                }
            }

            return newErrors;
        });
    };

    const handleSkip = () => {
        setSkipLoader(true);
        setTimeout(() => {
            try {
                // router.push("/subscription/subscription-plans");
                router.push("/dashboard");
            } catch (error) {
                console.error("ClubsAndGallery-281 ,Navigation error:", error);
                setSkipLoader(false);
            }
        }, 0);
    };

    const handleContinue = async () => {
        const errors = clubs?.map(validateClub);
        if (errors.some(({ name, description, image }) => name || description || image)) {
            setErrors(errors);
            return;
        }

        if (galleryImages.filter(Boolean).length < 3) {
            setGalleryError("Please upload at least 3 photos to the gallery.");
            return;
        }

        if (selectedIndexes.length < 3) {
            setGalleryError("Please select 3 photos to the gallery.");
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

            const clubsData = clubs?.filter(({ name }) => name.trim()).map(({ name, image, description }) => ({
                clubName: name,
                clubImage: image || "",
                club_description: description,
            }));

            const existingData = JSON.parse(localStorage.getItem(localStorageKey) || "{}");

            const updatedData = {
                ...existingData,
                clubs: clubsData,
                photos: galleryData,
                number_of_views: 34,
                admission_page: "",
                verification_status: "Unverified",
                isActive: false
            };
            setLoading(false)
            localStorage.setItem("form_completed", "true");
            localStorage.removeItem("onboarding_skipped");
            localStorage.setItem(localStorageKey, JSON.stringify(updatedData));
            const result = submitFunction(updatedData);
            await result.unwrap();
            let ldata = localStorage.getItem("payment_successfull")
            if (ldata === "true") {
                router.push(redirectPath);
                localStorage.removeItem("payment_successfull")
            } else {
                router.push(redirectPath);
            }
        } catch (error) {
            setLoading(false)
            console.error("Error creating school:", error);
        }
    };

    return (
        <OnboardingFormTemplate>
            <div className="w-full p-4 text-deepBlue bg-white rounded-xl">
                <div className="w-full text-deepBlue">
                    <h4 className="text-md lg:text-[0.9rem] font-semibold text-left">
                        Add {heading}
                    </h4>
                    <hr className="border-t border-gray-300" />
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <h5 className="text-xs font-bold mt-5">{heading} Clubs</h5>
                </div>
                {clubs?.map((club, index) => (
                    <div
                        key={club?.id}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4"
                    >
                        <div>
                            <label
                                htmlFor={`club-name-${index}`}
                                className="block text-xs font-medium text-gray-700 mb-1"
                            >
                                Club Name
                            </label>
                            <input
                                id={`club-name-${index}`}
                                type="text"
                                placeholder="Enter Club name"
                                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
                                value={club?.name}
                                onChange={(e) => handleInputChange(index, "name", e.target.value)}
                            />
                            {errors[index]?.name && <p className="text-red-500 text-xs mt-1">{errors[index].name}</p>}
                        </div>

                        <div>
                            <label
                                htmlFor={`club-activities-${index}`}
                                className="block text-xs font-medium text-gray-700 mb-1"
                            >
                                Activities
                            </label>
                            <select
                                id={`club-activities-${index}`}
                                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
                                value={club?.activities}
                                onChange={(e) => handleInputChange(index, "activities", e.target.value)}
                            >
                                {CLUB_ACTIVITY_OPTIONS.map((lang, index) => (
                                    <option key={index} value={index === 0 ? "" : lang}>
                                        {lang}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <ImageUrlInput
                            index={index}
                            name="club-image"
                            placeholder="Upload image"
                            value={clubs[index]?.image || ""}
                            onChange={handleImageUpload}
                            error={errors[index]?.image}
                            loading={clubLoading?.[index]}
                            label="Upload Image"
                            extraParams={["club", index]}
                        />

                        <div className="md:col-span-3 mt-2">
                            <label
                                htmlFor={`club-description-${index}`}
                                className="block text-[0.7rem] font-medium"
                            >
                                Write something about the club
                            </label>
                            <input
                                id={`club-description-${index}`}
                                type="text"
                                value={club?.description}
                                placeholder="Write few lines describing about the club..."
                                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-[0.7rem] focus:outline-none focus:ring-2 focus:ring-blue-200"
                                onChange={(e) => handleInputChange(index, "description", e.target.value)}
                            />
                            {errors[index]?.description && <p className="text-red-500 text-xs mt-1">{errors[index].description}</p>}
                        </div>
                    </div>
                ))}
                <h5
                    className="text-xs font-bold mt-8 text-center mb-3 cursor-pointer"
                    onClick={handleAddClub}
                    onKeyUp={(e) => e.key === "Enter" && handleAddClub()}
                >
                    + Add Additional Clubs
                </h5>

                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <h5 className="text-xs font-bold mt-5">Photo Gallery</h5>
                </div>


                {/* gallery */}
                <div>
                    {/* Upload Card Row (Fixed) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-4 mb-4">
                        <div className="bg-white p-1.5 rounded-xl flex flex-col h-[8rem] border border-dotted border-gray-300 relative">
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id="gallery-upload"
                                onChange={(e) => handleImageUpload(e, "gallery", galleryImages.length)}
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
                    </div>

                    {/* Scrollable Image Grid */}
                    <div
                        className="overflow-y-auto"
                        style={{
                            maxHeight: 'calc(2 * 8rem + 1rem)', // 2 rows * height + gap
                        }}
                    >

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4 pr-2">
                            {galleryImages?.filter(Boolean).map((image, index) => {
                                const isSelected = selectedIndexes.includes(index);
                                const isLoading = imageLoading[index];
                                return (
                                    <div
                                        key={`gallery-image-${index}`}
                                        onClick={() => handleCheckboxChange(index, !isSelected)}
                                        className="relative cursor-pointer w-full h-[8rem] rounded-xl overflow-hidden border border-dotted border-gray-300 transition"
                                    >
                                        {/* Show loader if uploading */}
                                        {isLoading && (
                                            <div className="absolute inset-0 z-10 bg-white/60 flex justify-center items-center">
                                                <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-8 h-8 animate-spin"></div>
                                            </div>
                                        )}
                                        {/* Show image only if link exists */}
                                        {image?.link && (
                                            <img
                                                src={image?.link || ""}
                                                alt={`Gallery ${index + 1}`}
                                                className={`w-full h-full object-cover rounded-md transition duration-200 ${isSelected ? "opacity-60" : ""
                                                    }`}
                                                onLoad={() => handleImageLoad(index)}
                                            />
                                        )}
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
                    {galleryError && (
                        <p className="text-red-600 font-semibold text-sm mt-2">{galleryError}</p>
                    )}
                </div>
                {/* gallery */}

                <div className="flex justify-end mt-6 gap-5 text-xs">
                    {false && (
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
                    )}
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
            </div>
        </OnboardingFormTemplate>
    );
};

export default ClubsAndGallery;
