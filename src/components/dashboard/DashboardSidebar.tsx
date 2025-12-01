'use client';

import { FaHome, FaCog, FaChartBar } from 'react-icons/fa';
import Link from 'next/link';
import { FC } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const DashboardSidebar: FC<SidebarProps> = ({ collapsed, toggleSidebar }) => {
  const pathname = usePathname();

  const menu = [
    { icon: <FaHome />, label: 'Dashboard', link: "/dashboard" },
    { icon: <FaChartBar />, label: 'Students', link: "/students" },
    { icon: <FaChartBar />, label: 'Career', link: "/career" },
    { icon: <FaChartBar />, label: 'News Management', link: "/news-management" },
    { icon: <FaChartBar />, label: 'Feedback and Surveys', link: "/feedback-surveys" },
    { icon: <FaCog />, label: 'Settings', link: "/setting" },
  ];

  return (
    <div className={`h-screen bg-white text-white shadow-[10px_0px_24px_0px_#0000000A] rounded-2xl ${collapsed ? 'w-20' : 'w-56'} duration-300`}>
      <div className="flex items-center justify-between px-3 py-4">
        {collapsed ? (
          <span>
            
            <Image src="/dashLoogoo.png" alt="" width={40} height={40} />
          </span>
        ) : (
          <span>
           
            <Image src="/dashLogo.png" alt="" width={97} height={14}  />
          </span>
        )}
        <button onClick={toggleSidebar} className="text-black text-xl">
          <Image src="/Panel-close.png" alt="" width={21} height={18} className={`${collapsed ? ' rotate-180' :'rotate-0'}`} />
        </button>
      </div>

      <ul className='px-2'>
        {menu.map((item, index) => {
          const isActive = pathname === item.link;

          return (
            <li
              key={index}
              className={`flex items-center px-4 py-2 cursor-pointer w-full transition-colors
              ${isActive ? 'bg-[#2e90fa] text-white rounded-[5px]' : 'text-black'}`}
            >
              <Link href={item.link} className="flex items-center w-full">
                <span className={`${collapsed ? 'text-2xl' : 'text-lg'} transition-all`}>
                  {item.icon}
                </span>
                {!collapsed && <span className="ml-4">{item.label}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DashboardSidebar;















// 'use client';

// import { FaHome, FaCog, FaChartBar } from 'react-icons/fa';
// import Link from 'next/link';
// import { FC } from 'react';
// import { usePathname } from 'next/navigation';
// import Image from 'next/image';

// interface SidebarProps {
//   collapsed: boolean;
//   toggleSidebar: () => void;
// }

// const DashboardSidebar: FC<SidebarProps> = ({ collapsed, toggleSidebar }) => {
//   const pathname = usePathname();

//   const menu = [
//     { icon: '/dashboard.png', label: 'Dashboard', link: "/dashboard" },
//     { icon: '/students.png', label: 'Students', link: "/students" },
//     { icon: '/career.png', label: 'Career', link: "/career" },
//     { icon: '/newsmang.png', label: 'Settings', link: "/settings" },
//     { icon: '/feedback.png', label: 'Settings', link: "/settings" },
//     { icon: '/feedback.png', label: 'Settings', link: "/settings" },
//     { icon: '/profile.png', label: 'Settings', link: "/settings" },
//   ];

//   return (
//     <div className={`h-screen bg-white text-white shadow-[10px_0px_24px_0px_#0000000A] rounded-2xl ${collapsed ? 'w-20' : 'w-56'} duration-300`}>
//       <div className="flex items-center justify-between px-3 py-4">
//         {collapsed ? (
//           <span>

//             <Image src="/dashLoogoo.png" alt="" width={40} height={40} />
//           </span>
//         ) : (
//           <span>

//             <Image src="/dashLogo.png" alt="" width={97} height={14} />
//           </span>
//         )}
//         <button onClick={toggleSidebar} className="text-black text-xl">
//           <Image src="/Panel-close.png" alt="" width={21} height={18} className={`${collapsed ? ' -rotate-180' : 'rotate-0'}`} />
//         </button>
//       </div>

//       <ul className='px-2'>
//         {menu.map((item, index) => {
//           const isActive = pathname === item.link;

//           return (
//             <li
//               key={index}
//               className={`flex items-center px-4 py-2 cursor-pointer w-full transition-colors
//               ${isActive ? 'bg-[#2e90fa] text-white rounded-[5px]' : 'text-black'}`}
//             >
//               <Link href={item.link} className="flex items-center w-full">
//                 {/* <span className={`${collapsed ? 'text-2xl' : 'text-lg'} transition-all`}>
//                   {item.icon}
//                 </span> */}

//                 <span className={`${collapsed ? 'w-6 h-6' : 'w-5 h-5'} relative`}>
//                   <Image
//                     src={item.icon}
//                     alt={item.label}
//                     width={24}
//                     height={24}
//                     className="object-contain"
//                   />
//                 </span>
//                 {!collapsed && <span className="ml-4">{item.label}</span>}
//               </Link>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

// export default DashboardSidebar;




// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import React, { FC } from 'react'; // ✅ Make sure FC is imported

// interface SidebarProps {
//   collapsed: boolean;
//   toggleSidebar: () => void;
// }

// const DashboardSidebar: FC<SidebarProps> = ({ collapsed, toggleSidebar }) => {
//   const pathname = usePathname();

//   const menu = [
//     {
//       icon: '/dashboard.png',
//       activeIcon: '/dashboard-active.png',
//       label: 'Dashboard',
//       link: '/dashboard',
//     },
//     {
//       icon: '/students.png',
//       activeIcon: '/students-active.png',
//       label: 'Students',
//       link: '/students',
//     },
//     {
//       icon: '/career.png',
//       activeIcon: '/career-active.png',
//       label: 'Career',
//       link: '/career',
//     },
//     {
//       icon: '/newsmang.png',
//       activeIcon: '/newsmang-active.png',
//       label: 'News',
//       link: '/news',
//     },
//     {
//       icon: '/feedback.png',
//       activeIcon: '/feedback-active.png',
//       label: 'Feedback',
//       link: '/feedback',
//     },
//     {
//       icon: '/profile.png',
//       activeIcon: '/profile-active.png',
//       label: 'Profile',
//       link: '/profile',
//     },
//   ];

//   return (
//     <div
//       className={`h-screen bg-white text-white shadow-[10px_0px_24px_0px_#0000000A] rounded-2xl ${
//         collapsed ? 'w-20' : 'w-56'
//       } duration-300`}
//     >
//       {/* Top Logo Section */}
//       <div className="flex items-center justify-between px-3 py-4">
//         <span>
//           <Image
//             src={collapsed ? '/dashLoogoo.png' : '/dashLogo.png'}
//             alt="Logo"
//             width={collapsed ? 40 : 97}
//             height={collapsed ? 40 : 14}
//           />
//         </span>
//         <button onClick={toggleSidebar} className="text-black text-xl">
//           <Image
//             src="/Panel-close.png"
//             alt="Toggle"
//             width={21}
//             height={18}
//             className={`${collapsed ? '-rotate-180' : 'rotate-0'} transition-transform`}
//           />
//         </button>
//       </div>

//       {/* Menu List */}
//       <ul className="px-2">
//         {menu.map((item, index) => {
//           const isActive = pathname === item.link;

//           return (
//             <li
//               key={index}
//               className={`flex items-center px-4 py-2 cursor-pointer w-full transition-colors ${
//                 isActive ? 'bg-[#2e90fa] text-white rounded-[5px]' : 'text-black'
//               }`}
//             >
//               <Link href={item.link} className="flex items-center w-full">
//                 <span className={`${collapsed ? 'w-6 h-6' : 'w-5 h-5'} relative`}>
//                   <Image
//                     src={isActive ? item.activeIcon : item.icon}
//                     alt={item.label}
//                     width={24}
//                     height={24}
//                     className="object-contain"
//                   />
//                 </span>
//                 {!collapsed && <span className="ml-4">{item.label}</span>}
//               </Link>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

// export default DashboardSidebar;
