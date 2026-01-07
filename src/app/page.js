export const revalidate = 3600;
import dynamicImport from "next/dynamic";
export const dynamic = "force-dynamic";

import HeroSection from "@/components/features/home/HeroSection";
const BestCarsSection = dynamicImport(() => import("@/components/features/home/BestCarsSection"));
const ProductSection = dynamicImport(() => import("@/components/features/home/ProductSection"));
const DealerSection = dynamicImport(() => import("@/components/features/home/DealerSection"));
const OfferSection = dynamicImport(() => import("@/components/features/home/OfferSection"));
const BrandSection = dynamicImport(() => import("@/components/features/home/BrandSection"));
const BrdAdvantageSection = dynamicImport(() => import("@/components/common/BrdAdvantageSection"));
const SellCarSection = dynamicImport(() => import("@/components/features/home/SellCarSection"));
const ExperienceSection = dynamicImport(() => import("@/components/features/home/TestimonialSection"));
const LatestBrdSection = dynamicImport(() => import("@/components/features/home/LatestBrdSection"));
const JourneyFrameSection = dynamicImport(() => import("@/components/features/home/JourneyFrameSection"));
const LetsTalkSection = dynamicImport(() => import("@/components/features/home/LetsTalkSection"));

async function getPageData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/brd/v1/home`, {
    next: {
      revalidate: 3600,
      tags: ["home-page"],
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Home data");
  }

  return res.json();
}

export default async function Page() {
  const data = await getPageData();
  const home_acf = data?.home_acf;

  return (
    <>
      {home_acf?.banner?.enable__disable_banner && <HeroSection data={home_acf} />}
      {home_acf?.best_cars_section?.enable_best_cars_section && <BestCarsSection data={home_acf} />}
      {home_acf?.cars_section?.enable__disable_cars_section && <ProductSection data={home_acf} whatsapp={home_acf?.whatsapp} />}
      {home_acf?.dealers_section?.enable__disable_dealers_section && <DealerSection data={home_acf} />}
      {home_acf?.offers_section?.enable__disable_offer_section && <OfferSection data={home_acf} />}
      {home_acf?.brands_section?.enable__disable_brands_section && <BrandSection data={home_acf} />}
      {home_acf?.advantages_section?.enable__disable_advantages_section && <BrdAdvantageSection data={home_acf?.advantages_section} />}
      {home_acf?.sell_your_car_section?.enable__disable_sell_your_car_section && <SellCarSection data={home_acf} />}
      {home_acf?.testimonial_section?.enable__disable_testimonial_section && <ExperienceSection data={home_acf} />}
      {home_acf?.latest_news_section?.enable__disable_latest_news_section && <LatestBrdSection data={home_acf} />}
      {home_acf?.journey_in_frames_section?.enable__disable_journey_in_frames_section && <JourneyFrameSection data={home_acf} />}
      {home_acf?.lets_talk_section?.enable__disable_lets_talk_section && <LetsTalkSection data={home_acf} />}
    </>
  );
}
