import dynamic from "next/dynamic";

const OfferSectionClient = dynamic(() => import("@/components/clientWrappers/Home/OfferSection/OfferSectionClient"), { ssr: true });

export default function OfferSection({ data }) {
  return (
    <section className="w-full h-full !overflow-hidden">
      <OfferSectionClient data={data} />
    </section>
  );
}
