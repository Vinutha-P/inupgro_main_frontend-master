"use client";
import React, { Suspense } from 'react';
import { store } from '@/lib/store';
import { Provider } from 'react-redux';
import TermsAndConditions, { TermSection } from '@/components/pages/Trems-Conditions';

const sampleData: TermSection[] = [

  {
    title: 0,
    type: 'paragraphs',
    content: ["Welcome to abc.com, a mmm-based EdTech platform dedicated to revolutionizing education in India. These Terms and Conditions govern your access and use of our platform, services, and related applications. By registering, accessing, or using our services, you agree to comply with these Terms and Conditions.",
      "abc.com strives to provide a seamless and engaging learning experience, ensuring accessibility for students, teachers, and institutions across various tiers in India.",
      "These terms apply to all users—learners, educators, and institutions—and are designed to foster a safe, productive environment."]
  },
  {
    title: 0,
    type: 'paragraphs',
    content: ["Welcome to abc.com, a mmm-based EdTech platform dedicated to revolutionizing education in India. These Terms and Conditions govern your access and use of our platform, services, and related applications. By registering, accessing, or using our services, you agree to comply with these Terms and Conditions.",
      "abc.com strives to provide a seamless and engaging learning experience, ensuring accessibility for students, teachers, and institutions across various tiers in India.",
      "These terms apply to all users—learners, educators, and institutions—and are designed to foster a safe, productive environment."]
  },
  {
    title: 0,
    type: 'paragraphs',
    content: ["Welcome to abc.com, a mmm-based EdTech platform dedicated to revolutionizing education in India. These Terms and Conditions govern your access and use of our platform, services, and related applications. By registering, accessing, or using our services, you agree to comply with these Terms and Conditions.",
      "abc.com strives to provide a seamless and engaging learning experience, ensuring accessibility for students, teachers, and institutions across various tiers in India.",
      "These terms apply to all users—learners, educators, and institutions—and are designed to foster a safe, productive environment."]
  },
  {
    title: 0,
    type: 'paragraphs',
    content: ["Welcome to abc.com, a mmm-based EdTech platform dedicated to revolutionizing education in India. These Terms and Conditions govern your access and use of our platform, services, and related applications. By registering, accessing, or using our services, you agree to comply with these Terms and Conditions.",
      "abc.com strives to provide a seamless and engaging learning experience, ensuring accessibility for students, teachers, and institutions across various tiers in India.",
      "These terms apply to all users—learners, educators, and institutions—and are designed to foster a safe, productive environment."]
  },
  {
    title: 0,
    type: 'paragraphs',
    content: ["Welcome to abc.com, a mmm-based EdTech platform dedicated to revolutionizing education in India. These Terms and Conditions govern your access and use of our platform, services, and related applications. By registering, accessing, or using our services, you agree to comply with these Terms and Conditions.",
      "abc.com strives to provide a seamless and engaging learning experience, ensuring accessibility for students, teachers, and institutions across various tiers in India.",
      "These terms apply to all users—learners, educators, and institutions—and are designed to foster a safe, productive environment."]
  },

];

const cta = {
  title: '',
  description: '',
  imageSrc: '',
  imageAlt: ''
};

const App: React.FC = () => {
  return (
    <div className=''>
      <Suspense fallback={"...LOADING"}>
        <Provider store={store}>
          <TermsAndConditions
            heading="Legal Disclaimer"
            termsData={sampleData}
            cta={cta}
          />
        </Provider>
      </Suspense>
    </div>
  );
};

export default App;
