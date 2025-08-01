"use client";
import Image from "next/image";
import { Text } from "../utils/Text";
import { Heading } from "../utils/Heading";
import { StyledLink } from "../utils/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const sell_car_data = {
  media: {
    path: "/images/sell_background.webp",
    alt: "Background_Image",
  },
  heading: {
    title: "Sell your used car  hassle free",
  },
  description:
    "From timeless elegance to unmatched performance, discover world-renowned automotive brands that define luxury. BRD LUXE brings you an exclusive lineup featuring BMW, Mercedes-Benz, Porsche, Audi, and more — each symbolizing class, innovation, and driving excellence.",
  button: {
    link: "/",
  },
  sell_info_list: [
    {
      media: {
        path: "/images/sell_car_info_1.svg",
        alt: "Audi",
      },
      title: "Showroom or home visit as per  customer’s convenience",
    },
    {
      media: {
        path: "/images/sell_car_info_2.svg",
        alt: "Audi",
      },
      title: "Road test and documentverification",
    },
    {
      media: {
        path: "/images/sell_car_info_3.svg",
        alt: "Audi",
      },
      title: "Proposed Pricing for Customer",
    },
    {
      media: {
        path: "/images/sell_car_info_4.svg",
        alt: "Audi",
      },
      title: "Purchase agreement",
    },
    {
      media: {
        path: "/images/sell_car_info_5.svg",
        alt: "Audi",
      },
      title: "Payment process initiated",
    },
  ],
};

export default function SellCarSection() {
  return (
    <section className="w-full h-auto block py-[95px_185px] border-y border-[#404040] relative z-0 before:w-full before:h-[30%] before:bg-linear-to-b before:from-black before:to-black/0 before:absolute before:top-0 before:-z-1">
      <div className="w-full h-full block absolute inset-0 -z-3">
        <Image
          src={sell_car_data?.media?.path}
          alt={sell_car_data?.media?.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="w-full h-full bg-black/75 absolute inset-0 -z-2"></div>
      <div className="container">
        <div className="max-sm:text-center mb-[30px] sm:mb-[40px] lg:mb-[30px] 2xl:mb-[40px] 3xl:mb-[70px] flex flex-wrap items-center">
          <div className="w-full sm:w-1/2 md:pr-[25%]">
            <Heading
              as="h2"
              size={"heading1"}
              className="text-white max-sm:mb-[15px]"
            >
              {sell_car_data?.heading?.title}
            </Heading>
          </div>
          <div className="w-full sm:w-1/2 sm:pl-[10%]">
            <Text
              as="div"
              className="text-[12px] sm:text-[13px] 2xl:text-[14px] 3xl:text-[16px] leading-[1.7] font-base2 font-normal text-white mb-[30px]"
            >
              {sell_car_data?.description}
            </Text>
            <StyledLink href={sell_car_data?.button?.link}>
              Book A Call
            </StyledLink>
          </div>
        </div>
        <div>
          <Swiper
            modules={[Autoplay]}
            loop={true}
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
                slidesPerView: 5,
                spaceBetween: 140,
              },
            }}
            className="!p-[40px] 2xl:!p-[50px] !m-[-40px] 2xl:!m-[-50px]"
          >
            {sell_car_data?.sell_info_list?.map((item, index) => (
              <SwiperSlide key={`sell_info-${index}`} className="!h-auto">
                <div className="w-full h-full block text-center">
                  <div className="w-full h-auto aspect-square p-[15px] sm:p-[20px] lg:p-[25px] 2xl:p-[30px] 3xl:p-[40px] rounded-full bg-transparent border-1 border-transparent  overflow-hidden flex items-center justify-center transition-all duration-500 hover:bg-[#D9D9D9]/10 hover:border-[#D9D9D9] hover:shadow-[0_0_50px_rgba(255,255,255,0.55)]">
                    <div className="w-[50px] sm:w-[60px] lg:w-[70px] 2xl:w-[80px] 3xl:w-[100px] h-auto aspect-square overflow-hidden flex items-center justify-center relative z-0">
                      <Image
                        src={item?.media?.path}
                        alt={item?.media?.alt}
                        fill
                        sizes="100vw"
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="text-[20px] leading-[1.2] font-medium font-base2 text-white">
                    {item?.title}
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
