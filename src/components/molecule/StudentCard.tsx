import Image from "next/image";
import React from "react";
import Chips from "../atom/Chips";



const StudentCard: React.FC<any> = ({
  studentName,
  marks,
  examType,
  profilePicture
}) => {
  return (
    <div className="w-[100%] h-full lg:min-h-[18.25rem] px-1 sm:px-4 py-2 flex flex-col gap-2 bg-background rounded-lg">
      <div className="w-full flex items-center justify-end">
        <Chips chiptext="Gradute"  withDotActive/>
      </div>
      {
        profilePicture  &&
      
      <Image
        width={0}
        height={0}
        sizes='100vh'
        src={profilePicture}
        alt="img-alt"
        className="w-full h-[10rem] sm:h-[13rem] md:h-full rounded-lg"
      />
}
      <div className="flex flex-col gap-1">
        <h6 className="text-sm text-deepBlue">{studentName}</h6>
        <p className="text-xs text-deepBlue">Package: {marks}</p>
        <p className="text-xs text-deepBlue">{examType}</p>
      </div>
    </div>
  );
};

export default StudentCard