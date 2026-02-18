"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function SpeedCarAnimation({ isActive }) {
  const lines = Array.from({ length: 5 }, (_, i) => i);
  const [widths, setWidths] = useState(lines.map(() => 30));

  useEffect(() => {
    if (isActive) {
      setWidths(lines.map(() => 20 + Math.random() * 30));
    }
  }, [isActive]);

  return (
    <>
      <div className="absolute inset-0 pointer-events-none">
        {lines.map((line, index) => (
          <motion.div
            key={`line-${line}`}
            className="absolute h-0.5 bg-gradient-to-r from-transparent via-[#D9D9D9] to-transparent opacity-50"
            style={{
              top: `${25 + line * 12}%`,
              width: `${widths[index]}px`,
              right: "25%",
            }}
            initial={{ x: "100%" }}
            animate={
              isActive
                ? {
                    x: [100, -150],
                    opacity: [0, 0.7, 0],
                  }
                : {
                    x: 100,
                    opacity: 0,
                  }
            }
            transition={{
              duration: 0.5,
              delay: line * 0.06,
              repeat: isActive ? Infinity : 0,
              repeatDelay: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
        ))}
      </div>
      <motion.div initial={{ opacity: 1 }} animate={{ opacity: isActive ? 1 : 0 }} transition={{ duration: 0.3 }} />
    </>
  );
}
