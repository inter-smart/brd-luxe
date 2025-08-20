"use client";

import { Heading } from "../../utils/Heading";
import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const showroom = [
  {
    icon: "/images/brd_icon1.svg",
    title: "Luxe Lounge Waiting Areas ",
  },
  {
    icon: "/images/brd_icon2.svg",
    title: "Personal Sales Advisors ",
  },
  {
    icon: "/images/brd_icon3.svg",
    title: "On-Display Premium Maruti Models",
  },
  {
    icon: "/images/brd_icon4.svg",
    title: "In-House Finance & Exchange Assistance",
  },
  {
    icon: "/images/brd_icon5.svg",
    title: "Customer Refreshment Zones",
  },
];

export default function WhatWitsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="pb-[40px] lg:pb-[65px] xl:pb-[85px] 2xl:pb-[90px] 3xl:pb-[130px]">
      <div className="container">
        <Heading
          as="h2"
          size="heading1"
          className="text-white mb-[20px] sm:mb-[20px] xl:mb-[25px] 2xl:mb-[30px]"
        >
          What Awaits You at BRD Luxe Showrooms
        </Heading>

        <div className="relative z-1">
          <Swiper
            spaceBetween={0}
            modules={[Navigation, Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            speed={800}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            onBeforeInit={(swiper) => setActiveIndex(swiper.realIndex)}
            navigation={{
              prevEl: ".await-btn",
              nextEl: ".await-next",
            }}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              420: {
                slidesPerView: 2.3,
                spaceBetween: 10,
              },
              578: {
                slidesPerView: 2.5,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
              1661: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
            }}
          >
            {showroom.map((item, index) => (
              <SwiperSlide key={index} className="!h-auto">
                <div
                  className="w-full h-full p-[10px_20px] xl:p-[15px_20px] 2xl:p-[20px] 3xl:p-[25px_30px] bg-gradient-to-tr 
                                  from-[rgba(217,217,217,0)] to-[rgba(115,115,115,0.1)]
                                  border-[1px] border-solid border-white/10 rounded-[10px] backdrop-blur-[20px] 
                                  shadow-sm transition duration-300 hover:border-white/20 hover:from-[rgba(217,217,217,0.1)] hover:translate-y-1"
                >
                  <div className="max-w-[30px] md:max-w-[35px] lg:max-w-[45px] xl:max-w-[55px] 2xl:max-w-[80px] 3xl:max-w-[100px] mb-[30px] xl:mb-[40px] 2xl:mb-[45px] 3xl:mb-[60px]">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={50}
                      height={50}
                      className="h-auto aspect-square object-contain"
                    />
                  </div>
                  <h3
                    className="text-[12px] sm:text-[14px] sm:leading-[14px] xl:text-[20px] xl:leading-[20px]  2xl:text-[24px] 2xl:leading-[30px]  
                                        3xl:text-[30px] 3xl:leading-[30px] font-light font-base1 line-clamp-2 text-white"
                  >
                    {item.title}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center absolute top-0 bottom-0 w-full">
            <button
              className="await-btn absolute left-0 lg:top-1/2 lg:-translate-y-1/2 z-10
                            bg-gradient-to-r from-[#e4e4e4c5] to-[#FFFFFF] 
                            shadow w-[15px] h-[25px] flex items-center justify-center cursor-pointer group
                            hover:bg-[#2E4C99] disabled:pointer-events-none disabled:opacity-[0.2]"
            >
              <svg
                width="7"
                height="13"
                viewBox="0 0 7 13"
                fill="none"
                className="group-hover:invert-100"
              >
                <path
                  d="M6.14364 0.699707L0.769531 6.12544L6.14364 12.1834"
                  stroke="black"
                />
              </svg>
            </button>

            <button
              className="await-next absolute right-0 lg:top-1/2 lg:-translate-y-1/2 z-10 
                            bg-gradient-to-r from-[#e4e4e4c5] to-[#FFFFFF] 
                            shadow w-[15px] h-[25px] flex items-center justify-center  group cursor-pointer hover:bg-[#2E4C99] 
                            disabled:pointer-events-none disabled:opacity-[0.2]"
            >
              <svg
                width="7"
                height="13"
                viewBox="0 0 7 13"
                fill="none"
                className="group-hover:invert-100"
              >
                <path
                  d="M0.817302 0.699707L6.19141 6.12544L0.817302 12.1834"
                  stroke="black"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
