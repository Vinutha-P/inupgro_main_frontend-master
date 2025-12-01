import Image from "next/image";
import searchIcn from "@/assets/search.svg"

// components/student/SectionHeader.tsx
interface SectionHeaderProps {
  title: string;
  subtitle: string;
  actionText: string;
}

export default function SectionHeader({
  title,
  subtitle,
  actionText,
}: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-start mt-3 mb-6">
      <div>
        <h1 className="text-2xl font-pop font-semibold text-[#333333]">
          {title}
        </h1>
        <p className="text-gray-600">{subtitle}</p>
      </div>

      <div className="py-2 px-[18px] max-w-[314px] flex w-full bg-white rounded-lg overflow-hidden border border-[#C4C4C4]">
         <Image src={searchIcn} width={18} height={18} alt="search" />
        <input type="text" className="pl-3 w-full h-full text-base outline-none" placeholder="Search" />
      </div>
    </div>
  );
}
