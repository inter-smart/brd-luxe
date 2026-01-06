"use client";
import Image from "next/image";
import Link from "next/link"; // ✅ Add Link
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function Brands({ brands_section }) {
  return (
    <Swiper
      modules={[Autoplay]}
      loop={brands_section?.brand_logos?.length > 1}
      slidesPerView={3}
      spaceBetween={10}
      autoplay={{
        delay: 1500,
        disableOnInteraction: false,
      }}
      speed={800}
      breakpoints={{
        640: {
          slidesPerView: 5,
        },
        768: {
          slidesPerView: 6,
        },
        1024: {
          slidesPerView: 8,
        },
        1536: {
          slidesPerView: 8,
          spaceBetween: 15,
        },
      }}
      className="!p-[40px] 2xl:!p-[50px] !m-[-40px] 2xl:!m-[-50px]"
    >
      {brands_section?.brand_logos?.map((item, index) => (
        <SwiperSlide key={`brand-${index}`} className="!h-auto">
          {item.is_empty ? (
            // ❌ Brand is empty → just show logo without link
            <div className="w-full h-auto aspect-square p-[15px] sm:p-[20px] lg:p-[25px] 2xl:p-[30px] 3xl:p-[40px] rounded-full bg-transparent border-1 border-transparent  overflow-hidden flex items-center justify-center transition-all duration-500 hover:bg-[#D9D9D9]/10 hover:border-[#D9D9D9] hover:shadow-[0_0_50px_rgba(255,255,255,0.55)]">
              <div className="w-[50px] sm:w-[60px] lg:w-[70px] 2xl:w-[80px] 3xl:w-[100px] h-auto aspect-square overflow-hidden flex items-center justify-center relative z-0">
                <Image
                  src={item?.image?.url || "/images/placeholder.jpg"}
                  alt={item?.image?.alt || "Logo"}
                  fill
                  sizes="100vw"
                  placeholder="blur"
                  blurDataURL="/images/placeholder.jpg"
                  className="object-contain"
                />
              </div>
            </div>
          ) : (
            // ✅ Brand has cars → wrap in link
            <Link href={`/buy_a_car?brand=${item?.slug}`} className="block w-full h-auto">
              <div className="w-full h-auto aspect-square p-[15px] sm:p-[20px] lg:p-[25px] 2xl:p-[30px] 3xl:p-[40px] rounded-full bg-transparent border-1 border-transparent overflow-hidden flex items-center justify-center transition-all duration-500 hover:bg-[#D9D9D9]/10 hover:border-[#D9D9D9] hover:shadow-[0_0_50px_rgba(255,255,255,0.55)]">
                <div className="w-[50px] sm:w-[60px] lg:w-[70px] 2xl:w-[80px] 3xl:w-[100px] h-auto aspect-square overflow-hidden flex items-center justify-center relative z-0">
                  <Image
                    src={item?.image?.url || "/images/placeholder.jpg"}
                    alt={item?.image?.alt || "Logo"}
                    fill
                    sizes="100vw"
                    placeholder="blur"
                    blurDataURL="/images/placeholder.jpg"
                    className="object-contain"
                  />
                </div>
              </div>
            </Link>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
