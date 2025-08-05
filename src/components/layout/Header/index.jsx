"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ShinyButton } from "@/components/magicui/shiny-button";

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

export default function Header() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

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

  return (
    <header>
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
              <div className="w-[15px] lg:w-[20px] 2xl:w-[25px] 3xl:w-[30px] h-auto aspect-square cursor-pointer flex items-center justify-center">
                <MenuIcon />
              </div>
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
    </header>
  );
}

function MenuIcon() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuIsOpen(false);
      }
    };
    if (menuIsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuIsOpen]);

  return (
    <>
      <div
        ref={buttonRef}
        onClick={() => setMenuIsOpen((prev) => !prev)}
        className="w-full h-full object-contain transition-all duration-300"
      >
        <svg
          width="29"
          height="18"
          viewBox="0 0 29 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line y1="1.4" x2="21" y2="1.4" stroke="white" strokeWidth="2" />
          <line y1="9.4" x2="16" y2="9.4" stroke="white" strokeWidth="2" />
          <line y1="17.4" x2="29" y2="17.4" stroke="white" strokeWidth="2" />
        </svg>
      </div>
      {menuIsOpen && <div className=""></div>}
      <div
        ref={menuRef}
        className={`fixed top-[120px] right-0 w-full bg-white text-black z-50 shadow-2xl overflow-hidden transition-all duration-500 transform ${
          menuIsOpen
            ? "max-h-[600px] opacity-100 scale-100"
            : "max-h-0 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Analytics
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  CRM
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Ecommerce
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Reports
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Marketing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Enterprise
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Startups
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Agencies
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  News
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Docs
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Guides
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Community
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
