"use client";
import React, { useState } from "react";
import Image from "next/image";

const footerLinks = {
  about: [
    { name: "About Us", link: "/about-us" },
    { name: "Leadership Team", link: "/leadership" },
    { name: "Careers", link: "/careers" },
    { name: "Press", link: "/press" },
  ],
  explore: [
    { name: "For Students", link: "/students" },
    { name: "For Teachers", link: "/teachers" },
    { name: "For Institutions", link: "/institutions" },
    { name: "Blog / Resources", link: "/blog" },
  ],
  features: [
    { name: "Smart Application Sync", link: "/features/smart-sync" },
    { name: "Flipbooks with Embedded Videos", link: "/features/flipbooks" },
    { name: "Teacher Analytics Dashboard", link: "/features/analytics" },
    { name: "Automated School Dashboard", link: "/features/dashboard" },
    { name: "Unified Student Profile", link: "/features/profile" },
    { name: "Job & News Publishing", link: "/features/jobs" },
    { name: "Skill-Based Search Filters", link: "/features/search" },
    { name: "Multilingual Experience", link: "/features/multilingual" },
  ],
  support: [
    { name: "Help Center", link: "/help" },
    { name: "Contact Us", link: "/contact" },
    { name: "Community", link: "/community" },
    { name: "FAQs", link: "/faqs" },
  ],
  legal: [
    { name: "Terms of Use", link: "/terms" },
    { name: "Privacy Policy", link: "/privacy" },
    { name: "Accessibility", link: "/accessibility" },
    { name: "Cookie Preferences", link: "/cookies" },
  ],
};

const socialMediaIcons = [
  {
    name: "Facebook",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M18 10a8 8 0 10-9.25 7.9v-5.59H6.5V10h2.25V8.25c0-2.22 1.32-3.45 3.35-3.45.97 0 1.98.17 1.98.17v2.18h-1.11c-1.1 0-1.44.68-1.44 1.38V10h2.45l-.39 2.31h-2.06v5.59A8.002 8.002 0 0018 10z" />
      </svg>
    ),
  },
  {
    name: "Google",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.2 8.4c1.1 0 2.1.4 2.9 1.1l2.2-2.2C13.8 6.2 12.1 5.5 10.2 5.5c-2.8 0-5.2 1.9-6.1 4.5l2.5 1.9c.7-2.1 2.6-3.5 4.6-3.5z" />
        <path d="M4.1 10c0-.7.1-1.4.3-2l-2.5-1.9C1.4 7.3 1 8.6 1 10s.4 2.7 1 3.9l2.5-1.9c-.2-.6-.3-1.3-.3-2z" />
        <path d="M10.2 14.5c-2 0-3.9-1.4-4.6-3.5l-2.5 1.9c.9 2.6 3.3 4.5 6.1 4.5 1.9 0 3.6-.7 4.9-1.8l-2.2-2.2c-.8.7-1.8 1.1-2.7 1.1z" />
        <path d="M19 8.5h-1.8v-1.8h-1.8v1.8H13.6v1.8h1.8v1.8h1.8v-1.8H19V8.5z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2.16c2.67 0 2.99.01 4.04.06 1.01.05 1.56.23 1.92.38.47.2.81.44 1.16.79.35.35.59.69.79 1.16.15.36.33.91.38 1.92.05 1.05.06 1.37.06 4.04s-.01 2.99-.06 4.04c-.05 1.01-.23 1.56-.38 1.92-.2.47-.44.81-.79 1.16-.35.35-.69.59-1.16.79-.36.15-.91.33-1.92.38-1.05.05-1.37.06-4.04.06s-2.99-.01-4.04-.06c-1.01-.05-1.56-.23-1.92-.38-.47-.2-.81-.44-1.16-.79-.35-.35-.59-.69-.79-1.16-.15-.36-.33-.91-.38-1.92-.05-1.05-.06-1.37-.06-4.04s.01-2.99.06-4.04c.05-1.01.23-1.56.38-1.92.2-.47.44-.81.79-1.16.35-.35.69-.59 1.16-.79.36-.15.91-.33 1.92-.38 1.05-.05 1.37-.06 4.04-.06zm0-1.8c-2.7 0-3.03.01-4.09.06-1.12.05-1.93.25-2.62.54-.71.3-1.32.7-1.93 1.31S.9 3.47.6 4.18c-.29.69-.49 1.5-.54 2.62C.01 7.97 0 8.3 0 11s.01 3.03.06 4.09c.05 1.12.25 1.93.54 2.62.3.71.7 1.32 1.31 1.93s1.22 1.01 1.93 1.31c.69.29 1.5.49 2.62.54 1.06.05 1.39.06 4.09.06s3.03-.01 4.09-.06c1.12-.05 1.93-.25 2.62-.54.71-.3 1.32-.7 1.93-1.31s1.01-1.22 1.31-1.93c.29-.69.49-1.5.54-2.62.05-1.06.06-1.39.06-4.09s-.01-3.03-.06-4.09c-.05-1.12-.25-1.93-.54-2.62-.3-.71-.7-1.32-1.31-1.93S16.53.89 15.82.6c-.69-.29-1.5-.49-2.62-.54C12.03.01 11.7 0 9 0zm0 4.86a4.14 4.14 0 100 8.28 4.14 4.14 0 000-8.28zm0 6.81a2.67 2.67 0 110-5.34 2.67 2.67 0 010 5.34zm4.95-7.24a.97.97 0 10-1.94 0 .97.97 0 001.94 0z" />
      </svg>
    ),
  },
  {
    name: "Telegram",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.13-.31-1.09-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M19.58 5.19a2.5 2.5 0 00-1.76-1.77C16.25 3 10 3 10 3s-6.25 0-7.82.42A2.5 2.5 0 00.42 5.19C0 6.75 0 10 0 10s0 3.25.42 4.81a2.5 2.5 0 001.76 1.77C3.75 17 10 17 10 17s6.25 0 7.82-.42a2.5 2.5 0 001.76-1.77C20 13.25 20 10 20 10s0-3.25-.42-4.81zM8 13V7l5.5 3L8 13z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 0C4.48 0 0 4.48 0 10c0 1.77.46 3.43 1.27 4.87L0 20l5.33-1.25C6.7 19.62 8.3 20 10 20c5.52 0 10-4.48 10-10S15.52 0 10 0zm5.64 13.43c-.25.7-1.24 1.28-1.7 1.45-.46.17-.8.14-1.11-.09-.14-.09-.33-.25-.63-.49-1.16-1.03-1.91-1.61-2.66-2.8-.35-.5-.62-1.11-.69-1.62-.07-.52.02-.8.15-1.08.13-.28.18-.48.27-.8.09-.32.05-.6-.02-.84-.07-.24-.6-1.45-.82-1.98-.22-.53-.44-.46-.6-.47-.15-.01-.33-.02-.5-.02s-.46.07-.7.33c-.25.27-.97.95-.97 2.32 0 1.36 1 2.7 1.14 2.88.14.19 2.01 3.06 4.87 4.29.69.29 1.23.46 1.65.59.7.22 1.34.19 1.84.11.55-.09 1.69-.69 1.93-1.36.24-.67.24-1.24.17-1.36-.07-.12-.25-.2-.52-.35z" />
      </svg>
    ),
  },
];

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white py-12">
      <div className="container mx-auto px-12">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-12 md:mb-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <img
              src="/Logo_Header.png"
              alt="logo"
              className=" object-contain"
            />
          </div>

          {/* Sign Up Section */}
          <div className="flex-shrink-0 max-w-md">
            <h3 className="text-xl md:text-2xl font-bold text-black mb-4">
              Sign Up Today.
            </h3>
            <form onSubmit={handleSubmit} className="mb-3">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-2 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition-colors duration-300 flex items-center gap-2"
                >
                  Get Started
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="text-white"
                  >
                    <path
                      d="M7 5L12 10L7 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </form>
            <p className="text-sm text-gray-500">
              By proceeding you agree to our{" "}
              <a
                href="/terms"
                className="text-gray-700 hover:text-blue-600 underline"
              >
                Platform Terms & Privacy Notice
              </a>
              .
            </p>
          </div>
        </div>

        {/* Mid Section */}
        <div className="flex flex-col lg:flex-row gap-12 md:gap-16 mb-12">
          {/* Left Side - Social Media & App Links */}
          <div className="flex-shrink-0">
            {/* Social Media Icons */}
            <div className="flex gap-4 mb-6">
              {socialMediaIcons.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-300 text-gray-700 hover:text-blue-600"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* App Download Buttons */}
            <div className="flex flex-row items-center justify-center gap-3">
              <button className="flex items-center gap-3 bg-black hover:bg-gray-800 text-white px-4 py-3 rounded-lg transition-colors duration-300">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c1.28-2.34 3.55-3.82 6.05-3.86 1.3.03 2.53.48 3.49 1.01 1.05.58 1.98.5 3.05.5 1.08 0 1.78.03 2.73-.39 1.19-.42 2.15-.13 2.95.99-.91.88-2.37 1.48-3.8 1.48-.99 0-1.52-.3-2.6-.3-1.08 0-1.7.3-2.7.3-1.45.01-2.95-.65-3.9-1.58zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <span className="text-sm font-medium">
                  Download on the
                  <br /> App Store
                </span>
              </button>
              <button className="flex items-center gap-3 bg-black hover:bg-gray-800 text-white px-4 py-3 rounded-lg transition-colors duration-300">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm-4.81-4.81L6.05 2.66l10.76 6.65-3.81 3.81zM17.8 12l3.95-3.95c.59-.59.59-1.54 0-2.13L17.05.64c-.26-.26-.61-.38-.96-.38-.36 0-.71.12-.97.38L12 3.8 17.8 12z" />
                </svg>
                <span className="text-sm font-medium">
                  GET IT ON
                  <br /> Google Play
                </span>
              </button>
            </div>
          </div>

          {/* Right Side - Link Columns */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12">
            {/* About Inupgro */}
            <div>
              <h4 className="font-bold text-black mb-4 text-sm md:text-base">
                About Inupgro
              </h4>
              <ul className="space-y-3">
                {footerLinks.about.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.link}
                      className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Explore */}
            <div>
              <h4 className="font-bold text-black mb-4 text-sm md:text-base">
                Explore
              </h4>
              <ul className="space-y-3">
                {footerLinks.explore.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.link}
                      className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Features */}
            <div className="col-span-2">
              <h4 className="font-bold text-black mb-4 text-sm md:text-base">
                Features
              </h4>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {/* First 4 features */}
                <ul className="space-y-3">
                  {footerLinks.features.slice(0, 4).map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.link}
                        className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-300"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
                {/* Last 4 features starting from Unified Student Profile */}
                <ul className="space-y-3">
                  {footerLinks.features.slice(4).map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.link}
                        className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-300"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold text-black mb-4 text-sm md:text-base">
                Support
              </h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.link}
                      className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold text-black mb-4 text-sm md:text-base">
                Legal
              </h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.link}
                      className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-gray-600 text-sm">
              <p>Copyleft © {currentYear}</p>
              <p className="mt-1">
                Built with purpose, passion, and way too much coffee.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
