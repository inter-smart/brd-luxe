import { Text } from "@/components/utils/Text";
import Image from "next/image";

const videoData = {
  media: {
    type: "video",
    path: "/videos/sell-video-1.mp4",
    alt: "Sell Your Car",
  },
  title: "We make selling your car easy",
  description:
    "<p>The Range Rover stands as a symbol of refined luxury, cutting-edge technology, and peerless off-road capability. With its bold design, powerful performance, and sophisticated interiors, the Range Rover delivers an unmatched driving experience both on and off the road. Every detail is meticulously crafted—from its sleek, aerodynamic silhouette to the plush, high-quality cabin materials.</p><br /><p> Equipped with advanced terrain response systems, premium infotainment, and driver-assist technologies, the Range Rover offers both comfort and confidence for every journey. Whether navigating city streets or exploring the wilderness, it ensures elegance, strength, and innovation in perfect harmony.</p>",
  spec_items: [
    {
      media: {
        type: "image",
        path: "/images/sell-video-1.svg",
        alt: "Sell Your Car",
      },
      title: "We make selling your car easy",
    },
    {
      media: {
        type: "image",
        path: "/images/sell-video-2.svg",
        alt: "Sell Your Car",
      },
      title: "Hassle-free documentation",
    },
    {
      media: {
        type: "image",
        path: "/images/sell-video-3.svg",
        alt: "Sell Your Car",
      },
      title: "Instant payment",
    },
    {
      media: {
        type: "image",
        path: "/images/sell-video-4.svg",
        alt: "Sell Your Car",
      },
      title: "Sell from anywhere",
    },
  ],
};

export default function VideoSection({ data = videoData }) {
  return (
    <section className="w-full h-auto min-h-screen flex items-end relative z-0 py-[40px] sm:py-[80px] xl:py-[120px] 2xl:py-[140px] 3xl:py-[180px]">
      {data?.media?.type === "video" ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover absolute -z-1 inset-0"
        >
          <source src={data?.media?.url} type="video/mp4" />
        </video>
      ) : (
        <picture className="absolute -z-1 inset-0">
          <source
            media="(min-width: 640px)"
            srcSet={data?.media?.path}
          ></source>
          <Image
            src={data?.media?.path}
            alt={data?.media?.alt}
            fill
            sizes="100vw"
            className="-z-1 object-cover"
          />
        </picture>
      )}
      <div className="container">
        <div className="flex flex-wrap justify-center -mx-[10px] sm:-mx-[15px] xl:-mx-[20px] 2xl:-mx-[30px] [&>*]:px-[10px] sm:[&>*]:px-[15px] xl:[&>*]:px-[20px] 2xl:[&>*]:px-[30px]">
          {data?.spec_items?.map((item, index) => (
            <div key={"spec_items" + index} className="w-full sm:w-1/2 xl:w-1/4">
              <div className="w-full h-auto p-[10px_15px] sm:p-[15px_20px] xl:p-[20px_30px] bg-gradient-to-tr from-[rgba(217,217,217,0)] to-[rgba(115,115,115,0.1)] flex items-center border-[1px] border-solid border-white/10 rounded-[10px] backdrop-blur-[20px] shadow-sm">
                <Image
                  src={item?.media?.path}
                  alt={item?.media?.alt}
                  width={50}
                  height={50}
                  className="w-[20px] sm:w-[30px] xl:w-[35px] 2xl:w-[40px] h-auto aspect-square object-contain mr-[15px]"
                />
                <Text as="h3" size="text2" className="text-white">
                  {item?.title}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
