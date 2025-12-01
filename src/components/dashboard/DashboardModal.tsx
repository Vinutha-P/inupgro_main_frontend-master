// import React from 'react'
// import { FaDownload, FaTimes } from "react-icons/fa";
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import Image from 'next/image';

// type MarksheetModalProps = {
//     setIsOpen: (open: boolean) => void;
// };

// const MarksheetModal = ({ setIsOpen }: MarksheetModalProps) => {
//     const pathname = usePathname()
//     return (
//         <>
//             <div className="fixed inset-0 bg-[#333333] bg-opacity-50 z-50 flex items-center justify-center">

//                 {/*  */}

//                 {pathname === '/students/students-application' &&
//                     <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg relative">
//                         {/* Header */}
//                         <div className="flex justify-between items-center p-4 border-b">
//                             <button
//                                 onClick={() => setIsOpen(false)}
//                                 className="text-xl font-bold"
//                             >
//                                 ←
//                             </button>
//                             <Link
//                                 href="/dummy-marksheet.pdf"
//                                 download
//                                 className="flex items-center gap-2 text-white bg-black px-3 py-1 rounded text-sm"
//                             >
//                                 <FaDownload /> Download
//                             </Link>
//                         </div>


//                         <div className="h-[80vh] w-full p-4">
//                             <iframe
//                                 src="/dummy-marksheet.pdf"
//                                 className="w-full h-full border rounded"
//                                 title="Marksheet Preview"
//                             ></iframe>
//                         </div>
//                     </div>
//                 }



//                 {pathname === '/career/career-postjob' &&

//                     <div className="bg-white w-[90%] max-w-[600px] h-[500px] p-6 rounded-xl shadow-lg text-center relative">
//                         {/* Close Button */}
//                         <button
//                             className="absolute top-4 right-4 text-gray-500 hover:text-black"
//                              onClick={() => setIsOpen(false)}
//                         >
//                             <FaTimes />
//                         </button>

//                         {/* Confetti Icon */}
//                         <div className="flex justify-center mb-4">
//                             {/* <FaRegGrinStars className="text-yellow-400 text-6xl" /> */}
//                             <Image
//                                 src="/suc.png"
//                                 alt="Profile picture"
//                                 width={128}
//                                 height={200}
//                             />
//                         </div>

//                         <div className="mt-12">
//                             {/* Heading */}
//                             <h2 className="text-lg font-semibold text-gray-800 mb-1">
//                                 Congratulation, Your Job is successfully posted!
//                             </h2>

//                             {/* Subtext */}
//                             <p className="text-sm text-gray-500 mb-6">
//                                 You can manage your form in the my-jobs section in your dashboard.
//                             </p>

//                         </div>

//                         <div className="mt-12">
//                             {/* Button */}
//                             <button
//                                 className="px-4 py-2 border border-blue-500 text-blue-600 rounded-md w-[260px] hover:bg-blue-50 transition"
//                                 onClick={() => alert("Redirecting to job list...")}
//                             >
//                                 View Jobs
//                             </button>
//                         </div>

//                     </div>
//                 }

//             </div>

//         </>
//     )
// }

// export default MarksheetModal



'use client'

import React from 'react'
import { FaDownload, FaTimes } from 'react-icons/fa'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

type MarksheetModalProps = {
    setIsOpen: (open: boolean) => void
}

const MarksheetModal = ({ setIsOpen }: MarksheetModalProps) => {
    const pathname = usePathname()

    const renderStudentsModal = () => (
        <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg relative">
            <div className="flex justify-between items-center p-4 border-b">
                <button
                    onClick={() => setIsOpen(false)}
                    className="text-xl font-bold"
                >
                    ←
                </button>
                <Link
                    href="/dummy-marksheet.pdf"
                    download
                    className="flex items-center gap-2 text-white bg-black px-3 py-1 rounded text-sm"
                >
                    <FaDownload /> Download
                </Link>
            </div>

            <div className="h-[80vh] w-full p-4">
                <iframe
                    src="/dummy-marksheet.pdf"
                    className="w-full h-full border rounded"
                    title="Marksheet Preview"
                ></iframe>
            </div>
        </div>
    )

    const renderCareerModal = () => (
        <div className="bg-white w-[90%] max-w-[500px] h-[380px] p-6 rounded-xl shadow-lg text-center relative">
            <button
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
                onClick={() => setIsOpen(false)}
            >
                <FaTimes />
            </button>

            <div className="flex justify-center my-4">
                <Image
                    src="/suc.png"
                    alt="Success"
                    width={128}
                    height={200}
                />
            </div>

            <div className="mt-12">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    Congratulations, Your Job is successfully posted!
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                    You can manage your form in the my-jobs section in your dashboard.
                </p>
            </div>

            <div className="mt-12">
                <button
                    className="px-4 py-2 border border-blue-500 text-blue-600 rounded-md w-[260px] hover:bg-blue-50 transition"
                    onClick={() => alert('Redirecting to job list...')}
                >
                    View Jobs
                </button>
            </div>
        </div>
    )

    const showModal =
        pathname === '/students/students-application' ||
        pathname === '/career/career-postjob'

    if (!showModal) return null

    return (
        <div className="fixed inset-0 bg-[#333333] bg-opacity-50 z-50 flex items-center justify-center">
            {pathname === '/students/students-application' && renderStudentsModal()}
            {pathname === '/career/career-postjob' && renderCareerModal()}
        </div>
    )
}

export default MarksheetModal
