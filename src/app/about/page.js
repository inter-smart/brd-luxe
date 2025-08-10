import InnerHero from "@/components/common/InnerHero";
import AboutSection from "@/components/features/about/AboutSection";
import BrdAdvantageSection from "@/components/common/BrdAdvantageSection";
import CoreValueSection from "@/components/features/about/CoreValueSection";
import EnquirySection from "@/components/features/contact/EnquirySection";

export default function Page() {
  return (
    <>
      <InnerHero
        title="About Us"
        mobileImage={"/images/about_us.webp"} 
        desktopImage={"/images/about_us.webp"}
        alt="About Us Hero"
      />
      <AboutSection />
      <CoreValueSection />
      <BrdAdvantageSection />
      <EnquirySection />
    </>
  );
}
