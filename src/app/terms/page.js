import PrivacySection from "@/components/features/privacy/privacySection";

// 🔹 Reusable fetch
async function getPageData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/brd/v1/terms-conditions`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Terms and Conditions data");
  }

  return res.json();
}

// 🔹 Metadata
export async function generateMetadata() {
  const data = await getPageData();

  return {
    title: data?.seo?.title,
    description:
      data?.seo?.description,
  };
}

export default async function Page() {
  const data = await getPageData();

  return (
    <>
      <PrivacySection data={data} />
    </>
  );
}
