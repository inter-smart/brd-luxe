import PrivacySection from '@/components/features/privacy/privacySection'

export default async function page() {
  // Fetch privacy policy data from WP API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/brd/v1/terms-conditions`,
    { next: { revalidate: 60 } } // ISR optional
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Terms and Conditions data");
  }

  const data = await res.json();
  return (
    <>
      <PrivacySection data={data} />
    </>
  )
}
