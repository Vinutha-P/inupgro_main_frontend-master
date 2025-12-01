"use client";
import type React from "react";
import { useRef, useState } from "react";
import UpdateTabs from "../UpdateTab";
import VideoUploadingDetails from "./VideoUploadingDetails";
import VideoTable from "./VideoTable";

interface UploadVideoModalProps {
  onClose: () => void;
  onVideoSelected: (file: File) => void;
}

const UploadVideoModal: React.FC<UploadVideoModalProps> = ({
  onClose,
  onVideoSelected,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSelectFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected?.type?.startsWith("video/")) {
      onVideoSelected(selected);
      onClose();
    } else {
      alert("Please select a valid video file.");
    }
  };

  return (
    <div className="fixed inset-0 z-[2147483640] bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-12 rounded-xl shadow-lg w-full max-w-xl text-center relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-5 text-gray-500 text-2xl"
          aria-label="Close uploa-*d modal"
        >
          &times;
        </button>

        <div className="flex justify-center mb-7">
          <div className="w-[120px] h-[120px] rounded-full bg-blue-100 flex items-center justify-center">
            <img
              src="/backup-image.png"
              alt="Logo"
              className="w-12 h-12 object-contain"
            />
          </div>
        </div>

        <h2 className="text-[28px] font-semibold mb-3">
          Drag and drop video to upload
        </h2>
        <p className="text-lg text-deepBlue mb-4 leading-tight">
          Your video will be uploaded to your profile once it is verified by our
          experts.
        </p>

        <div className="flex justify-center gap-4 text-xs mt-8">
          <button
            type="button"
            onClick={handleSelectFileClick}
            className="max-w-[250px] w-full px-6 py-2.5 text-lg flex justify-center rounded-[8px] bg-[#2E90FA] text-white hover:bg-blue-700 transition-all duration-200"
          >
            Select file
          </button>

          <input
            type="file"
            accept="video/mp4"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {selectedFile && (
          <p className="text-xs text-green-600 mt-2">
            Selected: {selectedFile.name}
          </p>
        )}

        <p className="text-base text-gray-500 mt-4">File format MP4, Videos</p>
      </div>
    </div>
  );
};

const VideoUploadSection = () => {
  const [activeTab, setActiveTab] = useState("Latest");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isUploadingDetailsOpen, setIsUploadingDetailsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [hasVideos, setHasVideos] = useState(false);

  const handleDelete = () => {
    setSelectedVideo(null);
    setProgress(0);
    setUploaded(false);
    setIsUploadingDetailsOpen(false);
  };

  const handleVideoSelected = (file: File) => {
    setSelectedVideo(file);
    setProgress(0);
    setUploaded(false);
    setIsUploadingDetailsOpen(true);

    const simulateUpload = () => {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        if (currentProgress >= 100) {
          clearInterval(interval);
          setProgress(100);
          setUploaded(true);
        } else {
          setProgress(currentProgress);
        }
      }, 300);
    };

    simulateUpload();
  };

  return (
    <>
      <div className="bg-white p-10 rounded-lg shadow">
        <UpdateTabs onTabChange={(tab) => setActiveTab(tab)} />
        <VideoTable
          onDataLoaded={(videoList: { id: string }[]) => {
            setHasVideos(videoList.length > 0);
          }}
        />
        {!hasVideos && (
          <>
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <img
                src="/video-upload.png"
                alt="Upload Prompt"
                className="w-80 h-80 object-contain my-6"
              />
              <p className="text-[#667085] max-w-xl mb-6 text-base leading-tight">
                You haven't shared a video yet. Begin now, and let your first
                video ignite a new chapter in your journey to greatness.
              </p>
            </div>
            <div className="flex justify-center mt-6">
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-16 py-3 rounded-md text-base font-medium transition duration-200"
              >
                Upload Video
              </button>
            </div>
          </>
        )}
      </div>

      {isUploadModalOpen && (
        <UploadVideoModal
          onClose={() => setIsUploadModalOpen(false)}
          onVideoSelected={handleVideoSelected}
        />
      )}

      {isUploadingDetailsOpen && selectedVideo && (
        <VideoUploadingDetails
          file={selectedVideo}
          onClose={() => setIsUploadingDetailsOpen(false)}
          progress={progress}
          uploaded={uploaded}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};

export default VideoUploadSection;
