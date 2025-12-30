"use client";
import React, { useState } from "react";
import Image from "next/image";

const tabs = [
  { id: 0, label: "Students", image: "/hero-student.svg" },
  { id: 1, label: "Teacher", image: "/hero-teacher.svg" },
  { id: 2, label: "School", image: "/hero-school.svg" },
];

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabId: number) => {
    if (tabId !== activeTab) {
      setActiveTab(tabId);
    }
  };

  const getImageStyle = (index: number) => {
    const position = index - activeTab;
    const isActive = position === 0;

    if (isActive) {
      return {
        transform: "rotateY(0deg) translateZ(0px)",
        opacity: 1,
        zIndex: 10,
      };
    } else if (position > 0) {
      // Image is to the right (behind, should rotate forward)
      return {
        transform: `rotateY(90deg) translateZ(-300px)`,
        opacity: 0,
        zIndex: 5,
      };
    } else {
      // Image is to the left (in front, should rotate backward)
      return {
        transform: `rotateY(-90deg) translateZ(-300px)`,
        opacity: 0,
        zIndex: 5,
      };
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Hero Background SVG */}
        <div className="relative w-full h-auto">
          <Image
            src="/hero-bg.svg"
            alt="Hero Background"
            width={1920}
            height={1156}
            className="w-full h-auto object-cover"
            priority
          />

          {/* Hero Top SVG - positioned at top center of hero-bg */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-full flex justify-center z-10 pointer-events-none">
            <img
              src="/hero-top.svg"
              alt="Hero Top"
              className="object-contain"
            />
          </div>

          {/* Image Carousel with Rotation */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full flex justify-center items-center z-10">
            <div
              className="relative w-full max-w-4xl h-80 md:h-[450px]"
              style={{
                perspective: "1200px",
                transformStyle: "preserve-3d",
              }}
            >
              {tabs.map((tab, index) => (
                <div
                  key={tab.id}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    ...getImageStyle(index),
                    transformStyle: "preserve-3d",
                    transition:
                      "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease-in-out",
                  }}
                >
                  <img
                    src={tab.image}
                    alt={tab.label}
                    className="w-auto h-full max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="absolute bottom-1  left-1/2 transform -translate-x-1/2 w-full flex justify-center z-30">
            <div className="flex gap-2 md:gap-4 bg-white/10 backdrop-blur-md rounded-full px-2 py-1 border border-white/30 shadow-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`px-4 py-2 rounded-full text-sm md:text-base font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-white text-[#427ecd] shadow-lg scale-105"
                      : "text-white hover:bg-white/20 hover:scale-105"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/*Hero Section Statistics Carousel Section */}
      <section className="w-full bg-[#213867] py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12 overflow-x-auto">
            {/* Stat 1: Students */}
            <div className="flex items-center gap-3 md:gap-4 min-w-fit">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                className="flex-shrink-0"
              >
                {/* 8-ray star pointing right */}
                <path
                  d="M14 2L16 8L22 10L16 12L14 18L12 12L6 10L12 8L14 2Z"
                  fill="#FFD700"
                />
                <path
                  d="M14 6L15 9L18 10L15 11L14 14L13 11L10 10L13 9L14 6Z"
                  fill="#FFD700"
                />
              </svg>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-2">
                <span className="text-[#FFD700] text-2xl  font-bold">
                  100K+
                </span>
                <span className="text-white text-sm md:text-base">
                  / Students learning with flipbooks & videos
                </span>
              </div>
            </div>

            {/* Separator */}
            <div className="hidden md:block w-px h-12 bg-[#87CEEB]/30 border-dashed border-l-2 border-[#87CEEB]/50"></div>

            {/* Stat 2: Teachers */}
            <div className="flex items-center gap-3 md:gap-4 min-w-fit">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                className="flex-shrink-0"
              >
                {/* 8-ray star pointing right */}
                <path
                  d="M14 2L16 8L22 10L16 12L14 18L12 12L6 10L12 8L14 2Z"
                  fill="#FFD700"
                />
                <path
                  d="M14 6L15 9L18 10L15 11L14 14L13 11L10 10L13 9L14 6Z"
                  fill="#FFD700"
                />
              </svg>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-2">
                <span className="text-[#FFD700] text-2xl  font-bold">85%</span>
                <span className="text-white text-sm md:text-base">
                  / Teachers earn within 2 weeks
                </span>
              </div>
            </div>

            {/* Separator */}
            <div className="hidden md:block w-px h-12 bg-[#87CEEB]/30 border-dashed border-l-2 border-[#87CEEB]/50"></div>

            {/* Stat 3: Schools */}
            <div className="flex items-center gap-3 md:gap-4 min-w-fit">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                className="flex-shrink-0"
              >
                {/* 8-ray star pointing right */}
                <path
                  d="M14 2L16 8L22 10L16 12L14 18L12 12L6 10L12 8L14 2Z"
                  fill="#FFD700"
                />
                <path
                  d="M14 6L15 9L18 10L15 11L14 14L13 11L10 10L13 9L14 6Z"
                  fill="#FFD700"
                />
              </svg>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-2">
                <span className="text-[#FFD700] text-2xl  font-bold">
                  1,200+
                </span>
                <span className="text-white text-sm md:text-base">
                  / Schools onboarded across India
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
