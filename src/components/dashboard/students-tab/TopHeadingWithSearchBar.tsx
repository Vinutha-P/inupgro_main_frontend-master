'use client'
import React from 'react'
import { FaBell, FaSearch } from 'react-icons/fa';
const TopHeadingWithSearchBar = ({details}:any) => {
    return (
        <>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm text-gray-600">Welcome</p>
                    <h1 className="text-xl font-bold">Jaipur School</h1>
                </div>
                <div className="flex items-center gap-4 w-[70%]">
                    <div className="relative bg-white w-[92%]">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 border w-full border-gray-300 rounded-md focus:outline-none"
                        />
                        <FaSearch className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                    </div>
                    <div className="w-12 h-12 bg-white rounded-full flex justify-center items-center">
                        <FaBell className="h-6 w-6 text-gray-600 cursor-pointer" />
                    </div>
                </div>
            </div>

        </>
    )
}

export default TopHeadingWithSearchBar
