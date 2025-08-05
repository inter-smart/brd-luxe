"use client";
import { useRef } from "react";
import { Text } from "../../utils/Text";
import { Heading } from "../../utils/Heading";
import { ShineBorder } from "../../magicui/shine-border";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const brd_advantage_data = {
  hide_title: "Why BRD Luxe?",
  heading: {
    title: "The BRD Luxe Advantage",
  },
  description:
    "Experience handpicked luxury, transparent deals, expert guidance, and unmatched after-sales support — all under one trusted name. With BRD Luxe, enjoy hassle-free ownership, exclusive exchange options, and a commitment to quality that redefines pre-owned luxury.",
  brd_advantage_list: [
    {
      title: "Easy Finance",
      description:
        "We have official tie up with all major banks and financial institutions to help you get easy finance upto 90% at the best interest rates with simple documentation.",
    },
    {
      title: "Wide Range of Luxury",
      description:
        "Explore a premium selection of pre-owned luxury cars — Mercedes-Benz, BMW, Audi, Jaguar, Porsche, and more — at unbeatable prices. Our strong sourcing network ensures you find the car you truly want.",
    },
    {
      title: "Quality Assurance",
      description:
        "Our all cars are evaluated by our expert team through rigorous levels of quality checks before purchase using the latest diagnostic tools. We offer warranty for our vehicles.",
    },
    {
      title: "Buyback Assurance",
      description:
        "We offer buyback and exchange options, letting you upgrade to another luxury brand or sell your car easily — no middlemen, no unwanted calls.Ask ChatGPT",
    },
  ],
};

export default function BrdAdvantageSection() {
  
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleFade = useTransform(scrollYProgress, [0, 0.3, 0.4], [0, 1, 0]);
  const headerFade = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
  const sliderFade = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);
  const headerMoveY = useTransform(scrollYProgress, [0.3, 0.4], [50, 0]);

  return (
    <section
      ref={sectionRef}
      className="w-full h-auto block py-[30px] sm:py-[60px] lg:py-[70px] 2xl:py-[90px] 3xl:py-[115px] relative z-0"
    >
      <motion.div
        style={{ opacity: titleFade }}
        className="text-[32px] sm:text-[48px] md:text-[58px] lg:text-[64px] xl:text-[74px] 2xl:text-[88px] 3xl:text-[110px] leading-[1.5] font-light font-base1 text-white w-full h-full bg-black absolute inset-0 z-2 flex items-center justify-center"
      >
        {brd_advantage_data?.hide_title}
      </motion.div>
      <div className="container">
        <motion.div
          style={{ opacity: headerFade, y: headerMoveY }}
          className="max-sm:text-center mb-[30px] sm:mb-[40px] lg:mb-[30px] 2xl:mb-[40px] 3xl:mb-[70px] flex flex-wrap items-center"
        >
          <div className="w-full sm:w-1/2 md:pr-[25%]">
            <Heading
              as="h2"
              size={"heading1"}
              className="text-white max-sm:mb-[15px]"
            >
              {brd_advantage_data?.heading?.title}
            </Heading>
          </div>
          <div className="w-full sm:w-1/2 sm:pl-[10%]">
            <Text
              as="div"
              className="text-[12px] sm:text-[13px] 2xl:text-[14px] 3xl:text-[16px] leading-[1.7] font-base2 font-normal text-white"
            >
              {brd_advantage_data?.description}
            </Text>
          </div>
        </motion.div>
        <motion.div style={{ opacity: sliderFade }} className="w-full h-auto">
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
            {brd_advantage_data?.brd_advantage_list?.map((item, index) => (
              <SwiperSlide key={`advantage-${index}`} className="!h-auto">
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.4,
                    ease: [0.15, 0.25, 0.35, 0.85],
                  }}
                  className="w-full h-full p-[15px] sm:p-[20px] 2xl:p-[25px] 3xl:p-[30px] bg-white/2 border-1-white/10 overflow-hidden block transition-all duration-500 hover:lg:translate-y-[-15px] relative z-0"
                >
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
                    {item?.title}
                  </div>
                  <div className="text-[11px] 2xl:text-[13px] 3xl:text-[16px] leading-[1.5] font-normal font-base2 text-white">
                    {item?.description}
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
