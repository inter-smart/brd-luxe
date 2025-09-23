"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Heading } from "@/components/utils/Heading";
import BreadCrumb from "@/components/common/BreadCrumb";
import { ShineBorder } from "@/components/magicui/shine-border";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css/effect-fade";
import "swiper/css";
import "photoswipe/style.css";
import useMedia from "use-media";

export default function ProductDetailSection({ data, whatsapp_post }) {
  // const isDesktop = useMediaQuery({
  //   query: "(min-width: 1024px)",
  // });

  const [isDesktop, setIsDesktop] = useState(false);

  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");
    setIsDesktop(mediaQuery.matches);
    const handleResize = () => setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#gallery",
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleVideoClick = (videoPath) => {
    setVideoSrc(videoPath);
    setIsVideoOpen(true);
  };

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <section className="w-full h-auto py-[20px_40px] sm:py-[20px_50px] lg:py-[20px_70px] 2xl:py-[25px_80px] 3xl:py-[30px_100px] mt-[var(--header-y)] border-t-1 border-[#808080]/50 block">
      <div className="container">
        <div className="mb-[20px] lg:mb-[30px] 2xl:mb-[60px] block">
          <BreadCrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Buy A Car", href: "/buy_a_car" },
              {
                label: data?.cartitle,
                href: `/buy/${data?.slug}`,
              },
            ]}
          />
        </div>
        <div className="mb-[35px] sm:mb-[45px] lg:mb-[65px] 2xl:mb-[80px] 3xl:mb-[100px]">
          <Heading
            as="h1"
            size={"heading1"}
            className="text-white mb-[15px] md:mb-[20px] 2xl:mb-[40px] 3xl:mb-[50px]"
          >
            {data?.detail_page_title}
          </Heading>
          <div
            className="typography"
            dangerouslySetInnerHTML={{
              __html: data?.detail_page_description || "",
            }}
          ></div>
        </div>
        <div className="w-full mb-[10px] sm:mb-[20px] lg:mb-[25px] 2xl:mb-[30px] 3xl:mb-[35px] flex flex-wrap">
          <div className="w-full lg:w-[40%] xl:w-1/2 lg:pr-[20px] 2xl:pr-[25px] 3xl:pr-[30px] mb-[10px] sm:mb-[15px] lg:mb-0">
            <Swiper
              modules={[Thumbs, EffectFade]}
              effect="fade"
              speed={500}
              thumbs={{ swiper: thumbsSwiper }}
              className="h-[240px] sm:!h-[280px] md:!h-[340px] lg:!h-full mb-[10px] sm:mb-[15px] lg:mb-0"
            >
              {/* First image from data.media */}
              {/* {data?.media?.path && ( */}
              {/* <SwiperSlide key="car-main" className="!h-auto">
                  <div className="swiper-zoom-container w-full h-full block">
                    <div id="gallery" className="w-full h-full">
                      <a
                        href={data?.media?.path || "/images/placeholder.jpg"}
                        data-pswp-width="1920"
                        data-pswp-height="1080"
                        className="cursor-pointer"
                      >
                        <Image
                          src={data?.media?.path || "/images/placeholder.jpg"}
                          alt={data?.media?.alt || "Main car image"}
                          width={825}
                          height={570}
                          placeholder="blur"
                          blurDataURL="/images/placeholder.jpg"
                          className="w-full h-full object-cover"
                        />
                      </a>
                    </div>
                  </div>
                </SwiperSlide> */}
              {/* )} */}

              {/* Rest of car_images */}
              {data?.car_images && data.car_images.length > 0 ? (
                data.car_images.map((item, index) => (
                  <SwiperSlide key={`car-${index}`} className="!h-auto">
                    <div className="swiper-zoom-container w-full h-full block">
                      {item?.type === "video" ? (
                        <div
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                          onClick={() => handleVideoClick(item?.url)}
                          className="w-full h-full block cursor-pointer relative z-0"
                        >
                          {/* Placeholder image */}
                          <Image
                            src={item?.placeholder || "/images/placeholder.jpg"}
                            alt="Video placeholder"
                            width={400}
                            height={570}
                            placeholder="blur"
                            blurDataURL="/images/placeholder.jpg"
                            className={`w-full h-full absolute inset-0 object-cover transition-opacity duration-300 ${
                              isHovering ? "opacity-0" : "opacity-100"
                            }`}
                          />
                          {/* Actual video */}
                          <video
                            ref={videoRef}
                            src={item?.url}
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                          />
                          {/* Play button overlay */}
                          <div
                            className={`w-[35px] lg:w-[40px] 2xl:w-[50px] 3xl:w-[65px] h-auto aspect-square rounded-[10px] overflow-hidden absolute bottom-0 right-0 m-[10px] ${
                              isHovering ? "opacity-0" : "opacity-100"
                            }`}
                          >
                            <Image
                              src="/images/vudeo_button.svg"
                              alt="Video button"
                              width={40}
                              height={40}
                              className="w-full h-full object-cover scale-125"
                            />
                            <ShineBorder
                              borderWidth={1}
                              shineColor={["#4a4a4a"]}
                            />
                          </div>
                        </div>
                      ) : (
                        <div id="gallery" className="w-full h-full">
                          <a
                            href={item?.url}
                            data-pswp-width="1920"
                            data-pswp-height="1080"
                            className="cursor-pointer"
                          >
                            <Image
                              src={item?.url || "/images/placeholder.jpg"}
                              alt={item?.alt || "car image"}
                              width={825}
                              height={570}
                              placeholder="blur"
                              blurDataURL="/images/placeholder.jpg"
                              className="w-full h-full object-cover"
                            />
                          </a>
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                // fallback placeholder
                <SwiperSlide key="car-placeholder" className="!h-auto">
                  <div className="swiper-zoom-container w-full h-full block">
                    <Image
                      src="/images/placeholder.jpg"
                      alt="placeholder image"
                      width={825}
                      height={570}
                      placeholder="blur"
                      blurDataURL="/images/placeholder.jpg"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              )}
            </Swiper>

            {/* Thumbnails only for mobile */}
            {!isDesktop && (
              <Swiper
                modules={[Thumbs, Autoplay]}
                slidesPerView={2}
                spaceBetween={10}
                autoplay={{ delay: 2000, pauseOnMouseEnter: true }}
                speed={500}
                watchSlidesProgress
                onSwiper={setThumbsSwiper}
                breakpoints={{
                  468: { slidesPerView: 3, spaceBetween: 10 },
                  640: { slidesPerView: 4, spaceBetween: 10 },
                  768: { slidesPerView: 4, spaceBetween: 15 },
                }}
              >
                {/* First thumb from data.media */}
                {/* {data?.media?.path && (
                  <SwiperSlide key="thumb-main">
                    <div className="w-full h-[80px] sm:h-[100px] md:h-[120px] lg:h-[185px] 2xl:h-[220px] 3xl:h-[280px] block">
                      <div className="w-full h-full relative">
                        <Image
                          src={data?.media?.path || "/images/placeholder.jpg"}
                          alt={data?.media?.alt || "Main car image"}
                          width={400}
                          height={280}
                          placeholder="blur"
                          blurDataURL="/images/placeholder.jpg"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                )} */}

                {/* Rest of car_images */}
                {data?.car_images?.map((item, index) => (
                  <SwiperSlide key={`thumb-${index}`}>
                    <div className="w-full h-[80px] sm:h-[100px] md:h-[120px] lg:h-[185px] 2xl:h-[220px] 3xl:h-[280px] block">
                      <div className="w-full h-full relative">
                        <Image
                          src={
                            item?.type === "video"
                              ? item?.placeholder || "/images/placeholder.jpg"
                              : item?.url || "/images/placeholder.jpg"
                          }
                          alt={item?.alt || "Placeholder image"}
                          width={400}
                          height={280}
                          placeholder="blur"
                          blurDataURL="/images/placeholder.jpg"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          <div className="lg:w-[60%] xl:w-1/2">
            <div className="w-full h-auto p-[20px] sm:p-[25px] md:p-[30px] 2xl:p-[40px] 3xl:p-[50px] mb-[10px] 3xl:mb-[15px] rounded-[10px] relative z-0">
              <ShineBorder borderWidth={1} shineColor={["#4a4a4a"]} />
              <div className="w-full h-full bg-linear-to-r from-[#D9D9D9] to-[#737373] absolute inset-0 z-[-1] block opacity-[5%]"></div>
              <div className="mb-[10px] lg:mb-[17px] 2xl:mb-[20px] 3xl:mb-[30px] flex flex-wrap items-center">
                <div className="w-[75%]">
                  <div className="text-[16px] sm:text-[20px] lg:text-[24px] 2xl:text-[28px] 3xl:text-[35px] leading-[1.5] font-normal font-base1 text-white mb-[5px] 3xl:mb-[10px]">
                    {data?.cartitle}
                  </div>
                  <div className="text-[11px] lg:text-[12px] 2xl:text-[14px] 3xl:text-[16px] leading-[1.5] font-medium font-base2 text-white">
                    {data?.model}
                  </div>
                </div>
                {data?.registration && (
                  <div className="w-[25%]">
                    <div className="text-[11px] 2xl:text-[14px] 3xl:text-[16px] leading-[1.5] font-medium font-base2 text-white w-fit h-auto p-[5px_10px] ml-auto rounded-[10px] relative z-0">
                      {data?.registration}
                      <span className="text-[10px] sm:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-[1.5] font-medium font-base2 text-[#727272] block">
                        Registration
                      </span>
                      <ShineBorder borderWidth={1} shineColor={["#4a4a4a"]} />
                    </div>
                  </div>
                )}
              </div>
              <div className="[&>*]:w-1/2 [&>*]:3xs:w-1/3 [&>*]:sm:w-1/5 [&>*]:p-[5px] [&>*]:3xl:p-[10px] mx-[-5px] 3xl:mx-[-10px] flex flex-wrap">
                {data?.kms && (
                  <div className="h-auto block">
                    <div className="w-full h-full p-[10px] 2xl:p-[15px_10px] 3xl:p-[20px_15px] rounded-[10px] overflow-hidden text-center flex flex-col items-center relative z-0">
                      <div className="w-full h-full bg-linear-to-r from-[#D9D9D9] to-[#737373] absolute inset-0 z-[-1] block opacity-[3%]"></div>
                      <div className="w-[30px] sm:w-[30px] 2xl:w-[35px] 3xl:w-[40px] h-auto aspect-square mx-auto mb-[5px] sm:mb-[7px] overflow-hidden flex items-center justify-center">
                        <Image
                          src="/images/car_spec_1.svg"
                          alt="car_spec_1"
                          width={50}
                          height={50}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-[12px] sm:text-[13px] 2xl:text-[14px] 3xl:text-[18px] leading-[1] font-normal font-base3 text-white mb-[5px] 3xl:mb-[8px]">
                        {data?.kms} km
                      </div>
                      <div className="text-[11px] sm:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-[1] font-normal font-base2 text-[#727272]">
                        kms
                      </div>
                      <ShineBorder
                        borderWidth={1}
                        shineColor={["#4a4a4a"]}
                        duration={10}
                      />
                    </div>
                  </div>
                )}
                {data?.mileage && (
                  <div className="h-auto block">
                    <div className="w-full h-full p-[10px] 2xl:p-[15px_10px] 3xl:p-[20px_15px] rounded-[10px] overflow-hidden text-center flex flex-col items-center relative z-0">
                      <div className="w-full h-full bg-linear-to-r from-[#D9D9D9] to-[#737373] absolute inset-0 z-[-1] block opacity-[3%]"></div>
                      <div className="w-[30px] sm:w-[30px] 2xl:w-[35px] 3xl:w-[40px] h-auto aspect-square mx-auto mb-[5px] sm:mb-[7px] overflow-hidden flex items-center justify-center">
                        <Image
                          src="/images/car_spec_2.svg"
                          alt="car_spec_2"
                          width={50}
                          height={50}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-[12px] sm:text-[13px] 2xl:text-[14px] 3xl:text-[18px] leading-[1] font-normal font-base3 text-white mb-[5px] 3xl:mb-[8px]">
                        {data?.mileage} km
                      </div>
                      <div className="text-[11px] sm:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-[1] font-normal font-base2 text-[#727272]">
                        Mileage
                      </div>
                      <ShineBorder
                        borderWidth={1}
                        shineColor={["#4a4a4a"]}
                        duration={10}
                      />
                    </div>
                  </div>
                )}
                {data?.fuel_type && (
                  <div className="h-auto block">
                    <div className="w-full h-full p-[10px] 2xl:p-[15px_10px] 3xl:p-[20px_15px] rounded-[10px] overflow-hidden text-center flex flex-col items-center relative z-0">
                      <div className="w-full h-full bg-linear-to-r from-[#D9D9D9] to-[#737373] absolute inset-0 z-[-1] block opacity-[3%]"></div>
                      <div className="w-[30px] sm:w-[30px] 2xl:w-[35px] 3xl:w-[40px] h-auto aspect-square mx-auto mb-[5px] sm:mb-[7px] overflow-hidden flex items-center justify-center">
                        <Image
                          src="/images/car_spec_3.svg"
                          alt="car_spec_3"
                          width={50}
                          height={50}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-[12px] sm:text-[13px] 2xl:text-[14px] 3xl:text-[18px] leading-[1] font-normal font-base3 text-white mb-[5px] 3xl:mb-[8px]">
                        {data?.fuel_type}
                      </div>
                      <div className="text-[11px] sm:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-[1] font-normal font-base2 text-[#727272]">
                        Fuel
                      </div>
                      <ShineBorder
                        borderWidth={1}
                        shineColor={["#4a4a4a"]}
                        duration={10}
                      />
                    </div>
                  </div>
                )}
                {data?.no_of_owners && (
                  <div className="h-auto block">
                    <div className="w-full h-full p-[10px] 2xl:p-[15px_10px] 3xl:p-[20px_15px] rounded-[10px] overflow-hidden text-center flex flex-col items-center relative z-0">
                      <div className="w-full h-full bg-linear-to-r from-[#D9D9D9] to-[#737373] absolute inset-0 z-[-1] block opacity-[3%]"></div>
                      <div className="w-[30px] sm:w-[30px] 2xl:w-[35px] 3xl:w-[40px] h-auto aspect-square mx-auto mb-[5px] sm:mb-[7px] overflow-hidden flex items-center justify-center">
                        <Image
                          src="/images/car_spec_4.svg"
                          alt="car_spec_4"
                          width={50}
                          height={50}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-[12px] sm:text-[13px] 2xl:text-[14px] 3xl:text-[18px] leading-[1] font-normal font-base3 text-white mb-[5px] 3xl:mb-[8px]">
                        {data?.no_of_owners}
                      </div>
                      <div className="text-[11px] sm:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-[1] font-normal font-base2 text-[#727272]">
                        No. Of Owners
                      </div>
                      <ShineBorder
                        borderWidth={1}
                        shineColor={["#4a4a4a"]}
                        duration={10}
                      />
                    </div>
                  </div>
                )}
                {data?.insurance && (
                  <div className="h-auto block">
                    <div className="w-full h-full p-[10px] 2xl:p-[15px_10px] 3xl:p-[20px_15px] rounded-[10px] overflow-hidden text-center flex flex-col items-center relative z-0">
                      <div className="w-full h-full bg-linear-to-r from-[#D9D9D9] to-[#737373] absolute inset-0 z-[-1] block opacity-[3%]"></div>
                      <div className="w-[30px] sm:w-[30px] 2xl:w-[35px] 3xl:w-[40px] h-auto aspect-square mx-auto mb-[5px] sm:mb-[7px] overflow-hidden flex items-center justify-center">
                        <Image
                          src="/images/car_spec_5.svg"
                          alt="car_spec_5"
                          width={50}
                          height={50}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-[12px] sm:text-[13px] 2xl:text-[14px] 3xl:text-[18px] leading-[1] font-normal font-base3 text-white mb-[5px] 3xl:mb-[8px]">
                        {data?.insurance}
                      </div>
                      <div className="text-[11px] sm:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-[1] font-normal font-base2 text-[#727272]">
                        Insurance
                      </div>
                      <ShineBorder
                        borderWidth={1}
                        shineColor={["#4a4a4a"]}
                        duration={10}
                      />
                    </div>
                  </div>
                )}
                {data?.engine_cc && (
                  <div className="h-auto block">
                    <div className="w-full h-full p-[10px] 2xl:p-[15px_10px] 3xl:p-[20px_15px] rounded-[10px] overflow-hidden text-center flex flex-col items-center relative z-0">
                      <div className="w-full h-full bg-linear-to-r from-[#D9D9D9] to-[#737373] absolute inset-0 z-[-1] block opacity-[3%]"></div>
                      <div className="w-[30px] sm:w-[30px] 2xl:w-[35px] 3xl:w-[40px] h-auto aspect-square mx-auto mb-[5px] sm:mb-[7px] overflow-hidden flex items-center justify-center">
                        <Image
                          src="/images/car_spec_6.svg"
                          alt="car_spec_6"
                          width={50}
                          height={50}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-[12px] sm:text-[13px] 2xl:text-[14px] 3xl:text-[18px] leading-[1] font-normal font-base3 text-white mb-[5px] 3xl:mb-[8px]">
                        {data?.engine_cc}
                      </div>
                      <div className="text-[11px] sm:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-[1] font-normal font-base2 text-[#727272]">
                        Engine CC
                      </div>
                      <ShineBorder
                        borderWidth={1}
                        shineColor={["#4a4a4a"]}
                        duration={10}
                      />
                    </div>
                  </div>
                )}
                {data?.transmissions && (
                  <div className="h-auto block">
                    <div className="w-full h-full p-[10px] 2xl:p-[15px_10px] 3xl:p-[20px_15px] rounded-[10px] overflow-hidden text-center flex flex-col items-center relative z-0">
                      <div className="w-full h-full bg-linear-to-r from-[#D9D9D9] to-[#737373] absolute inset-0 z-[-1] block opacity-[3%]"></div>
                      <div className="w-[30px] sm:w-[30px] 2xl:w-[35px] 3xl:w-[40px] h-auto aspect-square mx-auto mb-[5px] sm:mb-[7px] overflow-hidden flex items-center justify-center">
                        <Image
                          src="/images/car_spec_7.svg"
                          alt="car_spec_7"
                          width={50}
                          height={50}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-[12px] sm:text-[13px] 2xl:text-[14px] 3xl:text-[18px] leading-[1] font-normal font-base3 text-white mb-[5px] 3xl:mb-[8px]">
                        {data?.transmissions}
                      </div>
                      <div className="text-[11px] sm:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-[1] font-normal font-base2 text-[#727272]">
                        Transmission
                      </div>
                      <ShineBorder
                        borderWidth={1}
                        shineColor={["#4a4a4a"]}
                        duration={10}
                      />
                    </div>
                  </div>
                )}
                {data?.color && (
                  <div className="h-auto block">
                    <div className="w-full h-full p-[10px] 2xl:p-[15px_10px] 3xl:p-[20px_15px] rounded-[10px] overflow-hidden text-center flex flex-col items-center relative z-0">
                      <div className="w-full h-full bg-linear-to-r from-[#D9D9D9] to-[#737373] absolute inset-0 z-[-1] block opacity-[3%]"></div>
                      <div className="w-[30px] sm:w-[30px] 2xl:w-[35px] 3xl:w-[40px] h-auto aspect-square mx-auto mb-[5px] sm:mb-[7px] overflow-hidden flex items-center justify-center">
                        <Image
                          src="/images/car_spec_8.svg"
                          alt="car_spec_8"
                          width={50}
                          height={50}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-[12px] sm:text-[13px] 2xl:text-[14px] 3xl:text-[18px] leading-[1] font-normal font-base3 text-white mb-[5px] 3xl:mb-[8px]">
                        {data?.color}
                      </div>
                      <div className="text-[11px] sm:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-[1] font-normal font-base2 text-[#727272]">
                        Color
                      </div>
                      <ShineBorder
                        borderWidth={1}
                        shineColor={["#4a4a4a"]}
                        duration={10}
                      />
                    </div>
                  </div>
                )}
                {data?.purchase_year && (
                  <div className="h-auto block">
                    <div className="w-full h-full p-[10px] 2xl:p-[15px_10px] 3xl:p-[20px_15px] rounded-[10px] overflow-hidden text-center flex flex-col items-center relative z-0">
                      <div className="w-full h-full bg-linear-to-r from-[#D9D9D9] to-[#737373] absolute inset-0 z-[-1] block opacity-[3%]"></div>
                      <div className="w-[30px] sm:w-[30px] 2xl:w-[35px] 3xl:w-[40px] h-auto aspect-square mx-auto mb-[5px] sm:mb-[7px] overflow-hidden flex items-center justify-center">
                        <Image
                          src="/images/car_spec_9.svg"
                          alt="car_spec_9"
                          width={50}
                          height={50}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-[12px] sm:text-[13px] 2xl:text-[14px] 3xl:text-[18px] leading-[1] font-normal font-base3 text-white mb-[5px] 3xl:mb-[8px]">
                        {data?.purchase_year}
                      </div>
                      <div className="text-[11px] sm:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-[1] font-normal font-base2 text-[#727272]">
                        Purchase Year
                      </div>
                      <ShineBorder
                        borderWidth={1}
                        shineColor={["#4a4a4a"]}
                        duration={10}
                      />
                    </div>
                  </div>
                )}
                {data?.seat && (
                  <div className="h-auto block">
                    <div className="w-full h-full p-[10px] 2xl:p-[15px_10px] 3xl:p-[20px_15px] rounded-[10px] overflow-hidden text-center flex flex-col items-center relative z-0">
                      <div className="w-full h-full bg-linear-to-r from-[#D9D9D9] to-[#737373] absolute inset-0 z-[-1] block opacity-[3%]"></div>
                      <div className="w-[30px] sm:w-[30px] 2xl:w-[35px] 3xl:w-[40px] h-auto aspect-square mx-auto mb-[5px] sm:mb-[7px] overflow-hidden flex items-center justify-center">
                        <Image
                          src="/images/car_spec_10.svg"
                          alt="car_spec_10"
                          width={50}
                          height={50}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-[12px] sm:text-[13px] 2xl:text-[14px] 3xl:text-[18px] leading-[1] font-normal font-base3 text-white mb-[5px] 3xl:mb-[8px]">
                        {data?.seat}
                      </div>
                      <div className="text-[11px] sm:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-[1] font-normal font-base2 text-[#727272]">
                        Seat
                      </div>
                      <ShineBorder
                        borderWidth={1}
                        shineColor={["#4a4a4a"]}
                        duration={10}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full h-auto p-[15px_20px] sm:p-[20px_30px] 2xl:p-[25px_40px] 3xl:p-[30px_50px] rounded-[10px] flex items-center relative z-0">
              <div className="w-full h-full bg-linear-to-r from-[#D9D9D9] to-[#737373] absolute inset-0 z-[-1] block opacity-[5%]"></div>
              <ShineBorder borderWidth={1} shineColor={["#4a4a4a"]} />
              <div className="w-1/2">
                {data?.price && (
                  <div className="text-[13px] 2xl:text-[14px] 3xl:text-[18px] leading-[1] font-medium font-base3 text-white mb-[7px] 2xl:mb-[10px] 3xl:mb-[15px]">
                    ₹ {data?.price}
                  </div>
                )}
                {data?.finance_available && (
                  <div className="w-fit h-auto p-[10px] 3xl:p-[10px_15px] rounded-[10px] flex items-center relative z-0">
                    <>
                      <div className="text-[12px] 3xl:text-[18px] leading-[1] font-normal font-base1 text-white pr-[8px]">
                        Finance Available
                      </div>
                      <div className="w-[10px] h-auto aspect-square flex items-center justify-center">
                        <Image
                          src="/images/arrow_icon.svg"
                          alt="Finance"
                          width={10}
                          height={10}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </>
                    <ShineBorder borderWidth={1} shineColor={["#4a4a4a"]} />
                  </div>
                )}
              </div>
              <div className="w-1/2">
                <div className="flex items-center justify-end">
                  <a
                    href={`https://wa.me/${whatsapp_post?.number?.replace(
                      /\D/g,
                      ""
                    )}?text=${encodeURIComponent(
                      `Hi, I am interested in ${data?.cartitle}`
                    )}`}
                    target="_blank"
                    aria-label="whatsapp"
                    className="w-[13px] sm:w-[15px] lg:w-[17px] 2xl:w-[20px] 3xl:w-[25px] h-auto aspect-square flex items-center justify-center transition-all duration-300 ease-in-out relative z-0 hover:opacity-50"
                  >
                    <Image
                      src={
                        whatsapp_post?.icon?.url || "/images/placeholder.jpg"
                      }
                      alt={whatsapp_post?.icon?.alt || "Whatsapp"}
                      width={25}
                      height={25}
                      className="w-full h-full object-contain"
                    />
                  </a>
                  <div className="ml-[7px] sm:ml-[10px] lg:ml-[15px] 2xl:ml-[18px] 3xl:ml-[25px]">
                    <Link
                      href="#carenquiryform"
                      className="text-[11px] sm:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-[1.2] font-semibold font-base1 text-white w-fit h-auto bg-black p-[5px_8px] sm:p-[8px_12px] 2xl:p-[10px_15px] 3xl:p-[12px_20px] rounded-[5px] sm:rounded-[7px] 3xl:rounded-[10px] border-1 border-[#BEBEBE] block hover:bg-[#F29A0D] hover:border-white hover:text-white transition-all duration-300 ease-in-out"
                    >
                      Enquire Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isDesktop && (
          <Swiper
            modules={[Thumbs, Autoplay]}
            slidesPerView={4}
            watchSlidesProgress
            onSwiper={setThumbsSwiper}
            autoplay={{ delay: 2000, pauseOnMouseEnter: true }}
            speed={500}
            breakpoints={{
              1024: {
                slidesPerView: 4,
                spaceBetween: 25,
              },
              1536: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              1771: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
          >
            {/* First thumb from data.media */}
            {/* {data?.media?.path && (
              <SwiperSlide key="car-main">
                <div className="w-full lg:h-[185px] 2xl:h-[220px] 3xl:h-[280px] block">
                  <div className="w-full h-full relative">
                    <Image
                      src={data?.media?.path || "/images/placeholder.jpg"}
                      alt={data?.media?.alt || "Main car image"}
                      width={400}
                      height={280}
                      placeholder="blur"
                      blurDataURL="/images/placeholder.jpg"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </SwiperSlide>
            )} */}

            {/* Rest of car_images */}
            {data?.car_images?.map((item, index) => (
              <SwiperSlide key={`car-${index}`}>
                <div className="w-full lg:h-[185px] 2xl:h-[220px] 3xl:h-[280px] block">
                  <div className="w-full h-full relative">
                    <Image
                      src={
                        item?.type === "video"
                          ? item?.placeholder || "/images/placeholder.jpg"
                          : item?.url || "/images/placeholder.jpg"
                      }
                      alt={item?.alt}
                      width={400}
                      height={280}
                      placeholder="blur"
                      blurDataURL="/images/placeholder.jpg"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {isVideoOpen && videoSrc && (
          <div
            className="fixed inset-0 z-50 p-4 bg-black bg-opacity-90 flex items-center justify-center"
            onClick={() => setIsVideoOpen(false)}
          >
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <video
                src={videoSrc}
                controls
                autoPlay
                className="max-w-4xl max-h-[85vh] w-full"
              />
              <button
                onClick={() => setIsVideoOpen(false)}
                className="w-[25px] sm:w-[30px] 2xl:w-[40px] h-[25px] sm:h-[30px] 2xl:h-[40px] p-[8px] bg-white rounded-full absolute -top-3 -right-3 flex items-center justify-center text-black font-bold hover:bg-white/50"
              >
                <Image
                  src="/images/close_button.png"
                  alt="close"
                  width={50}
                  height={50}
                  className="w-full h-full object-contain"
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
