import { Heading } from "@/components/utils/Heading";
import { Text } from "@/components/utils/Text";
import Image from "next/image";

const sellInfoData = {
  media: {
    path: "/images/sell-sellinfo-1.jpg",
    alt: "Sell Your Car",
  },
  title: "We Make Selling Your Car Easy",
  description:
    "<p>The Range Rover stands as a symbol of refined luxury, cutting-edge technology, and peerless off-road capability. With its bold design, powerful performance, and sophisticated interiors, the Range Rover delivers an unmatched driving experience both on and off the road. Every detail is meticulously crafted—from its sleek, aerodynamic silhouette to the plush, high-quality cabin materials.</p><br /><p> Equipped with advanced terrain response systems, premium infotainment, and driver-assist technologies, the Range Rover offers both comfort and confidence for every journey. Whether navigating city streets or exploring the wilderness, it ensures elegance, strength, and innovation in perfect harmony.</p>",
};

export default function SellInfoSection({ data = sellInfoData }) {
  return (
    <section className="w-full h-auto block">
      <div className="container sm:container-sp sm:!mr-0 sm:!pr-0">
        <div className="flex flex-wrap items-center -mx-[15px] sm:-mx-[20px] xl:-mx-[40px] 2xl:-mx-[60px] [&>*]:px-[15px] sm:[&>*]:px-[20px] xl:[&>*]:px-[40px] 2xl:[&>*]:px-[60px]">
          <div className="w-full sm:w-1/2 xl:w-[45%]">
            <div className="w-full 2xl:max-w-[768px] py-[30px] sm:py-[40px] xl:py-[60px] 2xl:py-[60px] 3xl:py-[80px]">
              <Heading
                as="h2"
                size="heading1"
                className="text-white mb-[15px] sm:mb-[15px] xl:mb-[20px] 2xl:mb-[30px]"
              >
                {data?.title}
              </Heading>
              <Text
                as="div"
                size="text3"
                className="!font-light text-white mb-[15px] sm:mb-[20px] xl:mb-[30px] 2xl:mb-[40px]"
              >
                <div dangerouslySetInnerHTML={{ __html: data?.description }} />
              </Text>
            </div>
          </div>
          <div className="w-full sm:w-1/2 xl:w-[55%]">
            <div className="w-full h-auto aspect-square [mask-image:linear-gradient(to_left,white_0%,white_70%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_left,white_0%,white_70%,transparent_100%)] overflow-hidden">
              <Image
                src={data?.media?.path}
                alt={data?.media?.alt}
                width={880}
                height={850}
                className="w-full h-full object-cover hover:scale-105 transition origin-right duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
