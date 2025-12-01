import React from 'react'
import { FaCalendarAlt } from 'react-icons/fa'
import UserProfileCard from './UserProfileCard'
import AboutMeCareer from './AboutMeCareer'
import Image from 'next/image'
import ResumeCard from './ResumeCard'

const BasicInfo = () => {
    return (
        <div className='bg-white py-8 px-10 rounded-lg'>

            <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-4">
                {/* Left: Title */}
                <h2 className="text-sm font-semibold text-gray-900">Basic Info</h2>

                {/* Right: Buttons */}
                <div className="flex space-x-2">
                    <button
                        type="button"
                        className="flex items-center border border-[#1C315E] text-sm text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-100"
                    >
                        Schedule Interview
                        <Image
                            src="/calendar-check-02.png"
                            alt="Graduation Cap"
                            width={18}
                            height={18}
                            className="mt-1 ml-1"
                        />
                    </button>
                    <button
                        type="button"
                        className="bg-[#2E90FA] text-white text-sm px-4 py-1.5 rounded-md hover:bg-blue-700"
                    >
                        Hire Applicant
                    </button>
                </div>
            </div>

            <UserProfileCard />
            <div className='my-4'>

                <AboutMeCareer />
            </div>

            <ResumeCard />

        </div>
    )
}

export default BasicInfo
