import { FaPlus } from "react-icons/fa";
import { MdEdit, MdClose } from "react-icons/md";
interface CardListProps {
    list: any[];
    onAdd: (newItem: any) => void;
    openModal: any;
    label: string;
    getTitle: (item: any) => string;
    getSubtitle: (item: any) => string;
    getSubtitle1?: (item: any) => string;
}

const CardList: React.FC<CardListProps> = ({
    list,
    onAdd,
    openModal,
    label,
    getTitle,
    getSubtitle,
    getSubtitle1,
}) => {

    return (
        <div className="pb-6 mt-7 flex overflow-x-auto space-x-5">
            {/* Fixed Add Card */}
            <div className="flex-shrink-0 sticky left-0 z-10 bg-background rounded-lg h-[15rem] w-[12rem] flex flex-col overflow-hidden shadow-lg">
                <div className="h-[90%] flex items-center justify-center bg-[#D0E0FF]">
                    <div
                        className="w-7 h-7 rounded-full border-2 border-white bg-primaryLight flex items-center justify-center cursor-pointer shadow-md hover:scale-105 transition"
                        onClick={openModal}
                        onKeyUp={(e) => {
                            if (e.key === "Enter" || e.key === " ") openModal();
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") openModal();
                        }}
                        role="button"
                        tabIndex={0}
                    >
                        <FaPlus className="text-white text-sm" />
                    </div>
                </div>
                <div className="h-[20%] bg-white flex flex-col">
                    <div className="flex-1 flex items-start justify-start ml-5 mt-2">
                        <p className="text-xs text-deepBlue font-semibold">{label}</p>
                    </div>
                </div>
            </div>

            {/* Scrollable Dynamic Cards */}
            {list?.map((item: any, index: number) => {
                return(
                <div
                    key={`${label.toLowerCase()}-${index}`}
                    // className="flex-shrink-0 bg-background rounded-lg h-[15rem] w-[12rem] flex flex-col overflow-hidden shadow-lg"
                    className="group relative flex-shrink-0 bg-background rounded-lg h-[15rem] w-[12rem] flex flex-col overflow-hidden shadow-lg"
                >

                    {/* <div className="h-[90%] flex items-center justify-center bg-[#D0E0FF] relative"> */}
                    <div className="h-[90%] w-full bg-[#D0E0FF] relative overflow-hidden">
                        {item?.profile_picture && (
                            <img
                                src={item?.profile_picture}
                                alt="Student"
                                className="w-full h-full object-cover object-center"
                            // className="object-cover h-full w-full"
                            />
                        )}

                        {/* Edit Icon on Hover */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <div className="cursor-pointer hover:scale-105 transition"
                                onClick={() => openModal(item, index)}
                            >
                                <MdEdit className="text-white text-2xl" />
                            </div>
                        </div>
                    </div>
                    <div className="h-[30%] bg-white flex flex-col">
                        <div className="flex-1 flex items-start justify-start ml-5 mt-2">
                            <p className="text-xs text-deepBlue font-semibold">{getTitle(item)}</p>
                        </div>
                        <div className="flex-1 flex items-start justify-start ml-5 ">
                            <p className="text-xs text-gray-500">{getSubtitle(item)}</p>
                        </div>
                        {getSubtitle1?.(item) && (
                            <div className="flex-1 flex items-start justify-start ml-5 mb-2">
                                <p className="text-xs text-gray-500">{getSubtitle1(item)}</p>
                            </div>
                        )}
                    </div>
                </div>
            )})}
        </div>
    );
};

export default CardList;
