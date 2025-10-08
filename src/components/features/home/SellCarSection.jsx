"use client";
import { useState } from "react";
import Image from "next/image";
import { Text } from "../../utils/Text";
import { Heading } from "../../utils/Heading";
import { StyledLink } from "../../utils/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";

// const CurvedConnector = ({ isHovered, isNextHovered }) => {
//   const getPath = () => {
//     if (isHovered && isNextHovered) {
//       return `M 0 20 L 100 20`;
//     } else if (isHovered && !isNextHovered) {
//       return `M 0 20 Q 40 35 100 60`;
//     } else if (!isHovered && isNextHovered) {
//       return `M 0 60 Q 60 35 100 20`;
//     } else {
//       return `M 0 60 L 100 60`;
//     }
//   };

//   return (
//     <div className="absolute left-1/2 top-1/2 w-full h-[120px] -translate-x-1/2 -translate-y-1/2">
//       <svg
//         width="100%"
//         height="120"
//         viewBox="0 0 100 120"
//         preserveAspectRatio="none"
//         className="absolute inset-0"
//       >
//         <motion.path
//           d={getPath()}
//           stroke="rgba(255, 255, 255, 0.5)"
//           strokeWidth="1.5"
//           fill="none"
//           strokeDasharray="8,8"
//           vectorEffect="non-scaling-stroke"
//           animate={{
//             d: getPath(),
//           }}
//           transition={{
//             duration: 0.6,
//             ease: [0.4, 0, 0.2, 1],
//           }}
//         />
//       </svg>
//     </div>
//   );
// };

export default function SellCarSection({ data }) {
  const sell_your_car_section = data?.sell_your_car_section;

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return sell_your_car_section?.enable__disable_sell_your_car_section ? (
    <section className="w-full h-auto block py-[40px_50px] sm:py-[50px_70px] lg:py-[60px_90px] 2xl:py-[80px_150px] 3xl:py-[95px_185px] border-y border-[#404040]/50 overflow-hidden relative z-0 before:w-full before:h-[30%] before:bg-linear-to-b before:from-black before:to-black/0 before:absolute before:top-0 before:-z-1">
      <div className="w-full h-full block absolute inset-0 -z-3">
        <Image
          src={sell_your_car_section?.background_image?.url || "/images/placeholder.jpg"}
          alt={sell_your_car_section?.background_image?.alt || "sell your car background"}
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL="/images/placeholder.jpg"
          className="object-cover"
        />
      </div>
      <div className="w-full h-full bg-black/80 absolute inset-0 -z-2"></div>
      <div className="container">
        <div className="max-sm:text-center mb-[40px] sm:mb-[50px] lg:mb-[65px] 2xl:mb-[85px] 3xl:mb-[100px] flex flex-wrap items-center">
          <div className="w-full sm:w-1/2 md:pr-[25%]">
            <Heading
              as="h2"
              size={"heading1"}
              className="text-white max-sm:mb-[15px]"
            >
              {sell_your_car_section?.heading}
            </Heading>
          </div>
          <div className="w-full sm:w-1/2 sm:pl-[10%]">
            <Text
              as="div"
              className="text-[12px] sm:text-[10px] 2xl:text-[14px] 3xl:text-[16px] leading-[1.7] font-base2 font-normal text-white mb-[30px]"
            >
              {sell_your_car_section?.description}
            </Text>
            {sell_your_car_section?.button_url?.url &&
              sell_your_car_section?.button_title && (
                <StyledLink
                  href={sell_your_car_section?.button_url?.url}
                  target={sell_your_car_section?.button_url?.target}
                >
                  {sell_your_car_section?.button_title}
                </StyledLink>
              )}
          </div>
        </div>
        <div className="relative">
          <Swiper
            modules={[Autoplay]}
            loop={false}
            slidesPerView={2}
            spaceBetween={50}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            speed={1000}
            breakpoints={{
              468: {
                slidesPerView: 2,
                spaceBetween: 50,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 80,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 80,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 90,
              },
              1536: {
                slidesPerView: 5,
                spaceBetween: 110,
              },
              1771: {
                slidesPerView: 5,
                spaceBetween: 150,
              },
            }}
            className="!p-[40px] 2xl:!p-[50px] !m-[-40px] 2xl:!m-[-50px] max-sm:!overflow-visible"
          >
            {sell_your_car_section?.sell_info_list?.map((item, index) => (
              <SwiperSlide
                key={`sell_info-${index}`}
                className="!h-auto overflow-visible"
                style={{ width: "20%" }}
              >
                <div
                  className="w-full h-full block text-center relative z-0 group"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div
                    className={`text-[32px] sm:text-[38px] lg:text-[48px] 2xl:text-[58px] 3xl:text-[74px] leading-[1.2] font-semibold mb-4 bg-gradient-to-b from-white to-[#3A3838] bg-clip-text text-transparent text-right opacity-50 relative right-[-15%] bottom-[-10%] transition-all duration-500 group-hover:bottom-[1px]`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div
                    className={`w-full h-auto aspect-square rounded-full bg-black/10 backdrop-blur-[20px] border-1 border-[#D9D9D9] mb-[25px] lg:mb-[30px] 2xl:mb-[45px] 3xl:mb-[50px] relative z-0 flex items-center justify-center transition-all duration-500 group-hover:bg-black/50 group-hover:shadow-[0_0_50px_rgba(255,255,255,0.55)] group-hover:-translate-y-[25px]`}
                  >
                    <div className="w-[35px] sm:w-[40px] lg:w-[45px] 2xl:w-[65px] 3xl:w-[80px] h-auto aspect-square overflow-hidden flex items-center justify-center relative z-0">
                      <Image
                        src={item?.image?.url || "/images/placeholder.jpg"}
                        alt={item?.image?.alt || "icon"}
                        fill
                        sizes="100vw"
                        placeholder="blur"
                        blurDataURL="/images/placeholder.jpg"
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div
                    className={`text-[12px] sm:text-[13px] lg:text-[14px] 2xl:text-[16px] 3xl:text-[20px] leading-[1.2] font-normal font-base2 text-white transition-all duration-500 group-hover:-translate-y-[25px]`}
                  >
                    {item?.title}
                  </div>
                  {index <
                    (sell_your_car_section?.sell_info_list?.length ?? 0) -
                      1 && (
                    <div className="absolute left-full top-0 bottom-0 m-auto w-[50px] sm:w-[80px] lg:w-[80px] xl:w-[90px] 2xl:w-[110px] 3xl:w-[150px] h-[60px] z-0">
                      <CurvedConnector
                        isHovered={hoveredIndex === index}
                        isNextHovered={hoveredIndex === index + 1}
                      />
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  ) : null;
}

// const CurvedConnector = ({ isHovered, isNextHovered }) => {
//   const getPath = () => {
//     if (isHovered && isNextHovered) {
//       return `M 0 20 L 100 20`;
//     } else if (isHovered && !isNextHovered) {
//       return `M 0 20 Q 40 35 100 60`;
//     } else if (!isHovered && isNextHovered) {
//       return `M 0 60 Q 60 35 100 20`;
//     } else {
//       return `M 0 60 L 100 60`;
//     }
//   };

//   return (
//     <div className="absolute left-1/2 top-1/2 w-full h-[120px] -translate-x-1/2 -translate-y-1/2">
//       <svg
//         width="100%"
//         height="120"
//         viewBox="0 0 100 120"
//         preserveAspectRatio="none"
//         className="absolute inset-0"
//       >
//         <motion.path
//           d={getPath()}
//           stroke="rgba(255, 255, 255, 0.5)"
//           strokeWidth="1.5"
//           fill="none"
//           strokeDasharray="8,8"
//           vectorEffect="non-scaling-stroke"
//           animate={{
//             d: getPath(),
//           }}
//           transition={{
//             duration: 0.6,
//             ease: [0.4, 0, 0.2, 1],
//           }}
//         />
//       </svg>
//     </div>
//   );
// };

const CurvedConnector = ({ isHovered = false, isNextHovered = false }) => {
  const getPath = () => {
    if (isHovered && isNextHovered) {
      return `M 0 20 L 100 20`;
    } else if (isHovered && !isNextHovered) {
      return `M 0 20 Q 40 35 100 60`;
    } else if (!isHovered && isNextHovered) {
      return `M 0 60 Q 60 35 100 20`;
    } else {
      return `M 0 60 L 100 60`;
    }
  };

  const path = getPath(); // compute once per render

  return (
    <div className="absolute left-1/2 top-1/2 w-full h-[120px] -translate-x-1/2 -translate-y-1/2">
      <svg
        width="100%"
        height="120"
        viewBox="0 0 100 120"
        preserveAspectRatio="none"
        className="absolute inset-0"
      >
        <motion.path
          d={path}
          stroke="rgba(255, 255, 255, 0.5)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="8,8"
          vectorEffect="non-scaling-stroke"
          initial={{ d: "M 0 60 L 100 60" }} // safe fallback path
          animate={{ d: path }}
          transition={{
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      </svg>
    </div>
  );
};
