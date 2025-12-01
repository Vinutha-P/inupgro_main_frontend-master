const successStats = [
  {
    id: 1,
    value: '2000+',
    title: 'Colleges Served',
    description:
      'INUPGRO is trusted by schools, colleges, and educational organizations worldwide, from startups to large institutions.',
  },
  {
    id: 2,
    value: '1900',
    title: 'Schools Served',
    description:
      'Our focus on user-friendly solutions and robust features has earned us high satisfaction from our users.',
  },
  {
    id: 3,
    value: '800',
    title: 'Institute Served',
    description:
      'Seamlessly connect Taskhub with your favorite tools to create a unified and efficient workspace.',
  },
];

const SuccessByNumbers = () => {
  return (
    <div className='about-section'>
      <div className='lg:mb-6 text-center'>
        <h4 className='text-darkBlue'>
          Our success by the numbers
        </h4>
        <p className='text-grayText font-normal text-[16px] tracking-[-0.2px] max-w-[660px] mx-auto my-4'>
          Our platform is designed to empower businesses of all sizes to work smarter and achieve their goals with confidence.
        </p>
      </div>

      <div className='max-w-[1200px] mx-auto bg-[#edf3ff] rounded-lg lg:p-16 p-4 flex flex-wrap md:flex-nowrap justify-center gap-6'>
        {successStats.map((stat) => (
          <div
            key={stat.id}
            className='w-full md:max-w-[334px] bg-white rounded-xl p-4 lg:p-8 flex flex-col justify-between'
          >
            <h3 className='font-bold text-lg lg:text-[25px] text-darkBlue tracking-[1.5px]'>
              {stat.value}
            </h3>
            <h5 className='font-medium text-base text-darkBlue leading-[30.6px]'>{stat.title}</h5>
            <p className='font-medium text-base leading-[27px] text-grayText mt-6'>{stat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessByNumbers;
