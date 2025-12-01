"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Job } from "@/types";
import { getRelativeTime } from "../../../utils/helper";

interface CareersLeftSideProps {
  setSelectedJob: (job: Job) => void;
  isLoading: boolean;
  jobs: any;
  jobsTotalCount: any;
}

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 1024);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return isMobile;
};

const CareersLeftSide: React.FC<CareersLeftSideProps> = ({
  setSelectedJob,
  isLoading,
  jobs,
  jobsTotalCount,
}) => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const [jobListings, setJobListings] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);
  useEffect(() => {
    if (jobs && jobs.length > 0) {
      const listings = jobs.map((apiJob: Job) => ({
        id: apiJob._id,
        title: apiJob.jobTitle,
        image: apiJob.postedByDetails?.logo_link,
        location: apiJob.location,
        yrsExp: `${apiJob.yearsOfExperience} yrs`,
        hoursAgo: getRelativeTime(apiJob?.postedAt), // Static placeholder as API lacks posting date
        isNew: new Date(apiJob.applicationClosedDate) > new Date(),
        isActiveHiring: apiJob.isActive,
      }));
      setJobListings(listings);
    }
  }, [jobs]);

  const totalCount = jobsTotalCount || 0;

  const handleJobClick = (job: any) => {
    if (isMobile) {
      const query = new URLSearchParams({
        job: JSON.stringify(job),
        totalJobsCount: totalCount.toString(jobs?.totalCount),
      }).toString();
      router.push(`/careers/school-job-list?${query}`);
    } else {
      setSelectedJob(job);
    }
  };

  const renderJobCard = (job: any, index: number) => (
    <div
      onClick={() => handleJobClick(jobs[index])}
      className={`group ${isMobile ? "cursor-pointer" : ""
        } hover:bg-[#eaf5ff] bg-white rounded-md px-2.5 py-[13px] border-[1px] border-[#DCDFEA] lg:border-b lg:border-cloudGray flex flex-row gap-3 transition mb-3 !lg:mb-0`}
    >
      <div className="relative w-[92px] h-[92px] sm:w-[100px] sm:h-[100px] rounded-md flex-shrink-0">
       {job?.image && <Image
          src={job?.image}
          className="object-contain"
          fill
          alt={job?.title || "image"}
        />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {job.isNew && (
            <span className="text-xs bg-[#ECE9FE] text-[#6172F3] px-2 py-0.5 rounded-full">
              New
            </span>
          )}
          {job.isActiveHiring && (
            <span className="text-xs bg-[#CCFBEF] text-[#15B79E] px-2 py-0.5 rounded-full">
              Active hiring
            </span>
          )}
        </div>
        <h3 className="font-semibold text-base text-darkBlue overflow-hidden text-ellipsis whitespace-nowrap w-full">
          {job.title}
        </h3>
        <p className="text-[11.5px] text-grayMedium">{job.location}</p>
        <ul className="flex items-center gap-4 mt-2 text-xs text-gray-500 list-disc pl-4 marker:text-cloudGray">
          <li className="list-none flex items-center gap-1">
            <Image src="/cart.png" alt="cart image" width={11} height={14} />
            {job.yrsExp}
          </li>
          <li className="ml-4 list-disc">{job.hoursAgo}</li>
        </ul>
      </div>
    </div>
  );

  return (
    <>
      <p className="text-sm text-[#999999] font-medium mb-2 lg:hidden">
        {totalCount} Job Opportunities
      </p>
      <div className="w-full bg-white rounded-md p-2.5 lg:p-5 border-[1px] border-[#DCDFEA]">
        <p className="text-sm text-gray-600 mb-2 hidden lg:block">
          {totalCount} Job Opportunities
        </p>
        <div className="space-y-3">
          {isLoading ? (
            <p>Loading...</p>
          ) : jobListings.length > 0 ? (
            jobListings?.slice(0, visibleCount)?.map((job: any, index: any) => (
              <div key={job.id}>{renderJobCard(job, index)}</div>
            ))
          ) : (
            <p>No job listings available.</p>
          )}
        </div>
        <button
          onClick={() =>
            setVisibleCount(visibleCount >= jobListings.length ? 5 : visibleCount + 5)
          }
          className="text-blue-500 hover:underline mt-4 w-full text-left hidden lg:block"
        >
          {visibleCount >= jobListings.length ? "View Less" : "View More"}
        </button>
      </div>
    </>
  );
};

export default CareersLeftSide;
