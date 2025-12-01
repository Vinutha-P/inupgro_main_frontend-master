import type React from "react";
import Logo from "../atom/Logo";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PublicAuthPageTemplate from "../templates-auth-page/PublicAuthPageTemplate";
import Image from "next/image";
import { useDispatch } from "react-redux";
import {
    useLoginInstituteMutation,
    useLoginStudentMutation,
    useLoginTeacherMutation,
} from "../../features/api/authApiSlice";
import { setCredentials } from "../../features/auth/authSlice";

const ResetPasswordPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [email, setEmail] = useState<any>("");
    const [role, setRole] = useState<'Teacher' | 'Student' | 'Institution'>('Student');
    const [emailError, setEmailError] = useState("");
    const [apiError, setApiError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [loginTeacher] = useLoginTeacherMutation();
    const [loginStudent] = useLoginStudentMutation();
    const [loginInstitute] = useLoginInstituteMutation();

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setApiError("");
        setIsLoading(true);

        // Validate inputs
        let isValid = true;
        if (!validateEmail(email)) {
            setEmailError("Invalid email format");
            isValid = false;
        } else {
            setEmailError("");
        }

        if (!isValid) {
            setIsLoading(false);
            return;
        }

        try {
            let response: any;
            if (role === "Teacher") {
                response = await loginTeacher({ email }).unwrap();
            } else if (role === "Institution") {
                response = await loginInstitute({ email }).unwrap();
            } else {
                response = await loginStudent({ email }).unwrap();
            }

            // Store token, refreshToken, and full user profile in Redux
            console.log("response.user.role", response.user.role);
            dispatch(
                setCredentials({
                    token: response.token,
                    refreshToken: response.refreshToken,
                    user: response.user,
                })
            );

            // Redirect to appropriate page
            if (role === "Teacher") {
                router.push("/teacher/profile");
            } else if (role === "Institution") {
                router.push("/institute-profile");
            } else {
                router.push("/student/profile");
            }
        } catch (error: any) {
            const errorMessage =
                error?.message ||
                error?.data?.message ||
                "Invalid email or password. Please try again.";
            setApiError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PublicAuthPageTemplate>
            <div className=" bg-white p-2 lg:p-0 md:h-[calc(100vh-80px)] ">
                <div className="flex flex-col-reverse md:flex-row w-full md:pt-[5%] lg:w-[80%] mx-auto">
                    <div className="md:w-1/2 flex flex-col gap-2 lg:px-20 pt-4 p-2 bg-gray-100 rounded-lg shadow-lg pb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mt-12">
                            Reset Password
                        </h2>
                        <p className="text-xs text-gray-700 mb-2">
                            Enter your new password.
                        </p>

                        {apiError && (
                            <div
                                className="text-red-500 text-[0.7rem] mb-4 text-center"
                                role="alert"
                            >
                                {apiError}
                            </div>
                        )}

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {/* Role Selection */}
                            {/* <div className="mb-4">
                                <label htmlFor="roleSelect" className="block text-sm font-medium mb-2">
                                    Login as
                                </label>
                                <select
                                    id="roleSelect"
                                    value={role}
                                    onChange={(e: any) =>
                                        setRole(
                                            e.target.value as "Teacher" | "Student" | "Institution"
                                        )
                                    }
                                    className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Student">Student</option>
                                    <option value="Teacher">Teacher</option>
                                    <option value="Institution">Institution</option>
                                </select>
                            </div> */}
                            <div className="mt-4">
                                <label
                                    htmlFor="emailID"
                                    className="block text-[0.7rem] font-medium"
                                >
                                    Enter new password
                                </label>
                                <input
                                    type="text"
                                    id="emailID"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter new password"
                                    className="mt-1 mb-9 block text-xs w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    disabled={isLoading}
                                    aria-invalid={!!emailError}
                                    aria-describedby={emailError ? "emailID-error" : undefined}
                                />

                                {emailError && (
                                    <p
                                        id="emailID-error"
                                        className="text-red-500 text-[0.7rem] mt-1"
                                        role="alert"
                                    >
                                        {emailError}
                                    </p>
                                )}

                                <label
                                    htmlFor="emailID"
                                    className="block text-[0.7rem] font-medium"
                                >
                                    Re-enter new password
                                </label>
                                <input
                                    type="text"
                                    id="emailID"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Re-enter new password"
                                    className="mt-1 mb-9 block text-xs w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    disabled={isLoading}
                                    aria-invalid={!!emailError}
                                    aria-describedby={emailError ? "emailID-error" : undefined}
                                />

                                {emailError && (
                                    <p
                                        id="emailID-error"
                                        className="text-red-500 text-[0.7rem] mt-1"
                                        role="alert"
                                    >
                                        {emailError}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full flex justify-center bg-gray-300 text-gray-500 font-semibold py-2 rounded-md text-xs hover:bg-blue-600 hover:text-white transition-all duration-200"
                                disabled={isLoading}
                                aria-label="Save password"
                            >
                                {isLoading ? (
                                    <svg
                                        className="animate-spin h-5 w-5 text-gray-500"
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
                                    "Save password"
                                )}
                            </button>
                        </form>

                        <p className="text-[0.8rem] text-center mt-6">
                            Remember your password?{" "}
                            <a
                                href="/login"
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push("/login");
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        router.push("/login");
                                    }
                                }}
                                tabIndex={0}
                                className="text-blue-600 font-medium cursor-pointer"
                            >
                                Login
                            </a>
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 h-[100%]">
                        <Logo className="w-[8rem] h-auto m-4  md:hidden" />
                        <div className="md:w-[100%] bg-blue-600 text-white shadow-xl flex flex-col justify-start items-center pt-16 px-10 rounded-lg h-full pb-10">
                            <div className="text-left w-full mb-6">
                                <h2 className="text-xl font-semibold">Reset Password</h2>
                                <p className="text-xs mt-1">
                                    Enter your new password.
                                </p>
                            </div>

                            <Image
                                src="/login-image.png"
                                alt="Centered visual"
                                width={256}
                                height={0}
                                className="h-auto"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </PublicAuthPageTemplate>
    );
};

export default ResetPasswordPage;
