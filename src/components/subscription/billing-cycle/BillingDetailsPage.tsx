import React, { useState } from "react";
import PublicPageTemplate from "../../templates/PublicPageTemplate";
import { FaChevronLeft } from "react-icons/fa";
import ConfirmBillingCycle from "./ConfirmBillingCycle";
import PlusSubscriptionCard from "./PlusSubscriptionCard"; 
import PaymentDetailCard from "./PaymentDetailCard";

const BillingDeatilsPage = () => {
    
    return (
        <PublicPageTemplate>
            <div className="flex justify-between items-center mb-6">
                <button
                    type="button"
                    className="flex items-center gap-2 text-sm text-primary rounded-md border bg-softWhite border-gray-300 px-3 py-2 hover:bg-gray-100"
                    onClick={() => window.history.back()}
                >
                    <FaChevronLeft size={14} color="#0070F0" /> Go Back
                </button>
            </div>
            <div className="min-h-screen bg-white py-10 px-4 md:px-10 rounded-xl">
                <div className="max-w-4xl mx-auto">
                    <ConfirmBillingCycle />
                </div>

                {/* Flex container to arrange cards side by side */}
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row md:space-x-12 space-y-6 md:space-y-0 mt-6">
                        <div className="flex-1">
                            <PlusSubscriptionCard />
                        </div>
                        <div className="flex-1">
                            <PaymentDetailCard />
                        </div>
                    </div>
                </div>
            </div>
        </PublicPageTemplate>
    );
};

export default BillingDeatilsPage;
