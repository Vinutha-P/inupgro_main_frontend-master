"use client";
import React, { Suspense } from 'react';
import { store } from '@/lib/store';
import { Provider } from 'react-redux';
import TermsAndConditions, { TermSection } from '@/components/pages/Trems-Conditions';

const sampleData: TermSection[] = [
  {
    title: "Introduction: ",
    type: "paragraphs",
    content: [
      "Welcome to Inupgro.com, a Jaipur-based EdTech startup dedicated to revolutionizing education across India. Our innovative platform integrates students, teachers, and educational institutions, ensuring access to high-quality education while bridging the educational divide between Tier 1 to Tier 5 cities. By covering both government and private schools, we aim to create an inclusive learning ecosystem that fosters academic excellence, skill development, and future career success.",
      "We recognize the importance of your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and secure your data while ensuring compliance with the highest industry standards. By using our platform, you acknowledge and agree to the terms set forth in this policy. If you do not agree, we advise you to discontinue the use of our services.",
      "By accessing or using our services, you agree to the terms outlined in this Privacy Policy. If you do not agree, please refrain from using our platform."
    ]
  },
  {
    title: "Information We Collect: ",
    type: "list",
    content: [
      "Full Name",
      "Email Address",
      "Phone Number",
      "Date of Birth",
      "Gender",
      "Address",
      "Educational Background",
      "School/Institution Details",
      "IP Address",
      "Browser Type",
      "Device Information",
      "Log Data",
      "Usage Statistics",
      "Payment details including transaction history (processed via third-party processors)",
      "Data from third-party sources such as schools, teachers, and public records"
    ]
  },
  {
    title: "Use of Your Personal Data",
    type: "list",
    content: [
      "To provide and maintain our Service",
      "To manage Your Account",
      "For the performance of a contract",
      "To contact You regarding updates, features, or support",
      "To provide You with news and offers unless you opt out",
      "To manage Your requests to Us",
      "To analyze data and improve services and user experience",
      "To share with business partners or in case of business transfer (with consent or legal basis)",
      "To share with other users in public interactions",
      "With your explicit consent for specific purposes"
    ]
  },
  {
    title: "How We Share Your Information",
    type: "list",
    content: [
      "With educational institutions and teachers for academic support",
      "With service providers for hosting, payments, analytics, etc.",
      "For legal compliance and security enforcement",
      "In case of transfer due to mergers, acquisitions, or restructuring"
    ]
  },
  {
    title: "Data Security & Protection",
    type: "list",
    content: [
      "Industry-standard security practices implemented",
      "Use of encryption technologies and multi-layer security",
      "Regular security audits and firewall protections",
      "Support for Two-Factor Authentication (2FA)",
      "Immediate reporting encouraged for any unauthorized activity"
    ]
  },
  {
    title: "Data Retention",
    type: "list",
    content: [
      "Data retained as long as necessary to provide services",
      "Deletion of user data upon request, except for legal obligations",
      "Anonymization for research and statistical use",
      "Secure disposal of data when no longer needed",
      "Extended storage for compliance with regulations"
    ]
  },
  {
    title: "Your Rights & Choices",
    type: "list",
    content: [
      "Access, update, or correct your personal data",
      "Request deletion of your data and account",
      "Opt-out of marketing communications",
      "Restrict or object to data processing",
      "Request data portability",
      "Request explanation of automated decisions"
    ]
  },
  {
    title: "Third Party Websites and Links",
    type: "list",
    content: [
      "May include links to third-party platforms not under our control",
      "Users should review third-party privacy and security policies",
      "We are not responsible for the content or security of external platforms",
      "Information shared on public forums may be visible to others"
    ]
  },
  {
    title: "Children's Data",
    type: "list",
    content: [
      "We do not knowingly collect data from children",
      "Parents/guardians can request deletion of child data",
      "We do not share or sell children's data under 16",
      "Parental supervision of online activities is recommended"
    ]
  },
  {
    title: "Changes to This Privacy Policy",
    type: "list",
    content: [
      "Policy may be updated periodically",
      "Users will be notified of significant changes via email or in-app",
      "Continued use after updates implies acceptance",
      "Regular review is encouraged for staying informed"
    ]
  },
  {
    title: "Eligibility",
    type: "list",
    content: [
      "Users must be 18+ or have guardian consent",
      "Institutions must ensure regulatory compliance",
      "Users under 13 need explicit parental approval",
      "Users must provide accurate personal info and avoid misrepresentation",
      "Inupgro may verify accounts for authenticity"
    ]
  },
  {
    title: "User Accounts",
    type: "list",
    content: [
      "Users must maintain account confidentiality and notify Inupgro of unauthorized access",
      "Multiple fraudulent accounts or identity impersonation is prohibited",
      "Inactive accounts may be deleted",
      "Two-factor authentication is encouraged"
    ]
  },
  {
    title: "Use of Services",
    type: "list",
    content: [
      "License granted for educational use only",
      "Illegal, malicious, or harmful activity is prohibited",
      "No content copying, spam, or disruption of platform operations",
      "Users must maintain the platform's integrity"
    ]
  },
  {
    title: "Content Ownership and Usage",
    type: "list",
    content: [
      "Users retain ownership of uploaded content but grant Inupgro a license to use it",
      "Unauthorized copying or plagiarism will lead to penalties",
      "Inupgro may remove non-compliant or illegal content",
      "Data may be used in anonymized, aggregated form for R&D"
    ]
  },
  {
    title: "Acknowledgment",
    type: "paragraphs",
    content: [
      "By using Inupgro.com, you agree to be bound by these terms.",
      "Users must be 18+ and read the Privacy Policy carefully before using our service."
    ]
  },
  {
    title: "Changes to These Terms",
    type: "list",
    content: [
      "Terms may be updated at our discretion",
      "Material changes will have at least 30 days' notice",
      "Continued use of the platform means acceptance of new terms"
    ]
  },
  {
    title: "Payment and Subscription",
    type: "list",
    content: [
      "Users can choose free or paid plans",
      "Subscriptions renew automatically unless canceled",
      "Inupgro can modify pricing and plans with prior notice",
      "Refunds follow our official policy"
    ]
  },
  {
    title: "Privacy and Data Protection",
    type: "list",
    content: [
      "User data is protected and used for educational and operational purposes",
      "Inupgro doesn't sell data but may share with trusted partners",
      "Users can control and request deletion of their personal info"
    ]
  },
  {
    title: "Termination and Suspension",
    type: "list",
    content: [
      "Inupgro can suspend accounts for violations or fraud",
      "Users can request account termination",
      "No refunds after termination unless stated otherwise"
    ]
  },
  {
    title: "Limitation of Liability",
    type: "list",
    content: [
      "Inupgro is not liable for indirect damages or service disruptions",
      "Users are responsible for reliance on educational material"
    ]
  },
  {
    title: "Indemnification",
    type: "list",
    content: [
      "Users agree to indemnify Inupgro for misuse or violations",
      "Institutions must follow local education laws when using Inupgro"
    ]
  },
  {
    title: "Governing Law and Dispute Resolution",
    type: "paragraphs",
    content: [
      "These terms are governed by Indian law. Disputes will be resolved via arbitration in mmm, India."
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
      "By using Inupgro.com, you acknowledge that you have read and understood this Privacy Policy and agree to the collection and use of your information as described."
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
            heading="i8Privacy policy of INUPGRO -"
            termsData={sampleData}
            cta={cta}
          />
        </Provider>
      </Suspense>
    </div>
  );
};

export default App;
