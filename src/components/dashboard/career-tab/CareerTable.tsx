import Image from 'next/image';
import React from 'react'
import { FaEllipsisV, FaPlus } from 'react-icons/fa';
// import { FaPlus } from 'react-icons/fa';
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
        id: '9101',
        name: 'Charlie',
        currentGrade: 'Grade 5',
        previousGrade: 'Grade 4',
        age: 10,
        teacher: 'Mr. Lee',
        phone: '5556667777',
        status: 'Expire',
    },
];

const CareerTable = () => {
    const getStatusStyles = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active':
                return 'bg-[#3FC28A1A] text-[#3FC28A]';
            // case 'applied':
            //     return 'bg-[#EFBE121A] text-[#EFBE12]';
            case 'expire':
                return 'bg-[#F45B691A] text-[#F45B69]';
            default:
                return 'bg-[#3FC28A1A] text-[#3FC28A]';
        }
    };
    return (
        <>
            <div className="flex items-center justify-between bg-gray-50 rounded">
                <h2 className="font-semibold text-gray-800 text-lg">
                    Recently Posted Jobs
                </h2>
                <button className="flex items-center gap-2 text-white bg-[#2E90FA] hover:bg-blue-600 px-4 py-2 rounded-md text-sm font-medium">
                    <span className='w-5 h-5 border-white border-[1px] rounded-full flex items-center justify-center'>
                        <FaPlus className="w-3 h-3" />
                    </span>
                    Post a job
                </button>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-[10px_0px_24px_0px_#0000000A]">
                <table className="min-w-full border">
                    <thead className="bg-[#EAECF0]">
                        <tr>
                            <th className="p-2 border-b text-left">Sr No.</th>
                            <th className="p-2 border-b text-left">Jobs</th>
                            <th className="p-2 border-b text-left">Status</th>
                            <th className="p-2 border-b text-left">Posted Date</th>
                            <th className="p-2 border-b text-left">Applications</th>
                            <th className="p-2 border-b text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentData.map((student, index) => (
                            <tr key={index} className='bg-white hover:bg-gray-50'>
                                <td className="p-2 border-b">{student.id}</td>
                                <td className="p-2 border-b cursor-pointer">{student.name}</td>
                                <td className="p-2 border-b">
                                    <span
                                        className={`px-3 py-1 rounded-md text-sm font-medium ${getStatusStyles(
                                            student.status
                                        )}`}
                                    >
                                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                                    </span>
                                </td>
                                <td className="p-2 border-b">20/10/2024</td>
                                <td className="p-2 border-b">
                                    <div className='flex items-center gap-2'>
                                        <span>
                                            <Image
                                                src="/Userss.png"
                                                alt="Graduation Cap"
                                                width={24}
                                                height={24}
                                            />
                                        </span> 798 Applications
                                    </div>
                                </td>
                                <td className="p-2 border-b">
                                    <div className='flex items-center justify-between'>
                                        <button className='bg-[#D1E9FF] rounded-md text-[#2E90FA] p-[8px_20px] text-base'>
                                            View Applications
                                        </button>
                                        <FaEllipsisV className="text-gray-600 cursor-pointer" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='flex justify-end'>

                <button>
                    View all →
                </button>
            </div>

        </>
    )
}

export default CareerTable
