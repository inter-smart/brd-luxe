import dynamic from "next/dynamic";

// Keep InnerHero static (above the fold)
import InnerHero from "@/components/common/InnerHero";

// Dynamically import below-the-fold sections
const AboutSection = dynamic(
  () => import("@/components/features/about/AboutSection"),
  { ssr: true }
);

const BrdAdvantageSection = dynamic(
  () => import("@/components/common/BrdAdvantageSection"),
  { ssr: true }
);

const CoreValueSection = dynamic(
  () => import("@/components/features/about/CoreValueSection"),
  { ssr: true }
);

const EnquirySection = dynamic(
  () => import("@/components/features/contact/EnquirySection"),
  { ssr: true }
);

// ✅ Fetch API function (reuse for both metadata + page)
async function getPageData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/custom/v1/about`,
    { next: { revalidate: 60 } } // ISR optional
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

// import InnerHero from "@/components/common/InnerHero";
// import AboutSection from "@/components/features/about/AboutSection";
// import BrdAdvantageSection from "@/components/common/BrdAdvantageSection";
// import CoreValueSection from "@/components/features/about/CoreValueSection";
// import EnquirySection from "@/components/features/contact/EnquirySection";

// // ✅ Fetch API function (reuse for both metadata + page)
// async function getPageData() {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/wp-json/custom/v1/about`,
//     { next: { revalidate: 60 } } // ISR optional
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

//   // Get banner data (assuming API always returns at least one)
//   const banner = data.banners?.[0] || {};
//   const aboutSection = data.about_section?.[0] || {};
//   const coreValuesData = data.core_values_section?.[0] || {};
//   const advantagesData = data.advantages_section?.[0] || {};
//   const enquiryData = data.enquiry?.[0] || {};
//   return (
//     <>
//       {banner.enable__disable_banner && (
//         <InnerHero
//           title={banner.title || "About Us"}
//           mobileImage={banner.mobile_image?.url || "/images/about_us.webp"}
//           desktopImage={banner.desktop_image?.url || "/images/about_us.webp"}
//           alt={banner.desktop_image?.alt || "About Us Hero"}
//         />
//       )}
//       {aboutSection.enable__disable_about_section && (
//         <AboutSection data={aboutSection} />
//       )}
//       {coreValuesData.enable__disable_core_value_section && (
//         <CoreValueSection data={coreValuesData} />
//       )}
//       {advantagesData.enable__disable_advantages_section && (
//         <BrdAdvantageSection data={advantagesData} />
//       )}
//       {enquiryData.enable__disable_enquiry_section && (
//         <EnquirySection data={enquiryData} />
//       )}
//     </>
//   );
// }
