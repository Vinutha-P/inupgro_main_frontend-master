import React from "react";
import IconText from "../atom/IconText";
import {
  IoIosCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
} from "react-icons/io";

interface FacilitiesInfoColumnProps {
  columnHeading: string;
  items: { text: string; status: "available" | "not-available" | "info-not-available" }[];
}

// Helper function to convert API data to component format

const FacilitiesInfoColumn: React.FC<FacilitiesInfoColumnProps> = ({
  columnHeading,
  items,
}) => {
  const getIcon = (status: string) => {
    switch (status) {
      case "available":
        return IoIosCheckmarkCircleOutline;
      case "not-available":
        return IoIosCloseCircleOutline;
      case "info-not-available":
        return IoIosCheckmarkCircleOutline;
      default:
        return IoIosCheckmarkCircleOutline;
    }
  };

  const getFillColor = (status: string) => {
    switch (status) {
      case "available":
        return "#12B76A";
      case "not-available":
        return "#F04438";
      case "info-not-available":
        return "#667085";
      default:
        return "#667085";
    }
  };

  return (
    <div className="w-full h-fit flex flex-col gap-4 items-start">
      <p className="text-base lg:text-xl font-semibold">{columnHeading}</p>
      <div className="w-full flex flex-col gap-[0.9375rem]">
        {items?.map((item, index) => (
          <IconText
            key={index}
            icon={getIcon(item?.status)}
            text={item?.text}
            fill={getFillColor(item?.status)}
          />
        ))}
      </div>
    </div>
  );
};

export default FacilitiesInfoColumn