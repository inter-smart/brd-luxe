"use client";

import { useState, useRef } from "react";
import { Heading } from "../../utils/Heading";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// chunk into groups of 3 only (since both layouts use 3 images)

function createSlideGroups(data) {
  const slides = [];
  for (let i = 0; i < data.length; i += 3) {
    slides.push(data.slice(i, i + 3));
  }
  return slides;
}

export default function FlagshipSection({ data }) {
  const flagship_section = data?.showroom_acf?.flagship_section;

  const images = flagship_section?.flagship_location_images ?? [];
  const slides = createSlideGroups(images);

  const placeholder = "/images/placeholder.jpg";
  const img = (group, n) => group[n]?.url ?? placeholder;
  const alt = (group, n) => group[n]?.alt ?? "flagship image";

  const [activeIndex, setActiveIndex] = useState(0);

  return flagship_section?.enable__disable_flagship_section === true ? (
    <section className="relative py-[40px_60px]">
      <div className="container">
        <Heading
          as="h2"
          size="heading1"
          className="text-white mb-[20px] xl:mb-[30px]"
        >
          {flagship_section?.title}
        </Heading>
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            loop={true}
            spaceBetween={10}
            breakpoints={{
              320: { slidesPerView: 1 },
              1024: { slidesPerView: 2 },
            }}
            speed={800}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            onBeforeInit={(swiper) => setActiveIndex(swiper.realIndex)}
            navigation={{
              prevEl: ".btn-prev",
              nextEl: ".btn-next",
            }}
            className="h-[280px] sm:h-[350px] lg:h-[450px] xl:h-[570px] 2xl:h-[680px] 3xl:h-[850px]"
          >
            {slides.map((group, index) => {
              const useLayoutB = index % 2 === 1;

              return (
                <SwiperSlide key={index} className="h-full">
                  {useLayoutB ? (
                    // Layout A
                    <div className="w-full h-full flex gap-1 lg:gap-3">
                      <div className="w-1/2 h-full flex flex-col gap-1 lg:gap-3">
                        <div className="relative w-full h-1/2 overflow-hidden">
                          <div className="w-full h-full ">
                            <Image
                              src={img(group, 0)}
                              alt=""
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className="relative w-full h-1/2 overflow-hidden">
                          <div className="w-full h-full">
                            <Image
                              src={img(group, 1)}
                              alt=""
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="relative w-1/2 h-full overflow-hidden">
                        <Image
                          src={img(group, 2)}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ) : (
                    // Layout B
                    <div className="w-full h-full  flex flex-col gap-1 lg:gap-3">
                      <div className="flex w-full h-1/2 gap-1 lg:gap-3">
                        <div className="relative w-1/2 h-full overflow-hidden">
                          <div className="w-full h-full">
                            <Image
                              src={img(group, 0)}
                              alt=""
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className="relative w-1/2 h-full  overflow-hidden">
                          <div className="w-full h-full">
                            <Image
                              src={img(group, 1)}
                              alt=""
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="relative w-full h-1/2 overflow-hidden gap-1 lg:gap-3">
                        <div className="w-full h-full">
                          <Image
                            src={img(group, 2)}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>
          {/* Navigation Arrows */}
          <div className="flex items-center justify-center absolute top-0 bottom-0 w-full">
            <button
              className="btn-prev absolute left-[0px] lg:left-[-55px] lg:top-1/2 lg:-translate-y-1/2 z-10
                                bg-gradient-to-r from-[#E4E4E4] to-[#FFFFFF] 
                                shadow w-[20px] lg:w-[34px] h-[38px] flex items-center justify-center lg:rounded-[30px_0px_0px_30px] cursor-pointer group
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
              className="btn-next absolute right-[0px] lg:right-[-55px] lg:top-1/2 lg:-translate-y-1/2 z-10 
                                bg-gradient-to-r from-[#E4E4E4] to-[#FFFFFF] 
                                shadow w-[20px] lg:w-[34px] h-[38px] flex items-center justify-center lg:rounded-[0px_30px_30px_0px] group cursor-pointer hover:bg-[#2E4C99] 
                                disabled:pointer-events-none disabled:opacity-[0.2] "
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
  ) : null;
}
