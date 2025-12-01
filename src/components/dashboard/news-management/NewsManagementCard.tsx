import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import type { IconType } from "react-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

// Define types
interface StatCardData {
  title: string;
  value: string;
  change: string;
  changeDirection: "up" | "down";
  since: string;
  icon?: string;
  bgColor: string;
  textColor: string;
  chart?: number[];
  dark?: boolean;
}

// Utility function to style based on up/down
function getChangeStyle(direction: "up" | "down"): {
  container: string;
  iconColor: string;
  Icon: IconType;
} {
  if (direction === "up") {
    return {
      container: "bg-green/80 backdrop-blur-sm text-[#12B76A] border-[1px] border-[#054F31]",
      iconColor: "text-green-600",
      Icon: FaArrowUp,
    };
  } else {
    return {
      container: "bg-red-100 text-red-700",
      iconColor: "text-red-600",
      Icon: FaArrowDown,
    };
  }
}

const DashboardStats: React.FC = () => {
  const newDetails = useSelector((state:RootState)=>state.news.newsDetails)
  const {
    totalPublishedNews,
    publishedNewsAnalytics,
    totalActiveReaders,
    activeReadersAnalytics,
    totalTrendingNews,
    trendingNewsAnalytics,
  } = newDetails || {};

  const stats: StatCardData[] = [
    {
      title: "Total News Published",
      value: totalPublishedNews?.toLocaleString() || "0",
      change: `${Math.abs(publishedNewsAnalytics?.percentage || 0)}%`,
      changeDirection:
        publishedNewsAnalytics?.isPositive === true ? "up" : "down",
      since: "Since Last Week",
      icon: "📰",
      bgColor: "bg-[#0F172A]",
      textColor: "text-white",
      dark: true,
    },
    {
      title: "Total Active Readers",
      value: totalActiveReaders?.toLocaleString() || "0",
      change: `${Math.abs(activeReadersAnalytics?.percentage || 0)}%`,
      changeDirection:
        activeReadersAnalytics?.isPositive === true ? "up" : "down",
      since: "Since Last Week",
      bgColor: "bg-white",
      textColor: "text-gray-900",
      chart: [3, 5, 8, 6],
      dark: false,
    },
    {
      title: "Total Trending News",
      value: totalTrendingNews?.toLocaleString() || "0",
      change: `${Math.abs(trendingNewsAnalytics?.percentage || 0)}%`,
      changeDirection:
        trendingNewsAnalytics?.isPositive === true ? "up" : "down",
      since: "Since Last Month",
      bgColor: "bg-white",
      textColor: "text-gray-900",
      chart: [8, 4, 2, 3],
      dark: false,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {stats?.map((stat, index) => {
        const isDarkCard = stat.dark === true;
        const changeStyle = getChangeStyle(stat.changeDirection);

        return (
          <div
            key={index}
            className={`${stat.bgColor} ${isDarkCard ? "text-white" : ""
              } rounded-xl p-5 shadow border flex ${stat.chart
                ? "justify-between items-center"
                : "flex-col justify-between relative overflow-hidden"
              }`}
          >
            <div>
              <h4
                className={`text-sm font-medium ${isDarkCard ? "text-white" : "text-gray-500"
                  }`}
              >
                {stat.title}
              </h4>
              <h2
                className={`text-3xl font-bold mt-2 ${isDarkCard ? "text-white" : stat.textColor
                  }`}
              >
                {stat.value}
              </h2>
              <div className="mt-3 flex items-center gap-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${changeStyle.container}`}
                >
                  <changeStyle.Icon
                    className={`${changeStyle.iconColor} text-[10px]`}
                  />
                  {stat.change}
                </span>
                <span
                  className={`text-xs ${isDarkCard ? "text-gray-300" : "text-gray-400"
                    }`}
                >
                  {stat.since}
                </span>
              </div>
            </div>

            {stat?.chart ? (
              <div className="flex items-end gap-1 h-14">
                {stat?.chart?.map((height, i) => {
                  const max = Math.max(...stat.chart!);
                  const isMain = height === max;
                  const barColor =
                    isMain && stat.changeDirection === "up"
                      ? "bg-green"
                      : isMain && stat.changeDirection === "down"
                        ? "bg-red-500"
                        : "bg-gray-300";

                  return (
                    <div
                      key={i}
                      className={`w-2 rounded ${barColor}`}
                      style={{ height: `${height * 4}px` }}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="absolute right-0 bottom-0 opacity-10 text-[90px] font-black">
                {stat.icon}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;
