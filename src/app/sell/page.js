import InnerHero from "@/components/common/InnerHero";
import FaqSection from "@/components/features/sell/FaqSection";
import HowWorkSection from "@/components/features/sell/HowWorkSection";
import SellInfoSection from "@/components/features/sell/SellInfoSection";
import SellNowSection from "@/components/features/sell/SellNowSection";
import VideoSection from "@/components/features/sell/VideoSection";
import { Suspense } from "react";

export default async function Page() {

  // Fetch privacy policy data from WP API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/brd/v1/sellyourcar`,
    { next: { revalidate: 60 } } // ISR optional
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
    const banner = data?.sell_your_car_acf?.banner;

  return (
    <>
    {banner?.enable__disable_banner === true ? (
      <InnerHero
        title={banner?.title ?? ""}
        mobileImage={banner?.mobile_image?.url}
        desktopImage={banner?.desktop_image?.url}
        alt={banner?.desktop_image?.alt ?? "banner"}
      />
      ) : null}
      <Suspense fallback={<div>Loading...</div>}>
        <SellInfoSection data={data}/>
        <VideoSection data={data}/>
        <HowWorkSection data={data}/>
        <SellNowSection data={data}/>
        <FaqSection data={data}/>
      </Suspense>
    </>
  );
}
