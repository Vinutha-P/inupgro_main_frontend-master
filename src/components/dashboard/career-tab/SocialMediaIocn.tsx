import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
const socialIcons = [
    {
        name: 'Facebook',
        icon: '/f.png',
        color: 'text-blue-600',
        url: 'https://facebook.com/share?u=YOUR_URL',
    },
    {
        name: 'Twitter',
        icon: '/t.png',
        color: 'text-sky-500',
        url: 'https://twitter.com/share?url=YOUR_URL',
    },
    {
        name: 'Instagram',
        icon: '/i.png',
        color: 'text-red-500',
        url: 'https://pinterest.com/pin/create/button/?url=YOUR_URL',
    },
    {
        name: 'Youtube',
        icon: '/y.png',
        color: 'text-red-500',
        url: 'https://pinterest.com/pin/create/button/?url=YOUR_URL',
    },
];

const SocialMediaIocn = () => {
    return (
        <div className="mt-3 flex gap-3">
            {socialIcons.map((platform) => {
                const Icon = platform.icon;
                return (
                    <Link
                        key={platform.name}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='bg-[#E7F0FA] p-2 rounded'
                    >
                        <Image
                            src={platform.icon}
                            alt="Icon"
                            width={15}
                            height={15}
                        />
                    </Link>
                );
            })}
        </div>
    )
}

export default SocialMediaIocn
