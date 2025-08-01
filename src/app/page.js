import HeroSection from "@/components/home/HeroSection";
import OfferSection from "@/components/home/OfferSection";
import BrandSection from "@/components/home/BrandSection";
import DealerSection from "@/components/home/DealerSection";
import ProductSection from "@/components/home/ProductSection";
import SellCarSection from "@/components/home/SellCarSection";
import BestCarsSection from "@/components/home/BestCarsSection";
import BrdAdvantageSection from "@/components/home/BrdAdvantageSection";

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
    </>
  );
}

