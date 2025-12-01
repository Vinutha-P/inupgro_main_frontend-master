import type React from "react";
import { IoClose, IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { HiPlusCircle } from "react-icons/hi2";
import MultiSelectField from "./MultiSelectField";
import CreatePlaylist from "./CreatePlaylist";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";
import VideoWithThumbnail from "./VideoWithThumbnail";
import SuccessfulVideoUpload from "./SuccessfulVideoUpload";

interface VideoUploadingDetailsProps {
  file: File;
  onClose: () => void;
  progress: number;
  uploaded: boolean;
  handleDelete: () => void;
}

interface PlaylistData {
  playlistName: string;
  selectedClass: string[];
  selectedSubject: string;
  selectedChapter: string;
}

const VideoUploadingDetails: React.FC<VideoUploadingDetailsProps> = ({
  file,
  onClose,
  progress,
  uploaded,
}) => {
  const [customThumbnail, setCustomThumbnail] = useState<string | null>(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [playlistData, setPlaylistData] = useState<PlaylistData | null>(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [chapter, setChapter] = useState("");
  const [description, setDescription] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

  const handlePost = () => {
    if (isFormValid()) {
      setShowSuccessModal(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  const handleThumbnailUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setCustomThumbnail(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const isFormValid = () => {
    const requiredFieldsFilled =
      videoTitle.trim() !== "" &&
      subject !== "" &&
      chapter !== "" &&
      description.trim() !== "" &&
      (playlistData?.selectedClass?.length || 0) > 0;

    return requiredFieldsFilled;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[2147483640]">
      <div className="bg-white rounded-2xl w-[70%] max-w-5xl px-10 py-6 relative shadow-xl">
        <div className="grid grid-cols-3 items-center border-b border-[#EBEBEB] pb-4">
          <div />
          <h2 className="text-3xl font-semibold text-[#1C315E] text-center pt-8">
            Upload Video
          </h2>
          <div className="flex justify-end">
            <button onClick={onClose} type="button">
              <IoClose className="text-3xl text-gray-500 hover:text-black" />
            </button>
          </div>
        </div>

        <div className="mt-7">
          <h4 className="text-2xl">Video Info</h4>

          <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <VideoWithThumbnail
                file={file}
                progress={progress}
                uploaded={uploaded}
                onThumbnailUpload={handleThumbnailUpload}
              />
            </div>
            <div className="col-span-2 space-y-5 text-sm text-gray-700">
              <div className="grid grid-cols-2 gap-5">
                <InputField
                  label="Video title (Topic)"
                  type="text"
                  placeholder="Enter title of the video"
                  required
                  onChange={(e) => setVideoTitle(e.target.value)}
                />
                <SelectField
                  label="Subject"
                  options={["Math", "Science", "English"]}
                  required
                  onChange={(e) => setSubject(e.target.value)}
                />
                <SelectField
                  label="Chapter Name"
                  options={["Chapter 1", "Chapter 2", "Chapter 3"]}
                  required
                  onChange={(e) => setChapter(e.target.value)}
                />
                <MultiSelectField
                  label="Class"
                  options={["7th", "8th", "9h", "10th", "11th"]}
                  required
                  value={selectedClasses}
                  onChange={setSelectedClasses}
                />
              </div>
              <div className="relative">
                <label className="block font-medium mb-1 text-[0.75rem]">
                  Description
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-[15px] placeholder:font-light placeholder:text-[#667085] outline-none resize-none"
                  placeholder="Add video description"
                  rows={1}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <p className="absolute bottom-4 right-3 text-xs text-[#6C737F] pointer-events-none">
                  Minimum 200 words
                </p>
              </div>

              {playlistData ? (
                <div>
                  <h4 className="text-xs font-medium text-[#374151] pb-1.5">Playlist</h4>
                  <div className="border border-gray-300 rounded-full flex items-center justify-between  p-3">
                    <span className="text-sm">
                      {playlistData.selectedClass}/
                      {playlistData.selectedSubject}/{" "}
                      {playlistData.selectedChapter}/{playlistData.playlistName}
                    </span>
                    <button
                      onClick={() => setPlaylistData(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <IoCloseSharp />
                    </button>
                  </div>
                </div>
              ) : (
                <p
                  className="text-[15px] text-blue-500 cursor-pointer font-semibold flex items-center gap-1"
                  onClick={() => setShowPlaylistModal(true)}
                >
                  <span className="">
                    <HiPlusCircle className="text-xl" />
                  </span>{" "}
                  Add to playlist
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-7">
          <div className="text-[15px] text-[#667085] flex items-center space-x-1">
            <span>
              <BsInfoCircle />
            </span>
            <span className="pl-1">Fill all fields that have asterisk</span>
          </div>
          <div className="space-x-4">
            <button className=" text-sm px-4  py-2.5 rounded-md text-gray-700 border border-[#B9C0D4] hover:bg-gray-100 transition">
              Save as Draft
            </button>
            <button
              type="button"
              className={` text-[15px] font-semibold tracking-wide  px-9 py-2.5 rounded-md transition ${
                isFormValid()
                  ? "bg-[#2563eb] text-white hover:bg-blue-700"
                  : "bg-[#B9C0D4] text-[#5D6B98] cursor-not-allowed"
              }`}
              disabled={!isFormValid()}
              onClick={handlePost}
            >
              Post
            </button>
          </div>
        </div>
      </div>
      {showPlaylistModal && (
        <CreatePlaylist
          isOpen={showPlaylistModal}
          initialSelectedClass={selectedClasses}
          onClose={() => setShowPlaylistModal(false)}
          onCreate={(data) => {
            setPlaylistData(data);
            setShowPlaylistModal(false);
          }}
        />
      )}

      {showSuccessModal && (
        <SuccessfulVideoUpload
          show={showSuccessModal}
          onClose={() => {
            setShowSuccessModal(false);
            onClose();
          }}
        />
      )}
    </div>
  );
};

export default VideoUploadingDetails;
