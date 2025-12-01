"use client";

import { useEffect, useState } from "react";
import { HiTrendingUp } from "react-icons/hi";
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

interface DayData {
  day: string;
  value: number;
  isActive: boolean;
}

export default function BookPerformancePage() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [animatedTestScore, setAnimatedTestScore] = useState(0);
  const [animatedReadingHours, setAnimatedReadingHours] = useState(0);
  const [animatedActivity, setAnimatedActivity] = useState(0);

  // Exact data from design
  const testScore = 78;
  const readingHours = 1.5;
  const readingGrowth = 7.05;
  const weeklyActivity = 82;
  const activityGrowth = 19.5;

  // Weekly reading data - exact from design
  const weeklyReadingData: DayData[] = [
    { day: "M", value: 25, isActive: false },
    { day: "T", value: 40, isActive: false },
    { day: "W", value: 30, isActive: false },
    { day: "T", value: 50, isActive: false },
    { day: "F", value: 65, isActive: true },
    { day: "S", value: 35, isActive: false },
    { day: "S", value: 45, isActive: false },
  ];

  // Activity chart data - side by side points
  const activityChartData = [0, 10, 5, 15, 5, 18, 40, 15];

  // Limited videos data for main page
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

  // Limited educators data for main page
  const educators: EducatorData[] = [
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
  ];

  // Animation effects
  useEffect(() => {
    if (isHovered === "test") {
      const interval = setInterval(() => {
        setAnimatedTestScore((prev) => {
          if (prev < testScore) return prev + 2;
          return testScore;
        });
      }, 30);
      return () => clearInterval(interval);
    } else {
      setAnimatedTestScore(testScore);
    }
  }, [isHovered, testScore]);

  useEffect(() => {
    if (isHovered === "reading") {
      const interval = setInterval(() => {
        setAnimatedReadingHours((prev) => {
          if (prev < readingHours) return prev + 0.1;
          return readingHours;
        });
      }, 50);
      return () => clearInterval(interval);
    } else {
      setAnimatedReadingHours(readingHours);
    }
  }, [isHovered, readingHours]);

  useEffect(() => {
    if (isHovered === "activity") {
      const interval = setInterval(() => {
        setAnimatedActivity((prev) => {
          if (prev < weeklyActivity) return prev + 2;
          return weeklyActivity;
        });
      }, 30);
      return () => clearInterval(interval);
    } else {
      setAnimatedActivity(weeklyActivity);
    }
  }, [isHovered, weeklyActivity]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  const HalfCircleProgress = ({
    value,
    isAnimated = false,
  }: {
    value: number;
    isAnimated?: boolean;
  }) => {
    const size = 140;
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = Math.PI * radius;
    const strokeDasharray = `${(value / 100) * circumference} ${circumference}`;

    return (
      <div className="relative top-1.5 inline-flex items-center justify-center flex-col">
        <svg
          width={size}
          height={size / 2 + 20}
          className="overflow-visible"
          viewBox={`0 0 ${size} ${size / 2 + 20}`}
        >
          <path
            d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${
              size - strokeWidth / 2
            } ${size / 2}`}
            fill="none"
            stroke="#F1F5F9"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <path
            d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${
              size - strokeWidth / 2
            } ${size / 2}`}
            fill="none"
            stroke="#22C55E"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            className={`transition-all duration-1000 ease-out ${
              isAnimated ? "drop-shadow-lg" : ""
            }`}
            style={{
              filter: isAnimated
                ? "drop-shadow(0 0 8px rgba(34, 197, 94, 0.5))"
                : "none",
            }}
          />
        </svg>
        <div className="absolute bottom-2 flex items-center justify-center">
          <span
            className={`text-2xl relative bottom-4 font-semibold text-deepBlue transition-all duration-300 ${
              isHovered === "test" ? "scale-110 text-[#22C55E]" : ""
            }`}
          >
            {Math.round(value)}%
          </span>
        </div>
      </div>
    );
  };

  const SideBySideBarChart = ({
    data,
    isAnimated = false,
  }: {
    data: DayData[];
    isAnimated?: boolean;
  }) => {
    const maxValue = Math.max(...data.map((d) => d.value));
    const chartHeight = 60;

    return (
      <div className="w-full">
        <div
          className="flex items-end justify-between mb-3 gap-2.5"
          style={{ height: `${chartHeight}px` }}
        >
          {data.map((item, index) => (
            <div
              key={index}
              className={`rounded-full transition-all duration-700 ease-out ${
                item.isActive
                  ? `bg-[#2563EB] ${
                      isAnimated ? "shadow-md shadow-blue-200" : ""
                    }`
                  : `bg-[#DBEAFE] ${isAnimated ? "bg-[#BFDBFE]" : ""}`
              }`}
              style={{
                width: "12%",
                height: `${(item.value / maxValue) * chartHeight}px`,
                minHeight: "8px",
                transform: isAnimated ? "scaleY(1.1)" : "scaleY(1)",
                transformOrigin: "bottom",
              }}
            />
          ))}
        </div>
        <div className="flex justify-between">
          {data.map((item, index) => (
            <span
              key={index}
              className={`text-xs font-medium transition-colors duration-300 ${
                isHovered === "reading" ? "text-[#374151]" : "text-[#64748B]"
              }`}
              style={{ width: "12%", textAlign: "center" }}
            >
              {item.day}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const SideBySideLineChart = ({
    data,
    isAnimated = false,
  }: {
    data: number[];
    isAnimated?: boolean;
  }) => {
    const width = 160;
    const height = 60;
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue || 1;

    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - minValue) / range) * height;
      return { x, y, value };
    });

    const pathData = points
      .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x},${point.y}`)
      .join(" ");
    const fillPath = `${pathData} L ${width},${height} L 0,${height} Z`;

    return (
      <div className="w-full">
        <div className="relative mb-3" style={{ height: `${height}px` }}>
          <svg
            width={width}
            height={height}
            className="w-full h-full"
            viewBox={`0 0 ${width} ${height}`}
          >
            <defs>
              <linearGradient
                id="activityGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="#22C55E"
                  stopOpacity={isAnimated ? "0.4" : "0.25"}
                />
                <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
              </linearGradient>
              <filter id="lineGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              d={fillPath}
              fill="url(#activityGradient)"
              className="transition-all duration-500"
            />

            <path
              d={pathData}
              fill="none"
              stroke="#22C55E"
              strokeWidth={isAnimated ? 3.5 : 3}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-500"
              style={{
                filter: isAnimated ? "url(#lineGlow)" : "none",
              }}
            />

            {points.map((point, index) => (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r={isAnimated ? 4 : 3}
                fill="#22C55E"
                className="transition-all duration-300"
                style={{
                  filter: isAnimated
                    ? "drop-shadow(0 0 4px rgba(34, 197, 94, 0.7))"
                    : "none",
                }}
              />
            ))}
          </svg>
        </div>
        <div className="flex justify-between">
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day, index) => (
            <span
              key={day}
              className={`text-xs font-medium transition-colors duration-300 ${
                isHovered === "activity" ? "text-[#374151]" : "text-[#64748B]"
              }`}
              style={{ width: `${100 / 7}%`, textAlign: "center" }}
            >
              {day}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Welcome Message - exact styling */}
      <div className="space-y-2">
        <h2 className="text-2xl font-normal text-deepBlue">
          Keep Going{" "}
          <span className="text-deepBlue font-bold">Akshay!</span> 🎉
        </h2>
        <p className="text-grayText text-base">
          Continue reading the book to increase your Stats
        </p>
      </div>

      {/* Stats Cards - exact recreation */}
      <div className="grid grid-cols-1 md:grid-cols-3 p-5 gap-6">
        {/* 1st Card: HALF CIRCLE Progress - Exact from Figma */}
        <div
          className="bg-[#f7f7f9] rounded-xl px-5 py-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
          onMouseEnter={() => setIsHovered("test")}
          onMouseLeave={() => setIsHovered(null)}
        >
          <h3 className="text-xl font-normal text-[#000000] mb-2 tracking-wide">
            Test Score
          </h3>
          <div className="flex justify-center">
            <HalfCircleProgress
              value={animatedTestScore}
              isAnimated={isHovered === "test"}
            />
          </div>
          <p className="text-sm text-grayText text-center leading-tight px-1">
            Keep participating on different tests to increase your score
          </p>
        </div>

        {/* 2nd Card: SIDE BY SIDE Bar Chart - Exact from Figma */}
        <div
          className="bg-[#f7f7f9] rounded-xl flex flex-col justify-between px-5 py-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
          onMouseEnter={() => setIsHovered("reading")}
          onMouseLeave={() => setIsHovered(null)}
        >
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-normal text-[#000000] mb-2 tracking-wide">
              Reading Stats
            </h3>
            <span className="text-grayText rounded-full">This Week</span>
          </div>
          <div className="flex gap-6 w-full">
            <div className="flex flex-col justify-end gap-1 min-w-[106px]">
              <div
                className={`text-2xl !leading-[10px] relative bottom-4 font-semibold text-deepBlue transition-all duration-300 ${
                  isHovered === "reading" ? "scale-105 text-[#2563EB]" : ""
                }`}
              >
                {animatedReadingHours.toFixed(1)}hrs
              </div>
              <div
                className={`flex items-center text-sm font-medium transition-all duration-300 ${
                  isHovered === "reading"
                    ? "text-[#16A34A]"
                    : "text-[#22C55E]"
                }`}
              >
                <HiTrendingUp className="w-4 h-4 mr-1" />
                <span>{readingGrowth}%</span>
              </div>
            </div>
            <div className="w-full">
              <SideBySideBarChart
                data={weeklyReadingData}
                isAnimated={isHovered === "reading"}
              />
            </div>
          </div>
        </div>

        {/* 3rd Card: SIDE BY SIDE Line Chart - Exact from Figma */}
        <div
          className="bg-[#f7f7f9] rounded-xl flex flex-col justify-between px-5 py-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
          onMouseEnter={() => setIsHovered("activity")}
          onMouseLeave={() => setIsHovered(null)}
        >
          <h3 className="text-xl font-normal text-[#000000] mb-2 tracking-wide">
            Weekly Activity
          </h3>
          <div className="flex gap-6 w-full">
            <div className="flex flex-col justify-end gap-1 min-w-[106px]">
              <div
                className={`text-2xl !leading-[10px] relative bottom-4 font-semibold text-deepBlue transition-all duration-300 ${
                  isHovered === "activity" ? "scale-105 text-[#22C55E]" : ""
                }`}
              >
                {Math.round(animatedActivity)}%
              </div>
              <div
                className={`flex items-center text-sm font-medium transition-all duration-300 ${
                  isHovered === "activity"
                    ? "text-[#16A34A]"
                    : "text-[#22C55E]"
                }`}
              >
                <HiTrendingUp className="w-4 h-4 mr-1" />
                <span>{activityGrowth}%</span>
              </div>
            </div>
            <div className="w-full">
              <SideBySideLineChart
                data={activityChartData}
                isAnimated={isHovered === "activity"}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Videos Section */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
          <h3 className="text-xl font-semibold text-darkBlue">
            Curated Videos on Key Topics
          </h3>
          <button 
            onClick={() => router.push('/student/book-library/book-performance/videos')}
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
      </section>

      {/* Educators Section */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
          <h3 className="text-xl font-semibold text-darkBlue">
            Leading Educators
          </h3>
          <button 
            onClick={() => router.push('/student/book-library/book-performance/educators')}
            className="text-grayText hover:text-darkBlue font-medium text-sm transition-colors duration-200 self-start sm:self-auto"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {educators.map((educator) => (
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