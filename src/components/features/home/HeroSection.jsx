import HeroSectionClient from "@/components/clientWrappers/Home/HeroSectionClient";

export default function HeroSection({ data }) {
  return (
    <section className="w-full h-[570px] sm:h-screen flex items-center justify-center relative z-0">
      <HeroSectionClient data={data} />
    </section>
  );
}
