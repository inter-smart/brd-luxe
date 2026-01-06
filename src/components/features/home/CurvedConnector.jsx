"use client";
import { motion } from "framer-motion";

export default function CurvedConnector({ isHovered = false, isNextHovered = false }) {
  const getPath = () => {
    if (isHovered && isNextHovered) {
      return `M 0 20 L 100 20`;
    } else if (isHovered && !isNextHovered) {
      return `M 0 20 Q 40 35 100 60`;
    } else if (!isHovered && isNextHovered) {
      return `M 0 60 Q 60 35 100 20`;
    } else {
      return `M 0 60 L 100 60`;
    }
  };

  const path = getPath(); // compute once per render

  return (
    <div className="absolute left-1/2 top-1/2 w-full h-[120px] -translate-x-1/2 -translate-y-1/2">
      <svg width="100%" height="120" viewBox="0 0 100 120" preserveAspectRatio="none" className="absolute inset-0">
        <motion.path
          d={path}
          stroke="rgba(255, 255, 255, 0.5)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="8,8"
          vectorEffect="non-scaling-stroke"
          initial={{ d: "M 0 60 L 100 60" }} // safe fallback path
          animate={{ d: path }}
          transition={{
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      </svg>
    </div>
  );
}
