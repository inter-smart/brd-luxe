import Image from "next/image";
import { Heading } from "@/components/utils/Heading";
import { ShineBorder } from "@/components/magicui/shine-border";

export default function KeyHighlightSection({ data }) {
  const highlights = data?.highlights;

  return highlights?.enable_disable === true ? (
    <section className="w-full h-auto block">
      <div className="container">
        <div className="w-full h-auto py-[40px] sm:py-[60px_70px] lg:py-[80px_85px] 2xl:py-[95px_100px] 3xl:py-[120px_130px] border-t-1 border-[#808080]/50 flex max-sm:flex-col-reverse sm:flex-row">
          <div className="w-full sm:w-[45%] sm:pr-[20px] lg:pr-[35px] 2xl:pr-[40px] 3xl:pr-[55px]">
            <div className="w-full h-[90%] p-[15px] sm:p-[15px_20px] lg:p-[25px_30px] 2xl:p-[30px_35px] 3xl:p-[35px_40px] rounded-[10px] relative z-0">
              <Heading
                as="h1"
                size={"heading1"}
                className="text-white mb-[15px] lg:mb-[25px] 2xl:mb-[30px] 3xl:mb-[35px]"
              >
                {data?.highlights?.highlighttitle}
              </Heading>
              <ul className="columns-1 3xs:columns-2 sm:columns-1 lg:columns-2 pl-5 my-auto">
                {data?.highlights?.lists?.map(
                  (item, index) =>
                    item?.content && (
                      <li
                        key={`highlight-${index}`}
                        className="text-[11px] sm:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-[1.5] font-semibold font-base2 text-white list-disc mb-[7px] sm:mb-[10px] lg:mb-[15px] 2xl:mb-[20px] 3xl:mb-[30px]"
                      >
                        {item?.content}
                      </li>
                    )
                )}
              </ul>
              <div className="w-full h-full bg-linear-to-r from-[#D9D9D9] to-[#737373] absolute inset-0 z-[-1] block opacity-[3%]"></div>
              <ShineBorder borderWidth={1} shineColor={["#4a4a4a"]} />
            </div>
          </div>
          <div className="w-full sm:w-[55%] mb-[25px] sm:mb-0">
            <div className="group w-full h-[90%] overflow-hidden flex items-center">
              {data?.highlights?.type === "video" ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={data?.highlights?.video?.url} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={data?.highlights?.image?.url || "/images/placeholder.jpg"}
                  alt={data?.highlights?.image?.alt || "highlight image"}
                  width={1000}
                  height={415}
                  placeholder="blur"
                  blurDataURL="/images/placeholder.jpg"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : null;
}
