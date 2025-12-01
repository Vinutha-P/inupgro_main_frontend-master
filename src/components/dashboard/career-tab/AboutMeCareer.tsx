'use client';

import React from 'react';
import Image from 'next/image';

const AboutMeCareer = () => {
  // ✅ Dynamic data
  const aboutMeText = `Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque
  sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. leo, non suscipit magna interdum eu.
  Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet.`;

  const educationList = [
    {
      institution: 'Global Institute of Technology, Jaipur',
      duration: '2017 - 2019',
      degree: 'Master of Engineering, Computer Science',
    },
    {
      institution: 'Rajasthan Technical University',
      duration: '2013 - 2017',
      degree: 'Bachelor of Technology, Information Technology',
    },
  ];

  const skills = [
    {
      title: 'BOI Specialist',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla.',
      fullLink: 'Read Full',
    },
    {
      title: 'BOI Specialist',
      description: '',
    },
  ];

  return (
    <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
      {/* About Me */}
      <section>
        <h2 className="text-base font-semibold text-gray-900 mb-1">About me</h2>
        <p className="text-gray-600">{aboutMeText}</p>
      </section>

      {/* Education */}
      <section>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Education</h2>
        <div className="flex flex-wrap gap-20">
          {educationList.map((edu, index) => (
            <div
              key={index}
              className="flex items-start space-x-2 rounded-md"
            >
              <Image
                src="/cap.png" 
                alt="Graduation Cap"
                width={36}
                height={36}
                className="mt-1"
              />
              <div>
                <h3 className="font-semibold text-sm text-[#444444]">
                  {edu.institution}{' '}
                  <span className="text-[#999999] text-xs font-normal"> - {edu.duration}</span>
                </h3>
                <p className="text-sm text-gray-600">{edu.degree}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Skills</h2>
        <ul className="space-y-4">
          {skills.map((skill, index) => (
            <li key={index} className="flex items-start space-x-2">
              <Image
                src="/success.png" 
                alt="Check Icon"
                width={15}
                height={15}
                className="mt-1"
              />
              <div>
                <p className="font-semibold text-sm text-gray-800">{skill.title}</p>
                {skill.description && (
                  <p className="text-sm text-gray-600">
                    {skill.description}
                    {skill.fullLink && (
                      <span className="text-blue-600 ml-1 cursor-pointer">{skill.fullLink}</span>
                    )}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AboutMeCareer;
