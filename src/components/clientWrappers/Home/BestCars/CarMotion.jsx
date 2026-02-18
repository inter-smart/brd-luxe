"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

import Image from "next/image";

export default function CarMotion({ item, hovered }) {
  const controls = useAnimation();

  useEffect(() => {
    let isCancelled = false;

    const startSequence = async () => {
      await controls.start({
        x: "150%",
        transition: { duration: 0.25, ease: "easeIn" },
      });
      if (isCancelled) return;
      controls.set({ x: "-100%" });

      if (isCancelled) return;
      await controls.start({
        x: 0,
        transition: { duration: 0.2, ease: "easeOut" },
      });

      if (isCancelled) return;
      await controls.start({
        x: [0, -1, 1, -1, 1, 0],
        y: [0, -1, 1, 1, -1, 0],
        transition: {
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut",
        },
      });
    };

    if (hovered) {
      controls.stop();
      controls.set({ x: 0, y: 0 });
      startSequence();
    } else {
      isCancelled = true;
      controls.stop();
      controls.set({ x: 0, y: 0 });
    }

    return () => {
      isCancelled = true;
    };
  }, [hovered]);

  return (
    <motion.div
      animate={controls}
      className="w-full h-auto aspect-[230/65] mb-[10px] lg:mb-[15px] 3xl:mb-[20px] flex items-center justify-center relative z-0"
    >
      <div className="relative w-full h-full">
        <Image
          src={item?.image?.url || "/images/placeholder.jpg"}
          alt={item?.image?.alt}
          fill
          sizes="100vw, 230px"
          placeholder="blur"
          blurDataURL="/images/placeholder.jpg"
          className="object-contain transition duration-300"
        />
      </div>
    </motion.div>
  );
}
