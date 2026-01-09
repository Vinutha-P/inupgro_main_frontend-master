"use client";
import React from "react";

const ctaPanels = [
  {
    id: 1,
    title: "GET STARTED AS",
    subtitle: "Students",
    buttonText: "Join as Student",
    image: "/student.svg",
  },
  {
    id: 2,
    title: "START CREATING AS A",
    subtitle: "Teacher",
    buttonText: "Start Teaching",
    image: "/teacher.svg",
  },
  {
    id: 3,
    title: "DIGITIZE YOUR",
    subtitle: "Schools",
    buttonText: "Register School",
    image: "/school.svg",
  },
];

const CTASection = () => {
  return (
    <section className="w-full  py-8">
      <div className="container mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
            Ready to Take the Next Step?
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            Whether you're a student, teacher, or school — Inupgro has a <br />
            journey mapped just for you.
          </p>
        </div>

        {/* CTA Panels */}
        <div className="flex flex-col md:flex-row items-center justify-center relative px-4 md:px-0">
          {ctaPanels.map((panel, index) => (
            <div
              key={panel.id}
              className={`relative group cursor-pointer transform transition-all duration-300 hover:scale-105 flex-shrink-0 ${
                index > 0 ? "md:-ml-12 lg:-ml-12" : ""
              }`}
              style={{
                zIndex: index === 1 ? 10 : index === 0 ? 5 : 5,
              }}
            >
              {/* Image Container */}
              <div className="relative rounded-3xl overflow-hidden  h-[500px] md:h-[600px] lg:h-[650px]">
                <img
                  src={panel.image}
                  alt={panel.subtitle}
                  className="w-full h-full object-cover object-center"
                  style={{ objectPosition: "center top" }}
                />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  {/* Title and Subtitle - Counter rotate text to appear straight */}
                  <div
                    className={`mb-2 text-center justify-center items-center ${
                      index === 0
                        ? "-rotate-[10deg]"
                        : index === 1
                        ? "rotate-[1deg]"
                        : "rotate-[10deg]"
                    }`}
                  >
                    <p className="text-white text-xs md:text-sm font-medium mb-2 uppercase tracking-wider opacity-90">
                      {panel.title}
                    </p>
                    <h3 className="text-white text-5xl font-bold leading-tight">
                      {panel.subtitle}
                    </h3>
                  </div>

                  {/* Button - Counter rotate button to appear straight */}
                  <div
                    className={`${
                      index === 0
                        ? "-rotate-[10deg]"
                        : index === 1
                        ? "rotate-[1deg]"
                        : "rotate-[10deg]"
                    }`}
                  >
                    <button className="mx-auto flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-base md:text-lg">
                      {panel.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
