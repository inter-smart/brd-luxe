"use client";
import Image from "next/image";
import { Heading } from "../../utils/Heading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const journey_frame_data = {
  heading: {
    title: "Our Journey in Frames",
  },
  frames_list: [
    {
      media: {
        path: "/images/journey_1.webp",
        alt: "Frame 1",
      },
    },
    {
      media: {
        path: "/images/journey_2.webp",
        alt: "Frame 2",
      },
    },
    {
      media: {
        path: "/images/journey_3.webp",
        alt: "Frame 3",
      },
    },
    {
      media: {
        path: "/images/journey_4.webp",
        alt: "Frame 4",
      },
    },
    {
      media: {
        path: "/images/journey_5.webp",
        alt: "Frame 5",
      },
    },
    {
      media: {
        path: "/images/journey_6.webp",
        alt: "Frame 6",
      },
    },
    {
      media: {
        path: "/images/journey_4.webp",
        alt: "Frame 4",
      },
    },
  ],
};

export default function JourneyFrameSection() {
  return (
    <section className="w-full h-auto py-[40px] sm:py-[50px] lg:py-[75px] 2xl:py-[90px] 3xl:py-[110px] block">
      <div className="container">
        <div className="w-full h-auto mb-[30px] lg:mb-[40px] 2xl:mb-[50px] 3xl:mb-[60px]">
          <Heading as="div" size={"heading1"} className="text-white max-sm:text-center">
            {journey_frame_data?.heading?.title}
          </Heading>
        </div>
        <div className="w-full h-auto">
          <Swiper
            modules={[Autoplay]}
            loop={true}
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
            {journey_frame_data?.frames_list?.map((item, index) => (
              <SwiperSlide key={`product_slide-${index}`} className="!h-auto">
                <div className="w-full h-full block">
                  <div className="group w-full h-auto aspect-[275/300] overflow-hidden flex items-center justify-center relative z-0">
                    <Image
                      src={item?.media?.path}
                      alt={item?.media?.alt}
                      fill
                      sizes="100vw"
                      className="object-cover transition-all duration-500 ease-in-out group-hover:scale-110"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
