import React, { useState, useRef, useEffect } from "react";
import RegisteredOnboarding from "./RegisteredOnboarding";
import { useRouter } from "next/navigation";
import {
  useResendOtpInstituteMutation,
  useResendOtpMutation,
  useResendOtpTeacherMutation,
  useVerifyEmailInstituteMutation,
  useVerifyEmailMutation,
  useVerifyEmailTeacherMutation,
} from "../../../features/api/authApiSlice";
import { setCredentials } from "../../../features/auth/authSlice";
import { useDispatch } from "react-redux";

const EmailVerification = ({
  email,
  show,
  dataId,
  otpId,
  onClose,
  onVerified,
  selectedType,
  selectedTab,
}: {
  show: boolean;
  onClose: () => void;
  onVerified: () => void;
  dataId?: any;
  otpId?: any;
  email: string;
  selectedType: string;
  selectedTab: string;
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpid, setOtpid] = useState(otpId);
  const [dataid, setDataid] = useState(dataId);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [role, setRole] = useState("");
  const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  const [verifyTeacherEmail, { isLoading: isTeacherVerifying }] =
    useVerifyEmailTeacherMutation();
  const [resendTeacherOtp, { isLoading: isTeacherResending }] =
    useResendOtpTeacherMutation();

  const [verifyInstituteEmail, { isLoading: isInstituteVerifying }] =
    useVerifyEmailInstituteMutation();
  const [resendInstituteOtp, { isLoading: isInstituteResending }] =
    useResendOtpInstituteMutation();

  useEffect(() => {
    if (resendTimer > 0) {
      timerRef.current = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError("");
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

  const getApiHandlers = () => {
    switch (selectedTab) {
      case "student":
        return {
          verify: verifyEmail,
          resend: resendOtp,
          isLoading: isVerifying || isResending,
        };
      case "teacher":
        return {
          verify: verifyTeacherEmail,
          resend: resendTeacherOtp,
          isLoading: isTeacherVerifying || isTeacherResending,
        };
      case "institute":
        return {
          verify: verifyInstituteEmail,
          resend: resendInstituteOtp,
          isLoading: isInstituteVerifying || isInstituteResending,
        };
      default:
        return {
          verify: verifyEmail,
          resend: resendOtp,
          isLoading: isVerifying || isResending,
        };
    }
  };

  const { verify, resend, isLoading } = getApiHandlers();

  const handleVerify = async (e:any) => {
    e.preventDefault();
    if (otp.some((digit) => digit === "")) {
      setError("Please enter all 4 digits of the OTP.");
      return;
    }

    if (!otpid || !dataid) {
      setError("Invalid OTP session. Please try resending the OTP.");
      return;
    }

    try {
      const response = await verify({
        otp: otp.join(""),
        otpId: otpid,
        dataId: dataid,
      }).unwrap();
      // if (!response?.success && response?.message === "Email verified successfully") {
      //   onVerified();
      // }
      if (!response?.success) {
        setError(response?.message);
        return;
      }
      dispatch(
        setCredentials({
          token: response?.results.token,
          refreshToken: response?.results.refreshToken,
          user: response?.results,
        })
      );

      if (response?.results?.role) {
        setRole(response?.results?.role);
      }

      setError("");
      setIsModalOpen(true);
      onClose();
      if(selectedTab === "institute"){
        localStorage.setItem("selected_type", selectedType);
      }

      setTimeout(() => {
        onVerified();
      }, 200);
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Failed to verify OTP. Please try again.";
      setError(errorMessage);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend || isResending) return;

    try {
      const response = await resend({
        email,
        dataId: dataid,
      }).unwrap();

      if (!response.success) {
        setError(response?.message);
        return;
      }
      setOtpid(response?.results?.otpId);
      setDataid(response?.results?.dataId);
      setResendTimer(30);
      setCanResend(false);
      setError("");
      setOtp(["", "", "", ""]);
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Failed to resend OTP. Please try again.";
      setError(errorMessage);
    }
  };

  useEffect(() => {
    const scrollY = window.scrollY;
    Object.assign(document.body.style, {
      position: "fixed",
      top: `-${scrollY}px`,
      width: "100%",
      overflowY: "scroll",
    });

    return () => {
      Object.assign(document.body.style, {
        position: "",
        top: "",
        width: "",
        overflowY: "",
      });
      window.scrollTo(0, scrollY);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex-box-center">
      <div className="bg-white p-14 rounded-xl shadow-lg w-full max-w-md text-center relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 text-xl"
          disabled={isVerifying || isResending}
          aria-label="Close verification modal"
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
          <span className="font-semibold"> {email}</span>
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
              disabled={isVerifying || isResending}
              aria-label={`OTP digit ${index + 1}`}
              aria-invalid={!!error}
              aria-describedby={error ? "otp-error" : undefined}
            />
          ))}
        </div>

        {error && (
          <p id="otp-error" className="text-xs text-red-500 mb-2" role="alert">
            {error}
          </p>
        )}

        {/* Resend */}
        <div className="text-xs text-gray-500 mb-4">
          {canResend ? (
            <button
              onClick={handleResendOtp}
              className="text-blue-600 hover:underline"
              disabled={isResending}
              aria-label="Resend OTP"
            >
              {isResending ? "Resending..." : "Resend OTP"}
            </button>
          ) : (
            <span>Resend OTP in {resendTimer}s</span>
          )}
        </div>

        <div className="flex-box-center gap-4 text-xs mt-6">
          <button
            type="button"
            className="w-36 px-6 py-1.5 rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
            onClick={onClose}
            disabled={isVerifying || isResending}
            aria-label="Cancel verification"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-36 px-6 py-1.5 flex justify-center rounded bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200"
            onClick={(e) => handleVerify(e)}
            disabled={isVerifying || isResending}
            aria-label="Verify OTP"
          >
            {isVerifying ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Verify"
            )}
          </button>
        </div>
      </div>

      {isModalOpen && (
        <RegisteredOnboarding
          onClose={() => setIsModalOpen(false)}
          show={isModalOpen}
          name={""}
        />
      )}
    </div>
  );
};

export default EmailVerification;
