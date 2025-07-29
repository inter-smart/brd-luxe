"use client";

import { motion } from "framer-motion";
import React from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const animationProps = {
  initial: { "--x": "100%", scale: 0.98 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
};

export const ShinyButton = React.forwardRef(
  (
    {
      href,
      type = "button",
      className = "",
      textClassName = "",
      glowClassName = "",
      children,
      ...props
    },
    ref
  ) => {
    const isLink = Boolean(href);
    const Component = isLink ? motion.a : motion.button;

    return (
      <Component
        ref={ref}
        {...(isLink ? { href } : { type })}
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden lg:p-[8px_20px] 2xl:p-[10px_25px] 3xl:p-[10px_30px] lg:rounded-[6px] 2xl:rounded-[8px] 3xl:rounded-[10px] border transition-shadow duration-300 ease-in-out hover:shadow",
          className
        )}
        {...animationProps}
        {...props}
      >
        <span
          className={cn(
            "w-max relative z-10 block",
            textClassName
          )}
          style={{
            maskImage:
              "linear-gradient(-75deg,var(--primary) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),var(--primary) calc(var(--x) + 100%))",
            WebkitMaskImage:
              "linear-gradient(-75deg,var(--primary) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),var(--primary) calc(var(--x) + 100%))",
          }}
        >
          {children}
        </span>

        <span
          className={cn(
            "absolute inset-0 z-0 rounded-[inherit] p-px",
            glowClassName
          )}
          style={{
            mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
            WebkitMask:
              "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
            backgroundImage:
              "linear-gradient(-75deg,var(--primary)/10% calc(var(--x)+20%),var(--primary)/50% calc(var(--x)+25%),var(--primary)/10% calc(var(--x)+100%))",
          }}
        />
      </Component>
    );
  }
);

ShinyButton.displayName = "ShinyButton";
