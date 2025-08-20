import InnerHero from '@/components/common/InnerHero' 
import FlagshipSection from '@/components/features/showroom/FlagshipSection'
import PremiumSection from '@/components/features/showroom/PremiumSection'
import VisitUsSection from '@/components/features/showroom/VisitUsSection'
import WhatWitsSection from '@/components/features/showroom/WhatWitsSection'
import TestdriveeSection from '@/components/features/showroom/TestdriveeSection' 
import EnquirySection from "@/components/features/contact/EnquirySection"

 

export default async function page() {

// Fetch privacy policy data from WP API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/brd/v1/showroom`,
    { next: { revalidate: 60 } } // ISR optional
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Privacy Policy data");
  }

  const data = await res.json();
    const banner = data?.showroom_acf?.banner;

    return (
        <>
        {banner?.enable__disable_banner === true ? (
            <InnerHero
                title={banner?.title ?? ""}
                mobileImage={banner?.mobile_image?.url ?? ""}
                desktopImage={banner?.desktop_image?.url ?? ""}
                alt={banner?.desktop_image?.alt ?? "banner"}
            />
            ) : null}
            <PremiumSection  data={data}/>
            <WhatWitsSection  data={data}/>
            <VisitUsSection  data={data}/>
            <FlagshipSection  data={data}/> 
            <TestdriveeSection  data={data}/>
             <EnquirySection  data={data}/>
        </>
    )
}
