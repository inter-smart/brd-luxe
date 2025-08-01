"use client";
import Image from "next/image";
import { Text } from "../utils/Text";
import { Heading } from "../utils/Heading";
import { StyledLink } from "../utils/Button";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);

const offer_data = {
  media: {
    path: "/images/offer_background_image.webp",
  },
  heading: {
    title: "We Offer One Year Warranty on Your Dream Car",
    highlight: ["One"],
    social_links: [
      {
        url: "/",
        media: {
          path: "/images/offer_whatsapp_icon.svg",
        },
      },
      {
        url: "/",
        media: {
          path: "/images/offer_x_icon.svg",
        },
      },
      {
        url: "/",
        media: {
          path: "/images/offer_facebook_icon.svg",
        },
      },
    ],
  },
  offer_list: [
    {
      title: "Driven by Legacy. Perfected with Passion",
      description:
        "At BRD LUXE, we redefine the pre-owned luxury car experience through trust, precision, and legacy. As a division of the renowned BRD Group, our commitment is to offer only the finest selection of pre-owned premium vehicles, each thoroughly inspected and backed by over four decades of automotive excellence.",
      button: {
        url: "/warranty/engine",
      },
    },
    {
      title: "Nationwide Delivery",
      description: "We deliver your dream luxury car anywhere in India.",
    },
    {
      title: "Warranty / Buyback",
      description:
        "Transparent assurance with every drive, from purchase to resale.",
    },
    {
      title: "200+ Point Certification",
      description:
        "Every car, rigorously tested with 200+ quality check points.",
    },
    {
      title: "Concierge Service",
      description: "From inquiry to delivery, we handle everything for you.",
    },
  ],
};

export default function OfferSection() {
  const handleHighlight = (highlight, title) => {
    return highlight?.reduce(
      (acc, phrase) => {
        return acc.flatMap((part, i) =>
          typeof part === "string"
            ? part
                .split(new RegExp(`(${phrase})`, "gi"))
                .filter(Boolean)
                .map((text, j) =>
                  text.toLowerCase() === phrase.toLowerCase() ? (
                    <span key={`${i}-${j}`}>{text}</span>
                  ) : (
                    text
                  )
                )
            : [part]
        );
      },
      [title]
    );
  };

  const sectionRef = useRef(null);
  const overlayRef = useRef(null);
  const topHeaderRef = useRef(null);
  const centerContentRef = useRef(null);
  const cornerItemsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const overlay = overlayRef.current;
    const topHeader = topHeaderRef.current;
    const centerContent = centerContentRef.current;
    const cornerItems = cornerItemsRef.current;

    if (!section || !overlay || !topHeader || !centerContent) return;

    ScrollTrigger.matchMedia({
      "(min-width: 769px)": () => {
        gsap.set(overlay, { backgroundColor: "rgba(0, 0, 0, 0.10)" });
        gsap.set(topHeader, { opacity: 0, y: -50 });
        gsap.set(centerContent, { opacity: 0, y: 50 });
        gsap.set(cornerItems, { opacity: 0, scale: 0.8 });

        gsap.fromTo(
          overlay,
          { backgroundColor: "rgba(0, 0, 0, 1)" },
          {
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              end: "top 20%",
              scrub: 1,
            },
          }
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=200%",
            scrub: 0.5,
            pin: true,
            pinSpacing: true,
          },
        });

        tl.to(overlay, {
          backgroundColor: "rgba(0, 0, 0, 0.15)",
          duration: 0.4,
          ease: "power2.out",
        })
          .to(
            topHeader,
            {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            },
            0.1
          )
          .to(
            centerContent,
            {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            },
            0.4
          )
          .to(
            cornerItems[0],
            {
              opacity: 1,
              scale: 1,
              duration: 0.25,
              ease: "back.out(1.7)",
            },
            0.7
          )
          .to(
            cornerItems[1],
            {
              opacity: 1,
              scale: 1,
              duration: 0.25,
              ease: "back.out(1.7)",
            },
            0.85
          )
          .to(
            cornerItems[2],
            {
              opacity: 1,
              scale: 1,
              duration: 0.25,
              ease: "back.out(1.7)",
            },
            1.0
          )
          .to(
            cornerItems[3],
            {
              opacity: 1,
              scale: 1,
              duration: 0.25,
              ease: "back.out(1.7)",
            },
            1.15
          );

        return () => {
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full h-full md:h-screen py-[40px] lg:py-[50px] 2xl:py-[65px] 3xl:py-[80px] border-y border-[#404040] will-change-transform overflow-hidden relative z-0 before:w-full before:h-[30%] before:bg-linear-to-b before:from-black before:to-black/0 before:absolute before:top-0 before:z-0"
    >
      <div
        ref={overlayRef}
        className="w-full h-full absolute inset-0 z-0"
      ></div>
      <div className="w-full h-full block absolute inset-0 -z-1">
        <Image
          src={offer_data?.media?.path}
          alt="Background_Image"
          fill
          sizes="100vw"
          className="object-cover -z-2"
        />
      </div>
      <div className="container w-full h-full">
        <div className="w-full h-full relative z-0">
          <div
            ref={topHeaderRef}
            className="text-center md:w-[50%] mx-auto max-md:mb-[35px]"
          >
            <Heading
              as="h1"
              className="text-[14px] sm:text-[16px] lg:text-[18px] 2xl:text-[22px] 3xl:text-[28px] leading-[1.2] font-semibold font-base1 text-white [&>span]:text-[#E09812] mb-[10px] 3xl:mb-[15px]"
            >
              {handleHighlight(
                offer_data?.heading?.highlight,
                offer_data?.heading?.title
              )}
            </Heading>
            <div className="space-x-[7px] sm:space-x-[10px] 2xl:space-x-[15px] 3xl:space-x-[20px] flex items-center justify-center">
              <span className="text-[10px] 2xl:text-[12px] 3xl:text-[16px] leading-[1.5] font-normal font-base2 text-white">
                Share with friends
              </span>
              {offer_data?.heading?.social_links?.map((item, index) => (
                <a
                  key={`social-${index}`}
                  href={item?.url}
                  target="_blank"
                  className="w-[15px] 2xl:w-[20px] 3xl:w-[25px] h-auto aspect-square overflow-hidden flex items-center justify-center relative z-0"
                >
                  <Image
                    src={item?.media?.path}
                    alt="Product_Image"
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </a>
              ))}
            </div>
          </div>
          <div
            ref={centerContentRef}
            className="text-center w-full sm:w-[85%] md:w-[60%] h-full md:pb-[80px] lg:pb-[100px] 2xl:pb-[120px] 3xl:pb-[155px] mx-auto flex flex-col items-center justify-end relative z-5"
          >
            <Heading
              as="h1"
              size={"heading1"}
              className="text-white mb-[10px] lg:mb-[15px] 2xl:mb-[20px] 3xl:mb-[25px]"
            >
              {offer_data?.offer_list?.[0]?.title}
            </Heading>
            <Text
              as="div"
              className="text-[11px] sm:text-[12px] 2xl:text-[13px] 3xl:text-[16px] leading-[1.5] font-normal font-base2 text-white mb-[15px] lg:mb-[20px] 2xl:mb-[25px] 3xl:mb-[30px]"
            >
              {offer_data?.offer_list?.[0]?.description}
            </Text>
            {offer_data?.offer_list?.[0]?.button?.url && (
              <StyledLink
                href={offer_data?.offer_list?.[0]?.button?.url}
                className=""
              >
                Know More
              </StyledLink>
            )}
          </div>
          <div className="max-md:text-center w-full h-full md:absolute inset-0 max-sm:mt-[40px] max-md:mt-[50px]">
            {Array.isArray(offer_data?.offer_list) &&
              offer_data?.offer_list?.slice(1, 5).map((item, index) => (
                <div
                  key={`offer-${index}`}
                  ref={(el) => (cornerItemsRef.current[index] = el)}
                  className={`md:absolute ${
                    [
                      "top-0 left-0",
                      "top-0 right-0 md:text-right",
                      "bottom-0 left-0",
                      "bottom-0 right-0 md:text-right",
                    ][index]
                  } w-[80%] sm:w-[50%] md:w-[20%] max-md:mx-auto mb-[15px] sm:mb-[20px] md:mb-0`}
                >
                  <Heading
                    as="h1"
                    className="text-[16px] sm:text-[18px] lg:text-[20px] 2xl:text-[25px] 3xl:text-[32px] leading-[1.2] font-light font-base1 text-white mb-[10px]"
                  >
                    {item?.title}
                  </Heading>
                  <Text
                    as="div"
                    className="text-[11px] sm:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-[1.2] font-normal font-base2 text-white"
                  >
                    {item?.description}
                  </Text>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
