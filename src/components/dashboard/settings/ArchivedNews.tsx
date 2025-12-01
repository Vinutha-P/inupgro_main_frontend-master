'use client';
import { FaEye } from 'react-icons/fa';

export default function ArchivedNews() {
    const archivedData = [
        {
            id: '01',
            schoolName: 'Boys Senior Secondary School',
            newsTitle: 'Lorem ipsum dolor sit amet consectetur. Elementum.',
            category: 'Trending News',
            postedBy: 'Amit Saraswat',
            postedDate: '20/10/2024',
        },
        {
            id: '02',
            schoolName: 'Boys Senior Secondary School',
            newsTitle: 'Lorem ipsum dolor sit amet consectetur. Elementum.',
            category: 'Recommended News',
            postedBy: 'Ishani Datta',
            postedDate: '20/10/2024',
        },
        {
            id: '03',
            schoolName: 'Boys Senior Secondary School',
            newsTitle: 'Lorem ipsum dolor sit amet consectetur. Elementum.',
            category: 'Trending News',
            postedBy: 'Ananya Jha',
            postedDate: '20/10/2024',
        },
        {
            id: '04',
            schoolName: 'Boys Senior Secondary School',
            newsTitle: 'Lorem ipsum dolor sit amet consectetur. Elementum.',
            category: 'Recommended News',
            postedBy: 'Ashish Kumar',
            postedDate: '20/10/2024',
        },
        {
            id: '05',
            schoolName: 'Boys Senior Secondary School',
            newsTitle: 'Lorem ipsum dolor sit amet consectetur. Elementum.',
            category: 'Trending News',
            postedBy: 'Anshul Parvaz',
            postedDate: '20/10/2024',
        },
        {
            id: '06',
            schoolName: 'Boys Senior Secondary School',
            newsTitle: 'Lorem ipsum dolor sit amet consectetur. Elementum.',
            category: 'Trending News',
            postedBy: 'Aaril Parvaz',
            postedDate: '20/10/2024',
        },
        {
            id: '07',
            schoolName: 'Boys Senior Secondary School',
            newsTitle: 'Lorem ipsum dolor sit amet consectetur. Elementum.',
            category: 'Trending News',
            postedBy: 'Ashish Basu',
            postedDate: '20/10/2024',
        },
        {
            id: '08',
            schoolName: 'Boys Senior Secondary School',
            newsTitle: 'Lorem ipsum dolor sit amet consectetur. Elementum.',
            category: 'Recommended News',
            postedBy: 'Sanjay Jain',
            postedDate: '20/10/2024',
        },
    ];

    return (
        <div className="bg-white shadow rounded-xl">
            {/* Table */}
            <div className="mt-6 overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
                    <thead className="bg-[#f1f5f9] text-gray-600">
                        <tr>
                            <th className="px-4 py-2 text-left">S.No.</th>
                            <th className="px-4 py-2 text-left">School Name</th>
                            <th className="px-4 py-2 text-left">News Title</th>
                            <th className="px-4 py-2 text-left">News Category</th>
                            <th className="px-4 py-2 text-left">Posted By</th>
                            <th className="px-4 py-2 text-left">Posted Date</th>
                            <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {archivedData.map((item) => (
                            <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-100 transition-colors">
                                <td className="px-4 py-3">{item.id}</td>
                                <td className="px-4 py-3">{item.schoolName}</td>
                                <td className="px-4 py-3">{item.newsTitle}</td>
                                <td className="px-4 py-3 text-[#3E7FDF]">{item.category}</td>
                                <td className="px-4 py-3">{item.postedBy}</td>
                                <td className="px-4 py-3">{item.postedDate}</td>
                                <td className="px-4 py-3 flex items-center gap-2">
                                    <button className="text-[#1A3161] hover:text-blue-800">
                                        <FaEye />
                                    </button>
                                    <button className="bg-[#1A3161] hover:bg-[#14264e] text-white px-3 py-1 rounded text-sm">
                                        Unarchive
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
