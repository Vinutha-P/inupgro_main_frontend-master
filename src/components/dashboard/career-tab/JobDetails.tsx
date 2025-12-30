"use client";
import { FaFacebook, FaTwitter, FaPinterest } from "react-icons/fa";
import JobOverviewCard from "./JobOverviewCard";
import SchoolInfoCard from "./SchoolInfoCard";
import Link from "next/link";
import SocialMediaIocn from "./SocialMediaIocn";
import Breadcrumb from "../Breadcrumb";
import { HiEye } from "react-icons/hi";
import { MdEdit, MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";

const sharePlatforms = [
  {
    name: "Facebook",
    icon: <FaFacebook />,
    color: "#0A65CC",
    url: "https://facebook.com/share?u=YOUR_URL_HERE",
  },
  {
    name: "Twitter",
    icon: <FaTwitter />,
    color: "#1DA1F2",
    url: "https://twitter.com/share?url=YOUR_URL_HERE",
  },
  {
    name: "Pinterest",
    icon: <FaPinterest />,
    color: "#CA2127",
    url: "https://pinterest.com/pin/create/button/?url=YOUR_URL_HERE",
  },
];

export default function JobDetailsPage() {
  const router = useRouter();

  const handleViewApplications = () => {
    router.push("/career/tables-details");
  };

  return (
    <div className="space-y-6">
      <Breadcrumb />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6 p-6 md:p-8 bg-white shadow-[0px_2px_4px_0px_#00001414] rounded-2xl">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-200">
            <h2 className="text-xl md:text-2xl font-semibold text-[#191F33]">
              Job Details
            </h2>
            <div className="flex items-center gap-2">
              <button className="text-sm px-4 py-2 border border-[#1C315E] text-[#1C315E] rounded-lg hover:bg-[#1C315E] hover:text-white transition-all duration-200 flex items-center gap-2 font-medium">
                <MdEdit className="w-4 h-4" />
                Edit
              </button>
              <button className="text-sm px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 flex items-center gap-2 font-medium">
                <MdDelete className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>

          {/* Job Title and Actions Section */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 pt-2">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="text-2xl md:text-3xl font-semibold text-[#191F33]">
                  Mathematics HOD
                </h3>
                <span className="inline-flex items-center bg-[#E8F1FF] text-[#0066FF] px-3 py-1 rounded-full text-xs font-medium">
                  Full Time
                </span>
              </div>
              <div className="flex items-center gap-2 text-[#767F8C] text-sm mt-2">
                <HiEye className="w-4 h-4" />
                <span>596 Viewers</span>
              </div>
            </div>
            <div className="flex flex-col items-start lg:items-end gap-2">
              <button
                onClick={handleViewApplications}
                className="bg-[#2E90FA] text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-[#1C7CD6] transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
              >
                View Applications (785)
              </button>
              <p className="text-xs text-[#767F8C]">
                Job expires in:{" "}
                <span className="text-[#E05151] font-semibold">
                  June 30, 2021
                </span>
              </p>
            </div>
          </div>

          {/* Job Description Section */}
          <div className="pt-4 border-t border-gray-100">
            <h4 className="font-semibold text-lg md:text-xl mb-4 text-[#191F33]">
              Job Description
            </h4>
            <div className="space-y-3 text-[#5E6670] text-base leading-relaxed">
              <p>
                Integer aliquet pretium consequat. Donec et sapien id leo
                accumsan pellentesque eget maximus tellus. Duis et est ac leo
                rhoncus tincidunt vitae vehicula augue. Donec in suscipit diam.
                Pellentesque quis justo sit amet arcu commodo sollicitudin.
                Integer finibus blandit condimentum. Vivamus sit amet ligula
                ullamcorper, pulvinar ante id, tristique erat. Quisque sit amet
                aliquam urna. Maecenas blandit felis id massa sodales finibus.
                Integer bibendum eu nulla eu sollicitudin. Sed lobortis diam
                tincidunt accumsan faucibus. Quisque blandit augue quis turpis
                auctor, dapibus euismod ante ultricies. Ut non felis lacinia
                turpis feugiat euismod at id magna. Sed ut orci arcu.
                Suspendisse sollicitudin faucibus aliquet.
              </p>
              <p>
                Integer aliquet pretium consequat. Donec et sapien id leo
                accumsan pellentesque eget maximus tellus. Duis et est ac leo
                rhoncus tincidunt vitae vehicula augue. Donec in suscipit diam.
                Pellentesque quis justo sit amet arcu commodo sollicitudin.
              </p>
            </div>
          </div>

          {/* Responsibilities Section */}
          <div className="pt-4 border-t border-gray-100">
            <h4 className="font-semibold text-lg md:text-xl mb-4 text-[#191F33]">
              Responsibilities
            </h4>
            <ul className="list-disc list-inside space-y-2.5 text-base text-[#5E6670] pl-2">
              <li>Quisque semper gravida est et consectetur.</li>
              <li>Curabitur blandit lorem velit.</li>
              <li>Morbi mattis in ipsum ac tempus.</li>
              <li>Curabitur eu vehicula libero.</li>
              <li>Vulputate turpis. Quisque ante odio.</li>
              <li>Commodo feugiat. Nulla laoreet, diam placerat.</li>
            </ul>
          </div>

          {/* Share Section */}
          <div className="pt-6 border-t border-gray-100">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-medium text-[#191F33] text-sm">
                Share this job:
              </span>
              <div className="flex items-center gap-2">
                {sharePlatforms.map((platform) => (
                  <Link
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-[#EDEFF5] rounded-lg px-3 py-2 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                    style={{ color: platform.color }}
                  >
                    <span className="text-base">{platform.icon}</span>
                    <span className="text-sm font-medium">{platform.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Job Overview Card */}
          <div className="bg-white shadow-[0px_2px_4px_0px_#00001414] rounded-2xl p-4 md:p-4">
            <h4 className="font-semibold text-xl mb-6 text-[#191F33]">
              Job Overview
            </h4>
            <JobOverviewCard />
          </div>

          {/* School Info Card */}
          <div className="bg-white shadow-[0px_2px_4px_0px_#00001414] rounded-2xl p-6 md:p-8">
            <div className="mb-6 pb-4 border-b border-gray-100">
              <h4 className="font-semibold text-xl text-[#18191C] mb-1">
                Jaipur School
              </h4>
              <p className="text-[#767F8C] text-sm font-normal">School</p>
            </div>
            <SchoolInfoCard />
            <div className="mt-6 pt-4 border-t border-gray-100">
              <SocialMediaIocn />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
