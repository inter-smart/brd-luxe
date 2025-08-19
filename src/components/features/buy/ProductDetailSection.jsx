"use client";
import Link from "next/link";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
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

const product_detail_data = {
  heading: {
    title: "About Range Rover Velar",
  },
  car_media_gallery: [
    {
      media: {
        path: "/images/car_detail_1.webp",
        alt: "RANGE ROVER VELAR",
      },
    },
    {
      media: {
        path: "/images/car_detail_2.webp",
        alt: "RANGE ROVER VELAR",
      },
    },
    {
      media: {
        path: "/images/car_detail_3.webp",
        alt: "RANGE ROVER VELAR",
      },
    },
    {
      media: {
        path: "/images/car_detail_4.webp",
        alt: "RANGE ROVER VELAR",
      },
    },
    {
      media: {
        type: "video",
        video_path: "/videos/home_banner.mp4",
        path: "/images/car_detail_1.webp",
        alt: "RANGE ROVER VELAR",
      },
    },
  ],
  car_detail: {
    name: "RANGE ROVER VELAR",
    car_type: "SUV",
    registration_Type: "DL",
    price: "₹ 18 000 000",
    finance_available: true,
    link: "/",
    enquire_link: "/",
    car_specs: [
      {
        icon: {
          path: "/images/car_spec_1.svg",
          alt: "car_spec_1",
        },
        value: "20000 km",
        name: "kms",
      },
      {
        icon: {
          path: "/images/car_spec_2.svg",
          alt: "car_spec_2",
        },
        value: "10 km",
        name: "Mileage",
      },
      {
        icon: {
          path: "/images/car_spec_3.svg",
          alt: "car_spec_3",
        },
        value: "Petrol",
        name: "Fuel",
      },
      {
        icon: {
          path: "/images/car_spec_4.svg",
          alt: "car_spec_4",
        },
        value: "2",
        name: "No. Of Owners",
      },
      {
        icon: {
          path: "/images/car_spec_5.svg",
          alt: "car_spec_5",
        },
        value: "22.12.2025",
        name: "Insurance",
      },
      {
        icon: {
          path: "/images/car_spec_6.svg",
          alt: "car_spec_6",
        },
        value: "2996 cc",
        name: "Engine CC",
      },
      {
        icon: {
          path: "/images/car_spec_7.svg",
          alt: "car_spec_7",
        },
        value: "Automatic",
        name: "Transmission",
      },
      {
        icon: {
          path: "/images/car_spec_8.svg",
          alt: "car_spec_8",
        },
        value: "White",
        name: "Color",
      },
      {
        icon: {
          path: "/images/car_spec_9.svg",
          alt: "car_spec_9",
        },
        value: "23.08.2024",
        name: "Purchase Year",
      },
      {
        icon: {
          path: "/images/car_spec_10.svg",
          alt: "car_spec_10",
        },
        value: "5",
        name: "Seat",
      },
    ],
  },
};

export default function ProductDetailSection({ data = product_detail_data }) {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef(null);

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
              { label: "Buy A Car", href: "/buy-car" },
              {
                label: "RANGE ROVER VELAR",
                href: "/buy-car/RANGE ROVER VELAR",
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
            {data?.heading?.title}
          </Heading>
          <div className="typography">
            <p>
              The Range Rover stands as a symbol of refined luxury, cutting-edge
              technology, and peerless off-road capability. With its bold
              design, powerful performance, and sophisticated interiors, the
              Range Rover delivers an unmatched driving experience both on and
              off the road. Every detail is meticulously crafted—from its sleek,
              aerodynamic silhouette to the plush, high-quality cabin materials.
            </p>
            <p>
              Equipped with advanced terrain response systems, premium
              infotainment, and driver-assist technologies, the Range Rover
              offers both comfort and confidence for every journey. Whether
              navigating city streets or exploring the wilderness, it ensures
              elegance, strength, and innovation in perfect harmony.
            </p>
          </div>
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
              {data?.car_media_gallery?.map((item, index) => (
                <SwiperSlide key={`car-${index}`} className="!h-auto">
                  <div className="swiper-zoom-container w-full h-full block">
                    {item?.media?.type === "video" ? (
                      <div
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={() =>
                          handleVideoClick(item?.media?.video_path)
                        }
                        className="w-full h-full block cursor-pointer relative z-0"
                      >
                        <Image
                          src={item?.media?.path}
                          alt="Video thumbnail"
                          width={400}
                          height={570}
                          className={`w-full h-full absolute inset-0 object-cover transition-opacity duration-300 ${
                            isHovering ? "opacity-0" : "opacity-100"
                          }`}
                        />
                        <video
                          ref={videoRef}
                          src={item?.media?.video_path}
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover"
                        />
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
                          href={item?.media?.path}
                          data-pswp-width="1920"
                          data-pswp-height="1080"
                          className="cursor-pointer"
                        >
                          <Image
                            src={item?.media?.path}
                            alt={item?.media?.alt}
                            width={825}
                            height={570}
                            className="w-full h-full object-cover"
                          />
                        </a>
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
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
                  468: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                  640: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 15,
                  },
                }}
              >
                {data?.car_media_gallery?.map((item, index) => (
                  <SwiperSlide key={`car-${index}`}>
                    <div className="w-full h-[80px] sm:h-[100px] md:h-[120px] lg:h-[185px] 2xl:h-[220px] 3xl:h-[280px] block">
                      <div className="w-full h-full relative">
                        <Image
                          src={item?.media?.path}
                          alt={item?.media?.alt}
                          width={400}
                          height={280}
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
                    {data?.car_detail?.name}
                  </div>
                  <div className="text-[11px] lg:text-[12px] 2xl:text-[14px] 3xl:text-[16px] leading-[1.5] font-medium font-base2 text-white">
                    {data?.car_detail?.car_type}
                  </div>
                </div>
                <div className="w-[25%]">
                  <div className="text-[11px] 2xl:text-[14px] 3xl:text-[16px] leading-[1.5] font-medium font-base2 text-white w-fit h-auto p-[5px_10px] ml-auto rounded-[10px] relative z-0">
                    {data?.car_detail?.registration_Type}
                    <span className="text-[10px] sm:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-[1.5] font-medium font-base2 text-[#727272] block">
                      Registration
                    </span>
                    <ShineBorder borderWidth={1} shineColor={["#4a4a4a"]} />
                  </div>
                </div>
              </div>
              <div className="[&>*]:w-1/2 [&>*]:3xs:w-1/3 [&>*]:sm:w-1/5 [&>*]:p-[5px] [&>*]:3xl:p-[10px] mx-[-5px] 3xl:mx-[-10px] flex flex-wrap">
                {data?.car_detail?.car_specs?.map((item, index) => (
                  <div key={`car_spec-${index}`} className="h-auto block">
                    <div className="w-full h-full p-[10px] 2xl:p-[15px_10px] 3xl:p-[20px_15px] rounded-[10px] overflow-hidden text-center flex flex-col items-center relative z-0">
                      <div className="w-full h-full bg-linear-to-r from-[#D9D9D9] to-[#737373] absolute inset-0 z-[-1] block opacity-[3%]"></div>
                      <div className="w-[30px] sm:w-[30px] 2xl:w-[35px] 3xl:w-[40px] h-auto aspect-square mx-auto mb-[5px] sm:mb-[7px] overflow-hidden flex items-center justify-center">
                        <Image
                          src={item?.icon?.path}
                          alt={item?.icon?.alt}
                          width={50}
                          height={50}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-[12px] sm:text-[13px] 2xl:text-[14px] 3xl:text-[18px] leading-[1] font-normal font-base3 text-white mb-[5px] 3xl:mb-[8px]">
                        {item?.value}
                      </div>
                      <div className="text-[11px] sm:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-[1] font-normal font-base2 text-[#727272]">
                        {item?.name}
                      </div>
                      <ShineBorder
                        borderWidth={1}
                        shineColor={["#4a4a4a"]}
                        duration={10 + (index % 5) * 1.5}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full h-auto p-[15px_20px] sm:p-[20px_30px] 2xl:p-[25px_40px] 3xl:p-[30px_50px] rounded-[10px] flex items-center relative z-0">
              <div className="w-full h-full bg-linear-to-r from-[#D9D9D9] to-[#737373] absolute inset-0 z-[-1] block opacity-[5%]"></div>
              <ShineBorder borderWidth={1} shineColor={["#4a4a4a"]} />
              <div className="w-1/2">
                <div className="text-[13px] 2xl:text-[14px] 3xl:text-[18px] leading-[1] font-medium font-base3 text-white mb-[7px] 2xl:mb-[10px] 3xl:mb-[15px]">
                  {data?.car_detail?.price}
                </div>
                <div className="w-fit h-auto p-[10px] 3xl:p-[10px_15px] rounded-[10px] flex items-center relative z-0">
                  {data?.car_detail?.finance_available && (
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
                  )}
                  <ShineBorder borderWidth={1} shineColor={["#4a4a4a"]} />
                </div>
              </div>
              <div className="w-1/2">
                <div className="flex items-center justify-end">
                  <a
                    href={data?.car_detail?.link}
                    target="_blank"
                    aria-label="whatsapp"
                    className="w-[13px] sm:w-[15px] lg:w-[17px] 2xl:w-[20px] 3xl:w-[25px] h-auto aspect-square flex items-center justify-center transition-all duration-300 ease-in-out relative z-0 hover:opacity-50"
                  >
                    <Image
                      src="/images/whatsapp_icon.svg"
                      alt="Whatsapp"
                      width={25}
                      height={25}
                      className="w-full h-full object-contain"
                    />
                  </a>
                  <div className="ml-[7px] sm:ml-[10px] lg:ml-[15px] 2xl:ml-[18px] 3xl:ml-[25px]">
                    <Link
                      href={data?.car_detail?.enquire_link}
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
            {data?.car_media_gallery?.map((item, index) => (
              <SwiperSlide key={`car-${index}`}>
                <div className="w-full lg:h-[185px] 2xl:h-[220px] 3xl:h-[280px] block">
                  <div className="w-full h-full relative">
                    <Image
                      src={item?.media?.path}
                      alt={item?.media?.alt}
                      width={400}
                      height={280}
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
