"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heading } from "@/components/utils/Heading";
import { Text } from "@/components/utils/Text";
import { StyledLink } from "@/components/utils/Button";

export default function DealerSectionClient({ data }) {
  const dealers_section = data?.dealers_section;

  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-150px", once: false });
  const fadeUp = (delay = 0) => {
    const isSmallScreen = typeof window !== "undefined" && window.innerWidth < 768;

    if (isSmallScreen) {
      return {
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0 },
      };
    }
    return {
      initial: { opacity: 0, y: "0%" },
      animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: "20%" },
      transition: { duration: 0.7, ease: "easeOut", delay },
    };
  };

  return (
    <>
      <motion.div {...fadeUp()} className="max-md:mb-[40px]">
        <Heading as="h1" size={"heading1"} className="text-white mb-[15px] sm:mb-[20px] 2xl:mb-[25px] 3xl:mb-[35px]">
          {dealers_section?.heading}
        </Heading>
        <Text as="div" size={"text1"} className="text-white">
          {dealers_section?.description}
        </Text>
      </motion.div>
      <div className="max-sm:max-w-[280px] max-md:!w-[320px] md:w-full h-auto aspect-[510/645] overflow-hidden flex items-center justify-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, height: "50%" }}
          animate={isInView ? { opacity: 1, height: "100%" } : { opacity: 0.5, height: "50%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="w-full h-full relative z-0 max-sm:mb-[30px] max-md:mb-[40px]"
        >
          <Image
            src={dealers_section?.image?.url || "/images/placeholder.jpg"}
            alt={dealers_section?.image?.alt}
            fill
            sizes="100vw"
            placeholder="blur"
            blurDataURL="/images/placeholder.jpg"
            className="object-cover transition-all duration-300 ease-in-out group-hover:scale-105 "
          />
        </motion.div>
      </div>
      <motion.div {...fadeUp()}>
        <Heading as="h1" size={"heading1"} className="text-white mb-[20px] sm:mb-[30px] lg:mb-[45px] 2xl:mb-[55px] 3xl:mb-[70px]">
          {dealers_section?.right_side_title}
        </Heading>
        {dealers_section?.button_url?.url && dealers_section?.button_title && (
          <StyledLink href={dealers_section?.button_url?.url} target={dealers_section?.button_url?.target}>
            {dealers_section?.button_title}
          </StyledLink>
        )}
      </motion.div>
    </>
  );
}
