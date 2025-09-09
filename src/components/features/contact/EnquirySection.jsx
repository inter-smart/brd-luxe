import EnquiryForm from "@/components/common/EnquiryForm";
import SocialMediaComp from "@/components/common/SocialMediaComp";
import { Heading } from "@/components/utils/Heading";
import Image from "next/image";
import clsx from "clsx";

export default function EnquirySection({ data, socialMedia = false }) {
  return (
    <section className="w-full h-auto block pb-[40px] sm:pb-[60px] xl:pb-[100px] 2xl:pb-[120px] 3xl:pb-[140px]">
      <div className="container">
        <div
          className="w-full h-auto xl:min-h-[520px] 2xl:min-h-[576pxpx] block p-[20px_15px] sm:p-[40px] xl:p-[60px] 2xl:p-[80px] bg-gradient-to-tr from-[rgba(217,217,217,0)] to-[rgba(115,115,115,0.1)] border-[1px] border-solid border-white/10 rounded-[10px] backdrop-blur-[20px] shadow-sm transition duration-300 hover:border-white/20 hover:from-[rgba(217,217,217,0.1)]"
          id="carenquiryform"
        >
          <div className="flex flex-wrap items-center -mx-[15px] sm:-mx-[20px] xl:-mx-[30px] 2xl:-mx-[40px] [&>*]:px-[15px] sm:[&>*]:px-[20px] xl:[&>*]:px-[30px] 2xl:[&>*]:px-[40px]">
            <div className="w-full md:w-[276px] xl:w-[376px] 2xl:w-[468px] 3xl:w-[520px]">
              <div className="w-full max-w-[320px] xl:max-w-[376px] 2xl:max-w-[420px] h-auto block md:mx-auto max-md:mb-[40px]">
                <div
                  className={clsx(
                    "w-full",
                    socialMedia?.length > 0 &&
                      "mb-[20px] sm:mb-[30px] xl:mb-[40px] 2xl:mb-[60px]"
                  )}
                >
                  <Image
                    src={data?.image?.url}
                    alt={data?.image?.alt}
                    width={412}
                    height={116}
                    placeholder="blur"
                    blurDataURL="/images/placeholder.jpg"
                    className="w-[168px] md:w-[220px] xl:w-[268px] 2xl:w-[300px] 3xl:w-[376px] h-auto block"
                  />
                </div>

                {socialMedia?.length > 0 && (
                  <SocialMediaComp data={socialMedia} />
                )}
              </div>
            </div>
            <div className="w-full md:w-[calc(100%-276px)] xl:w-[calc(100%-376px)] 2xl:w-[calc(100%-468px)] 3xl:w-[calc(100%-520px)]">
              <Heading
                as="h2"
                size="heading1"
                className="text-white mb-[10px] sm:mb-[5px] xl:mb-[10px]"
              >
                {data?.title}
              </Heading>
              <EnquiryForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
