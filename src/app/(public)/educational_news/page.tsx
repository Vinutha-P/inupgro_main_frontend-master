'use client'
import EducationalNews from '../../../components/pages/EducationalNews';
import React from 'react';
import { Provider } from "react-redux";
import { store } from "@/lib/store";

const page = () => {
  const handleViewAllClick = () => {
    console.log('View All clicked');
  };

  return (
    <div className='w-full h-full'>
      <Provider store={store}>
      <EducationalNews viewAllClick={handleViewAllClick} />
      </Provider>
    </div>
  );
};

export default page;
