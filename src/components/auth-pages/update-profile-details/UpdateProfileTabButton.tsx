'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiSearch, FiUpload, FiLock } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { Tooltip } from '@/components/atom/Tooltip';

const ALL_TABS = {
  Student: [
    { name: 'Profile', path: '/student/profile' },
    { name: 'Job Application', path: '/student/job-application' }
  ],
  Teacher: [
    { name: 'Profile', path: '/teacher/profile' },
    { name: 'Job Status', path: '/job-status' },
    { name: 'Videos', path: '/teacher/videos' },
    { name: 'Playlist', path: '/playlist' },
    { name: 'Upload Video', path: '/upload-video' }
  ],
  Institution: [
    // Add institution tabs if needed
  ]
};

const UpdateProfileTabButton = () => {
  const pathname = usePathname();
  const { role, user } = useSelector((state: RootState) => state.auth);
  const isProfileComplete = user?.isProfileCompleted ?? true;

  const tabs = role ? ALL_TABS[role as keyof typeof ALL_TABS] || [] : [];

  return (
    <div className="flex justify-between items-center w-full">
      <div>
        {(pathname !== '/update-profile' && pathname !== '/job-status') && (
          <h4 className="mb-3 mt-5 text-xl">Profile</h4>
        )}
        <div className="flex space-x-5">
          {tabs.map((item) => {
            const isProfileTab = item.path.includes('profile');
            const isActive = pathname === item.path;
            const isDisabled = !isProfileComplete && !isProfileTab;

            return (
              <Tooltip
                key={item.path}
                content={isDisabled ? "Complete your profile to access this section" : ""}
                position="bottom"
              >
                <div className="relative">
                  {isDisabled && (
                    <FiLock className="absolute -right-1 -top-1 text-xs text-yellow-500 bg-white rounded-full p-0.5" />
                  )}
                  <Link
                    href={isDisabled ? '#' : item.path}
                    className={`px-4 py-1.5 font-medium text-base border rounded-[8px] transition flex items-center gap-1
                      ${isActive
                        ? 'bg-[#B2DDFF] text-[#2E90FA] border-blue-500'
                        : 'bg-white text-gray-400 border-gray-300'}
                      ${isDisabled
                        ? 'opacity-60 cursor-not-allowed hover:bg-white'
                        : ''}`}
                  >
                    {item.name === 'Upload Video' && <FiUpload />}
                    {item.name}
                  </Link>
                </div>
              </Tooltip>
            );
          })}
        </div>
      </div>
      <div>
        {(pathname === '/update-profile' || pathname === '/job-status') && (
          <div className="relative w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            {pathname === '/update-profile' && (
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-1 text-sm border rounded-full w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            )}
            {pathname === '/job-status' && (
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-1 text-sm h-[33px] border rounded-md w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateProfileTabButton;