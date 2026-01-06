"use client";

import CurvedConnector from "@/components/features/home/CurvedConnector";
import React, { useState } from "react";

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const SellCarsClient = ({ sell_your_car_section }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay]}
        loop={false}
        slidesPerView={2}
        spaceBetween={50}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        speed={1000}
        breakpoints={{
          468: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 80,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 80,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 90,
          },
          1536: {
            slidesPerView: 5,
            spaceBetween: 110,
          },
          1771: {
            slidesPerView: 5,
            spaceBetween: 150,
          },
        }}
        className="!p-[40px] 2xl:!p-[50px] !m-[-40px] 2xl:!m-[-50px] max-sm:!overflow-visible"
      >
        {sell_your_car_section?.sell_info_list?.map((item, index) => (
          <SwiperSlide key={`sell_info-${index}`} className="!h-auto overflow-visible" style={{ width: "20%" }}>
            <div
              className="w-full h-full block text-center relative z-0 group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`text-[32px] sm:text-[38px] lg:text-[48px] 2xl:text-[58px] 3xl:text-[74px] leading-[1.2] font-semibold mb-4 bg-gradient-to-b from-white to-[#3A3838] bg-clip-text text-transparent text-right opacity-50 relative right-[-15%] bottom-[-10%] transition-all duration-500 group-hover:bottom-[1px]`}
              >
                {String(index + 1).padStart(2, "0")}
              </div>
              <div
                className={`w-full h-auto aspect-square rounded-full bg-black/10 backdrop-blur-[20px] border-1 border-[#D9D9D9] mb-[25px] lg:mb-[30px] 2xl:mb-[45px] 3xl:mb-[50px] relative z-0 flex items-center justify-center transition-all duration-500 group-hover:bg-black/50 group-hover:shadow-[0_0_50px_rgba(255,255,255,0.55)] group-hover:-translate-y-[25px]`}
              >
                <div className="w-[35px] sm:w-[40px] lg:w-[45px] 2xl:w-[65px] 3xl:w-[80px] h-auto aspect-square overflow-hidden flex items-center justify-center relative z-0">
                  <Image
                    src={item?.image?.url || "/images/placeholder.jpg"}
                    alt={item?.image?.alt || "icon"}
                    fill
                    sizes="100vw"
                    placeholder="blur"
                    blurDataURL="/images/placeholder.jpg"
                    className="object-contain"
                  />
                </div>
              </div>
              <div
                className={`text-[12px] sm:text-[13px] lg:text-[14px] 2xl:text-[16px] 3xl:text-[20px] leading-[1.2] font-normal font-base2 text-white transition-all duration-500 group-hover:-translate-y-[25px]`}
              >
                {item?.title}
              </div>
              {index < (sell_your_car_section?.sell_info_list?.length ?? 0) - 1 && (
                <div className="absolute left-full top-0 bottom-0 m-auto w-[50px] sm:w-[80px] lg:w-[80px] xl:w-[90px] 2xl:w-[110px] 3xl:w-[150px] h-[60px] z-0">
                  <CurvedConnector isHovered={hoveredIndex === index} isNextHovered={hoveredIndex === index + 1} />
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SellCarsClient;
