import dynamic from "next/dynamic";

// Keep InnerHero static (above the fold)
import InnerHero from "@/components/common/InnerHero";

// Dynamically import all below-the-fold sections
const SellInfoSection = dynamic(
  () => import("@/components/features/sell/SellInfoSection"),
  { ssr: true }
);

const VideoSection = dynamic(
  () => import("@/components/features/sell/VideoSection"),
  { ssr: true }
);

const HowWorkSection = dynamic(
  () => import("@/components/features/sell/HowWorkSection"),
  { ssr: true }
);

const SellNowSection = dynamic(
  () => import("@/components/features/sell/SellNowSection"),
  { ssr: true }
);

const FaqSection = dynamic(
  () => import("@/components/features/sell/FaqSection"),
  { ssr: true }
);

// 🔹 Reusable fetch function
async function getPageData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/brd/v1/sellyourcar`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// 🔹 Metadata injection
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
  const banner = data?.sell_your_car_acf?.banner;

  return (
    <>
      {banner?.enable__disable_banner === true && (
        <InnerHero
          title={banner?.title ?? ""}
          mobileImage={banner?.mobile_image?.url || "/images/placeholder.jpg"}
          desktopImage={banner?.desktop_image?.url || "/images/placeholder.jpg"}
          alt={banner?.desktop_image?.alt ?? "banner"}
        />
      )}

      <SellInfoSection data={data} />
      <VideoSection data={data} />
      <HowWorkSection data={data} />
      <SellNowSection data={data} />
      <FaqSection data={data} />
    </>
  );
}

// import InnerHero from "@/components/common/InnerHero";
// import FaqSection from "@/components/features/sell/FaqSection";
// import HowWorkSection from "@/components/features/sell/HowWorkSection";
// import SellInfoSection from "@/components/features/sell/SellInfoSection";
// import SellNowSection from "@/components/features/sell/SellNowSection";
// import VideoSection from "@/components/features/sell/VideoSection";
// import { Suspense } from "react";

// // 🔹 Reusable fetch function
// async function getPageData() {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/wp-json/brd/v1/sellyourcar`,
//     { next: { revalidate: 60 } }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

// // 🔹 Metadata injection
// export async function generateMetadata() {
//   const data = await getPageData();

//   return {
//     title:
//       data?.seo?.title,
//     description:
//       data?.seo?.description,
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
//   const banner = data?.sell_your_car_acf?.banner;

//   return (
//     <>
//       {banner?.enable__disable_banner === true && (
//         <InnerHero
//           title={banner?.title ?? ""}
//           mobileImage={banner?.mobile_image?.url || "/images/placeholder.jpg"}
//           desktopImage={banner?.desktop_image?.url || "/images/placeholder.jpg"}
//           alt={banner?.desktop_image?.alt ?? "banner"}
//         />
//       )}

//       <Suspense fallback={<div>Loading...</div>}>
//         <SellInfoSection data={data} />
//         <VideoSection data={data} />
//         <HowWorkSection data={data} />
//         <SellNowSection data={data} />
//         <FaqSection data={data} />
//       </Suspense>
//     </>
//   );
// }
