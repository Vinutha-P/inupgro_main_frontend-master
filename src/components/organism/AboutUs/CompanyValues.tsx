import Image from 'next/image';

const valuesData = [
  {
    id: 1,
    icon: '/rating.png',
    alt: 'Productivity Icon',
    title: 'Boosted Productivity',
    description:
      'INUPGRO streamlines school operations, enabling institutions to focus on their core mission of education.',
  },
  {
    id: 2,
    icon: '/rating.png',
    alt: 'Communication Icon',
    title: 'Enhanced Collaboration',
    description:
      'Our platform fosters better communication and coordination among students, teachers, and parents.',
  },
  {
    id: 3,
    icon: '/rating.png',
    alt: 'Efficiency Icon',
    title: 'Time Efficiency',
    description:
      'With centralized tools for managing tasks and schedules, INUPGRO helps save valuable time for everyone.',
  },
];

const CompanyValues = () => {
  return (
    <div className='about-section'>
      <div className='mb-6 text-center'>
        <h4 className='text-darkBlue'>
          Our company’s values
        </h4>
        <p className='text-grayText max-w-[660px] mx-auto mt-4'>
          At INUPGRO, we are dedicated to empowering educational institutions of all sizes to operate efficiently and achieve their goals with confidence.
        </p>
      </div>

      <div className='flex flex-wrap justify-center items-center gap-6'>
        {valuesData.map((value) => (
          <div
            key={value.id}
            className='flex flex-col justify-center items-center w-full sm:max-w-[300px] lg:max-w-[384px] bg-white rounded-2xl border border-[#E3E2E2] pt-10 pb-7 px-6 text-center'
          >
            <Image
              src={value.icon}
             alt="img-alt"
              width={60}
              height={60}
              className='w-12 h-12 mb-4'
            />
            <strong className='text-darkBlue text-[18px] mb-2'>{value.title}</strong>
            <p className='font-medium text-[16px] leading-[27px] text-grayText'>
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyValues;
