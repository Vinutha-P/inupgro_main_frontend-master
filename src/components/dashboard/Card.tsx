import Image from "next/image";
import React from "react";
import {
  FaUsers,
  FaGraduationCap,
  FaChartBar,
  FaRegNewspaper,
  FaBriefcase,
} from "react-icons/fa";

interface SummaryCardProps {
  value: string | number;
  label: string;
  iconSrc: React.ReactNode;
  iconAlt: string;
  bgColor: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  value,
  label,
  iconSrc,
  iconAlt,
  bgColor,
}) => {
  return (
    <div
      className={`${bgColor} w-[312px] p-6 rounded-lg shadow-md flex items-center justify-between transition-shadow hover:shadow-lg`}
    >
      <div>
        <h2 className="text-3xl font-bold mb-1 text-gray-800">{value}</h2>
        <p className="text-gray-600 text-base font-medium">{label}</p>
      </div>
      <div className="text-blue-600">{iconSrc}</div>
    </div>
  );
};

const SummaryCards = () => {
  return (
    <div className="flex gap-4">
      <SummaryCard
        value="589"
        label="Open Jobs"
        iconSrc={<FaBriefcase className="text-5xl text-[#3366FF]" />}
        iconAlt="Open Jobs Icon"
        bgColor="bg-[#E7F0FA]"
      />
      <SummaryCard
        value="2,517"
        label="Saved Candidates"
        iconSrc={<FaUsers className="text-5xl text-[#FFB020]" />}
        iconAlt="Saved Candidates Icon"
        bgColor="bg-[#FFF6E6]"
      />
    </div>
  );
};

export default SummaryCards;
export { SummaryCards };
