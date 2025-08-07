import { useState } from "react";

export default function SearchForm() {
  const [query, setQuery] = useState("");
  return (
    <>
      <div className="w-full h-[30px] 2xl:h-[35px] 3xl:h-[45px] xl:max-w-[285px] 2xl:max-w-[340px] 3xl:max-w-[420px] bg-black border-1 border-white rounded-[5px] 2xl:rounded-[8px] 3xl:rounded-[10px] overflow-hidden flex">
        <div className="w-[15px] h-auto aspect-square ml-[10px] 2xl:ml-[15px] text-white flex items-center justify-center">
          <svg
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx="10" cy="10" r="6" stroke="white" strokeWidth="2" />
            <line
              x1="14.5"
              y1="14.5"
              x2="20"
              y2="20"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder=""
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="text-[12px] 2xl:text-[14px] font-light font-base2 flex-1 bg-black text-white px-2 py-2 outline-none"
        />
        <button
          type="submit"
          className="text-[12px] 2xl:text-[14px] 3xl:text-[18px] font-semibold font-base1 text-black bg-white px-6 py-2 transition-all duration-300 flex items-center justify-center hover:bg-[#F29A0D] hover:text-white"
        >
          Search
        </button>
      </div>
    </>
  );
}
