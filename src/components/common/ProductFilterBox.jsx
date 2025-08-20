"use client";
import SearchForm from "./SearchForm";
import { Button } from "@/components/ui/button";
import "react-range-slider-input/dist/style.css";
import RangeSlider from "react-range-slider-input";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";

export default function ProductFilterBox({ variant = "default" }) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const isDesktop = useMediaQuery({
    query: "(min-width: 1280px)",
  });
  const handleSearch = () => {};

  const inputFormStyle =
    "!text-[12px] lg:!text-[13px] 2xl:!text-[14px] 3xl:!text-[18px] leading-[1.2] font-light !font-base3 !text-white !min-w-fit sm:!min-w-[100px] md:!min-w-[100px] lg:!min-w-[110px] 2xl:!min-w-[135px] 3xl:!min-w-[170px] bg-transparent text-white px-0 rounded-[0px] border-0 border-b-1 border-white relative z-0 focus-visible:ring-0 focus-visible:ring-offset-0";

  const selectStyle = "bg-black [&>*]:!text-white";

  const inputSelectStyle =
    "bg-black text-[11px] lg:text-[12px] 2xl:text-[14px] rounded-[4px]";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      className="w-full h-auto"
    >
      <div
        className={`w-full h-auto space-x-[10px] sm:space-x-[15px] lg:space-x-[20px] 2xl:space-x-[25px] 3xl:space-x-[35px] flex items-center max-sm:justify-center ${
          variant === "ProductListing" && "max-xl:block max-xl:space-y-[25px]"
        }`}
      >
        <Select value={brand} onValueChange={setBrand}>
          <SelectTrigger
            className={`${inputFormStyle} ${
              variant === "ProductListing" && "max-xl:w-[100%]"
            }`}
          >
            <SelectValue placeholder="Brand" />
          </SelectTrigger>
          <SelectContent className={`${selectStyle}`}>
            <SelectItem className={`${inputSelectStyle}`} value="SUV">
              SUV
            </SelectItem>
            <SelectItem className={`${inputSelectStyle}`} value="SEDAN">
              SEDAN
            </SelectItem>
            <SelectItem className={`${inputSelectStyle}`} value="MUV">
              MUV
            </SelectItem>
          </SelectContent>
        </Select>
        <Select value={model} onValueChange={setModel}>
          <SelectTrigger
            className={`${inputFormStyle} ${
              variant === "ProductListing" && "max-xl:w-[100%]"
            }`}
          >
            <SelectValue placeholder="Model" />
          </SelectTrigger>
          <SelectContent className={`${selectStyle}`}>
            <SelectItem className={`${inputSelectStyle}`} value="SUPER LUXURY">
              SUPER LUXURY
            </SelectItem>
            <SelectItem className={`${inputSelectStyle}`} value="SUV">
              SUV
            </SelectItem>
            <SelectItem className={`${inputSelectStyle}`} value="MUV">
              MUV
            </SelectItem>
          </SelectContent>
        </Select>
        {variant === "ProductListing" ? (
          <>
            <div className="w-[100%] h-auto xl:pl-[25px]">
              <PriceRangeSlider />
            </div>
            {isDesktop && <SearchForm />}
          </>
        ) : (
          <Button
            type="submit"
            className="text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-[1.2] font-semibold font-base1 text-black bg-white lg:p-[8px_15px] 2xl:p-[10px_20px] 3xl:p-[20px_25px] rounded-[5px] border-1 border-[#BEBEBE] cursor-pointer hover:bg-white/70  hover:border-white"
          >
            <span className="w-[10px] 2xl:w-[12px] 3xl:w-[15px] h-auto aspect-square flex items-center justify-center">
              <Image
                src="/images/seaarch_icon.svg"
                width={15}
                height={15}
                alt="Search"
              />
            </span>
            Search
          </Button>
        )}
      </div>
    </form>
  );
}

function PriceRangeSlider() {
  const [range, setRange] = useState([0, 2100000]);
  const formatValue = (val) =>
    val >= 100000 ? `₹${val / 100000} L` : `₹${val}`;

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .custom-slider {
        width: 100%;
        height: 2px;
      }
      .range-slider__thumb{
        width: 15px !important; 
        height: 15px !important;
        background: white !important;
        @media only screen and (max-width: 1536px) {
          width: 10px !important; 
          height: 10px !important;
        }
      }  
      .range-slider__range{
        height: 2px !important;
        background: linear-gradient(to right, #8C5600, #F29A0D) !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="w-full h-auto bg-black max-lg:mb-[20px] flex items-end">
      <label className="text-[11px] sm:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-[1] font-medium font-base3 text-white text-nowrap w-fit xl:w-[35%] max-xl:pr-[25px]">
        Price Range:
      </label>
      <div className="w-full xl:w-[65%]">
        <div className="mb-[10px] 2xl:mb-[15px] flex justify-between items-center">
          <span className="text-[12px] 2xl:text-[14px] 3xl:text-[16px] leading-[1] font-normal font-base3 text-white">
            {formatValue(range[0])}
          </span>
          <span className="text-[12px] 2xl:text-[14px] 3xl:text-[16px] leading-[1] font-normal font-base3 text-white">
            {formatValue(range[1])}
          </span>
        </div>
        <RangeSlider
          min={0}
          max={2100000}
          step={100000}
          value={range}
          onInput={setRange}
          className="custom-slider"
        />
      </div>
    </div>
  );
}
