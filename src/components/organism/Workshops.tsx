// import React from "react";
// import ViewAllContainer from "../containers/NearYouContainer";
// import WorkshopCard from "../molecule/WorkshopCard";

// const Workshops = ({ workshops }: any) => {
//   return (
//     <ViewAllContainer groupHeading="Workshops" showViewAll={false}>
//       <div className="w-full flex  gap-5 overflow-x-auto">
//         {workshops?.map((workshop: any) => (
//           <div className="">
//           <WorkshopCard
//             key={workshop._id}
//             workshopName={workshop.name}
//             totalStudents={workshop.totalStudents}
//             batch={workshop.batch}
//             image={workshop.image}
//           />
//           </div>
//         ))}
//       </div>
//     </ViewAllContainer>
//   );
// };

// export default Workshops;

import React from "react";
import ViewAllContainer from "../containers/NearYouContainer";
import WorkshopCard from "../molecule/WorkshopCard";

const Workshops = ({ workshops }: any) => {
  return (
    <ViewAllContainer groupHeading="Workshops" showViewAll={false}>
      <WorkshopCard workshops={workshops} />
    </ViewAllContainer>
  );
};

export default Workshops;
