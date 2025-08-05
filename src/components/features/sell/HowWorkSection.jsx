import { Heading } from "@/components/utils/Heading";
import { Text } from "@/components/utils/Text";
import Image from "next/image";

const howWorkData = {
  title: "How it works?",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.",
  howWork_items: [
    {
      media: {
        type: "image",
        path: "/images/sell-howworks-img-1.jpg",
        alt: "howworks",
      },
      icon: {
        path: "/images/sell-howworks-1.svg",
        alt: "howworks",
      },
      title: "Showroom or home visit as per customer's convenience",
    },
    {
      media: {
        type: "image",
        path: "/images/sell-howworks-img-1.jpg",
        alt: "howworks",
      },
      icon: {
        path: "/images/sell-howworks-2.svg",
        alt: "howworks",
      },
      title: "Road test and document verification",
    },
    {
      media: {
        type: "image",
        path: "/images/sell-howworks-img-1.jpg",
        alt: "howworks",
      },
      icon: {
        path: "/images/sell-howworks-3.svg",
        alt: "howworks",
      },
      title: "Proposed Pricing for Customer",
    },
    {
      media: {
        type: "image",
        path: "/images/sell-howworks-img-1.jpg",
        alt: "howworks",
      },
      icon: {
        path: "/images/sell-howworks-4.svg",
        alt: "howworks",
      },
      title: "Purchase agreement",
    },
    {
      media: {
        type: "image",
        path: "/images/sell-howworks-img-1.jpg",
        alt: "howworks",
      },
      icon: {
        path: "/images/sell-howworks-5.svg",
        alt: "howworks",
      },
      title: "Payment process initiated",
    },
    {
      media: {
        type: "image",
        path: "/images/sell-howworks-img-1.jpg",
        alt: "howworks",
      },
      icon: {
        path: "/images/sell-howworks-1.svg",
        alt: "howworks",
      },
      title: "Showroom or home visit as per customer's convenience",
    },
    {
      media: {
        type: "image",
        path: "/images/sell-howworks-img-1.jpg",
        alt: "howworks",
      },
      icon: {
        path: "/images/sell-howworks-2.svg",
        alt: "howworks",
      },
      title: "Road test and document verification",
    },
    {
      media: {
        type: "image",
        path: "/images/sell-howworks-img-1.jpg",
        alt: "howworks",
      },
      icon: {
        path: "/images/sell-howworks-3.svg",
        alt: "howworks",
      },
      title: "Proposed Pricing for Customer",
    },
    {
      media: {
        type: "image",
        path: "/images/sell-howworks-img-1.jpg",
        alt: "howworks",
      },
      icon: {
        path: "/images/sell-howworks-4.svg",
        alt: "howworks",
      },
      title: "Purchase agreement",
    },
    {
      media: {
        type: "image",
        path: "/images/sell-howworks-img-1.jpg",
        alt: "howworks",
      },
      icon: {
        path: "/images/sell-howworks-5.svg",
        alt: "howworks",
      },
      title: "Payment process initiated",
    },
    {
      media: {
        type: "image",
        path: "/images/sell-howworks-img-1.jpg",
        alt: "howworks",
      },
      icon: {
        path: "/images/sell-howworks-1.svg",
        alt: "howworks",
      },
      title: "Showroom or home visit as per customer's convenience",
    },
    {
      media: {
        type: "image",
        path: "/images/sell-howworks-img-1.jpg",
        alt: "howworks",
      },
      icon: {
        path: "/images/sell-howworks-2.svg",
        alt: "howworks",
      },
      title: "Road test and document verification",
    },
    {
      media: {
        type: "image",
        path: "/images/sell-howworks-img-1.jpg",
        alt: "howworks",
      },
      icon: {
        path: "/images/sell-howworks-3.svg",
        alt: "howworks",
      },
      title: "Proposed Pricing for Customer",
    },
    {
      media: {
        type: "image",
        path: "/images/sell-howworks-img-1.jpg",
        alt: "howworks",
      },
      icon: {
        path: "/images/sell-howworks-4.svg",
        alt: "howworks",
      },
      title: "Purchase agreement",
    },
    {
      media: {
        type: "image",
        path: "/images/sell-howworks-img-1.jpg",
        alt: "howworks",
      },
      icon: {
        path: "/images/sell-howworks-5.svg",
        alt: "howworks",
      },
      title: "Payment process initiated",
    },
  ],
};
export default function HowWorkSection({ data = howWorkData }) {
  return (
    <section className="w-full h-auto block py-[40px] sm:py-[80px] xl:py-[120px] 2xl:py-[140px] 3xl:py-[180px]">
      <div className="container">
        <div className="w-full sm:max-w-[576px] xl:max-w-[768px] 2xl:max-w-[800px] mx-auto mb-[15px] sm:mb-[20px] xl:mb-[30px] 2xl:mb-[40px]">
          <Heading
            as="h2"
            size="heading1"
            className="text-center text-white mb-[15px] sm:mb-[20px] xl:mb-[30px] 2xl:mb-[40px]"
          >
            {data?.title}
          </Heading>
          <Text
            as="div"
            size="text3"
            className="text-center text-white mb-[15px] sm:mb-[20px] xl:mb-[30px] 2xl:mb-[40px]"
          >
            <div dangerouslySetInnerHTML={{ __html: data?.description }} />
          </Text>
        </div>
        <div className="flex flex-wrap justify-center -mx-[10px] sm:-mx-[15px] xl:-mx-[20px] 2xl:-mx-[30px] [&>*]:px-[10px] sm:[&>*]:px-[15px] xl:[&>*]:px-[20px] 2xl:[&>*]:px-[30px]">
          {data?.howWork_items?.map((item, index) => (
            <div
              key={"howWork_items" + index}
              className="w-full sm:w-1/2 xl:w-1/5"
            >
              <div className="w-full h-auto aspect-square rounded-full overflow-hidden bg-gradient-to-b from-[#252525] to-black relative z-0 flex items-center justify-center mb-[15px] sm:mb-[20px] xl:mb-[30px] 2xl:mb-[40px]">
                <Image
                  src={item?.media?.path}
                  alt={item?.media?.alt}
                  width={278}
                  height={278}
                  className="w-full h-full object-cover absolute -z-1 inset-0 hover:scale-105 opacity-0"
                />
                <Image
                  src={item?.icon?.path}
                  alt={item?.icon?.alt}
                  width={75}
                  height={75}
                  className="w-[30px] sm:w-[50px] xl:w-[75px] h-auto aspect-square object-contain hover:scale-105"
                />

                <div className="text-[12px] sm:text-[14px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[20px] leading-tight font-medium font-base2 text-center text-white">
                  {index < 9 ? "0" + (index + 1) : index + 1}
                </div>
              </div>
              <div className="text-[12px] sm:text-[14px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[20px] leading-tight font-medium font-base2 text-center text-white">
                {item?.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
