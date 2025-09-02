"use client";
import Image from "next/image";
import { Heading } from "../../utils/Heading";
import { useMediaQuery } from "react-responsive";
import ProductCard from "../../common/ProductCard";
import SearchForm from "@/components/common/SearchForm";
import ProductFilterBox from "@/components/common/ProductFilterBox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import BreadCrumb from "@/components/common/BreadCrumb";

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
      kilo_meter: "KM - 20000 KM",
      mileage: "Mileage - 10 KM ",
      price: "₹ 18 000 000",
      link: "/",
      enquire_link: "/buy/range-rover-velar",
      status: true,
    },
    {
      media: {
        path: "/images/product_2.webp",
        alt: "bmw x5",
      },
      title: "bmw x5",
      kilo_meter: "KM - 20000 KM",
      mileage: "Mileage - 10 KM ",
      price: "₹ 20 000 000",
      link: "/",
      enquire_link: "/buy/bmw-x5",
      status: false,
    },
    {
      media: {
        path: "/images/product_3.webp",
        alt: "Mercedes-Benz E-Class",
      },
      title: "Mercedes-Benz E-Class",
      kilo_meter: "KM - 20000 KM",
      mileage: "Mileage - 10 KM ",
      price: "₹ 21 000 000",
      link: "/",
      enquire_link: "/buy/mercedes-benz-e-class",
      status: true,
    },
    {
      media: {
        path: "/images/product_4.webp",
        alt: "RANGE ROVER",
      },
      title: "RANGE ROVER",
      kilo_meter: "KM - 20000 KM",
      mileage: "Mileage - 10 KM ",
      price: "₹ 22 000 000",
      link: "/",
      enquire_link: "/buy/range-rover",
      status: true,
    },
    {
      media: {
        path: "/images/product_4.webp",
        alt: "RANGE ROVER",
      },
      title: "RANGE ROVER",
      kilo_meter: "KM - 20000 KM",
      mileage: "Mileage - 10 KM ",
      price: "₹ 22 000 000",
      link: "/",
      enquire_link: "/buy/range-rover",
      status: true,
    },
    {
      media: {
        path: "/images/product_3.webp",
        alt: "Mercedes-Benz E-Class",
      },
      title: "Mercedes-Benz E-Class",
      kilo_meter: "KM - 20000 KM",
      mileage: "Mileage - 10 KM ",
      price: "₹ 21 000 000",
      link: "/",
      enquire_link: "/buy/mercedes-benz-e-class",
      status: true,
    },
    {
      media: {
        path: "/images/product_2.webp",
        alt: "bmw x5",
      },
      title: "bmw x5",
      kilo_meter: "KM - 20000 KM",
      mileage: "Mileage - 10 KM ",
      price: "₹ 20 000 000",
      link: "/",
      enquire_link: "/buy/bmw-x5",
      status: true,
    },
    {
      media: {
        path: "/images/product_1.webp",
        alt: "RANGE ROVER VELAR",
      },
      title: "RANGE ROVER VELAR",
      kilo_meter: "KM - 20000 KM",
      mileage: "Mileage - 10 KM ",
      price: "₹ 18 000 000",
      link: "/",
      enquire_link: "/buy/range-rover-velar",
      status: true,
    },
    {
      media: {
        path: "/images/product_1.webp",
        alt: "RANGE ROVER VELAR",
      },
      title: "RANGE ROVER VELAR",
      kilo_meter: "KM - 20000 KM",
      mileage: "Mileage - 10 KM ",
      price: "₹ 18 000 000",
      link: "/",
      enquire_link: "/buy/range-rover-velar",
      status: true,
    },
    {
      media: {
        path: "/images/product_2.webp",
        alt: "bmw x5",
      },
      title: "bmw x5",
      kilo_meter: "KM - 20000 KM",
      mileage: "Mileage - 10 KM ",
      price: "₹ 20 000 000",
      link: "/",
      enquire_link: "/buy/bmw-x5",
      status: false,
    },
    {
      media: {
        path: "/images/product_3.webp",
        alt: "Mercedes-Benz E-Class",
      },
      title: "Mercedes-Benz E-Class",
      kilo_meter: "KM - 20000 KM",
      mileage: "Mileage - 10 KM ",
      price: "₹ 21 000 000",
      link: "/",
      enquire_link: "/buy/mercedes-benz-e-class",
      status: true,
    },
    {
      media: {
        path: "/images/product_4.webp",
        alt: "RANGE ROVER",
      },
      title: "RANGE ROVER",
      kilo_meter: "KM - 20000 KM",
      mileage: "Mileage - 10 KM ",
      price: "₹ 22 000 000",
      link: "/",
      enquire_link: "/buy/range-rover",
      status: true,
    },
    {
      media: {
        path: "/images/product_4.webp",
        alt: "RANGE ROVER",
      },
      title: "RANGE ROVER",
      kilo_meter: "KM - 20000 KM",
      mileage: "Mileage - 10 KM ",
      price: "₹ 22 000 000",
      link: "/",
      enquire_link: "/buy/range-rover",
      status: true,
    },
    {
      media: {
        path: "/images/product_3.webp",
        alt: "Mercedes-Benz E-Class",
      },
      title: "Mercedes-Benz E-Class",
      kilo_meter: "KM - 20000 KM",
      mileage: "Mileage - 10 KM ",
      price: "₹ 21 000 000",
      link: "/",
      enquire_link: "/buy/mercedes-benz-e-class",
      status: true,
    },
    {
      media: {
        path: "/images/product_2.webp",
        alt: "bmw x5",
      },
      title: "bmw x5",
      kilo_meter: "KM - 20000 KM",
      mileage: "Mileage - 10 KM ",
      price: "₹ 20 000 000",
      link: "/",
      enquire_link: "/buy/bmw-x5",
      status: true,
    },
    {
      media: {
        path: "/images/product_1.webp",
        alt: "RANGE ROVER VELAR",
      },
      title: "RANGE ROVER VELAR",
      kilo_meter: "KM - 20000 KM",
      mileage: "Mileage - 10 KM ",
      price: "₹ 18 000 000",
      link: "/",
      enquire_link: "/buy/range-rover-velar",
      status: true,
    },
    {
      media: {
        path: "/images/product_1.webp",
        alt: "RANGE ROVER VELAR",
      },
      title: "RANGE ROVER VELAR",
      kilo_meter: "KM - 20000 KM",
      mileage: "Mileage - 10 KM ",
      price: "₹ 18 000 000",
      link: "/",
      enquire_link: "/buy/range-rover-velar",
      status: true,
    },
    {
      media: {
        path: "/images/product_2.webp",
        alt: "bmw x5",
      },
      title: "bmw x5",
      kilo_meter: "KM - 20000 KM",
      mileage: "Mileage - 10 KM ",
      price: "₹ 20 000 000",
      link: "/",
      enquire_link: "/buy/bmw-x5",
      status: false,
    },
    {
      media: {
        path: "/images/product_3.webp",
        alt: "Mercedes-Benz E-Class",
      },
      title: "Mercedes-Benz E-Class",
      kilo_meter: "KM - 20000 KM",
      mileage: "Mileage - 10 KM ",
      price: "₹ 21 000 000",
      link: "/",
      enquire_link: "/buy/mercedes-benz-e-class",
      status: true,
    },
    {
      media: {
        path: "/images/product_4.webp",
        alt: "RANGE ROVER",
      },
      title: "RANGE ROVER",
      kilo_meter: "KM - 20000 KM",
      mileage: "Mileage - 10 KM ",
      price: "₹ 22 000 000",
      link: "/",
      enquire_link: "/buy/range-rover",
      status: true,
    },
  ],
};

export default function ProductListSection({ data }) {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1280px)",
  });
  return (
    <section className="w-full h-auto py-[20px_50px] sm:py-[20px_60px] lg:py-[20px_80px] 2xl:py-[20px_100px] 3xl:py-[20px_125px] block">
      <div className="container">
        <div className="mb-[20] sm:mb-[50] lg:mb-[60] 2xl:mb-[75] 3xl:mb-[95]">
          <BreadCrumb
            items={[
              { label: "Home", href: "/" },              
              { label: data?.pagetitle || "Buy A Car", href: "/buy-car" },
            ]}
          />
        </div>
        <div>
          <div className="mb-[25px] lg:mb-[15px] 3xl:mb-[30px] flex max-sm:flex-wrap items-center">
            <div className="w-full md:w-[30%]">
              <Heading
                as="h2"
                size={"heading1"}
                className="text-white max-sm:mb-[15px] max-md:text-center sm:text-left"
              >
                {data?.title_main_title_car_sec || "Cars"}
              </Heading>
            </div>
            {/* <div className="w-full md:w-[70%]">
              <div className="flex max-sm:flex-col items-center justify-center md:justify-end">
                {isDesktop ? (
                  <ProductFilterBox variant="ProductListing" />
                ) : (
                  <div className="flex items-center max-md:flex-wrap max-md:justify-end gap-[10px]">
                    <div className="max-sm:w-full">
                      {data.enable__disable_search && (
                      <SearchForm />
                      )}
                    </div>
                    <div className="sm:pl-[15px] md:pl-[10px]">
                      {data.enable__disable_filter && (
                      <FilterBox />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div> */}
          </div>
          <div className="mx-[-7px] sm:mx-[-10px] lg:mx-[-12px] 2xl:mx-[-15px] 3xl:mx-[-20px] [&>*]:w-full [&>*]:sm:w-1/2 [&>*]:md:w-1/3 [&>*]:xl:w-1/4 [&>*]:p-[10px_7px] [&>*]:sm:p-[15px_10px] [&>*]:lg:p-[25px_12px] [&>*]:2xl:p-[35px_15px] [&>*]:3xl:p-[45px_20px] flex flex-wrap">
            {data?.cars_data?.map((item, index) => (
              <div key={`product-${index}`} className="w-full h-full block">
                <ProductCard item={item} />
              </div>
            ))}
          </div>
        </div>
        <button className="text-[14px] 2xl:text-[15px] 3xl:text-[20px] font-semibold font-base1 text-white text-center w-full mt-[35px] lg:mt-[50px]">
          Loading More...
        </button>
      </div>
    </section>
  );
}

function FilterBox() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="text-[11px] sm:text-[12px] leading-[1] font-medium font-base2 text-white w-fit h-[32px]  border-1 border-white/50 rounded-[5px] p-[7px_15px] flex items-center justify-center transition-all duration-300 ease-in-out aria-expanded:bg-[#F29A0D] aria-expanded:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 mr-[5px]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            class=" w-[25px] h-auto aspect-square pr-[10px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V20a1 1 0 01-1.447.894l-4-2A1 1 0 019 18v-4.586L3.293 6.707A1 1 0 013 6V4z"
            />
          </svg>
          Filter
        </div>
      </DrawerTrigger>
      <DrawerContent className={"bg-black !border-0 !outline-0"}>
        <div className="container">
          <div className="max-w-[500px] mx-auto relative z-0">
            <DrawerClose asChild>
              <div className="w-[25px] sm:w-[30px] h-auto aspect-square bg-white/20 p-[6px] rounded-full absolute z-1 right-0 md:right-[-10%] top-0 max-sm:opacity-0 max-sm:pointer-events-none flex items-center justify-center">
                <Image
                  src="/images/close_button.png"
                  alt="close"
                  width={35}
                  height={35}
                  className="w-full h-full object-contain invert-100"
                />
              </div>
            </DrawerClose>
            <div className="w-full py-[40px] sm:py-[70px_40px]">
              <ProductFilterBox variant="ProductListing" />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
