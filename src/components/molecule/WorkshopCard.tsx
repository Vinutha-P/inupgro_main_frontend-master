// "use client";

// import Image from "next/image";
// import React, { useRef } from "react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// const WorkshopCard: React.FC<{ workshops: any[] }> = ({ workshops }) => {
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const scroll = (direction: "left" | "right") => {
//     if (scrollRef.current) {
//       const { scrollLeft, clientWidth } = scrollRef.current;
//       const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
//       scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
//     }
//   };

//   return (
//     <div className="relative w-full">
//       {/* Scroll Buttons - Show only on medium and above */}
//       <button
//         onClick={() => scroll("left")}
//         className="flex-box-center absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg"
//       >
//         <FaChevronLeft />
//       </button>

//       <button
//         onClick={() => scroll("right")}
//         className="flex-box-center absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg"
//       >
//         <FaChevronRight />
//       </button>

//       {/* Scrollable container */}
//       <div
//         ref={scrollRef}
//         className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 overflow-x-auto scroll-smooth py-4 lg:py-0 px-1 md:px-0 no-scrollbar"
//       >
//         {workshops?.map((workshop) => (
//           <div
//             key={workshop._id}
//             className="col-span-1 flex-shrink-0 bg-background rounded-lg p-4 flex flex-col gap-4 text-darkBlue"
//           >
//             <div className="w-[18rem] sm:w-full">
//               <Image
//                 src={workshop.image}
//                 alt={workshop.name}
//                 width={0}
//                 height={0}
//                 sizes="100vw"
//                 className="w-[15.3rem] md:h-[10.313rem] object-cover rounded"
//               />
//             </div>
//             <div className="flex flex-col gap-1 text-sm md:text-base">
//               <h6 className="">{workshop.name}</h6>
//               <p className="text-xs">
//                 Total Students: <span>{workshop.totalStudents}</span>
//               </p>
//               <p className="text-xs">
//                 Batch: <span>{workshop.batch}</span>
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default WorkshopCard;


"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const WorkshopCard: React.FC<{ workshops: any[] }> = ({ workshops }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      {/* Scroll Buttons */}
      <button
        onClick={() => scroll("left")}
        className="flex-box-center absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg"
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={() => scroll("right")}
        className="flex-box-center absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg"
      >
        <FaChevronRight />
      </button>

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex gap-3 md:gap-4 overflow-x-auto scroll-smooth py-4 px-1 md:px-0 no-scrollbar"
      >
        {workshops?.length > 0 && workshops?.map((workshop, index) => (
          <div
            key={workshop?._id || index}
            className="min-w-[5rem] sm:min-w-[18rem] flex-shrink-0 bg-background rounded-lg p-4 flex flex-col gap-4 text-darkBlue"
          >
            <div className="w-full">
              <Image
                src={workshop?.image}
                alt="img-alt"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-[10.313rem] object-cover rounded"
              />
            </div>
            <div className="flex flex-col gap-1 text-sm md:text-base">
              <h6 className="text-base text-darkBlue">{workshop?.name}</h6>
              <p className="text-xs">
                Total Students: <span>{workshop?.totalStudents}</span>
              </p>
              <p className="text-xs">
                Batch: <span>{workshop?.batch}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkshopCard;
