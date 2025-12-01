import Link from 'next/link';
import React from 'react'
const companyDetails = [
    { label: 'Founded in:', value: 'March 21, 2006' },
    { label: 'Organization type:', value: 'Private School' },
    { label: 'Company size:', value: '120–300 Employers' },
    { label: 'Phone:', value: '(406) 555-0120' },
    { label: 'Email:', value: 'twitter@gmail.com', isLink: true, linkType: 'email' },
    { label: 'Website:', value: 'https://twitter.com', isLink: true, linkType: 'url' },
];


const SchoolInfoCard = () => {
    return (
        <>
            <div>
                {companyDetails.map((item, index) => (
                    <div className="flex justify-between mb-4" key={index}>
                        <span className='text-[#5E6670] text-base'>{item.label}</span>

                        {item.isLink ? (
                            item.linkType === 'email' ? (
                                <Link href={`mailto:${item.value}`} className="text-[#18191C] text-base cursor-pointer">{item.value}</Link>
                            ) : (
                                <Link href={item.value} target="_blank" rel="noopener noreferrer" className="text-[#18191C] text-base cursor-pointer">{item.value}</Link>
                            )
                        ) : (
                            <span className='text-[#5E6670] text-base'>{item.value}</span>
                        )}
                    </div>
                ))}
            </div>


        </>
    )
}

export default SchoolInfoCard
