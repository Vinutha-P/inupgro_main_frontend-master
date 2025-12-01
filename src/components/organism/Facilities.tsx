import React from "react";
import IconText from "../atom/IconText";
import {
  IoIosCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
} from "react-icons/io";
import FacilitiesInfoColumn from "../molecule/FacilitiesInfoColumn";

const Facilities = ({data}:any) => {
  if (!data || typeof data !== "object" || Object.keys(data).length === 0) return;
  
  const transformItems = (apiItems: any[]) => {
    return apiItems?.map(item => ({
      text: item?.facility_type || "NA",
      status: item?.is_available ? "available" : "not-available" as "available" | "not-available"
    }));
  };

  return (
    <section className="w-full h-fit p-3 md:p-5 flex flex-col gap-3 bg-white rounded-lg">
      <div className="flex-between">
        {/* <h4 className="text-xl lg:text-[1.75rem] font-semibold text-deepBlue"> */}
        <h6 className="">
          Facilities
        </h6>
        <div className="w-fit min-w-fit flex items-center justify-start lg:justify-end flex-wrap gap-5">
          <IconText
            icon={IoIosCheckmarkCircleOutline}
            text="Available"
            fill="#12B76A"
          />
          <IconText
            icon={IoIosCloseCircleOutline}
            text="Not Available"
            fill="#F04438"
          />
          <IconText
            icon={IoIosCheckmarkCircleOutline}
            text="Information Not Available"
            fill="#667085"
          />
        </div>
      </div>
      <div className="w-full p-2 md:p-5 grid grid-cols-2 md:grid-cols-5 md:gap-y-[1.75rem] md:gap-x-5 bg-background rounded-lg">
        {Object.entries(data).map(([heading, apiItems]:any) => (
          <FacilitiesInfoColumn
            key={heading}
            columnHeading={heading}
            items={transformItems(apiItems || [])}
          />
        ))}
      </div>
    </section>
  );
};

export default Facilities;
