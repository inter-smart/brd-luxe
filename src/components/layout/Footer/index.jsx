"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { toast } from "sonner";
import SocialMediaComp from "@/components/common/SocialMediaComp";

const footer_data = {
  get_updates: {
    placeholder: ["Get Luxe Updates", "Let's Talk Luxury", "Get Car Info"],
  },
  footer_tle: {
    title: "BRD LUXE",
  },
};

export default function Footer() {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    async function fetchFooter() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/wp-json/brd/v1/footer`,
          { cache: "no-store" }
        );
        const data = await res.json();
        setFooterData(data?.footer_acf || null);
      } catch (err) {
        console.error("Footer fetch failed", err);
      }
    }
    fetchFooter();
  }, []);

  if (!footerData) return null; // or loading spinner

  const midIndex = Math.ceil(footerData?.quick_links?.length / 2);
  const leftLinks = footerData?.quick_links?.slice(0, midIndex);
  const rightLinks = footerData?.quick_links?.slice(midIndex);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const email = e.target.email?.value || e.target[0]?.value;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email"); // 👈 replaced alert
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/wp-json/brd/v1/newsletter`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      toast.success(data.message || "You have been subscribed successfully 🎉"); // 👈 replaced alert
    } catch (err) {
      console.error("Subscription failed", err);
      toast.error("Something went wrong, please try again."); // 👈 replaced alert
    }
  };

  return (
    <footer className="w-full h-auto border-t border-[#202020]/50 py-[40px] lg:py-[40px] 2xl:py-[60px] 3xl:py-[75px] overflow-hidden block">
      <div className="container relative">
        <div className="w-full h-full mb-[20px] sm:mb-[40px] lg:mb-[40px] 2xl:mb-[70px] max-sm:pt-[50px] flex flex-wrap items-center justify-between">
          <div className="w-full sm:w-1/3 [&>*]:w-full [&>*]:sm:w-1/2 flex flex-wrap">
            {leftLinks?.map(
              (item, index) =>
                item?.link?.url &&
                item?.title && (
                  <div
                    key={`quick-left-${index}`}
                    className={`text-[13px] sm:text-[14px] lg:text-[16px] 2xl:text-[20px] 3xl:text-[25px] 
                leading-[1.2] font-light font-base1 text-white 
                max-sm:text-center max-sm:mb-[5px] break-inside-avoid 
                transition duration-300 hover:text-white/50 sm:text-left`}
                  >
                    <Link href={item?.link?.url} target={item?.link?.target}>
                      {item?.title}
                    </Link>
                  </div>
                )
            )}
          </div>
          <div className="w-full sm:w-1/3 flex flex-col items-center max-sm:absolute top-0 left-0 right-0 mx-auto">
            {footerData?.footer_logo?.url && (
              <Link
                href={"/"}
                className="w-[120px] sm:w-[140px] lg:w-[140px] 2xl:w-[224px] h-auto aspect-[224/40] flex items-center justify-center relative z-0"
              >
                <Image
                  src={footerData.footer_logo.url || "/images/placeholder.jpg"}
                  alt={footerData.footer_logo.alt || "footer logo"}
                  fill
                  sizes="100px"
                  className="object-contain"
                />
              </Link>
            )}
          </div>
          <div className="w-full sm:w-1/3 [&>*]:w-full [&>*]:sm:w-1/2 flex flex-wrap">
            {rightLinks?.map(
              (item, index) =>
                item?.link?.url &&
                item?.title && (
                  <div
                    key={`quick-right-${index}`}
                    className={`text-[13px] sm:text-[14px] lg:text-[16px] 2xl:text-[20px] 3xl:text-[25px] 
                leading-[1.2] font-light font-base1 text-white 
                max-sm:text-center max-sm:mb-[5px] break-inside-avoid 
                transition duration-300 hover:text-white/50 sm:text-right`}
                  >
                    <Link href={item?.link?.url} target={item?.link?.target}>
                      {item?.title}
                    </Link>
                  </div>
                )
            )}
          </div>
        </div>
        {footerData?.enable__disable_social_media_icons &&
          footerData?.social_media_icons?.length > 0 && (
            <div className="w-full h-auto mb-[25px] sm:mb-[30px] lg:mb-[40px] 2xl:mb-[50px] 3xl:mb-[60px] flex items-center justify-center">
              <ul className="flex space-x-[20px] lg:space-x-[55px] 2xl:space-x-[60px] 3xl:space-x-[80px]">
                {footerData.social_media_icons.map(
                  (item, index) =>
                    item?.icon?.url && (
                      <li key={`social-${index}`}>
                        <a
                          href={item?.link?.url}
                          target="_blank"
                          className="w-[12px] lg:w-[14px] 2xl:w-[20px] h-auto aspect-square flex items-center justify-center relative z-0 transition hover:opacity-40"
                        >
                          <Image
                            src={item.icon.url || "/images/placeholder.jpg"}
                            alt={item.icon.alt || item.icon.title || "social"}
                            width={20}
                            height={20}
                            placeholder="blur"
                            blurDataURL="/images/placeholder.jpg"
                            className="w-full h-full object-contain"
                          />
                        </a>
                      </li>
                    )
                )}
              </ul>
            </div>
          )}
        <div>
          <PlaceholdersAndVanishInput
            placeholders={
              footerData?.newsletter_placeholders?.map((p) => p.placeholder) ||
              []
            }
            label="Submit"
            onSubmit={handleSubscribe}
          />
        </div>
        {footerData?.fancy_title && (
          <TextHoverEffect
            duration={1.5}
            className="!text-[65px] sm:!text-[130px] md:!text-[160px] lg:!text-[210px] xl:!text-[250px] 2xl:!text-[305px] 3xl:!text-[370px] leading-[1] !font-medium font-base1 text-center w-full text-nowrap max-sm:pt-[15px]"
            text={footerData?.fancy_title}
          />
        )}
        <div className=" w-full h-auto mt-[10px] flex max-sm:flex-col items-center justify-center sm:justify-between">
          <div className="text-[10px] 2xl:text-[14px] 3xl:text-[16px] leading-[1.2] font-normal font-base3 text-white max-sm:mb-[10px]">
            © {new Date().getFullYear()} BRD LUXE . All rights reserved
          </div>
          <div className="text-[10px] 2xl:text-[14px] 3xl:text-[16px] leading-[1.2] font-normal font-base2 text-white flex items-center">
            <span className="pr-2">Designed By:</span>
            <a
              href="https://www.intersmartsolution.com/"
              target="_blank"
              aria-label="Intersmart Solution"
              className="w-[70px] 3xl:w-[120px] h-auto aspect-[80/15] flex items-center justify-center"
            >
              <Image
                src="/images/intersmart_logo.svg"
                alt="Inter Smarts"
                width={100}
                height={100}
                className="w-full h-full object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
