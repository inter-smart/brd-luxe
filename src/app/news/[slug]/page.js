import InnerHero from "@/components/common/InnerHero";
import NewsDetailSection from "@/components/features/news/NewsDetailSection";
import RelatedSection from "@/components/features/news/RelatedSection";

// 🔹 Fetch all news data
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

// 🔹 Dynamic Metadata per post
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getPageData();

  const post = data.posts?.find((p) => p.slug === slug);

  return {
    title: post?.seo?.title || post?.title,
    description:
      post?.seo?.description ||
      post?.excerpt,
    openGraph: {
      title: post?.seo?.title || post?.title,
      description:
        post?.seo?.description ||
        post?.excerpt,
      images: [
        {
          url: post?.seo?.image,
          width: 1200,
          height: 630,
          alt: post?.seo?.title || post?.title || "BRD LUXE",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post?.seo?.title || post?.title,
      description:
        post?.seo?.description ||
        post?.excerpt,
      images: [post?.seo?.image],
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const data = await getPageData();

  // Find the post that matches the slug
  const post = data.posts?.find((p) => p.slug === slug) || null;

  if (!post) {
    return <div>Post not found</div>; // Or use notFound()
  }

  const banner = post.news_detail_banners?.[0];

  return (
    <>
      {banner?.enable__disable_news_detail_banner && (
        <InnerHero
          title={banner.news_detail_banner_title}
          mobileImage={
            banner.news_detail_mobile_image?.url || "/images/placeholder.jpg"
          }
          desktopImage={
            banner.news_detail_desktop_image?.url || "/images/placeholder.jpg"
          }
          alt={banner.news_detail_desktop_image?.alt ?? "banner"}
        />
      )}

      <NewsDetailSection data={post} />

      {post.related_posts && post.related_posts.length > 0 && (
        <RelatedSection data={post} />
      )}
    </>
  );
}
