import InnerHero from "@/components/common/InnerHero";
import ProductListSection from "@/components/features/buy/ProductListSection";

export default async function Page() {
  // Fetch about page data from WP API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/custom/v1/buy`,
    { next: { revalidate: 60 } } // ISR optional
  );
  if (!res.ok) {
    throw new Error("Failed to fetch About Page data");
  }
  const data = await res.json();
  // Get banner data (assuming API always returns at least one)
  const banners = data.banners?.[0] || {};
  const listingpage = data.listingpagedata?.[0] || {};
  return (
    <>
      {banners.enable__disable_buy_a_car_banner && (
        <InnerHero
          title={banners.buy_a_car_banner_title}
          mobileImage={banners.buy_a_car_mobile_image?.url}
          desktopImage={banners.buy_a_car_desktop_image?.url}
          alt={banners.buy_a_car_desktop_image?.alt}
        />
      )}
        <ProductListSection data={listingpage} />      
    </>
  );
}
