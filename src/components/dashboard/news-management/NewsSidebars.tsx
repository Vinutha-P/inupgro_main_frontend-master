import Image from "next/image";
import React from "react";
import ContentTags from "./ContentTags";
import { capitalize, formatDateToCustomString } from "@/utils/helper";

export default function NewsSidebars({details}:any) {
    return (
        <div className="w-full">
            {/* News Post Info */}
            <div className="bg-white border-[1px] border-[#EAECF0] rounded-xl shadow-sm space-y-2">
                <h2 className="font-semibold text-sm text-gray-800 mb-2 px-4 py-3">News Post Info</h2>
                <div className="text-xs text-gray-600">
                    <div className=" border-y-[1px] border-[#EAECF0] px-4 py-3">
                        <span className="font-medium text-[#667085]">Created by</span>
                        <br />
                        <div className="ml-8 mt-2">
                            <span className="text-sm text-[#0A150F] font-medium">Amit Saraswat</span>
                            <span className="text-[#667085] text-md font-semibold mt-2"> | Admin</span>

                        </div>
                    </div>

                    <p className="border-b-[1px] border-[#EAECF0] px-4 py-3 flex justify-between">
                        <span className="font-medium">Status</span>

                        <span className="flex items-center text-red-600 font-semibold text-sm">
                            <span className="h-2 w-2 rounded-full bg-red-500 mr-1.5" />
                            <span className="text-[#0A150F] font-semibold">
                                {details?.status ? capitalize(details?.status) : "NA"}
                            </span>
                        </span>
                    </p>

                    <p className="border-b-[1px] border-[#EAECF0] px-4 py-3 flex justify-between">
                        <span className="font-medium">Created at</span>
                        <span className="text-[#0A150F] font-medium">
                            {formatDateToCustomString(details?.createdAt)}
                        </span>
                    </p>

                    <p className="text-[12px] text-gray-600 border-b-[1px] border-[#EAECF0] px-4 py-3 flex items-center justify-between">
                        <span className="font-semibold">Reason</span>
                        <span className="text-right text-sm text-[#0A150F] font-medium">
                            {details?.declineReason || "NA"}
                            {/* Your news submission was declined
                            <br />as it doesn’t meet our guidelines. <br />
                            Please review and resubmit. */}
                        </span>

                    </p>
                </div>
            </div>

            {/* News Cover */}
            <div className="bg-white rounded-xl shadow-sm border-[1px] border-[#EAECF0]">
                <h2 className="font-semibold text-sm text-gray-800 mb-2 border-b-[1px] border-[#EAECF0] px-4 py-3 ">News Cover</h2>

                <div className="px-4 py-3 ">
                    <Image
                        src={details?.coverImage ?? "/newscover.png"}
                        alt="News Cover"
                        width={300}
                        height={150}
                        className="rounded-md w-full object-cover"
                    />
                </div>
            </div>

            <ContentTags
                hashtags={details?.hashtags || []}
                // categories={details?.categoryDetails?.name || ['Recommended News', 'Events']}
                categories={[details?.categoryDetails?.name]}
                subCategories={[details?.subCategoryDetails?.name]}
                // subCategories={details?.subCategoryDetails?.name || ['Psychology in Studies', 'Education Trends']}
            />
        </div>
    );
}














// "use client"; // Only needed for app directory

// import React from "react";

// export default function NewsSidebar() {
//   return (
//     <div className="w-full max-w-xs p-4 space-y-4 bg-gray-50 min-h-screen">
//       {/* News Post Info */}
//       <div className="bg-white p-4 rounded-xl shadow-sm space-y-2">
//         <h2 className="font-semibold text-sm text-gray-800">News Post Info</h2>
//         <div className="text-xs text-gray-600">
//           <div className="mb-2">
//             <p className="text-gray-400">Created by</p>
//             <p className="text-sm text-gray-800 font-medium">
//               Amit Saraswat <span className="text-blue-600">| Admin</span>
//             </p>
//           </div>
//           <div className="mb-2">
//             <p className="text-gray-400">Status</p>
//             <div className="flex items-center text-red-600 font-semibold text-sm">
//               <span className="h-2 w-2 bg-red-500 rounded-full mr-1.5"></span>
//               Declined
//             </div>
//           </div>
//           <div className="mb-2">
//             <p className="text-gray-400">Created at</p>
//             <p className="text-sm text-gray-800">Jul 30, 2:21 PM</p>
//           </div>
//           <div>
//             <p className="text-gray-400">Reason</p>
//             <p className="text-[12px] text-gray-600">
//               Your news submission was declined as it doesn't meet our guidelines. <br />
//               Please review and resubmit.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* News Cover */}
//       <div className="bg-white p-4 rounded-xl shadow-sm">
//         <h2 className="font-semibold text-sm text-gray-800 mb-2">News Cover</h2>
//         <img
//           src="https://images.unsplash.com/photo-1560347876-aeef00ee58a1"
//           alt="News Cover"
//           className="rounded-md w-full object-cover h-36"
//         />
//       </div>

//       {/* Hashtags */}
//       <div className="bg-white p-4 rounded-xl shadow-sm">
//         <h2 className="font-semibold text-sm text-gray-800 mb-2">Hashtags</h2>
//         <div className="flex gap-2 flex-wrap text-sm">
//           <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full">#college</span>
//           <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full">#teacher</span>
//         </div>
//       </div>

//       {/* Category */}
//       <div className="bg-white p-4 rounded-xl shadow-sm">
//         <h2 className="font-semibold text-sm text-gray-800 mb-2">Category</h2>
//         <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-md inline-block">
//           Recommended News
//         </span>
//       </div>

//       {/* Sub-category */}
//       <div className="bg-white p-4 rounded-xl shadow-sm">
//         <h2 className="font-semibold text-sm text-gray-800 mb-2">Sub-category</h2>
//         <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-md inline-block">
//           Phycology in Studies
//         </span>
//       </div>
//     </div>
//   );
// }
