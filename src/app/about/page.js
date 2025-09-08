import InnerHero from "@/components/common/InnerHero";
import AboutSection from "@/components/features/about/AboutSection";
import BrdAdvantageSection from "@/components/common/BrdAdvantageSection";
import CoreValueSection from "@/components/features/about/CoreValueSection";
import EnquirySection from "@/components/features/contact/EnquirySection";

export default async function Page() {
  // Fetch about page data from WP API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/custom/v1/about`,
    { next: { revalidate: 60 } } // ISR optional
  );
  if (!res.ok) {
    throw new Error("Failed to fetch About Page data");
  }
  const data = await res.json();
  // Get banner data (assuming API always returns at least one)
  const banner = data.banners?.[0] || {};
  const aboutSection = data.about_section?.[0] || {};
  const coreValuesData = data.core_values_section?.[0] || {};
  const advantagesData = data.advantages_section?.[0] || {};
  const enquiryData = data.enquiry?.[0] || {};
  return (
    <>
      {banner.enable__disable_banner && (
        <InnerHero
          title={banner.title || "About Us"}
          mobileImage={banner.mobile_image?.url || "/images/about_us.webp"}
          desktopImage={banner.desktop_image?.url || "/images/about_us.webp"}
          alt={banner.desktop_image?.alt || "About Us Hero"}
        />
      )}
      {aboutSection.enable__disable_about_section && (
        <AboutSection data={aboutSection} />
      )}
      {coreValuesData.enable__disable_core_value_section && (
        <CoreValueSection data={coreValuesData} />
      )}
      {advantagesData.enable__disable_advantages_section && (
        <BrdAdvantageSection data={advantagesData} />
      )}
      {enquiryData.enable__disable_enquiry_section && (
        <EnquirySection data={enquiryData} />
      )}
    </>
  );
}
