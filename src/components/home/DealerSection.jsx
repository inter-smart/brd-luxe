import Image from "next/image";
import { Text } from "../utils/Text";
import { Heading } from "../utils/Heading";
import { StyledLink } from "../utils/Button";

const dealer_data = {
  heading: {
    title: "Welcome To BRD LUXE",
    description:
      "Discover a handpicked collection of pre-owned luxury cars from world-renowned brands like BMW, Mercedes-Benz, Jaguar, Audi, and more. At BRD LUXE, we ensure every car is meticulously inspected with state-of-the-art diagnostic tools, offering you the perfect blend of quality and value.",
  },
  media: {
    path: "/images/dealer_home.webp",
  },
  title: "India's Only Stock Exchange - Listed LuxuryCar Dealers",
};

export default function DealerSection() {
  return (
    <section className="w-full h-auto block py-[90px_200px]">
      <div className="container">
        <div className="[&>*]:w-1/3 flex items-center">
          <div>
            <Heading as="h1" size={"heading1"} className="text-white mb-[20px]">
              {dealer_data?.heading?.title}
            </Heading>
            <Text as="div" size={"text1"} className="text-white">
              {dealer_data?.heading?.description}
            </Text>
          </div>
          <div>
            <div className="w-full h-auto aspect-[510/645] flex items-center justify-center relative z-0">
              <Image
                src={dealer_data?.media?.path}
                alt={dealer_data?.media?.path}
                fill
                sizes="100vw"
                className="object-cover transition-all duration-300 ease-in-out group-hover:scale-105 "
              />
            </div>
          </div>
          <div>
            <Heading as="h1" size={"heading1"} className="text-white mb-[20px]">
              {dealer_data?.title}
            </Heading>
            <StyledLink href="/">Learn More</StyledLink>
          </div>
        </div>
      </div>
    </section>
  );
}
