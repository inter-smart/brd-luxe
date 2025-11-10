import dynamic from "next/dynamic";

// Keep InnerHero static (above the fold)
import InnerHero from "@/components/common/InnerHero";

// Dynamically import below-the-fold sections
const ContactInfoSection = dynamic(
  () => import("@/components/features/contact/ContactInfoSection"),
  { ssr: true }
);

const EnquirySection = dynamic(
  () => import("@/components/features/contact/EnquirySection"),
  { ssr: true }
);

// ✅ Reusable fetch
async function getPageData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/brd/v1/contact`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
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
  const banner = data?.contact_acf?.banner;
  const enquiry_section = data?.contact_acf?.enquiry_section;

  return (
    <>
      {banner?.enable__disable_banner === true ? (
        <InnerHero
          title={banner?.title ?? ""}
          mobileImage={banner?.mobile_image?.url || "/images/placeholder.jpg"}
          desktopImage={banner?.desktop_image?.url || "/images/placeholder.jpg"}
          alt={banner?.desktop_image?.alt ?? "banner"}
        />
      ) : null}

      <ContactInfoSection data={data} />

      {enquiry_section?.enable__disable_enquiry_section === true ? (
        <EnquirySection
          data={enquiry_section}
          socialMedia={
            enquiry_section?.enable__disable_social_media_icons === true
              ? enquiry_section?.social_media_icons
              : []
          }
        />
      ) : null}
    </>
  );
}

// import InnerHero from "@/components/common/InnerHero";
// import ContactInfoSection from "@/components/features/contact/ContactInfoSection";
// import EnquirySection from "@/components/features/contact/EnquirySection";

// // ✅ Reusable fetch
// async function getPageData() {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/wp-json/brd/v1/contact`,
//     { next: { revalidate: 60 } }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

// // ✅ Dynamic Metadata
// export async function generateMetadata() {
//   const data = await getPageData();

//   return {
//     title: data?.seo?.title,
//     description: data?.seo?.description,
//     openGraph: {
//       title: data?.seo?.title,
//       description: data?.seo?.description,
//       images: [
//         {
//           url: data?.seo?.image,
//           width: 1200,
//           height: 630,
//           alt: data?.seo?.title || "BRD LUXE",
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: data?.seo?.title,
//       description: data?.seo?.description,
//       images: [data?.seo?.image],
//     },
//   };
// }

// export default async function Page() {
//   const data = await getPageData();
//   const banner = data?.contact_acf?.banner;
//   const enquiry_section = data?.contact_acf?.enquiry_section;

//   return (
//     <>
//       {banner?.enable__disable_banner === true ? (
//         <InnerHero
//           title={banner?.title ?? ""}
//           mobileImage={banner?.mobile_image?.url || "/images/placeholder.jpg"}
//           desktopImage={banner?.desktop_image?.url || "/images/placeholder.jpg"}
//           alt={banner?.desktop_image?.alt ?? "banner"}
//         />
//       ) : null}

//       <ContactInfoSection data={data} />

//       {enquiry_section?.enable__disable_enquiry_section === true ? (
//         <EnquirySection
//           data={enquiry_section}
//           socialMedia={
//             enquiry_section?.enable__disable_social_media_icons === true
//               ? enquiry_section?.social_media_icons
//               : []
//           }
//         />
//       ) : null}
//     </>
//   );
// }
