import InnerHero from "@/components/common/InnerHero";
import NewsListSection from "@/components/features/news/NewsListSection";

export default async function Page() {
  // Fetch news page data from WP API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/custom/v1/news`,
    { next: { revalidate: 60 } } // ISR optional
  );
  if (!res.ok) {
    throw new Error("Failed to fetch News Page data");
  }
  const data = await res.json();
  const banner = data.banners?.[0] || {};
  // const posts = data.posts?.[0] || {};
  const posts = data.posts ?? [];
  return (
    <>
      {banner.enable__disable_news_banner && (
        <InnerHero
          title={banner.news_banner_title}
          mobileImage={banner.news_mobile_image?.url}
          desktopImage={banner.news_desktop_image?.url}
          alt={banner.news_desktop_image?.alt}
        />
      )}
      {/* <NewsListSection data={posts}/> */}
      <NewsListSection data={data.posts ?? []} content={data} />
    </>
  );
}
