import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid, Area,
} from 'recharts';
import { FaRupeeSign } from 'react-icons/fa';
import { LuInfo } from 'react-icons/lu';

const lineData = [
    { date: '1 Mar', views: 0 },
    { date: '2 Mar', views: 5 },
    { date: '3 Mar', views: 1 },
    { date: '4 Mar', views: 0 },
    { date: '5 Mar', views: 2 },
    { date: '6 Mar', views: 5 },
    { date: '7 Mar', views: 3 },
];

const shareData = [
    { date: '1 Mar', shares: 0 },
    { date: '2 Mar', shares: 2 },
    { date: '3 Mar', shares: 1 },
    { date: '4 Mar', shares: 0 },
    { date: '5 Mar', shares: 1 },
    { date: '6 Mar', shares: 3 },
    { date: '7 Mar', shares: 0 },
];

const userTypeData = [
    { name: 'School Student', value: 2, color: '#4C68FF' },
    { name: 'College Student', value: 5, color: '#7F8DAA' },
    { name: 'School Teacher', value: 3, color: '#C7D2FE' },
];

const VideoAnalytics = ({ videoId }: { videoId: string }) => {
    const totalViews = lineData.reduce((acc, cur) => acc + cur.views, 0);

    return (
        <div className="space-y-4 text-sm h-[35%]">
            <div className="flex items-start sm:items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full" />
                <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-sm font-semibold text-gray-800">Smita Agarwal</h2>
                        <span className="text-xs text-gray-400">|</span>
                        <span className="text-sm text-gray-400">0 Followers</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mt-1">
                        <span className="text-gray-600 font-medium">School Name</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-600 font-medium">Physics Teacher</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-600 font-medium">Class - 10th to 12th</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-600 font-medium">10+ yrs exp</span>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-3 py-3 rounded-lg flex items-center gap-2 text-md">
                <img src="/rocket-boost.png" alt="Rocket Icon" className="w-8 h-8" />
                To increase the view, share your video to your students or any social media platform.
            </div>

            <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-1">
                    <h3 className="text-sm font-medium">Total views: {totalViews}</h3>
                    <div className="border border-gray-300 rounded-md px-2 py-1 text-xs text-gray-600">
                        <p className="text-xs text-gray-400">📅 March 2024</p>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={lineData}>
                        <defs>
                            <linearGradient id="viewGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#4C68FF" stopOpacity={0.4} />
                                <stop offset="100%" stopColor="#4C68FF" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid stroke="#e0e0e0" horizontal vertical={false} />
                        <XAxis dataKey="date" fontSize={10} tick={{ fill: '#555' }} stroke="#ccc" />
                        <YAxis ticks={[0, 2, 4, 6]} fontSize={10} tick={{ fill: '#555' }} stroke="#ccc" />
                        <Tooltip />
                        <Area type="monotone" dataKey="views" stroke="none" fill="url(#viewGradient)" />
                        <Line type="monotone" dataKey="views" stroke="#4C68FF" strokeWidth={2} dot={{ r: 2 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm flex items-center justify-between">
                    <div className="relative w-28 h-28">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={userTypeData}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={40}
                                    outerRadius={55}
                                    startAngle={90}
                                    endAngle={-270}
                                    stroke="none"
                                >
                                    {userTypeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>

                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <span className="text-sm font-semibold text-gray-800">
                                {userTypeData.reduce((a, b) => a + b.value, 0)}
                            </span>
                            <span className="text-[10px] text-gray-500">Total Users</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 text-[13px] ml-4">
                        {userTypeData.map((user, index) => (
                            <div key={index} className="flex items-center gap-2 text-gray-600">
                                <span
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: user.color }}
                                />
                                <span className="font-semibold text-gray-800">{user.value}</span>
                                <span>{user.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-sm">
                        <h4 className="text-xs font-medium mb-1">Share Rate</h4>
                        <div className="flex items-center justify-between">

                            <div className="text-left text-gray-600 text-xs">
                                <p className="text-sm font-semibold text-gray-800">0</p>
                                <p className="text-[11px] text-gray-500">in 48 hours</p>
                            </div>

                            <div className="w-3/4 h-[80px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={shareData}>
                                        <defs>
                                            <linearGradient id="shareGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#4C68FF" stopOpacity={0.4} />
                                                <stop offset="100%" stopColor="#4C68FF" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="date" hide />
                                        <YAxis hide />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="shares" stroke='none' fill="url(#shareGradient)" />
                                        <Line type="monotone" dataKey="shares" stroke="#4C68FF" strokeWidth={2} dot={false} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-sm text-xs">
                        <div className="flex justify-between items-center">

                            <div className="flex flex-col justify-center">
                                <h4 className="text-[11px] font-medium mb-1">Earning</h4>
                                <div className="flex items-center text-sm font-semibold text-green-600">
                                    <FaRupeeSign className="mr-1 text-xs" />10
                                </div>
                            </div>

                            <img src="/money-bag.png" alt="Money Bag" className="w-24 h-20" />
                        </div>

                        <div className="flex items-start mt-2 text-[10px] text-gray-500 gap-1">
                            <span className="text-gray-600 mt-[1px]"><LuInfo /></span>
                            <p className="leading-snug">
                                To increase the earnings from a video, you need to increase its shares and views.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default VideoAnalytics;
