import Image from 'next/image';
import React from 'react'



const jobDetails = [
    { icon: '/job-post.png', label: 'Job Posted:', value: '14 June, 2021' },
    { icon: '/Timer.png', label: 'Job Expire In:', value: '14 July, 2021' },
    { icon: '/briefcase.png', label: 'Education:', value: 'Graduation' },
    { icon: '/Wallet.png', label: 'Salary:', value: '₹50k–80k/month' },
    { icon: '/locations.png', label: 'Location:', value: 'Jaipur' },
    { icon: '/Wallet.png', label: 'Job Type:', value: 'Full Time' },
    { icon: '/Wallet.png', label: 'Experience:', value: '2–5 Years' },
];


const JobOverviewCard = () => {
    return (
        <>
            <div className=" grid grid-cols-3 text-sm text-gray-700 ">
                {jobDetails.map((item, index) => (
                    <div className="col-span-1 mb-3" key={index}>
                        <p className=" gap-1 text-[#2E90FA] text-[28px] mb-3">
                            <Image
                                src={item.icon}
                                alt="Icon"
                                width={30}
                                height={30}
                            />
                        </p>
                        <p className='text-[#767F8C] text-xs'>{item.label}</p>
                        <p className='text-[#18191C] text-sm font-semibold'>{item.value}</p>
                    </div>
                ))}
            </div>

        </>
    )
}

export default JobOverviewCard
