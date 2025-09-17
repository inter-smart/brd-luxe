import InnerHero from '@/components/common/InnerHero' 
import FlagshipSection from '@/components/features/showroom/FlagshipSection'
import PremiumSection from '@/components/features/showroom/PremiumSection'
import VisitUsSection from '@/components/features/showroom/VisitUsSection'
import WhatWitsSection from '@/components/features/showroom/WhatWitsSection'
import TestdriveeSection from '@/components/features/showroom/TestdriveeSection' 
import EnquirySection from "@/components/features/contact/EnquirySection"

// 🔹 Reusable fetch
async function getPageData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/brd/v1/showroom`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// 🔹 Metadata
export async function generateMetadata() {
  const data = await getPageData();

  return {
    title: data?.seo?.title,
    description:
      data?.seo?.description,
      openGraph: {
      title: data?.seo?.title,
      description: data?.seo?.description,
      images: [
        {
          url: data?.seo?.image,
          width: 1200,
          height: 630,
          alt: data?.seo?.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data?.seo?.title,
      description: data?.seo?.description,
      images: [data?.seo?.image],
    },
  };
}


export default async function page() {

    const data = await getPageData();

    const banner = data?.showroom_acf?.banner;
    const enquiry_section = data?.showroom_acf?.enquiry_section;

    return (
        <>
        {banner?.enable__disable_banner === true ? (
            <InnerHero
                title={banner?.title ?? ""}
                mobileImage={banner?.mobile_image?.url || "/images/placeholder.jpg"}
                desktopImage={banner?.desktop_image?.url || "/images/placeholder.jpg"}
                alt={banner?.desktop_image?.alt ?? "banner"}
            />
            ) : null}
            <PremiumSection  data={data}/>
            <WhatWitsSection  data={data}/>
            <VisitUsSection  data={data}/>
            <FlagshipSection  data={data}/> 
            <TestdriveeSection  data={data}/>
            { enquiry_section?.enable__disable_enquiry_section === true ? (
            <EnquirySection  data={enquiry_section}/>
            ) : null}
        </>
    )
}
