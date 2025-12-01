'use client';
// import { X, FileText, ImageIcon } from 'lucide-react';

export default function ResumeUpload() {
  return (
    <div className="">
      <h2 className="text-xl font-semibold">Resume</h2>

      {/* Uploaded File Display */}
      <div className="bg-white border rounded-lg p-4 flex flex-col space-y-4 relative">
        <div className="flex items-center space-x-3">
          {/* <FileText className="text-red-500 w-6 h-6" /> */}
          <span className="text-sm font-medium text-blue-600 cursor-pointer">smitaagarwal.pdf</span>
          <span className="text-sm text-gray-500">1.5 MB</span>
        </div>

        <p className="text-xs text-gray-400">Last update on 23th July 23</p>

        {/* Image Preview Placeholder */}
        <div className="border rounded-md bg-gray-50 flex items-center justify-center h-32">
          <div className="text-gray-400 flex flex-col items-center">
            {/* <ImageIcon className="h-6 w-6 mb-1" /> */}
            <span className="text-sm">Image preview</span>
          </div>
        </div>

        {/* Close Icon */}
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          {/* <X className="h-5 w-5" /> */}
        </button>
      </div>

      
    </div>
  );
}
