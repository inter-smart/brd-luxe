"use client";
import Image from "next/image";
import { Text } from "../../utils/Text";
import { Heading } from "../../utils/Heading";
import { StyledLink } from "../../utils/Button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const dealer_data = {
  heading: {
    title: "Welcome To BRD LUXE",
    description:
      "Discover a handpicked collection of pre-owned luxury cars from world-renowned brands like BMW, Mercedes-Benz, Jaguar, Audi, and more. At BRD LUXE, we ensure every car is meticulously inspected with state-of-the-art diagnostic tools, offering you the perfect blend of quality and value.",
  },
  media: {
    path: "/images/dealer_home.webp",
  },
  title: "India's Only Stock Exchange - Listed LuxuryCar Dealers",
};

export default function DealerSection({ data = dealer_data }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-150px", once: false });
  const fadeUp = (delay = 0) => {
    const isSmallScreen =
      typeof window !== "undefined" && window.innerWidth < 768;

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
    <section className="w-full h-auto block py-[40px_60px] sm:py-[50px_90px] lg:py-[60px_130px] 2xl:py-[70px_150px] 3xl:py-[90px_200px]">
      <div className="container">
        <div className="[&>*]:max-md:text-center [&>*]:w-full [&>*]:md:w-1/3 md:space-x-[20px] lg:space-x-[35px] 2xl:space-x-[45px] 3xl:space-x-[60px] flex items-center max-md:flex-col">
          {/* <motion.div {...fadeUp()} className="max-md:mb-[40px]"> */}
          <div className="max-md:mb-[40px]">
            <Heading
              as="h1"
              size={"heading1"}
              className="text-white mb-[15px] sm:mb-[20px] 2xl:mb-[25px] 3xl:mb-[35px]"
            >
              {data?.heading?.title}
            </Heading>
            <Text as="div" size={"text1"} className="text-white">
              {data?.heading?.description}
            </Text>
          </div>
          <div className="max-sm:max-w-[280px] max-md:!w-[320px] md:w-full h-auto aspect-[510/645] overflow-hidden flex items-center justify-center">
            {/* <motion.div
              ref={ref}
              initial={{ opacity: 0, height: "50%" }}
              animate={
                isInView
                  ? { opacity: 1, height: "100%" }
                  : { opacity: 0.5, height: "50%" }
              }
              transition={{ duration: 0.8, ease: "easeInOut" }} */}
            <div className="w-full h-full relative z-0 max-sm:mb-[30px] max-md:mb-[40px]">
              <Image
                src={data?.media?.path}
                alt={data?.media?.path}
                fill
                sizes="100vw"
                className="object-cover transition-all duration-300 ease-in-out group-hover:scale-105 "
              />
            </div>
          </div>
          {/* <motion.div {...fadeUp()}> */}
          <div>
            <Heading
              as="h1"
              size={"heading1"}
              className="text-white mb-[20px] sm:mb-[30px] lg:mb-[45px] 2xl:mb-[55px] 3xl:mb-[70px]"
            >
              {data?.title}
            </Heading>
            <StyledLink href="/">Learn More</StyledLink>
            {/* </motion.div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
