"use client";
import CarMotion from "./CarMotion";
import SpeedCarAnimation from "./SpeedCarAnimation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Link from "next/link";
import { useState } from "react";
import { ShineBorder } from "@/components/magicui/shine-border";
import { Text } from "@/components/utils/Text";

export default function BestCarsClient({ best_cars_section }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  return (
    <div className="w-full h-auto">
      <Swiper
        modules={[Autoplay]}
        loop={best_cars_section?.models?.length > 1}
        slidesPerView={1}
        spaceBetween={0}
        autoplay={{
          delay: 300000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
          reverseDirection: true,
        }}
        speed={800}
        breakpoints={{
          468: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1920: { slidesPerView: 5 },
        }}
      >
        {best_cars_section?.models?.map((item, index) => (
          <SwiperSlide key={`slide-${index}`} className="!h-auto">
            <Link
              href={`/buy_a_car?model=${item?.slug}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group w-full h-full p-[20px_10px_15px_10px] sm:p-[30px_15px_20px_15px] lg:p-[40px_20px_25px_20px] 2xl:p-[60px_30px_35px_30px] rounded-[10px] overflow-hidden block relative z-0"
            >
              <div className="w-full h-full bg-linear-to-r from-[#D9D9D9] to-[#737373] absolute inset-0 -z-1 opacity-0 group-hover:opacity-5"></div>
              <ShineBorder borderWidth={2} shineColor={["#252529"]} className={"opacity-0 group-hover:opacity-100 "} />
              <div className="relative w-full h-auto ">
                <CarMotion item={item} hovered={hoveredIndex === index} />
                <SpeedCarAnimation isActive={hoveredIndex === index} />
              </div>
              <div className="flex items-center justify-center">
                <Text
                  as="div"
                  className="text-[11px] lg:text-[12px] 2xl:text-[14px] 3xl:text-[16px] leading-[1] font-normal font-base2 uppercase tracking-[2px] max-sm:text-center text-white"
                >
                  {item?.name}
                </Text>
                <span className="w-[10px] h-auto aspect-square ml-[5px] 2xl:ml-[10px] 3xl:ml-[15px] transform scale-[0.8] 2xl:scale-100 opacity-0 flex items-center justify-center transition duration-200 group-hover:opacity-100">
                  <svg width="15" height="12" viewBox="0 0 4 7" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  );
}
