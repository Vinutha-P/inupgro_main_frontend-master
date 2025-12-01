import React, { useRef } from 'react';
import StudentCard from '@/components/molecule/StudentCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const SchoolCarousel = ({ currentStudents }: { currentStudents: any }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative">
      {/* Left Button */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2"
        onClick={scrollLeft}
        aria-label="Scroll Left"
      >
        <FaChevronLeft />
      </button>

      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="flex overflow-x-auto scroll-smooth no-scrollbar space-x-4"
      >
        {currentStudents.map((student: any, index: number) => (
          <div
            key={index}
            className="flex-shrink-0 w-1/2 md:w-1/3 lg:w-1/5 box-border"
          >
            <StudentCard
              studentName={student?.student_name || "NA"}
              marks={student?.marks || 0}
              examType={student?.exam_type || "NA"}
              profilePicture={student?.profile_picture || null}
            />
          </div>
        ))}
      </div>

      {/* Right Button */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2"
        onClick={scrollRight}
        aria-label="Scroll Right"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default SchoolCarousel;
