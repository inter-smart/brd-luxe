import dynamic from "next/dynamic";
import Image from "next/image";
import { Text } from "../../utils/Text";
import { Heading } from "../../utils/Heading";
import { StyledLink } from "../../utils/Button";
const SellCarsClient = dynamic(() => import("@/components/clientWrappers/Home/SellCars/SellCarsClient"), { ssr: true });

export default function SellCarSection({ data }) {
  const sell_your_car_section = data?.sell_your_car_section;

  return sell_your_car_section?.enable__disable_sell_your_car_section ? (
    <section className="w-full h-auto block py-[40px_50px] sm:py-[50px_70px] lg:py-[60px_90px] 2xl:py-[80px_150px] 3xl:py-[95px_185px] border-y border-[#404040]/50 overflow-hidden relative z-0 before:w-full before:h-[30%] before:bg-linear-to-b before:from-black before:to-black/0 before:absolute before:top-0 before:-z-1">
      <div className="w-full h-full block absolute inset-0 -z-3">
        <Image
          src={sell_your_car_section?.background_image?.url || "/images/placeholder.jpg"}
          alt={sell_your_car_section?.background_image?.alt || "sell your car background"}
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL="/images/placeholder.jpg"
          className="object-cover"
        />
      </div>
      <div className="w-full h-full bg-black/80 absolute inset-0 -z-2"></div>
      <div className="container">
        <div className="max-sm:text-center mb-[40px] sm:mb-[50px] lg:mb-[65px] 2xl:mb-[85px] 3xl:mb-[100px] flex flex-wrap items-center">
          <div className="w-full sm:w-1/2 md:pr-[25%]">
            <Heading as="h2" size={"heading1"} className="text-white max-sm:mb-[15px]">
              {sell_your_car_section?.heading}
            </Heading>
          </div>
          <div className="w-full sm:w-1/2 sm:pl-[10%]">
            <Text
              as="div"
              className="text-[12px] sm:text-[10px] 2xl:text-[14px] 3xl:text-[16px] leading-[1.7] font-base2 font-normal text-white mb-[30px]"
            >
              {sell_your_car_section?.description}
            </Text>
            {sell_your_car_section?.button_url?.url && sell_your_car_section?.button_title && (
              <StyledLink href={sell_your_car_section?.button_url?.url} target={sell_your_car_section?.button_url?.target}>
                {sell_your_car_section?.button_title}
              </StyledLink>
            )}
          </div>
        </div>
        <SellCarsClient sell_your_car_section={sell_your_car_section} />
      </div>
    </section>
  ) : null;
}
