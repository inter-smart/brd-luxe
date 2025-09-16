import InnerHero from "@/components/common/InnerHero";
import ListSection from "@/components/features/testimonial/ListSection";


// ✅ Fetch API function (reuse for both metadata + page)
async function getTestimonialData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/brd/v1/testimonial`,
    { next: { revalidate: 60 } } // ISR optional
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// ✅ Dynamic Metadata
export async function generateMetadata() {
  const data = await getTestimonialData();

  return {
    title: data?.seo?.title,
    description: data?.seo?.description,
  };
}

export default async function Page() {
  const data = await getTestimonialData();
  
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
