import React from 'react';
import Image from 'next/image'

type ImageItem = {
  type: 'image';
  src: string;
  alt: string;
  aspect: string;
};

type StatItem = {
  type: 'stat';
  title: string;
  description: string;
  value: string;
  footer: string;
};

type TestimonialItem = {
  type: 'testimonial';
  quote: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
};

type SectionItem = ImageItem | StatItem | TestimonialItem;

type SectionData = {
  description: string;
  leftColumn: SectionItem[];
  rightColumn: SectionItem[];
};


const sectionData: SectionData = {
  description:
    'INUPGRO provides the tools you need to build a professional and efficient management system for your educational institution. Trusted by countless schools, our platform simplifies every aspect of administration.',
  leftColumn: [
    {
      type: 'image',
      src: '/kids-running.png',
      alt: 'Kids running in school hallway',
      aspect: 'aspect-[9/10]',
    },
    {
      type: 'stat',
      title: 'Total Teachers',
      description: 'We empower schools and institutions to grow faster and smarter.',
      value: '42k',
      footer: 'Total Teachers',
    },
  ],
  rightColumn: [
    {
      type: 'image',
      src: '/girl-library.png',
      alt: 'Girl reading book in library',
      aspect: 'aspect-6/4]',
    },
    {
      type: 'testimonial',
      quote:
        '“INUPGRO has revolutionized our school management processes and streamlined operations effortlessly. We couldn\'t be happier.”',
      name: 'Cameron Williamson',
      role: 'Administrator',
      avatar: '/cameron.jpg',
      rating: 5,
    },
    {
      type: 'image',
      src: '/students-classroom.png',
      alt: 'Students in classroom',
      aspect: 'aspect-[5/3]',
    },
  ],
};


const TestimonialGrid: React.FC = () => {
  return (
    <div className='about-section'>
      <div className='lg:mb-20'>
        <p className='text-darkBlue font-normal text-base md:text-xl lg:text-[24px] lg:leading-[39.2px] tracking-[-0.5px] text-center md:max-w-[1020px] mb-4 lg:mb-0'>
          {sectionData.description}
        </p>
      </div>

      <div className='max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='col-span-1'>
          <div className='grid grid-cols-1 gap-4'>
            {sectionData.leftColumn.map((item, index) => {
              if (item.type === 'image') {
                return (
                  <div
                    key={index}
                    className={`relative w-full ${item.aspect} overflow-hidden rounded-lg`}
                  >
                    <Image
                      src={item.src}
                     alt="img-alt"
                      fill
                      sizes='(max-width: 768px) 100vw, 33vw'
                      className='object-cover rounded-lg'
                    />
                  </div>
                );
              }

              if (item.type === 'stat') {
                return (
                  <div
                    key={index}
                    className='bg-blue-900 text-white rounded-lg p-6 flex flex-col justify-between min-h-[300px]'
                  >
                    <div>
                      <h3 className='text-sm font-semibold'>{item.title}</h3>
                      <p className='text-sm text-blue-200 mt-1'>{item.description}</p>
                    </div>
                    <p className='text-5xl font-bold mt-6'>{item.value}</p>
                    <p className='text-sm mt-1 text-blue-200'>{item.footer}</p>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>

        <div className='col-span-1 md:col-span-2'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {sectionData.rightColumn.map((item, index) => {

              if (item.type === 'image') {
                const isWide = item.aspect === 'aspect-[5/3]' || item.aspect === 'aspect-[6/4]';
            
                const imageHeightClass =
                  index === 0 ? '!h-full' : index === 2 ? '!h-[92%]' : '';
            
                return (
                  <div
                    key={index}
                    className={`relative w-full ${item.aspect} overflow-hidden rounded-lg ${
                      isWide ? 'md:col-span-2' : ''
                    }`}
                  >
                    <Image
                      src={item.src}
                     alt="img-alt"
                      fill
                      sizes='(max-width: 768px) 100vw, 50vw'
                      className={`object-cover object-top rounded-lg ${imageHeightClass}`}
                    />
                  </div>
                );
              }

              if (item.type === 'testimonial') {
                return (
                  <div
                    key={index}
                    className='col-span-1 bg-blue-50 rounded-lg p-6 flex flex-col justify-between shadow-sm'
                  >
                    <div>
                      <h2 className='text-xl font-semibold text-blue-800 mb-2'>Incredible!</h2>
                      <div className='flex text-yellow-400 mb-2 text-lg'>
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                      <p className='text-gray-700 mb-4'>{item.quote}</p>
                    </div>
                    <div className='flex items-center gap-3 border-t pt-4'>
                      <div className='relative w-10 h-10'>
                        <Image
                          src={item.avatar}
                         alt="img-alt"
                          fill
                          className='rounded-full object-cover'
                        />
                      </div>
                      <div>
                        <p className='text-sm font-semibold'>{item.name}</p>
                        <p className='text-xs text-gray-500'>{item.role}</p>
                      </div>
                    </div>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialGrid;
