import { useState } from "react";
import { FaListUl } from "react-icons/fa";
import { ImEqualizer2 } from "react-icons/im";
import { RxDashboard } from "react-icons/rx";

interface TabsProps {
  onTabChange: (tab: string) => void;
}

const UpdateTabs = ({ onTabChange }: TabsProps) => {
  const [active, setActive] = useState("Latest");

  const tabs = ["Latest", "Popular", "Oldest"];

  return (
    <div className=" border-b-2">
      <div className="flex justify-between pb-1">
        <div className="flex space-x-16 text-gray-600 text-base font-medium">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActive(tab);
                onTabChange(tab);
              }}
              className={`relative after:absolute pb-3 duration-150 ${
                tab === active
                  ? " text-[#0E2350] font-semibold  after:-bottom-1 after:left-0 after:right-0 after:w-full after:h-[3px] after:border-[0px] after:bg-[#435987]  after:rounded-t-full "
                  : "text-[#344054] font-normal"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-center gap-5 relative bottom-1 text-[#667085]">
          <button className="text-xl flex items-center space-x-1">
            <RxDashboard />
          </button>
          <button className="text-xl flex items-center space-x-1">
            <FaListUl />
          </button>
          <div className="w-[1px] h-[25px] bg-[#c9c8c8]"></div>
          <button className="text-xl flex items-center space-x-3">
            <ImEqualizer2 />
            <span>Filter</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTabs;
