import InnerHero from "@/components/common/InnerHero";
import MdMessageSection from "@/components/features/md/MdMessageSection";

// ✅ Reusable fetch
async function getPageData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/brd/v1/md-message`,
    { next: { revalidate: 60 } }
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
    const banner = data?.md_message_acf?.banner;

  return (
    <>
    {banner?.enable__disable_banner === true ? (
      <InnerHero
        title={banner?.title ?? ""}
        mobileImage={banner?.mobile_image?.url || "/images/placeholder.jpg"}
        desktopImage={banner?.desktop_image?.url || "/images/placeholder.jpg"}
        alt={banner?.desktop_image?.alt ?? "banner"}
      />
    ) : null}
      <MdMessageSection data={data}/>
    </>
  );
}
