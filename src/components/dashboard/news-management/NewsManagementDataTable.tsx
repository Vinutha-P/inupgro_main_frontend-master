// 'use client';
// import React, { useState, useEffect } from 'react';
// import { FiEdit, FiEye } from 'react-icons/fi';
// import { useRouter } from 'next/navigation';
// import Pagination from '../Pagination';
// import { useGetAllNewsQuery } from '@/features/api/educationNewsApiSlice';
// import { useDispatch } from 'react-redux';
// import { setNewsDetails } from '@/features/newsSlice';
// import { formatDate } from '@/utils/helper';

// type NewsItem = {
//   id: number;
//   school: string;
//   title: string;
//   category: string;
//   postedBy: string;
//   date: string;
//   status: 'Pending' | 'Published' | 'Draft' | 'Declined';
// };

// const allData: NewsItem[] = Array.from({ length: 11 }, (_, i) => ({
//   id: i + 1,
//   school: 'Boys Senior Secondary School',
//   title: 'Lorem ipsum dolor sit amet consectetur. Elementum.',
//   category: i % 2 === 0 ? 'Trending News' : 'Recommended News',
//   postedBy: [
//     'Amit Saraswat', 'Ishani Datta', 'Ananya Jha', 'Ashish Kumar',
//     'Anshul Parvez', 'Aarti Parvez', 'Ashish Basu', 'Sanjay Jain',
//     'Farid Burman', 'Farid Burman', 'Farid Burman',
//   ][i],
//   date: '20/10/2024',
//   status:
//     i % 4 === 0
//       ? 'Published'
//       : i % 4 === 1
//         ? 'Draft'
//         : i % 4 === 2
//           ? 'Declined'
//           : 'Pending',
// }));

// export default function NewsManagementDataTable() {
//   // Default active tab is 'pending' now
//   const [activeTab, setActiveTab] = useState<string>('pending');
//   const { data: details } = useGetAllNewsQuery({
//     status: activeTab,
//     sortType: "asc",
//   });
//   const router = useRouter();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (details) {
//       const extractedData = {
//         totalPublishedNews: details.totalPublishedNews,
//         publishedNewsAnalytics: details.publishedNewsAnalytics,
//         totalActiveReaders: details.totalActiveReaders,
//         activeReadersAnalytics: details.activeReadersAnalytics,
//         totalTrendingNews: details.totalTrendingNews,
//         trendingNewsAnalytics: details.trendingNewsAnalytics,
//       };

//       dispatch(setNewsDetails(extractedData));
//     }
//   }, [details, dispatch]);

//   // Filter data based on active tab
//   const filteredData = details?.data.filter(
//     (item: any) => item.status.toLowerCase() === activeTab.toLowerCase()
//   );

//   const getCount = (status: string) =>
//   Array.isArray(details?.data)
//     ? details.data.filter((d: any) => d?.status === status).length
//     : 0;

//   const tabs = [
//     { key: 'pending', label: `Pending News (${getCount('pending')})` },
//     { key: 'published', label: `Published News (${getCount('published')})` },
//     { key: 'draft', label: `Draft News (${getCount('draft')})` },
//     { key: 'declined', label: `Declined News (${getCount('declined')})` },
//   ];

//   const handleViewClick = (status: NewsItem['status'], id: number) => {
//     const route = {
//       Pending: `/news-management/news-details?id=${id}`,
//       Published: `/news-management/news-details?id=${id}`,
//       Draft: `/news-management/news-details?id=${id}`,
//       Declined: `/news-management/news-details?id=${id}`,
//     }[status] || `/news-management/news-details?id=${id}`;

//     router.push(route);
//   };

//   return (
//     <div className="mb-12">
//       {/* Tabs */}
//       <div className="flex justify-between gap-6 mb-4 bg-[#eceff6] rounded-lg p-4">
//         {tabs.map((tab) => (
//           <button
//             key={tab.key}
//             onClick={() => setActiveTab(tab.key)}
//             className={`font-medium flex-1 text-center p-2 rounded-lg text-base ${activeTab === tab.key ? 'bg-white text-black' : 'text-[#667085]'
//               }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Table */}
//       <div className="bg-white shadow-md rounded-xl overflow-auto">
//         <table className="min-w-full text-sm border border-gray-200">
//           <thead className="bg-gray-50 border-b border-gray-200 text-left">
//             <tr>
//               <th className="px-4 py-2">S.No.</th>
//               <th className="px-4 py-2">School Name</th>
//               <th className="px-4 py-2">News Title</th>
//               <th className="px-4 py-2">News Category</th>
//               <th className="px-4 py-2">Posted By</th>
//               <th className="px-4 py-2">Posted Date</th>
//               <th className="px-4 py-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData?.length > 0 ? (
//               filteredData?.map((row: any, index: number) => (
//                 <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
//                   {/* <td className="px-4 py-3">{row.id.toString().padStart(2, '0')}</td> */}
//                   <td className="px-4 py-3">{index + 1}</td>
//                   <td className="px-4 py-3">{row?.name}</td>
//                   <td className="px-4 py-3">{row?.title}</td>
//                   <td className="px-4 py-3">{row?.categoryDetails?.name}</td>
//                   <td className="px-4 py-3">{row?.postedBy || "NA"}</td>
//                   <td className="px-4 py-3">{formatDate(row?.createdAt)}</td>
//                   <td className="px-4 py-2">
//                     <div className="flex items-center gap-3">
//                       <FiEye
//                         className="text-blue-600 cursor-pointer"
//                         onClick={() => handleViewClick(row?.status, row?._id)}
//                         title="View Details"
//                       />
//                       {(row?.status !== 'declined') && (
//                         <FiEdit className="text-gray-600 cursor-pointer" title="Edit News" />
//                       )}
//                       {activeTab === 'draft' && row?.status === 'draft' && (
//                         <button className="bg-blue-600 text-white text-xs px-3 py-1 rounded">
//                           Publish
//                         </button>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={7} className="text-center py-4 text-gray-400">
//                   No data available.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       <Pagination />
//     </div>
//   );
// }



'use client';
import React, { useState, useEffect } from 'react';
import { FiEdit, FiEye, FiPlus } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Pagination from '../Pagination';
import { useGetAllNewsQuery } from '@/features/api/educationNewsApiSlice';
import { useDispatch } from 'react-redux';
import { setNewsDetails } from '@/features/newsSlice';
import { formatDate } from '@/utils/helper';
import Image from 'next/image';

type NewsItem = {
  id: number;
  school: string;
  title: string;
  category: string;
  postedBy: string;
  date: string;
  status: 'Pending' | 'Published' | 'Draft' | 'Declined';
};

const allData: NewsItem[] = Array.from({ length: 11 }, (_, i) => ({
  id: i + 1,
  school: 'Boys Senior Secondary School',
  title: 'Lorem ipsum dolor sit amet consectetur. Elementum.',
  category: i % 2 === 0 ? 'Trending News' : 'Recommended News',
  postedBy: [
    'Amit Saraswat', 'Ishani Datta', 'Ananya Jha', 'Ashish Kumar',
    'Anshul Parvez', 'Aarti Parvez', 'Ashish Basu', 'Sanjay Jain',
    'Farid Burman', 'Farid Burman', 'Farid Burman',
  ][i],
  date: '20/10/2024',
  status:
    i % 4 === 0
      ? 'Published'
      : i % 4 === 1
        ? 'Draft'
        : i % 4 === 2
          ? 'Declined'
          : 'Pending',
}));

export default function NewsManagementDataTable() {
  const [activeTab, setActiveTab] = useState<string>('pending');
  const { data: details, refetch } = useGetAllNewsQuery({
    status: activeTab,
    sortType: 'asc',
  },
  {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (details) {
      const extractedData = {
        totalPublishedNews: details.totalPublishedNews,
        publishedNewsAnalytics: details.publishedNewsAnalytics,
        totalActiveReaders: details.totalActiveReaders,
        activeReadersAnalytics: details.activeReadersAnalytics,
        totalTrendingNews: details.totalTrendingNews,
        trendingNewsAnalytics: details.trendingNewsAnalytics,
      };

      dispatch(setNewsDetails(extractedData));
    }
  }, [details, dispatch]);

  const filteredData = details?.data.filter(
    (item: any) => item.status.toLowerCase() === activeTab.toLowerCase()
  );

  const getCount = (status: string) =>
    Array.isArray(details?.data)
      ? details.data.filter((d: any) => d?.status === status).length
      : 0;

  const tabs = [
    { key: 'pending', label: `Pending News (${getCount('pending')})` },
    { key: 'published', label: `Published News (${getCount('published')})` },
    { key: 'draft', label: `Draft News (${getCount('draft')})` },
    { key: 'declined', label: `Declined News (${getCount('declined')})` },
  ];

  const handleViewClick = (status: NewsItem['status'], id: number) => {
    const route = `/news-management/news-details?id=${id}`;
    router.push(route);
  };

  return (
    <div className="mb-12">
      {/* Tabs */}
      <div className="flex justify-between gap-6 mb-4 bg-[#eceff6] rounded-lg p-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`font-medium flex-1 text-center p-2 rounded-lg text-base ${activeTab === tab.key ? 'bg-white text-black' : 'text-[#667085]'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-xl overflow-auto relative">
        <table className="min-w-full text-sm border border-gray-200">
          <thead className="bg-gray-50 border-b border-gray-200 text-left">
            <tr>
              <th className="px-4 py-2">S.No.</th>
              <th className="px-4 py-2">School Name</th>
              <th className="px-4 py-2">News Title</th>
              <th className="px-4 py-2">News Category</th>
              <th className="px-4 py-2">Posted By</th>
              <th className="px-4 py-2">Posted Date</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>

          <tbody className="relative">
            {/* Floating Plus Icon Button */}
            <tr className="absolute -right-1 top-[60%] -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <td colSpan={7} className="text-center">
                <button
                  onClick={() => router.push('/news-management/create-news')}
                  className="pointer-events-auto"
                  title="Create News"
                >
                  <Image
                    src="/plusc.png" 
                    alt="Create News"
                    width={90}
                    height={90}
                  />
                </button>
              </td>
            </tr>

            {/* News Data Rows */}
            {filteredData?.length > 0 ? (
              filteredData.map((row: any, index: number) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{row?.name}</td>
                  <td className="px-4 py-3">{row?.title}</td>
                  <td className="px-4 py-3">{row?.categoryDetails?.name}</td>
                  <td className="px-4 py-3">{row?.postedBy || 'NA'}</td>
                  <td className="px-4 py-3">{formatDate(row?.createdAt)}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-3">
                      <FiEye
                        className="text-blue-600 cursor-pointer"
                        onClick={() => handleViewClick(row?.status, row?._id)}
                        title="View Details"
                      />
                      {row?.status !== 'declined' && (
                        <FiEdit className="text-gray-600 cursor-pointer" title="Edit News"
                         onClick={() => router.push(`/news-management/edit-news?id=${row?._id}`)}
                        />
                      )}
                      {activeTab === 'draft' && row?.status === 'draft' && (
                        <button className="bg-blue-600 text-white text-xs px-3 py-1 rounded">
                          Publish
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-400">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination />
    </div>
  );
}
