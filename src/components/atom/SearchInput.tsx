"use client";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { debounce } from "lodash";

const SearchInput: React.FC<any> = ({
  width,
  height,
  placeholderText,
  withBorder,
  handleChange,
  setSearchData = () => {},
  data,
  isFetching,
  error,
  setLocationQuery,
  locationQuery,
  setSearchQuery,
  searchQuery,
}) => {
  // const [searchQuery, setSearchQuery] = useState("");
  // const [locationQuery, setLocationQuery] = useState("");
  const [selectedData, setSelectedData] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  const suggestions = [
    ...(data?.school_profiles?.map((school:any) => school.name) || []),
    ...(data?.total_partners?.data?.map((partner:any) => partner.name) || []),
  ].slice(0, 5); // Limit to 5 suggestions for UX

  const totalSchoolsFound = data?.total_schools || 0;

  useEffect(() => {
    if (!isFetching && !error && searchQuery) {
      setSearchData?.(data);
    }
    if (!searchQuery && !locationQuery && setSearchData) {
      setSearchData([]);
    }
  }, [isFetching, error, searchQuery, data, setSearchData]);

  return (
    <>
      {/* width="" height="" */}
        <div
          className={`relative search-container h-full pl-8 sm:pl-[3.375rem] flex-box-center w-full ${
            withBorder ? "border border-customGrayBlue" : "border-none"
          } relative  bg-white rounded-lg p-2`}
          // style={{ width, height }}
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
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-[40px] left-0 w-full max-w-full bg-white border border-gray-200 rounded-[0px_0px_5px_5px] max-h-60 overflow-y-auto z-40">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 text-ellipsis whitespace-nowrap overflow-hidden"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
        </div>
    </>
  );
};

export default SearchInput;
