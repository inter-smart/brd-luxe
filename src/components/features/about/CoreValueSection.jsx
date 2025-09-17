import Image from "next/image";
import { Heading } from "@/components/utils/Heading";
import { ShineBorder } from "@/components/magicui/shine-border";

export default function CoreValueSection({ data }) {
  return (
    <section className="w-full h-auto py-[40px] sm:py-[50px_60px] lg:py-[75px_80px] 2xl:py-[90px_100px] 3xl:py-[115px_130px] block">
      <div className="container">
        <Heading
          as="h1"
          size={"heading1"}
          className="text-white mb-[20px] sm:mb-[30px] lg:mb-[40px] 2xl:mb-[50px] 3xl:mb-[65px]"
        >
          {data.title}
        </Heading>
        <div className="w-full h-full mx-[-5px] sm:mx-[-10px] lg:mx-[-17px] 2xl:mx-[-22px] 3xl:mx-[-30px] [&>*]:w-1/2 [&>*]:sm:w-1/3 [&>*]:md:w-1/4 [&>*]:p-[5px] [&>*]:sm:p-[10px] [&>*]:lg:p-[17px] [&>*]:2xl:p-[22px] [&>*]:3xl:p-[30px] flex flex-wrap">
          {data?.lists?.map((item, index) => 
            item?.text &&(
            <div key={`core-${index}`} className="h-auto block">
              <div className="w-full h-full p-[15px] sm:p-[15px_20px] lg:p-[20px] 2xl:p-[25px] 3xl:p-[30px] rounded-[10px] overflow-hidden transition-all duration-300 flex flex-col justify-between relative z-0 hover:translate-y-[-15px]">
                <div className="w-[35px] sm:w-[40px] lg:w-[45px] 2xl:w-[50px] 3xl:w-[65px] h-auto aspect-square overflow-hidden mb-[15px] sm:mb-[20px] flex items-center justify-center">
                  <Image
                    src={item?.icon?.url || "/images/placeholder.jpg"}
                    alt={item?.icon?.alt || "core-value-icon"}
                    width={65}
                    height={65}
                    placeholder="blur"
                    blurDataURL="/images/placeholder.jpg"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-[12px] sm:text-[13px] 2xl:text-[16px] 3xl:text-[20px] leading-[1.5] font-light font-base2 text-white">
                  {item?.text}
                </div>
                <div className="w-full h-full bg-linear-to-r from-[#D9D9D9] to-[#737373] absolute inset-0 z-[-1] block opacity-[4%]"></div>
                <ShineBorder
                  borderWidth={1}
                  shineColor={["#4a4a4a"]}
                  duration={10 + (index % 5) * 1.5}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
