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
          variant === "ProductListing" &&
          "max-xl:block max-xl:space-y-[25px]"
        }`}
      >
        <Select value={brand} onValueChange={setBrand}>
          <SelectTrigger
            className={`${inputFormStyle} ${
              variant === "ProductListing" && "max-xl:w-[100%]"
            }`}
          >
            <SelectValue placeholder="Brand" />
            <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                width="9"
                height="5"
                viewBox="0 0 9 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.50002 4.56252C4.41211 4.56252 4.32411 4.52892 4.25699 4.4618L0.81949 1.0243C0.68517 0.889982 0.68517 0.672475 0.81949 0.53824C0.953811 0.404006 1.17132 0.40392 1.30555 0.53824L4.50002 3.73271L7.69449 0.53824C7.82881 0.40392 8.04632 0.40392 8.18055 0.53824C8.31479 0.672561 8.31487 0.890068 8.18055 1.0243L4.74305 4.4618C4.67594 4.52892 4.58794 4.56252 4.50002 4.56252Z"
                  fill="#D2C8C8"
                />
              </svg>
            </span>
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
            <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                width="9"
                height="5"
                viewBox="0 0 9 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.50002 4.56252C4.41211 4.56252 4.32411 4.52892 4.25699 4.4618L0.81949 1.0243C0.68517 0.889982 0.68517 0.672475 0.81949 0.53824C0.953811 0.404006 1.17132 0.40392 1.30555 0.53824L4.50002 3.73271L7.69449 0.53824C7.82881 0.40392 8.04632 0.40392 8.18055 0.53824C8.31479 0.672561 8.31487 0.890068 8.18055 1.0243L4.74305 4.4618C4.67594 4.52892 4.58794 4.56252 4.50002 4.56252Z"
                  fill="#D2C8C8"
                />
              </svg>
            </span>
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
            className="text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-[1.2] font-semibold font-base1 text-black bg-white lg:p-[8px_15px] 2xl:p-[10px_20px] 3xl:p-[20px_25px] rounded-[5px] border-1 border-[#BEBEBE] hover:bg-white/70  hover:border-white"
          >
            <span>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.8576 14.1839L10.9849 10.373C11.999 9.2712 12.6221 7.814 12.6221 6.2105C12.6216 2.78032 9.7963 0 6.31081 0C2.82531 0 -3.05176e-05 2.78032 -3.05176e-05 6.2105C-3.05176e-05 9.64068 2.82531 12.421 6.31081 12.421C7.81678 12.421 9.19803 11.9001 10.283 11.0341L14.1708 14.86C14.3602 15.0466 14.6677 15.0466 14.8572 14.86C15.047 14.6734 15.047 14.3705 14.8576 14.1839ZM6.31081 11.4655C3.3617 11.4655 0.970981 9.11275 0.970981 6.2105C0.970981 3.30825 3.3617 0.955521 6.31081 0.955521C9.25994 0.955521 11.6506 3.30825 11.6506 6.2105C11.6506 9.11275 9.25994 11.4655 6.31081 11.4655Z"
                  fill="black"
                />
              </svg>
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

// export function SearchForm() {
//   const [query, setQuery] = useState("");
//   return (
//     <>
//       <div className="w-full h-[30px] 2xl:h-[35px] 3xl:h-[45px] xl:max-w-[285px] 2xl:max-w-[340px] 3xl:max-w-[420px] bg-black border-1 border-white rounded-[5px] 2xl:rounded-[8px] 3xl:rounded-[10px] overflow-hidden flex">
//         <div className="w-[15px] h-auto aspect-square ml-[10px] 2xl:ml-[15px] text-white flex items-center justify-center">
//           <svg
//             width="16"
//             height="16"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <circle cx="10" cy="10" r="6" stroke="white" strokeWidth="2" />
//             <line
//               x1="14.5"
//               y1="14.5"
//               x2="20"
//               y2="20"
//               stroke="white"
//               strokeWidth="2"
//             />
//           </svg>
//         </div>
//         <input
//           type="text"
//           placeholder=""
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           className="text-[12px] 2xl:text-[14px] font-light font-base2 flex-1 bg-black text-white px-2 py-2 outline-none"
//         />
//         <button
//           type="submit"
//           className="text-[12px] 2xl:text-[14px] 3xl:text-[18px] font-semibold font-base1 text-black bg-white px-6 py-2 transition-all duration-300 flex items-center justify-center hover:bg-[#F29A0D] hover:text-white"
//         >
//           Search
//         </button>
//       </div>
//     </>
//   );
// }
