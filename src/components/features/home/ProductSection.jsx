"use client";
import { useState } from "react";
import Link from "next/link";
import { Heading } from "../../utils/Heading";
// import { useMediaQuery } from "react-responsive";
import ProductCard from "../../common/ProductCard";
import ProductFilterBox from "../../common/ProductFilterBox";
// import { FilterBox } from "@/components/features/buy/ProductListSection";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import useMedia from "use-media";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import NextImage from "next/image";



export default function ProductSection({ data, whatsapp }) {
  const cars_section = data?.cars_section;
  const listingpagedata = data?.cars_section ?? {};
  const cars = cars_section?.cars || [];

  // input filters
  const [filters, setFilters] = useState({ brand: "", model: "", search: "" });
  // applied filters (only used when search button is clicked)
  const [appliedFilters, setAppliedFilters] = useState({
    brand: "",
    model: "",
    search: "",
  });

  // compute price range
  const prices = cars.map((car) =>
    parseInt(car.price?.toString().replace(/,/g, ""), 10)
  );
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  // filtering logic based on appliedFilters
  let filteredCars = cars;
  if (appliedFilters.brand) {
    filteredCars = filteredCars.filter((car) =>
      car.brand?.some(
        (b) => b.toLowerCase().replace(/\s+/g, "-") === appliedFilters.brand
      )
    );
  }
  if (appliedFilters.model) {
    filteredCars = filteredCars.filter((car) =>
      car.model?.some(
        (m) => m.toLowerCase().replace(/\s+/g, "-") === appliedFilters.model
      )
    );
  }

  // price filter
  filteredCars = filteredCars.filter((car) => {
    const rawPrice = car.price?.toString().replace(/,/g, "");
    const price = parseInt(rawPrice, 10);
    return price >= priceRange[0] && price <= priceRange[1];
  });

  if (appliedFilters.search?.trim()) {
    const q = appliedFilters.search.trim().toLowerCase();
    filteredCars = filteredCars.filter(
      (car) =>
        car.cartitle?.toLowerCase().includes(q) ||
        car.brand?.some((b) => b.toLowerCase().includes(q)) ||
        car.model?.some((m) => m.toLowerCase().includes(q))
    );
  }

  const displayedCars = filteredCars.slice(0, 8);

  const isMobile = useMedia({ maxWidth: "640px" });

  return cars_section?.enable__disable_cars_section ? (
    <section className="w-full h-auto py-[40px_50px] sm:py-[45px_70px] lg:py-[55px_95px] 2xl:py-[65px_110px] 3xl:py-[85px_140px] border-b-1 border-[#404040]/40 block">
      <div className="container">
        <div className="mb-[25px] lg:mb-[10px] 3xl:mb-[30px] flex max-sm:flex-wrap items-center">
          <div className="w-full md:w-1/2">
            <Heading
              as="h1"
              size="heading1"
              className="text-white max-sm:mb-[15px] max-md:text-center sm:text-left"
            >
              {cars_section?.title}
            </Heading>
          </div>
          <div className="w-full md:w-1/2">
            <div className="flex max-sm:flex-col items-center justify-center md:justify-end">
              {!isMobile ? (
                <div className="md:pr-[20px] lg:pr-[60px] 2xl:pr-[75px] 3xl:pr-[90px] max-sm:mb-[15px]">
                  <ProductFilterBox
                    listingpagedata={{
                      ...listingpagedata,
                      filters: data?.filters,
                    }}
                    filters={filters}
                    onFilterChange={setFilters}
                    setPriceRange={setPriceRange}
                    onSearch={() => setAppliedFilters(filters)}
                    onRemove={() => {
                      setFilters({ brand: "", model: "", search: "" });
                      setAppliedFilters({ brand: "", model: "", search: "" });
                    }}
                    cars={cars}
                  />
                </div>
              ) : (
                <div className="flex items-center max-md:flex-wrap max-md:justify-end gap-[10px]">


                  <div className="sm:pl-[15px] md:pl-[10px]">
                    <FilterBox
                      listingpagedata={{
                        ...listingpagedata,
                        filters: data?.filters,
                      }}
                      onFilterChange={(newFilters) => {
                        setFilters(newFilters);
                        setAppliedFilters(newFilters); // 🔥 apply instantly
                      }}
                      cars={cars}
                      setPriceRange={setPriceRange}
                      filters={filters}
                    />
                  </div>

                </div>
              )}
              {cars_section?.button_url?.url && cars_section?.button_title && (
                <Link
                  href={cars_section?.button_url?.url}
                  target={cars_section?.button_url?.target}
                  className="text-[12px] lg:text-[13px] 2xl:text-[15px] 3xl:text-[18px] leading-[1.2] font-base1 text-white w-fit p-[5px] sm:p-[10px] text-nowrap transition-all duration-300 ease-in-out hover:text-white/70"
                >
                  {cars_section?.button_title}
                </Link>
              )}
            </div>
          </div>
        </div>
        {!isMobile ? (
          displayedCars.length > 0 ? (
            <div className="mx-[-7px] sm:mx-[-10px] lg:mx-[-12px] 2xl:mx-[-15px] 3xl:mx-[-20px] [&>*]:w-full [&>*]:sm:w-1/2 [&>*]:md:w-1/3 [&>*]:xl:w-1/4 [&>*]:p-[10px_7px] [&>*]:sm:p-[15px_10px] [&>*]:lg:p-[25px_12px] [&>*]:2xl:p-[35px_15px] [&>*]:3xl:p-[45px_20px] flex flex-wrap">
              {displayedCars.map((car, index) => (
                <div key={`product-${index}`} className="w-full h-full block">
                  <ProductCard item={car} whatsapp={whatsapp} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-white text-[14px] lg:text-[16px] 2xl:text-[18px] font-base1 py-[30px]">
              No cars found matching your filters.
            </p>
          )
        ) : displayedCars.length > 0 ? (
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
            {displayedCars.map((car, index) => (
              <SwiperSlide key={`product_slide-${index}`} className="!h-auto">
                <div className="w-full h-full block">
                  <ProductCard item={car} whatsapp={whatsapp} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-white text-[14px] lg:text-[16px] 2xl:text-[18px] font-base1 py-[30px]">
            No cars found matching your filters.
          </p>
        )}
      </div>
    </section>
  ) : null;
}

function FilterBox({
  listingpagedata,
  onFilterChange,
  cars,
  setPriceRange,
  filters,
}) {
  return (
    <Drawer unmount={false}>
      <DrawerTrigger asChild>
        <div className="text-[11px] sm:text-[12px] leading-[1] font-medium font-base2 text-white w-fit h-[32px]  border-1 border-white/50 rounded-[5px] p-[7px_15px] flex items-center justify-center transition-all duration-300 ease-in-out aria-expanded:bg-[#F29A0D] aria-expanded:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 mr-[5px]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          // className=" w-[25px] h-auto aspect-square pr-[10px]"
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
        <DrawerHeader className={"sr-only"}>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <div className="container">
          <div className="max-w-[500px] mx-auto relative z-0">
            <DrawerClose asChild>
              <div className="w-[25px] sm:w-[30px] h-auto aspect-square bg-white/20 p-[6px] rounded-full absolute z-1 right-0 md:right-[-10%] top-0 max-sm:opacity-0 max-sm:pointer-events-none flex items-center justify-center">
                <NextImage
                  src="/images/close_button.png"
                  alt="close"
                  width={35}
                  height={35}
                  className="w-full h-full object-contain invert-100"
                />
              </div>
            </DrawerClose>
            <div className="w-full py-[40px] sm:py-[70px_40px]">
              <ProductFilterBox
                variant="ProductListing"
                listingpagedata={listingpagedata}
                onFilterChange={onFilterChange}
                cars={cars}
                setPriceRange={setPriceRange}
                filters={filters}
              />
              {/* <Button
                type="submit"
                className="text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-[1.2] font-semibold font-base1 text-black bg-white lg:p-[8px_15px] 2xl:p-[10px_20px] 3xl:p-[20px_25px] rounded-[5px] border-1 border-[#BEBEBE] cursor-pointer hover:bg-white/70 hover:border-white"
              >
                <span className="w-[10px] 2xl:w-[12px] 3xl:w-[15px] h-auto aspect-square flex items-center justify-center">
                  <Image
                    src="/images/seaarch_icon.svg"
                    alt="Search"
                    width={15}
                    height={15}
                  />
                </span>
                Apply
              </Button> */}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}