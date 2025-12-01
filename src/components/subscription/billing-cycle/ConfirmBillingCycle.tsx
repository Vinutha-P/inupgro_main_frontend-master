import Carousels from "@/components/atom/carousels/Carousels";
import CustomCarousel from "@/components/atom/carousels/CustomCarousel";
import { useGetAllPlansQuery } from "@/features/api/subscriptions";
import { setPlanId } from "@/features/globalSlice";
import { RootState } from "@/lib/store";
import { capitalize } from "@/utils/helper";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuIndianRupee } from "react-icons/lu";
import { FaRegCircleCheck } from "react-icons/fa6";

const ConfirmBillingCycle = () => {
    const dispatch = useDispatch();
    const { data: planDetail } = useGetAllPlansQuery();
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [filteredPlans, setFilteredPlans] = useState([]);
    const planId = useSelector((state: RootState) => state?.global?.planId);

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

    useEffect(() => {
        if (planId) {
            setSelectedPlan(planId);
        }
    }, [planId]);

    const handleSelect = (id: string) => {
        setSelectedPlan(id);
        dispatch(setPlanId(id));
    };
    return (
        <div className="max-w-4xl mx-auto  py-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">Confirm your billing cycle</h2>
            <p className="text-sm text-gray-500 mb-6">
                <span className="text-green">Save ₹12000/Year</span> when you select annual billing cycle
            </p>

            <Carousels>
                {filteredPlans && filteredPlans?.map((plan: any) => {
                    const isSelected = planId === plan.id;
                    const features = plan?.notes?.features?.split(",") || [];
                    return (
                        <div
                            key={plan.id}
                            onClick={() => handleSelect(plan.id)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    handleSelect(plan.id);
                                }
                            }}
                            className={`w-64 bg-white rounded-xl border p-5 transition-all duration-200
                                ${isSelected ? "border-b-4 border-b-green shadow-lg" : "border-gray-300"}
                                ${plan?.item?.name?.toLowerCase()?.includes("half-yearly") ? "opacity-60 cursor-not-allowed pointer-events-none" : "cursor-pointer"}`
                                // sm:min-h-[150px] lg:min-h-[170px]`
                            }

                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {/* Modified Radio Circle - No inner fill */}
                                    <div
                                        className={`w-5 h-5 rounded-full border-4 flex items-center justify-center
                                        ${isSelected ? "border-green" : "border-gray-300"}`}
                                    />
                                    <h3 className="text-sm font-semibold text-gray-800">{plan?.item?.name}</h3>
                                </div>

                                {plan.isBest && (
                                    <span className="text-xs bg-green text-white font-medium px-2 py-0.5 rounded">
                                        Best offer
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-gray-500 mt-2">{plan?.item?.description}</p>
                            <div className="mt-4">
                                <p className="text-lg font-semibold text-gray-900 flex items-center"><LuIndianRupee size={20} />{plan?.item?.amount}</p>
                            </div>
                            <div className="flex flex-col gap-2 mt-3">
                                {features?.map((feature: string, idx: number) => (
                                    <div key={idx} className="flex items-start gap-2">
                                        <span className="text-green-600 pt-1">
                                            <FaRegCircleCheck color="#12B76A" size={15} />
                                        </span>
                                        <p className="text-[0.7rem]">{feature}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </Carousels>
        </div>
    );
};

export default ConfirmBillingCycle;