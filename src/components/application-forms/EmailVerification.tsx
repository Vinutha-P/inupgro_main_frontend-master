import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const EmailVerification = ({
	show,
	onClose,
	onPrevious,
	onNext,
	formData
}: {
	show: boolean;
	onClose: () => void;
	onVerified: () => void;
	email: string;
	selectedType: string;
	onPrevious: () => void;
	onNext: (data: { otp: string[]; setOtpError?: React.Dispatch<React.SetStateAction<string>> }) => void;
	formData: any;
}) => {
	const [otp, setOtp] = useState(["", "", "", ""]);
	const [otpError, setOtpError] = useState("");
	const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
	const [isVisible, setIsVisible] = useState(false);
	const parentEmail = formData?.parents?.email;

	const handleChange = (index: number, value: string) => {
		if (/^[0-9]?$/.test(value)) {
			const newOtp = [...otp];
			newOtp[index] = value;
			setOtp(newOtp);
			setOtpError("");
			if (value && index < 3) {
				inputRefs.current[index + 1]?.focus();
			}
		}
	};

	const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
		if (e.key === "Backspace" && !otp[index] && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}
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
		<div className="fixed inset-0 z-50 bg-opacity-50 flex items-center justify-center p-4 mt-52">
			<div
				className={`bg-white rounded-xl shadow-lg w-full py-10 max-w-md text-center relative transform transition-all duration-300 ease-out
                    ${isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"}
                `}
			>

				<button
					type="button"
					onClick={onClose}
					className="absolute top-3 right-3 text-gray-500 text-xl"
				>
					&times;
				</button>

				<div className="flex justify-center mb-10">
					<div className="w-[120px] h-[120px] rounded-full bg-blue-100 flex-box-center">
						<img
							src="/security_verify_email.png"
							alt="Logo"
							className="w-12 h-12 object-contain"
						/>
					</div>
				</div>

				<h2 className="text-md font-semibold mb-2">Verify email address</h2>
				<p className="text-xs text-deepBlue mb-4">
					Please verify your email address by entering the OTP sent to
					<span className="font-semibold"> {parentEmail}</span>
				</p>

				<div className="flex justify-center gap-4 mb-2">
					{otp.map((digit, index) => (
						<input
							placeholder="-"
							key={index}
							ref={(el) => {
								if (el) inputRefs.current[index] = el;
							}}
							type="text"
							value={digit}
							onChange={(e) => handleChange(index, e.target.value)}
							onKeyDown={(e) => handleKeyDown(index, e)}
							maxLength={1}
							className="w-14 h-14 text-center text-lg font-semibold border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					))}
				</div>

				{otpError && (
					<p className="text-red-500 text-xs mt-2">{otpError}</p>
				)}

				<div className="flex-box-center gap-4 text-xs mt-6">
					<button
						type="button"
						className="w-36 px-6 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
						onClick={onPrevious}
					>
						Previous
					</button>
					<button
						type="submit"
						className="w-36 px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200"
						onClick={() => onNext({ otp, setOtpError })}
					>
						Verify
					</button>
				</div>
			</div>
		</div>
	);
};

export default EmailVerification;
