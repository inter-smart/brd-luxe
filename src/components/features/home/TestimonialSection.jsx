"use client";
import Image from "next/image";
import { Text } from "../../utils/Text";
import { Heading } from "../../utils/Heading";
import { StyledLink } from "../../utils/Button";
import { ShineBorder } from "../../magicui/shine-border";
import { useState, useCallback, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import VideoModal from "@/components/common/VideoModal";
import useMedia from "use-media";

export default function ExperienceSection({ data }) {
  const testimonial_section = data?.testimonial_section;

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

  return testimonial_section?.enable__disable_testimonial_section ? (
    <section className="w-full h-auto block py-[40px] sm:py-[50px] md:py-[70px] lg:py-[90px] 2xl:py-[110px] 3xl:py-[140px]">
      <div className="container">
        <div className="flex flex-wrap items-center">
          <div className="w-full xl:w-[40%] 2xl:w-[45%] xl:pr-[50px] 2xl:pr-[60px] 3xl:pr-[75px] mb-[30px] md:mb-[40px] xl:mb-0 max-xl:flex max-xl:flex-col max-xl:items-center max-xl:justify-center max-xl:text-center">
            <Heading
              as="h2"
              size={"heading1"}
              className="text-white mb-[10px] sm:mb-[15px] lg:mb-[20px] 2xl:mb-[30px] 3xl:mb-[40px]"
            >
              {testimonial_section?.title}
            </Heading>
            <Text
              as="div"
              className="text-[12px] 2xl:text-[14px] 3xl:text-[16px] leading-[1.7] font-base2 font-normal text-white max-w-[85%] mb-[20px] lg:mb-[30px]"
            >
              {testimonial_section?.description}
            </Text>
            {testimonial_section?.button_url?.url &&
              testimonial_section?.button_title && (
                <StyledLink
                  href={testimonial_section?.button_url?.url}
                  target={testimonial_section?.button_url?.target}
                >
                  {testimonial_section?.button_title}
                </StyledLink>
              )}
          </div>
          <div className="w-full xl:w-[60%] 2xl:w-[55%] xl:flex xl:items-center">
            <div className="w-full xl:w-[90%] xl:mr-auto">
              <Swiper
                modules={[Autoplay]}
                loop={true}
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
                              <Image
                                src="/images/play_button.svg"
                                alt="play"
                                width={50}
                                height={50}
                                className="w-full h-full object-cover"
                              />
                              <ShineBorder
                                borderWidth={2}
                                duration={6}
                                shineColor={["#84838a"]}
                              />
                            </div>
                            <div className="w-[calc(100%-30px)] 2xl:w-[calc(100%-40px)] 3xl:w-[calc(100%-50px)] pl-[10px] 3xl:pl-[15px]">
                              <div className="text-[13px] 2xl:text-[16px] 3xl:text-[20px] leading-[1.2] font-normal font-base1 text-white lg:mb-[2px] 2xl:mb-[5px] 3xl:mb-[10px]">
                                {item?.name}
                              </div>
                              <p className="text-[10px] 2xl:text-[12px] leading-[1.2] font-light font-base2 text-white">
                                {item?.location}
                              </p>
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
                  />
                </button>
              </div>
            )}
          </div>
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
      </div>
    </section>
  ) : null;
}

function TestimonialTextCard({ item, index }) {
  const [gradientPosition, setGradientPosition] = useState({ x: 20, y: 20 });
  const cardRef = useRef(null);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    const animationDuration = 12000;
    const delay = index * 1500;

    const animate = (currentTime) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime - delay;
      }

      const elapsed = (currentTime - startTimeRef.current) % animationDuration;
      const progress = elapsed / animationDuration;

      let x, y;

      if (progress < 0.25) {
        const localProgress = progress / 0.25;
        x = localProgress * 100;
        y = 15;
      } else if (progress < 0.5) {
        const localProgress = (progress - 0.25) / 0.25;
        x = 85;
        y = 15 + localProgress * 70;
      } else if (progress < 0.75) {
        const localProgress = (progress - 0.5) / 0.25;
        x = 85 - localProgress * 70;
        y = 85;
      } else {
        const localProgress = (progress - 0.75) / 0.25;
        x = 15;
        y = 85 - localProgress * 70;
      }

      const waveX = Math.sin(progress * Math.PI * 4) * 8;
      const waveY = Math.cos(progress * Math.PI * 3) * 6;

      x = Math.max(5, Math.min(95, x + waveX));
      y = Math.max(5, Math.min(95, y + waveY));

      setGradientPosition({ x, y });
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [index]);

  const getTextColor = (elementX, elementY) => {
    const distance = Math.sqrt(
      Math.pow(gradientPosition.x - elementX, 2) +
        Math.pow(gradientPosition.y - elementY, 2)
    );
    return distance < 45 ? "text-white" : "text-gray-900";
  };

  const circleStyle = {
    left: `${gradientPosition.x}%`,
    top: `${gradientPosition.y}%`,
    transform: "translate(-50%, -50%)",
    willChange: "transform, left, top",
  };

  return (
    <div
      ref={cardRef}
      className="w-full h-auto aspect-[200/276] bg-white p-[10px] 2xl:p-[15px] 3xl:p-[20px] overflow-hidden relative z-0"
    >
      <div
        className="w-[150px] sm:w-[180px] lg:w-[220px] 2xl:w-[250px] h-auto aspect-square bg-black rounded-full absolute z-10 pointer-events-none transition-all duration-500 ease-out"
        style={{
          ...circleStyle,
          filter: "blur(50px)",
          filter: "blur(50px)",
          transition: "none",
          backfaceVisibility: "hidden",
          perspective: 1000,
        }}
      />
      <div className="w-full h-full relative z-50">
        <div className="gap-[2px] 2xl:gap-[4px] mb-[10px] flex items-center">
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              className={`transition-colors duration-300 ${getTextColor(
                15,
                10
              )}`}
              style={{ willChange: "color" }}
            >
              {item.rating >= num ? "★" : "☆"}
            </span>
          ))}
        </div>
        <div
          className={`text-[10px] sm:text-[11px] 2xl:text-[13px] 3xl:text-[16px] leading-[1.5] font-normal font-base2 line-clamp-5 transition-colors duration-300 ${getTextColor(
            50,
            35
          )}`}
          style={{ willChange: "color" }}
          dangerouslySetInnerHTML={{ __html: item?.testimonial }}
        />
        <div className="w-full h-auto absolute bottom-0 flex items-center">
          <div className="w-[35px] 2xl:w-[40px] 3xl:w-[50px] h-auto aspect-square rounded-full flex items-center justify-center relative z-0">
            <Image
              src={item?.profile_image?.url || "/images/placeholder.jpg"}
              alt={item?.profile_image?.alt || "testimonial image"}
              width={50}
              height={50}
              placeholder="blur"
              blurDataURL="/images/placeholder.jpg"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="w-[calc(100%-30px)] 2xl:w-[calc(100%-40px)] 3xl:w-[calc(100%-50px)] pl-[10px] 3xl:pl-[15px]">
            <div
              className={`text-[13px] 2xl:text-[16px] 3xl:text-[20px] leading-[1.2] font-normal font-base1 lg:mb-[2px] 2xl:mb-[5px] 3xl:mb-[10px] transition-colors duration-300 ${getTextColor(
                85,
                85
              )}`}
              style={{ willChange: "color" }}
            >
              {item?.name}
            </div>
            <p
              className={`text-[10px] 2xl:text-[12px] leading-[1.2] font-light font-base2 ${getTextColor(
                85,
                92
              )}`}
              style={{ willChange: "color" }}
            >
              {item?.location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// function TestimonialTextCard({ item, index }) {
//   const [gradientPosition, setGradientPosition] = useState({ x: 20, y: 20 });
//   const cardRef = useRef(null);
//   const animationRef = useRef(null);
//   useEffect(() => {
//     let startTime = Date.now();
//     const animationDuration = 8000;
//     const delay = index * 2000;

//     const animate = () => {
//       const elapsed = (Date.now() - startTime + delay) % animationDuration;
//       const progress = elapsed / animationDuration;

//       const angle = progress * Math.PI * 2;
//       const radiusX = 30;
//       const radiusY = 25;
//       const variation = Math.sin(progress * Math.PI * 3) * 8;

//       const x = 50 + Math.cos(angle) * radiusX + variation;
//       const y =
//         50 +
//         Math.sin(angle) * radiusY +
//         Math.cos(progress * Math.PI * 2.5) * 12;

//       setGradientPosition({ x, y });
//       animationRef.current = requestAnimationFrame(animate);
//     };

//     setTimeout(() => {
//       animationRef.current = requestAnimationFrame(animate);
//     }, delay);

//     return () => {
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, [index]);

//   const getTextColor = (elementX, elementY) => {
//     const distance = Math.sqrt(
//       Math.pow(gradientPosition.x - elementX, 2) +
//         Math.pow(gradientPosition.y - elementY, 2)
//     );
//     return distance < 35 ? "text-white" : "text-black";
//   };

//   const circleStyle = {
//     left: `${gradientPosition.x}%`,
//     top: `${gradientPosition.y}%`,
//     transform: "translate(-50%, -50%)",
//   };

//   return (
//     <div
//       ref={cardRef}
//       className="w-full h-auto aspect-[200/276] bg-white p-[10px] 2xl:p-[15px] 3xl:p-[20px] overflow-hidden relative z-0"
//     >
//       <div
//         className="w-[150px] sm:w-[180px] lg:w-[220px] 2xl:w-[250px] h-auto aspect-square bg-black rounded-full absolute z-10 pointer-events-none transition-all duration-500 ease-out"
//         style={{
//           ...circleStyle,
//           filter: "blur(50px)",
//         }}
//       />
//       <div className="w-full h-full relative z-50">
//         <div className="gap-[2px] 2xl:gap-[4px] mb-[10px] flex items-center">
//           {[1, 2, 3, 4, 5].map((num) => (
//             <span
//               key={num}
//               className={`transition-colors duration-300 ${getTextColor(
//                 15,
//                 10
//               )}`}
//             >
//               {item.rating >= num ? "★" : "☆"}
//             </span>
//           ))}
//         </div>
//         <div
//           className={`text-[10px] sm:text-[11px] 2xl:text-[13px] 3xl:text-[16px] leading-[1.5] font-normal font-base2 line-clamp-5 transition-colors duration-300 ${getTextColor(
//             50,
//             35
//           )}`}
//           dangerouslySetInnerHTML={{ __html: item?.testimonial }}
//         />
//         <div className="w-full h-auto absolute bottom-0 flex items-center">
//           <div className="w-[35px] 2xl:w-[40px] 3xl:w-[50px] h-auto aspect-square rounded-full flex items-center justify-center relative z-0">
//             <Image
//               src={item?.profile_image?.url || "/images/placeholder.jpg"}
//               alt={item?.profile_image?.alt || "testimonial image"}
//               width={50}
//               height={50}
//               placeholder="blur"
//               blurDataURL="/images/placeholder.jpg"
//               className="w-full h-full object-cover rounded-full"
//             />
//           </div>
//           <div className="w-[calc(100%-30px)] 2xl:w-[calc(100%-40px)] 3xl:w-[calc(100%-50px)] pl-[10px] 3xl:pl-[15px]">
//             <div
//               className={`text-[13px] 2xl:text-[16px] 3xl:text-[20px] leading-[1.2] font-normal font-base1 text-white lg:mb-[2px] 2xl:mb-[5px] 3xl:mb-[10px] transition-colors duration-300 ${getTextColor(
//                 85,
//                 85
//               )}`}
//             >
//               {item?.name}
//             </div>
//             <p
//               className={`text-[10px] 2xl:text-[12px] leading-[1.2] font-light font-base2 text-white ${getTextColor(
//                 85,
//                 92
//               )}`}
//             >
//               {item?.location}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
