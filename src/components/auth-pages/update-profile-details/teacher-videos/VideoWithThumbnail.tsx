import React, { useState, useEffect } from "react";
import { FaFileVideo } from "react-icons/fa6";
import { LuImagePlus } from "react-icons/lu";
import { PiUploadSimpleBold } from "react-icons/pi";
import VideoUploadProgress from "./VideoUploadProgress";

interface VideoWithThumbnailProps {
    file: File;
    progress: number;
    uploaded: boolean;
    onThumbnailUpload: (file: File) => void;
}

const VideoWithThumbnail: React.FC<VideoWithThumbnailProps> = ({
    file,
    progress,
    uploaded,
    onThumbnailUpload,
}) => {
    const [generatedThumbnail, setGeneratedThumbnail] = useState<string | null>(null);
    const [customThumbnail, setCustomThumbnail] = useState<string | null>(null);
    const originalName = file.name;
    const extension = originalName.substring(originalName.lastIndexOf("."));
    const baseName = originalName.substring(0, originalName.lastIndexOf("."));

    const truncate = (str: string, maxLength: number) => {
        return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
    };

    const displayFileName = `${truncate(baseName, 15)}${extension}`;

    useEffect(() => {
        if (!file) return;

        const video = document.createElement("video");
        video.src = URL.createObjectURL(file);
        video.crossOrigin = "anonymous";
        video.currentTime = 1;

        video.onloadeddata = () => {
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const ctx = canvas.getContext("2d");
            ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageUrl = canvas.toDataURL("image/png");
            setGeneratedThumbnail(imageUrl);
        };
    }, [file]);

    const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setCustomThumbnail(reader.result as string);
        };
        reader.readAsDataURL(file);
        onThumbnailUpload(file);
    };

    return (
        <div className="space-y-6">
            <div
                className="relative w-full bg-blueTint !aspect-video max-h-[194px] rounded-xl flex flex-col justify-center items-center text-gray-400 text-xs text-center px-2 overflow-hidden cursor-pointer"
                onClick={() => document.getElementById('thumbnailInput')?.click()}
            >
                <input
                    type="file"
                    id="thumbnailInput"
                    accept="image/*"
                    className="hidden"
                    onChange={handleThumbnailUpload}
                />
                {customThumbnail || generatedThumbnail ? (
                    <img
                        src={(customThumbnail || generatedThumbnail) ?? undefined}
                        alt="Thumbnail"
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
                    />

                ) : (
                    <>
                        <div className="w-[68px] h-[68px] rounded-full bg-lightBlueCustom flex items-center justify-center z-10">
                            <LuImagePlus className="text-primaryLight text-2xl" />
                        </div>
                        <p className="text-xs text-[#667085] mt-3 text-center z-10">
                            Add a thumbnail image,<br />or it will be auto-generated.
                        </p>
                    </>
                )}
            </div>

            <div className="bg-blueTint rounded-xl px-3 py-3 w-full">
                <div className="flex items-center gap-4">
                    <div className="aspect-video min-w-12 bg-[#4f9ef9] rounded flex justify-center items-center overflow-hidden">
                        {generatedThumbnail ? (
                            <img src={generatedThumbnail} alt="Video thumbnail" className="w-full h-full object-cover" />
                        ) : (
                            <FaFileVideo className="text-white text-lg" />
                        )}
                    </div>

                    <div className="flex-1">
                        <p className="text-[0.7rem] text-[#667085]">File Name</p>
                        <div className="text-base font-semibold text-[#1b2a3d] truncate">{displayFileName}</div>
                    </div>
                </div>
                <div className="mt-2">
                    <p className="text-[0.6rem] mt-3 pt-1 flex items-center gap-2">
                        <PiUploadSimpleBold className="text-base" size={16} />
                        {uploaded && progress === 100 ? (
                            <span className="text-xs text-green-600 font-semibold">Uploaded 100%</span>
                        ) : (
                            <>
                                <span className="text-[#2563eb] font-medium">Uploading {progress}%</span>
                                <span className="text-gray-400"> (2 minutes left)</span>
                            </>
                        )}
                    </p>
                    <VideoUploadProgress progress={progress} />
                </div>
            </div>
        </div>
    );
};

export default VideoWithThumbnail;