'use client'
import React, { useEffect, useState, useMemo } from "react";
import InstituteImageCarousel from "../molecule/InstituteImageCarousel";
import { IoEyeOutline, IoLocationOutline } from "react-icons/io5";
import IconText from "../atom/IconText";
import { useRouter } from "next/navigation";
import { TbCurrentLocation } from "react-icons/tb";
import Chips from "../atom/Chips";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import DetailTiles from "../atom/DetailTiles";
import RoundedButton from "../atom/buttons/RoundedButton";
import { getLastWords } from "../reusuableComponents/ReusuableComponents";
import ApplicationStepsModal from "@/components/application-forms/ApplicationStepsModal";
import { calculateRatio, formatLocation, truncateText } from "@/utils/helper";
import TruncatedTextWithTooltip from "../atom/tooltip/TruncateText";

const DetailCard = ({
  organisationName,
  organisationType,
  organisationAddress,
  organisationStatus,
  organisationViews,
  data,
  type,
  latitude,
  longitude
}) => {

  const route = useRouter();
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  const [isLoadings, setIsLoadings] = useState(true);

  const handleAdmissionClick = () => {
    setShowApplicationModal(true);
  };

  const calculateTotalCapacity = () => {
    let totalSeats = 0;

    if (data?.subject_fees && typeof data?.subject_fees === 'object') {
      Object.values(data?.subject_fees).forEach((state) => {
        if (state && typeof state === 'object') {
          Object.values(state).forEach((classes) => {
            if (Array.isArray(classes)) {
              classes.forEach((subject) => {
                totalSeats += subject?.seats || 0;
              });
            }
          });
        }
      });
    }

    return totalSeats.toString();
  };
  //school average fees

  const getTotalAndAverageAdmissionCost = (data) => {
    if (!data || !data.data) return { total: 0, average: 0, averagePerMonth: 0 };

    let total = 0;
    let classCount = 0;

    const classEntries = Object.values(data.data);

    classEntries.forEach((classItem) => {
      if (typeof classItem === "object") {
        const innerClasses = Object.values(classItem);
        innerClasses.forEach((entry) => {
          if (entry.total_cost_of_admission) {
            total += Number(entry.total_cost_of_admission || 0);
            classCount++;
          }
        });
      }
    });

    const average = classCount > 0 ? Math.floor(total / classCount) : 0;
    const averagePerMonth = average > 0 ? Math.floor(average / 12) : 0;

    return {
      total,
      average,
      averagePerMonth,
    };
  };

  // Example usage:
  const { total, average, averagePerMonth } = getTotalAndAverageAdmissionCost(data?.fees);

  const averagePerMonthCollege = useMemo(() => {
    if (!data?.college_fees || !Array.isArray(data?.college_fees)) return 0;

    let totalAverageSum = 0;

    data.college_fees.forEach((course) => {
      const branches = Object.entries(course?.data || {});
      let courseGrandTotal = 0;

      branches.forEach(([branchName, branchData]) => {
        const grandTotal = Number(branchData?.grand_total || 0);
        courseGrandTotal += grandTotal;
      });

      const numberOfBranches = branches.length;
      const average = numberOfBranches ? Math.floor(courseGrandTotal / numberOfBranches) : 0;

      totalAverageSum += average;
    });

    const numberOfCourses = data.college_fees.length;
    const overallAverage = numberOfCourses ? Math.floor(totalAverageSum / numberOfCourses) : 0;

    const monthlyAverage = Math.floor(overallAverage / 12); 

    return monthlyAverage;
  }, [data?.college_fees]);

  //coaching average fees

  const monthlyAverageCoaching = useMemo(() => {
    const subjectFees = data?.subject_fees;

    if (!subjectFees || typeof subjectFees !== 'object') return 0;

    let totalCourseAverages = 0;
    let courseCount = 0;

    Object.entries(subjectFees).forEach(([courseName, levels]) => {
      let courseTotal = 0;
      let subjectCount = 0;

      Object.entries(levels).forEach(([levelName, subjects]) => {
        subjects.forEach((subject) => {
          courseTotal += Number(subject.fees || 0);
          subjectCount += 1;
        });
      });

      if (subjectCount > 0) {
        const courseAverage = Math.floor(courseTotal / subjectCount);
        totalCourseAverages += courseAverage;
        courseCount += 1;
      }
    });

    const finalAverage = courseCount > 0 ? Math.floor(totalCourseAverages / courseCount) : 0;

    const monthlyAverage = Math.floor(finalAverage / 12); 

    return monthlyAverage;
  }, [data?.subject_fees]);

  const handleNavigation = () => {
    if (!data?._id) return;

    const query = `?id=${data._id}`;
    const currentPath = route?.asPath || "";
    let newPath = "";

    if (type === "school") {
      newPath = currentPath?.includes("find")
        ? `/school-detail${query}`
        : `/find/school-detail${query}`;
    } else if (type === "college") {
      newPath = currentPath?.includes("find")
        ? `/college-detail${query}`
        : `/find/college-detail${query}`;
    } else if (type === "institute") {
      newPath = currentPath?.includes("find")
        ? `/institute-detail${query}`
        : `/find/institute-detail${query}`;
    }

    if (newPath) {
      route.push(newPath);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoadings(false);
    }, 1000);
  }, []);

  const {
    landmark = "",
    city = "",
    state = "",
    pincode = "",
    location_value = "",
    plotNo = "",
    country = "",
  } = organisationAddress || {};

  const formattedText = formatLocation(landmark, city, location_value);

  return (
    <>
      <div className="relative group w-full xl:flex flex-col lg:flex-row items-start justify-start gap-5 
    rounded-lg transition-all duration-300 lg:py-3">

        <div
          className={`absolute inset-0 lg:-m-3.5 rounded-lg opacity-0 transition-all duration-300 
  group-hover:opacity-100 group-hover:scale-103 group-hover:my-1  ${isLoadings ? "sekleton-light-gray" : "bg-background"}`}
          aria-hidden="true"
        />
        {isLoadings ? (
          <div className="w-[120px] h-[28px] lg:w-[300px] lg:h-[240px] skeleton-medium-gray" />
        ) : (
          <>
            <InstituteImageCarousel images={data?.photos || []} width="90%" />
            <div className="w-fit flex justify-end bg-white gap-2 flex-wrap mb-2 items-center -ml-2 xl:hidden absolute top-2 right-0 p-1 !rounded-[5px_0px_0px_5px] shadow-lg shadow-slate-600 mt-3 text-[10px] ">
              <IconText icon={IoEyeOutline} text={organisationViews} textColor="#04173F" className=" text-darkBlue font-bold" />
              <IconText icon={RiVerifiedBadgeLine} text={organisationStatus} textColor="#04173F" isBold />
              <Chips chiptext={`#${(organisationName || "")?.split(" ")[0]?.toLowerCase()}`} />
            </div>

          </>
        )}

        <div className="w-full flex flex-col items-end gap-3 relative z-10">
          <div className="w-full flex flex-col-reverse lg:flex-row lg:items-start lg:justify-between flex-wrap">
            <div className="w-fit min-w-fit flex flex-col gap-[0.3125rem] mb-0 mt-2">
              {isLoadings ? (
                // <div className="lg:w-[240px] lg:h-4 skeleton-medium-gray" />
                <div className="" />
              ) : (
                <h6
                  className="text-[1rem] lg:text-[1.15rem] font-semibold text-deepBlue cursor-pointer"
                  onClick={handleNavigation}
                  onKeyDown={(e) => e.key === 'Enter' && handleNavigation()}
                >
                  {/* {organisationName} */}
                  <TruncatedTextWithTooltip text={organisationName} />
                  {organisationType && <span className="text-base">({organisationType})</span>}
                </h6>
              )}

              <div className="w-fit flex items-center justify-start gap-3 md:gap-5 ">
                <div className="relative group/address w-fit">
                  <IconText icon={IoLocationOutline}
                    text={formattedText} />

                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/address:block bg-gray-800 text-white text-xs rounded-md px-3 py-1 whitespace-nowrap z-10">
                    {organisationAddress?.location_value}
                  </div>
                </div>
                <IconText
                  icon={TbCurrentLocation}
                  text="See Location"
                  textColor="#2E90FA"
                  fill="transparent"
                  latitude={latitude}
                  longitude={longitude}
                />
              </div>

            </div>
            <div className="w-fit hidden xl:flex justify-end gap-2 flex-wrap mb-2 items-center -ml-2">
              <IconText icon={IoEyeOutline} text={organisationViews} className="w-2 h-2" />
              <IconText icon={RiVerifiedBadgeLine} text={organisationStatus} textColor="#2E90FA" isBold />
              <Chips chiptext={`#${(organisationName || "")?.split(" ")[0]?.toLowerCase()}`} />
            </div>
          </div>

          <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-[0.625rem]">
            {type === "school" && (
              <>
                <DetailTiles tileDetail="Classes Offered" tileHeading={data?.academics_stats?.classed_offered?.default} />
                <DetailTiles tileDetail="Avg Fees" tileHeading={averagePerMonth ? `${averagePerMonth} /Month` : "NA"} />
                <DetailTiles tileDetail="Board" tileHeading={data?.boards || "NA"} />
                <DetailTiles tileDetail="Total School Capacity" tileHeading={data?.total_capacity || "NA"} />
                <DetailTiles tileDetail="Student Faculty Ratio" tileHeading={calculateRatio(data?.total_capacity,data?.total_faculty) || "NA"} />
                {/* <DetailTiles tileDetail="Student Faculty Ratio" tileHeading={data?.academics_stats?.student_faculty_ratio || "NA"} /> */}
                <DetailTiles tileDetail="Total Faculty" tileHeading={data?.total_faculty || "NA"} />
              </>
            )}
            {
              type === "college" &&
              <>
                <DetailTiles tileDetail="Classes Offered" tileHeading={data?.academic_statistics?.courses_offered} />
                <DetailTiles tileDetail="Avg Fees" tileHeading={averagePerMonthCollege ? `${averagePerMonthCollege} /Month` : "NA"} />
                <DetailTiles tileDetail="University" tileHeading={data?.university || "NA"} />
                <DetailTiles tileDetail="Total School Capacity" tileHeading={data?.total_capacity || "NA"} />
                <DetailTiles tileDetail="Student Faculty Ratio" tileHeading={calculateRatio(data?.total_capacity,data?.total_faculty) || "NA"} />
                {/* <DetailTiles tileDetail="Student Faculty Ratio" tileHeading={data?.academics_stats?.student_faculty_ratio || "NA"} /> */}
                <DetailTiles tileDetail="Total Faculty" tileHeading={data?.total_faculty || "NA"} />
              </>
            }

            {type === "institute" &&
              <>
                <DetailTiles
                  tileDetail="Courses"
                  tileHeading={
                    data?.subject_fees && typeof data?.subject_fees === 'object' ?
                      truncateText(Object.keys(data?.subject_fees).join("/"), 11) :
                      "NA"
                  }
                />

                <DetailTiles tileDetail="Avg Fees" tileHeading={monthlyAverageCoaching ? `₹${monthlyAverageCoaching} /Month` : "NA"} />
                <DetailTiles
                  tileDetail="Medium"
                  tileHeading={
                    data?.medium ?
                      truncateText(data?.medium, 11) :
                      "NA"
                  }
                />
                <DetailTiles tileDetail="Total Institute Capacity" tileHeading={data?.total_capacity || "NA"} />
                <DetailTiles tileDetail="Student Faculty Ratio" tileHeading={calculateRatio(data?.total_capacity,data?.total_faculty) || "NA"} />
                <DetailTiles tileDetail="Total Faculty" tileHeading={data?.total_faculty || "NA"} />
              </>
            }
          </div>

          <div className="w-full flex flex-col lg:flex-row justify-between items-end gap-5">
            <div className="basis-[100%] w-full flex flex-col gap-2">
              {isLoadings ? (
                <div className="max-w-[234px] h-4 skeleton-medium-gray" />
              ) : (
                <strong className="font-semibold text-deepBlue text-xs">Top HighLights</strong>
              )}

              <div className="w-full flex flex-wrap items-center justify-start gap-3 md:gap-1 mt-0">
                {data?.facilities && typeof data?.facilities === 'object'
                  ? Object.entries(data.facilities)
                    .flatMap(([category, items]) =>
                      Array.isArray(items) ? items
                        ?.filter((item) => item?.is_available && item?.facility_type)
                        ?.map((item) => item?.facility_type)
                        : [])
                    ?.slice(0, 3)
                    ?.map((facility, index) =>
                      <Chips key={index} chiptext={facility} />
                    ) : null}
              </div>
            </div>
            <div className="basis-[57%] mt-0 w-full lg:w-fit min-w-fit h-full flex flex-col lg:flex-row items-end justify-between lg:justify-end gap-4 mb-4 lg:mb-0">

              {isLoadings ? (
                <div className="w-[140px] h-[38px] skeleton-medium-gray" />
              ) : (
                <RoundedButton
                  buttonName="Admission page"
                  fontBold
                  textColor="#2E90FA"
                  width="100%"
                  height="0.5rem"
                  onClick={handleAdmissionClick}
                />
              )}

              {isLoadings ? (
                <div className="w-[150px] h-[38px] skeleton-medium-gray" />
              ) : (
                <RoundedButton
                  withBackground
                  buttonName="View More Details"
                  fontBold
                  width="100%"
                  height="0.5rem"
                  onClick={handleNavigation}
                />
              )}

            </div>
          </div>
        </div>
      </div>
      <ApplicationStepsModal
        show={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        organisationId={data?._id}
        orgType={type === "school" ? "School" : type === "college" ? "College" : "Coaching"}
      />
    </>
  );

};

export default DetailCard;