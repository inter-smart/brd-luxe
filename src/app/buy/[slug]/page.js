import EnquirySection from "@/components/features/contact/EnquirySection";
import KeyHighlightSection from "@/components/features/buy/KeyHighlightSection";
import ProductDetailSection from "@/components/features/buy/ProductDetailSection";

export default async function Page({ params }) {
  const { slug } = params;

  // Fetch cars page data from WP API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/custom/v1/buy`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Cars Page data");
  }

  const data = await res.json();

  const cars = Array.isArray(data?.listingpagedata?.cars_data)
    ? data.listingpagedata.cars_data
    : [];

  // ✅ Just a single object, not an array
  const whatsappConfig = data?.whatsapp || null;

  const post = cars.find((car) => car.slug === slug) || null;

  if (!post) {
    return <div className="text-center py-20">Car not found.</div>;
  }

  return (
    <>
      <ProductDetailSection data={post} whatsapp_post={whatsappConfig} />
      <KeyHighlightSection data={post} />
      <EnquirySection data={data?.enquiry_section} />
    </>
  );
}
