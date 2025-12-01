
'use client'

import PublicPageTemplate from '../templates/PublicPageTemplate'
import HeroSection from '../organism/AboutUs/HeroSection'
import CompanyValues from '../organism/AboutUs/CompanyValues'
import MeetOurTeam from '../organism/AboutUs/MeetOurTeam'
import SuccessByNumbers from '../organism/AboutUs/SuccessByNumbers'
import TestimonialGrid from '../organism/AboutUs/TestimonialGrid'
import PartnerLogos from '../organism/AboutUs/PartnerLogos'
import EducationHighlights from '../organism/AboutUs/EducationHighlights'
import FAQ from '../organism/AboutUs/FAQ'
import PublicPageTemplateFullWidth from '../templates-full-width/PublicPageTemplateFullWidth'



const AboutUsDetails = () => {

    return (
        <>
            <PublicPageTemplateFullWidth>
                <HeroSection />
                <div className='w-full flex flex-col px-4 lg:px-20 gap-3 lg:gap-5 max-w-[95rem] mx-auto'>
                    <CompanyValues />
                    <MeetOurTeam />
                    <SuccessByNumbers />
                    <TestimonialGrid />
                    <PartnerLogos />
                    <EducationHighlights />
                    <FAQ />
                </div>

            </PublicPageTemplateFullWidth>
        </>
    )
}

export default AboutUsDetails
