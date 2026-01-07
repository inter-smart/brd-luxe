import dynamic from "next/dynamic";

const Brands = dynamic(() => import("@/components/clientWrappers/Home/BrandsSection/Brands"), { ssr: true });
import BrandSectionImage from "./BrandSectionImage";
import BrandSectionTitles from "./BrandSectionTitles";

export default function BrandSection({ data }) {
  const brands_section = data?.brands_section;

  return brands_section?.enable__disable_brands_section ? (
    <section className="w-full h-auto block py-[40px_50px] sm:py-[55px_70px] lg:py-[70px_110px] 2xl:py-[85px_130px] 3xl:py-[110px_170px] overflow-hidden relative z-0 before:w-full before:h-[30%] before:bg-linear-to-b before:from-black before:to-black/0 before:absolute before:top-0 before:z-0 after:w-full after:h-[30%] after:bg-linear-to-b after:from-black/0 after:to-black after:absolute after:bottom-0 after:z-0">
      <div className="w-full h-full bg-black/10 absolute inset-0 z-0"></div>
      <BrandSectionImage brands_section={brands_section} />
      <div className="container">
        <BrandSectionTitles brands_section={brands_section} />
        <Brands brands_section={brands_section} />
      </div>
    </section>
  ) : null;
}
