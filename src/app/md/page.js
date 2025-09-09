import InnerHero from "@/components/common/InnerHero";
import MdMessageSection from "@/components/features/md/MdMessageSection";

export default async function Page() {
  // Fetch privacy policy data from WP API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/brd/v1/md-message`,
    { next: { revalidate: 60 } } // ISR optional
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
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
