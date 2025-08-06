import { Text } from "@/components/utils/Text";
import { Heading } from "@/components/utils/Heading";

const product_detail_data = {
  heading: {
    title: "About Range Rover Velar",
  },
  description_list: [
    {
      description:
        "The Range Rover stands as a symbol of refined luxury, cutting-edge technology, and peerless off-road capability. With its bold design, powerful performance, and sophisticated interiors, the Range Rover delivers an unmatched driving experience both on and off the road. Every detail is meticulously crafted—from its sleek, aerodynamic silhouette to the plush, high-quality cabin materials.Equipped with advanced terrain response systems, premium infotainment, and driver-assist technologies, the Range Rover offers both comfort and confidence for every journey. Whether navigating city streets or exploring the wilderness, it ensures elegance, strength, and innovation in perfect harmony.",
    },
    {
      description:
        "Equipped with advanced terrain response systems, premium infotainment, and driver-assist technologies, the Range Rover offers both comfort and confidence for every journey. Whether navigating city streets or exploring the wilderness, it ensures elegance, strength, and innovation in perfect harmony.",
    },
  ],
};

export default function ProductDetailSection({ data = product_detail_data }) {
  return (
    <section className="w-full h-auto py-[70px_170px] block">
      <div className="container">
        <div>
          <Heading
            as="h1"
            size={"heading1"}
            className="text-white mb-[15px] sm:mb-[20px] 2xl:mb-[25px] 3xl:mb-[35px]"
          >
            {data?.heading?.title}
          </Heading>
          {data?.description_list?.map((item, index) => (
            <Text
              key={`product-${index}`}
              as="div"
              size={"text1"}
              className="text-white mb-[25px]"
            >
              {item?.description}
            </Text>
          ))}
        </div>
      </div>
    </section>
  );
}
