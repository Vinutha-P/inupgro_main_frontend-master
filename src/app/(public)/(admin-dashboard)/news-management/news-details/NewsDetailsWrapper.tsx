"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useDetailNewsQuery } from "@/features/api/educationNewsApiSlice";
import NewsDetails from "@/components/dashboard/news-management/NewsDetails";
import NewsSidebars from "@/components/dashboard/news-management/NewsSidebars";

export default function NewsDetailsWrapper() {
  const params = useSearchParams();
  const id = params.get("id");
  const { data: details } = useDetailNewsQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const response = details?.results;

  return (
    <div className="mx-4 flex gap-5">
      <div className="w-[71%]">
        <NewsDetails details={response} />
      </div>
      <div className="w-[29%]">
        <NewsSidebars details={response} />
      </div>
    </div>
  );
}
