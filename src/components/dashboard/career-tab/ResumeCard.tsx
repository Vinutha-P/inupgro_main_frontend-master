'use client';

import { FaFilePdf } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';
import Image from 'next/image';

export default function ResumeCard() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Resume</h2>
      <div className="flex items-center justify-between bg-white border border-gray-300 p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-4">
          {/* <FaFilePdf className="w-5 h-5 text-red-500" /> */}

          {/* ✅ Displaying the image instead of plain text */}
          <Image
            src="/pdf.png"          // Make sure this file exists in your public/ folder
            alt="PDF Icon"
            width={24}
            height={24}
          />

          <div className="flex gap-5">
            <p className="font-medium text-gray-800">smitaagarwal.pdf</p>
            <p className="text-sm text-gray-500">1.5 MB</p>
          </div>
        </div>

        <a href="/smitaagarwal.pdf" download className="text-gray-700 hover:text-black">
          <FiDownload className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
