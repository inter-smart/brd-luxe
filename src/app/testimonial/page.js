import InnerHero from "@/components/common/InnerHero";
import ListSection from "@/components/features/testimonial/ListSection";

export default function Page() {
  return (
    <>
      <InnerHero
        title="Testimonials"
        mobileImage={"/images/banner-testimonial-1.jpg"}
        desktopImage={"/images/testimonial_banner.jpg"}
        alt="news"
      />
      <ListSection />
    </>
  );
}
