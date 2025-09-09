import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Heading } from "@/components/utils/Heading";
import { Text } from "@/components/utils/Text";
import Image from "next/image";

export default function FaqSection({ data }) {
  const faq_section = data?.sell_your_car_acf?.faq_section;

  return faq_section?.enable__disable_faq_section === true ? (
    <section className="w-full h-auto block py-[40px] sm:py-[60px] xl:py-[100px] 2xl:py-[120px] 3xl:py-[140px]">
      <div className="container">
        <div className="flex flex-wrap justify-center -mx-[15px] sm:-mx-[20px] xl:-mx-[30px] 2xl:-mx-[40px] [&>*]:px-[15px] sm:[&>*]:px-[20px] xl:[&>*]:px-[30px] 2xl:[&>*]:px-[40px]">
          <div className="w-full md:w-1/2 xl:w-[calc(100%-520px)] 2xl:w-[calc(100%-576px)] 3xl:w-[calc(100%-720px)]">
            <div className="w-full max-md:mb-[30px]">
              <Heading
                as="h2"
                size="heading1"
                className="text-white mb-[10px] sm:mb-[5px] xl:mb-[10px]"
              >
                {faq_section?.title}
              </Heading>
              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue=""
              >
                {faq_section?.faq_items?.map((item, index) => (
                  <AccordionItem
                    key={`faq_items${index}`}
                    value={`item-${index + 1}`}
                    className="border-white/30"
                  >
                    <AccordionTrigger className="xl:py-5">
                      <div className="text-[12px] sm:text-[14px] xl:text-[20px] 2xl:text-[24px] 3xl:text-[30px] leading-tight font-normal font-base1 line-clamp-2 text-white">
                        {item?.question}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Text
                        as="div"
                        size=""
                        className="text-[12px] sm:text-[14px] xl:text-[16px] 3xl:text-[18px] leading-normal font-normal text-white/80 mb-[10px] sm:mb-[15px] xl:mb-[20px]"
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item?.answer,
                          }}
                        />
                      </Text>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
          <div className="w-full md:w-1/2 xl:w-[520px] 2xl:w-[576px] 3xl:w-[720px]">
            <div className="w-full h-auto xl:min-h-[430px] 2xl:min-h-[480px] 3xl:min-h-[580px] p-[10px_15px] sm:p-[30px] xl:p-[60px_40px] 2xl:p-[80px_60px] bg-gradient-to-tr from-[rgba(217,217,217,0)] to-[rgba(115,115,115,0.1)] border-[1px] border-solid border-white/10 rounded-[10px] backdrop-blur-[20px] shadow-sm transition duration-300 flex flex-col items-center justify-center">
              <div className="w-full mb-[10px] sm:mb-[10px] xl:mb-[20px] 2xl:mb-[30px]">
                <Image
                  src={faq_section?.image?.url}
                  alt={faq_section?.image?.alt}
                  width={412}
                  height={116}
                  placeholder="blur"
                  blurDataURL="/images/placeholder.jpg"
                  className="w-[200px] sm:w-[268px] xl:w-[320px] 2xl:w-[400px] h-auto block"
                />
              </div>
              <Heading
                as="h2"
                size="heading1"
                className="text-white mb-[10px] sm:mb-[10px] xl:mb-[15px] 2xl:mb-[20px]"
              >
                {faq_section?.right_side_text}
              </Heading>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : null;
}
