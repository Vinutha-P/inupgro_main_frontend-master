"use client";

import { ReactNode } from "react";
import {
  FaUsers,
  FaGraduationCap,
  FaChartBar,
  FaRegNewspaper,
} from "react-icons/fa";

type SummaryCardChange = {
  value: string;
  type: "increase" | "decrease";
};

export type SummaryCard = {
  title: string;
  value: number;
  icon: "users" | "graduation_cap" | "bar_chart" | "news";
  change: SummaryCardChange;
};

export type SummaryCardGridProps = {
  cards: readonly SummaryCard[];
};

const iconMap: Record<SummaryCard["icon"], ReactNode> = {
  users: <FaUsers className="text-5xl text-[#3366FF]" />,
  graduation_cap: <FaGraduationCap className="text-5xl text-[#FFB020]" />,
  bar_chart: <FaChartBar className="text-5xl text-[#4CAF50]" />,
  news: <FaRegNewspaper className="text-5xl text-[#9C27B0]" />,
};

export default function SummaryCardGrid({ cards }: SummaryCardGridProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const isIncrease = card.change.type === "increase";
          return (
            <div
              key={card.title}
              className="flex items-center justify-between rounded-2xl bg-white shadow-[0_10px_25px_rgba(15,23,42,0.04)] p-5 border border-slate-100"
            >
              <div className="space-y-1">
                <div className="text-2xl font-bold text-slate-900">
                  {card.value.toLocaleString()}
                </div>
                <div className="text-base font-medium text-slate-800">
                  {card.title}
                </div>
                <div
                  className={`text-sm font-medium ${
                    isIncrease ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {card.change.value}{" "}
                  <span className="text-slate-400 font-normal">
                    than last month
                  </span>
                </div>
              </div>
              <div>{iconMap[card.icon]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
