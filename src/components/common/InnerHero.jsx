import Image from "next/image";

export default function InnerHero({
  title,
  desktopImage,
  mobileImage,
  alt,
  className,
}) {
  return (
    <section className="w-full h-auto min-h-[376px] xl:min-h-[468px] 2xl:min-h-[576px] 3xl:min-h-[768px] relative z-0 flex items-end py-[30px] sm:py-[40px] xl:py-[50px] 2xl:py-[60px]">
      <picture className="w-full h-full absolute -z-1 inset-0">
        <source media="(min-width: 640px)" srcSet={desktopImage}></source>
        <Image
          src={mobileImage}
          alt={alt}
          fill
          sizes="100vw"
          className="-z-1 object-cover"
          priority
        />
      </picture>
      <div className="w-full h-full bg-gradient-to-t from-black to-transparent pointer-events-none absolute -z-1 top-0 left-0 bg-black/10" />
      <div className="container">
        <h1 className="text-[22px] sm:text-[26px] lg:text-[34px] xl:text-[48px] 2xl:text-[52px] 3xl:text-[64px] leading-none font-light font-base1 uppercase text-white">
          {title}
        </h1>
      </div>
    </section>
  );
}
