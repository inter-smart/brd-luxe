"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Text } from "@/components/utils/Text";
import { Heading } from "@/components/utils/Heading";
import { ShineBorder } from "../magicui/shine-border";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const best_cars_data = {
  heading: {
    title: "Best Luxury Cars in India",
    description:
      "Experience unparalleled elegance and cutting-edge performance with our finest selection of luxury cars in India.",
  },
  cars_list: [
    {
      url: "/",
      media: {
        path: "/images/car_list_1.png",
        alt: "SUV",
      },
      title: "SUV",
    },
    {
      url: "/",
      media: {
        path: "/images/car_list_2.png",
        alt: "Sedan",
      },
      title: "Sedan",
    },
    {
      url: "/",
      media: {
        path: "/images/car_list_3.png",
        alt: "MUV",
      },
      title: "MUV",
    },
    {
      url: "/",
      media: {
        path: "/images/car_list_4.png",
        alt: "Super Luxury",
      },
      title: "Super Luxury",
    },
    {
      url: "/",
      media: {
        path: "/images/car_list_5.png",
        alt: "Coupe",
      },
      title: "Coupe",
    },
    {
      url: "/",
      media: {
        path: "/images/car_list_4.png",
        alt: "Super Luxury",
      },
      title: "Super Luxury",
    },
  ],
};

export default function BestCarsSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  return (
    <section className="w-full h-auto block py-[70px_50px] border-y-1 border-[#404040]">
      <div className="container">
        <div className="mb-[50px] flex justify-between">
          <div className="w-1/2">
            <Heading
              as="h1"
              size={"heading1"}
              className="text-white max-sm:text-center"
            >
              {best_cars_data?.heading?.title}
            </Heading>
          </div>
          <div className="w-1/2">
            <Text as="div" size={"text1"} className="text-white">
              {best_cars_data?.heading?.description}
            </Text>
          </div>
        </div>
        <div className="w-full h-auto">
          <Swiper
            modules={[Autoplay]}
            loop={true}
            spaceBetween={0}
            slidesPerView={3}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              reverseDirection: true,
            }}
            speed={1000}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 4, spaceBetween: 10 },
              1920: { slidesPerView: 5, spaceBetween: 10 },
            }}
          >
            {best_cars_data?.cars_list?.map((item, index) => (
              <SwiperSlide key={`slide-${index}`} className="!h-auto">
                <Link
                  href={item?.url}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group w-full h-full p-[60px_30px_35px_30px] rounded-[10px] overflow-hidden block relative z-0"
                >
                  <div className="w-full h-full bg-linear-to-r from-[#D9D9D9] to-[#737373] absolute inset-0 -z-1 opacity-0 group-hover:opacity-5"></div>
                  <ShineBorder
                    borderWidth={2}
                    shineColor={["#252529"]}
                    className={"opacity-0 group-hover:opacity-100 "}
                  />
                  <motion.div
                    animate={hoveredIndex === index ? "wiggle" : "still"}
                    variants={{
                      still: { x: 0 },
                      wiggle: {
                        x: [-5, 5, -2, 2, -1, 1, 0],
                        transition: {
                          duration: 1.5,
                          ease: "easeInOut",
                          repeat: Infinity,
                        },
                      },
                    }}
                    className="w-full h-auto aspect-[230/65] mb-[20px] flex items-center justify-center relative z-0"
                  >
                    <Image
                      src={item?.media?.path}
                      alt={item?.media?.alt}
                      fill
                      sizes="100vw, 230px"
                      className="object-contain transition duration-300"
                    />
                  </motion.div>
                  <div className="flex items-center justify-center">
                    <Text
                      as="div"
                      className="text-[12px] sm:text-[13px] lg:text-[14px] 2xl:text-[16px] 3xl:text-[16px] leading-[1.4] font-normal font-base2 uppercase tracking-[2px] max-sm:text-center text-white"
                    >
                      {item?.title}
                    </Text>
                    <span className="w-[10px] h-auto aspect-square ml-[15px] opacity-0 flex items-center justify-center transition duration-200 group-hover:opacity-100">
                      <svg
                        width="15"
                        height="12"
                        viewBox="0 0 4 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.33333 3.66659C3.33333 3.74409 3.30618 3.82167 3.25195 3.88083L0.474181 6.91113C0.36564 7.02954 0.189878 7.02954 0.0814058 6.91113C-0.0270659 6.79272 -0.0271353 6.60098 0.0814058 6.48265L2.66278 3.66659L0.0814056 0.850535C-0.0271356 0.732126 -0.0271356 0.540383 0.0814055 0.42205C0.189947 0.303717 0.36571 0.303641 0.474181 0.42205L3.25195 3.45235C3.30618 3.51152 3.33333 3.58909 3.33333 3.66659Z"
                          fill="#D2C8C8"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
