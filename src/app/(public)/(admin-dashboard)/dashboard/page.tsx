"use client";

import DashboardPageTemplate from "@/components/dashboard-templates/DashboardPageTemplate";
import TopHeadingWithSearchBar from "@/components/dashboard/students-tab/TopHeadingWithSearchBar";
import SummaryCardGrid from "@/components/dashboard/overview/SummaryCardGrid";
import AdmissionsChartSection from "@/components/dashboard/overview/AdmissionsChartSection";
import RecentStudentsCard from "@/components/dashboard/overview/RecentStudentsCard";
import TrendingNewsTable from "@/components/dashboard/overview/TrendingNewsTable";
import UserTypesDonutCard from "@/components/dashboard/overview/UserTypesDonutCard";

const DASHBOARD_OVERVIEW_DUMMY = {
  summaryCards: {
    cardData: [
      {
        title: "Total Students",
        value: 9825,
        icon: "users" as const,
        change: {
          value: "+0.5%",
          type: "increase" as const,
        },
      },
      {
        title: "Total Teachers",
        value: 653,
        icon: "graduation_cap" as const,
        change: {
          value: "-2%",
          type: "decrease" as const,
        },
      },
      {
        title: "Total Profile Views",
        value: 653,
        icon: "bar_chart" as const,
        change: {
          value: "+0.5%",
          type: "increase" as const,
        },
      },
      {
        title: "Total News Posted",
        value: 653,
        icon: "news" as const,
        change: {
          value: "-2%",
          type: "decrease" as const,
        },
      },
    ],
  },
  admissionStats: {
    title: "Total No. of new admissions",
    year: 2024,
    filters: ["Days", "Weekly", "Monthly", "Yearly"],
    activeFilter: "Days",
    chartData: {
      currentFilterValue: "Feb",
      labels: ["5", "6", "7", "8", "9", "10", "11", "12", "13", "14"],
      series: [
        {
          label: "New Admissions this Year",
          color: "blue",
          values: [18, 17, 21, 20, 22, 19, 24, 26, 20, 19],
        },
        {
          label: "Previous Year at this time",
          color: "green",
          values: [10, 9, 11, 12, 10, 9, 10, 11, 13, 14],
        },
      ],
    },
  },
  genderStats: {
    male: {
      count: 24680,
      icon: "male",
      change: {
        value: "15%",
        type: "increase" as const,
      },
    },
    female: {
      count: 3000,
      icon: "female",
      change: {
        value: "8%",
        type: "decrease" as const,
      },
    },
  },
  recentStudents: {
    title: "Recent Students",
    description: "You have 245 new admissions",
    students: [
      {
        name: "Melinda Moss",
        class: "VII-AB",
      },
      {
        name: "Melinda Moss",
        class: "VII-AB",
      },
    ],
    viewMore: true,
  },
  trendingNews: {
    title: "Trending News",
    filters: ["24 hours", "Last Week", "Last Month"],
    activeFilter: "24 hours",
    rows: [
      {
        sno: 1,
        school: "Boys Senior Secondary School",
        title: "Lorem ipsum dolor sit amet consectetur. Element...",
        postedBy: "Amit Saraswat",
        date: "20/10/2024",
      },
      {
        sno: 2,
        school: "Boys Senior Secondary School",
        title: "Lorem ipsum dolor sit amet consectetur. Element...",
        postedBy: "Ishani Datta",
        date: "20/10/2024",
      },
      {
        sno: 3,
        school: "Boys Senior Secondary School",
        title: "Lorem ipsum dolor sit amet consectetur. Element...",
        postedBy: "Ananya Jha",
        date: "20/10/2024",
      },
      {
        sno: 4,
        school: "Boys Senior Secondary School",
        title: "Lorem ipsum dolor sit amet consectetur. Element...",
        postedBy: "Ashish Kumar",
        date: "20/10/2024",
      },
    ],
  },
  userTypes: {
    filters: ["24 hours", "Last Week", "Last Month"],
    filter: "24 hours",
    total: 4198,
    breakdown: [
      {
        type: "Students",
        value: 2500,
      },
      {
        type: "Teachers",
        value: 498,
      },
      {
        type: "Others",
        value: 1200,
      },
    ],
  },
};

export default function Dashboard() {
  const overview = DASHBOARD_OVERVIEW_DUMMY;

  return (
    <DashboardPageTemplate>
      <div className="space-y-4 px-4 pt-4 pb-8 md:px-0">
        <TopHeadingWithSearchBar schoolName="Jaipur School" />

        <SummaryCardGrid cards={overview.summaryCards.cardData} />

        <AdmissionsChartSection
          admissionStats={overview.admissionStats}
          genderStats={overview.genderStats}
          recentStudents={overview.recentStudents}
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-4">
          <div className="md:col-span-9">
            <TrendingNewsTable
              title={overview.trendingNews.title}
              filters={overview.trendingNews.filters}
              activeFilter={overview.trendingNews.activeFilter}
              rows={overview.trendingNews.rows}
            />
          </div>
          <div className="md:col-span-3">
            <UserTypesDonutCard
              filters={overview.userTypes.filters}
              activeFilter={overview.userTypes.filter}
              total={overview.userTypes.total}
              breakdown={overview.userTypes.breakdown}
            />
          </div>
        </div>
      </div>
    </DashboardPageTemplate>
  );
}
