"use client";
import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // ✅ Added imports
import FacultyCard from '../molecule/FacultyCard';
import ViewAllContainer from '../containers/NearYouContainer';

interface FacultyData {
  name: string;
  title: string;
  department?: string;
  image?: string;
}

interface FacultySectionProps {
  facultyData: FacultyData[];
}

const FacultySection: React.FC<FacultySectionProps> = ({ facultyData }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <ViewAllContainer groupHeading="Faculty">
      <div className="relative w-full">
        <button
          onClick={() => scroll("left")}
          className="absolute z-10 left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-2"
        >
          <FaChevronLeft />
        </button>

        <div
          ref={scrollRef}
          className="w-full h-fit flex overflow-x-auto pb-2 scroll-smooth no-scrollbar"
        >
          
          {facultyData?.length > 0 && facultyData?.map((ele, index) => ( // ✅ Fixed: added index
            <div
              key={index}
              className="flex-shrink-0 w-1/2 sm:w-1/3 lg:w-1/5 px-1 sm:px-2 box-border"
            >
              <FacultyCard
                facultyName={ele?.name || "NA"}
                subject={ele?.title || "NA"}
                department={ele?.department || "NA"}
                facultyimg={ele?.image}
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute z-10 right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-2"
        >
          <FaChevronRight />
        </button>
      </div>
    </ViewAllContainer>
  );
};

export default FacultySection;
