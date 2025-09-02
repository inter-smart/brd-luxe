import InnerHero from "@/components/common/InnerHero";
import ProductListSection from "@/components/features/buy/ProductListSection";

export default async function Page() {

  // Fetch privacy policy data from WP API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/custom/v1/buy`,
    { next: { revalidate: 60 } } // ISR optional
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
    const banners = data?.banners ?? [];

    const activeBanner = banners.find(b => b.enable__disable_buy_a_car_banner);

  return (
    <>
    {activeBanner ? (
      <InnerHero
        title={activeBanner.buy_a_car_banner_title ?? ""}
        mobileImage={activeBanner.buy_a_car_mobile_image?.url}
        desktopImage={activeBanner.buy_a_car_desktop_image?.url}
        alt={activeBanner.buy_a_car_desktop_image?.alt ?? "banner"}
      />
    ) : null}
      <ProductListSection data={ data } whatsapp={data?.whatsapp} />
    </>
  );
}
