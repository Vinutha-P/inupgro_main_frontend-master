import Image from 'next/image'
import React from 'react'
import Faculty from '@/assets/Faculty_Demo_Image.png'


const FacultyCard: React.FC<any> = ({ facultyName, subject, facultyimg, department }) => {
  return (

    <div className='w-[100%] h-full lg:min-h-[18rem] lg:min-w-[250x] px-1 md:px-4 py-2 flex flex-col gap-1 bg-background rounded-lg'>
      <Image
        width={0}
        height={0}
        sizes='100vh'
        src={facultyimg || Faculty}
        alt="faculty-img"
        className='w-full h-[10rem] sm:h-[12.5rem] md:h-full rounded-lg object-cover'
      />
      <h6 className='text-sm text-darkBlue'>{facultyName}</h6>
      <p className='text-xs  text-darkBlue'>{subject}</p>
      <p className='text-xs  text-darkBlue'>{department}</p>

    </div>

  )
}

export default FacultyCard
