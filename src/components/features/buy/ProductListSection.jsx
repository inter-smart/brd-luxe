"use client";
import { useState } from "react";
import Image from "next/image";
import { Heading } from "../../utils/Heading";
// import { useMediaQuery } from "react-responsive";
import ProductCard from "../../common/ProductCard";
import SearchForm from "@/components/common/SearchForm";
import ProductFilterBox from "@/components/common/ProductFilterBox";
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
import BreadCrumb from "@/components/common/BreadCrumb";
import useMedia from "use-media";

import { useSearchParams } from "next/navigation";

export default function ProductListSection({ data, whatsapp }) {
  const searchParams = useSearchParams();

  const initialModel = searchParams.get("model") || "";

  const listingpagedata = data?.listingpagedata ?? {};
  const cars = listingpagedata?.cars_data || [];

  // new filter state
  const [filters, setFilters] = useState({
    brand: "",
    model: initialModel,
    search: "",
  });

  // compute price range
  const prices = cars.map((car) =>
    parseInt(car.price?.toString().replace(/,/g, ""), 10)
  );
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  // show 8 items initially
  const [visibleCount, setVisibleCount] = useState(8);

  // ✅ Progressive filtering
  let filteredCars = cars;

  // brand filter
  if (filters.brand) {
    filteredCars = filteredCars.filter((car) =>
      car.brand?.some(
        (b) => b.toLowerCase().replace(/\s+/g, "-") === filters.brand
      )
    );
  }

  // model filter
  if (filters.model) {
    filteredCars = filteredCars.filter((car) =>
      car.model?.some(
        (m) => m.toLowerCase().replace(/\s+/g, "-") === filters.model
      )
    );
  }

  // price filter
  filteredCars = filteredCars.filter((car) => {
    const rawPrice = car.price?.toString().replace(/,/g, "");
    const price = parseInt(rawPrice, 10);
    return price >= priceRange[0] && price <= priceRange[1];
  });

  // search filter
  if (filters.search?.trim()) {
    const q = filters.search.trim().toLowerCase();
    filteredCars = filteredCars.filter(
      (car) =>
        car.title?.toLowerCase().includes(q) ||
        car.brand?.some((b) => b.toLowerCase().includes(q)) ||
        car.model?.some((m) => m.toLowerCase().includes(q))
    );
  }

  const isMobile = useMedia({ maxWidth: "1280px" });

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const handleViewLess = () => {
    setVisibleCount(8);
  };

  return (
    <section className="w-full h-auto py-[20px_50px] sm:py-[20px_60px] lg:py-[20px_80px] 2xl:py-[20px_100px] 3xl:py-[20px_125px] block">
      <div className="container">
        <div className="mb-[20] sm:mb-[50] lg:mb-[60] 2xl:mb-[75] 3xl:mb-[95]">
          <BreadCrumb
            items={[
              { label: "Home", href: "/" },
              { label: data?.pagetitle, href: "/buy-car" },
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
                {listingpagedata?.title_main_title_car_sec}
              </Heading>
            </div>
            <div className="w-full md:w-[70%]">
              <div className="flex max-sm:flex-col items-center justify-center md:justify-end">
                {!isMobile ? (
                  <ProductFilterBox
                    variant="ProductListing"
                    listingpagedata={listingpagedata}
                    onFilterChange={setFilters}
                    cars={cars} // ✅ pass cars
                    setPriceRange={setPriceRange} // ✅ pass setter
                    filters={filters}
                  />
                ) : (
                  <div className="flex items-center max-md:flex-wrap max-md:justify-end gap-[10px]">
                    {listingpagedata?.enable__disable_search && (
                      <div className="max-sm:w-full">
                        <SearchForm
                          onSearch={(q) =>
                            setFilters((prev) => ({ ...prev, search: q }))
                          }
                        />
                      </div>
                    )}
                    {listingpagedata?.enable__disable_filter && (
                      <div className="sm:pl-[15px] md:pl-[10px]">
                        <FilterBox
                          listingpagedata={listingpagedata}
                          onFilterChange={setFilters}
                          cars={cars}
                          setPriceRange={setPriceRange}
                          filters={filters}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mx-[-7px] sm:mx-[-10px] lg:mx-[-12px] 2xl:mx-[-15px] 3xl:mx-[-20px] [&>*]:w-full [&>*]:sm:w-1/2 [&>*]:md:w-1/3 [&>*]:xl:w-1/4 [&>*]:p-[10px_7px] [&>*]:sm:p-[15px_10px] [&>*]:lg:p-[25px_12px] [&>*]:2xl:p-[35px_15px] [&>*]:3xl:p-[45px_20px] flex flex-wrap">
            {filteredCars.length > 0 ? (
              filteredCars.slice(0, visibleCount).map((car, index) => (
                <div key={`car-${index}`} className="w-full h-full block">
                  <ProductCard item={car} whatsapp={whatsapp} />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-500 text-lg">
                Sorry, no cars match your selection.
              </div>
            )}
          </div>
        </div>
        {/* Load More Button */}
        {visibleCount < filteredCars.length ? (
          <button
            onClick={handleLoadMore}
            className="text-[14px] 2xl:text-[15px] 3xl:text-[20px] font-semibold font-base1 text-white text-center w-full mt-[35px] lg:mt-[50px]"
          >
            Load More
          </button>
        ) : (
          filteredCars.length > 8 && (
            <button
              onClick={handleViewLess}
              className="text-[14px] 2xl:text-[15px] 3xl:text-[20px] font-semibold font-base1 text-white text-center w-full mt-[35px] lg:mt-[50px]"
            >
              View Less
            </button>
          )
        )}
      </div>
    </section>
  );
}

function FilterBox({
  listingpagedata,
  onFilterChange,
  cars,
  setPriceRange,
  filters,
}) {
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
              <ProductFilterBox
                variant="ProductListing"
                listingpagedata={listingpagedata}
                onFilterChange={onFilterChange}
                cars={cars}
                setPriceRange={setPriceRange}
                filters={filters}
              />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
export { FilterBox };
