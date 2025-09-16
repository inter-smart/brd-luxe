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

// 🔹 Reusable fetch
async function getPageData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/brd/v1/home`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Home data");
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
  };
}

export default async function Page() {
  const data = await getPageData();
  const home_acf = data?.home_acf;

  return (
    <>
      <HeroSection data={home_acf} />
      <BestCarsSection data={home_acf} />
      <ProductSection data={home_acf} whatsapp={home_acf?.whatsapp} />
      <DealerSection data={home_acf} />
      <OfferSection data={home_acf} />
      <BrandSection data={home_acf} />

      {home_acf?.advantages_section?.enable__disable_advantages_section && (
        <BrdAdvantageSection data={home_acf?.advantages_section} />
      )}

      <SellCarSection data={home_acf} />
      <ExperienceSection data={home_acf} />
      <LatestBrdSection data={home_acf} />
      <JourneyFrameSection data={home_acf} />
      <LetsTalkSection data={home_acf} />
    </>
  );
}
