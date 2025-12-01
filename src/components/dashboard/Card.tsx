import Image from 'next/image'
import React from 'react'

const Card = () => {
    return (
        <>
            <div className="flex gap-4">
                <div className="bg-[#E7F0FA] w-[312px] p-6 rounded-lg shadow flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold mb-1">120</h2>
                        <p className="text-gray-500 text-base">Total Students</p>
                    </div>
                    <div className="text-blue-600">
                        <Image
                        src="/user.png"
                        alt="Graduation Cap"
                        width={45}
                        height={45}
                    />
                    </div>
                </div>
                <div className="bg-[#FFF6E6] w-[312px] p-6 rounded-lg shadow flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold mb-1">30</h2>
                        <p className="text-gray-500 text-base">New Applications</p>
                    </div>
                    <div className="text-green-600">  
                        <Image
                        src="/users.png"
                        alt="Graduation Cap"
                        width={45}
                        height={45}
                    />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Card
