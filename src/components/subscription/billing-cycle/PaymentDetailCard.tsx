import { useChangeStatusToActiveMutation } from "@/features/api/commonApiSlice";
import { useCreateSubscriptionMutation, useGetAllPlansQuery } from "@/features/api/subscriptions";
import { setSubscriptionDoc, setType, setUserId } from "@/features/globalSlice";
import { RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaymentSuccessful from "../payment-successful/PaymentSuccessful";
import { paymentValidationSchema } from "@/utils/paymentValidation";
import { capitalize } from "@/utils/helper";

const PaymentDetailCard = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [emailData, setEmailData] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    // const id = useSelector((state: RootState) => state?.global?.paramId);
    const planId = useSelector((state: RootState) => state?.global?.planId);
    const userID = useSelector((state: RootState) => state?.global?.userId);
    const type_name = useSelector((state: RootState) => state?.global?.type);
    const couponCode = useSelector((state: RootState) => state?.global?.couponCode);
    const [createSubscription] = useCreateSubscriptionMutation();
    const [changeStatus] = useChangeStatusToActiveMutation();

    const [formData, setFormData] = useState({
        cardNumber: "",
        expiryDate: "",
        cvc: "",
        cardholderName: "",
        country: "",
        address: "",
        phone: "",
    });
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [generalError, setGeneralError] = useState<string>("");

    useEffect(() => {
        try {
            const instituteData = localStorage.getItem("institute-register");
            const authUserData = localStorage.getItem("authUser");

            const data = instituteData || authUserData;
            if (data) {
                const parsedData = JSON.parse(data);
                setEmailData(parsedData?.email || "");
            }
        } catch (err) {
            console.error("Failed to parse user data:", err);
            setEmailData("");
        }
    }, [])

    const validateField = (name: string, value: string): string => {
        const rule = paymentValidationSchema[name];
        if (!rule) return "";

        if (rule.required && !value.trim()) {
            return "This field is required";
        }
        if (value && rule.regex && !rule.regex.test(value)) {
            return rule.errorMessage;
        }
        return "";
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};
        const missingFields: string[] = [];
        Object.entries(formData).forEach(([key, val]) => {
            const error = validateField(key, val);
            if (error) {
                newErrors[key] = error;
                if (paymentValidationSchema[key]?.required) {
                    missingFields.push(key);
                }
            }
        });
        setErrors(newErrors);
        if (missingFields.length > 0) {
            if (missingFields.length <= 3) {
                const formattedMissing = missingFields.join(", ");
                setGeneralError(` ${capitalize(formattedMissing)} fields are required`);
            } else {
                setGeneralError("All fields are required");
            }
            return false;
        } else {
            setGeneralError("");
            return true;
        }

    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Validate on change and update error immediately
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
        setGeneralError("");
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { value } = e.target;

        // Remove non-digit and slash characters
        value = value.replace(/[^\d]/g, "");

        if (value.length >= 3) {
            value = `${value.slice(0, 2)} / ${value.slice(2, 4)}`;
        }

        setFormData((prev) => ({
            ...prev,
            expiryDate: value
        }));

        setErrors((prev) => ({
            ...prev,
            expiryDate: validateField("expiryDate", value)
        }));
        setGeneralError("");
    };

    const handleStatusChange = async () => {
        try {
            const type = localStorage.getItem("authInstituteType");
            const savedData = localStorage.getItem("institute-register");
            const parsedData = savedData ? JSON.parse(savedData) : null;
            const id = parsedData?._id;
            if (!type) return;
            if (!savedData) return;

            dispatch(setType(type));
            const payload = { id, type };
            await changeStatus(payload).unwrap();
        } catch (err) {
            console.error("Subscription creation failed", err);
        }
    };

    const handleSubscribe = async () => {
        if (!validateForm()) return;
        setLoading(true)

        try {
            const res = await createSubscription({ planId, couponCode }).unwrap();
            const docData = res?.results?.subscription;
            if (docData) {
                dispatch(setSubscriptionDoc(docData));
                dispatch(setUserId(docData?.userId));
                handleStatusChange()
            }
            setModalOpen(true)
            setLoading(false)
        } catch (err) {
            console.error("Subscription creation failed", err);
            setModalOpen(false)
            setLoading(false)
        }
    };

    const handleClose = () => {
        router.push(`/dashboard`);
        setModalOpen(false);
        localStorage.setItem("payment_successfull", "true")
        let data = localStorage.getItem("institute-register");
        if (!type_name || !userID) return console.warn("Missing type_name or userID");
        const routeMap: any = {
            school: "school-detail",
            college: "college-detail",
            coaching: "coaching-detail",
        };

        const type = routeMap[type_name.toLowerCase()] || "school-detail";
    };

    return (
        <>
            <div className="max-w-xl mx-auto p-8 pr-0 bg-white">
                <div className="mb-5">
                    <h2 className="text-sm font-normal text-gray-600 mb-4">Contact information</h2>
                    <div className="flex items-center justify-between rounded-md border border-gray-300 p-2 bg-gray-100 shadow-sm">
                        <span className="text-gray-600 text-xs">Email</span>
                        <span className="font-normal text-xs">{emailData && emailData}</span>
                    </div>
                </div>
                <h2 className="text-sm font-semibold text-gray-800">Payment method</h2>
                <div className="mt-3">
                    <h3 className="text-[0.7rem] font-medium text-gray-700">Card information</h3>
                    <div className="rounded-lg border border-gray-300 overflow-hidden w-full shadow-sm">

                        <div className="relative">
                            <input
                                type="text"
                                name="cardNumber"
                                value={formData?.cardNumber}
                                onChange={handleChange}
                                placeholder="1234 1234 1234 1234"
                                className="w-full pr-20 px-3 py-1.5 text-xs font-medium text-gray-800 border-b border-gray-300 focus:outline-none"
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-1">
                                <img src="/visa.png" alt="Visa" className="h-4 w-auto rounded-md" />
                                <img src="/mastercard.png" alt="MasterCard" className="h-4 w-auto rounded-sm" />
                                <img src="/amex.png" alt="Amex" className="h-4 w-auto rounded-sm" />
                                <img src="/unionpay.png" alt="RuPay" className="h-4 w-auto rounded-sm" />
                            </div>
                        </div>

                        <div className="flex">
                            <input
                                type="text"
                                name="expiryDate"
                                value={formData?.expiryDate}
                                onChange={handleExpiryChange}
                                placeholder="MM / YY"
                                className="flex-1 px-3 py-1.5 text-xs text-gray-700 border-r border-gray-300 focus:outline-none"
                            />
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    name="cvc"
                                    value={formData?.cvc}
                                    onChange={handleChange}
                                    placeholder="CVC"
                                    className="w-full pr-8 px-3 py-1.5 text-xs text-gray-700 focus:outline-none"
                                />
                                <img
                                    src="/cvv.png"
                                    alt="CVC"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-[0.7rem] font-medium text-gray-700 mt-4">Cardholder name</p>
                <div className="rounded-lg border border-gray-300 overflow-hidden w-full shadow-sm">

                    <input
                        type="text"
                        name="cardholderName"
                        value={formData?.cardholderName}
                        onChange={handleChange}
                        placeholder="Full name on card"
                        className="w-full px-3 py-1.5 text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <h3 className="text-[0.7rem] font-medium text-gray-700 mt-4">Billing address</h3>
                <div className="rounded-lg border border-gray-300 overflow-hidden w-full shadow-sm">

                    <select
                        name="country"
                        value={formData?.country}
                        onChange={handleChange}
                        className="w-full px-3 py-1.5 text-xs font-medium text-gray-800 border-b border-gray-300 focus:outline-none appearance-none bg-white"
                    >
                        <option value="" disabled>Select Country</option>
                        <option value="us">United States</option>
                        <option value="in">India</option>
                        <option value="uk">United Kingdom</option>
                        <option value="au">Australia</option>
                    </select>
                    <input
                        type="text"
                        name="address"
                        value={formData?.address}
                        onChange={handleChange}
                        placeholder="Address"
                        className="w-full px-3 py-1.5 text-xs font-medium text-gray-800 focus:outline-none"
                    />
                </div>
                <button className="text-xs underline">Enter address manually</button>
                <div className="rounded-lg border border-gray-300 w-full p-0 space-y-1 mt-5">
                    <p className="text-xs text-gray-700 px-2 pt-2">
                        Securely save my information for 1-click checkout
                    </p>
                    <p className="text-xs text-gray-600 border-b border-gray-200 px-2 pb-2">
                        Enter your phone number to create a Link account and pay faster on l'image.
                        Click and everywhere Link is accepted.
                    </p>
                    <div className="flex items-center space-x-0">
                        <div className="relative w-full">
                            <span className="absolute left-2 top-1/2 -translate-y-1/2">
                                <img src="/flag.png" alt="Phone" className="h-4 w-5" />
                            </span>
                            <input
                                type="tel"
                                name="phone"
                                value={formData?.phone}
                                onChange={handleChange}
                                placeholder="[800] 555-0175"
                                className=" ml-2 pl-7 py-1.5 text-xs font-medium text-gray-800 focus:outline-none"
                            />
                        </div>
                        <button className="text-xs border border-gray-300 px-1 py-0.5 rounded text-gray-600 ml-2">
                            Optional
                        </button>
                    </div>
                </div>
                <div className="my-5 text-sm text-gray-500">
                    <div className="flex items-start space-x-2">
                        <input
                            type="checkbox"
                            id="useLink"
                            className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <p className="text-xs leading-snug">
                            You'll be charged the amount and at the frequency listed above until you cancel.
                            We may change our prices as described in our <span className="underline">Terms of Use</span>. You can <span className="underline">cancel any time</span>.
                            By subscribing, you agree to l'image's <span className="underline">terms of service</span> and <span className="underline">Privacy Policy</span>.
                        </p>
                    </div>
                </div>
                {generalError && (
                    <p className="text-red-600 text-xs font-semibold mt-2">{generalError}</p>
                )}
                <button
                    type="button"
                    disabled={loading}
                    onClick={handleSubscribe}
                    className="w-full bg-success text-white py-2 px-4 rounded-md font-light">
                    <div className="flex items-center justify-center gap-2">
                        {loading && (
                            <div className="border-2 border-t-2 border-gray-200 border-t-primaryLight w-5 h-5 rounded-full animate-spin mr-2"></div>
                        )}
                        <span>
                            Subscribe
                        </span>
                    </div>
                </button>
                <div className="mt-6 text-center text-xs text-gray-500">
                    <p className="flex justify-center items-center space-x-1">
                        <span>Powered by </span>
                        <img
                            src="/Logo_Header.png"
                            alt="Company Logo"
                            className="h-3"
                        />
                        <span>| Terms · Privacy</span>
                    </p>
                </div>

            </div>
            <PaymentSuccessful
                isOpen={isModalOpen}
                onClose={() => handleClose()}
                onDownload={() => console.log("Download Invoice")}
            />
        </>
    );
};

export default PaymentDetailCard;