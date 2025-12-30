"use client";
import React from "react";

const blogPosts = [
  {
    id: 1,

    image: "/blog1.svg",
  },
  {
    id: 2,

    image: "/blog2.svg",
  },
  {
    id: 3,

    image: "/blog3.svg",
  },
];

const statistics = [
  {
    id: 1,
    value: "100K+",
    description: "Students learning with flipbooks & videos",
  },
  {
    id: 2,
    value: "5,000+",
    description: "Job applications submitted via InupgroPaid to teachers",
  },
  {
    id: 3,
    value: "60%",
    description: "Of teacher videos are watched across 2+ regions",
  },
];

const BlogSection = () => {
  return (
    <section className="w-full relative py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Background SVG */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/Background.svg')",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 md:mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-black max-w-2xl text-right">
              Stay updated on the
            </h2>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-black max-w-2xl">
              latest trends and strategies to enhance
              <br />
              your learning platform.
            </h2>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-lg whitespace-nowrap">
            Checkout More
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="transform rotate-45"
            >
              <path
                d="M5 5L15 15M15 5V15H5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-12 px-10">
        {blogPosts.map((post, index) => (
          <div
            key={post.id}
            className={index === 0 ? "md:col-span-6" : "md:col-span-3"}
          >
            {/* Image Container */}
            <div className="relative overflow-hidden">
              <img src={post.image} className="w-full h-full object-contain" />
            </div>
          </div>
        ))}
      </div>

      {/* Statistics Footer */}
      <div className="relative z-10 container flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12 pt-8">
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
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
