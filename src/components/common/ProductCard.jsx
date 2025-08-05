import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ item }) {
  return (
    <div className="group w-full h-full flex flex-col">
      <div className="w-full h-auto aspect-[400/195] overflow-hidden mb-[10px] sm:mb-[15px] lg:mb-[20px] 2xl:mb-[25px] 3xl:mb-[30px] block relative z-0">
        <Image
          src={item?.media?.path}
          alt={item?.media?.alt}
          fill
          sizes="100vw"
          className="object-cover transition-all duration-300 ease-in-out group-hover:scale-105 "
        />
        <div
          className={`text-[8px] 3xl:text-[11px] leading-[1.2] font-medium font-base3 absolute z-1 top-0 right-0 bg-white p-[5px_8px] 2xl:p-[5px_10px] m-[5px] xl:m-[10px]
          ${item?.status ? "text-[#313131]" : "text-[#974848]"}`}
        >
          {item?.status ? "In Stock" : "Out of Stock"}
        </div>
      </div>
      <div className="text-[13px] sm:text-[14px] 2xl:text-[16px] 3xl:text-[20px] leading-[1.2] font-normal font-base1 text-white uppercase mb-[10px] 2xl:mb-[15px] 3xl:mb-[20px]">
        {item?.title}
      </div>
      <div className="[&>*]:text-[11px] [&>*]:sm:text-[12px] [&>*]:2xl:text-[13px] [&>*]:3xl:text-[16px] [&>*]:leading-[1.2] [&>*]:font-normal [&>*]:font-base3 [&>*]:text-white w-full h-auto [&>*]:px-[7px] [&>*]:lg:px-[10px] [&>*]:3xl:px-[15px] [&>*]:first:pl-0 [&>*]:last:border-r-0 [&>*]:first:border-r-1 [&>*]:first:border-[#888888] mb-[15px] sm:mb-[20px] lg:mb-[25px] 2xl:mb-[30px] 3xl:mb-[40px] flex items-center">
        <div>{item?.kilo_meter}</div>
        <div>{item?.mileage}</div>
      </div>
      <div className="flex items-center [&>*]:w-1/2">
        <div className="text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-[1.2] font-normal font-base3 text-white">
          {item?.price}
        </div>
        <div className="flex items-center justify-end">
          <a
            href={item?.link}
            target="_blank"
            aria-label="whatsapp"
            className="w-[13px] sm:w-[15px] lg:w-[17px] 2xl:w-[20px] 3xl:w-[25px] h-auto aspect-square flex items-center justify-center relative z-0"
          >
            <Image
              src="/images/whatsapp_icon.svg"
              alt="Whatsapp"
              fill
              className="object-contain"
            />
          </a>
          <div className="ml-[7px] sm:ml-[10px] lg:ml-[15px] 2xl:ml-[18px] 3xl:ml-[25px]">
            <Link
              href={item?.enquire_link}
              className="text-[11px] sm:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-[1.2] font-semibold font-base1 text-black w-fit h-auto bg-white p-[5px_8px] sm:p-[8px_12px] 2xl:p-[10px_15px] 3xl:p-[12px_20px] rounded-[5px] sm:rounded-[7px] 3xl:rounded-[10px] border-1 border-[#BEBEBE] block hover:bg-black hover:border-white hover:text-white transition-all duration-300 ease-in-out"
            >
              Enquire Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
