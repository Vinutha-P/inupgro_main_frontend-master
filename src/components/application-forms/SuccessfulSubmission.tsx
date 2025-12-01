"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SuccessfulSubmission = ({
    name,
    show,
    onClose,
}: {
    show: boolean;
    onClose: () => void;
    name: string;
}) => {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);

    const handleGoHome = () => {
        router.push("/find");
    };

    const handleExploreSchools = () => {
        onClose();
        router.push("/find");
    };

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
        <div className="fixed inset-0 z-50 bg-opacity-50 flex items-center justify-center p-4 mt-60">
            <div
                className={`bg-white rounded-xl shadow-lg w-full max-w-2xl text-center relative transform transition-all duration-300 ease-out
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
                    <h2 className="text-xl font-bold text-deepBlue mb-6">
                        Your application is successfully submitted!
                    </h2>

                    <div className="flex justify-center mb-6">
                        <img
                            src="/onboarding-image.png"
                            alt="Onboarding"
                            className="w-[200px] h-auto"
                        />
                    </div>

                    <p className="text-sm text-gray-700 mb-3">
                        Welcome, <span className="font-semibold">{name}</span> to <strong>INUPGRO</strong>.<br />
                        Your profile has been created successfully.
                    </p>

                    <p className="text-sm text-gray-600 mb-8">
                        You can now easily apply to any school on our platform. A new password has been sent to<br />
                        anaaya.s@gmail.com. You can <span className="text-blue-600 font-medium cursor-pointer">change password</span> in your profile settings.
                    </p>

                    <div className="flex justify-center gap-4">
                        <button
                            type="button"
                            className="px-6 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm"
                            onClick={handleGoHome}
                        >
                            Go To Home
                        </button>
                        <button
                            type="button"
                            className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition text-sm"
                            onClick={handleExploreSchools}
                        >
                            Explore More Schools
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessfulSubmission;