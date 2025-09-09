import { Skeleton } from "@/components/ui/skeleton";
import { Heading } from "@/components/utils/Heading";
import { Text } from "@/components/utils/Text";
import Image from "next/image";
import { Suspense } from "react";

export default function HowWorkSection({ data }) {
  const how_it_works_section = data?.sell_your_car_acf?.how_it_works_section;

  return (
    how_it_works_section?.enable__disable_how_it_works_section === true ? (
      <section className="w-full h-auto block py-[40px_20px] sm:py-[80px_40px] xl:py-[120px_60px] 2xl:py-[140px_80px] 3xl:py-[180px_100px]">
        <div className="container">
          <div className="w-full sm:max-w-[468px] xl:max-w-[576px] 2xl:max-w-[768px] mx-auto mb-[20px] sm:mb-[40px] xl:mb-[60px] 2xl:mb-[80px] relative z-0">
            <div className="text-[clamp(1.5rem,12.5vw+-1rem,14rem)] leading-none font-thin text-center font-base2 whitespace-nowrap uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-black absolute -z-1 bottom-[90%] sm:bottom-1/3 left-1/2 -translate-x-1/2 opacity-30 sm:opacity-20">
              {how_it_works_section?.background_fancy_title}
            </div>
            <Heading
              as="h2"
              size="heading1"
              className="text-center text-white mb-[10px] sm:mb-[10px] xl:mb-[15px] 2xl:mb-[20px]"
            >
              {how_it_works_section?.title}
            </Heading>
            <Text
              as="div"
              size="text3"
              className="!font-light text-center text-white"
            >
              <div dangerouslySetInnerHTML={{ __html: how_it_works_section?.short_description }} />
            </Text>
          </div>
          <div className="flex flex-wrap justify-center -mx-[15px] sm:-mx-[20px] md:-mx-[30px] xl:-mx-[30px] 2xl:-mx-[40px] [&>*]:p-[15px] sm:[&>*]:p-[20px] md:[&>*]:p-[30px] xl:[&>*]:p-[30px] 2xl:[&>*]:p-[40px]">
            {how_it_works_section?.how_it_works_steps?.map((item, index) => (
              (item?.image?.url || item?.logo?.url || item?.title) && (
                <div
                  key={`howWork_items${index}`}
                  className="w-1/2 3xs:w-1/3 sm:w-1/3 md:w-1/5"
                >
                  <Suspense fallback={<HowItWorksSkeleton />}>
                    <div className="group w-full h-auto block transition duration-300 translate-y-[-10px] xl:hover:translate-y-[-15px] 2xl:hover:translate-y-[-20px]">
                      <div className="w-full h-auto aspect-square rounded-full bg-gradient-to-b from-[#252525] to-black relative z-0 flex items-center justify-center outline-2 outline-offset-[5px] xl:outline-offset-[10px] 2xl:outline-offset-[15px] outline-transparent outline-dashed mb-[15px] sm:mb-[20px] xl:mb-[30px] 2xl:mb-[40px] transition duration-300 group-hover:outline-white">
                        <div className="w-full h-full rounded-full overflow-hidden absolute -z-1 inset-0">
                          <Image
                            src={item?.image?.url || "/images/placeholder.jpg"}
                            alt={item?.image?.alt || "how wroks"}
                            width={278}
                            height={278}
                            placeholder="blur"
                            blurDataURL="/images/placeholder.jpg"
                            className="w-full h-full object-cover opacity-0 transition duration-300 group-hover:opacity-100 group-hover:scale-110"
                          />
                        </div>
                        <Image
                          src={item?.logo?.url}
                          alt={item?.logo?.alt}
                          width={75}
                          height={75}
                          placeholder="blur"
                          blurDataURL="/images/placeholder.jpg"
                          className="w-[30px] sm:w-[40px] xl:w-[50px] 2xl:w-[70px] h-auto aspect-square object-contain group-hover:scale-105"
                        />
                        {(how_it_works_section?.how_it_works_steps?.[index + 1]?.title ||
                          how_it_works_section?.how_it_works_steps?.[index + 1]?.image?.url ||
                          how_it_works_section?.how_it_works_steps?.[index + 1]?.logo?.url) && (
                            <Image
                              src={"/images/sell-howworks-arrow.svg"}
                              alt="arrow"
                              width={15}
                              height={15}
                              className="w-[8px] xl:w-[12px] 2xl:w-[15px] h-auto aspect-square object-contain absolute z-2 top-1/2 left-[115%] -translate-x-1/2 translate-y-1/2 max-sm:hidden"
                            />
                          )}
                        <div className="text-[20px] sm:text-[30px] xl:text-[44px] 2xl:text-[56px] 3xl:text-[70px] leading-tight font-medium font-base3 text-center text-transparent bg-clip-text bg-gradient-to-b from-white to-black absolute -z-1 left-1/2 bottom-[5px] -translate-x-1/2">
                          {index < 9 ? "0" + (index + 1) : index + 1}
                        </div>
                      </div>
                      <div className="text-[12px] sm:text-[12px] xl:text-[13px] 2xl:text-[18px] 3xl:text-[20px] leading-tight font-medium font-base2 text-center text-white">
                        {item?.title}
                      </div>
                    </div>
                  </Suspense>
                </div>
              )
            ))}
          </div>
        </div>
      </section>
    ) : null
  )
}

function HowItWorksSkeleton() {
  return (
    <div className="w-full">
      <Skeleton className="w-full h-full aspect-square rounded-full mb-[15px] sm:mb-[20px] xl:mb-[30px] 2xl:mb-[40px] " />
      <Skeleton className="h-[16px] sm:h-[16px] xl:h-[18px] 2xl:h-[22px] 3xl:h-[24px] w-3/4 mx-auto rounded" />
    </div>
  );
}
