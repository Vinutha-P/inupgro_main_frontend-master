"use client";

export type RecentStudent = {
  name: string;
  class: string;
};

export type RecentStudentsCardProps = {
  title: string;
  description: string;
  students: readonly RecentStudent[];
  viewMore: boolean;
};

export default function RecentStudentsCard({
  title,
  description,
  students,
  viewMore,
}: RecentStudentsCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_10px_25px_rgba(15,23,42,0.04)] h-full p-5">
      <div className="text-lg font-semibold text-slate-900 mb-1">{title}</div>
      <div className="text-sm text-slate-400 mb-4">{description}</div>

      <div className="flex flex-col gap-3 mt-2">
        {students.map((student, idx) => (
          <div key={`${student.name}-${idx}`} className="ml-1">
            <div className="text-base font-semibold text-slate-900">
              {student.name}
            </div>
            <div className="text-sm text-slate-400">{student.class}</div>
          </div>
        ))}
      </div>

      {viewMore && (
        <button
          type="button"
          className="w-full mt-5 py-3 rounded-xl bg-[#EBF1FF] text-[#0070F0] font-semibold hover:bg-[#DDE6FF] transition"
        >
          View More
        </button>
      )}
    </div>
  );
}
