"use client";
import React, { useState, useEffect } from "react";

const WebLoader = ({ onLoadingComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onLoadingComplete && onLoadingComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className="loader w-screen h-screen bg-black relative z-55 pointer-events-none flex items-center justify-center">
      <img
        src="/images/logo.svg"
        alt="Luxury Cars Loading"
        className="w-[120px] lg:w-[140px] 3xl:w-[170px] h-auto aspect-square object-contain absolute top-0 left-0 right-0 bottom-0 m-auto opacity-1 flex items-center justify-center animate-logo-premium"
      />
      <style jsx>{`
        @keyframes logoPremium {
          0% {
            opacity: 0;
            transform: scale(1);
            filter: drop-shadow(0 0 0 rgba(255, 255, 255, 0));
          }
          50% {
            opacity: 0.50;
            transform: scale(1);
            filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.7));
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: drop-shadow(0 0 25px rgba(255, 255, 255, 0.9));
          }
        }
        .animate-logo-premium {
          animation: logoPremium 1s cubic-bezier(0.36, 0, 0.66, 1) forwards;
        }
      `}</style>
    </div>
  );
};

const LoadingWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <WebLoader onLoadingComplete={() => setIsLoading(false)} />}
      {!isLoading && children}
    </>
  );
};

export default LoadingWrapper;

