"use client";
import Image from "next/image";
import { Text } from "../../utils/Text";
import { Heading } from "../../utils/Heading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const brands_data = {
  media: {
    path: "/images/brand_bg.webp",
    alt: "Background_Image",
  },
  heading: {
    title: "Explore Iconic Luxury Brands",
  },
  description:
    "From timeless elegance to unmatched performance, discover world-renowned automotive brands that define luxury. BRD LUXE brings you an exclusive lineup featuring BMW, Mercedes-Benz, Porsche, Audi, and more — each symbolizing class, innovation, and driving excellence.",
  brand_list: [
    {
      media: {
        path: "/images/brand_1.png",
        alt: "Audi",
      },
    },
    {
      media: {
        path: "/images/brand_2.png",
        alt: "Jaguar",
      },
    },
    {
      media: {
        path: "/images/brand_3.png",
        alt: "BMW",
      },
    },
    {
      media: {
        path: "/images/brand_4.png",
        alt: "Land Rover",
      },
    },
    {
      media: {
        path: "/images/brand_5.png",
        alt: "Lexus",
      },
    },
    {
      media: {
        path: "/images/brand_6.png",
        alt: "Benz",
      },
    },
    {
      media: {
        path: "/images/brand_7.png",
        alt: "Text-content",
      },
    },
    {
      media: {
        path: "/images/brand_8.png",
        alt: "Porsche",
      },
    },
    {
      media: {
        path: "/images/brand_5.png",
        alt: "Lexus",
      },
    },
  ],
};

export default function BrandSection({ data = brands_data }) {
  return (
    <section className="w-full h-auto block py-[40px_50px] sm:py-[55px_70px] lg:py-[70px_110px] 2xl:py-[85px_130px] 3xl:py-[110px_170px] overflow-hidden relative z-0 before:w-full before:h-[30%] before:bg-linear-to-b before:from-black before:to-black/0 before:absolute before:top-0 before:z-0 after:w-full after:h-[30%] after:bg-linear-to-b after:from-black/0 after:to-black after:absolute after:bottom-0 after:z-0">
      <div className="w-full h-full bg-black/10 absolute inset-0 z-0"></div>
      <div className="w-full h-full block absolute inset-0 -z-1">
        <Image
          src={data?.media?.path}
          alt={data?.media?.alt}
          fill
          sizes="100vw"
          className="object-cover -z-2 blur-[5px]"
        />
      </div>
      <div className="container">
        <div className="max-sm:text-center mb-[15px] sm:mb-[10px] flex flex-wrap items-center relative z-2">
          <div className="w-full sm:w-[35%] sm:pr-[15%]">
            <Heading
              as="h2"
              size={"heading1"}
              className="text-white max-sm:mb-[15px]"
            >
              {data?.heading?.title}
            </Heading>
          </div>
          <div className="w-full sm:w-1/2 ml-auto">
            <Text
              as="div"
              className="text-[12px] 2xl:text-[14px] 3xl:text-[16px] leading-[1.7] font-base2 font-normal text-white"
            >
              {data?.description}
            </Text>
          </div>
        </div>
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
              slidesPerView: 8,
              spaceBetween: 15,
            },
          }}
          className="!p-[40px] 2xl:!p-[50px] !m-[-40px] 2xl:!m-[-50px]"
        >
          {data?.brand_list?.map((item, index) => (
            <SwiperSlide key={`brand-${index}`} className="!h-auto">
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
