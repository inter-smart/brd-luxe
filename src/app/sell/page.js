import InnerHero from "@/components/common/InnerHero";
import HowWorkSection from "@/components/features/sell/HowWorkSection";
import SellInfoSection from "@/components/features/sell/SellInfoSection";
import VideoSection from "@/components/features/sell/VideoSection";

export default function Page() {
  return (
    <>
      <InnerHero
        title="Sell Your car"
        mobileImage={"/images/banner-sell-1.jpg"}
        desktopImage={"/images/banner-sell-1.jpg"}
        alt="Sell Your Car Hero"
      />
      <SellInfoSection />
      <VideoSection />
      <HowWorkSection />
    </>
  );
}
