"use client";
import * as React from "react";

/**
 * Utility function to join class names
 */
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Shine Border
 *
 * An animated background border effect component with configurable properties.
 */
export function ShineBorder({
  borderWidth = 1,
  duration = 14,
  shineColor = "#000000",
  className,
  style,
  ...props
}) {
  const dynamicStyle = {
    "--border-width": `${borderWidth}px`,
    "--duration": `${duration}s`,
    backgroundImage: `radial-gradient(transparent, transparent, ${
      Array.isArray(shineColor) ? shineColor.join(",") : shineColor
    }, transparent, transparent)`,
    backgroundSize: "300% 300%",
    mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
    WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
    padding: "var(--border-width)",
    ...style,
  };

  return (
    <div
      style={dynamicStyle}
      className={cn(
        "pointer-events-none absolute inset-0 size-full rounded-[inherit] will-change-[background-position] motion-safe:animate-shine",
        className
      )}
      {...props}
    />
  );
}
