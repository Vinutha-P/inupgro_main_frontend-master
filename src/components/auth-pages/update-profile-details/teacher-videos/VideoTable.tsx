import React, { useEffect, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import DeleteVideo from "./DeleteVideo";
import { useRouter, useSearchParams } from "next/navigation";

interface VideoData {
    id: string;
    title: string;
    description: string;
    classes: string[];
    subject: string;
    chapter: string;
    thumbnail: string | null;
    date: string;
    status: "Verify pending" | "Saved as draft" | "Verified";
    views?: number;
}

interface VideoTableProps {
    onDataLoaded?: (videoList: VideoData[]) => void;
    newVideo?: VideoData | null;
}

const VideoTable: React.FC<VideoTableProps> = ({ onDataLoaded, newVideo }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [openDropdownFor, setOpenDropdownFor] = useState<string | null>(null);
    const [videoList, setVideoList] = useState<VideoData[]>([
        {
            id: "1",
            title: "Reflection of Light",
            description: "The reflection of time is a concept that involves looking back and considering...",
            classes: ["9th", "10th"],
            subject: "Physics",
            chapter: "8",
            thumbnail: null,
            date: "2023-05-15",
            status: "Verify pending",
            views: 0
        },
        {
            id: "2",
            title: "Chemical Reactions",
            description: "Chemical reactions are processes where substances (reactants)...",
            classes: ["9th", "10th"],
            subject: "Chemistry",
            chapter: "3",
            thumbnail: null,
            date: "2023-05-15",
            status: "Verified",
            views: 0
        },
        {
            id: "3",
            title: "Algebra Basics",
            description: "Introduction to algebraic expressions and equations...",
            classes: ["8th", "9th"],
            subject: "Mathematics",
            chapter: "2",
            thumbnail: null,
            date: "2023-05-18",
            status: "Saved as draft",
            views: 42
        },
        {
            id: "4",
            title: "Mathematics Basics",
            description: "Introduction to algebraic expressions and equations...",
            classes: ["8th", "9th"],
            subject: "Mathematics",
            chapter: "2",
            thumbnail: null,
            date: "2023-05-18",
            status: "Saved as draft",
            views: 42
        }
    ]);

    useEffect(() => {
        if (newVideo) {
            setVideoList(prev => [newVideo, ...prev]);
        }
    }, [newVideo]);

    useEffect(() => {
        if (onDataLoaded) {
            onDataLoaded(videoList);
        }
    }, [videoList, onDataLoaded]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        return `${day}/${month}/${year}`;
    };

    const getStatusContent = (status: VideoData["status"]) => {
        switch (status) {
            case "Verify pending":
                return status;
            case "Saved as draft":
                return status;
            case "Verified":
                return (
                    <span className="flex items-center gap-1">
                        <FaRegCheckCircle className="text-[0.7rem] inline" />
                        {status}
                    </span>
                );
            default:
                return status;
        }
    };

    const getStatusStyle = (status: VideoData["status"]) => {
        switch (status) {
            case "Verify pending":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "Saved as draft":
                return "bg-purple-100 text-purple-800 border-purple-400";
            case "Verified":
                return "bg-[#cafce5] text-success border-success";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-xs text-gray-700">
                {/* Header */}
                <thead>
                    <tr className="text-base text-gray-500 font-medium ">
                        <th className="font-medium w-1/2 px-0 py-2 text-left">Video</th>
                        <th className="font-medium px-4 py-2">Class</th>
                        <th className="font-medium px-4 py-2">Subject</th>
                        <th className="font-medium px-4 py-2">Chapter</th>
                        <th className="font-medium px-4 py-2">View</th>
                        <th className="font-medium px-4 py-2">Date</th>
                        <th className="font-medium px-4 py-2">Status</th>
                        <th className="font-medium px-4 py-2" />
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {videoList.length > 0 ? (
                        videoList.map((video) => (
                            <tr key={video.id} className="bg-white">
                                <td
                                    className="px-0 py-3 flex items-center space-x-3 cursor-pointer"
                                    onClick={() => router.push(
                                        `/teacher/videos/${video.id}?title=${encodeURIComponent(video.title)}&description=${encodeURIComponent(video.description)}`
                                    )}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            router.push(`/teacher/videos/${video.id}`);
                                        }
                                    }}
                                >
                                    <div
                                        className="relative w-24 h-16 bg-blue-400 rounded overflow-hidden flex items-center justify-center text-white text-[10px] font-bold"
                                        style={video.thumbnail ? {
                                            backgroundImage: `url(${video.thumbnail})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        } : {}}
                                    >
                                        {!video.thumbnail && (
                                            <span className="absolute bottom-1 left-1 bg-midnight bg-opacity-70 text-white text-[0.6rem] px-2 py-0.5 rounded-xl">
                                                1:30
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="text-[0.6rem] font-semibold text-gray-900">
                                            {video.title}
                                        </div>
                                        <div className="text-[0.6rem] text-gray-500 w-[200px] line-clamp-2">
                                            {video.description}
                                        </div>
                                        <button
                                            type="button"
                                            className="text-[0.6rem] text-blue-600 font-semibold mt-1 hover:underline w-fit"
                                        >
                                            Read More
                                        </button>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-[0.6rem]">
                                    {video.classes.map((cls, index) => (
                                        <div key={index}>{cls}</div>
                                    ))}
                                </td>
                                <td className="px-4 py-3 text-[0.6rem]">{video.subject}</td>
                                <td className="px-4 py-3 text-center text-[0.6rem]">{video.chapter}</td>
                                <td className="px-4 py-3 text-center text-[0.6rem]">{video.views || "-"}</td>
                                <td className="px-4 py-3 text-center text-[0.6rem]">
                                    {video.status === "Verified" ? formatDate(video.date) : "-"}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <span className={`${getStatusStyle(video.status)} text-[0.6rem] px-2 py-[2px] rounded-full border whitespace-nowrap inline-flex items-center`}>
                                        {getStatusContent(video.status)}
                                    </span>
                                </td>

                                <td className="px-2 text-center">
                                    <DeleteVideo
                                        videoId={video.id}
                                        videoTitle={video.title}
                                        videoStatus={video.status}
                                        onDelete={(id) => {
                                            setVideoList((prev) => prev.filter((v) => v.id !== id));
                                            setOpenDropdownFor(null);
                                        }}
                                        isOpen={openDropdownFor === video.id}
                                        onToggle={() => {
                                            setOpenDropdownFor(openDropdownFor === video.id ? null : video.id);
                                        }}
                                    />
                                </td>

                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8} className="text-center text-xs text-gray-500 " />
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default VideoTable;