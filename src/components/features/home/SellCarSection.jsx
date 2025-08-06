"use client";
import Image from "next/image";
import { Text } from "../../utils/Text";
import { Heading } from "../../utils/Heading";
import { StyledLink } from "../../utils/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const sell_car_data = {
  media: {
    path: "/images/sell_background.webp",
    alt: "Background_Image",
  },
  heading: {
    title: "Sell your used car hassle free",
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
      title: "Showroom or home visit as per customer’s convenience",
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
    {
      media: {
        path: "/images/sell_car_info_5.svg",
        alt: "Audi",
      },
      title: "Payment process initiated",
    },
  ],
};

export default function SellCarSection({data = sell_car_data}) {
  return (
    <section className="w-full h-auto block py-[40px_50px] sm:py-[50px_70px] lg:py-[60px_90px] 2xl:py-[80px_150px] 3xl:py-[95px_185px] border-y border-[#404040] relative z-0 before:w-full before:h-[30%] before:bg-linear-to-b before:from-black before:to-black/0 before:absolute before:top-0 before:-z-1">
      <div className="w-full h-full block absolute inset-0 -z-3">
        <Image
          src={data?.media?.path}
          alt={data?.media?.alt}
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
              {data?.heading?.title}
            </Heading>
          </div>
          <div className="w-full sm:w-1/2 sm:pl-[10%]">
            <Text
              as="div"
              className="text-[12px] sm:text-[13px] 2xl:text-[14px] 3xl:text-[16px] leading-[1.7] font-base2 font-normal text-white mb-[30px]"
            >
              {data?.description}
            </Text>
            <StyledLink href={data?.button?.link}>
              Book A Call
            </StyledLink>
          </div>
        </div>
        <div>
          <Swiper
            modules={[Autoplay]}
            loop={false}
            slidesPerView={2}
            spaceBetween={15}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            speed={800}
            breakpoints={{
              468: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
              1536: {
                slidesPerView: 5,
                spaceBetween: 80,
              },
              1771: {
                slidesPerView: 5,
                spaceBetween: 120,
              },
            }}
            className="!p-[40px] 2xl:!p-[50px] !m-[-40px] 2xl:!m-[-50px]"
          >
            {data?.sell_info_list?.map((item, index) => (
              <SwiperSlide
                key={`sell_info-${index}`}
                className="!h-auto overflow-visible"
              >
                {({ isActive }) => (
                  <div
                    className={`w-full h-full block text-center relative z-0 ${
                      isActive && " "
                    }`}
                  >
                    <div className="text-[32px] sm:text-[38px] lg:text-[48px] 2xl:text-[58px] 3xl:text-[74px] leading-[1.2] font-semibold mb-4 bg-gradient-to-b from-white to-[#3A3838] bg-clip-text text-transparent text-right opacity-50 relative right-[-15%] bottom-[-10%]">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div
                      className={`w-full h-auto aspect-square p-[15px] sm:p-[20px] lg:p-[45px] 3xl:p-[60px_75px] rounded-full bg-transparent border-1 border-[#D9D9D9] mb-[25px] lg:mb-[30px] 2xl:mb-[45px] 3xl:mb-[60px] relative z-0 flex items-center justify-center transition-all duration-500 ${
                        isActive &&
                        "bg-[#D9D9D9]/10 shadow-[0_0_50px_rgba(255,255,255,0.55)]"
                      }`}
                    >
                      <div className="w-[50px] sm:w-[40px] lg:w-[50px] 2xl:w-[70px] 3xl:w-[100px] h-auto aspect-square overflow-hidden flex items-center justify-center relative z-0">
                        <Image
                          src={item?.media?.path}
                          alt={item?.media?.alt}
                          fill
                          sizes="100vw"
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="text-[12px] sm:text-[13px] lg:text-[14px] 2xl:text-[16px] 3xl:text-[20px] leading-[1.2] font-medium font-base2 text-white">
                      {item?.title}
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
