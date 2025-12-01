"use client";
import { capitalize } from '@/utils/helper';
import React from 'react'
const NewsDetailsHeader = ({ status }: any) => {
    return (
        <>
            <div className="flex justify-between items-center border-b pb-2 mb-4">
                <h1 className="text-xl font-semibold">News Details</h1>
                {status && (
                    <span className="text-sm text-red-500 border border-red-400 px-2 py-0.5 rounded-md bg-red-50">
                        {capitalize(status)}
                    </span>
                )}
            </div>
        </>
    )
}

export default NewsDetailsHeader
