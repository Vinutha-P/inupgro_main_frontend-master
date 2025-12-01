// 'use client'
// import React, { useState, useEffect } from "react";
// import StudentCard from "./StudentCard";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// const StudentsCardRow: React.FC<any> = ({ students }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [cardsPerView, setCardsPerView] = useState(5);
//   const [cardWidth, setCardWidth] = useState(0);

//   useEffect(() => {
//     const handleResize = () => {
//       const width = window.innerWidth;
//       let viewCount = 5;
//       if (width < 640) {
//         viewCount = 1;
//       } else if (width < 1024) {
//         viewCount = 2;
//       }
//       setCardsPerView(viewCount);
//       setCardWidth(window.innerWidth / viewCount);
//       setCurrentIndex(0);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const maxIndex = Math.max(0, students.length - cardsPerView);
//   const isCarouselActive = students.length > cardsPerView;

//   const handlePrev = () => {
//     setCurrentIndex((prev) => Math.max(prev - 1, 0));
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
//   };

//   return (
//     <div className="relative w-full">
//       {isCarouselActive && (
//         <>
//           <button
//             onClick={handlePrev}
//             disabled={currentIndex === 0}
//             className="flex-box-center absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg"
//           >
//             <FaChevronLeft />
//           </button>
//           <button
//             onClick={handleNext}
//             disabled={currentIndex >= maxIndex}
//             className="flex-box-center absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg"
//           >
//             <FaChevronRight />
//           </button>
//         </>
//       )}
//       <div className="overflow-hidden">
//         <div
//           className="flex transition-transform duration-500 ease-in-out"
//           style={{
//             transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
//             width: `${(students.length * 100) / cardsPerView}%`,
//           }}
//         >
//           {students.map((student: any, index: number) => (
//             <div
//               key={index}
//               className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/5 px-2 box-border"
//               style={{
//                 width: `${100 / students.length}%`,
//               }}
//             >
//               <StudentCard
//                 studentName={student.student_name}
//                 marks={student.marks}
//                 examType={student.exam_type}
//                 profilePicture={student.profile_picture}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentsCardRow;


'use client'
import React, { useState, useEffect } from "react";
import StudentCard from "./StudentCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const StudentsCardRow: React.FC<any> = ({ students }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let viewCount = 5;

      if (width < 640) {
        viewCount = 2; // Mobile
      } else if (width < 1024) {
        viewCount = 3; // Tablet
      }

      setCardsPerView(viewCount);
      setCurrentIndex(0); // Reset position on resize
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, students.length - cardsPerView);
  const isCarouselActive = students.length > cardsPerView;

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  return (
    <div className="relative w-full">
      {isCarouselActive && (
        <>
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex-box-center absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className="flex-box-center absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg"
          >
            <FaChevronRight />
          </button>
        </>
      )}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
            width: `${(students.length * 100) / cardsPerView}%`,
          }}
        >
          {students?.length > 0 && students?.map((student: any, index: number) => {
            return(
            <div
              key={index}
              className="flex-shrink-0 px-1 sm:px-2 box-border"
              style={{
                width: `${100 / students.length}%`,
              }}
            >
              <StudentCard
                studentName={student?.student_name || student?.fullName}
                marks={student?.marks}
                examType={student?.exam_type || student?.examType}
                profilePicture={student?.profile_picture}
              />
            </div>
          )})}
        </div>
      </div>
    </div>
  );
};

export default StudentsCardRow;
