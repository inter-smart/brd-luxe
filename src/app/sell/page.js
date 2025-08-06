import InnerHero from "@/components/common/InnerHero";
import FaqSection from "@/components/features/sell/FaqSection";
import HowWorkSection from "@/components/features/sell/HowWorkSection";
import SellInfoSection from "@/components/features/sell/SellInfoSection";
import SellNowSection from "@/components/features/sell/SellNowSection";
import VideoSection from "@/components/features/sell/VideoSection";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <InnerHero
        title="Sell Your car"
        mobileImage={"/images/banner-sell-1.jpg"}
        desktopImage={"/images/banner-sell-1.jpg"}
        alt="Sell Your Car Hero"
      />
      <Suspense fallback={<div>Loading...</div>}>
        <SellInfoSection />
        <VideoSection />
        <HowWorkSection />
        <SellNowSection />
        <FaqSection />
      </Suspense>
    </>
  );
}
