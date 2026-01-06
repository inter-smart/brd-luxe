"use client";

import React, { useState, useEffect, useRef } from "react";

import Image from "next/image";

const TestimonialTextCard = ({ item, index }) => {
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
    const distance = Math.sqrt(Math.pow(gradientPosition.x - elementX, 2) + Math.pow(gradientPosition.y - elementY, 2));
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
      className="w-full h-auto aspect-[200/276] max-sm:h-[270px] bg-white p-[10px] 2xl:p-[15px] 3xl:p-[20px] overflow-hidden relative z-0"
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
            <span key={num} className={`transition-colors duration-300 ${getTextColor(15, 10)}`} style={{ willChange: "color" }}>
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
            <p className={`text-[10px] 2xl:text-[12px] leading-[1.2] font-light font-base2 ${getTextColor(85, 92)}`} style={{ willChange: "color" }}>
              {item?.location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialTextCard;
