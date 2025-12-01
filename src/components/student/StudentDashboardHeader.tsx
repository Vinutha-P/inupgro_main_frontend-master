// components/student/StudentDashboardHeader.tsx
import { FiBell, FiSearch } from 'react-icons/fi';
import UserProfileDropdown from '@/components/student/UserProfileDropdown';


export default function StudentDashboardHeader() {
  return (
    <header className="bg-white shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="relative w-64">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search books..."
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-500 hover:text-gray-700 relative">
            <FiBell className="w-5 h-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          <UserProfileDropdown />
        </div>
      </div>
    </header>
  );
}