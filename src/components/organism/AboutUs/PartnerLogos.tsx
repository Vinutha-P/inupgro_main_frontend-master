import Image from 'next/image';

const logos = [
  {
    src: '/startup.png',
    alt: '#StartupIndia',
  },
  {
    src: '/raj-gov.png',
    alt: 'Government of Rajasthan',
  },
  {
    src: '/istart.png',
    alt: 'iSTART',
  },
  // Add more logos here as needed
];


export default function PartnerLogos() {
  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <h3 className='font-medium text-base md:text-2xl lg:text-[32px] my-2 lg:my-0 lg:leading-[54px] tracking-[-0.2px] text-center'>
          Join 25,000+ Institutions Thriving with INUPGRO
        </h3>
        <div className="flex flex-wrap justify-center lg:space-x-8 lg:mt-[30px] lg:gap-y-8">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="w-[45vw] md:w-[31vw] lg:w-[417.92px] relative aspect-[4279/1000]"
            >
              <Image
                src={logo.src}
                alt="img-alt"
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
