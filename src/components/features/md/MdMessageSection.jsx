"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { Heading } from "@/components/utils/Heading";
import BreadCrumb from "@/components/common/BreadCrumb";
import { useInView } from "react-intersection-observer";

const mdMessageData = {
  heading: {
    title: "Dear Valued Customers and Automotive Enthusiasts,",
  },
  description: [
    "Welcome to BRD LUXE, your ultimate destination for luxury pre-owned cars. I am delighted to personally extend my warmest greetings to each and every one of you. At BRD LUXE, we understand that driving is not just a means of transportation; it is an experience that should exude elegance, style, and unparalleled craftsmanship. That's why we have curated a remarkable collection of pre-owned luxury vehicles that are meticulously handpicked and maintained to deliver exceptional quality and performance. We take immense pride in being a trusted destination for discerning individuals who appreciate the finer things in life. Our team of experts tirelessly scours the market to source the most coveted luxury brands, ensuring that we offer you a selection that meets the highest standards of excellence.",
    "But it's not just about the cars themselves; it's the experience we provide. Our commitment to customer satisfaction is unwavering. From the moment you step into our showroom or explore our website, you will be greeted by a team of knowledgeable professionals dedicated to understanding your unique preferences and requirements. We believe in building lasting relationships with our clients, which is why we go above and beyond to ensure your journey with us is nothing short of exceptional.",
    "Transparency and integrity are at the core of our business values. Each vehicle in our collection undergoes a rigorous inspection process to guarantee its authenticity, reliability, and performance. We provide comprehensive vehicle histories, allowing you to make informed decisions and instilling the utmost confidence in your purchase. I firmly believe that luxury should be accessible, and that's why we strive to offer competitive pricing without compromising on quality. Whether you're a connoisseur seeking a rare gem or an individual embarking on your first luxury car journey, we are committed to tailoring our offerings to suit your specific needs and budget. As you navigate through our website, you will find a user-friendly platform that allows you to explore our inventory, inquire about specific models, and We encourage you to reach out to our team with any questions or requests, as we are here to assist you in your pursuit of automotive excellence.",
    "Thank you for considering BRD LUXE as your trusted partner in luxury pre-owned vehicles. We are thrilled to embark on this exhilarating journey with you, and we look forward to delivering an unforgettable experience that exceeds your expectations.",
  ],
  name: "Jijin Surendran",
  designation: "Managing Director & CEO",
  media: {
    type: "image",
    path: "/images/md_message.png",
    alt: "Message",
  },
};

export default function MdMessageSection({ data = mdMessageData }) {
  const isDesktop = useMediaQuery({
    query: "(min-width: 640px)",
  });
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });
  return (
    <section className="w-full h-auto py-[20px_40px] sm:py-[25px_70px] lg:py-[30px_90px] 2xl:py-[30px_110px] 3xl:py-[40px_150px] block">
      <div className="container">
        {!isDesktop && (
          <div className="mb-[20px]">
            <BreadCrumb
              items={[
                { label: "Home", href: "/" },
                { label: "MD’s message", href: "/md" },
              ]}
            />
          </div>
        )}
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
              src={data?.media?.path}
              alt={data?.media?.alt}
              width={340}
              height={600}
              className="w-full h-full object-contain"
            />
          </motion.div>
          <div className="w-fit h-full flex flex-col justify-between">
            <div className="text-[54px] sm:text-[64px] lg:text-[100px] 2xl:text-[120px] 3xl:text-[150px] leading-[0.8] font-normal font-base1 text-transparent bg-clip-text bg-gradient-to-b from-[#171717] via-[#333333] via-55% to-[#171717]">
              BRD <br /> LUXE
            </div>
            <div className="text-right">
              <div className="text-[24px] sm:text-[27px] lg:text-[35px] 2xl:text-[44px] 3xl:text-[55px] leading-[1] font-light font-base1 text-white">
                {data?.name}
              </div>
              <div className="text-[12px] sm:text-[14px] lg:text-[16px] 2xl:text-[18px] 3xl:text-[23px] leading-[1.2] font-light font-base1 text-[#868686]">
                {data?.designation}
              </div>
            </div>
          </div>
        </div>
        <div>
          {isDesktop && (
            <div className="sm:mb-[50px] lg:mb-[70px] 2xl:mb-[80px] 3xl:mb-[110px]">
              <BreadCrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "MD’s message", href: "/md" },
                ]}
              />
            </div>
          )}
          <Heading
            as="h1"
            size={"heading1"}
            className="!leading-[1] text-white mb-[20px] sm:mb-[20px] md:mb-[30px] 2xl:mb-[35px] 3xl:mb-[40px]"
          >
            {data?.heading?.title}
          </Heading>
          {data?.description?.map((item, index) => (
            <p
              key={`description-${index}`}
              className="text-[12px] lg:text-[13px] 2xl:text-[16px] 3xl:text-[20px] leading-[1.8] font-light font-base2 text-white mb-[15px] md:mb-[20px] 2xl:mb-[40px] 3xl:mb-[40px]"
            >
              {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
