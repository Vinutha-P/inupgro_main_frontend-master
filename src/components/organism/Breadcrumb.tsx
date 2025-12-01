    import Link from 'next/link';
    import React from 'react'
    import { FiChevronRight } from "react-icons/fi";

    const Breadcrumb = () => {
        return (
            <>
                <div className="flex items-center space-x-2 text-grayText text-sm">
                    <Link href="/" className='flex'>
                    <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6M5 10v10h14V10"
                        />
                    </svg>
                    <span className='ml-2'>Home</span>
                    </Link>
                    <FiChevronRight className="w-5 h-5 stroke-[1.5px] -ml-2" />
                    <span className="font-semibold text-darkBlue text-xs sm:text-sm">
                        Let’s help you find best Schools...
                    </span>
                </div>

            </>
        )
    }

    export default Breadcrumb
