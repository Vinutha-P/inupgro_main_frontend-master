"use client";
import React from "react";

const statistics = [
  {
    id: 1,
    value: "70%",
    description: "Time Saved on school applications",
  },
  {
    id: 2,
    value: "85%",
    description:
      "Students receive at least one school response in under 5 days",
  },
  {
    id: 3,
    value: "1 in 3",
    description: "Students uses both flipbooks and videos",
  },
];

const StatisticsSection = () => {
  return (
    <section className="w-full bg-[#E8F0F5] py-2">
      <div className="container mx-auto px-4">
        {/* Statistics Carousel */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12 py-4">
          {statistics.map((stat, index) => (
            <React.Fragment key={stat.id}>
              {/* Stat Item */}
              <div className="flex items-center gap-3 md:gap-4 min-w-fit">
                {/* Blue Asterisk Icon */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="flex-shrink-0"
                >
                  <path
                    d="M10 2L11.5 7.5L17 9L11.5 10.5L10 16L8.5 10.5L3 9L8.5 7.5L10 2Z"
                    fill="#3B82F6"
                  />
                </svg>

                {/* Stat Content */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-2">
                  <span className="text-[#3B82F6] text-2xl font-bold">
                    {stat.value}
                  </span>
                  <span className="text-black text-sm md:text-base">
                    / {stat.description}
                  </span>
                </div>
              </div>

              {/* Separator (only between items, not after last) */}
              {index < statistics.length - 1 && (
                <div className="hidden md:block w-px h-12 bg-gray-300"></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Images Section */}
        <div className="flex flex-col lg:flex-row items-center justify-center md:gap-20 gap-10 py-8">
          {/* 5steps.svg on the left */}
          <div className="flex-shrink-0 w-full lg:w-auto">
            <img
              src="/5steps.svg"
              alt="5 Steps"
              className="w-10/12 h-auto max-w-full object-contain"
            />
          </div>

          {/* sidecard.svg on the right with background colors */}
          <div className="flex-shrink-0 w-full lg:w-auto">
            <img
              src="/sidecard.svg"
              alt="Side Card"
              className="w-9/12 h-auto max-w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
