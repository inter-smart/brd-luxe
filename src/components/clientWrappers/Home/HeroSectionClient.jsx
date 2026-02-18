"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css/effect-fade";
import "swiper/css";
import CustomPaginationDots from "@/components/common/CustomPaginationDots";
import { TextAnimate } from "../../magicui/text-animate";
import { StyledLink } from "../../utils/Button";

export default function HeroSectionClient({ data }) {
  const banner = data?.banner;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isClient, setIsClient] = useState(false);

  const swiperRef = useRef(null);
  const videoRefs = useRef([]);
  const autoplayDelay = 15000;

  // Handle client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSlideChange = (swiper) => {
    const newIndex = swiper.realIndex;
    setActiveIndex(newIndex);

    if (!isPlaying) {
      setIsPlaying(true);
    }

    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === newIndex) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  };

  const controlPlayback = (play) => {
    setIsPlaying(play);
    const currentVideo = videoRefs.current[activeIndex];
    if (currentVideo) {
      play ? currentVideo.play().catch(() => {}) : currentVideo.pause();
    }
    swiperRef.current?.autoplay[play ? "start" : "stop"]();
  };

  const navigateToSlide = (index) => {
    if (index !== activeIndex) {
      setIsPlaying(true);
      setActiveIndex(index);
      setTimeout(() => {
        swiperRef.current?.autoplay?.start();
      }, 100);
      swiperRef.current?.slideTo(index);
    }
  };

  const firstSlide = banner?.sliders?.[0];

  // Server-side render first slide for better LCP
  if (!isClient && firstSlide) {
    return (
      <section className="w-full h-[570px] sm:h-screen flex items-center justify-center relative z-0">
        <div className="w-full h-full flex flex-col justify-end relative z-0">
          <div className="w-full h-full block absolute inset-0 -z-1">
            {firstSlide?.type === "video" ? (
              <Image
                src={firstSlide?.video?.thumbnail || "/images/home_banner_1.webp"}
                alt={firstSlide?.image?.alt || "Hero banner"}
                fill
                sizes="100vw"
                className="object-cover"
                priority
                quality={90}
              />
            ) : (
              <Image
                src={firstSlide?.image?.url || "/images/home_banner_1.webp"}
                alt={firstSlide?.image?.alt || "Hero banner"}
                fill
                sizes="100vw"
                className="object-cover"
                priority
                quality={90}
              />
            )}
          </div>
          <div className="container">
            <div className="w-full h-auto pb-[70px] sm:pb-[50px] lg:pb-[70px] 2xl:pb-[80px] 3xl:pb-[100px] sm:max-w-[420px] lg:max-w-[550px] 2xl:max-w-[670px] 3xl:max-w-[840px]">
              <p className="text-[12px] sm:text-[13px] lg:text-[14px] 2xl:text-[16px] 3xl:text-[20px] leading-[1.4] font-normal font-base2 max-sm:text-center text-white mb-[15px] sm:mb-[20px] 2xl:mb-[25px] 3xl:mb-[30px]">
                {firstSlide?.title}
              </p>
              <h1 className="text-[32px] sm:text-[42px] lg:text-[54px] 2xl:text-[64px] 3xl:text-[80px] leading-[1] font-light font-base1 text-white max-sm:text-center mb-[20px] sm:mb-[30px] lg:mb-[40px] 2xl:mb-[45px] 3xl:mb-[60px]">
                {firstSlide?.description}
              </h1>
              <div className="w-full h-full [&>*]:pr-[10px] lg:[&>*]:pr-[15px] 2xl:[&>*]:pr-[20px] flex flex-wrap items-center max-sm:justify-center">
                {firstSlide?.buttons?.map(
                  (item, index) =>
                    item?.button_url?.url &&
                    item?.button_title && (
                      <div key={`hero-button-${index}`} className="w-fit h-auto">
                        <StyledLink href={item?.button_url?.url} className="!tracking-[0] max-sm:py-[5px]" target={item?.button_url?.target}>
                          {item?.button_title}
                        </StyledLink>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full h-[570px] sm:h-screen flex items-center justify-center relative z-0">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop={banner?.sliders?.length > 1}
        slidesPerView={1}
        spaceBetween={0}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
        }}
        speed={800}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
        className="w-full h-full"
      >
        {banner?.sliders?.map((item, index) => (
          <SwiperSlide key={`slide-${index}`}>
            {({ isActive }) => (
              <div className="w-full h-full flex flex-col justify-end relative z-0">
                <div className="w-full h-full block absolute inset-0 -z-1">
                  {item?.type === "video" ? (
                    <>
                      {/* Poster image loads first for LCP */}
                      <Image
                        src={item?.video?.thumbnail || "/images/home_banner_1.webp"}
                        alt={item?.image?.alt || "Video thumbnail"}
                        fill
                        sizes="100vw"
                        className={`object-cover transition-opacity duration-300 ${
                          videoRefs.current[index]?.readyState >= 3 ? "opacity-0" : "opacity-100"
                        }`}
                        priority={index === 0}
                        quality={index === 0 ? 90 : 75}
                      />
                      {/* Video loads lazily after first paint */}
                      <video
                        loop
                        muted
                        playsInline
                        preload={index === 0 ? "metadata" : "none"}
                        poster={item?.video?.thumbnail || "/images/home_banner_1.webp"}
                        ref={(el) => {
                          videoRefs.current[index] = el;
                        }}
                        className="w-full h-full object-cover absolute inset-0"
                        onLoadedData={() => {
                          if (index === activeIndex && videoRefs.current[index]) {
                            videoRefs.current[index].play().catch(() => {});
                          }
                        }}
                      >
                        <source src={item?.video?.url} type="video/mp4" />
                      </video>
                    </>
                  ) : (
                    <Image
                      src={item?.image?.url || "/images/home_banner_1.webp"}
                      alt={item?.image?.alt || "Hero banner"}
                      fill
                      sizes="100vw"
                      className="object-cover"
                      priority={index === 0}
                      quality={index === 0 ? 90 : 75}
                    />
                  )}
                </div>
                <div className="container">
                  <div
                    className={`w-full h-auto pb-[70px] sm:pb-[50px] lg:pb-[70px] 2xl:pb-[80px] 3xl:pb-[100px] sm:max-w-[420px] lg:max-w-[550px] 2xl:max-w-[670px] 3xl:max-w-[840px] transition-all ease-in-out duration-500 ${
                      isActive ? "opacity-100 translate-0" : "opacity-0"
                    }`}
                  >
                    <TextAnimate
                      animation="slideUp"
                      by="word"
                      animate={activeIndex === index ? "show" : "hidden"}
                      className="text-[12px] sm:text-[13px] lg:text-[14px] 2xl:text-[16px] 3xl:text-[20px] leading-[1.4] font-normal font-base2 max-sm:text-center text-white mb-[15px] sm:mb-[20px] 2xl:mb-[25px] 3xl:mb-[30px]"
                    >
                      {item?.title}
                    </TextAnimate>
                    <TextAnimate
                      animation="slideUp"
                      by="word"
                      duration={0.7}
                      animate={activeIndex === index ? "show" : "hidden"}
                      className="text-[32px] sm:text-[42px] lg:text-[54px] 2xl:text-[64px] 3xl:text-[80px] leading-[1] font-light font-base1 text-white max-sm:text-center mb-[20px] sm:mb-[30px] lg:mb-[40px] 2xl:mb-[45px] 3xl:mb-[60px]"
                    >
                      {item?.description}
                    </TextAnimate>
                    <div className="w-full h-full [&>*]:pr-[10px] lg:[&>*]:pr-[15px] 2xl:[&>*]:pr-[20px] flex flex-wrap items-center max-sm:justify-center">
                      {item?.buttons?.map(
                        (item, index) =>
                          item?.button_url?.url &&
                          item?.button_title && (
                            <div key={`hero-button-${index}`} className="w-fit h-auto">
                              <StyledLink href={item?.button_url?.url} className="!tracking-[0] max-sm:py-[5px]" target={item?.button_url?.target}>
                                {item?.button_title}
                              </StyledLink>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="hidden sm:block">
        <CustomPaginationDots
          slides={banner?.sliders ?? []}
          activeIndex={activeIndex}
          isPlaying={isPlaying}
          autoplayDelay={autoplayDelay}
          onTogglePlayPause={() => controlPlayback(!isPlaying)}
          onSlideClick={navigateToSlide}
          onProgressComplete={() => {
            const nextIndex = (activeIndex + 1) % (banner?.sliders?.length ?? 1);
            setIsPlaying(true);
            navigateToSlide(nextIndex);
          }}
        />
      </div>
    </section>
  );
}
