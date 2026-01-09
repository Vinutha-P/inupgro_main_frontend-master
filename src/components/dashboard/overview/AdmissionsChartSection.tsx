"use client";

import RecentStudentsCard, {
  RecentStudentsCardProps,
} from "./RecentStudentsCard";
import StudentGenderIcon from "@/components/dashboard/StudentGenderIcon";

type Series = {
  label: string;
  color: string;
  values: number[];
};

export type AdmissionStats = {
  title: string;
  year: number;
  filters: readonly string[];
  activeFilter: string;
  chartData: {
    currentFilterValue: string;
    labels: readonly string[];
    series: readonly Series[];
  };
};

export type GenderStats = {
  male: {
    count: number;
    change: { value: string; type: "increase" | "decrease" };
  };
  female: {
    count: number;
    change: { value: string; type: "increase" | "decrease" };
  };
};

export type AdmissionsChartSectionProps = {
  admissionStats: AdmissionStats;
  genderStats: GenderStats;
  recentStudents?: RecentStudentsCardProps;
};

const COLORS: Record<string, string> = {
  blue: "#3366FF",
  green: "#22C55E",
};

const getMaxValue = (series: readonly Series[]) =>
  Math.max(...series.flatMap((s) => s.values), 1);

const buildPath = (
  values: number[],
  width: number,
  height: number,
  maxValue: number
) => {
  const pts = values.map((v, idx) => {
    const x = (idx / Math.max(values.length - 1, 1)) * width;
    const y = height - (v / maxValue) * height;
    return [x, y];
  });
  if (!pts.length) return "";
  return pts
    .map(
      ([x, y], idx) => `${idx === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`
    )
    .join(" ");
};

export default function AdmissionsChartSection({
  admissionStats,
  genderStats,
  recentStudents,
}: AdmissionsChartSectionProps) {
  const { chartData } = admissionStats;
  const maxValue = getMaxValue(chartData.series);
  const chartWidth = 600;
  const chartHeight = 240;

  return (
    <div className="grid gap-4 mt-4 grid-cols-1 xl:grid-cols-[7fr_2fr_3fr]">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.03)] w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 md:px-6 pt-4 pb-3">
          <div>
            <div className="text-lg md:text-xl font-semibold text-slate-900">
              {admissionStats.title}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex items-center rounded-full bg-slate-100 p-1">
              {admissionStats.filters.map((filter) => (
                <button
                  key={filter}
                  className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full transition ${
                    filter === admissionStats.activeFilter
                      ? "bg-white shadow-sm text-slate-900"
                      : "text-slate-500"
                  }`}
                  type="button"
                >
                  {filter}
                </button>
              ))}
            </div>
            <select
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={admissionStats.year}
              onChange={() => {}}
            >
              <option>{admissionStats.year}</option>
            </select>
          </div>
        </div>

        <div className="px-4 md:px-6 pb-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-slate-100 bg-gradient-to-b from-white to-slate-50 p-4">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-60 md:h-64"
            >
              {Array.from({ length: 5 }).map((_, idx) => {
                const y = (idx / 4) * chartHeight;
                return (
                  <line
                    key={idx}
                    x1={0}
                    x2={chartWidth}
                    y1={y}
                    y2={y}
                    stroke="#E5E7EB"
                    strokeWidth={1}
                    strokeDasharray="3 3"
                  />
                );
              })}

              {chartData.series.map((s) => {
                const color = COLORS[s.color] ?? "#3366FF";
                const path = buildPath(
                  s.values,
                  chartWidth,
                  chartHeight,
                  maxValue
                );
                return (
                  <g key={s.label}>
                    <path
                      d={`${path} L ${chartWidth},${chartHeight} L 0,${chartHeight} Z`}
                      fill={`${color}22`}
                    />
                    <path
                      d={path}
                      fill="none"
                      stroke={color}
                      strokeWidth={2.5}
                    />
                    {s.values.map((v, i) => {
                      const x =
                        (i / Math.max(s.values.length - 1, 1)) * chartWidth;
                      const y = chartHeight - (v / maxValue) * chartHeight;
                      return (
                        <circle
                          key={`${s.label}-${i}`}
                          cx={x}
                          cy={y}
                          r={5}
                          fill="white"
                          stroke={color}
                          strokeWidth={2}
                        />
                      );
                    })}
                  </g>
                );
              })}
            </svg>

            <div className="flex flex-wrap items-center gap-4 mt-2">
              {chartData.series.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-2 text-sm text-slate-600"
                >
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[s.color] ?? "#3366FF" }}
                  />
                  {s.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <StudentGenderIcon genderStats={genderStats} />

      {recentStudents && (
        <div>
          <RecentStudentsCard {...recentStudents} />
        </div>
      )}
    </div>
  );
}
