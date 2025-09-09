import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCard({ item, whatsapp }) {
  return (
    <Suspense fallback={<ProductCardSkeleton />}>
      <div className="group w-full h-full flex flex-col">
        <div className="w-full h-auto aspect-[400/195] overflow-hidden mb-[10px] sm:mb-[15px] lg:mb-[20px] 2xl:mb-[25px] 3xl:mb-[30px] block relative z-0">
          <Image
            src={item?.media?.path || "/images/placeholder.jpg"}
            alt={item?.media?.alt || item?.cartitle}
            width={400}
            height={195}
            placeholder="blur"
            blurDataURL="/images/placeholder.jpg"
            className="w-full h-full object-cover transition-all duration-300 ease-in-out group-hover:scale-105 "
          />
          <div
            className={`text-[8px] 3xl:text-[11px] leading-[1.2] font-medium font-base3 absolute z-1 top-0 right-0 bg-white p-[5px_8px] 2xl:p-[5px_10px] m-[5px] xl:m-[10px]
          ${
            item?.stock_management === "In Stock"
              ? "text-[#313131]"
              : "text-[#974848]"
          }`}
          >
            {item?.stock_management}
          </div>
        </div>
        <div className="text-[13px] 2xl:text-[16px] 3xl:text-[20px] leading-[1.2] font-normal font-base1 text-white uppercase mb-[10px] lg:mb-[15px] 3xl:mb-[20px]">
          {item?.cartitle}
        </div>
        <div className="[&>*]:text-[11px] [&>*]:sm:text-[12px] [&>*]:2xl:text-[13px] [&>*]:3xl:text-[16px] [&>*]:leading-[1.2] [&>*]:font-light [&>*]:font-base3 [&>*]:text-white w-full h-auto [&>*]:px-[7px] [&>*]:lg:px-[10px] [&>*]:3xl:px-[15px] [&>*]:first:pl-0 [&>*]:last:border-r-0 [&>*]:first:border-r-1 [&>*]:first:border-[#888888] mb-[15px] sm:mb-[20px] lg:mb-[25px] 2xl:mb-[30px] 3xl:mb-[40px] flex items-center">
          {item?.kms && <div>KMS - {item?.kms}</div>}
          {item?.mileage && <div>Mileage - {item?.mileage}</div>}
        </div>
        <div className="flex items-center [&>*]:w-1/2">
          {item?.price && (
            <div className="text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-[1.2] font-normal font-base3 text-white">
              ₹ {item?.price}
            </div>
          )}
          <div className="flex items-center justify-end">
            <a
              href={`https://wa.me/${whatsapp?.number?.replace(
                /[^\d]/g,
                ""
              )}?text=${encodeURIComponent(
                `Hi, I am interested in ${item?.cartitle}`
              )}`}
              target="_blank"
              aria-label="whatsapp"
              className="w-[13px] sm:w-[15px] lg:w-[17px] 2xl:w-[20px] 3xl:w-[25px] h-auto aspect-square flex items-center justify-center transition-all duration-300 ease-in-out relative z-0 hover:opacity-50"
            >
              <Image
                src={whatsapp?.icon?.url || "/images/placeholder.jpg"}
                alt={whatsapp?.icon?.alt || "Whatsapp"}
                width={25}
                height={25}
                placeholder="blur"
                blurDataURL="/images/placeholder.jpg"
                className="w-full h-full object-contain"
              />
            </a>
            <div className="ml-[7px] sm:ml-[10px] lg:ml-[15px] 2xl:ml-[18px] 3xl:ml-[25px]">
              {item.slug ? (
                <Link
                  href={`/buy/${item.slug}#carenquiryform`}
                  className="text-[11px] sm:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-[1.2] font-semibold font-base1 text-white w-fit h-auto bg-transparent p-[5px_8px] sm:p-[8px_12px] 2xl:p-[10px_15px] 3xl:p-[12px_20px] rounded-[5px] sm:rounded-[7px] 3xl:rounded-[10px] border-1 border-[#BEBEBE] block hover:bg-white hover:border-white hover:text-black transition-all duration-300 ease-in-out"
                >
                  Enquire Now
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="group w-full h-full flex flex-col">
      <Skeleton className="w-full aspect-[400/195] rounded-md mb-[10px] sm:mb-[15px] lg:mb-[20px] 2xl:mb-[25px] 3xl:mb-[30px]" />
      <div className="absolute top-[10px] right-[10px]">
        <Skeleton className="h-[20px] w-[70px] rounded-sm" />
      </div>
      <Skeleton className="h-[20px] sm:h-[22px] 2xl:h-[26px] 3xl:h-[32px] w-3/4 rounded mb-[10px] 2xl:mb-[15px] 3xl:mb-[20px]" />
      <div className="flex gap-[10px] mb-[15px] sm:mb-[20px] lg:mb-[25px] 2xl:mb-[30px] 3xl:mb-[40px]">
        <Skeleton className="w-1/4 h-[16px] rounded" />
        <Skeleton className="w-1/4 h-[16px] rounded" />
      </div>
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-[18px] 2xl:h-[22px] 3xl:h-[26px] w-[100px] rounded" />
        <div className="flex items-center gap-3">
          <Skeleton className="w-[25px] h-[25px] rounded-full" />
          <Skeleton className="h-[25px] 3xl:h-[35px] w-[100px] rounded-md" />
        </div>
      </div>
    </div>
  );
}
