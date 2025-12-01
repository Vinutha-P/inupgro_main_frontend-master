import { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';

const FAQ = () => {
  const accordionData = [
    {
      id: 1,
      heading: 'What is INUPGRO?',
      content:
        'INUPGRO is a school management solution designed to simplify and enhance institutional operations.',
    },
    {
      id: 2,
      heading: 'How does it help teachers?',
      content:
        'It offers automated attendance, grading, and communication tools for educators.',
    },
    {
      id: 3,
      heading: 'Is it secure?',
      content:
        'Yes, INUPGRO prioritizes security and data privacy with industry-standard encryption.',
    },
    {
      id: 4,
      heading: 'Does it support mobile?',
      content: "Absolutely! It's mobile-friendly and works across devices.",
    },
    {
      id: 5,
      heading: 'Can it handle multiple schools?',
      content:
        'Yes, the platform is scalable for managing multiple institutions under one account.',
    },
    {
      id: 6,
      heading: 'How do we get started?',
      content:
        'Simply contact our sales team or sign up online for a free demo.',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle current item or close if it's already open
  };

  return (
    <div className="bg-white py-5 px-4">
      <div className="max-w-[820px] mx-auto text-center mb-12">
        <h4 className="text-center">
          Frequently asked questions
        </h4>
        <p className="font-normal text-[16px] leading-[27.2px] mt-4 text-grayText">
          Frequently Asked Questions (FAQ) sections are vital components of any
          website, especially for platforms like INUPGRO. They serve as a
          centralized hub of information where users can quickly find answers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accordionData.map((item, index) => (
          <div key={item.id} className="border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center p-4 text-left"
            >
              <p className="text-lg font-medium">{item.heading}</p>
              {openIndex === index ? (
                <FiMinus className="text-xl text-blue-600" />
              ) : (
                <FiPlus className="text-xl text-blue-600" />
              )}
            </button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openIndex === index ? 'max-h-[1000px] p-4' : 'max-h-0'
              }`}
            >
              {openIndex === index && (
                <div className="px-4 pb-4 text-gray-600">{item.content}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
