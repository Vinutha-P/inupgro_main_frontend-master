import React from "react";
import PillTabs from "../atom/PillTabs";

interface AcademicStatusOverviewPanelProps {
  tabNames: string[];
  activeTab?: string;
  onTabChange: (tabName: string) => void;
}

const AcademicStatusOverviewPanel: React.FC<AcademicStatusOverviewPanelProps> = ({
  tabNames,
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="w-full flex items-center justify-start gap-3 md:gap-4 overflow-x-auto no-scrollbar">
      {tabNames && tabNames?.map((tabName, index) => (
        <PillTabs
          key={index}
          tabName={tabName}
          isActive={tabName === activeTab}
          onClick={() => onTabChange(tabName)}
        />
      ))}
    </div>
  );
};

export default AcademicStatusOverviewPanel;