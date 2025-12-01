import { useCreateCouponMutation, useGetAllCouponQuery } from "@/features/api/couponApiSlice";
import { useGetAllPlansQuery } from "@/features/api/subscriptions";
import { setCouponCode } from "@/features/globalSlice";
import { RootState } from "@/lib/store";
import { capitalize } from "@/utils/helper";
import { useRouter } from "next/router";
import React from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { LuIndianRupee } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";

const PlusSubscriptionCard = () => {
    const { data: planDetail } = useGetAllPlansQuery();
    const planId = useSelector((state: RootState) => state?.global?.planId);
    const couponCode = useSelector((state: RootState) => state?.global?.couponCode);
    const selectedPlan = planDetail?.find((plan) => plan?.id === planId);
    const {data:getCoupon} = useGetAllCouponQuery();
    const [createCoupon] = useCreateCouponMutation();
    const dispatch = useDispatch();

    if (!selectedPlan) return;

    // const handleCoupon = async() => {
    //     let localData = localStorage.getItem("authUser")
    //     if(localData){
    //     let data:any = {
    //         employeeId:JSON.parse(localData)?._id,
    //         discountPercent:"5",
    //         limit:"2",
    //     }
    //     let res = await createCoupon(data).unwrap();
    // }
    // }

    return (
        <div className="max-w-sm mx-auto bg-white p-6 pl-0">
            <div className="mb-4">
                <h2 className="text-sm text-gray-400 font-normal">Inupgro Plus Subscription</h2>
                <h3 className="text-xl font-semibold mt-2 flex items-center gap-1">
                    <LuIndianRupee size={20} /> {selectedPlan?.item?.amount}<span className="text-sm font-normal text-gray-500">/ {capitalize(selectedPlan?.period.slice(0, -2))}</span>
                </h3>
            </div>

            <div className="space-y-4 text-xs text-gray-700">
                <div className="flex justify-between">
                    <div>
                        <p className="font-medium text-darkBlue">Inupgro Plus Subscription</p>
                        <p className="text-[0.6rem] text-gray-500">Billed {selectedPlan?.period}</p>
                    </div>
                    <p className="font-medium text-gray-900">₹ {selectedPlan?.item?.amount}</p>
                </div>
                <hr className="my-4" />

                <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>₹ {selectedPlan?.item?.amount}</p>
                </div>

                <div className="flex items-center justify-between gap-2 mt-2">
                    <input
                        type="text"
                        placeholder="Enter coupon code"
                        className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
                        name="couponCode"
                        value={couponCode}
                        onChange={(e)=>dispatch(setCouponCode(e.target.value))}
                    />
                    {/* <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
                    onClick={handleCoupon}
                    >
                        Apply
                    </button> */}
                </div>

                <div className="flex justify-between items-center">
                    <p className="flex items-center gap-1">
                        Tax
                        <span className="text-gray-400 cursor-default" title="Tax will be calculated after entering address">
                            <IoInformationCircleOutline />
                        </span>
                    </p>
                    <p className="text-gray-400 text-xs">Enter address to calculate</p>
                </div>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between items-center text-base font-semibold text-gray-900">
                <p>Total due today</p>
                <p>₹ {selectedPlan?.item?.amount}</p>
            </div>
        </div>
    );
};

export default PlusSubscriptionCard;
