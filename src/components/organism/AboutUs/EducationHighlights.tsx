import Image from 'next/image';

interface SectionContent {
  imageSrc: string;
  altText: string;
  heading: string;
  description: string;
  flip?: boolean;
}

export default function EducationHighlights() {
  const sections: SectionContent[] = [
    {
      imageSrc: '/transforming-education.png',
      altText: 'Transforming Education',
      heading: 'Transforming Education: Student Base and Rajasthan Government Join Hands',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...',
      flip: false,
    },
    
  ];

  return (
    <>
      {sections.map((section, index) => (
        <div key={index} className="bg-white ">
          <div
            className={`flex flex-wrap lg:flex-nowrap items-center gap-10 ${
              section.flip ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Image Block */}
            <div className="w-full lg:w-[45%] flex justify-center">
              {/* <div className="w-[300px] lg:w-[640px] md:h-[312px] relative aspect-[4/6] lg:aspect-[9/12]"> */}
              <div className="relative w-full max-w-[640px] h-48 sm:h-72 md:h-96 lg:h-[350px] aspect-[4/6] lg:aspect-[9/12] overflow-hidden">
                <Image
                  src={section.imageSrc}
                  alt="img-alt"
                  fill
                  // className="object-contain"
                  className="absolute inset-0 w-full h-full object-cover lg:object-contain"
                />
              </div>
            </div>

            {/* Text Block */}
            <div className="w-full lg:w-[55%]">
              <h4 className="text-darkBlue text-2xl font-semibold mb-4">
                {section.heading}
              </h4>
              <p className="text-grayText text-base leading-relaxed">
                {section.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
