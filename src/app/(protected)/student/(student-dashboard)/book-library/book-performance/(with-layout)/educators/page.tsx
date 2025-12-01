"use client";

import { IoPlay } from "react-icons/io5";
import { useRouter } from "next/navigation";

interface VideoData {
  id: string;
  title: string;
  instructor: string;
  class: string;
  views: string;
  timeAgo: string;
  duration: string;
  avatarColor: string;
}

interface EducatorData {
  id: string;
  name: string;
  subject: string;
  class: string;
  videoCount: number;
  avatarColor: string;
}

export default function EducatorsPage() {
  const router = useRouter();

  // Limited videos data (same as main page)
  const videos: VideoData[] = [
    {
      id: "1",
      title: "Geometry Basics",
      instructor: "Harry Sharma",
      class: "9th class",
      views: "443k views",
      timeAgo: "22 hours ago",
      duration: "12:34",
      avatarColor: "#3B82F6",
    },
    {
      id: "2",
      title: "Polynomials",
      instructor: "Ankit Marteja",
      class: "9th class",
      views: "443k views",
      timeAgo: "22 hours ago",
      duration: "15:42",
      avatarColor: "#8B5CF6",
    },
    {
      id: "3",
      title: "Linear Equations",
      instructor: "Monika Srishant",
      class: "9th class",
      views: "443k views",
      timeAgo: "22 hours ago",
      duration: "18:21",
      avatarColor: "#06B6D4",
    },
  ];

  // All educators data
  const allEducators: EducatorData[] = [
    {
      id: "1",
      name: "Harry Sharma",
      subject: "Mathematics",
      class: "9th class",
      videoCount: 120,
      avatarColor: "#3B82F6",
    },
    {
      id: "2",
      name: "Ankit Marteja",
      subject: "Mathematics",
      class: "9th class",
      videoCount: 105,
      avatarColor: "#8B5CF6",
    },
    {
      id: "3",
      name: "Monika Srishant",
      subject: "Mathematics",
      class: "9th class",
      videoCount: 90,
      avatarColor: "#06B6D4",
    },
    {
      id: "4",
      name: "Rajesh Kumar",
      subject: "Mathematics",
      class: "9th class",
      videoCount: 85,
      avatarColor: "#10B981",
    },
    {
      id: "5",
      name: "Priya Singh",
      subject: "Mathematics",
      class: "9th class",
      videoCount: 76,
      avatarColor: "#F59E0B",
    },
    {
      id: "6",
      name: "Suresh Patel",
      subject: "Mathematics",
      class: "9th class",
      videoCount: 95,
      avatarColor: "#EF4444",
    },
    {
      id: "7",
      name: "Neha Gupta",
      subject: "Mathematics",
      class: "9th class",
      videoCount: 68,
      avatarColor: "#8B5CF6",
    },
    {
      id: "8",
      name: "Amit Kumar",
      subject: "Mathematics",
      class: "9th class",
      videoCount: 82,
      avatarColor: "#06B6D4",
    },

    
     {
      id: "9",
      name: "Harry Sharma",
      subject: "Mathematics",
      class: "9th class",
      videoCount: 120,
      avatarColor: "#3B82F6",
    },
    {
      id: "10",
      name: "Ankit Marteja",
      subject: "Mathematics",
      class: "9th class",
      videoCount: 105,
      avatarColor: "#8B5CF6",
    },
    {
      id: "11",
      name: "Monika Srishant",
      subject: "Mathematics",
      class: "9th class",
      videoCount: 90,
      avatarColor: "#06B6D4",
    },
    {
      id: "12",
      name: "Rajesh Kumar",
      subject: "Mathematics",
      class: "9th class",
      videoCount: 85,
      avatarColor: "#10B981",
    },
    {
      id: "13",
      name: "Priya Singh",
      subject: "Mathematics",
      class: "9th class",
      videoCount: 76,
      avatarColor: "#F59E0B",
    },
    {
      id: "14",
      name: "Suresh Patel",
      subject: "Mathematics",
      class: "9th class",
      videoCount: 95,
      avatarColor: "#EF4444",
    },
    {
      id: "15",
      name: "Neha Gupta",
      subject: "Mathematics",
      class: "9th class",
      videoCount: 68,
      avatarColor: "#8B5CF6",
    },
    {
      id: "16",
      name: "Amit Kumar",
      subject: "Mathematics",
      class: "9th class",
      videoCount: 82,
      avatarColor: "#06B6D4",
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  return (
    <>
      {/* Welcome Message - exact styling */}
      <div className="space-y-2">
        <h2 className="text-2xl font-normal text-deepBlue">
          All Educators{" "}
          <span className="text-deepBlue font-bold">Collection!</span> 👨‍🏫
        </h2>
        <p className="text-grayText text-base">
          Explore all leading mathematics educators and their expertise
        </p>
      </div>

      {/* Videos Section - Same as main page */}
      {/* <section>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
          <h3 className="text-xl font-semibold text-darkBlue">
            Curated Videos on Key Topics
          </h3>
          <button
            onClick={() =>
              router.push("/student/book-library/book-performance/videos")
            }
            className="text-grayText hover:text-darkBlue font-medium text-sm transition-colors duration-200 self-start sm:self-auto"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white pt-4 px-4 rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer"
            >
              <div className="relative rounded-xl aspect-video bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-white/95 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                    <IoPlay className="w-5 h-5 text-deepBlue ml-1" />
                  </div>
                </div>
              </div>

              <div className="py-4">
                <h4 className="font-semibold text-[#111827] mb-3 text-base leading-tight">
                  {video.title}
                </h4>

                <div className="flex items-center mb-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-semibold mr-2"
                    style={{ backgroundColor: video.avatarColor }}
                  >
                    {getInitials(video.instructor)}
                  </div>
                  <span className="text-sm text-grayText">
                    {video.instructor} | {video.class}
                  </span>
                </div>

                <div className="text-xs text-[#9CA3AF] flex">
                  {video.views} &nbsp;{" "}
                  <div className="text-lg leading-[15px] text-customGrayBlue">
                    •
                  </div>{" "}
                  &nbsp; {video.timeAgo}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* Educators Section - All Educators */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
          <h3 className="text-xl font-semibold text-darkBlue">
            Leading Educators
          </h3>
          <button
            onClick={() => router.push("/student/book-library/book-performance")}
            className="text-grayText hover:text-darkBlue font-medium text-sm transition-colors duration-200 self-start sm:self-auto"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allEducators.map((educator) => (
            <div
              key={educator.id}
              className="bg-[#EDF3FF] rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div
                className="w-[120px] h-[120px] mx-auto mb-4 rounded-full flex items-center justify-center text-white font-semibold text-lg"
                style={{ backgroundColor: educator.avatarColor }}
              >
                {getInitials(educator.name)}
              </div>

              <h4 className="font-semibold text-[#111827] mb-1 text-xl">
                {educator.name}
              </h4>
              <p className="text-base text-grayText mb-4">
                {educator.subject} | {educator.class}
              </p>

              <button
                className="!bg-[#D1E9FF] font-semibold py-2 px-4 rounded-full text-sm"
                style={{
                  color: "#2E90FA",
                }}
              >
                {educator.videoCount} Videos
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
