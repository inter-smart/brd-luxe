"use client";
import Link from "next/link";
import Image from "next/image";
import { useLenis } from "lenis/react";
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

// Safe function to extract pathname from absolute or relative URL
const getPath = (url) => {
  if (!url) return "/";
  try {
    return new URL(url).pathname; // works if it's absolute
  } catch {
    return url; // already relative
  }
};

import { ShinyButton } from "@/components/magicui/shiny-button";
import SocialMediaComp from "@/components/common/SocialMediaComp";
import { usePathname } from "next/navigation";

export default function Header() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  const [header_acf, setHeaderAcf] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const pathname = usePathname();
  const lenis = useLenis();

  // Fetch header data from API
  useEffect(() => {
    async function fetchHeaderData() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/wp-json/brd/v1/header`
        );
        const data = await res.json();
        setHeaderAcf(data?.header_acf);
      } catch (error) {
        console.error("Failed to fetch header ACF:", error);
      }
    }
    fetchHeaderData();
  }, []);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isMenuOpen &&
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
  }, [isMenuOpen]);

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

  // const SCROLL_THRESHOLD = 100; // Pixels to scroll before hiding header

  // const updateHeader = useCallback(
  //   (current) => {
  //     const scrollY = current;

  //     // Always show header at top of page
  //     if (scrollY <= 0) {
  //       if (!visible || isScrolled) {
  //         setVisible(true);
  //         setIsScrolled(false);
  //       }
  //       lastScrollY.current = scrollY;
  //       ticking.current = false;
  //       return;
  //     }

  //     // Mark as scrolled once we're past the top
  //     if (!isScrolled) {
  //       setIsScrolled(true);
  //     }

  //     // Only start hiding/showing logic after threshold
  //     if (scrollY > SCROLL_THRESHOLD) {
  //       const direction = scrollY - lastScrollY.current;
  //       const shouldBeVisible = direction < 0; // Show when scrolling up

  //       if (visible !== shouldBeVisible) {
  //         setVisible(shouldBeVisible);
  //       }
  //     } else {
  //       // Within threshold - keep header visible
  //       if (!visible) {
  //         setVisible(true);
  //       }
  //     }

  //     lastScrollY.current = scrollY;
  //     ticking.current = false;
  //   },
  //   [visible, isScrolled]
  // );

  // useMotionValueEvent(scrollYProgress, "change", (current) => {
  //   if (typeof current === "number" && !ticking.current) {
  //     requestAnimationFrame(() => updateHeader(current));
  //     ticking.current = true;
  //   }
  // });

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const prev = scrollYProgress.getPrevious();
      const direction = current - prev;

      if (scrollYProgress.get() < 0.05) {
        // 👆 Top of page
        setVisible(true);
        setIsScrolled(false);
      } else {
        if (direction < 0) {
          // 👆 Scrolling up → show header
          setVisible(true);
          setIsScrolled(true);
        } else {
          // 👇 Scrolling down → hide header
          setVisible(false);
          setIsScrolled(true);
        }
      }
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
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      setActiveSubmenu(null);
      if (lenis?.stop) lenis.stop();
    }
  };

  const closeMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      setActiveSubmenu(null);
      if (lenis?.start) lenis.start();
    }
  };
  const handleSubmenuHover = (index) => {
    if (window.innerWidth >= 1024) {
      setActiveSubmenu(index);
    }
  };

  const HamburgerIcon = ({ isOpen }) => {
    return (
      <div className="w-[29px] h-[16px] relative cursor-pointer flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isOpen ? (
            <div className="lg:w-[20px] 3xl:w-[25px] h-auto aspect-square flex items-center justify-center">
              <motion.svg
                key="close-icon"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                width="25"
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
            </div>
          ) : (
            <motion.div
              key="open-icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`w-[20px] 2xl:w-[25px] 3xl:w-[30px] h-[12px] 2xl:h-[15px] flex flex-col justify-between`}
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

  // Wait for header_acf to load
  if (!header_acf) return null;

  return (
    <header className="w-full absolute top-0 left-0 right-0 z-50">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
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
                className="group w-[110px] lg:w-[120px] xl:w-[150px] 2xl:w-[180px] 3xl:w-[225px] absolute left-0 right-0 ml-auto lg:mx-auto"
              >
                <Image
                  src={header_acf?.logo?.url || "/images/placeholder.jpg"}
                  alt={header_acf?.logo?.alt || "site logo"}
                  width={187}
                  height={50}
                  priority
                  className="w-full h-full object-contain group-hover:scale-102 transition-all duration-300"
                />
              </Link>
              <div className="hidden lg:flex items-center">
                {header_acf?.phone_number && (
                  <a
                    className="group font-base3 mr-[10px]"
                    href={`tel:${header_acf.phone_number}`}
                  >
                    <span className="lg:text-[10px] 2xl:text-[13px] 3xl:text-[14px] leading-[1] font-normal text-[#706D6D] text-right block">
                      Quick Contact
                    </span>
                    <span className="lg:text-[13px] 2xl:text-[15px] 3xl:text-[18px] leading-[1] font-normal text-white transition duration-300 group-hover:text-[#F29A0D]">
                      {header_acf?.phone_number}
                    </span>
                  </a>
                )}
                {header_acf?.buy__sell_car_buttons?.map((item, index) => {
                  if (item?.button_url?.url && item?.button_title) {
                    return (
                      <div
                        key={`nav-button-${index}`}
                        className="w-fit h-auto lg:pl-[10px] 2xl:pl-[15px]"
                      >
                        <ShinyButton
                          href={item?.button_url?.url}
                          className={`lg:text-[12px] 2xl:text-[15px] 3xl:text-[18px] leading-[1] font-semibold font-base1 tracking-[0.5px] hover:text-black hover:bg-white hover:border-white transition-all duration-300 ease-in-out ${
                            pathname === item?.button_url?.url
                              ? "bg-white text-black"
                              : "bg-transparent text-white"
                          }`}
                          target={item?.button_url?.target}
                        >
                          {item?.button_title}
                        </ShinyButton>
                      </div>
                    );
                  }
                  return null; // safely skip if no URL or title
                })}
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
              className="fixed top-0 left-0 h-full w-[100%] max-w-[400px] bg-gradient-to-br from-gray-900 via-black to-gray-800 z-50 lg:hidden overflow-hidden"
            >
              <div className="p-[20px] pb-0 relative z-0">
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
                <div className="w-[115px] h-auto aspect-[225/65] mb-[15px] ml-auto flex items-center justify-center">
                  <Image
                    src={header_acf?.logo?.url || "/images/placeholder.jpg"}
                    alt={header_acf?.logo?.alt || "site logo"}
                    width={225}
                    height={65}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="w-full h-full p-[20px] pt-0 overflow-auto">
                <div className="mb-[25px]">
                  <ul className="space-y-4">
                    {header_acf?.mega_menu?.menus?.map((link, index) => {
                      if (link?.menu_url?.url && link?.menu_title) {
                        return (
                          <motion.li
                            key={`mobile-link-${index}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                          >
                            <Link
                              href={link?.menu_url?.url}
                              onClick={closeMenu}
                              className={`... ${
                                pathname === getPath(link?.menu_url?.url) ||
                                (getPath(link?.menu_url?.url) === "/news" &&
                                  pathname.startsWith("/news/"))
                                  ? "text-[#F29A0D]"
                                  : "text-white font-base1"
                              }`}
                              target={link?.menu_url?.target}
                            >
                              {link?.menu_title}
                            </Link>
                          </motion.li>
                        );
                      }
                      return null;
                    })}
                  </ul>
                </div>
                <div className="w-full mb-[25px] space-x-[10px] flex [&>*]:w-1/2">
                  {header_acf?.buy__sell_car_buttons.map((item, index) => {
                    if (item?.button_url?.url && item?.button_title) {
                      return (
                        <motion.div
                          key={`mobile-button-${index}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                        >
                          <ShinyButton
                            href={item?.button_url?.url}
                            className="w-full text-[12px] max-sm:tracking-[1px] text-center text-white font-medium font-base1 uppercase p-[10px] rounded-lg border border-white/20 hover:bg-white hover:text-black transition-all duration-300"
                            target={item?.button_url?.target}
                            onClick={closeMenu}
                          >
                            {item?.button_title}
                          </ShinyButton>
                        </motion.div>
                      );
                    }

                    return null; // safely skip if no URL or title
                  })}
                </div>

                <div className="text-[20px] sm:text-[24px] leading-[1.2] font-normal font-base1 text-white mb-[20px]">
                  {header_acf?.mega_menu?.title}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="pt-6 border-t border-white/10"
                >
                  <div className="space-y-4">
                    {header_acf?.mega_menu?.phone_number && (
                      <div>
                        <a
                          href={`tel:${header_acf?.mega_menu?.phone_number}`}
                          className="text-[12px] lg:text-[13px] 2xl:text-[14px] 3xl:text-[16px] leading-[1] font-light font-base1 text-white mb-[10px]"
                        >
                          Call
                          <span className="text-[13px] lg:text-[14px] 2xl:text-[16px] 3xl:text-[20px] leading-[1] font-normal font-base3 text-white block">
                            {header_acf?.mega_menu?.phone_number}
                          </span>
                        </a>
                      </div>
                    )}
                    {header_acf?.mega_menu?.email && (
                      <div>
                        <a
                          href={`mailto:${header_acf?.mega_menu?.email}`}
                          target="_blank"
                          className="text-[12px] lg:text-[13px] 2xl:text-[14px] 3xl:text-[16px] leading-[1] font-light font-base1 text-white mb-[10px]"
                        >
                          Email
                          <span className="text-[13px] lg:text-[14px] 2xl:text-[16px] 3xl:text-[20px] leading-[1] font-normal font-base3 text-white block">
                            {header_acf?.mega_menu?.email}
                          </span>
                        </a>
                      </div>
                    )}
                    {header_acf?.mega_menu?.address && (
                      <div className="w-full flex lg:items-center max-lg:flex-col max-sm:mb-[15px]">
                        <div className="text-[18px] sm:text-[20px] leading-[1] font-light font-base1 text-white max-lg:mb-[5px]">
                          Address
                        </div>
                        <div className="text-[12px] 2xl:text-[14px] 3xl:text-[16px] leading-[1.3] font-light font-base3 text-white lg:pl-[25px] 2xl:pl-[30px] 3xl:pl-[40px]">
                          {header_acf?.mega_menu?.address}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
                <div className="w-[90%] h-auto aspect-[710/180] m-auto absolute z-0 left-0 right-0 bottom-[10%] opacity-50 flex items-center justify-center">
                  <Image
                    src={header_acf?.mega_menu?.image?.url || "/images/placeholder.jpg"}
                    alt={header_acf?.mega_menu?.image?.alt || "menu image"}
                    width={715}
                    height={180}
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* Social Media */}
                {(() => {
                  const isEnabled =
                    header_acf?.mega_menu?.enable__disable_social_media_links;
                  const rawIcons =
                    header_acf?.mega_menu?.social_media_icons || [];
                  const validIcons = rawIcons.filter(
                    (item) => item?.icon?.url && item?.link
                  );

                  return isEnabled && validIcons.length > 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                      className="w-full py-4"
                    >
                      <SocialMediaComp data={validIcons} />
                    </motion.div>
                  ) : null;
                })()}
              </div>
            </motion.div>

            {/* Desktop Mega Menu */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="hidden lg:block fixed lg:top-[var(--header-y)] 2xl:lg:top-[calc(var(--header-y)+10px)] left-0 right-0 w-full z-30 shadow-2xl"
            >
              {isMenuOpen && (
                <div
                  className="fixed inset-0 -z-25 pointer-events-none"
                  style={{ pointerEvents: "auto" }}
                  onClick={closeMenu}
                />
              )}
              <div className="container overflow-hidden">
                <div
                  ref={menuRef}
                  className="w-full max-lg:h-screen lg:p-[25px_35px] 2xl:p-[30px_40px] 3xl:p-[40px_50px] max-lg:mt-[var(--header-y)] lg:bg-[#333333]/80 rounded-[10px] lg:backdrop-blur-[20px] lg:shadow-2xl text-white flex flex-wrap overflow-auto"
                >
                  <div className="w-full h-fit lg:h-auto pb-[25px] lg:pb-[35px] 2xl:pb-[45px] 3xl:pb-[60px] lg:mb-[25px] 2xl:mb-[30px] 3xl:mb-[40px] border-b-1 border-[#515151] flex flex-wrap">
                    <div className="w-full lg:w-[20%] h-auto mb-[25px] sm:mb-[35px] lg:mb-0">
                      <div className="lg:text-[16px] 2xl:text-[20px] 3xl:text-[25px] leading-[1] font-semibold font-base1 text-white lg:mb-[20px] 2xl:mb-[30px] 3xl:mb-[40px] max-lg:hidden">
                        Menu
                      </div>
                      {header_acf?.mega_menu?.menus?.map((item, index) => {
                        if (item?.menu_url?.url && item?.menu_title) {
                          return (
                            <div key={`mega-menu-${index}`}>
                              <Link
                                href={item?.menu_url?.url}
                                className={`text-[18px] sm:text-[20px] lg:text-[16px] 2xl:text-[20px] 3xl:text-[25px] leading-[1.2] font-light font-base1 mb-[10px] sm:mb-[15px] lg:mb-[15px] 3xl:mb-[20px] block transition-all duration-300 ${
                                  pathname === getPath(item?.menu_url?.url) ||
                                  (getPath(item?.menu_url?.url) === "/news" &&
                                    pathname.startsWith("/news/"))
                                    ? "text-[#F29A0D]"
                                    : "text-white"
                                } hover:text-[#F29A0D]`}
                                target={item?.menu_url?.target}
                              >
                                {item?.menu_title}
                              </Link>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>

                    <div className="w-full lg:w-[50%] h-full max-lg:absolute max-lg:inset-0 max-lg:m-auto max-lg:opacity-25 flex items-end">
                      <div className="w-full h-auto aspect-[710/180] flex items-center justify-center">
                        <Image
                          src={header_acf?.mega_menu?.image?.url || "/images/placeholder.jpg"}
                          alt={header_acf?.mega_menu?.image?.alt || "menu image"}
                          width={715}
                          height={180}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-[30%] lg:pl-[4%]">
                      <div className="text-[22px] sm:text-[24px] lg:text-[28px] xl:text-[34px] 2xl:text-[40px] 3xl:text-[50px] leading-[1.2] font-normal font-base1 text-white max-sm:max-w-[100%] max-lg:max-w-[50%] mb-[20px] lg:mb-[25px] 2xl:mb-[30px] 3xl:mb-[40px]">
                        {header_acf?.mega_menu?.title}
                      </div>
                      {header_acf?.mega_menu
                        ?.enable__disable_social_media_links &&
                        (() => {
                          const validIcons =
                            header_acf?.mega_menu?.social_media_icons?.filter(
                              (item) => item?.icon?.url && item?.link
                            );

                          return validIcons?.length ? (
                            <div>
                              <div className="text-[13px] sm:text-[14px] lg:text-[16px] 2xl:text-[20px] 3xl:text-[25px] leading-[1] font-light font-base1 text-white mb-[15px] lg:mb-[25px]">
                                Follow Us
                              </div>
                              <ul className="flex space-x-[15px] sm:space-x-[20px] lg:justify-between">
                                {validIcons.map((item, index) => (
                                  <li key={`social-media-${index}`}>
                                    <a
                                      href={item.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="w-[15px] lg:w-[14px] 2xl:w-[20px] h-auto aspect-square flex items-center justify-center relative z-0 transition hover:opacity-40"
                                    >
                                      <Image
                                        src={item.icon.url || "/images/placeholder.jpg"}
                                        alt={item.icon.alt || "Social Icon"}
                                        width={20}
                                        height={20}
                                        className="w-full h-full object-contain"
                                      />
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : null;
                        })()}
                    </div>
                  </div>
                  <div className="w-full h-auto flex flex-wrap">
                    <div className="w-full lg:w-[40%]">
                      <div className="sm:w-[130px] lg:w-[150px] xl:w-[150px] 2xl:w-[180px] 3xl:w-[225px] h-auto aspect-[225/65] max-lg:hidden flex items-center justify-center">
                        <Image
                          src={header_acf?.mega_menu?.bottom_image?.url || "/images/placeholder.jpg"}
                          alt={header_acf?.mega_menu?.bottom_image?.alt || "bottom image"}
                          width={225}
                          height={65}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-[60%]">
                      <div className="flex flex-wrap justify-between">
                        {header_acf?.mega_menu?.address && (
                          <div className="w-full sm:w-1/2 flex lg:items-center max-lg:flex-col max-sm:mb-[15px]">
                            <div className="text-[18px] sm:text-[20px] lg:text-[24px] 2xl:text-[28px] 3xl:text-[35px] leading-[1] font-light font-base1 text-white max-lg:mb-[10px]">
                              Address
                            </div>
                            <div className="text-[11px] 2xl:text-[14px] 3xl:text-[16px] leading-[1.3] font-light font-base3 text-white lg:pl-[25px] 2xl:pl-[30px] 3xl:pl-[40px]">
                              {header_acf?.mega_menu?.address}
                            </div>
                          </div>
                        )}
                        <div className="w-full sm:w-1/2 sm:pl-[20px] xl:pl-[40px] 2xl:pl-[70px] flex sm:items-center justify-between max-sm:flex-col">
                          {header_acf?.mega_menu?.phone_number && (
                            <div>
                              <a
                                href={`tel:${header_acf?.mega_menu?.phone_number}`}
                                className="group text-[12px] lg:text-[12px] 2xl:text-[14px] 3xl:text-[16px] leading-[1] font-light font-base1 text-white mb-[10px] transition-all duration-300 hover:text-[#F29A0D]"
                              >
                                Call
                                <span className="text-[13px] lg:text-[13px] 2xl:text-[16px] 3xl:text-[20px] leading-[1] font-normal font-base3 text-white block transition-all duration-300 group-hover:text-[#F29A0D]">
                                  {header_acf?.mega_menu?.phone_number}
                                </span>
                              </a>
                            </div>
                          )}
                          {header_acf?.mega_menu?.email && (
                            <div>
                              <a
                                href={`mailto:${header_acf?.mega_menu?.email}`}
                                target="_blank"
                                className="group text-[12px] lg:text-[12px] 2xl:text-[14px] 3xl:text-[16px] leading-[1] font-light font-base1 text-white mb-[10px] relative z-10 transition-all duration-300 hover:text-[#F29A0D]"
                              >
                                Email
                                <span className="text-[13px] lg:text-[13px] 2xl:text-[16px] 3xl:text-[20px] leading-[1] font-normal font-base3 text-white block transition-all duration-300 group-hover:text-[#F29A0D]">
                                  {header_acf?.mega_menu?.email}
                                </span>
                              </a>
                            </div>
                          )}
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
