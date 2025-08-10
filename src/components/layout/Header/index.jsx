"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { ShinyButton } from "@/components/magicui/shiny-button";
import SocialMediaComp from "@/components/common/SocialMediaComp";

const nav_button = [
  {
    label: "Buy Car",
    url: "/",
  },
  {
    label: "Sell Your Car",
    url: "/",
  },
];

const mega_menu_data = {
  menu_links: [
    {
      label: "About Us",
      url: "/about",
    },
    {
      label: "MD's Message",
      url: "/md",
    },
    {
      label: "Showroom",
      url: "/md",
    },
    {
      label: "News & Insights",
      url: "/",
    },
    {
      label: "Contact",
      url: "/",
    },
  ],
  media: {
    path: "/images/mega_menu_car.svg",
    alt: "Mega Menu Car",
  },
  menu_title: "India's Only Stock Exchange - Listed LuxuryCar Dealers",
  menu_logo: {
    path: "/images/logo.svg",
    alt: "Mega Menu Logo",
  },
  address: "BRD Complex, NH Bypass, Konikkara.P.O, Thrissur, Kerala - 680306",
  info_links: [
    {
      title: "Call",
      label: "+91 89430 77777",
      url: "tel:+91 89430 77777",
    },
    {
      title: "Email",
      label: "info@brdluxe.com",
      url: "mailto:info@brdluxe.com",
    },
  ],
};

export default function Header() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !menuButtonRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        closeMenu();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const updateHeader = useCallback(
    (current) => {
      const scrollY = current;
      const direction = scrollY - lastScrollY.current;

      if (scrollY < 0.01) {
        if (visible !== true || isScrolled !== false) {
          setVisible(true);
          setIsScrolled(false);
        }
      } else {
        if (!isScrolled) {
          setIsScrolled(true);
        }
        const shouldBeVisible = direction < 0;
        if (visible !== shouldBeVisible) {
          setVisible(shouldBeVisible);
        }
      }
      lastScrollY.current = scrollY;
      ticking.current = false;
    },
    [visible, isScrolled]
  );

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number" && !ticking.current) {
      requestAnimationFrame(() => updateHeader(current));
      ticking.current = true;
    }
  });

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const openMenu = () => {
    setIsMenuOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveSubmenu(null);
    document.body.style.overflow = "";
  };

  const handleSubmenuHover = (index) => {
    if (window.innerWidth >= 1024) {
      setActiveSubmenu(index);
    }
  };

  const HamburgerIcon = ({ isOpen }) => {
    return (
      <div className="w-[29px] h-[16px] relative flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close-icon"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              width="29"
              height="16"
              viewBox="0 0 29 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="2.77094"
                y1="1.92035"
                x2="14.0847"
                y2="13.2341"
                stroke="white"
                strokeWidth="1.2"
              />
              <line
                x1="14.4243"
                y1="1.42426"
                x2="2.42426"
                y2="13.4243"
                stroke="white"
                strokeWidth="1.2"
              />
            </motion.svg>
          ) : (
            <motion.div
              key="open-icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`w-[30px] h-[15px] flex flex-col justify-between`}
            >
              <span className="w-[65%] h-[1px] bg-white transition-all duration-300"></span>
              <span className="w-[40%] h-[1px] bg-white transition-all duration-300"></span>
              <span className="w-full h-[1px] bg-white transition-all duration-300 group-hover:w-[20%]"></span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <header className="w-full absolute top-0 left-0 right-0 z-10">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`w-full h-auto py-[25px] lg:py-[20px] 2xl:py-[25px] 3xl:py-[30px] overflow-hidden fixed top-0 inset-x-0 z-5 bg-linear-to-b from-black to-black/0 ${
            isScrolled &&
            visible &&
            "bg-white/10 backdrop-blur-[50px] shadow-md bg-linear-to-b from-black/0 to-black/0"
          }`}
        >
          <div className="container">
            <div className="w-full h-auto flex items-center justify-between relative z-0">
              <button
                ref={menuButtonRef}
                onClick={toggleMenu}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                className="w-[29px] h-[16px] relative cursor-pointer flex items-center justify-center group"
              >
                <HamburgerIcon isOpen={isMenuOpen} />
              </button>
              <Link
                href={"/"}
                className="w-[100px] lg:w-[120px] xl:w-[150px] 2xl:w-[180px] 3xl:w-[225px] absolute left-0 right-0 ml-auto lg:mx-auto"
              >
                <Image
                  src="/images/logo.svg"
                  alt="logo"
                  width={187}
                  height={50}
                />
              </Link>
              <div className="hidden lg:flex items-center">
                <a className="font-base3 mr-[10px]" href="">
                  <span className="lg:text-[10px] 2xl:text-[13px] 3xl:text-[14px] leading-[1] font-normal text-[#706D6D] text-right block">
                    Quick Contact
                  </span>
                  <span className="lg:text-[13px] 2xl:text-[15px] 3xl:text-[18px] leading-[1] font-normal text-white">
                    +91 415‑555‑0132
                  </span>
                </a>
                {nav_button?.map((item, index) => (
                  <div
                    key={`nav-button-${index}`}
                    className="w-fit h-auto lg:pl-[10px] 2xl:pl-[15px]"
                  >
                    <ShinyButton
                      href={item?.url}
                      className="lg:text-[12px] 2xl:text-[15px] 3xl:text-[18px] leading-[1] font-semibold font-base1 text-white tracking-[1px] hover:text-black hover:bg-white hover:border-white transition-all duration-300 ease-in-out"
                    >
                      {item?.label}
                    </ShinyButton>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 backdrop-blur-[80px] bg-black z-20 lg:hidden"
              onClick={closeMenu}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed top-0 left-0 h-full w-[100%] max-w-[400px] bg-gradient-to-br from-gray-900 via-black to-gray-800 z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-[20px] relative z-0">
                <button
                  onClick={closeMenu}
                  className="absolute top-[25px] left-[20px] text-white hover:text-gray-300 transition-colors"
                  aria-label="Close menu"
                >
                  <svg
                    width="29"
                    height="16"
                    viewBox="0 0 29 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="2.77094"
                      y1="1.92035"
                      x2="14.0847"
                      y2="13.2341"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                    <line
                      x1="14.4243"
                      y1="1.42426"
                      x2="2.42426"
                      y2="13.4243"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                  </svg>
                </button>
                <div className="w-[115px] h-auto aspect-[225/65] mb-[40px] ml-auto flex items-center justify-center">
                  <Image
                    src={mega_menu_data?.menu_logo?.path}
                    alt="Logo"
                    width={225}
                    height={65}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="mb-[25px]">
                  <ul className="space-y-4">
                    {mega_menu_data?.menu_links?.map((link, index) => (
                      <motion.li
                        key={`mobile-link-${index}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        <Link
                          href={link.url}
                          onClick={closeMenu}
                          className="text-[16px] sm:text-[18px] leading-[1.2] font-light font-base1 text-white mb-[10px] sm:mb-[15px] block"
                        >
                          {link.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="w-full mb-[25px] space-x-[10px] flex [&>*]:w-1/2">
                  {nav_button.map((item, index) => (
                    <motion.div
                      key={`mobile-button-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <ShinyButton
                        href={item?.url}
                        className="w-full text-[11px] sm:text-[12px] text-center text-white font-medium uppercase p-[10px] rounded-lg border border-white/20 hover:bg-white hover:text-black transition-all duration-300"
                        onClick={closeMenu}
                      >
                        {item?.label}
                      </ShinyButton>
                    </motion.div>
                  ))}
                </div>

                <div className="text-[20px] sm:text-[24px] leading-[1.2] font-normal font-base1 text-white mb-[20px]">
                  {mega_menu_data?.menu_title}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="pt-6 border-t border-white/10"
                >
                  <div className="space-y-4">
                    {mega_menu_data?.info_links?.map((item, index) => (
                      <div key={`info-links-${index}`}>
                        <a
                          href={item?.url}
                          target="_blank"
                          className="text-[12px] lg:text-[13px] 2xl:text-[14px] 3xl:text-[16px] leading-[1] font-light font-base1 text-white mb-[10px]"
                        >
                          {item?.title}
                          <span className="text-[13px] lg:text-[14px] 2xl:text-[16px] 3xl:text-[20px] leading-[1] font-normal font-base3 text-white block">
                            {item?.label}
                          </span>
                        </a>
                      </div>
                    ))}
                    <div className="w-full flex lg:items-center max-lg:flex-col max-sm:mb-[15px]">
                      <div className="text-[18px] sm:text-[20px] leading-[1] font-light font-base1 text-white max-lg:mb-[5px]">
                        Address
                      </div>
                      <div className="text-[12px] 2xl:text-[14px] 3xl:text-[16px] leading-[1.3] font-light font-base3 text-white lg:pl-[25px] 2xl:pl-[30px] 3xl:pl-[40px]">
                        {mega_menu_data?.address}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Social Media */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="w-full py-4"
                >
                  <SocialMediaComp />
                </motion.div>
              </div>
            </motion.div>

            {/* Desktop Mega Menu */}
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="hidden lg:block fixed lg:top-[var(--header-y)] left-0 right-0 w-full z-30 shadow-2xl "
            >
              <div className="container overflow-hidden">
                <div className="w-full max-lg:h-screen lg:p-[25px_35px] 2xl:p-[30px_40px] 3xl:p-[40px_50px] max-lg:mt-[var(--header-y)] lg:bg-[#333333]/80 rounded-[10px] lg:backdrop-blur-[20px] lg:shadow-2xl text-white flex flex-wrap overflow-auto">
                  <div className="w-full h-fit lg:h-auto pb-[25px] lg:pb-[35px] 2xl:pb-[45px] 3xl:pb-[60px] lg:mb-[25px] 2xl:mb-[30px] 3xl:mb-[40px] border-b-1 border-[#515151] flex flex-wrap">
                    <div className="w-full lg:w-[20%] h-auto mb-[25px] sm:mb-[35px] lg:mb-0">
                      <div className="lg:text-[16px] 2xl:text-[20px] 3xl:text-[25px] leading-[1] font-semibold font-base1 text-white lg:mb-[20px] 2xl:mb-[30px] 3xl:mb-[40px] max-lg:hidden">
                        Menu
                      </div>
                      {mega_menu_data?.menu_links?.map((item, index) => (
                        <div key={`mega-menu-${index}`}>
                          <Link
                            href={item?.url}
                            className="text-[18px] sm:text-[20px] lg:text-[16px] 2xl:text-[20px] 3xl:text-[25px] leading-[1.2] font-light font-base1 text-white mb-[10px] sm:mb-[15px] lg:mb-[15px] 3xl:mb-[20px] block transition-all duration-300 hover:text-[#F29A0D]"
                          >
                            {item?.label}
                          </Link>
                        </div>
                      ))}
                    </div>
                    <div className="w-full lg:w-[50%] h-full max-lg:absolute max-lg:inset-0 max-lg:m-auto max-lg:opacity-25 flex items-end">
                      <div className="w-full h-auto aspect-[710/180] flex items-center justify-center">
                        <Image
                          src={mega_menu_data?.media?.path}
                          alt={mega_menu_data?.media?.alt}
                          width={715}
                          height={180}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-[30%] lg:pl-[4%]">
                      <div className="text-[22px] sm:text-[24px] lg:text-[28px] xl:text-[34px] 2xl:text-[40px] 3xl:text-[50px] leading-[1.2] font-normal font-base1 text-white max-sm:max-w-[100%] max-lg:max-w-[50%] mb-[20px] lg:mb-[25px] 2xl:mb-[30px] 3xl:mb-[40px]">
                        {mega_menu_data?.menu_title}
                      </div>
                      <div>
                        <div className="text-[13px] sm:text-[14px] lg:text-[16px] 2xl:text-[20px] 3xl:text-[25px] leading-[1] font-light font-base1 text-white mb-[15px] 3xl:mb-[25px]">
                          Follow Us
                        </div>
                        <SocialMediaComp />
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-auto flex flex-wrap">
                    <div className="w-full lg:w-[40%]">
                      <div className="sm:w-[130px] lg:w-[150px] xl:w-[150px] 2xl:w-[180px] 3xl:w-[225px] h-auto aspect-[225/65] max-lg:hidden flex items-center justify-center">
                        <Image
                          src={mega_menu_data?.menu_logo?.path}
                          alt="Logo"
                          width={225}
                          height={65}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-[60%]">
                      <div className="flex flex-wrap justify-between">
                        <div className="w-full sm:w-1/2 flex lg:items-center max-lg:flex-col max-sm:mb-[15px]">
                          <div className="text-[18px] sm:text-[20px] lg:text-[24px] 2xl:text-[28px] 3xl:text-[35px] leading-[1] font-light font-base1 text-white max-lg:mb-[10px]">
                            Address
                          </div>
                          <div className="text-[12px] 2xl:text-[14px] 3xl:text-[16px] leading-[1.3] font-light font-base3 text-white lg:pl-[25px] 2xl:pl-[30px] 3xl:pl-[40px]">
                            {mega_menu_data?.address}
                          </div>
                        </div>
                        <div className="w-full sm:w-1/2 sm:pl-[20px] xl:pl-[40px] 2xl:pl-[70px] flex sm:items-center justify-between max-sm:flex-col">
                          {mega_menu_data?.info_links?.map((item, index) => (
                            <div key={`info-links-${index}`}>
                              <a
                                href={item?.url}
                                target="_blank"
                                className="group text-[12px] lg:text-[13px] 2xl:text-[14px] 3xl:text-[16px] leading-[1] font-light font-base1 text-white mb-[10px] transition-all duration-300 hover:text-[#F29A0D]"
                              >
                                {item?.title}
                                <span className="text-[13px] lg:text-[14px] 2xl:text-[16px] 3xl:text-[20px] leading-[1] font-normal font-base3 text-white block transition-all duration-300 group-hover:text-[#F29A0D]">
                                  {item?.label}
                                </span>
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
