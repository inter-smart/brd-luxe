import InnerHero from "@/components/common/InnerHero";
import ListSection from "@/components/features/testimonial/ListSection";

export default async function Page() {

  // Fetch privacy policy data from WP API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/brd/v1/testimonial`,
    { next: { revalidate: 60 } } // ISR optional
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
    const banner = data?.testimonial_acf?.banner;
    const testimonials = data?.testimonial_acf?.testimonials;

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
    { testimonials?.enable__disable_testimonials === true ? (
      <ListSection data={data}/>
    ) : null}
    </>
  );
}
