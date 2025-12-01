// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { FiChevronRight } from 'react-icons/fi';
// import { IoIosArrowForward } from 'react-icons/io';


// export default function Breadcrumb() {


//     return (
//         <div className="flex items-center space-x-2 text-grayText text-sm">
//             <Link href="/" className='flex'>
//                 <span className='ml-2'>Career</span>
//                 <span className='ml-2'>News</span>
//             </Link>
//             <FiChevronRight className="w-5 h-5 stroke-[1.5px] -ml-2" />
//             <Link href="/" className='flex'>
//                 <span className='ml-2'>Published News</span>
//             </Link>
//             <FiChevronRight className="w-5 h-5 stroke-[1.5px] -ml-2" />
//             <span className="font-semibold text-darkBlue text-xs sm:text-sm">
//                 Job Details
//             </span>
//             <span className="font-semibold text-darkBlue text-xs sm:text-sm">
//                 News Details
//             </span>
//         </div>
//     );
// }




// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { FiChevronRight } from 'react-icons/fi';

// export default function Breadcrumb() {
//   const pathname = usePathname();

//   const segments = pathname.split('/').filter(Boolean);
//   if (segments.length === 0) return null; // Optional: hide breadcrumb on home

//   const buildPath = (index: number) =>
//     '/' + segments.slice(0, index + 1).join('/');

//   const formatSegment = (segment: string) =>
//     segment
//       .replace(/-/g, ' ')
//       .replace(/\b\w/g, (char) => char.toUpperCase());

//   return (
//     <div className="flex items-center space-x-2 text-grayText text-sm">
//       {segments.map((segment, index) => {
//         const href = buildPath(index);
//         const isLast = index === segments.length - 1;

//         return (
//           <div key={index} className="flex items-center space-x-2">
//             {index > 0 && (
//               <FiChevronRight className="w-5 h-5 stroke-[1.5px] -ml-2" />
//             )}
//             {isLast ? (
//               <span className="font-semibold text-darkBlue text-xs sm:text-sm capitalize">
//                 {formatSegment(segment)}
//               </span>
//             ) : (
//               <Link
//                 href={href}
//                 className="capitalize ml-2 text-xs sm:text-sm hover:underline"
//               >
//                 {formatSegment(segment)}
//               </Link>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }







'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiChevronRight } from 'react-icons/fi';

export default function Breadcrumb() {
  const pathname = usePathname();

  // Extract base segments
  const pathSegments = pathname.split('/').filter(Boolean);

  // Get top-level page (e.g., "career" or "news")
  const mainSection = pathSegments[0];

  const isCareer = mainSection === 'career';
  const isNews = mainSection === 'news-management';

  return (
    <div className="flex items-center space-x-2 text-grayText text-sm">
      {isCareer && (
        <>
          <Link href="/career" className="flex items-center">
            <span className="ml-2">Career</span>
          </Link>
          <FiChevronRight className="w-5 h-5 stroke-[1.5px] -ml-2" />
          <span className="font-semibold text-darkBlue text-xs sm:text-sm">
            Job Details
          </span>
        </>
      )}

      {isNews && (
        <>
          <Link href="/news-management" className="flex items-center">
            <span className="ml-2">News</span>
          </Link>
          <FiChevronRight className="w-5 h-5 stroke-[1.5px] -ml-2" />
          <Link href="/news/published-news" className="flex items-center">
            <span className="ml-2">Published News</span>
          </Link>
          <FiChevronRight className="w-5 h-5 stroke-[1.5px] -ml-2" />
          <Link href=" news-management/news-details" className="flex items-center">
            <span className="font-semibold text-darkBlue text-xs sm:text-sm">
              News Details
            </span>
          </Link>



        </>
      )}
    </div>
  );
}
