import Image from "next/image";

interface SchoolJobCardProps {
    title: string;
    schoolName: string;
    experience: string;
    postedAgo: string;
    isNew?: boolean;
    isActiveHiring?: boolean;
    imageUrl?: string; // optional if you later replace the placeholder box with an image
}

const SchoolJobCard: React.FC<SchoolJobCardProps> = ({
    title,
    schoolName,
    experience,
    postedAgo,
    isNew = false,
    isActiveHiring = false,
    imageUrl,
}) => {
    return (
        <div className="hover:bg-[#eaf5ff] bg-white rounded-md px-2.5 py-[13px] border-[1px] border-coolGray lg:border-b lg:border-cloudGray flex flex-col sm:flex-row gap-3 transition mb-3 !lg:mb-0 my-3">
            {/* Image or Placeholder */}
            <div className="w-[92px] h-[92px] sm:w-[100px] sm:h-[100px] bg-background group-hover:bg-softGray rounded-md flex-shrink-0">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt="School Logo"
                        className="w-full h-full object-cover rounded-md"
                        width={100}
                        height={100}
                    />
                ) : (
                    <div className="bg-background w-full h-full rounded-md" />
                )}
            </div>

            <div className="flex-1 min-w-0">
                {/* New and Active Hiring Badges */}
                <div className="flex items-center gap-2 mb-1">
                    {isNew && (
                        <span className="text-xs bg-[#ECE9FE] text-[#6172F3] px-2 py-0.5 rounded-full">
                            New
                        </span>
                    )}
                    {isActiveHiring && (
                        <span className="text-xs bg-[#CCFBEF] text-[#15B79E] px-2 py-0.5 rounded-full">
                            Active Hiring
                        </span>
                    )}
                </div>

                {/* Job Title */}
                <h3 className="font-semibold text-base text-darkBlue overflow-hidden text-ellipsis whitespace-nowrap w-full">
                    {title}
                </h3>

                {/* School Name */}
                <p className="text-[11.5px] text-grayMedium mt-1">{schoolName}</p>

                {/* Job Details (Experience and Posted Ago) */}
                <ul className="flex items-center gap-4 mt-2 text-xs text-gray-500 list-disc pl-4 marker:text-cloudGray">
                    <li className="list-none flex items-center gap-1">
                        <Image src="/cart.png" alt="experience icon" width={11} height={14} />
                        {experience}
                    </li>
                    <li className="ml-4 list-none">{postedAgo}</li>
                </ul>
            </div>
        </div>
    );
};

export default SchoolJobCard;
