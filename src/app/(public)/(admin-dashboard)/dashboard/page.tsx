'use client'

import DashboardPageTemplate from "@/components/dashboard-templates/DashboardPageTemplate";
import StudentStats from "@/components/dashboard/StudentGenderIcon";
import TopHeadingWithSearchBar from "@/components/dashboard/students-tab/TopHeadingWithSearchBar";
import TimeDropdown from "@/components/dashboard/TimeDropDown";
import Image from "next/image";
import { useGetAllDetailsQuery } from "@/features/api/dashboardApiSlice";
import { FaArrowDown, FaArrowUp, FaEye, FaEdit } from "react-icons/fa";

export default function Dashboard() {
  const { data: getDetails } = useGetAllDetailsQuery();

  const stats = [
    {
      title: "Total Students",
      value: getDetails?.totalStudents?.toLocaleString() ?? "NA",
      change: `${getDetails?.totalStudentInsights ?? 0}%`,
      icon: "/users.png",
    },
    {
      title: "Total Teachers",
      value: getDetails?.totalTeachers?.toLocaleString() ?? "NA",
      change: `${getDetails?.totalTeacherInsights ?? 0}%`,
      icon: "/mortarboard.png",
    },
    {
      title: "Total Profile Views",
      value: getDetails?.totalProfileViews?.toLocaleString() ?? "NA",
      change: `${getDetails?.totalProfileViewInsights ?? 0}%`,
      icon: "/charts.png",
    },
    {
      title: "Total News Posted",
      value: getDetails?.totalNewsPosted?.toLocaleString() ?? "NA",
      change: `${getDetails?.totalNewsPostInsights ?? 0}%`,
      icon: "/copy.png",
    },
  ];

  const students = [
    {
      gender: "Male",
      count: getDetails?.maleStudents ?? 0,
      iconColor: "text-blue-300",
      change: getDetails?.maleStudentInsights ?? 0,
      changeType: (Number(getDetails?.maleStudentInsights) ?? 0) >= 0 ? "increase" : "decrease",
    },
    {
      gender: "Female",
      count: getDetails?.femaleStudents ?? 0,
      iconColor: "text-yellow-300",
      change: getDetails?.femaleStudentInsights ?? 0,
      changeType: (Number(getDetails?.femaleStudentInsights) ?? 0) >= 0 ? "increase" : "decrease",
    },
  ];

  const trendingNews = Array.isArray(getDetails?.trendingNews) ? getDetails.trendingNews : [];
  const recentStudents = Array.isArray(getDetails?.recentStudents?.data) ? getDetails.recentStudents.data : [];
  const totalRecentStudents = getDetails?.recentStudents?.total ?? 0;
  const userTypes = Array.isArray(getDetails?.pieChartData) ? getDetails.pieChartData : [];

  return (
    <DashboardPageTemplate>
      <div className="p-6 pt-0 space-y-6">
        <TopHeadingWithSearchBar details={getDetails} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold text-[#202020] mb-4">{stat.value}</h3>
                  <p className="text-[#202020] text-lg font-medium">{stat.title}</p>
                  <p className={`text-sm mb-3 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                    {stat.change} <span className="text-[#A5A5A5]">than last month</span>
                  </p>
                </div>
                <div className="text-3xl">
                  <Image src={stat.icon} alt="Icon" width={48} height={48} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chart and gender breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
          <div className="bg-white shadow-md rounded-lg p-4 lg:col-span-7">
            <div className="mb-4 flex justify-between items-center">
              <h4 className="text-lg font-semibold">Total No. of New Admissions</h4>
              <div className="space-x-2 text-sm text-gray-500">
                <button className="text-blue-600 font-medium">Days</button>
                <button>Weekly</button>
                <button>Monthly</button>
                <button>Yearly</button>
              </div>
            </div>
            <div className="h-64 bg-gray-100 flex items-center justify-center rounded">
              <p>Line Chart Placeholder</p>
            </div>
            <div className="flex justify-between mt-4">
              <div>
                <p className="text-sm text-gray-500">Male Students</p>
                <p className="text-blue-600 text-lg font-bold">{students[0].count.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Female Students</p>
                <p className="text-yellow-500 text-lg font-bold">{students[1].count.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <StudentStats />
          </div>

          <div className="col-span-3">
            <div className="bg-white shadow-md rounded-lg p-4 h-full">
              <h4 className="text-lg font-semibold mb-4">Recent Students</h4>
              <p className="text-gray-400 text-sm font-medium">You have {totalRecentStudents} new admissions</p>
              <div>
                {recentStudents.map((student: any, index: number) => (
                  <div key={index} className="text-black text-xl p-2 rounded font-bold ml-10 mt-6">
                    {student?.name || "NA"}
                    <p className="text-gray-400 text-sm font-medium">{student?.class || "NA"}</p>
                  </div>
                ))}
                {totalRecentStudents > recentStudents.length && (
                  <button className="mt-4 bg-[#EBF1FF] text-[#0070F0E5] font-semibold w-full py-5">
                    View {totalRecentStudents - recentStudents.length} More
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Trending News Table and User Types */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
          <div className="col-span-9">
            <div className="bg-white shadow-md rounded-lg p-4 h-full">
              <div className="flex justify-between items-start">
                <h4 className="text-lg font-semibold mb-4">Trending News</h4>
                <TimeDropdown />
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left bg-[#EAECF0]">
                    <th className="p-2 border-r-[1px] border-[#B9C0D4]">S. No.</th>
                    <th className="p-2 border-r-[1px] border-[#B9C0D4]">School Name</th>
                    <th className="p-2 border-r-[1px] border-[#B9C0D4]">News Title</th>
                    <th className="p-2 border-r-[1px] border-[#B9C0D4]">Posted By</th>
                    <th className="p-2 border-r-[1px] border-[#B9C0D4]">Posted Date</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {trendingNews.map((news: any, index: number) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{index + 1}</td>
                      <td>{news?.schoolName || "NA"}</td>
                      <td>{news?.newsTitle || "NA"}</td>
                      <td>{news?.postedBy?.name || "NA"}</td>
                      <td>{news?.postedDate ? new Date(news.postedDate).toLocaleDateString() : "NA"}</td>
                      <td>
                        <span className="flex items-center gap-2">
                          <FaEye />
                          <FaEdit />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-span-3">
            <div className="bg-white shadow-md rounded-lg p-4">
              <div className="flex justify-between items-start">
                <h4 className="text-lg font-semibold mb-4">User Types</h4>
                <TimeDropdown />
              </div>
              <div className="h-40 bg-gray-100 rounded flex items-center justify-center">
                <p>Pie Chart Placeholder</p>
              </div>
              <ul className="mt-4 space-y-2">
                {userTypes.map((type:any, index:number) => (
                  <li key={index} className="flex justify-between text-sm">
                    <span className="text-[#667085]">{type.label}</span>
                    <span className="font-semibold">{type.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardPageTemplate>
  );
}
