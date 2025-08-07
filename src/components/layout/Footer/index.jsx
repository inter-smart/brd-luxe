"use client";
import Image from "next/image";
import Link from "next/link";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

const footer_data = {
  logo: {
    src: "/images/footer_logo.svg",
    alt: "logo",
  },
  quickLinks: {
    left_links: [
      {
        label: "Our Car Collections",
        url: "/",
      },
      {
        label: "Our Showroom",
        url: "/",
      },
    ],
    right_links: [
      {
        label: "Terms",
        url: "/",
      },
      {
        label: "Privacy",
        url: "/",
      },
    ],
  },
  socialMedia: {
    links: [
      {
        url: "/",
        icon: "/images/footer_faceook.svg",
        name: "facebook",
      },
      {
        url: "/",
        icon: "/images/footer_youtube.svg",
        name: "youtube",
      },
      {
        url: "/",
        icon: "/images/footer_instagram.svg",
        name: "instagram",
      },
      {
        url: "/",
        icon: "/images/footer_linkedin.svg",
        name: "linkedin",
      },
      {
        url: "/",
        icon: "/images/footer_twitter.svg",
        name: "twitter",
      },
    ],
  },
  get_updates: {
    placeholder: ["Get Luxe Updates", "Let's Talk Luxury", "Get Car Info"],
  },
  footer_tle: {
    title: "BRD LUXE",
  },
};

export default function Footer() {
  return (
    <footer className="w-full h-auto py-[40px] lg:py-[50px] 2xl:py-[60px] 3xl:py-[75px] overflow-hidden block">
      <div className="container relative">
        <div className="w-full h-full mb-[30px] sm:mb-[40px] lg:mb-[50px] 2xl:mb-[70px] pt-[50px] flex flex-wrap items-center justify-between">
          <div className="w-full sm:w-1/3 [&>*]:w-full [&>*]:sm:w-1/2 flex flex-wrap">
            {footer_data?.quickLinks?.left_links.map((item, index) => (
              <div
                key={`quick links ${index}`}
                className={`sm:text-[14px] lg:text-[16px] 2xl:text-[20px] 3xl:text-[25px] leading-[1.2] font-light font-base1 text-white max-sm:text-center max-sm:mb-[5px] break-inside-avoid transition duration-300 hover:text-white/50 
                  ${index % 2 === 0 ? "sm:text-left" : "sm:text-right"}`}
              >
                <Link href={item?.url}>{item?.label}</Link>
              </div>
            ))}
          </div>
          <div className="w-full sm:w-1/3 flex flex-col items-center max-sm:absolute top-0 left-0 right-0 mx-auto">
            <Link
              href={"/"}
              className="w-[120px] sm:w-[140px] lg:w-[180px] 2xl:w-[224px] h-auto aspect-[224/40] flex items-center justify-center relative z-0"
            >
              <Image
                src={footer_data?.logo.src}
                alt={footer_data?.logo.alt}
                fill
                sizes="100px"
                className="object-contain"
              />
            </Link>
          </div>
          <div className="w-full sm:w-1/3 [&>*]:w-full [&>*]:sm:w-1/2 flex flex-wrap">
            {footer_data?.quickLinks?.right_links.map((item, index) => (
              <div
                key={`quick links ${index}`}
                className={`sm:text-[14px] lg:text-[16px] 2xl:text-[20px] 3xl:text-[25px] leading-[1.2] font-light font-base1 text-white max-sm:text-center max-sm:mb-[5px] break-inside-avoid relative z-0
                  ${index % 2 === 0 ? "sm:text-left" : "sm:text-right"}`}
              >
                <Link className="transition duration-300 hover:text-white/50" href={item?.url}>
                  {item?.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-auto mb-[25px] sm:mb-[30px] lg:mb-[40px] 2xl:mb-[50px] 3xl:mb-[60px] flex items-center justify-center">
          <ul className="flex space-x-[15px] sm:space-x-[40px] lg:space-x-[50px] 2xl:space-x-[70px] 3xl:space-x-[90px]">
            {footer_data?.socialMedia?.links.map((item, index) => (
              <li key={`social media ${index}`}>
                <a
                  target="_blank"
                  href={item?.url}
                  className="w-[15px] lg:w-[17px] 2xl:w-[20px] h-auto aspect-square flex items-center justify-center relative z-0 transition hover:opacity-40"
                >
                  <Image
                    src={item?.icon}
                    alt={item?.name}
                    fill
                    sizes="24px"
                    className="object-contain"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <PlaceholdersAndVanishInput
            placeholders={footer_data.get_updates?.placeholder}
            label="Submit"
          />
        </div>
        <TextHoverEffect
          duration={1.5}
          className="!text-[65px] sm:!text-[130px] md:!text-[160px] lg:!text-[210px] xl:!text-[250px] 2xl:!text-[305px] 3xl:!text-[370px] leading-[1] !font-medium font-base1 text-center w-full text-nowrap"
          text={footer_data?.footer_tle?.title}
        />
        <div className=" w-full h-auto mt-[10px] flex max-sm:flex-col items-center justify-center sm:justify-between">
          <div className="text-[10px] sm:text-[12px] 2xl:text-[14px] 3xl:text-[16px] leading-[1.2] font-normal font-base3 text-white max-sm:mb-[10px]">
            © 2025 BRD LUXE . All rights reserved
          </div>
          <div className="text-[10px] sm:text-[12px] 2xl:text-[14px] 3xl:text-[16px] leading-[1.2] font-normal font-base2 text-white flex items-center">
            Designed By:
            <a href="">
              <Image
                src="/images/intersmart_logo.svg"
                alt="Inter Smarts"
                width={100}
                height={100}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
