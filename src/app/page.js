import HeroSection from "@/components/features/home/HeroSection";
import OfferSection from "@/components/features/home/OfferSection";
import BrandSection from "@/components/features/home/BrandSection";
import DealerSection from "@/components/features/home/DealerSection";
import ProductSection from "@/components/features/home/ProductSection";
import SellCarSection from "@/components/features/home/SellCarSection";
import BestCarsSection from "@/components/features/home/BestCarsSection";
import LetsTalkSection from "@/components/features/home/LetsTalkSection";
import BrdAdvantageSection from "@/components/common/BrdAdvantageSection";
import LatestBrdSection from "@/components/features/home/LatestBrdSection";
import ExperienceSection from "@/components/features/home/TestimonialSection";
import JourneyFrameSection from "@/components/features/home/JourneyFrameSection";

export default function Page() {
  return (
    <>
      <HeroSection />
      <BestCarsSection />
      <ProductSection />
      <DealerSection />
      <OfferSection />
      <BrandSection />
      <BrdAdvantageSection />
      <SellCarSection />
      <ExperienceSection />
      <LatestBrdSection />
      <JourneyFrameSection />
      <LetsTalkSection />
    </>
  );
}
