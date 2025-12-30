import Image from "next/image";
import React from "react";

const jobDetails = [
  { icon: "/job-post.png", label: "Job Posted:", value: "14 June, 2021" },
  { icon: "/Timer.png", label: "Job Expire In:", value: "14 July, 2021" },
  { icon: "/briefcase.png", label: "Education:", value: "Graduation" },
  { icon: "/Wallet.png", label: "Salary:", value: "₹50k - 80k/month" },
  { icon: "/locations.png", label: "Location:", value: "Jaipur" },
  { icon: "/Wallet.png", label: "Job Type:", value: "Full Time" },
  { icon: "/Wallet.png", label: "Experience:", value: "2–5 Years" },
];

const JobOverviewCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {jobDetails.map((item, index) => (
        <div
          className="group p-2 rounded-xl border border-gray-100 hover:border-[#2E90FA]/30 hover:shadow-md transition-all duration-200 bg-white hover:bg-gray-50/50 cursor-default"
          key={index}
        >
          <div className="flex flex-col items-center justify-center">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#E8F1FF] flex items-center justify-center mb-3 group-hover:bg-[#2E90FA]/10 group-hover:scale-105 transition-all duration-200">
              <Image
                src={item.icon}
                alt={item.label}
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
            <p className="text-[#767F8C] text-xs font-medium mb-1.5">
              {item.label}
            </p>
            <p className="text-[#18191C] text-xs font-semibold leading-tight">
              {item.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobOverviewCard;
