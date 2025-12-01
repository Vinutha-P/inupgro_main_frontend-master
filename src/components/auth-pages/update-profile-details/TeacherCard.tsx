'use client';

import React from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

const TeacherCard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const role = useSelector((state: RootState) => state.auth.role);

  const getProfileDetails = () => {
    if (!user || !role) {
      return {
        profilePic: null,
        name: 'NA',
        subject: 'NA',
        availability: 'NA',
      };
    }

    if (role === 'Teacher') {
      return {
        profilePic: user.profilePic || null,
        name: `${user.firstName || 'Teacher'} ${user.lastName || ''}`.trim(),
        subject: user.subject || 'Subject',
        availability: user.availability || 'Immediate',
      };
    } else if (role === 'Student') {
      return {
        profilePic: user.profilePic || null,
        name: `${user.firstName || 'Student'} ${user.lastName || ''}`.trim(),
        subject: 'Student',
        availability: user.status || 'NA',
      };
    } else if (role === 'Institution') {
      return {
        profilePic: user.profilePic || null,
        name: user.name || 'Institution Name',
        subject: user.instituteType || 'Institution',
        availability: user.status || 'Active',
      };
    }

    return {
      profilePic: null,
      name: 'NA',
      subject: 'NA',
      availability: 'NA',
    };
  };

  const { profilePic, name, subject, availability } = getProfileDetails();

  if (!name || !subject || !availability) {
    return (
      <div className="bg-white rounded-lg shadow p-4 text-center min-h-[270px] flex items-center justify-center text-gray-400">
        No profile info available.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow py-10 text-center min-h-[270px] ">
      <div className="w-[134px] h-[134px] mx-auto rounded-full overflow-hidden relative">
        {profilePic ? (
          <Image
            src={profilePic}
            alt="Profile Picture"
            width={124}
            height={124}
            className="object-cover w-[124px] h-[124px] mx-auto"
          />
        ) : (
          <Image
            src={'/user-image.png'}
            alt="Default Profile"
            width={124}
            height={124}
            className="object-cover w-[124px] h-[124px] mx-auto"
          />
        )}
      </div>
      <div className="max-w-[190px] mx-auto">
        <div className="mt-1 font-semibold text-base">{name}</div>
        <div className="text-sm mt-1.5 text-gray-500 leading-tight">{subject}</div>
      </div>
      <button className="mt-5 text-base font-medium px-4 py-1 bg-[#D1E9FF] text-[#2E90FA] rounded">
        {availability}
      </button>
    </div>
  );
};

export default TeacherCard;