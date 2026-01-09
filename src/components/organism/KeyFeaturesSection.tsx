"use client";
import React from "react";

const KeyFeaturesSection = () => {
  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section with Two Paragraphs */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
            {/* Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-800 max-w-2xl text-right">
              Key Features <br /> That Power Inupgro
            </h2>

            {/* Description */}
            <p className="text-base md:text-sm text-gray-700 max-w-md">
              Everything You Need, Nothing You Don't. From student learning to
              school hiring — Inupgro's features are designed for simplicity,
              speed, and real results.
            </p>
          </div>
        </div>

        {/* Key Features SVG Image */}
        <div className="w-full flex justify-center">
          <img
            src="/keyfeatures.svg"
            alt="Key Features"
            className="w-full h-auto max-w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default KeyFeaturesSection;
