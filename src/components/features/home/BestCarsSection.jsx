import { Text } from "@/components/utils/Text";
import { Heading } from "@/components/utils/Heading";
import BestCarsClient from "@/components/clientWrappers/Home/BestCars/BestCarsClient";

export default function BestCarsSection({ data }) {
  const best_cars_section = data?.best_cars_section;

  return (
    <section className="w-full h-auto block py-[40px_30px] lg:py-[45px_35px] 2xl:py-[50px_40px] 3xl:py-[70px_50px] border-y-1 border-[#404040]/50">
      <div className="container">
        <div className="mb-[20px] sm:mb-[30px] lg:mb-[35px] 2xl:mb-[40px] 3xl:mb-[50px] max-sm:text-center flex flex-wrap justify-between">
          <div className="w-full sm:w-1/2">
            <Heading as="h1" size={"heading1"} className="text-white max-sm:mb-[15px]">
              {best_cars_section?.title}
            </Heading>
          </div>
          <div className="w-full sm:w-[40%]">
            <Text
              as="div"
              className="text-[12px] sm:text-[12px] xl:text-[13px] 2xl:text-[16px] 3xl:text-[20px] leading-normal font-light tracking-tight font-base2 text-white"
            >
              {best_cars_section?.short_description}
            </Text>
          </div>
        </div>
        <BestCarsClient best_cars_section={best_cars_section} />
      </div>
    </section>
  );
}
