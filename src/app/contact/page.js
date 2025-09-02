import InnerHero from "@/components/common/InnerHero";
import ContactInfoSection from "@/components/features/contact/ContactInfoSection";
import EnquirySection from "@/components/features/contact/EnquirySection";

export default async function Page() {

  // Fetch privacy policy data from WP API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/brd/v1/contact`,
    { next: { revalidate: 60 } } // ISR optional
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  const banner = data?.contact_acf?.banner;
  const enquiry_section = data?.contact_acf?.enquiry_section;

  return (
    <>
      {banner?.enable__disable_banner === true ? (
                  <InnerHero
                      title={banner?.title ?? ""}
                      mobileImage={banner?.mobile_image?.url}
                      desktopImage={banner?.desktop_image?.url}
                      alt={banner?.desktop_image?.alt ?? "banner"}
                  />
                  ) : null}
      <ContactInfoSection data={data}/>
      {enquiry_section?.enable__disable_enquiry_section === true ? (
        <EnquirySection
  data={enquiry_section}
  socialMedia={enquiry_section?.enable__disable_social_media_icons === true 
    ? enquiry_section?.social_media_icons 
    : []}
/>

      ) : null}
    </>
  );
}
