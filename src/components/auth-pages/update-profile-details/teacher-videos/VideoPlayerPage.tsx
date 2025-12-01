'use client';

import { useParams, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import SuggestedVideos from './SuggestedVideos';
import { GoDotFill } from 'react-icons/go';
import { PiShareFatBold } from 'react-icons/pi';
import { FaCog, FaExpand, FaForward, FaPlay, FaVolumeUp } from 'react-icons/fa';
import VideoAnalytics from './VideoAnalytics';

export default function VideoPlayerPage() {
    const params = useParams();
    const videoId = typeof params.id === 'string' ? params.id : '';
    const searchParams = useSearchParams();
    const title = searchParams.get('title');
    const description = searchParams.get('description');

    const [selectedTab, setSelectedTab] = useState<'overview' | 'analytics'>('overview');

    return (
        <><p>Profile / Video/ <span className='font-bold'>{title}</span></p>
            <div className="flex flex-col lg:flex-row gap-6 w-full">
                <div className="w-full lg:flex-[0.65] flex flex-col">
                    <div className="bg-[#4c68ff] rounded-xl mb-4 relative flex flex-col justify-between h-[420px]">
                        <div className="text-white flex items-center justify-center h-full text-xl font-semibold">
                            Video Player
                        </div>
                        <hr className="border-t border-blue-300" />
                        <div className="flex items-center justify-between px-4 py-2 text-white text-sm">
                            <div className="flex items-center gap-4">
                                <FaPlay className="cursor-pointer" />
                                <FaForward className="cursor-pointer" />
                                <FaVolumeUp className="cursor-pointer" />
                                <span>00:00 / 05:32</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <FaCog className="cursor-pointer" />
                                <FaExpand className="cursor-pointer" />
                            </div>
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold mb-1">{title}</h2>
                    <div className="flex justify-between items-center text-xs text-gray-600 mt-2 mb-4 flex-wrap gap-2">
                        <div className="flex items-center flex-wrap gap-1">
                            <span className="font-medium">By Smita</span>
                            <GoDotFill size={10} color="#b2b2b3" />
                            <span>Physics</span>
                            <GoDotFill size={10} color="#b2b2b3" />
                            <span>Class: 10th</span>
                            <GoDotFill size={10} color="#b2b2b3" />
                            <span>Chapter: 8</span>
                        </div>

                        <div className="flex items-center flex-wrap gap-1 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                                <PiShareFatBold /> Share
                            </span>
                            <GoDotFill size={10} color="#b2b2b3" />
                            <span>443K views</span>
                            <GoDotFill size={10} color="#b2b2b3" />
                            <span>22 hours ago</span>
                        </div>
                    </div>

                    <div className="flex gap-2 mb-4">
                        <button
                            onClick={() => setSelectedTab('overview')}
                            className={`px-3 py-1 rounded-md font-medium ${selectedTab === 'overview'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-white text-gray-400 border border-gray-200'
                                }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setSelectedTab('analytics')}
                            className={`px-3 py-1 rounded-md font-medium ${selectedTab === 'analytics'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-white text-gray-400 border border-gray-200'
                                }`}
                        >
                            Video Analytics
                        </button>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow text-sm text-gray-700 leading-relaxed flex-grow">
                        {selectedTab === 'overview' ? (
                            <>
                                <h3 className="font-semibold mb-2 text-base">Description</h3>
                                <p>{description}</p>
                            </>
                        ) : (
                            <VideoAnalytics videoId={videoId || 'default-video-id'} />
                        )}
                    </div>
                </div>

                <div className="w-full lg:flex-[0.35]">
                    <SuggestedVideos />
                </div>
            </div>
        </>
    );
}
