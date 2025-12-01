"use client";
import React, { useState, useEffect, useCallback } from "react";
import RoundedButton from "../atom/buttons/RoundedButton";
import FilterRow from "./FilterRow";
import { useGetHomepageDataQuery } from "../../features/api/homepageApiSlice";
import { debounce } from "lodash";
import { LuSearch } from "react-icons/lu";

const FindSearchBarSection = ({
  setSearchData,
  institutionsCount,
}: {
  setSearchData: any;
  institutionsCount: number;
}) => {
  const [isLoadingSkeleton, setIsLoadingSkeleton] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [locationQuery, setLocationQuery] = useState<string>("");
  const [selectedData, setSelectedData] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  // Debounce search input to prevent excessive API calls
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchQuery(value);
      setShowSuggestions(!!value);
    }, 500),
    []
  );

  const handleSearchInputChange = (value: string) => {
    debouncedSearch(value);
  };

  const { data, isLoading, isFetching, error } = useGetHomepageDataQuery(
    {
      search: searchQuery,
      location: locationQuery,
      limit: 10,
      page: 1,
    },
    { skip: !searchQuery }
  );

  const handleFilterChange = (type: string, value: string) => {
    if (type === "Location") {
      setLocationQuery(value);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  const handleSearchButtonClick = () => {
    setSelectedData(searchQuery);
    setSearchData(data);
    setShowSuggestions(false);
  };

  const suggestions = [
    ...(data?.school_profiles?.map((school) => school.name) || []),
    ...(data?.total_partners?.data?.map((partner) => partner.name) || []),
  ].slice(0, 5); // Limit to 5 suggestions for UX

  const totalSchoolsFound = data?.total_schools || 0;

  useEffect(() => {
    if (!isFetching && !error && searchQuery) {
      setSearchData(data);
    }
    if (!searchQuery && !locationQuery) {
      setSearchData([]);
    }
  }, [isFetching, error, searchQuery, data, setSearchData]);

  return (
    <>
      <section className="w-full h-fit hidden lg:flex flex-col">
        <div
          className={`w-full h-[13.75rem] flex-box-center gap-4 rounded-lg ${isLoadingSkeleton ? "sekleton-light-gray" : ""
            }`}
          style={{
            backgroundImage: isLoadingSkeleton
              ? "none"
              : "url(/Frame-1984078134.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {isLoadingSkeleton ? (
            <div className="w-[36.813rem] h-12 skeleton-medium-gray rounded-md"></div>
          ) : (
            <div className="relative xl:w-[36.813rem] h-12">
              <div
                className={`relative search-container h-full pl-8 sm:pl-[3.375rem] flex-box-center w-full border-none bg-white rounded-lg p-2`}
              >
                <input
                  name="search"
                  type="text"
                  className={
                    "w-full h-full px-3 border-customGrayBlue active:border-none focus:outline-none  focus:border-none rounded-lg bg-transparent mt-0"
                  }
                  placeholder="Search"
                  onChange={(e) => handleSearchInputChange(e.target.value)}
                />
                <div className="absolute top-[50%] translate-y-[-50%] left-[1rem]">
                  <LuSearch className="w-4 h-4 stroke-brandPrimary" />
                </div>
              </div>

              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-[40px] left-0 w-[36.813rem] bg-white border border-gray-200 rounded-[0px_0px_5px_5px] max-h-60 overflow-y-auto z-10">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {isLoadingSkeleton ? (
            <div className="w-[11.25rem] h-12 skeleton-medium-gray rounded-md"></div>
          ) : (
            <RoundedButton
              buttonName={`${isFetching ? "Searching..." : "Search"}`}
              withBackground={true}
              width="11.25rem"
              height="3rem"
              fontBold={true}
              onClick={handleSearchButtonClick}
            />
          )}
        </div>
        <div className="mt-5">

          <FilterRow onFilterChange={handleFilterChange} />
        </div>
        {!isFetching && !error && searchQuery ? (
          <strong className="text-lg text-steelGray font-semibold mt-2">
            {totalSchoolsFound} School{totalSchoolsFound !== 1 ? "s" : ""} Found.
          </strong>
        ) : (
          <>
            <strong className="text-lg text-steelGray font-semibold mt-4">
              {institutionsCount} Institution{institutionsCount !== 1 ? "s" : ""}{" "}
              Found.
            </strong>
          </>
        )}
        <div className="">
          {isFetching && searchQuery && (
            <div className="text-gray-500 mt-2">Loading...</div>
          )}
          <>
            {error && searchQuery && (
              <div className="text-red-500 mt-2">
                Error:{" "}
                {(error as any)?.message || "Failed to fetch search results"}
              </div>
            )}
          </>
        </div>
      </section>
    </>

  );
};

export default FindSearchBarSection;
