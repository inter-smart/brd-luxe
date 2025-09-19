import EnquirySection from "@/components/features/contact/EnquirySection";
import KeyHighlightSection from "@/components/features/buy/KeyHighlightSection";
import ProductDetailSection from "@/components/features/buy/ProductDetailSection";

async function getPageData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/custom/v1/buy`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// ✅ Dynamic Metadata per car
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getPageData();

  const cars = Array.isArray(data?.listingpagedata?.cars_data)
    ? data.listingpagedata.cars_data
    : [];

  const post = cars.find((car) => car.slug === slug) || null;

  return {
    title: post?.seo?.title || data?.seo?.title,
    description: post?.seo?.description || data?.seo?.description,
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

export default async function Page({ params }) {
  const { slug } = await params;
  const data = await getPageData();

  const cars = Array.isArray(data?.listingpagedata?.cars_data)
    ? data.listingpagedata.cars_data
    : [];

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
