import InnerHero from "@/components/common/InnerHero";
import NewsListSection from "@/components/features/news/NewsListSection";

// ✅ Reusable fetch
async function getPageData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/custom/v1/news`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch News Page data");
  }

  return res.json();
}

// ✅ Dynamic Metadata
export async function generateMetadata() {
  const data = await getPageData();

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
  const data = await getPageData();
  const banner = data.banners?.[0] || {};
  const posts = data.posts ?? [];

  return (
    <>
      {banner.enable__disable_news_banner && (
        <InnerHero
          title={banner.news_banner_title}
          mobileImage={banner.news_mobile_image?.url || "/images/placeholder.jpg"}
          desktopImage={banner.news_desktop_image?.url || "/images/placeholder.jpg"}
          alt={banner.news_desktop_image?.alt ?? "banner"}
        />
      )}

      <NewsListSection data={posts} content={data} />
    </>
  );
}
