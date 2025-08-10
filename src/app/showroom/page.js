import InnerHero from '@/components/common/InnerHero' 
import FlagshipSection from '@/components/features/showroom/FlagshipSection'
import PremiumSection from '@/components/features/showroom/PremiumSection'
import VisitUsSection from '@/components/features/showroom/VisitUsSection'
import WhatWitsSection from '@/components/features/showroom/WhatWitsSection'
import TestdriveeSection from '@/components/features/showroom/TestdriveeSection' 
import EnquirySection from "@/components/features/contact/EnquirySection"

 

export default function page() {
    return (
        <>
            <InnerHero
                title="Showroom"
                mobileImage={"/images/showroomBanner.jpg"}
                desktopImage={"/images/showroomBanner.jpg"}
                alt="Showroom"
            />
            <PremiumSection />
            <WhatWitsSection />
            <VisitUsSection />
            <FlagshipSection /> 
            <TestdriveeSection />
             <EnquirySection />
        </>
    )
}
