'use client';

import React from 'react';

const UserProfileCard = () => {
  // User data (static for now, could come from API later)
  const user = {
    name: 'Smita Agarwal',
    dob: '10 Nov 1994',
    age: 29,
    mobile: '+91 9079204069',
    email: '94guptanishu@gmail.com',
    gender: 'Female',
    address: 'D– 58, 80 feet road, Vaishali Nagar, Jaipur, Rajasthan (302015)',
  };

  // Labels for the fields
  const fieldLabels: { [key: string]: string } = {
    name: 'Name',
    dob: 'DOB',
    age: 'Age',
    mobile: 'Mobile number',
    email: 'Email ID',
    gender: 'Gender',
    address: 'Address',
  };

  return (
    <div className="mt-9 ">
      {/* Profile Image Placeholder */}
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 rounded-full border-2 border-[#D1E9FF]"></div>
      </div>

      <div className="grid grid-cols-3 gap-6 items-start">
        {Object.entries(user).map(([key, value]) => (
          <div
            key={key}
            className={`col-span-1 ${key === 'address' ? 'col-span-full' : ''}`}
          >
            <p className="text-xs text-gray-400 mb-1">{fieldLabels[key]}</p>
            <p className="font-medium text-black">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfileCard;
