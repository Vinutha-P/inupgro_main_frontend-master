"use client";
import React, { useEffect, useState } from "react";

const SuccessfulVideoUpload = ({
    show,
    onClose,
}: {
    show: boolean;
    onClose: () => void;
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
            const scrollY = window.scrollY;
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = "100%";

            return () => {
                const scrollY = document.body.style.top;
                document.body.style.position = "";
                document.body.style.top = "";
                document.body.style.width = "";
                window.scrollTo(0, Number.parseInt(scrollY || "0") * -1);
            };
        }
    }, [show]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-0 mt-0">
            <div
                className={`bg-white rounded-xl shadow-lg w-full max-w-lg text-center relative transform transition-all duration-300 ease-out
                    ${isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"}
                `}
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 text-2xl hover:text-gray-700"
                >
                    &times;
                </button>

                <div className="p-8">
                    <div className="flex justify-center mb-6">
                        <img
                            src="/video-upload-success.png"
                            alt="Onboarding"
                            className="w-[200px] h-auto"
                        />
                    </div>

                    <h2 className="text-xl font-bold text-deepBlue mb-2.5">
                        Thank you for upload video
                    </h2>

                    <p className="text-sm text-gray-600 mb-8">
                        Your video is being reviewed for student safety. It will be uploaded once verified by our experts.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SuccessfulVideoUpload;