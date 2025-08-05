import { Heading } from "@/components/utils/Heading";
import { Text } from "@/components/utils/Text";
import Image from "next/image";

export default function SellInfoSection() {
  return (
    <section className="w-full h-auto block">
      <div className="container ">
        <div className="flex flex-wrap items-center -mx-[-15px] sm:-mx-[20px] xl:-mx-[40px] 2xl:-mx-[60px] [&>*]:px-[15px] sm:[&>*]:px-[20px] xl:[&>*]:px-[40px] 2xl:[&>*]:px-[60px]">
          <div className="w-full sm:w-1/2">
            <div>
              <Heading
                as="h2"
                size="heading1"
                className="text-white mb-[15px] sm:mb-[20px] xl:mb-[30px] 2xl:mb-[40px]"
              >
                We make selling your car easy
              </Heading>
              <Text
                as="div"
                size="text3"
                className="text-white mb-[15px] sm:mb-[20px] xl:mb-[30px] 2xl:mb-[40px]"
              >
                <p>
                  The Range Rover stands as a symbol of refined luxury,
                  cutting-edge technology, and peerless off-road capability.
                  With its bold design, powerful performance, and sophisticated
                  interiors, the Range Rover delivers an unmatched driving
                  experience both on and off the road. Every detail is
                  meticulously crafted—from its sleek, aerodynamic silhouette to
                  the plush, high-quality cabin materials.
                </p>
                <br />
                <p>
                  Equipped with advanced terrain response systems, premium
                  infotainment, and driver-assist technologies, the Range Rover
                  offers both comfort and confidence for every journey. Whether
                  navigating city streets or exploring the wilderness, it
                  ensures elegance, strength, and innovation in perfect harmony.
                </p>
              </Text>
            </div>
          </div>
          <div className="w-full sm:w-1/2">
            <div className="w-full h-auto aspect-square [mask-image:linear-gradient(to_left,white_0%,white_70%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_left,white_0%,white_70%,transparent_100%)] overflow-hidden">
              <Image
                src="/images/sell-sellinfo-1.jpg"
                alt="Sell Your Car"
                width={882}
                height={850}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
