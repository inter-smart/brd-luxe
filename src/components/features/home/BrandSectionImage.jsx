import Image from "next/image";

export default function BrandSectionImage({ brands_section }) {
  return (
    <div className="w-full h-full block absolute inset-0 -z-1">
      <Image
        src={brands_section?.background_image?.url || "/images/placeholder.jpg"}
        alt={brands_section?.background_image?.alt}
        fill
        sizes="100vw"
        placeholder="blur"
        blurDataURL="/images/placeholder.jpg"
        className="object-cover -z-2 blur-[5px]"
      />
    </div>
  );
}
