"use client";

import ProductFilterBox from "@/components/common/ProductFilterBox";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import Image from "next/image";

export default function FilterBox({ listingpagedata, onFilterChange, cars, setPriceRange, filters }) {
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
                <Image src="/images/close_button.png" alt="close" width={35} height={35} className="w-full h-full object-contain invert-100" />
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
