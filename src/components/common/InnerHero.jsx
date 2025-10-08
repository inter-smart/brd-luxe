import Image from "next/image";

export default function InnerHero({ title, desktopImage, mobileImage, alt }) {
  return (
    <section className="w-full h-auto min-h-[376px] xl:min-h-[468px] 2xl:min-h-[576px] 3xl:min-h-[768px] border-b border-[#202020] relative z-0 flex items-end py-[30px] sm:py-[40px] xl:py-[50px] 2xl:py-[60px]">
      <picture className="w-full h-full absolute -z-1 inset-0">
        <source media="(max-width: 640px)" srcSet={mobileImage}></source>
        <Image
          src={desktopImage || "/images/placeholder.jpg"}
          alt={alt}
          fill
          sizes="100vw"
          className="-z-1 object-cover"
          priority={true}
          placeholder="blur"
          blurDataURL="/images/placeholder.jpg"
        />
      </picture>
      <div className="w-full h-full bg-gradient-to-t from-black via-40% via-transparent to-transparent pointer-events-none absolute -z-1 top-0 left-0 bg-[rgba(0,0,0,0.05)]" />
      <div className="container">
        <h1 className="text-[22px] sm:text-[26px] lg:text-[34px] xl:text-[48px] 2xl:text-[52px] 3xl:text-[64px] leading-none font-light font-base1 uppercase text-white">
          {title}
        </h1>
      </div>
    </section>
  );
}
