"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const JourneyFrameClient = ({ journey_in_frames_section }) => {
  return (
    <div className="w-full h-auto">
      <Swiper
        modules={[Autoplay]}
        loop={journey_in_frames_section?.images?.length > 1}
        slidesPerView={2}
        spaceBetween={8}
        autoplay={{
          delay: 1800,
          disableOnInteraction: false,
        }}
        speed={500}
        breakpoints={{
          640: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
          1536: {
            slidesPerView: 6,
            spaceBetween: 15,
          },
        }}
      >
        {journey_in_frames_section?.images?.map((item, index) => (
          <SwiperSlide key={`product_slide-${index}`} className="!h-auto">
            <div className="w-full h-full block">
              <div className="group w-full h-auto aspect-[275/300] overflow-hidden flex items-center justify-center relative z-0">
                <Image
                  src={item?.url}
                  alt={item?.alt}
                  fill
                  sizes="100vw"
                  placeholder="blur"
                  blurDataURL="/images/placeholder.jpg"
                  className="object-cover transition-all duration-500 ease-in-out group-hover:scale-110"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default JourneyFrameClient;
