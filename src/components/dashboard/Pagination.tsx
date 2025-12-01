import React from 'react'

const Pagination = () => {
    return (
        <>

            <div className="flex justify-center items-center mt-4 text-sm ">
                <button className="px-3 py-1 bg-white rounded text-gray-500 cursor-not-allowed border-[1px] border-[#D0D5DD]" disabled>
                    ← Previous
                </button>
                <div className="flex">
                    {[1, 2, 3, '...', 8, 9, 10].map((n, i) => (
                        <button
                            key={i}
                            className={`px-3 py-1  ${n === 1
                                ? 'bg-[#1C315E] text-white'
                                : 'bg-white text-gray-700 border-[1px] border-[#D0D5DD] hover:bg-gray-200'
                                }`}
                        >
                            {n}
                        </button>
                    ))}
                </div>
                <button className="px-3 py-1 bg-white rounded text-gray-700 border-[1px] border-[#D0D5DD] hover:bg-gray-200">
                    Next →
                </button>
            </div>

        </>
    )
}

export default Pagination
