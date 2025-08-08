import InnerHero from "@/components/common/InnerHero";
import NewsListSection from "@/components/features/news/NewsListSection";

export default function Page() {
  return (
    <>
      <InnerHero
        title="News & Insights"
        mobileImage={"/images/banner-news-1.jpg"}
        desktopImage={"/images/banner-news-1.jpg"}
        alt="news"
      />
      <NewsListSection />
    </>
  );
}
