"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import JobDescription from "./JobDescription";
import CreateProfileForm from "./CareersForm";
import SchoolJobCard from "./SchoolJobCard";
import { useRouter, useSearchParams } from "next/navigation";
import { getRelativeTime } from "../../../utils/helper";

interface CareersRightSideProps {
  selectedJob?: any | null;
}

const CareersRightSide: React.FC<CareersRightSideProps> = ({ selectedJob }) => {
  const searchParams = useSearchParams();
  const jobParam = searchParams.get("job");
  const totalJobsCountParams = searchParams.get("totalJobsCount");
  const job = jobParam ? JSON.parse(jobParam) : null;
  const totalJobsCount = totalJobsCountParams ? JSON.parse(totalJobsCountParams) : null;

  selectedJob = job || selectedJob;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    // Simulate loading for consistency with original behavior
    const timer = setTimeout(() => {}, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleMobileTabletRedirect = () => {
    router.push("/careers/careeers-form");
  };

  if (!selectedJob) {
    return (
      <div className="w-full bg-white rounded-lg shadow-sm p-4 lg:p-10">
        <p className="text-gray-600">No job selected</p>
      </div>
    );
  }

  const jobDetails = {
    title: selectedJob.jobTitle,
    school: selectedJob?.postedByDetails?.name || "-",
    location: selectedJob.location,
    experience: `${selectedJob.yearsOfExperience} yrs exp`,
    applicants: selectedJob?.noOfApplicants,
    closingDate: new Date(selectedJob.applicationClosedDate).toLocaleDateString(
      "en-US",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
    vacancies: selectedJob.numberOfVacancies,
    // postedTime: '',
    postedTime: getRelativeTime(selectedJob.postedAt),
  };

  return (
    <div className="w-full bg-white  rounded-lg shadow-sm p-4 lg:p-10">
      <div className="lg:hidden">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-800">
            {totalJobsCount} Job Opportunities
          </span>
          <button onClick={()=> router.push('/careers')} className="text-sm text-blue-500 hover:text-blue-700">
            View All
          </button>
        </div>
        <SchoolJobCard
          title={jobDetails.title}
          schoolName={jobDetails.school}
          experience={jobDetails.experience}
          postedAgo={getRelativeTime(selectedJob.postedAt)}
          isNew={new Date(selectedJob.applicationClosedDate) > new Date()}
          isActiveHiring={selectedJob.isActive}
        />
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4">
        <div className="relative w-[120px] h-[120px] border-2 border-[#F6EBD0] rounded-md flex-shrink-0">
          {selectedJob?.postedByDetails?.logo_link && <Image
            src={selectedJob?.postedByDetails?.logo_link || "/placeholder.png"}
            className="object-contain"
            fill
            alt={selectedJob?.jobTitle || "image"}
          />}
        </div>
        <div className="flex-1">
          <h4 className="text-xl text-darkBlue lg:pb-[1px]">
            {jobDetails.title}
          </h4>
          <ul className="flex flex-wrap gap-y-1 gap-x-8 lg:w-[80%] mt-3 lg:py-[1px]">
            <li className="font-ibm-plex-sans font-normal text-base text-grayText list-none">
              {jobDetails.school}
            </li>
            <li className="font-ibm-plex-sans font-normal text-base text-grayText list-none lg:list-disc lg:ml-[14px] xl:ml-0">
              {jobDetails.location}
            </li>
            <li className="font-ibm-plex-sans font-normal text-base text-grayText list-none">
              {jobDetails.experience}
            </li>
          </ul>
          <ul className="flex flex-wrap items-center gap-6 mt-4">
            <li className="font-normal text-xs list-none">
              <span className="text-grayText">
                <strong className="text-steelGray">
                  {jobDetails.applicants}
                </strong>{" "}
                Applicants
              </span>
            </li>
            <li className="font-normal text-xs list-disc text-cloudGray">
              <span className="text-grayText">
                Application closed:{" "}
                <strong className="text-steelGray">
                  {jobDetails.closingDate}
                </strong>
              </span>
            </li>
            <li className="font-normal text-xs list-disc text-cloudGray">
              <span className="text-grayText">
                <strong className="text-steelGray">
                  {jobDetails.vacancies}
                </strong>{" "}
                Vacancies
              </span>
            </li>
            <li className="font-normal text-xs list-disc text-cloudGray">
              <span className="text-grayText">
                <strong className="text-steelGray">
                  {jobDetails.postedTime}
                </strong>
              </span>
            </li>
          </ul>

          <div>
            <button
              onClick={() => {
                if (isDesktop) {
                  setIsModalOpen(true);
                } else {
                  handleMobileTabletRedirect();
                }
              }}
              className="text-white bg-primaryLight hover:bg-[#2a67a9] rounded-[8px] px-8 py-2 mt-6 w-[150px] h-[40px]"
            >
              Apply
            </button>

            {isModalOpen && isDesktop && (
              <div
                className="fixed inset-0 flex items-center justify-center z-50"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  overflowY: "auto",
                }}
                onClick={() => setIsModalOpen(false)}
              >
                <div
                  className="relative bg-white p-6 rounded-lg w-full max-w-[900px] shadow-lg my-10 overflow-y-auto max-h-[90vh] no-scrollbar"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
                    aria-label="Close modal"
                  >
                    ×
                  </button>
                  <CreateProfileForm jobId={selectedJob?._id} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <Link
          href={
            selectedJob?.postedByDetails?.posted_type == "School"
              ? `/find/school-detail?id=${selectedJob?.postedById}`
              : selectedJob?.postedByDetails?.posted_type == "College"
              ? `find/college-detail?id=${selectedJob?.postedById}`
              : `/find/institute-detail?id=${selectedJob?.postedById}`
          }
          className="flex items-center text-blue-500 hover:underline my-8 text-semibold"
        >
          <Image
            className="mr-2"
            src="/book-open.png"
            alt="book open"
            width={19}
            height={19}
            priority
          />
          Visit {selectedJob?.postedByDetails?.posted_type} page
          <Image
            className="ml-2"
            src="/right_arrow.png"
            alt="right arrow"
            width={8}
            height={8}
            priority
          />
        </Link>

        <JobDescription selectedJob={selectedJob} />
      </div>
    </div>
  );
};

export default CareersRightSide;
