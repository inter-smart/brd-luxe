"use client";
import React, { useRef, useEffect, useState } from "react";

export const TextHoverEffect = ({
  text,
  duration = 1, // ⏱ Auto animation speed (seconds)
  followSpeed = 0.08, // 🐢 Follow smoothness (lower = smoother)
  fontSize = "",
  className = "transition duration-300 ease-in-out",
}) => {
  const svgRef = useRef(null);
  const animationRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [target, setTarget] = useState({ x: 50, y: 50 });
  const [current, setCurrent] = useState({ x: 50, y: 50 });

  // Smooth animation using lerp
  useEffect(() => {
    const animate = () => {
      const lerp = (a, b, t) => a + (b - a) * t;
      const newX = lerp(current.x, target.x, followSpeed);
      const newY = lerp(current.y, target.y, followSpeed);

      setCurrent({ x: newX, y: newY });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [target, current, followSpeed]);

  // Random spotlight movement when not hovered
  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        setTarget({ x: randomX, y: randomY });
      }, duration * 1000);

      return () => clearInterval(interval);
    }
  }, [hovered, duration]);

  // Mouse tracking
  const handleMouseMove = (e) => {
    if (svgRef.current && hovered) {
      const rect = svgRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setTarget({ x, y });
    }
  };

  // Style for masked gradient
  const getMaskStyle = () => ({
    background: "linear-gradient(90deg, #464646, #464646)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    maskImage: `radial-gradient(circle at ${current.x}% ${current.y}%, white 0%, rgba(255,255,255,0.4) 20%, transparent 35%)`,
    WebkitMaskImage: `radial-gradient(circle at ${current.x}% ${current.y}%, white 0%, rgba(255,255,255,0.4) 20%, transparent 35%)`,
    transition: "mask-image 0.4s ease-out, -webkit-mask-image 0.4s ease-out",
  });

  return (
    <div
      ref={svgRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className={`select-none relative ${className}`}
      style={{ fontSize: "inherit" }}
    >
      <div className="relative">
        <div className={`${fontSize} h-fit leading-[0.8]`} style={getMaskStyle()}>
          {text}
        </div>
      </div>
    </div>
  );
};
