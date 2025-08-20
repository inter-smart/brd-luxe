import InnerHero from "@/components/common/InnerHero";
import ContactInfoSection from "@/components/features/contact/ContactInfoSection";
import EnquirySection from "@/components/features/contact/EnquirySection";

export default function Page() {
  return (
    <>
      <InnerHero
        title="Contact"
        mobileImage={"/images/banner-contact-1.jpg"}
        desktopImage={"/images/banner-contact-1.jpg"}
        alt="Contact Us Hero"
      />
      <ContactInfoSection />
      <EnquirySection socialMedia />
    </>
  );
}
