import EnquiryForm from "@/components/common/EnquiryForm";
import SocialMediaComp from "@/components/common/SocialMediaComp";
import { Heading } from "@/components/utils/Heading";
import Image from "next/image";

const enquiryData = {
  title: "Enquiry Form",
  media: {
    type: "image",
    path: "/images/sell-faq-1.png",
    alt: "Sell Your Car",
  },
};

export default function EnquirySection({ data = enquiryData }) {
  return (
    <section className="w-full h-auto block pb-[40px] sm:pb-[60px] xl:pb-[100px] 2xl:pb-[120px] 3xl:pb-[140px]">
      <div className="container">
        <div className="w-full h-auto xl:min-h-[520px] 2xl:min-h-[576pxpx] block p-[10px_15px] sm:p-[30px] xl:p-[60px_40px] 2xl:p-[80px_60px] bg-gradient-to-tr from-[rgba(217,217,217,0)] to-[rgba(115,115,115,0.1)] border-[1px] border-solid border-white/10 rounded-[10px] backdrop-blur-[20px] shadow-sm transition duration-300">
          <div className="flex flex-wrap items-center -mx-[15px] sm:-mx-[20px] xl:-mx-[30px] 2xl:-mx-[40px] [&>*]:px-[15px] sm:[&>*]:px-[20px] xl:[&>*]:px-[30px] 2xl:[&>*]:px-[40px]">
            <div className="w-full md:w-1/2 xl:w-[520px] 2xl:w-[576px] 3xl:w-[720px]">
              <div className="w-full max-w-[320px] xl:max-w-[376px] 2xl:max-w-[420px] h-auto block mx-auto">
                <div className="w-full mb-[20px] sm:mb-[30px] xl:mb-[40px] 2xl:mb-[60px]">
                  <Image
                    src={data?.media?.path}
                    alt={data?.media?.alt}
                    width={412}
                    height={116}
                    className="w-[200px] sm:w-[268px] xl:w-[320px] 2xl:w-[400px] h-auto block"
                  />
                </div>
                <SocialMediaComp />
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-w-[calc(100%-520px)] 2xl:w-w-[calc(100%-576px)] 3xl:w-[calc(100%-720px)]">
              <div className="w-full max-md:mb-[30px]">
                <Heading
                  as="h2"
                  size="heading1"
                  className="text-white mb-[10px] sm:mb-[5px] xl:mb-[10px]"
                >
                  {data?.title}
                </Heading>
              </div>
              <EnquiryForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
