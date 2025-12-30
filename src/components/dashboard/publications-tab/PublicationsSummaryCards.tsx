import React from "react";
import { FaBook, FaBookReader, FaFileAlt } from "react-icons/fa";

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

const PublicationsSummaryCards = () => {
  return (
    <div className="flex gap-4">
      <SummaryCard
        value="550"
        label="Total Books Published"
        iconSrc={<FaBook className="text-5xl text-[#3366FF]" />}
        iconAlt="Total Books Published Icon"
        bgColor="bg-[#E7F0FA]"
      />
      <SummaryCard
        value="12"
        label="Top Performing Books"
        iconSrc={<FaBookReader className="text-5xl text-[#10B981]" />}
        iconAlt="Top Performing Books Icon"
        bgColor="bg-[#D1FAE5]"
      />
      <SummaryCard
        value="2,517"
        label="Total Views/Reads"
        iconSrc={<FaFileAlt className="text-5xl text-[#FFB020]" />}
        iconAlt="Total Views/Reads Icon"
        bgColor="bg-[#FFF6E6]"
      />
      <SummaryCard
        value="18"
        label="Unpublished Drafts"
        iconSrc={<FaFileAlt className="text-5xl text-[#EF4444]" />}
        iconAlt="Unpublished Drafts Icon"
        bgColor="bg-[#FEE2E2]"
      />
    </div>
  );
};

export default PublicationsSummaryCards;
export { PublicationsSummaryCards };
