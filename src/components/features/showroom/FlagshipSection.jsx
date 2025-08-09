"use client";

import { Heading } from "../../utils/Heading";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const flagShip = [
    { image: "/images/flag1.jpg" },
    { image: "/images/flag2.jpg" },
    { image: "/images/flag3.jpg" },
    { image: "/images/flag4.jpg" },
    { image: "/images/flag5.jpg" },
    { image: "/images/flag6.jpg" },
]

export default function FlagshipSection() {

    // Group into alternating 3/4 layouts
    const slides = [];
    for (let i = 0; i < flagShip.length;) {
        const chunkSize = slides.length % 2 === 0 ? 3 : 4;
        slides.push(flagShip.slice(i, i + chunkSize));
        i += chunkSize;
    }

    return (
        <section className="relative py-[40px_60px]">
            <div className="container">
                <Heading as="h2" size="heading1" className="text-white mb-[20px] xl:mb-[30px]">
                    Our Flagship Locations
                </Heading>

                <Swiper
                    modules={[Pagination, Navigation, Autoplay]}
                    spaceBetween={4}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        1024: { slidesPerView: 2 },
                    }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    speed={800}
                    navigation={{ prevEl: ".testmonial-prev", nextEl: ".testmonial-next" }}
                    className="h-[350px] lg:h-[450px] xl:h-[570px] 2xl:h-[680px] 3xl:h-[850px]"
                >
                    {slides.map((group, index) => {
                        const isLayoutA = index % 2 === 0;
                        return (
                            <SwiperSlide key={index} className="!h-auto">
                                {isLayoutA ? (
                                    <div className="flex flex-wrap w-full h-full">
                                        {group.map((item, idx) => (
                                            <div key={idx} className={`${idx === 2 ? "w-full" : "w-1/2"} p-[5px]`}>
                                                <div className="w-full h-full"> 
                                                    <Image src={item.image} width="415" height="415" alt="flagship" className="w-full h-full object-cover " />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="columns-2 gap-0 w-full h-full">
                                        {group.map((item, idx) => (
                                            <div key={idx} className="p-[5px] break-inside-avoid">
                                                 <div className="w-full h-full"> 
                                                    <Image src={item.image} width="415" height="415" alt="flagship" className="w-full h-full object-cover " />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </section>
    );
}
