"use client";
import { store } from '@/lib/store';
import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import TermsAndConditions, { TermSection } from '@/components/pages/Trems-Conditions';

const sampleData: TermSection[] = [
  {
    title: "Introduction",
    type: "paragraphs",
    content: [
      "Welcome to Inupgro.com, a Jaipur-based EdTech platform dedicated to revolutionizing education in India. These Terms and Conditions govern your access and use of our platform, services, and related applications. By registering, accessing, or using our services, you agree to comply with these Terms and Conditions. If you do not agree with any part of these terms, please refrain from using our platform.",
      "Inupgro.com strives to provide a seamless and engaging learning experience, ensuring accessibility for students, teachers, and educational institutions across various tiers in India. These Terms and Conditions outline the rules, obligations, and expectations to foster a safe and productive learning environment.",
      "By using our services, you acknowledge that our platform is designed to enhance educational opportunities and bridge the gap in quality education across India. We are committed to innovation, inclusivity, and the highest standards of integrity. These terms apply to all users, including individuals accessing our platform for personal learning, teachers utilizing our resources for educational delivery, and institutions integrating our services into their curriculum."
    ]
  },
  {
    title: "Definitions:",
    type: "list",
    content: [
      '"Inupgro", "We", "Us", or "Our" refers to Inupgro.com and its affiliates.',
      '"User", "You", or "Your" refers to any individual, parent, student, teacher, institution, or entity using our platform.',
      '"Services" include all educational tools, features, content, and resources available on Inupgro.com.',
      '"Content" refers to any text, graphics, videos, assessments, assignments, or other materials shared on the platform.',
      '"Subscription" refers to the paid plans that provide access to premium features of the platform.',
      '"Third-Party Services" include any external platforms, websites, or applications that may be integrated with Inupgro to enhance the user experience.',
      '"Account" refers to a registered profile on Inupgro.com through which a user can access services.',
      '"License" means a limited, revocable right granted to users to use the platforms resources.',
      '"Intellectual Property" refers to copyrights, trademarks, and proprietary materials associated with Inupgro.',
      '"Governing Law" refers to the legal jurisdiction under which Inupgro operates.'
    ]
  },
  {
    title: "Eligibility",
    type: "list",
    content: [
      "Users must be at least 18 years old or have parental/guardian consent to access and use our services.",
      "Educational institutions and teachers must ensure compliance with all applicable regulations while using our platform",
      "We reserve the right to restrict or terminate accounts found violating these terms.",
      "Students under 13 years of age require explicit parental consent. Institutions utilizing our services for educational purposes must obtain the necessary authorization from students’ guardians.",
      "Organizations registering on behalf of multiple users must ensure that they have obtained the necessary permissions from those individuals.",
      "Users from certain jurisdictions may be restricted from using specific features due to local regulations, and it is their responsibility to ensure compliance with applicable laws.",
      "Users must provide accurate and up-to-date personal information upon registration. Misrepresentation may lead to termination of access.",
      "Users are prohibited from registering under false identities or using the platform for deceptive practices.",
      "Inupgro reserves the right to conduct verification checks for authenticity.",
    ]
  },
  {
    title: "User Accounts:",
    type: "list",
    content: [
      " To access certain features, users must create an account with accurate and complete information.",
      "Users are responsible for maintaining the confidentiality of their login credentials.",
      "Any unauthorized use of your account must be reported immediately to our support team.",
      "We are not liable for any loss or damage resulting from unauthorized account access due to user negligence.",
      "Users must not create multiple accounts for fraudulent activities or misuse the platform.",
      "Users are responsible for all activities conducted under their account, including compliance with local laws and regulations.",
      "Accounts that remain inactive for an extended period may be deactivated or deleted.",
      "Users must notify Inupgro if they suspect any unauthorized access to their accounts.",
      "Misrepresentation of identity or impersonation of another user is strictly prohibited.",
      "Users are encouraged to enable two-factor authentication for additional security.",
      "Sharing of accounts or login credentials is strictly prohibited.",
      "Any detected breach in account security may result in temporary suspension or permanent ban.",

    ]
  },
  {
    title: "Use of Services:",
    type: "list",
    content: [
      "Inupgro grants you a limited, non-exclusive, non-transferable license to use the platform for educational purposes.",
      "Users must not engage in activities that violate any applicable laws, distribute malicious software, or compromise the platform’s security.",
      "Misuse of services, including hacking, data mining, or unauthorized access, is strictly prohibited.",
      "Users must not interfere with or disrupt the functioning of the platform, including attempting to gain unauthorized access to other users’ accounts.",
      "Educational resources provided must not be used for any illegal or unauthorized purpose.",
      "Users agree not to copy, reproduce, distribute, or exploit the platform’s content for commercial purposes without prior consent.",
      "Users may not use the platform to promote or distribute unauthorized advertisements, spam, or solicitations.",
      "Users must not engage in conduct that harms the reputation, functionality, or integrity of the platform.",
      "Any abuse of platform features for dishonest academic purposes is strictly prohibited.",
      "Users must not upload harmful, offensive, or misleading content.",
      "Engaging in discussions or activities that disrupt the learning environment is forbidden.",

    ]
  },
  {
    title: " Content Ownership and Usage:",
    type: "list",
    content: [
      "Users retain ownership of any content they upload but grant Inupgro a license to use, display, and distribute such content for educational purposes.",
      "Unauthorized copying, modification, or redistribution of platform content without permission is strictly prohibited.",
      "Any content that violates intellectual property laws will be removed, and the responsible user may face account suspension.",
      "Users must ensure that they have the necessary rights and permissions before sharing any third-party content on the platform.",
      "Inupgro reserves the right to remove or restrict access to content that is deemed inappropriate, misleading, or violates ethical guidelines.",
      "Users are responsible for ensuring that their content does not infringe on the intellectual property rights of others.",
      "Content posted by users may be monitored and reviewed for compliance with platform guidelines.",
      "Inupgro may use aggregated and anonymized data derived from user interactions for research and development purposes.",
      "Users grant Inupgro a perpetual, non-exclusive license to feature, share, and use user-generated content for promotional activities.",
      "Any plagiarized content will be removed, and repeated violations will result in account suspension.",
    ]
  },
  {
    title: "Acknowledgment: ",
    type: "paragraphs",
    content: [
      "These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.",
      "Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.",
      "By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.",
      "Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the terms and condition of the Company. Our terms and conditions describe procedures on the collection, use and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before using Our Service.",
    ]
  },
  {
    title: "Changes to These Terms and Conditions: ",
    type: "paragraphs",
    content: [
      "We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.",
      "By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the website and the Service.",
    ]
  },
  {
    title: "Payment and Subscription:",
    type: "list",
    content: [
      "Users may choose from free or paid subscription plans to access various features.",
      "Payment for premium services must be made in advance and is subject to our refund and cancellation policy.Subscriptions renew automatically unless canceled before the renewal date.",
      "Inupgro reserves the right to modify subscription plans, pricing, and payment terms with prior notice.",
      "Users are responsible for ensuring valid payment information is maintained on their account.",
      "Refund requests, if applicable, will be processed per our refund policy.",

    ]
  },
  {
    title: "Privacy and Data Protection:",
    type: "list",
    content: [
      " We are committed to protecting user data and complying with applicable privacy laws.",
      "Personal information collected is used for educational, operational, and improvement purposes.",
      "Users have control over their personal data and can request modifications or deletions.",
      "Inupgro does not sell user data to third parties but may share necessary data with trusted service providers.",
      "Our full Privacy Policy details data collection, storage, and security measures.",

    ]
  },
  {
    title: " Termination and Suspension:",
    type: "list",
    content: [
      "We may suspend or terminate accounts violating our terms, engaging in fraudulent activities, or misusing services.",
      "Users can request account termination at any time by contacting support.",
      "Upon termination, access to paid services will cease, and no refunds will be provided unless otherwise stated."
    ]
  },
  {
    title: "Limitation of Liability: ",
    type: "list",
    content: [
      "Inupgro is not liable for any indirect, incidental, or consequential damages resulting from service use.",
      "We do not guarantee uninterrupted access to services and are not responsible for technical issues beyond our control.",
      "Users assume full responsibility for their reliance on the educational content provided."
    ]
  },
  {
    title: "Indemnification:",
    type: "list",
    content: [
      "Users agree to indemnify and hold Inupgro harmless from any claims, damages, or legal expenses arising from their misuse of the platform.",
      "Institutions using Inupgro services must ensure compliance with all applicable educational regulations."
    ]
  },
  {
    title: "Changes to Terms and Conditions: ",
    type: "list",
    content: [
      "We reserve the right to update these Terms and Conditions at any time, with notice provided where applicable.",
      "Continued use of our services after changes constitute acceptance of the new terms."
    ]
  },
  {
    title: "Governing Law and Dispute Resolution:",
    type: "list",
    content: [
      "These Terms are governed by the laws of India.",
      "Any disputes shall be resolved through arbitration in Jaipur, India, as per applicable legal procedures.",
    ]
  },
  {
    title: "Contact Information:",
    type: "paragraphs",
    content: [
      "For any inquiries or concerns regarding these Terms and Conditions, contact us at:",
      "Inupgro.com",
      "Jaipur, India",
      "Email: Info@inupgro.com",
      "Phone: 8209647142",
      "By using Inupgro.com, you acknowledge that you have read, understood, and agreed to these Terms and Conditions."
    ]
  }
];

const cta = {
  title: 'Join a global team of change-makers.',
  description: 'Vivamus ut potenti aliquam fusce dui imperdiet laoreet tempus sed. Elit cursus est lorem in nisl ac nec. Quis diam posuere a nisl eget turpis sagittis nunc. Aliquet ut ultrices purus, id. Sit quis turpis est nunc in parturient.',
  imageSrc: '/students-classroom.png',
  imageAlt: 'Global Team'
};

const App: React.FC = () => {
  return (
    <div className=''>
      <Suspense fallback={"...LOADING"}>
        <Provider store={store}>
          <TermsAndConditions
            heading="Terms and Conditions:"
            termsData={sampleData}
            cta={cta}
          />
        </Provider>
      </Suspense>
    </div>
  );
};

export default App;
