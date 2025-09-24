"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { Heading } from "@/components/utils/Heading";
import BreadCrumb from "@/components/common/BreadCrumb";
import { useInView } from "react-intersection-observer";

export default function MdMessageSection({ data }) {
  const isDesktop = useMediaQuery({
    query: "(min-width: 640px)",
  });
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const message_section = data?.md_message_acf?.message_section;

  if (!message_section?.enable__disable_message_section) return null;

  return (
    <section className="w-full h-auto py-[20px_40px] sm:py-[25px_70px] lg:py-[30px_90px] 2xl:py-[30px_110px] 3xl:py-[40px_150px] block">
      <div className="container">
        {!isDesktop && (
          <div className="mb-[20px]">
            <BreadCrumb
              items={[
                { label: "Home", href: "/" },
                { label: data.title, href: "/md" },
              ]}
            />
          </div>
        )}
        {message_section?.enable__disable_image_section && (
          <div
            ref={ref}
            className="w-[310px] 3xs:w-[380px] sm:w-1/2 h-auto aspect-[810/650] p-[35px_30px] sm:p-[35px_30px] lg:p-[50px_40px] 2xl:p-[60px_35px] 3xl:p-[0px_45px_75px_45px] bg-linear-to-b from-[#000000] to-[#1A1A1A] max-sm:mx-auto sm:float-right sm:m-[0_0_5%_5%] max-sm:mb-[25px] overflow-hidden relative z-0"
          >
            <motion.div
              key={inView ? "visible" : "hidden"}
              initial={{ opacity: 0, y: 150, scale: 0.8 }}
              animate={
                inView
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 150, scale: 0.8 }
              }
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-[140px] 3xs:w-[170px] sm:w-[125px] md:w-[150px] lg:w-[225px] 2xl:w-[270px] 3xl:w-[340px] h-auto aspect-[340/600] absolute z-1 bottom-[-5px] right-[5%]"
            >
              <Image
                src={message_section?.image?.url || "/images/placeholder.jpg"}
                alt={message_section?.image?.alt || "banner"}
                width={340}
                height={600}
                placeholder="blur"
                blurDataURL="/images/placeholder.jpg"
                className="w-full h-full object-contain"
              />
            </motion.div>
            <div className="w-fit h-full flex flex-col justify-between">
              <div className="text-[54px] sm:text-[64px] lg:text-[100px] 2xl:text-[120px] 3xl:text-[150px] leading-[0.8] font-normal font-base1 text-transparent bg-clip-text bg-gradient-to-b from-[#171717] via-[#333333] via-55% to-[#171717] [-webkit-text-fill-color:transparent]">
                BRD <br /> LUXE
              </div>
              <div className="text-right [background:none] [-webkit-text-fill-color:initial]">
                <div className="text-[24px] sm:text-[27px] lg:text-[35px] 2xl:text-[44px] 3xl:text-[55px] leading-[1] font-light font-base1 text-white">
                  {message_section?.name ?? ""}
                </div>
                <div className="text-[12px] sm:text-[14px] lg:text-[16px] 2xl:text-[18px] 3xl:text-[23px] leading-[1.2] font-light font-base1 text-[#868686]">
                  {message_section?.designation ?? ""}
                </div>
              </div>
            </div>
          </div>
        )}
        <div>
          {isDesktop && (
            <div className="sm:mb-[50px] lg:mb-[70px] 2xl:mb-[80px] 3xl:mb-[110px]">
              <BreadCrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: data.title, href: "/md" },
                ]}
              />
            </div>
          )}
          <Heading
            as="h1"
            size={"heading1"}
            className="!leading-[1] text-white mb-[20px] sm:mb-[20px] md:mb-[30px] 2xl:mb-[35px] 3xl:mb-[40px]"
          >
            {message_section?.title}
          </Heading>
          {message_section?.message_descriptions
            ?.filter((item) => item?.text && item.text.trim() !== "") // ✅ remove empty ones
            .map((item, index) => (
              <p
                key={`description-${index}`}
                className="text-[12px] lg:text-[13px] 2xl:text-[16px] 3xl:text-[20px] leading-[1.8] font-light font-base2 text-white mb-[15px] md:mb-[20px] 2xl:mb-[40px] 3xl:mb-[40px]"
                dangerouslySetInnerHTML={{ __html: item.text }}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
