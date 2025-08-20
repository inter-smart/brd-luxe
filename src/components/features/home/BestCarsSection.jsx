"use client";
import Link from "next/link";
import Image from "next/image";
import { Text } from "@/components/utils/Text";
import React, { useState, useEffect } from "react";
import { Heading } from "@/components/utils/Heading";
import { motion, useAnimation } from "framer-motion";
import { ShineBorder } from "../../magicui/shine-border";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const best_cars_data = {
  heading: {
    title: "Best Luxury Cars in India",
    description:
      "Experience unparalleled elegance and cutting-edge performance with our finest selection of luxury cars in India.",
  },
  cars_list: [
    {
      url: "/",
      media: {
        path: "/images/car_list_1.png",
        alt: "SUV",
      },
      title: "SUV",
    },
    {
      url: "/",
      media: {
        path: "/images/car_list_2.png",
        alt: "Sedan",
      },
      title: "Sedan",
    },
    {
      url: "/",
      media: {
        path: "/images/car_list_3.png",
        alt: "MUV",
      },
      title: "MUV",
    },
    {
      url: "/",
      media: {
        path: "/images/car_list_4.png",
        alt: "Super Luxury",
      },
      title: "Super Luxury",
    },
    {
      url: "/",
      media: {
        path: "/images/car_list_5.png",
        alt: "Coupe",
      },
      title: "Coupe",
    },
    {
      url: "/",
      media: {
        path: "/images/car_list_4.png",
        alt: "Super Luxury",
      },
      title: "Super Luxury",
    },
  ],
};

export default function BestCarsSection({ data = best_cars_data }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  return (
    <section className="w-full h-auto block py-[40px_30px] lg:py-[45px_35px] 2xl:py-[50px_40px] 3xl:py-[70px_50px] border-y-1 border-[#404040]/50">
      <div className="container">
        <div className="mb-[20px] sm:mb-[30px] lg:mb-[35px] 2xl:mb-[40px] 3xl:mb-[50px] max-sm:text-center flex flex-wrap justify-between">
          <div className="w-full sm:w-1/2">
            <Heading
              as="h1"
              size={"heading1"}
              className="text-white max-sm:mb-[15px]"
            >
              {data?.heading?.title}
            </Heading>
          </div>
          <div className="w-full sm:w-[40%]">
            <Text as="div" className="text-[12px] sm:text-[12px] xl:text-[13px] 2xl:text-[16px] 3xl:text-[20px] leading-normal font-light tracking-tight font-base2 text-white">
              {data?.heading?.description}
            </Text>
          </div>
        </div>
        <div className="w-full h-auto">
          <Swiper
            modules={[Autoplay]}
            loop={true}
            slidesPerView={1}
            spaceBetween={0}
            autoplay={{
              delay: 300000,
              pauseOnMouseEnter: true,
              disableOnInteraction: false,
              reverseDirection: true,
            }}
            speed={800}
            breakpoints={{
              468: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
              1920: { slidesPerView: 5 },
            }}
          >
            {data?.cars_list?.map((item, index) => (
              <SwiperSlide key={`slide-${index}`} className="!h-auto">
                <Link
                  href={item?.url}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group w-full h-full p-[20px_10px_15px_10px] sm:p-[30px_15px_20px_15px] lg:p-[40px_20px_25px_20px] 2xl:p-[60px_30px_35px_30px] rounded-[10px] overflow-hidden block relative z-0"
                >
                  <div className="w-full h-full bg-linear-to-r from-[#D9D9D9] to-[#737373] absolute inset-0 -z-1 opacity-0 group-hover:opacity-5"></div>
                  <ShineBorder
                    borderWidth={2}
                    shineColor={["#252529"]}
                    className={"opacity-0 group-hover:opacity-100 "}
                  />
                  <div className="relative w-full h-auto ">
                    <CarMotion item={item} hovered={hoveredIndex === index} />
                    <SpeedCarAnimation isActive={hoveredIndex === index} />
                  </div>
                  <div className="flex items-center justify-center">
                    <Text
                      as="div"
                      className="text-[11px] lg:text-[12px] 2xl:text-[14px] 3xl:text-[16px] leading-[1] font-normal font-base2 uppercase tracking-[2px] max-sm:text-center text-white"
                    >
                      {item?.title}
                    </Text>
                    <span className="w-[10px] h-auto aspect-square ml-[5px] 2xl:ml-[10px] 3xl:ml-[15px] transform scale-[0.8] 2xl:scale-100 opacity-0 flex items-center justify-center transition duration-200 group-hover:opacity-100">
                      <svg
                        width="15"
                        height="12"
                        viewBox="0 0 4 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.33333 3.66659C3.33333 3.74409 3.30618 3.82167 3.25195 3.88083L0.474181 6.91113C0.36564 7.02954 0.189878 7.02954 0.0814058 6.91113C-0.0270659 6.79272 -0.0271353 6.60098 0.0814058 6.48265L2.66278 3.66659L0.0814056 0.850535C-0.0271356 0.732126 -0.0271356 0.540383 0.0814055 0.42205C0.189947 0.303717 0.36571 0.303641 0.474181 0.42205L3.25195 3.45235C3.30618 3.51152 3.33333 3.58909 3.33333 3.66659Z"
                          fill="#D2C8C8"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

function CarMotion({ item, hovered }) {
  const controls = useAnimation();

  useEffect(() => {
    let isCancelled = false;

    const startSequence = async () => {
      await controls.start({
        x: "150%",
        transition: { duration: 0.25, ease: "easeIn" },
      });
      if (isCancelled) return;
      controls.set({ x: "-100%" });

      if (isCancelled) return;
      await controls.start({
        x: 0,
        transition: { duration: 0.2, ease: "easeOut" },
      });

      if (isCancelled) return;
      await controls.start({
        x: [0, -1, 1, -1, 1, 0],
        y: [0, -1, 1, 1, -1, 0],
        transition: {
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut",
        },
      });
    };

    if (hovered) {
      controls.stop();
      controls.set({ x: 0, y: 0 });
      startSequence();
    } else {
      isCancelled = true;
      controls.stop();
      controls.set({ x: 0, y: 0 });
    }

    return () => {
      isCancelled = true;
    };
  }, [hovered]);

  return (
    <motion.div
      animate={controls}
      className="w-full h-auto aspect-[230/65] mb-[10px] lg:mb-[15px] 3xl:mb-[20px] flex items-center justify-center relative z-0"
    >
      <div className="relative w-full h-full">
        <Image
          src={item?.media?.path}
          alt={item?.media?.alt}
          fill
          sizes="100vw, 230px"
          className="object-contain transition duration-300"
        />
      </div>
    </motion.div>
  );
}

function SpeedCarAnimation({ isActive }) {
  const lines = Array.from({ length: 5 }, (_, i) => i);
  const [widths, setWidths] = useState(lines.map(() => 30));

  useEffect(() => {
    if (isActive) {
      setWidths(lines.map(() => 20 + Math.random() * 30));
    }
  }, [isActive]);

  return (
    <>
      <div className="absolute inset-0 pointer-events-none">
        {lines.map((line, index) => (
          <motion.div
            key={`line-${line}`}
            className="absolute h-0.5 bg-gradient-to-r from-transparent via-[#D9D9D9] to-transparent opacity-50"
            style={{
              top: `${25 + line * 12}%`,
              width: `${widths[index]}px`,
              right: "25%",
            }}
            initial={{ x: "100%" }}
            animate={
              isActive
                ? {
                    x: [100, -150],
                    opacity: [0, 0.7, 0],
                  }
                : {
                    x: 100,
                    opacity: 0,
                  }
            }
            transition={{
              duration: 0.5,
              delay: line * 0.06,
              repeat: isActive ? Infinity : 0,
              repeatDelay: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </>
  );
}

// function SpeedCarAnimation({ isActive }) {
//   const lines = Array.from({ length: 5 }, (_, i) => i);
//   return (
//     <>
//       <div className="absolute inset-0  pointer-events-none">
//         {lines.map((line) => (
//           <motion.div
//             key={`line-${line}`}
//             className="absolute h-0.5 bg-gradient-to-r from-transparent via-[#D9D9D9] to-transparent opacity-50"
//             style={{
//               top: `${25 + line * 12}%`,
//               width: `${20 + Math.random() * 30}px`,
//               right: "25%",
//             }}
//             initial={{ x: "100%" }}
//             animate={
//               isActive
//                 ? {
//                     x: [100, -150],
//                     opacity: [0, 0.7, 0],
//                   }
//                 : {
//                     x: 100,
//                     opacity: 0,
//                   }
//             }
//             transition={{
//               duration: 0.5,
//               delay: line * 0.06,
//               repeat: isActive ? Infinity : 0,
//               repeatDelay: 0.4,
//               ease: [0.25, 0.46, 0.45, 0.94],
//             }}
//           />
//         ))}
//       </div>
//       <motion.div
//         initial={{ opacity: 1 }}
//         animate={{ opacity: isActive ? 1 : 0 }}
//         transition={{ duration: 0.3 }}
//       />
//     </>
//   );
// }
