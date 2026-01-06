import OfferSectionClient from "@/components/clientWrappers/Home/OfferSection/OfferSectionClient";

export default function OfferSection({ data }) {
  return (
    <section className="w-full h-full !overflow-hidden">
      <OfferSectionClient data={data} />
    </section>
  );
}
