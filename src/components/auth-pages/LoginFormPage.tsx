import type React from "react";
import Logo from "../atom/Logo";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import PublicAuthPageTemplate from "../templates-auth-page/PublicAuthPageTemplate";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  useLoginInstituteMutation,
  useLoginMutation,
  useLoginStudentMutation,
  useLoginTeacherMutation,
} from "../../features/api/authApiSlice";
import { setCredentials } from "../../features/auth/authSlice";
import { RootState } from "../../lib/store";

const LoginFormPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [login] = useLoginMutation();
  const { role } = useSelector((state: RootState) => state.auth);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = useCallback((password: string) => {
    return password.trim().length >= 8;
  }, []);

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
    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!isValid) {
      setIsLoading(false);
      return;
    }

    try {
      let response = await login({ email, password }).unwrap();
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
        router.push("/dashboard");
      } else {
        router.push("/student/book-library");
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
              Get Started Now
            </h2>
            <p className="text-xs text-gray-700 mb-2">
              Enter your credential to access your account
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
              <div className="mt-4">
                <label
                  htmlFor="emailID"
                  className="block text-[0.7rem] font-medium"
                >
                  Email Address
                </label>
                <input
                  type="text"
                  id="emailID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="mt-1 block text-xs w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
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

              <div>
                <label
                  htmlFor="password"
                  className="block text-[0.7rem] font-medium"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
                    disabled={isLoading}
                    aria-invalid={!!passwordError}
                    aria-describedby={
                      passwordError ? "password-error" : undefined
                    }
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <FaRegEyeSlash size={16} />
                    ) : (
                      <FaRegEye size={16} />
                    )}
                  </button>
                </div>

                {passwordError && (
                  <p
                    id="password-error"
                    className="text-red-500 text-[0.7rem] mt-1"
                    role="alert"
                  >
                    {passwordError}
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="w-2.5 h-2.5"
                    disabled={isLoading}
                  />
                  <span className="text-xs">Keep me sign in</span>
                </label>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/forgot-password");
                  }}
                  className="font-semibold text-gray-800 text-xs"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center bg-gray-300 text-gray-500 font-semibold py-2 rounded-md text-xs hover:bg-blue-600 hover:text-white transition-all duration-200"
                disabled={isLoading}
                aria-label="Sign in"
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
                  "Sign In"
                )}
              </button>
            </form>

            <p className="text-[0.8rem] text-center mt-6">
              Don’t have an account?{" "}
              <span
                // onClick={() => router.push("/auth/register")}
                onClick={() => router.push("/register")}
                className="text-blue-600 font-medium cursor-pointer"
                role="link"
              >
                Sign up
              </span>
            </p>
          </div>
          <div className="w-full md:w-1/2 h-[100%]">
            <Logo className="w-[8rem] h-auto m-4  md:hidden" />
            <div className="md:w-[100%] bg-blue-600 text-white shadow-xl flex flex-col justify-start items-center pt-16 px-10 rounded-lg h-full pb-10">
              <div className="text-left w-full mb-6">
                <h2 className="text-xl font-semibold">Get Started Now</h2>
                <p className="text-xs mt-1">
                  Enter your credential to access your account
                </p>
              </div>
              {/* <div className="relative  w-full h-[600px] ">
								<Image
									src="/image-cart.png"
									alt="Example"
									width={135}
									height={165}
									className="absolute top-0 left-24 z-20 rounded-[20px]"
								/>
								<Image
									src="/card-icon.png"
									alt="Example"
									width={45}
									height={45}
									className="absolute -top-5 left-52 z-40"
								/>
								<Image
									src="/image-home.png"
									alt="Example"
									width={175}
									height={190}
									className="absolute top-20 right-40 z-10"
								/>
								<Image
									src="/home-icon.png"
									alt="Example"
									width={45}
									height={45}
									className="absolute top-16 right-36 z-40"
								/>
								<Image
									src="/student.png"
									alt="Example"
									width={130}
									height={155}
									className="absolute top-52 left-24 z-20"
								/>
								<Image
									src="/rewards.png"
									alt="Example"
									width={45}
									height={45}
									className="absolute top-48 left-20 z-40"
								/>
							</div> */}

              {/* <img
								src="/login-image.png"
								alt="Centered visual"
								className="w-64 h-auto"
							/> */}
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

export default LoginFormPage;
