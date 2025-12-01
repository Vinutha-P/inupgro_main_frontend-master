"use client";

import React from "react";
import SearchInput from "../atom/SearchInput";
import { IoChevronBack } from "react-icons/io5";
import { useRouter } from "next/navigation";

interface PageTitleSearchBarProps {
  pageTitle?: string;
  isIcon?:boolean;
  onSearch?:(val: string)=>void;
}

const PageTitleSearchBar: React.FC<PageTitleSearchBarProps> = ({
  pageTitle,
  isIcon=true,
  onSearch,
}) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back(); // Goes back to the previous page
  };
  return (
    <div className="w-full flex-box-between gap-2">
      <div className="flex-box-start">
        {
          isIcon &&
          <button className="w-9 h-9 flex-box-center rounded-full bg-lightestGray" onClick={handleGoBack}>
          <IoChevronBack className="w-5 h-5 fill-grayText" />
        </button>
        }
       
        {pageTitle && (
          <h6 className="text-darkBlue leading-[2.5rem]">
            {pageTitle}
          </h6>
        )}
      </div>
      <SearchInput
        height="3rem"
        placeholderText="Search Me"
        width="20rem"
        withBorder
        handleChange ={onSearch}
      />
    </div>
  );
};

export default PageTitleSearchBar;
