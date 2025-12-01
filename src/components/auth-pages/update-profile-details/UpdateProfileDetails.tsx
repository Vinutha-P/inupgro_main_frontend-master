'use client';

import React, { useState } from 'react';

import UpdateProfileTabButton from './UpdateProfileTabButton';
import UpdateTabs from './UpdateTab';
import UploadImageCard from './UploadImageCard';
// import VideoTableHeader from './teacher/videos/VideoTable';
import ModalCard from './ModalCard';
import TeacherCard from './TeacherCard';
import JobCard from './JobCard';

// type UploadImageCardProps = {
//   message: string;
// };

const UpdateProfileDetails = () => {
  const [activeTab, setActiveTab] = useState('Latest');
  const [showModal, setShowModal] = useState(true);


  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-green-50 min-h-[100vh] font-sans overflow-y-auto">
      <UpdateProfileTabButton />

      {/* Modal Background (covers screen but allows scroll) */}
      {showModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-40 z-40 pointer-events-none h-[100%]" />
          <div className="absolute top-28 left-1/2 transform -translate-x-1/2 z-50">
            <ModalCard
              role={"teacher"}
            />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex gap-6 pb-12 pt-6 border-2 border-black">
        <div className="w-64 hidden lg:block">
          <TeacherCard />
          <JobCard />
        </div>
        <div className="flex-1">
          <div className="bg-white p-10 rounded shadow">
            <UpdateTabs onTabChange={(tab) => setActiveTab(tab)} />
            {/* <VideoTableHeader /> */}
            <UploadImageCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileDetails;
