import InnerHero from "@/components/common/InnerHero";
import ListSection from "@/components/features/testimonial/ListSection";

// ✅ Fetch API function (reuse for both metadata + page)
async function getTestimonialData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wp-json/brd/v1/testimonial`,
      { next: { revalidate: 60 } } // ISR optional
    );

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    return null;
  }
}

// ✅ Dynamic Metadata
export async function generateMetadata() {
  const data = await getTestimonialData();
  if (!data) return {};

  return {
    title: data?.seo?.title,
    description: data?.seo?.description,
    openGraph: {
      title: data?.seo?.title,
      description: data?.seo?.description,
      images: [
        {
          url: data?.seo?.image,
          width: 1200,
          height: 630,
          alt: data?.seo?.title || "BRD LUXE",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data?.seo?.title,
      description: data?.seo?.description,
      images: [data?.seo?.image],
    },
  };
}

export default async function Page() {
  const data = await getTestimonialData();
  if (!data) return null;

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
      {testimonials?.enable__disable_testimonials === true ? <ListSection data={data} /> : null}
    </>
  );
}
