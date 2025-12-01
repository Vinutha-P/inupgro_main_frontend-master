'use client';
import { FaFacebook, FaTwitter, FaPinterest, } from 'react-icons/fa';
import JobOverviewCard from './JobOverviewCard';
import SchoolInfoCard from './SchoolInfoCard';
import Image from 'next/image';
import Link from 'next/link';
import SocialMediaIocn from './SocialMediaIocn';
import { FiChevronRight } from 'react-icons/fi';
import Breadcrumb from '../Breadcrumb';




const sharePlatforms = [
  {
    name: 'Facebook',
    icon: <FaFacebook />,
    color: '#0A65CC',
    url: 'https://facebook.com/share?u=YOUR_URL_HERE',
  },
  {
    name: 'Twitter',
    icon: <FaTwitter />,
    color: '#1DA1F2',
    url: 'https://twitter.com/share?url=YOUR_URL_HERE',
  },
  {
    name: 'Pinterest',
    icon: <FaPinterest />,
    color: '#CA2127',
    url: 'https://pinterest.com/pin/create/button/?url=YOUR_URL_HERE',
  },
];

export default function JobDetailsPage() {
  return (
    <>
     <Breadcrumb />

      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans text-sm">

        <div className="lg:col-span-2 space-y-6 p-8 bg-white shadow-[0px_2px_4px_0px_#00001414] rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-3">
            <h2 className="text-lg font-semibold">Job Details</h2>
            <div className="space-x-2 flex">
              <button className="text-sm px-3 py-1.5 border-[1px] border-[#1C315E] rounded hover:bg-gray-100 flex items-center gap-1">
                Edit
                <Image
                  src='/edit-02.png'
                  alt="Icon"
                  width={15}
                  height={15}
                />
              </button>
              <button className="text-sm px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1">
                Delete
                <Image
                  src="/close.png"
                  alt="Icon"
                  width={15}
                  height={15}
                />
              </button>
            </div>
          </div>


          <div className='flex justify-between'>
            <div className='ml-20'>
              <h3 className="text-xl font-semibold">Mathematics HOD
                <span className="text-xs bg-[#E8F1FF]  text-[#0066FF] px-2 py-0.5 rounded-full ml-2">Full Time</span>
              </h3>
              <p className="text-gray-500 text-sm mt-1">596 Viewers</p>
            </div>
            <div className="">
              <button className="bg-[#2E90FA] text-white px-5 py-3 rounded-lg text-base font-medium hover:bg-blue-600 mb-2">
                View Applications (785)
              </button>
              <p className="text-xs text-[#767F8C] text-right">Job expire in: <span className="text-[#E05151] font-semibold">June 30, 2021</span></p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-semibold text-lg mb-3">Job Description</h4>
            <p className="text-[#5E6670] text-base leading-relaxed mb-3">
              Integer aliquet pretium consequat. Donec et sapien id leo accumsan pellentesque eget maximus tellus. Duis et est ac leo rhoncus tincidunt vitae vehicula augue. Donec in suscipit diam. Pellentesque quis justo sit amet arcu commodo sollicitudin. Integer finibus blandit condimentum. Vivamus sit amet ligula ullamcorper, pulvinar ante id, tristique erat. Quisque sit amet aliquam urna. Maecenas blandit felis id massa sodales finibus. Integer bibendum eu nulla eu sollicitudin. Sed lobortis diam tincidunt accumsan faucibus. Quisque blandit augue quis turpis auctor, dapibus euismod ante ultricies. Ut non felis lacinia turpis feugiat euismod at id magna. Sed ut orci arcu. Suspendisse sollicitudin faucibus aliquet.
            </p>
            <p className="text-[#5E6670] text-base leading-relaxed mb-3">
              Integer aliquet pretium consequat. Donec et sapien id leo accumsan pellentesque eget maximus tellus. Duis et est ac leo rhoncus tincidunt vitae vehicula augue. Donec in suscipit diam. Pellentesque quis justo sit amet arcu commodo sollicitudin.
            </p>
          </div>

          {/* Responsibilities */}
          <div>
            <h4 className="font-semibold mb-1 text-lg">Responsibilities</h4>
            <ul className="list-disc ml-5 space-y-1 text-base text-[#5E6670]">
              <li className='mb-2'>Quisque semper gravida est et consectetur.</li>
              <li className='mb-2'>Curabitur blandit lorem velit.</li>
              <li className='mb-2'>Morbi mattis in ipsum ac tempus.</li>
              <li className='mb-2'>Curabitur eu vehicula libero.</li>
              <li className='mb-2'>Vulputate turpis. Quisque ante odio.</li>
              <li className='mb-2'>Commodo feugiat. Nulla laoreet, diam placerat.</li>
            </ul>
          </div>

          <div className="mt-4 flex items-center gap-3 text-sm">
            <span className="font-medium">Share this job:</span>
            {sharePlatforms.map((platform) => (
              <Link
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1 border-[1px] border-[#EDEFF5] rounded-[4px] p-2 hover:underline`}
                style={{ color: platform.color }}
              >
                {platform.icon} {platform.name}
              </Link>
            ))}
          </div>
        </div>



        {/* Right - Sidebar */}
        <div className="space-y-6">
          <div className="bg-white shadow-[0px_2px_4px_0px_#00001414] rounded-2xl p-8 border">
            <h4 className="font-medium text-[20px] mb-4 text-[#191F33]">Job Overview</h4>
            <JobOverviewCard />
          </div>

          {/* School Info Card */}
          <div className="bg-white shadow-[0px_2px_4px_0px_#00001414] rounded-2xl p-8 border text-sm text-gray-700">

            <div className='ml-20 mb-5'>
              <h4 className="font-semibold  text-[#18191C] text-[20px]">Jaipur School
              </h4>
              <p className="text-[#767F8C] text-sm font-normal">School</p>
            </div>
            <SchoolInfoCard />

            <SocialMediaIocn />
          </div>
        </div>
      </div>
    </>
  );
}
