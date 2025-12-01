
import React from 'react';
import PublicPageTemplateFullWidth from '../templates-full-width/PublicPageTemplateFullWidth'

type SectionType = 'paragraphs' | 'list';

export interface TermSection {
    title: string | number | null;
    type: SectionType;
    content: string[];
}

type CTA = {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
};

interface TermsAndConditionsProps {
    heading: string;
    termsData: TermSection[];
    cta?: CTA;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ heading, termsData, cta }) => {
    const showCTA =
        cta &&
        (cta.title?.trim() || cta.description?.trim() || cta.imageSrc?.trim());
    return (
        <>
            <PublicPageTemplateFullWidth>
                <div className="w-full flex flex-col px-4 lg:p-20 gap-3 lg:gap-5 max-w-[95rem] mx-auto">
                    <h1 className="text-2xl font-bold mb-4">{heading}</h1>

                    <div>
                        {/* Ordered list: only for sections with a title that isn't 0 or empty */}
                        <ol className="list-decimal ml-6 space-y-6">
                            {termsData
                                .filter(section => section.title !== 0 && !!section.title)
                                .map((section, index) => (
                                    <li key={index} className="mb-6">
                                        <div className="font-semibold mb-2">{section.title}</div>

                                        {section.type === 'paragraphs' &&
                                            section.content.map((para, i) => (
                                                <p key={i} className="text-base text-gray-700 mb-2">{para}</p>
                                            ))}

                                        {section.type === 'list' && (
                                            <ul className="list-disc ml-6 text-gray-700 space-y-1">
                                                {section.content.map((item, i) => (
                                                    <li key={i}>{item}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                        </ol>

                        {termsData
                            .filter(section => section.title === 0)
                            .map((section, index) => (
                                <div key={index} className="mb-6">
                                    <div className="font-semibold mb-2"></div>

                                    {section.type === 'paragraphs' &&
                                        section.content.map((para, i) => (
                                            <p key={i} className="text-base text-gray-700 mb-2">{para}</p>
                                        ))}

                                    {section.type === 'list' && (
                                        <ul className="list-disc ml-6 text-gray-700 space-y-1">
                                            {section.content.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                    </div>
                    {showCTA && (
                        <div className="py-12 px-6 bg-gray-50 text-gray-900 mt-10">
                            <div className="flex  flex-col-reverse md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
                                <div className="md:w-1/2">
                                    <div className='md:max-w-[530px] ml-auto'>

                                        {cta.title && (
                                            <h6 className="text-center md:text-left text-darkBlue mb-4">
                                                {cta.title}
                                            </h6>
                                        )}
                                        {cta.description && (
                                            <p className="text-base text-gray-700">
                                                {cta.description}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {cta.imageSrc && (
                                    <div className="md:w-1/2">
                                        <img
                                            src={cta.imageSrc}
                                            alt={cta.imageAlt || 'CTA Image'}
                                            className="rounded-xl shadow-lg w-full md:h-[320px] object-cover object-top"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </div>
            </PublicPageTemplateFullWidth>
        </>
    );
};

export default TermsAndConditions;
