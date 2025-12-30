"use client";
import Image from "next/image";
import React from "react";
import ContentTags from "./ContentTags";
import { capitalize, formatDateToCustomString } from "@/utils/helper";

export default function NewsSidebars({ details }: any) {
  const getStatusStyles = (status: string) => {
    const lowerStatus = status?.toLowerCase();
    switch (lowerStatus) {
      case "published":
        return {
          bg: "bg-green-100",
          text: "text-green-700",
          border: "border-green-300",
          dot: "bg-green-500",
        };
      case "pending":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-700",
          border: "border-yellow-300",
          dot: "bg-yellow-500",
        };
      case "draft":
        return {
          bg: "bg-purple-100",
          text: "text-purple-700",
          border: "border-purple-300",
          dot: "bg-purple-500",
        };
      case "declined":
        return {
          bg: "bg-red-100",
          text: "text-red-700",
          border: "border-red-300",
          dot: "bg-red-500",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-700",
          border: "border-gray-300",
          dot: "bg-gray-500",
        };
    }
  };

  const statusStyles = getStatusStyles(details?.status);

  return (
    <div className="w-full space-y-4">
      {/* News Post Info */}
      <div className="bg-white border-[1px] border-[#EAECF0] rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-[#f9fafb] border-b border-[#EAECF0]">
          <h2 className="font-semibold text-sm text-gray-800">
            News Post Info
          </h2>
        </div>
        <div className="divide-y divide-[#EAECF0]">
          <div className="px-4 py-3">
            <span className="text-xs font-medium text-[#667085] uppercase tracking-wide">
              Created by
            </span>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                {details?.postedBy?.charAt(0) || "A"}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {details?.postedBy || "Amit Saraswat"}
                </p>
                <p className="text-xs text-[#667085]">Admin</p>
              </div>
            </div>
          </div>

          <div className="px-4 py-3 flex items-center justify-between">
            <span className="text-xs font-medium text-[#667085] uppercase tracking-wide">
              Status
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusStyles.bg} ${statusStyles.text} ${statusStyles.border}`}
            >
              <span className={`h-2 w-2 rounded-full ${statusStyles.dot}`} />
              {details?.status ? capitalize(details?.status) : "NA"}
            </span>
          </div>

          <div className="px-4 py-3 flex items-center justify-between">
            <span className="text-xs font-medium text-[#667085] uppercase tracking-wide">
              Created at
            </span>
            <span className="text-sm font-medium text-gray-900">
              {details?.createdAt
                ? formatDateToCustomString(details?.createdAt)
                : "NA"}
            </span>
          </div>

          {details?.declineReason && (
            <div className="px-4 py-3">
              <span className="text-xs font-medium text-[#667085] uppercase tracking-wide block mb-2">
                Reason
              </span>
              <p className="text-sm text-gray-700 leading-relaxed">
                {details.declineReason}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* News Cover */}
      <div className="bg-white rounded-xl shadow-sm border-[1px] border-[#EAECF0] overflow-hidden">
        <div className="px-4 py-3 bg-[#f9fafb] border-b border-[#EAECF0]">
          <h2 className="font-semibold text-sm text-gray-800">News Cover</h2>
        </div>
        <div className="p-4">
          <div className="relative rounded-lg overflow-hidden bg-gray-100 aspect-video">
            <Image
              src={details?.coverImage ?? "/newscover.png"}
              alt="News Cover"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>
        </div>
      </div>

      <ContentTags
        hashtags={details?.hashtags || []}
        categories={
          details?.categoryDetails?.name ? [details.categoryDetails.name] : []
        }
        subCategories={
          details?.subCategoryDetails?.name
            ? [details.subCategoryDetails.name]
            : []
        }
      />
    </div>
  );
}
