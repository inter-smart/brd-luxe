import Image from "next/image";
import { Heading } from "@/components/utils/Heading";
import { ShineBorder } from "@/components/magicui/shine-border";

const core_value_data = {
  heading: {
    title: "Core Values",
  },
  core_value_list: [
    {
      media: {
        path: "/images/core_value_1.svg",
        alt: "Core_Value_1",
      },
      title: "Sell, Buy and Exchange Luxury cars at the best price.",
    },
    {
      media: {
        path: "/images/core_value_2.svg",
        alt: "Core_Value_2",
      },
      title: "Buyback Guarantee for cars purchased from BRD LUXE",
    },
    {
      media: {
        path: "/images/core_value_3.svg",
        alt: "Core_Value_3",
      },
      title: "Comprehensive warranty up to 1 year/ 20000kms (renewable)",
    },
    {
      media: {
        path: "/images/core_value_4.svg",
        alt: "Core_Value_4",
      },
      title:
        "All vehicles are thoroughly screened with advanced diagnostic tools to detect any issues.",
    },
    {
      media: {
        path: "/images/core_value_5.svg",
        alt: "Core_Value_1",
      },
      title: "Finance up to 90% and insurance facility",
    },
    {
      media: {
        path: "/images/core_value_6.svg",
        alt: "Core_Value_6",
      },
      title:
        "Spot evaluation facility for your car and payment within 30 minutes of purchase",
    },
    {
      media: {
        path: "/images/core_value_7.svg",
        alt: "Core_Value_7",
      },
      title: "Non accidental, Non flood affected cars",
    },
    {
      media: {
        path: "/images/core_value_8.svg",
        alt: "Core_Value_8",
      },
      title: "100% service history scrutinization",
    },
  ],
};

export default function CoreValueSection({ data = core_value_data }) {
  return (
    <section className="w-full h-auto py-[40px] sm:py-[50px_60px] lg:py-[75px_80px] 2xl:py-[90px_100px] 3xl:py-[115px_130px] block">
      <div className="container">
        <Heading
          as="h1"
          size={"heading1"}
          className="text-white mb-[20px] sm:mb-[30px] lg:mb-[40px] 2xl:mb-[50px] 3xl:mb-[65px]"
        >
          {data?.heading?.title}
        </Heading>
        <div className="w-full h-full mx-[-5px] sm:mx-[-10px] lg:mx-[-17px] 2xl:mx-[-22px] 3xl:mx-[-30px] [&>*]:w-1/2 [&>*]:sm:w-1/3 [&>*]:md:w-1/4 [&>*]:p-[5px] [&>*]:sm:p-[10px] [&>*]:lg:p-[17px] [&>*]:2xl:p-[22px] [&>*]:3xl:p-[30px] flex flex-wrap">
          {data?.core_value_list?.map((item, index) => (
            <div key={`core-${index}`} className="h-auto block">
              <div className="w-full h-full p-[15px] sm:p-[15px_20px] lg:p-[20px] 2xl:p-[25px] 3xl:p-[30px] rounded-[10px] overflow-hidden transition-all duration-300 flex flex-col justify-between relative z-0 hover:translate-y-[-15px]">
                <div className="w-[35px] sm:w-[40px] lg:w-[45px] 2xl:w-[50px] 3xl:w-[65px] h-auto aspect-square overflow-hidden mb-[15px] sm:mb-[20px] flex items-center justify-center">
                  <Image
                    src={item?.media?.path}
                    alt={item?.media?.alt}
                    width={65}
                    height={65}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-[12px] sm:text-[13px] 2xl:text-[15px] 3xl:text-[19px] leading-[1.5] font-light font-base2 text-white">
                  {item?.title}
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
