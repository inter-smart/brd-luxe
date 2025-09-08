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

export default async function Page() {

  // Fetch privacy policy data from WP API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/brd/v1/home`,
    { next: { revalidate: 60 } } // ISR optional
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  const home_acf = data?.home_acf;

  return (
    <>
      <HeroSection data={home_acf} />
      <BestCarsSection data={home_acf} />
      <ProductSection data={home_acf} whatsapp={data?.home_acf?.whatsapp} />
      <DealerSection data={home_acf} />
      <OfferSection data={home_acf} />
      <BrandSection data={home_acf} />
      {data?.home_acf?.advantages_section && (
        <BrdAdvantageSection data={data?.home_acf?.advantages_section} />
      )}
      <SellCarSection data={home_acf} />
      <ExperienceSection data={home_acf} />
      <LatestBrdSection data={home_acf} />
      <JourneyFrameSection data={home_acf} />
      <LetsTalkSection data={home_acf} />
    </>
  );
}
