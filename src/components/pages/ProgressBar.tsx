
import React from 'react';
const ProgressBar = () => {
    return (
        <>
            <div className="">
                <h2 className="text-2xl font-bold text-blue-900 mb-6">Application status</h2>
                <div className="relative w-[100%] my-5 flex items-center justify-between">
                    <div className="absolute top-1/2 left-5 right-5 h-1 bg-gray-300 z-0 transform -translate-y-1/2" />
                    <div
                        className="absolute top-1/2 left-5 h-1 bg-[#47B748] z-10 transform -translate-y-1/2"
                        style={{ width: '50%' }}
                    />

                    <div className="relative z-20 w-6 h-6 rounded-full bg-[#47B748] text-white flex items-center justify-center text-sm">
                        &#10003;
                    </div>
                    <div className="relative z-20 w-6 h-6 rounded-full bg-white border-4 border-[#47B748] text-green-500 flex items-center justify-center text-sm" />
           
                    <div className="relative z-20 w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-sm" />
                </div>
                <div className="flex items-center justify-between">
               
                    <div className="flex flex-col items-center text-center">
                        <p className="font-semibold mt-2">Applied</p>
                        <p className="text-gray-500 text-sm">10 Jan ‘25</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <p className="font-semibold mt-2">Application View</p>
                        <p className="text-gray-500 text-sm">10 Jan ‘25</p>
                    </div>
                    <div className="flex flex-col items-center text-center">

                        <p className="font-semibold mt-2">Application Accepted</p>
                    </div>
                </div>
            </div>

        </>

    );
};

export default ProgressBar;
