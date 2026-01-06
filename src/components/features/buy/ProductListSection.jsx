"use client";
import { useState } from "react";
import { Heading } from "../../utils/Heading";
import ProductCard from "../../common/ProductCard";
import SearchForm from "@/components/common/SearchForm";
import ProductFilterBox from "@/components/common/ProductFilterBox";

import BreadCrumb from "@/components/common/BreadCrumb";
import useMedia from "use-media";

import { useSearchParams } from "next/navigation";
import FilterBox from "@/components/clientWrappers/Home/ProductSection/FilterBox";

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
  const prices = cars.map((car) => parseInt(car.price?.toString().replace(/,/g, ""), 10));
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  // show 8 items initially
  // const [visibleCount, setVisibleCount] = useState(8);

  // ✅ Progressive filtering
  let filteredCars = cars;

  // brand filter
  if (filters.brand) {
    filteredCars = filteredCars.filter((car) => car.brand?.some((b) => b.toLowerCase().replace(/\s+/g, "-") === filters.brand));
  }

  // model filter
  if (filters.model) {
    filteredCars = filteredCars.filter((car) => car.model?.some((m) => m.toLowerCase().replace(/\s+/g, "-") === filters.model));
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

  const isMobile = useMedia({ maxWidth: "1279px" });

  // const handleLoadMore = () => {
  //   setVisibleCount((prev) => prev + 4);
  // };

  // const handleViewLess = () => {
  //   setVisibleCount(8);
  // };

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
              <Heading as="h2" size={"heading1"} className="text-white max-sm:mb-[15px] max-md:text-center sm:text-left">
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
                        <SearchForm onSearch={(q) => setFilters((prev) => ({ ...prev, search: q }))} />
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
              filteredCars.map((car, index) => (
                <div key={`car-${index}`} className="w-full h-full block">
                  <ProductCard item={car} whatsapp={whatsapp} />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-500 text-lg">Sorry, no cars match your selection.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
