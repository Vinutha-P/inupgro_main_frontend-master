// 'use client';

// import React, { useState } from 'react';
// import ModalCard from './ModalCard';
// import StudentBookCardCarousel from './StudetnBookCaroursel';
// const UpdateStudentProfileDetails = () => {
//   const [showModal, setShowModal] = useState(true);


//   return (
//     <div className="relative bg-gradient-to-br from-blue-50 to-green-50 min-h-[100vh] font-sans overflow-y-auto">
//       {showModal && (
//         <>
//           <div className="fixed inset-0 bg-black bg-opacity-40 z-40 pointer-events-none h-[100%]" />
//           <div className="absolute top-28 left-1/2 transform  -translate-x-1/2 z-50">
//             <ModalCard
//               type={"student"}
//             />
//           </div>
//         </>
//       )}

//       {/* Main Content */}
//       <div className="flex gap-6 pb-12 pt-6 ">
//         <div className="flex-1">
//           <div className="bg-white p-10 rounded shadow">
//               <StudentBookCardCarousel />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateStudentProfileDetails;




import React, { useState, useEffect } from 'react';
import ModalCard from './ModalCard';
import StudentBookCardCarousel from './StudetnBookCaroursel';

const UpdateStudentProfileDetails = () => {
  const [showModal, setShowModal] = useState(true);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Clean up when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-green-50 min-h-[100vh] font-sans overflow-y-auto">
      {showModal && (
        <>
          {/* Fix pointer events and make overlay block interaction */}
          <div className="fixed inset-0 bg-black bg-opacity-40 z-40 pointer-events-auto" />
          <div className="fixed top-28 left-1/2 transform -translate-x-1/2 z-50">
            <ModalCard
              role={"student"}
            />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex gap-6 pb-12 pt-6">
        <div className="flex-1">
          <div className="bg-white p-10 rounded shadow">
            <StudentBookCardCarousel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateStudentProfileDetails;
