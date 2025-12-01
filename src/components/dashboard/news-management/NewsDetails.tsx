"use client"; // use "use client" only if you're in `app` directory

import React from "react";
import NewsDetailsHeader from "./NewsDetailsHeader";

// Decode escaped HTML
function decodeHTML(html: string) {
    return html
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");
}

export default function NewsDetails({ details }: any) {
    let status = details?.status;

    // Step 1: Decode HTML entities
    const decodedDescription = decodeHTML(details?.description || "");

    // Step 2: Extract ALL <img src="..."> matches
    const imageRegex = /<img[^>]+src="([^">]+)"/g;
    let match;
    const imageUrls: string[] = [];

    while ((match = imageRegex.exec(decodedDescription)) !== null) {
        imageUrls.push(match[1]);
    }

    // Step 3: Remove all <img> and <br> tags
    const cleanedDescription = decodedDescription
        .replace(/<img[^>]*>/g, "")
        .replace(/<br\s*\/?>/gi, "");

    return (
        <div className="p-6 bg-white min-h-screen">
            <NewsDetailsHeader status={status} />

            {/* Title and Subtitle */}
            <div className="mb-4">
                <h2 className="text-lg font-bold">
                    {details?.title || "NA"}
                </h2>
                {/* <p className="text-sm text-gray-600">
                    {cleanedDescription || "NA"}
                </p> */}
                <p
                    className="text-sm text-gray-600"
                    dangerouslySetInnerHTML={{ __html: cleanedDescription || "NA" }}
                />
                <div className="flex gap-4 mt-1 text-xs text-gray-500">
                    <span>{details?.name || "NA"}</span>
                    <span className="mx-1">•</span>
                    <span>{details?.location || "NA"}</span>
                </div>
            </div>

            {/* Render all images */}
            {imageUrls.length > 0 ? (
                imageUrls.map((url, index) => (
                    <div
                        key={index}
                        className="bg-gray-200 h-56 w-full rounded-md mb-6 overflow-hidden"
                    >
                        <img
                            src={url}
                            alt={`News Image ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))
            ) : (
                <div className="bg-gray-200 h-56 w-full rounded-md mb-6" />
            )}
            {/* <div className="bg-gray-200 h-56 w-full rounded-md mb-6" /> */}

            {/* First Section Content */}
            {/* <div className="mb-6">
                <h2 className="text-base font-bold mb-1">
                    Lorem Ipsum Dolor Sit Amet Consectetur. Elementum.
                </h2>
                <p className="text-sm text-gray-700">
                    Lorem ipsum dolor sit amet consectetur. Cursus potenti amet eget neque. A odio morbi amet
                    viverra tellus. Augue malesuada odio ornare nibh tristique pharetra eu vestibulum. Id
                    elit odio pulvinar commodo lacus morbi. Neque eget massa tempus malesuada volutpat. Nec
                    nunc diam viverra accumsan at orci. Sed tristique sit proin aliquam. Ornare porttitor
                    facilisi non in et quis id sagittis. Massa tortor nisi eget orci malesuada scelerisque
                    nullam pellentesque. Vel aliquam proin mi elementum. Netus nascetur ut nibh aliquet sit eu
                    est ut. <br />
                    Maecenas sit iaculis id vel scelerisque. Aliquet maecenas venenatis potenti at ornare eget
                    egestas tellus blandit.
                </p>
            </div> */}

            {/* Second Image Placeholder */}
            {/* <div className="bg-gray-200 h-56 w-full rounded-md mb-6" /> */}

            {/* Second Section Content */}
            {/* <div>
                <h2 className="text-base font-bold mb-1">
                    Lorem Ipsum Dolor Sit Amet Consectetur. Elementum.
                </h2>
            </div> */}
        </div>
    );
}
