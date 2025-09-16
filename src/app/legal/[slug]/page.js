import PrivacySection from '@/components/features/privacy/privacySection'

// ✅ Reusable fetch
async function getPageData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/brd/v1/privacy-policy`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Privacy Policy data");
  }

  return res.json();
}

// ✅ Dynamic Metadata
export async function generateMetadata() {
  const data = await getPageData();

  return {
    title: data?.seo?.title,
    description: data?.seo?.description,
  };
}

export default async function page() {

  const data = await getPageData();

  return (
    <>
      <PrivacySection data={data} />
    </>
  )
}
