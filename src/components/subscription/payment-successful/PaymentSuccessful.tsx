import PublicPageTemplate from "@/components/templates/PublicPageTemplate";
import { RootState } from "@/lib/store";
import { formatDateWithTime } from "@/utils/helper";
import React from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { LuIndianRupee } from "react-icons/lu";
import { useSelector } from "react-redux";

interface PaymentSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDownload?: () => void;
}

const PaymentSuccessful: React.FC<PaymentSuccessModalProps> = ({
    isOpen,
    onClose,
    onDownload,
}) => {
    const subscription = useSelector((state: RootState) => state?.global?.subscriptionDoc);
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center text-center">
            <div className="bg-white p-14 rounded-xl shadow-lg w-full max-w-md text-center relative flex flex-col items-center justify-center">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 text-xl"
                >
                    &times;
                </button>
                <div className="flex justify-center mb-6">
                    <FaRegCircleCheck className="text-green-500" size={75} color="#12B76A" />
                </div>

                <h2 className="text-xl text-darkBlue font-semibold mt-2">Payment Successful</h2>
                <p className="text-darkBlue">The payment has been done successfully.</p>

                <div className="text-3xl text-darkBlue font-medium my-2 flex items-center gap-1">
                    {subscription?.amount ?
                        <>
                            <LuIndianRupee size={30} /> {subscription?.amount}
                        </>
                        : ""
                    }
                </div>

                <div className="text-sm text-gray-400 font-semibold mb-3">
                    Payment ID:{`${subscription?.planId ? `${subscription?.planId}, ` : "NA"}`}
                    {subscription?.createdAt ? formatDateWithTime(subscription?.createdAt) : ""}
                </div>

                <button type="button" className="flex items-center px-4 py-2 text-gray-400 font-semibold text-md border border-gray-300 rounded hover:bg-gray-200 transition">
                    <img src="https://img.icons8.com/color/20/pdf.png" alt="PDF" className="mr-2" />
                    Download Invoice
                </button>
                {/* </div> */}
            </div>
        </div>
    );
};

export default PaymentSuccessful;
