import React, { useState, useEffect } from "react";
import HalfYearlyPlanCard from "./HalfYearlyPlanCard";
import YearlyPlanCard from "./YearlyPlanCard";
import PublicPageTemplate from "../../templates/PublicPageTemplate";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useGetAllPlansQuery } from "@/features/api/subscriptions";
import { useDispatch, useSelector } from "react-redux";
import { setPlanId } from "@/features/globalSlice";
import CustomCarousel from "@/components/atom/carousels/CustomCarousel";

const SubscriptionPage = () => {
    const [isLoadings, setIsLoadings] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [filteredPlans, setFilteredPlans] = useState([]);
    const { data: planDetail } = useGetAllPlansQuery();

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const authUserData = JSON.parse(localStorage.getItem("authUser") || "{}");
            const instituteType = (authUserData?.instituteType || "").toLowerCase().trim();

            const filtered: any = planDetail?.filter((elem: any) => {
                const planType = (elem?.notes?.type || "").toLowerCase().trim();
                if (instituteType === "coaching") {
                    return planType === "coaching" || planType === "institute";
                }
                return planType === instituteType;
            });

            setFilteredPlans(filtered);
        }
    }, [planDetail]);

    const handleProceed = (id: string) => {
        if (id) {
            dispatch(setPlanId(id));
            router.push("/subscription/billing-confirmation");
        }
    };

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
                {/* <button type="button" className="text-sm bg-primary rounded-md text-white px-4 py-2 hover:bg-brandBlue">
                    Save Profile
                </button> */}
            </div>
            <div className="min-h-screen bg-white py-10 px-4 md:px-10 rounded-xl">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <p className="text-xs text-gray-500 font-semibold">Pricing</p>
                        <h1 className="text-lg font-semibold mt-3">Find Your Perfect Plan</h1>
                        <p className="text-sm text-gray-500 mt-5">
                            After the project launch on January 1, 2025, the following plans will be available:
                        </p>
                    </div>
                    <CustomCarousel>
                        {
                            filteredPlans && filteredPlans?.map((elem: any) => (
                                <HalfYearlyPlanCard
                                    isLoadings={isLoadings}
                                    isSelected={selectedPlan === elem?.id}
                                    onSelect={() => setSelectedPlan(elem?.id)}
                                    onProceed={() => handleProceed(elem?.id)}
                                    isDisabled={elem?.item?.name?.toLowerCase()?.includes("half-yearly")}
                                    data={elem}
                                    key={elem?.id}
                                />
                            ))
                        }
                    </CustomCarousel>
                    <p className="text-center text-gray-500 text-sm mt-10 max-w-2xl mx-auto">
                        Choose the plan that best suits your school’s requirements, and gain access to all of our powerful
                        features. Upgrade, downgrade, or cancel at any time with no hidden fees.
                    </p>
                </div>
            </div>
        </PublicPageTemplate>
    );
};

export default SubscriptionPage;
