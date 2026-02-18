import dynamic from "next/dynamic";

const HeroSectionClient = dynamic(() => import("@/components/clientWrappers/Home/HeroSectionClient"), { ssr: true });

export default function HeroSection({ data }) {
  return (
    <section className="w-full h-[570px] sm:h-screen flex items-center justify-center relative z-0">
      <HeroSectionClient data={data} />
    </section>
  );
}
