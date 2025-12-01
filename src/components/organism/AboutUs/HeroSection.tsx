import Image from 'next/image';
import React from 'react'

const aboutData = [
    {
      id: 1,
      imgSrc: '/rating.png',
      imgAlt: 'Rating Icon',
      imgWidth: 60,
      imgHeight: 60,
      text: 'Recognized 3 times as the leading EdTech startup in India.',
    },
    {
      id: 2,
      imgSrc: '/chart.png',
      imgAlt: 'Chart Icon',
      imgWidth: 51,
      imgHeight: 60,
      text: 'Empowered 7500+ institutions worldwide to streamline operations.',
    },
  ];
const HeroSection = () => {
  return (
    <>
      <div className='flex flex-col items-center justify-center bg-[#edf3ff] px-4 py-10 lg:pt-[75px] lg:pb-[50px] '>
      <h5 className="font-semibold text-[18px] leading-[15px] tracking-[0%] text-center text-darkBlue">
        About Us
      </h5>
      <h2 className='font-semibold text-4xl lg:text-[52px] tracking-[-2px] text-center text-darkBlue my-6 leading-tight'>
        We’re here to help you build, <br className='hidden lg:block' />manage & protect your wealth
      </h2>
      <p className='text-darkBlue font-normal text-base md:text-lg leading-[30px] md:leading-[38.4px] tracking-[-0.2px] text-center md:max-w-[770px]'>
        Since 2015, our mission has been to empower schools to grow and excel with streamlined, cost-effective solutions.
      </p>

      <div className='flex flex-col md:flex-row md:max-w-[770px] gap-6 lg:mt-6 w-full mt-10'>
        {aboutData.map((item) => (
          <div key={item.id} className='flex md:w-1/2 bg-white rounded-2xl py-[42px] px-4 items-start'>
            <Image
              src={item.imgSrc}
              alt="img-alt"
              width={item.imgWidth}
              height={item.imgHeight}
              className="w-12 h-12 mr-4 object-contain"
            />
            <p className='max-w-[288px] font-medium text-[16px] leading-[27px] text-darkBlue'>
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default HeroSection
