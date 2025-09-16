import InnerHero from "@/components/common/InnerHero";
import ProductListSection from "@/components/features/buy/ProductListSection";


// ✅ Fetch API function (reuse for both metadata + page)
async function getPageData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/custom/v1/buy`,
    { next: { revalidate: 60 } } // ISR optional
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// ✅ Dynamic Metadata
export async function generateMetadata() {
  const data = await getPageData();

  return {
    title: data?.seo?.title,
    description: data?.seo?.description,
  };
}


export default async function Page() {

    const data = await getPageData();

    const banners = data?.banners ?? [];

    const activeBanner = banners.find(b => b.enable__disable_buy_a_car_banner);

  return (
    <>
    {activeBanner ? (
      <InnerHero
        title={activeBanner.buy_a_car_banner_title ?? ""}
        mobileImage={activeBanner.buy_a_car_mobile_image?.url || "/images/placeholder.jpg"}
        desktopImage={activeBanner.buy_a_car_desktop_image?.url || "/images/placeholder.jpg"}
        alt={activeBanner.buy_a_car_desktop_image?.alt ?? "banner"}
      />
    ) : null}
      <ProductListSection data={ data } whatsapp={data?.whatsapp} />
    </>
  );
}
