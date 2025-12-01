import React from 'react';

const SuggestedVideos = () => {
    return (
        <div className="w-[500px] bg-white rounded-xl shadow p-4">
            <h3 className="text-lg font-semibold mb-4">Suggested videos</h3>
            <div className="flex flex-col gap-4">
                {[...Array(8)].map((_, index) => (
                    <div key={index}>
                        <div className="flex gap-3 items-start">
                            <div className="w-44 h-20 bg-[#4c68ff] rounded-md relative">
                                <span className="absolute bottom-1 left-1 bg-black bg-opacity-70 text-white text-[0.6rem] px-2 py-0.5 rounded-xl">
                                    1:30
                                </span>
                            </div>

                            <div className="flex flex-col text-sm text-gray-700">
                                <p className="font-medium leading-tight line-clamp-2 text-[0.8rem]">
                                    NCI Information System Information NCI Information System Information Informat...
                                </p>
                                <span className="text-gray-500 text-[0.6rem] my-1.5">By John</span>
                                <span className="text-gray-400 text-[0.6rem]">443K views • 22 hours ago</span>
                            </div>
                        </div>
                        <div className="border-b border-gray-200 mt-4" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SuggestedVideos;
