import Image from 'next/image';

const teamData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO and Co-Founder',
    image: '/sarah.png',
  },
  {
    id: 2,
    name: 'David Lee',
    role: 'CEO and Co-Founder',
    image: '/david-lee.png',
  },
  {
    id: 3,
    name: 'Michael Brown',
    role: 'VP of Engineering',
    image: '/michael-brown.png',
  },
  {
    id: 4,
    name: 'Noah Martinez',
    role: 'VP of Sales',
    image: '/noah-martinez.png',
  },
  {
    id: 5,
    name: 'Emily Kim',
    role: 'VP of Product',
    image: '/emily-kim.png',
  },
  {
    id: 6,
    name: 'Sarah Johnson',
    role: 'CEO and Co-Founder',
    image: '/sarah1.png',
  },
  {
    id: 7,
    name: 'Sarah Johnson',
    role: 'CEO and Co-Founder',
    image: '/sarah2.png',
  },
  {
    id: 8,
    name: 'Sarah Johnson',
    role: 'CEO and Co-Founder',
    image: '/sarah3.png',
  },
];

const MeetOurTeam = () => {
  return (
    <div className='about-section'>
      <div className='lg:mb-6 text-center'>
        <h4 className=' text-darkBlue'>
          Meet our team
        </h4>
        <p className='text-grayText font-normal text-[16px] tracking-[-0.2px] max-w-[660px] mx-auto my-4'>
          Our platform is designed to empower schools of all sizes to operate smarter and achieve educational excellence with confidence
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl'>
        {teamData.map((member) => (
          <div key={member.id} className='col-span-1 flex flex-col items-center text-center'>
            <div className='bg-[#f2f2f6] rounded-xl w-full'>
              <Image
                src={member.image}
                alt="img-alt"
                width={282}
                height={282}
                className='mx-auto lg:w-[282px] lg:h-[282px] object-cover rounded-xl'
              />
            </div>
            <strong className='mt-4 text-darkBlue text-[18px]'>{member.name}</strong>
            <p className='font-medium text-[16px] leading-[27px] text-grayText'>{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetOurTeam;
