"use client";
import Image from "next/image";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import BreadCrumb from "@/components/common/BreadCrumb";
import { useInView } from "react-intersection-observer";
import { ShineBorder } from "@/components/magicui/shine-border";

const about_section_data = {
  heading: {
    title: "Welcome To",
  },
  logo_media: {
    path: "/images/logo.svg",
    alt: "Logo",
  },
  description: [
    "We pride ourselves in our inventory that includes used luxury cars of renowed brands like BMW, Mercedes-Benz, Jaguar, Audi, Land Rover, Mini, Volvo etc. Every single car in our stock are thoroughly evaluated using the latest diagnostic tools to make sure our prices reflect true market value and peace of mind to our customers.",
    "From the moment you arrive at our doorstep to the moment you receive the keys to your new ride, we provide you with an engaging and stress-free experience. We precisely know the importance of honesty, integrity and transparency in the automobile industry as we have been in this space for decades.",
  ],
  counter_list: [
    {
      value: 20,
      label: "Car Available",
    },
    {
      value: 100,
      label: "Car Sold",
    },
    {
      value: 4.7,
      label: "Google Reviews",
    },
    {
      value: "98.50",
      label: "Customer Satisfaction",
    },
  ],
  title: "BRD LUXE",
  media: {
    path: "/images/aboutus_media.webp",
    alt: "BRD LUXE",
  },
};

export default function AboutSection({ data }) {
  const { ref, inView } = useInView({
    threshold: 0.4,
    triggerOnce: false,
  });

  return (
    <section className="w-full h-auto py-[20px_40px] sm:py-[30px_50px] lg:py-[30px_75px] 2xl:py-[40px_90px] 3xl:py-[45px_115px] overflow-hidden block">
      <div className="container lg:!pr-0">
        <div className="mb-[20px] sm:mb-[30px] lg:mb-[40px] 2xl:mb-[50px] 3xl:mb-[70px]">
          <BreadCrumb
            items={[
              { label: "Home", href: "/" },
              { label: data?.pagetitle || "About", href: "/about" },
            ]}
          />
        </div>
        <div className="w-full h-auto flex flex-wrap max-lg:flex-col-reverse">
          <div className="w-full lg:w-1/2 lg:pr-[25px] xl:pr-[50px] 2xl:pr-[60px] 3xl:pr-[80px]">
            <div className="mb-[30px] 2xl:mb-[65px] 3xl:mb-[80px] max-sm:text-center">
              <div className="text-[18px] sm:text-[22px] lg:text-[27px] 2xl:text-[32px] 3xl:text-[40px] leading-[1.5] font-normal font-base1 text-white mb-[10px] sm:mb-[15px] 2xl:mb-[25px]">
                {data.title}
              </div>
              <div className="w-[140px] sm:w-[180px] lg:w-[230px] 2xl:w-[270px] 3xl:w-[340px] h-auto aspect-[340/100] max-sm:mx-auto mb-[15px] lg:mb-[20px] 3xl:mb-[30px] overflow-hidden flex items-center justify-center">
                <Image
                  src={data?.logo?.url || "/images/placeholder.jpg"}
                  alt={data?.logo?.alt || "logo"}
                  width={340}
                  height={100}
                  placeholder="blur"
                  blurDataURL="/images/placeholder.jpg"
                  className="w-full h-full object-contain"
                />
              </div>
              {data?.description?.map((item, index) => (
                <p
                  key={`description-${index}`}
                  className="text-[12px] sm:text-[13px] lg:text-[14px] 2xl:text-[16px] 3xl:text-[20px] leading-[1.5] font-light font-base2 text-white 2xl:max-w-[570px] 3xl:max-w-[700px] mb-[10px] sm:mb-[15px] lg:mb-[25px] 2xl:mb-[30px] 3xl:mb-[35px] last:mb-0"
                >
                  {item.content}
                </p>
              ))}
            </div>
            <div
              className="w-full h-auto mx-[-5px] sm:mx-[-8px] 2xl:mx-[-12px] [&>*]:w-1/2 [&>*]:sm:w-1/4 [&>*]:p-[5px] [&>*]:sm:p-[8px] [&>*]:2xl:p-[12px] flex flex-wrap"
              ref={ref}
            >
              {data?.counters?.map(
                (item, index) =>
                  item?.value && (
                    <div key={`count-${index}`} className="h-auto">
                      <div className="w-full h-full p-[15px] 3xl:p-[20px] rounded-[10px] overflow-hidden flex flex-col justify-between relative z-0">
                        <div className="w-full h-full bg-linear-to-r from-[#D9D9D9] to-[#737373] absolute inset-0 z-[-1] block opacity-[5%]"></div>
                        <div className="mb-[7px] sm:mb-[10px] 2xl:mb-[15px] 3xl:mb-[20px] flex">
                          <CountUp
                            key={`${inView}-${index}`}
                            start={0}
                            end={item?.value}
                            duration={1.5}
                            decimals={
                              item?.value % 1 !== 0
                                ? item?.value.toString().split(".")[1]
                                    ?.length || 0
                                : 0
                            }
                            className="text-[18px] sm:text-[20px] lg:text-[25px] 2xl:text-[32px] 3xl:text-[40px] leading-[1] font-normal font-base3 text-white"
                          />
                          <span className="text-[18px] sm:text-[20px] lg:text-[25px] 2xl:text-[32px] 3xl:text-[40px] leading-[1] font-normal font-base3 text-white">
                            {item?.label === "Customer Satisfaction"
                              ? "%"
                              : "+"}
                          </span>
                        </div>
                        <div className="text-[13px] sm:text-[14px] lg:text-[16px] 2xl:text-[20px] 3xl:text-[25px] leading-[1.2] font-normal font-base1 text-white">
                          {item?.label}
                        </div>
                        <ShineBorder
                          borderWidth={1}
                          shineColor={["#4a4a4a"]}
                          duration={10 + (index % 5) * 1.5}
                        />
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
          <div className="w-full lg:w-1/2 mb-[35px] lg:mb-0">
            <div className="w-full h-auto max-3xs:max-w-[100%] max-lg:max-w-[60%] max-lg:mx-auto flex relative z-0">
              <motion.div
                initial={{ opacity: 0.5 }}
                animate={inView ? { opacity: 0.5 } : { opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-[44px] sm:text-[82px] lg:text-[100px] 2xl:text-[120px] 3xl:text-[150px] font-normal font-base1 text-[#272727] rotate-180 [writing-mode:vertical-rl] w-fit h-fit bg-linear-to-b from-[#000000] to-[#1A1A1A] lg:absolute -z-1 left-0 lg:top-[-18%]"
              >
                {data?.animation_title}
              </motion.div>
              <div className="w-[220px] sm:w-[340px] lg:w-[400px] 2xl:w-[485px] 3xl:w-[610px] h-auto aspect-[610/755] ml-auto flex items-center justify-center">
                <Image
                  src={data?.image?.url || "/images/placeholder.jpg"}
                  alt={data?.image?.alt || "about image"}
                  width={610}
                  height={755}
                  placeholder="blur"
                  blurDataURL="/images/placeholder.jpg"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
