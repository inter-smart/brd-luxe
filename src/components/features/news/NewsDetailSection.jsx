"use client";
import BreadCrumb from "@/components/common/BreadCrumb";
import { Heading } from "@/components/utils/Heading";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";

export default function NewsDetailSection({ data }) {
  const sanitizedDescription = DOMPurify.sanitize(data?.content);
  const formattedDate = new Date(data?.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return (
    <section className="w-full h-auto py-[10px_40px] sm:py-[15px_60px] xl:py-[20px_80px] 2xl:py-[30px_100px] 3xl:py-[40px_120px]">
      <div className="container">
        <div className="w-full mb-[30px] sm:mb-[40px] xl:mb-[60px] 2xl:mb-[60px] 3xl:mb-[80px]">
          <BreadCrumb
            items={[
              { label: "Home", href: "/" },
              { label: data?.pagetitle || "News & Insights", href: "/news" },
              { label: data?.title || "News Details", href: "/" },
            ]}
          />
        </div>
        <Heading
          as="h2"
          size="heading2"
          className="text-white mb-[15px] sm:mb-[15px] xl:mb-[20px] 2xl:mb-[30px]"
        >
          {data?.title}
        </Heading>
        <div className="group w-full h-auto aspect-1720/560 overflow-hidden relative z-0 mb-[15px] sm:mb-[15px] xl:mb-[20px] 2xl:mb-[30px]">
          <Image
            src={data?.media?.path}
            alt={data?.media?.alt}
            fill
            sizes="1720px"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        </div>
        <div className="text-[10px] sm:text-[12px] xl:text-[14px] 2xl:text-[16px] leading-normal font-normal font-base3 text-white mb-[10px] sm:mb-[15px] xl:mb-[20px]">
          {formattedDate}
        </div>
        <div
          className="typography"
          dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
        />        
      </div>
    </section>
  );
}
