"use client";
import { useRef, useEffect } from "react";
import { Text } from "../utils/Text";
import { Heading } from "../utils/Heading";
import { ShineBorder } from "../magicui/shine-border";
import { motion, useScroll, useTransform, useInView, useAnimation } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function BrdAdvantageSection({ data }) {

  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleFade = useTransform(scrollYProgress, [0.3, 0.4], [1, 0]);

  const inView = useInView(sectionRef, { amount: 0.5, once: false });
  const headerControls = useAnimation();
  const sliderControls = useAnimation();

  useEffect(() => {
    if (inView) {
      headerControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8 },
      });
      sliderControls.start({
        opacity: 1,
        transition: { duration: 0.8, delay: 0.2 },
      });
    }
  }, [inView, headerControls, sliderControls]);

  return (
    <section
      ref={sectionRef}
      className="w-full h-auto block py-[30px] sm:py-[60px] lg:py-[70px] 2xl:py-[90px] 3xl:py-[115px] relative z-0"
    >
      <motion.div
        style={{ opacity: titleFade }}
        className="text-[32px] sm:text-[48px] md:text-[58px] lg:text-[64px] xl:text-[74px] 2xl:text-[88px] 3xl:text-[110px] leading-[1.5] font-light font-base1 text-white w-full h-full bg-black absolute inset-0 z-2 pointer-events-none flex items-center justify-center"
      >
        {data?.vanishing_title}
      </motion.div>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={headerControls}
          className="max-sm:text-center mb-[30px] sm:mb-[40px] lg:mb-[30px] 2xl:mb-[40px] 3xl:mb-[70px] flex flex-wrap items-center"
        >
          <div className="w-full sm:w-1/2 md:pr-[25%]">
            <Heading
              as="h2"
              size={"heading1"}
              className="text-white max-sm:mb-[15px]"
            >
              {data?.title}
            </Heading>
          </div>
          <div className="w-full sm:w-1/2 sm:pl-[10%]">
            <Text
              as="div"
              className="text-[12px] 2xl:text-[14px] 3xl:text-[16px] leading-[1.7] font-base2 font-normal text-white"
            >
              {data?.description}
            </Text>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={sliderControls}
          className="w-full h-auto"
        >
          <Swiper
            modules={[Autoplay]}
            loop={true}
            slidesPerView={1}
            spaceBetween={10}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            speed={800}
            breakpoints={{
              468: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1536: {
                slidesPerView: 4,
                spaceBetween: 25,
              },
              1771: {
                slidesPerView: 4,
                spaceBetween: 35,
              },
            }}
            className="lg:!py-[30px] 2xl:!py-[40px]"
          >
            {data?.advantages_list?.map((item, index) => 
              item?.title1 && item?.description1 && (
              <SwiperSlide key={`advantage-${index}`} className="!h-auto">
                <div className="w-full h-full p-[15px] sm:p-[20px] 2xl:p-[25px] 3xl:p-[30px] bg-white/2 border-1-white/10 overflow-hidden block transition-all duration-500 hover:lg:translate-y-[-15px] relative z-0">
                  <motion.div
                    className="absolute inset-0 -z-1"
                    initial={{ backgroundPosition: "20% 30%" }}
                    animate={{ backgroundPosition: "80% 70%" }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                    style={{
                      backgroundImage:
                        "radial-gradient(ellipse at center, rgba(28,53,67,1) 0%, transparent 70%)",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "200% 200%",
                      filter: "blur(30px)",
                    }}
                  />
                  <ShineBorder borderWidth={1} shineColor={["#595c5d"]} />
                  <div className="text-[18px] sm:text-[20px] lg:text-[24px] 2xl:text-[28px] 3xl:text-[38px] leading-[1.2] font-light font-base1 text-white mb-[10px]">
                    {item?.title1}
                  </div>
                  <div className="text-[11px] 2xl:text-[13px] 3xl:text-[16px] leading-[1.5] font-normal font-base2 text-white">
                    {item?.description1}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
