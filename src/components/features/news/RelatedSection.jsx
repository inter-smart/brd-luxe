"use client";

import Image from "next/image";
import { Heading } from "../../utils/Heading";
import { StyledLink } from "../../utils/Button";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

export default function RelatedSection({ data }) {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const handleSwiperInit = useCallback((swiper) => {
    setSwiperInstance(swiper);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);

    const currentSlidesPerView = getSlidesPerView(swiper);
    setShowNav(data?.related_posts?.length > currentSlidesPerView);
  }, [data]);

  const handleSlideChange = useCallback((swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  const slidePrev = useCallback(() => swiperInstance?.slidePrev(), [swiperInstance]);
  const slideNext = useCallback(() => swiperInstance?.slideNext(), [swiperInstance]);

  const getSlidesPerView = (swiper) => {
    const width = swiper.width;
    const breakpoints = swiper.params.breakpoints;
    let slidesPerView = swiper.params.slidesPerView;

    if (breakpoints) {
      const matched = Object.keys(breakpoints)
        .filter((bp) => width >= bp)
        .sort((a, b) => Number(a) - Number(b))
        .pop();
      if (matched && breakpoints[matched].slidesPerView) {
        slidesPerView = breakpoints[matched].slidesPerView;
      }
    }
    return slidesPerView;
  };

  useEffect(() => {
    if (swiperInstance) {
      const updateNavVisibility = () => {
        const currentSlidesPerView = getSlidesPerView(swiperInstance);
        setShowNav(data?.related_posts?.length > currentSlidesPerView);
      };
      swiperInstance.on("resize", updateNavVisibility);
      updateNavVisibility();
      return () => swiperInstance.off("resize", updateNavVisibility);
    }
  }, [swiperInstance, data]);

  if (!data?.related_posts?.length) return null;

  return (
    <section className="w-full h-auto py-[10px_40px] sm:py-[10px_60px] xl:py-[15px_80px] 2xl:py-[20px_100px] 3xl:py-[20px_120px]">
      <div className="container">
        <Heading
          as="h2"
          size="heading1"
          className="text-white mb-[15px] sm:mb-[15px] xl:mb-[20px] 2xl:mb-[30px]"
        >
          Recent News & Insights
        </Heading>

        <div className="relative z-0">
          {showNav && (
            <>
              <button
                onClick={slidePrev}
                disabled={isBeginning}
                className={`w-7 sm:w-[20px] lg:w-[25px] 2xl:w-[30px] 3xl:w-[40px] aspect-square text-white rounded-md transition-all duration-300 hover:scale-105 absolute z-2 top-[32%] sm:top-1/2 right-[90%] sm:right-[101%] -translate-y-1/2 ${isBeginning
                    ? "bg-black/10 text-white/30 cursor-not-allowed"
                    : "bg-black/10 hover:bg-white/20"
                  }`}
                aria-label="Previous slide"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full block"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                onClick={slideNext}
                disabled={isEnd}
                className={`w-7 sm:w-[20px] lg:w-[25px] 2xl:w-[30px] 3xl:w-[40px] aspect-square text-white rounded-md transition-all duration-300 hover:scale-105 absolute z-2 top-[32%] sm:top-1/2 left-[90%] sm:left-[101%] -translate-y-1/2 ${isEnd
                    ? "bg-black/10 text-white/30 cursor-not-allowed"
                    : "bg-black/10 hover:bg-white/20"
                  }`}
                aria-label="Next slide"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full block"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          )}

          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={4}
            navigation={false}
            speed={600}
            watchSlidesProgress={true}
            watchOverflow={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 10 },
              448: { slidesPerView: 2, spaceBetween: 10 },
              640: { slidesPerView: 2, spaceBetween: 15 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
              1536: { slidesPerView: 4, spaceBetween: 30 },
            }}
            onSwiper={handleSwiperInit}
            onSlideChange={handleSlideChange}
            onReachBeginning={() => setIsBeginning(true)}
            onReachEnd={() => setIsEnd(true)}
            onFromEdge={() => {
              setIsBeginning(false);
              setIsEnd(false);
            }}
          >
            {data?.related_posts?.map((item, index) => (
              <SwiperSlide key={"news" + index}>
                <Suspense fallback={<div>Loading...</div>}>
                  <div className="group w-full h-auto block">
                    <div className="w-full aspect-[4/3] overflow-hidden mb-[15px] sm:mb-[20px] xl:mb-[40px] 2xl:mb-[50px]">
                      <Image
                        src={item?.media?.path || "/images/placeholder.jpg"}
                        alt={item?.media?.alt || "news image"}
                        width={576}
                        height={432}
                        placeholder="blur"
                        blurDataURL="/images/placeholder.jpg"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>
                    <div className="block">
                      <div className="text-[10px] sm:text-[12px] xl:text-[14px] 2xl:text-[16px] font-light font-base3 text-white/70 mb-[5px] xl:mb-[10px]">
                        {item?.date}
                      </div>
                      <div className="text-[13px] sm:text-[14px] xl:text-[18px] 2xl:text-[20px] 3xl:text-[24px] leading-tight font-light font-base1 line-clamp-2 text-white mb-[5px] xl:mb-[10px] group-hover:text-blue-400 transition-colors duration-300">
                        {item?.title}
                      </div>
                      <div className="text-[10px] sm:text-[12px] xl:text-[14px] 2xl:text-[16px] font-light font-base2 line-clamp-3 text-white/80 mb-[10px] sm:mb-[15px] xl:mb-[20px]">
                        {item?.excerpt}
                      </div>
                      <StyledLink
                        href={`/news/${item?.slug}`}
                        className="min-w-[100px] sm:min-w-[100px] xl:min-w-[120px] 2xl:min-w-[130px] inline-block"
                      >
                        Read More
                      </StyledLink>
                    </div>
                  </div>
                </Suspense>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
