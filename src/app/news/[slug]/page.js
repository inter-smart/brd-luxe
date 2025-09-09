import InnerHero from "@/components/common/InnerHero";
import NewsDetailSection from "@/components/features/news/NewsDetailSection";
import RelatedSection from "@/components/features/news/RelatedSection";

export default async function Page({ params }) {

  // Get the slug from the URL params
  const { slug } = await params;

  // Fetch news page data from WP API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/custom/v1/news`,
    { next: { revalidate: 60 } } // ISR optional
  );
  if (!res.ok) {
    throw new Error("Failed to fetch News Page data");
  }
  const data = await res.json();


  // Find the post that matches the slug
  const post = data.posts?.find((post) => post.slug === slug) || {};

  // If no post is found, you can handle it (e.g., return a 404)
  if (!post || Object.keys(post).length === 0) {
    return <div>Post not found</div>; // Or use Next.js's notFound()
  }

  const banner = post.news_detail_banners?.[0];

  return (
    <>
      {banner?.enable__disable_news_detail_banner && (
        <InnerHero
          title={banner.news_detail_banner_title}
          mobileImage={banner.news_detail_mobile_image?.url || "/images/placeholder.jpg"}
          desktopImage={banner.news__detail_desktop_image?.url || "/images/placeholder.jpg"}
          alt={banner.news__detail_desktop_image?.alt}
        />
      )}
      <NewsDetailSection data={post} />
      {post.related_posts && post.related_posts.length > 0 && (
        <RelatedSection data={post} />
      )}
    </>
  );
}