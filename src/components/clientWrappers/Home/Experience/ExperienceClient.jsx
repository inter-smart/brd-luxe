"use client";
import TestimonialTextCard from "@/components/features/home/TestimonialTextCard";
import React, { useCallback, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import useMedia from "use-media";
import dynamic from "next/dynamic";
import { ShineBorder } from "@/components/magicui/shine-border";
const VideoModal = dynamic(() => import("@/components/common/VideoModal"), { ssr: true });

const ExperienceClient = ({ testimonial_section }) => {
  const isMobile = useMedia({ maxWidth: "1279px" });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoClick = useCallback((item) => {
    setSelectedVideo(item);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  }, []);

  const swiperRef = useRef(null);

  return (
    <>
      <div className="w-full xl:w-[60%] 2xl:w-[55%] xl:flex xl:items-center">
        <div className="w-full xl:w-[90%] xl:mr-auto">
          <Swiper
            modules={[Autoplay]}
            loop={testimonial_section?.testimonials?.length > 1}
            slidesPerView={1.4}
            spaceBetween={10}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={800}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className="!h-auto"
            breakpoints={{
              468: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 15,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              1536: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1536: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
          >
            {testimonial_section?.testimonials?.map((item, index) => (
              <SwiperSlide key={`testimonial-${index}`} className="!h-auto">
                {item?.type === "video" ? (
                  <>
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        handleVideoClick(item);
                      }}
                      className="w-full h-full aspect-[280/390] block relative z-0 group overflow-hidden"
                    >
                      <Image
                        src={item?.image?.url || "/images/placeholder.jpg"}
                        alt={item?.image?.alt || "testimonial image"}
                        fill
                        placeholder="blur"
                        blurDataURL="/images/placeholder.jpg"
                        className="object-cover absolute inset-0 z-0 transition-opacity duration-300 group-hover:opacity-0"
                      />
                      <video
                        loop
                        muted
                        playsInline
                        preload="none"
                        className="w-full h-full object-cover absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => e.currentTarget.pause()}
                      >
                        <source src={item?.video?.url} type="video/mp4" />
                      </video>
                      <div className="w-full h-auto p-[8px] sm:p-[10px] 2xl:p-[15px] 3xl:p-[20px] absolute z-10 bottom-0 left-0 right-0 flex items-center">
                        <div className="w-[35px] 2xl:w-[40px] 3xl:w-[50px] h-auto aspect-square bg-white/10 rounded-full backdrop-blur-[15px] flex items-center justify-center relative z-0">
                          <Image src="/images/play_button.svg" alt="play" width={50} height={50} className="w-full h-full object-cover" unoptimized />
                          <ShineBorder borderWidth={2} duration={6} shineColor={["#84838a"]} />
                        </div>
                        <div className="w-[calc(100%-30px)] 2xl:w-[calc(100%-40px)] 3xl:w-[calc(100%-50px)] pl-[10px] 3xl:pl-[15px]">
                          <div className="text-[13px] 2xl:text-[16px] 3xl:text-[20px] leading-[1.2] font-normal font-base1 text-white lg:mb-[2px] 2xl:mb-[5px] 3xl:mb-[10px]">
                            {item?.name}
                          </div>
                          <p className="text-[10px] 2xl:text-[12px] leading-[1.2] font-light font-base2 text-white">{item?.location}</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <TestimonialTextCard item={item} index={index} />
                  </>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {!isMobile ? (
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="group lg:w-[40px] 2xl:w-[60px] 3xl:w-[60px] h-auto aspect-square cursor-pointer rounded-full overflow-hidden transition"
          >
            <Image
              src="/images/slider_nxt_btn.svg"
              alt="icon"
              width={24}
              height={24}
              className="w-full h-full block transition duration-300"
              unoptimized
            />
          </button>
        ) : (
          <div className="2xl:gap-x-[20px] sm:gap-x-[15px] gap-x-[20px] mt-[30px] flex items-center justify-center">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="group w-[40px] lg:w-[50px] h-auto aspect-square border-1 rounded-full overflow-hidden cursor-pointer transition"
            >
              <Image
                src="/images/slider_nxt_btn.svg"
                alt="icon"
                width={24}
                height={24}
                className="w-full h-full block rotate-180 scale-150 transition duration-300 group-hover:opacity-0.7"
                unoptimized
              />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="group w-[40px] lg:w-[50px] h-auto aspect-square border-1 rounded-full overflow-hidden cursor-pointer transition"
            >
              <Image
                src="/images/slider_nxt_btn.svg"
                alt="icon"
                width={24}
                height={24}
                className="w-full h-full block scale-150 transition duration-300 group-hover:opacity-0.7"
                unoptimized
              />
            </button>
          </div>
        )}
      </div>
      {selectedVideo && (
        <VideoModal
          videoUrl={selectedVideo?.video?.url}
          videoPath={selectedVideo?.video?.url}
          name={selectedVideo?.name}
          location={selectedVideo?.location}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default ExperienceClient;
