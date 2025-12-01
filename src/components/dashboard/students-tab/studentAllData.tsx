'use client';
import { useState } from 'react';
import Card from '../Card';
import { FaTrash, FaEllipsisV } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import TopHeadingWithSearchBar from './TopHeadingWithSearchBar';

const studentData = [
  {
    id: '1234',
    name: 'Alice',
    currentGrade: 'Grade 3',
    previousGrade: 'Grade 2',
    age: 8,
    teacher: 'Mr. Smith',
    phone: '9876543210',
    status: 'active',
  },
  {
    id: '5678',
    name: 'Bob',
    currentGrade: 'Grade 4',
    previousGrade: 'Grade 3',
    age: 9,
    teacher: 'Ms. Johnson',
    phone: '1234567890',
    status: 'applied',
  },
  {
    id: '9101',
    name: 'Charlie',
    currentGrade: 'Grade 5',
    previousGrade: 'Grade 4',
    age: 10,
    teacher: 'Mr. Lee',
    phone: '5556667777',
    status: 'rejected',
  },
];

export default function StudentApplicationsTable() {
  const [activeTab, setActiveTab] = useState("all");

   const router = useRouter();

  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-[#3FC28A1A] text-[#3FC28A]';
      case 'applied':
        return 'bg-[#EFBE121A] text-[#EFBE12]';
      case 'rejected':
        return 'bg-[#F45B691A] text-[#F45B69]';
      default:
        return 'bg-[#3FC28A1A] text-[#3FC28A]';
    }
  };
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen text-gray-800">
      {/* Top Row */}

      <TopHeadingWithSearchBar />
      {/* Cards */}
      <Card />

      {/* Filters and Dropdowns */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Student List</h3>
        <div className="flex gap-4">
          <select className="border rounded-md p-1 text-xs bg-[#04173F] text-white">
            <option>2021</option>
            <option>2022</option>
            <option>2023</option>
            <option>2024</option>
          </select>
          <select className="border rounded-md p-1 text-xs bg-[#04173F] text-white">
            <option>Class 9</option>
            <option>Class 10</option>
            <option>Class 11</option>
            <option>Class 12</option>
          </select>
        </div>
      </div>

      {/* Tab Buttons */}
      <div className="flex justify-between gap-6 mb-4 bg-[#eceff6] rounded-lg p-4">
        {['all', 'applied', 'active'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`font-semibold flex-1 text-center p-2 rounded-lg ${activeTab === tab
              ? "bg-white text-black"
              : "text-gray-500"
              }`}
          >
            {tab === 'all'
              ? 'All Students (1477)'
              : tab === 'applied'
                ? 'Applied Students (230)'
                : 'Active Students (230)'}
          </button>
        ))}
      </div>

   
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <div>
          {activeTab === 'all' && (
            <div>
              <table className="min-w-full border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border-b text-left">Application No.</th>
                    <th className="p-2 border-b text-left">Student Name</th>
                    <th className="p-2 border-b text-left">Class Applied</th>
                    <th className="p-2 border-b text-left">Current Class</th>
                    <th className="p-2 border-b text-left">Age</th>
                    <th className="p-2 border-b text-left">Parent Name</th>
                    <th className="p-2 border-b text-left">Parent’s Mobile</th>
                    <th className="p-2 border-b text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.map((student, index) => (
                    <tr key={index} className='hover:bg-gray-50'>
                      <td className="p-2 border-b">{student.id}</td>
                      <td className="p-2 border-b cursor-pointer"   onClick={() => router.push(`/students/students-application`)}>{student.name}</td>
                      <td className="p-2 border-b">{student.currentGrade}</td>
                      <td className="p-2 border-b">{student.previousGrade}</td>
                      <td className="p-2 border-b">{student.age}</td>
                      <td className="p-2 border-b">{student.teacher}</td>
                      <td className="p-2 border-b">{student.phone}</td>
                      <td className="p-2 border-b">
                        <span
                          className={`px-3 py-1 rounded-md text-sm font-medium ${getStatusStyles(
                            student.status
                          )}`}
                        >
                          {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'applied' && (
            <div>
              <table className="min-w-full border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border text-left">Application No.</th>
                    <th className="p-2 border text-left">Student Name</th>
                    <th className="p-2 border text-left">Class Applied</th>
                    <th className="p-2 border text-left">Age</th>
                    <th className="p-2 border text-left">Parent Name</th>
                    <th className="p-2 border text-left">Parent’s Mobile</th>
                    <th className="p-2 border text-left">Subject</th>
                    <th className="p-2 border text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Sample Row */}
                  <tr>
                    <td className="p-2 border">5678</td>
                    <td className="p-2 border">Bob</td>
                    <td className="p-2 border">Grade 5</td>
                    <td className="p-2 border">10</td>
                    <td className="p-2 border">Ms. Lee</td>
                    <td className="p-2 border">8765432109</td>
                    <td className="p-2 border">Math</td>
                    <td className="p-2 border">
                      <span className='flex gap-2'>
                        <FaTrash className="cursor-pointer" />
                        <FaEllipsisV className="text-gray-600 cursor-pointer" />
                        </span>
                        </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'active' && (
            <div>
              <table className="min-w-full border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border">Student ID</th>
                    <th className="p-2 border">Student Name</th>
                    <th className="p-2 border">Date of Joining</th>
                    <th className="p-2 border">Current Class</th>
                    <th className="p-2 border">Age</th>
                    <th className="p-2 border">Parent Name</th>
                    <th className="p-2 border">Parent’s Mobile</th>
                    <th className="p-2 border">Subject</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Sample Row */}
                  <tr>
                    <td className="p-2 border">A001</td>
                    <td className="p-2 border">Charlie</td>
                    <td className="p-2 border">2023-01-15</td>
                    <td className="p-2 border">Grade 6</td>
                    <td className="p-2 border">11</td>
                    <td className="p-2 border">Mr. Kumar</td>
                    <td className="p-2 border">7654321098</td>
                    <td className="p-2 border">Science</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mt-4">
        <button className="px-3 py-1 border rounded bg-white shadow">&lt; Previous</button>
        {[1, 2, 3, 4].map((num) => (
          <button
            key={num}
            className={`px-3 py-1 border rounded ${num === 2 ? 'bg-blue-600 text-white' : 'bg-white'} shadow`}
          >
            {num}
          </button>
        ))}
        <button className="px-3 py-1 border rounded bg-white shadow">Next &gt;</button>
      </div>
    </div>
  );
}
