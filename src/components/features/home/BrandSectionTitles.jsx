import { Heading } from "@/components/utils/Heading";
import { Text } from "@/components/utils/Text";

export default function BrandSectionTitles({ brands_section }) {
  return (
    <div className="max-sm:text-center mb-[15px] sm:mb-[10px] flex flex-wrap items-center relative z-2">
      <div className="w-full sm:w-[35%] sm:pr-[15%]">
        <Heading as="h2" size={"heading1"} className="text-white max-sm:mb-[15px]">
          {brands_section?.heading}
        </Heading>
      </div>
      <div className="w-full sm:w-1/2 ml-auto">
        <Text as="div" className="text-[12px] 2xl:text-[14px] 3xl:text-[16px] leading-[1.7] font-base2 font-normal text-white">
          {brands_section?.description}
        </Text>
      </div>
    </div>
  );
}
