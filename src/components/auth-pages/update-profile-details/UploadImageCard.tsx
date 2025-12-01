'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';

const UploadImageCard: React.FC = () => {
    const [message, setMessage] = useState<string>('Click the image or button below to upload a video.');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setMessage(`Selected video: ${file.name}`);
        } else {
            setMessage('No file selected.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center mt-12">
            <div className="mb-6 cursor-pointer" onClick={handleUploadClick}>
                <Image
                    src="/upload-video.png"
                    alt="Upload"
                    width={290}
                    height={260 }
                />
            </div>

            <p className="text-sm text-gray-600 text-center max-w-md">{message}</p>

            <button
                onClick={handleUploadClick}
                className="mt-4 bg-blue-500 text-white text-sm px-4 py-2 rounded"
            >
                Upload Video
            </button>

            <input
                type="file"
                accept="video/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );
};

export default UploadImageCard;
