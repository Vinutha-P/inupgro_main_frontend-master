import Image from 'next/image'
import React from 'react'

const Toast = () => {
    return (
        <>
            <div className="bg-[#f3f5ff] border border-blue-300 rounded-xl p-4 text-[#5669FF] flex items-center gap-4">
                <Image src="/flight.png" alt='flight' width={25} height={25} />
                <p className="font-medium text-sm">Update your profile to get better reach</p>
            </div>
        </>
    )
}

export default Toast
