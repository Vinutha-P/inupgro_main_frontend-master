"use client";

export type UserTypeBreakdown = {
  type: string;
  value: number;
};

export type UserTypesDonutCardProps = {
  filters: readonly string[];
  activeFilter: string;
  total: number;
  breakdown: readonly UserTypeBreakdown[];
};

const COLORS = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444"];

export default function UserTypesDonutCard({
  filters,
  activeFilter,
  total,
  breakdown,
}: UserTypesDonutCardProps) {
  const totalValue =
    total || breakdown.reduce((acc, curr) => acc + curr.value, 0);
  const segments = (() => {
    let start = 0;
    return breakdown
      .map((item, idx) => {
        const pct = totalValue > 0 ? (item.value / totalValue) * 100 : 0;
        const end = start + pct;
        const segment = `${COLORS[idx % COLORS.length]} ${start}% ${end}%`;
        start = end;
        return segment;
      })
      .join(", ");
  })();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.03)] transition hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)]">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-semibold text-slate-900 tracking-tight">
            User Types
          </div>
          <select
            value={activeFilter}
            onChange={() => {}}
            className="h-9 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {filters.map((filter) => (
              <option key={filter} value={filter}>
                {filter}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col items-center gap-6 text-center">
          <div className="relative w-56 h-56">
            <div
              className="w-full h-full rounded-full"
              style={{
                backgroundImage: `conic-gradient(${segments})`,
              }}
            />
            <div className="absolute inset-7 bg-white rounded-full shadow-inner flex flex-col items-center justify-center">
              <div className="text-3xl font-extrabold text-slate-900">
                {totalValue.toLocaleString()}
              </div>
              <div className="text-sm text-slate-500 font-medium">
                Total Users
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 w-full ">
            {breakdown.map((item, index) => (
              <div key={item.type} className="flex flex-col items-start gap-2">
                <div className="text-sm font-semibold text-slate-500">
                  {item.type}
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-base font-semibold text-slate-900">
                    {item.value.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
