"use client";
import React, { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Neha",
    role: "Student, Class 9",
    image: "/user-image.png", // Using placeholder, replace with actual image
    testimonial:
      "I applied to three schools using the same profile — no more paperwork stress! Inupgro saved me days. I could track my application status in real-time and got accepted without ever visiting an office. It felt like the entire school system came online — just for me.",
  },
  {
    id: 2,
    name: "Anjali Sharma",
    role: "Teacher, Science",
    image: "/user-image.png", // Using placeholder, replace with actual image
    testimonial:
      "One video earned me ₹6,000 last month. Teaching online could feel this rewarding. The analytics let me see where my students are struggling and what topics work best. It's like having a teaching assistant that never sleeps.",
  },
  {
    id: 3,
    name: "Rajesh Kumar",
    role: "Principal, ABC School",
    image: "/user-image.png",
    testimonial:
      "Managing admissions used to be a nightmare. Now with Inupgro, we process applications three times faster. The automated dashboard gives us everything we need at a glance.",
  },
  {
    id: 4,
    name: "Priya Patel",
    role: "Student, Class 11",
    image: "/user-image.png",
    testimonial:
      "The flipbooks with embedded videos changed how I study. I can learn at my own pace and the interactive content makes everything so much clearer.",
  },
  {
    id: 5,
    name: "Dr. Mohan Singh",
    role: "Teacher, Mathematics",
    image: "/user-image.png",
    testimonial:
      "The performance analytics help me identify students who need extra support. I can tailor my teaching approach based on real data, not just intuition.",
  },
  {
    id: 6,
    name: "Sneha Reddy",
    role: "Student, Class 10",
    image: "/user-image.png",
    testimonial:
      "Applying to multiple schools was so easy. I uploaded my documents once and they were automatically sent to all the schools I chose. No running around, no stress!",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 2 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= testimonials.length - 2 ? 0 : prev + 1));
  };

  const currentTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
  ];

  return (
    <section className="w-full relative py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Background SVG */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/testimonials.svg')",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 text-center">
            Hear how Inupgro is transforming
          </h2>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 text-left">
            lives and institutions across India.
          </h2>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative mb-8">
          <div className="flex gap-4 md:gap-6 overflow-visible">
            {currentTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`flex-shrink-0 w-full md:w-[calc(50%-12px)] ${
                  index === 0
                    ? "opacity-100 z-10 transform scale-100"
                    : "opacity-50 md:opacity-40 z-0 transform scale-95"
                } transition-all duration-300`}
              >
                <div className="bg-white rounded-2xl border border-blue-200 shadow-md p-6 md:p-8 lg:p-10 h-full">
                  <div className="flex flex-col items-center text-center">
                    {/* Profile Picture */}
                    <div className="mb-6 relative">
                      <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 p-0.5">
                        <div className="w-full h-full rounded-full overflow-hidden bg-white">
                          <img
                            src={testimonial.image || "/user-image.png"}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to default avatar if image fails to load
                              const target = e.target as HTMLImageElement;
                              target.src = "/user-image.png";
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-sm md:text-base text-gray-700 mb-6 leading-relaxed">
                      "{testimonial.testimonial}"
                    </p>

                    {/* Name and Role */}
                    <div>
                      <p className="font-semibold text-gray-800 text-base md:text-lg mb-1">
                        {testimonial.name}
                      </p>
                      <p className="text-sm md:text-base text-gray-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-6">
          <span className="text-sm md:text-base text-gray-600 font-medium">
            {String(currentIndex + 1).padStart(2, "0")} -{" "}
            {String(testimonials.length).padStart(2, "0")}
          </span>
          <div className="flex gap-6">
            <button
              onClick={handlePrevious}
              className="text-sm md:text-base text-gray-500 hover:text-gray-700 transition-colors font-medium"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="text-sm md:text-base text-gray-700 hover:text-blue-600 transition-colors font-semibold"
            >
              Next
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <img
            src="/sponsers.svg"
            alt="Sponsors"
            className="w-full  h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
