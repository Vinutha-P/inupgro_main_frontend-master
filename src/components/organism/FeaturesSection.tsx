"use client";
import React, { useRef } from "react";

const features = [
  {
    id: 1,
    title: "One-time Document Upload",
    description: "Apply to multiple schools without resubmitting documents.",
    image: "/image.svg",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#3B82F6" />
        <path
          d="M12 8V16M8 12H16"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M6 18H18V20H6V18Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Application Tracking",
    description: "Get real-time updates and status for each school.",
    image: "/image2.svg",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#3B82F6" />
        <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2" />
        <path
          d="M10 12L11.5 13.5L14 11"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Multilingual support",
    description:
      "Learn in your preferred language (Hindi, English, more coming)",
    image: "/image3.svg",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#9333EA" />
        <text
          x="12"
          y="16"
          textAnchor="middle"
          fill="white"
          fontSize="12"
          fontWeight="bold"
        >
          A
        </text>
      </svg>
    ),
  },
  {
    id: 4,
    title: "Flipbook + Video Learn",
    description:
      "Access interactive books with tea videos and practice quizzes.",
    image: "/image4.svg",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#3B82F6" />
        <path d="M9 8L15 12L9 16V8Z" fill="white" />
      </svg>
    ),
  },
];

const FeaturesSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth / 4;
      scrollContainerRef.current.scrollBy({
        left: -cardWidth,
        behavior: "smooth",
      });
    }
  };

  const handleNext = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth / 4;
      scrollContainerRef.current.scrollBy({
        left: cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full py-12 md:py-16 bg-white">
      <div className="container max-w-7xl px-4 mx-auto">
        {/* Header Section */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
            {/* Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-800 max-w-2xl text-right">
              We Built Inupgro to <br /> Solve What Actually Matters
            </h2>

            {/* Description */}
            <p className="text-base md:text-sm text-gray-700 max-w-md">
              From learning struggles to school admissions chaos and underpaid
              teachers — everything you see here is shaped by real user pain
              points, not assumptions.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Tabs */}
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm md:text-base font-semibold transition-colors">
                Students
              </button>
              <button className="px-4 py-2 rounded-full bg-white text-gray-700 border border-gray-300 text-sm md:text-base font-semibold hover:bg-gray-50 transition-colors">
                Teachers
              </button>
              <button className="px-4 py-2 rounded-full bg-white text-gray-700 border border-gray-300 text-sm md:text-base font-semibold hover:bg-gray-50 transition-colors">
                Schools
              </button>
            </div>

            {/* See All Features and Navigation Arrows */}
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm md:text-base font-medium hover:bg-gray-200 transition-colors">
                See All Features
              </button>
              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  aria-label="Previous"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="text-gray-700"
                  >
                    <path
                      d="M12 6L8 10L12 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  aria-label="Next"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="text-gray-700"
                  >
                    <path
                      d="M8 6L12 10L8 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex-shrink-0 w-[85%] sm:w-[45%] md:w-[40%] lg:w-[23%] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Feature Image */}
              <div className="relative w-full h-48 md:h-80 overflow-hidden bg-gray-100">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Feature Content */}
              <div className="p-6 relative min-h-[150px]">
                {/* Icon */}
                <div className="mb-4">{feature.icon}</div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm md:text-base mb-4 pr-12">
                  {feature.description}
                </p>

                {/* Circular Arrow Icon */}
                <div className="absolute bottom-6 right-6">
                  <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="text-gray-700"
                    >
                      <path
                        d="M7 5L13 10L7 15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection;
