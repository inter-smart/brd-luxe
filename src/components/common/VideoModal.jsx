"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback } from "react";

export default function VideoModal({
  videoPath,
  name,
  location,
  isOpen,
  onClose,
}) {
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.4,
        ease: "easeIn",
      },
    },
  };
  const handleClose = useCallback(
    (e) => {
      e.stopPropagation();
      onClose();
    },
    [onClose]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="w-full h-auto fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={handleClose}
        >
          <motion.div
            className="w-[85%] h-[85%] sm:w-[70%] sm:h-[70%] flex flex-col relative z-0"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-[0px] sm:top-[-30px] 3xl:top-[-40px] right-[0] sm:right-[-30px] 3xl:right-[-40px] text-white bg-black bg-opacity-50 sm:rounded-full w-8 h-8 flex items-center justify-center z-10"
              onClick={handleClose}
              aria-label="Close modal"
            >
              ✕
            </button>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-lg"
            >
              <source src={videoPath} type="video/mp4" />
            </video>
            <div className="mt-[15px] xl:mt-[20px]">
              <div className="text-[16px] lg:text-[18px] 2xl:text-[24px] leading-[1.2] font-normal font-base1 text-white mb-[5px] xl:mb-[10px]">
                {name}
              </div>
              <div className="text-[11px] 2xl:text-[12px] leading-[1.2] font-light font-base2 text-white">
                {location}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
