  import Image from "next/image";
  import React from "react";
  import ClubImage from "@/assets/Photo_Gallery_Demo_Image.png";
  import RoundedButton from "../atom/buttons/RoundedButton";
  import Chips from "../atom/Chips";

  interface ClubCardProps {
    clubName: string;
    chipText: string;
    clubImage: string;
    description: string;
    isLoadings:boolean
  }

  const ClubCard: React.FC<ClubCardProps> = ({
    clubName,
    chipText,
    clubImage,
    description,
    isLoadings,
  }) => {
    return (
      <div className={`w-full lg:min-w-[20rem] min-h-[17.063rem] p-4 flex flex-col gap-4  rounded-lg ${isLoadings ? "sekleton-light-gray" : "bg-background"}`}>
        <div className="w-full flex-box-center rounded-lg relative">
          {isLoadings ? (<div className="w-full h-[12.313rem] skeleton-medium-gray rounded-lg"></div>) : ( 
        
        
        <Image
            width={0}
            height={0}
            sizes="100vw"
            src={clubImage}
            alt="img-alt"
            className="w-full h-[12.313rem] rounded-lg"
          />
          )}
        
          <div className="absolute top-2 right-2 w-fit h-fit flex">
            <Chips chiptext={chipText} withDotActive
            />
          
          </div>
        </div>
        {isLoadings ? (<h6 className=" w-[50%] h-7 skeleton-medium-gray rounded-lg"></h6>) : (
          <h6 className="text-sm text-deepBlue">{clubName}</h6>
          )}
      
        {/* <div className="w-full flex justify-end">
        {isLoadings ? (<div className="w-[50%] h-10 skeleton-medium-gray rounded-lg"></div>) : (<RoundedButton buttonName="Read More" withBackground />)}        
        </div> */}
      </div>
    );
  };

  export default ClubCard;
