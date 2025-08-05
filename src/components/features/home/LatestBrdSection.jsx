import Image from "next/image";
import { Heading } from "../../utils/Heading";
import { StyledLink } from "../../utils/Button";

const latest_brd_data = {
  latest_info: [
    {
      media: {
        path: "/images/latest_brd_1.webp",
        alt: "Latest News 1",
      },
      heading: {
        title: "Latest from BRD Luxe",
      },
      date: "01 June 2025",
      title: "Top 5 Pre-Owned Luxury Cars Worth Buying in 2025",
      description:
        "Discover the most reliable, stylish, and high-performing used luxury cars that deliver true value and timeless appeal.",
      link: {
        url: "/",
      },
    },
    {
      media: {
        path: "/images/latest_brd_2.webp",
        alt: "Latest News 2",
      },
      date: "01 June 2025",
      title: "How to Maintain Your Luxury Car Like a Pro",
    },
    {
      media: {
        path: "/images/latest_brd_3.webp",
        alt: "Latest News 3",
      },
      date: "01 June 2025",
      title: "Why Buying a Pre-Owned Luxury Car is a Smart Investment",
    },
  ],
};

export default function LatestBrdSection() {
  return (
    <section className="w-full h-auto border-y border-[#9C9C9C]/40 block">
      <div className="w-full sm:h-[380px] md:h-[430px] 2xl:h-[520px] 3xl:h-[650px] flex flex-wrap">
        <div className="w-full sm:w-1/2">
          {latest_brd_data?.latest_info?.[0] && (
            <div className="group w-full h-[320px] sm:h-full py-[20px] sm:py-[25px] lg:py-[30px] 3xl:py-[40px] max-sm:text-center overflow-hidden flex relative z-0 before:w-full before:h-[25%] before:bg-linear-to-b before:from-black before:to-black/0 before:absolute before:top-0 before:-z-1 after:w-full after:h-[50%] after:bg-linear-to-b after:from-black/0 after:to-black after:absolute after:bottom-0 after:-z-1">
              <Image
                src={latest_brd_data?.latest_info?.[0]?.media?.path}
                alt={latest_brd_data?.latest_info?.[0]?.media?.alt}
                fill
                sizes="100vw"
                className="object-cover -z-2 transition duration-500 ease-in-out group-hover:scale-110"
              />
              <div className="container flex flex-col justify-between">
                <Heading as="div" size={"heading1"} className="text-white">
                  {latest_brd_data?.latest_info?.[0]?.heading?.title}
                </Heading>
                <div>
                  <div className="text-[11px] sm:text-[12px] 2xl:text-[14px] 3xl:text-[16px] leading-1 font-normal text-white font-base3 mb-[7px] sm:mb-[10px] 2xl:mb-[15px]">
                    {latest_brd_data?.latest_info?.[0]?.date}
                  </div>
                  <div className="text-[15px] sm:text-[16px] 2xl:text-[20px] 3xl:text-[25px] leading-[1.5] font-medium font-base1 text-white line-clamp-2 mb-[7px] sm:mb-[10px] 2xl:mb-[15px]">
                    {latest_brd_data?.latest_info?.[0]?.title}
                  </div>
                  <div className="text-[10px] sm:text-[11px] lg:text-[13px] 3xl:text-[16px] leading-[1.5] font-normal font-base2 text-white line-clamp-2 mb-[10px] sm:mb-[15px] 2xl:mb-[25px]">
                    {latest_brd_data?.latest_info?.[0]?.description}
                  </div>
                  <StyledLink
                    href={latest_brd_data?.latest_info?.[0]?.link?.url}
                  >
                    Read More
                  </StyledLink>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-full sm:w-1/2 max-sm:h-[220px] max-sm:flex">
          {latest_brd_data?.latest_info?.length > 1 &&
            latest_brd_data?.latest_info?.slice(1, 3).map((item, index) => (
              <div
                key={`latest_info-${index}`}
                className="w-full h-full sm:h-1/2 block"
              >
                <div
                  className={`group w-full h-full block overflow-hidden relative z-0 before:w-full before:bg-linear-to-b before:from-black before:to-black/0 before:absolute before:top-0 before:-z-1 after:w-full after:h-[50%] after:bg-linear-to-b after:from-black/0 after:to-black after:absolute after:bottom-0 after:-z-1 ${
                    index === 0 && "before:h-[40%]"
                  }`}
                >
                  <Image
                    src={item?.media?.path}
                    alt={item?.media?.alt}
                    fill
                    sizes="100vw"
                    className="object-cover -z-2 transition duration-500 ease-in-out group-hover:scale-110"
                  />
                  <div className="w-full h-full p-[15px_10px] sm:p-[20px_15px] lg:p-[25px_20px] 2xl:p-[30px_25px] 3xl:p-[40px_30px] flex flex-col justify-end">
                    <div className="text-[11px] sm:text-[12px] 2xl:text-[14px] 3xl:text-[16px] leading-1 font-normal text-white font-base3 mb-[10px] 2xl:mb-[15px]">
                      {item?.date}
                    </div>
                    <div className="text-[14px] sm:text-[16px] 2xl:text-[20px] 3xl:text-[25px] leading-[1.5] font-medium font-base1 text-white line-clamp-2">
                      {item?.title}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
