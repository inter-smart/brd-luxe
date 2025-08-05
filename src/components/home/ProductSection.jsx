"use client";
import Link from "next/link";
import { useState } from "react";
import { Heading } from "../utils/Heading";
import ProductCard from "../common/ProductCard";
import { useMediaQuery } from "react-responsive";
import ProductFilterBox from "../common/ProductFilterBox";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const product_data = {
  heading: {
    title: "Luxury Lineup",
  },
  product_list: [
    {
      media: {
        path: "/images/product_1.webp",
        alt: "RANGE ROVER VELAR",
      },
      title: "RANGE ROVER VELAR",
      kilo_meter: "km - 20000 KM",
      mileage: "Mileage - 10 KM ",
      price: "₹ 18 000 000",
      link: "/",
      enquire_link: "/",
      status: true,
    },
    {
      media: {
        path: "/images/product_2.webp",
        alt: "bmw x5",
      },
      title: "bmw x5",
      kilo_meter: "km - 20000 KM",
      mileage: "Mileage - 10 KM ",
      price: "₹ 20 000 000",
      link: "/",
      enquire_link: "/",
      status: false,
    },
    {
      media: {
        path: "/images/product_3.webp",
        alt: "Mercedes-Benz E-Class",
      },
      title: "Mercedes-Benz E-Class",
      kilo_meter: "km - 20000 KM",
      mileage: "Mileage - 10 KM ",
      price: "₹ 21 000 000",
      link: "/",
      enquire_link: "/",
      status: true,
    },
    {
      media: {
        path: "/images/product_4.webp",
        alt: "RANGE ROVER",
      },
      title: "RANGE ROVER",
      kilo_meter: "km - 20000 KM",
      mileage: "Mileage - 10 KM ",
      price: "₹ 22 000 000",
      link: "/",
      enquire_link: "/",
      status: true,
    },
    {
      media: {
        path: "/images/product_4.webp",
        alt: "RANGE ROVER",
      },
      title: "RANGE ROVER",
      kilo_meter: "km - 20000 KM",
      mileage: "Mileage - 10 KM ",
      price: "₹ 22 000 000",
      link: "/",
      enquire_link: "/",
      status: true,
    },
    {
      media: {
        path: "/images/product_3.webp",
        alt: "Mercedes-Benz E-Class",
      },
      title: "Mercedes-Benz E-Class",
      kilo_meter: "km - 20000 KM",
      mileage: "Mileage - 10 KM ",
      price: "₹ 21 000 000",
      link: "/",
      enquire_link: "/",
      status: true,
    },
    {
      media: {
        path: "/images/product_2.webp",
        alt: "bmw x5",
      },
      title: "bmw x5",
      kilo_meter: "km - 20000 KM",
      mileage: "Mileage - 10 KM ",
      price: "₹ 20 000 000",
      link: "/",
      enquire_link: "/",
      status: true,
    },
    {
      media: {
        path: "/images/product_1.webp",
        alt: "RANGE ROVER VELAR",
      },
      title: "RANGE ROVER VELAR",
      kilo_meter: "km - 20000 KM",
      mileage: "Mileage - 10 KM ",
      price: "₹ 18 000 000",
      link: "/",
      enquire_link: "/",
      status: true,
    },
  ],
};

export default function ProductSection() {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery({
    query: "(min-width: 640px)",
  });
  return (
    <section className="w-full h-auto py-[40px_50px] sm:py-[45px_70px] lg:py-[55px_95px] 2xl:py-[65px_110px] 3xl:py-[85px_140px] border-b-1 border-[#404040] block">
      <div className="container">
        <div className="mb-[25px] lg:mb-[35px] 2xl:mb-[45px] 3xl:mb-[55px] flex max-sm:flex-wrap items-center">
          <div className="w-full md:w-1/2">
            <Heading
              as="h1"
              size={"heading1"}
              className="text-white max-sm:mb-[15px] max-md:text-center sm:text-left"
            >
              {product_data?.heading?.title}
            </Heading>
          </div>
          <div className="w-full md:w-1/2">
            <div className="flex max-sm:flex-col items-center justify-center md:justify-end">
              {isDesktop ? (
                <div className="md:pr-[20px] lg:pr-[60px] 2xl:pr-[75px] 3xl:pr-[90px] max-sm:mb-[15px]">
                  <ProductFilterBox />
                </div>
              ) : (
                <div className="w-full h-auto">
                  <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="text-[12px] leading-[1.2] font-medium font-base2 tracking-[1px] text-white p-[10px_15px] border-1 border-white rounded-[5px] mb-[15px] flex mx-auto"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 mr-[5px]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V20a1 1 0 01-1.447.894l-4-2A1 1 0 019 18v-4.586L3.293 6.707A1 1 0 013 6V4z"
                      />
                    </svg>
                    Filter
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden
                    ${
                      isOpen
                        ? "max-sm:opacity-100 mb-[15px]"
                        : "max-sm:max-h-0 max-sm:opacity-0"
                    }`}
                  >
                    <div className="w-full h-auto flex items-center justify-center">
                      <ProductFilterBox />
                    </div>
                  </div>
                </div>
              )}
              <Link
                href={"/"}
                className="text-[12px] lg:text-[13px] 2xl:text-[15px] 3xl:text-[18px] leading-[1.2] font-base1 text-white w-fit p-[5px] sm:p-[10px] text-nowrap transition-all duration-300 ease-in-out hover:text-white/70"
              >
                View All
              </Link>
            </div>
          </div>
        </div>
        {isDesktop ? (
          <div className="mx-[-7px] sm:mx-[-10px] lg:mx-[-12px] 2xl:mx-[-15px] 3xl:mx-[-20px] [&>*]:w-full [&>*]:sm:w-1/2 [&>*]:md:w-1/3 [&>*]:xl:w-1/4 [&>*]:p-[10px_7px] [&>*]:sm:p-[15px_10px] [&>*]:lg:p-[25px_12px] [&>*]:2xl:p-[35px_15px] [&>*]:3xl:p-[45px_20px] flex flex-wrap">
            {product_data?.product_list?.map((item, index) => (
              <div key={`product-${index}`} className="w-full h-full block">
                <ProductCard item={item} />
              </div>
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Autoplay]}
            loop={true}
            slidesPerView={1}
            spaceBetween={12}
            autoplay={{
              delay: 1800,
              disableOnInteraction: false,
            }}
            speed={500}
          >
            {product_data?.product_list?.map((item, index) => (
              <SwiperSlide key={`product_slide-${index}`} className="!h-auto">
                <div className="w-full h-full block">
                  <ProductCard item={item} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
