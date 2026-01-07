import dynamic from "next/dynamic";

const FiltersData = dynamic(() => import("@/components/clientWrappers/Home/ProductSection/FiltersData"), { ssr: true });

export default function ProductSection({ data, whatsapp }) {
  return (
    <section className="w-full h-auto py-[40px_50px] sm:py-[45px_70px] lg:py-[55px_95px] 2xl:py-[65px_110px] 3xl:py-[85px_140px] border-b-1 border-[#404040]/40 block">
      <div className="container">
        <FiltersData data={data} whatsapp={whatsapp} />;
      </div>
    </section>
  );
}
