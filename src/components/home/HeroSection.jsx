"use client";
import Image from "next/image";
import { Text } from "../utils/Text";
import { Heading } from "../utils/Heading";
import { StyledLink } from "../utils/Button";
import { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const hero_slides = [
    {
        title: "Your Next Luxury Ride Awaits",
        description: "Discover top-tier used cars that match your lifestyle and legacy.",
        media: {
            type: "video",
            path: "/videos/home_banner.mp4",
        },
        hero_buttons: [
            {
                label: "Buy Now",
                url: "/",
            },
            {
                label: "Sell Your Car",
                url: "/cars/sell",
            }
        ]
    },
    {
        title: "Your Next Luxury Ride Awaits - 02",
        description: "Discover top-tier used cars that match your lifestyle and legacy.",
        media: {
            type: "video",
            path: "/videos/home_banner.mp4",
        },
        hero_buttons: [
            {
                label: "Buy Now",
                url: "/",
            },
            {
                label: "Sell Your Car",
                url: "/cars/sell",
            }
        ]
    },
    {
        title: "Your Next Luxury Ride Awaits - 03",
        description: "Discover top-tier used cars that match your lifestyle and legacy.",
        media: {
            type: "video",
            path: "/videos/home_banner.mp4",
        },
        hero_buttons: [
            {
                label: "Buy Now",
                url: "/",
            },
            {
                label: "Sell Your Car",
                url: "/cars/sell",
            }
        ]
    }
];

export default function HeroSection() {

    const isDesktop = useMediaQuery({
        query: "(min-width: 640px)",
    });

    const [activeIndex, setActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const swiperRef = useRef(null);
    const videoRefs = useRef([]);
    const autoplayDelay = 15000;

    const handleSlideChange = (swiper) => {
        const newIndex = swiper.realIndex;
        setActiveIndex(newIndex);

        if (!isPlaying) {
            setIsPlaying(true);
        }

        videoRefs.current.forEach((video, index) => {
            if (video) {
                index === newIndex ? video.play() : video.pause();
            }
        });
    };

    const controlPlayback = (play) => {
        setIsPlaying(play);
        const currentVideo = videoRefs.current[activeIndex];
        if (currentVideo) play ? currentVideo.play() : currentVideo.pause();
        swiperRef.current?.autoplay[play ? 'start' : 'stop']();
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

    return (
        <section className="w-full h-screen flex items-center justify-center relative z-0">
            <Swiper
                modules={[Autoplay, EffectFade]}
                effect={"fade"}
                loop={true}
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
                {hero_slides?.map((item, index) => (
                    <SwiperSlide key={`slide-${index}`}>
                        {({ isActive }) => (
                            <div className={`w-full h-full flex flex-col justify-end relative z-0`}>
                                <div className="w-full h-full block absolute inset-0 -z-1">
                                    {item?.media?.type === "video" ? (
                                        <video
                                            loop
                                            muted
                                            playsInline
                                            autoPlay={index === 0}
                                            ref={(el) => {
                                                videoRefs.current[index] = el;
                                            }}
                                            className="w-full h-full object-cover"
                                        >
                                            <source src={item?.media?.path} type="video/mp4" />
                                        </video>
                                    ) : (
                                        <picture className="absolute -z-2 inset-0">
                                            <source media="(max-width: 640px)" srcSet={item?.media?.path} />
                                            <Image
                                                src={item?.media?.path}
                                                alt={item?.media?.alt}
                                                fill
                                                sizes="100vw, 230px"
                                                className="object-cover"
                                            />
                                        </picture>
                                    )}
                                </div>
                                <div className="container">
                                    <div className={`w-full h-auto pb-[70px] sm:pb-[50px] lg:pb-[70px] 2xl:pb-[80px] 3xl:pb-[100px] sm:max-w-[380px] lg:max-w-[450px] 2xl:max-w-[550px] 3xl:max-w-[700px] transition-all ease-in-out duration-500 ${isActive ? "opacity-100 translate-0" : "opacity-0"}`}>
                                        <Text
                                            as="div"
                                            className="text-[12px] sm:text-[13px] lg:text-[14px] 2xl:text-[16px] 3xl:text-[20px] leading-[1.4] font-normal font-base2 max-sm:text-center text-white mb-[15px] sm:mb-[20px] 2xl:mb-[25px] 3xl:mb-[30px]"
                                        >
                                            {item?.description}
                                        </Text>
                                        <Heading
                                            as="h1"
                                            className="text-[32px] sm:text-[42px] lg:text-[54px] 2xl:text-[64px] 3xl:text-[80px] leading-[1] font-light font-base1 text-white max-sm:text-center mb-[20px] sm:mb-[30px] lg:mb-[40px] 2xl:mb-[45px] 3xl:mb-[60px]"
                                        >
                                            {item?.title}
                                        </Heading>
                                        <div className="w-full h-full [&>*]:pr-[10px] lg:[&>*]:pr-[15px] 2xl:[&>*]:pr-[20px] flex flex-wrap items-center max-sm:justify-center">
                                            {item?.hero_buttons?.map((item, index) => (
                                                <div key={`hero-button-${index}`} className="w-fit h-auto">
                                                    <StyledLink
                                                        href={item?.url}
                                                    >
                                                        {item?.label}
                                                    </StyledLink>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
            {isDesktop && (
                <CustomPaginationDots
                    slides={hero_slides}
                    activeIndex={activeIndex}
                    isPlaying={isPlaying}
                    autoplayDelay={autoplayDelay}
                    onTogglePlayPause={() => controlPlayback(!isPlaying)}
                    onSlideClick={navigateToSlide}
                    onProgressComplete={() => {
                        const nextIndex = (activeIndex + 1) % hero_slides.length;
                        setIsPlaying(true);
                        navigateToSlide(nextIndex);
                    }}
                />
            )}
        </section>
    );
}

function CustomPaginationDots({ slides, activeIndex, isPlaying, autoplayDelay, onTogglePlayPause, onSlideClick, onProgressComplete }) {

    const [progress, setProgress] = useState(0);
    const progressInterval = useRef(null);
    const startTimeRef = useRef(null);
    const pausedAtRef = useRef(0);
    useEffect(() => {
        setProgress(0);
        pausedAtRef.current = 0;

        if (isPlaying) {
            startProgress();
        } else {
            pauseProgress();
        }

        return () => pauseProgress();
    }, [activeIndex]);

    useEffect(() => {
        if (isPlaying) {
            startProgress();
        } else {
            pauseProgress();
        }

        return () => pauseProgress();
    }, [isPlaying]);

    const startProgress = () => {
        pauseProgress();
        const resumeTime = pausedAtRef.current > 0 ? pausedAtRef.current : 0;
        startTimeRef.current = Date.now() - (resumeTime * autoplayDelay / 100);

        const updateProgress = () => {
            const elapsed = Date.now() - startTimeRef.current;
            const newProgress = Math.min((elapsed / autoplayDelay) * 100, 100);

            setProgress(newProgress);

            if (newProgress >= 100) {
                pausedAtRef.current = 0;
                onProgressComplete();
            } else {
                progressInterval.current = requestAnimationFrame(updateProgress);
            }
        };

        progressInterval.current = requestAnimationFrame(updateProgress);
    };
    const pauseProgress = () => {
        if (progressInterval.current) {
            cancelAnimationFrame(progressInterval.current);
            progressInterval.current = null;
            if (startTimeRef.current && !pausedAtRef.current) {
                const elapsed = Date.now() - startTimeRef.current;
                pausedAtRef.current = Math.min((elapsed / autoplayDelay) * 100, 100);
            }
        }
    };

    return (
        <div className="container w-fit h-auto absolute right-0 bottom-0 z-10 pb-[70px] sm:pb-[50px] lg:pb-[70px] 2xl:pb-[80px] 3xl:pb-[100px] flex items-end justify-end">
            <div className="flex items-center space-x-[12px]">
                {slides.map((_, index) => {
                    const isActive = index === activeIndex;
                    return isActive ? (
                        <div key={index} className="relative">
                            <svg className="w-[40px] 2xl:w-[40px] h-auto aspect-square transform -rotate-90" viewBox="0 0 64 64">
                                <circle
                                    cx="32" cy="32" r="28"
                                    fill="none"
                                    stroke="rgba(156, 156, 156, 1)"
                                    strokeWidth="3"
                                />
                                <circle
                                    cx="32" cy="32" r="28"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeDasharray={`${2 * Math.PI * 28}`}
                                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
                                    style={{
                                        transition: pausedAtRef.current === 0 && progress === 0 ? 'stroke-dashoffset 0.3s ease-out' : 'none'
                                    }}
                                />
                            </svg>
                            <button
                                onClick={onTogglePlayPause}
                                className="w-full h-full absolute inset-0 cursor-pointer bg-transparent flex items-center justify-center hover:bg-white/10 rounded-full transition-all duration-200"
                                aria-label={isPlaying ? "Pause" : "Play"}
                            >
                                {isPlaying ? (
                                    <svg
                                        width="10"
                                        height="18"
                                        viewBox="0 0 10 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-[10px] sm:w-[12px] md:w-[14px] lg:w-[16px]"
                                    >
                                        <path
                                            d="M8.38889 0.684143C7.80642 0.684143 7.3342 1.15636 7.3342 1.73883V16.2624C7.3342 16.8448 7.80642 17.3171 8.38889 17.3171C8.97135 17.3171 9.44357 16.8448 9.44357 16.2624V1.73883C9.44357 1.15636 8.97135 0.684143 8.38889 0.684143Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M1.61102 0.68396C1.02855 0.68396 0.556335 1.15618 0.556335 1.73865V16.2622C0.556335 16.8447 1.02855 17.3169 1.61102 17.3169C2.19349 17.3169 2.66571 16.8447 2.66571 16.2622V1.73865C2.66571 1.15618 2.19349 0.68396 1.61102 0.68396Z"
                                            fill="white"
                                        />
                                    </svg>
                                ) : (
                                    <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
                                )}
                            </button>
                        </div>
                    ) : (
                        <button
                            key={index}
                            onClick={() => onSlideClick(index)}
                            className="w-[8px] h-auto aspect-square bg-white rounded-full hover:bg-white/80 transition-all duration-200 hover:scale-110 cursor-pointer"
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    );
                })}
            </div>
        </div>
    );
}
