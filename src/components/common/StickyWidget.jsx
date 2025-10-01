// "use client";
// import Image from "next/image";
// import { LayoutGrid, X } from "lucide-react";
// import { useState, useEffect, useRef } from "react";
// import { useMediaQuery } from "react-responsive";

// const sticky_data = {
//   sticky_links: [
//     {
//       media: {
//         path: "/images/sticky_fb.svg",
//         alt: "Sticky Link 1",
//       },
//       link: "/link-1",
//     },
//     {
//       media: {
//         path: "/images/sticky_youtube.svg",
//         alt: "Sticky Link 2",
//       },
//       link: "/link-2",
//     },
//     {
//       media: {
//         path: "/images/sticky_instagram.svg",
//         alt: "Sticky Link 3",
//       },
//       link: "/link-3",
//     },
//     {
//       media: {
//         path: "/images/sticky_linkedIn.svg",
//         alt: "Sticky Link 4",
//       },
//       link: "/link-4",
//     },
//     {
//       media: {
//         path: "/images/sticky_twitter.svg",
//         alt: "Sticky Link 5",
//       },
//       link: "/link-5",
//     },
//     {
//       media: {
//         path: "/images/sticky_whatsapp.svg",
//         alt: "Sticky Link 6",
//       },
//       link: "/link-6",
//     },
//   ],
// };

// export default function StickyWidget({ data = sticky_data }) {
//   const isDesktop = useMediaQuery({ query: "(min-width: 640px)" });

//   const [isOpen, setIsOpen] = useState(false);
//   const widgetRef = useRef(null);

//   const toggleWidget = () => {
//     setIsOpen((prev) => !prev);
//   };

//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (widgetRef.current && !widgetRef.current.contains(e.target)) {
//         setIsOpen(false);
//       }
//     }
//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);

//   return (
//     <>
//       {isDesktop ? (
//         <div className="sm:w-fit sm:h-full fixed z-5 sm:top-1/2 sm:right-[15px] lg:right-[25px] 3xl:right-[40px] bottom-0 sm:m-auto flex sm:flex-col items-center justify-center w-full h-auto max-sm:[&>*]:w-1/5 max-sm:bg-black/70 max-sm:py-[10px]">
//           {data?.sticky_links?.map((item, index) => (
//             <div
//               key={index}
//               className="w-full h-auto sm:mb-[7px] lg:mb-[10px] 3xl:mb-[20px] last:mb-0 max-sm:flex max-sm:items-center max-sm:justify-center"
//             >
//               <a
//                 href={item?.link}
//                 target="_blank"
//                 className="group w-[17px] sm:w-[30px] 3xl:w-[35px] h-auto aspect-square border-1 border-transparent rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/10 hover:border-[#F29A0D] hover:scale-120"
//               >
//                 <Image
//                   src={item?.media?.path}
//                   alt={item?.media?.alt}
//                   width={20}
//                   height={20}
//                   className="w-full h-full sm:p-[7px] 3xl:p-[8px] object-contain group-hover:[filter:brightness(0)_saturate(100%)_invert(63%)_sepia(55%)_saturate(1569%)_hue-rotate(356deg)_brightness(98%)_contrast(94%)]"
//                 />
//               </a>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div ref={widgetRef} className="fixed z-5 bottom-[15%] right-4">
//           <div className="relative">
//             {data?.sticky_links?.map((item, index) => {
//               const total = data?.sticky_links?.length || 1;
//               const radius = 80;
//               const startAngle = -80;
//               const endAngle = 80;
//               const angle =
//                 startAngle + (index * (endAngle - startAngle)) / (total - 1);
//               const x = -Math.cos((angle * Math.PI) / 180) * radius;
//               const y = Math.sin((angle * Math.PI) / 180) * radius;
//               return (
//                 <div
//                   key={index}
//                   className={`absolute top-0 bottom-0 m-auto left-1/2 transform transition-all duration-500 ease-out ${
//                     isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
//                   }`}
//                   style={{
//                     transform: `translate(-50%, -50%) ${
//                       isOpen ? `translate(${x}px, ${y}px)` : "translate(0, 0)"
//                     }`,
//                     transitionDelay: isOpen ? `${index * 80}ms` : "0ms",
//                   }}
//                 >
//                   <a
//                     href={item?.link}
//                     target="_blank"
//                     className="group relative w-[35px] h-[35px] p-[10px] bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/10 hover:border-[#F29A0D] hover:scale-110 overflow-hidden"
//                   >
//                     <img
//                       src={item?.media?.path}
//                       alt={item?.media?.alt}
//                       width={28}
//                       height={28}
//                       className="w-full h-full object-contain transition-all duration-300 group-hover:[filter:brightness(0)_saturate(100%)_invert(63%)_sepia(55%)_saturate(1569%)_hue-rotate(356deg)_brightness(98%)_contrast(94%)] group-hover:scale-110"
//                     />
//                   </a>
//                 </div>
//               );
//             })}
//           </div>

//           <button
//             onClick={toggleWidget}
//             className={`relative w-[35px] h-[35px] bg-gradient-to-r from-[#F29A0D] to-[#FF6B35] rounded-full shadow-xl flex items-center justify-center transition-all duration-500 ease-out hover:scale-110 active:scale-95 group ${
//               isOpen ? "rotate-180" : "rotate-0"
//             }`}
//           >
//             <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F29A0D] to-[#8C5600] opacity-30 animate-ping group-hover:animate-none" />
//             <div className="relative z-10 transition-all duration-300">
//               {isOpen ? (
//                 <X className="w-[15px] h-[15px] text-white flex items-center justify-center" />
//               ) : (
//                 <LayoutGrid className="w-[15px] h-[15px] text-white drop-shadow-sm" />
//               )}
//             </div>
//           </button>
//         </div>
//       )}
//     </>
//   );
// }
"use client";
import Image from "next/image";
import { LayoutGrid, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";

const sticky_data = {
  sticky_links: [
    {
      media: {
        path: "/images/sticky_fb.svg",
        alt: "Sticky Link 1",
      },
      link: "/link-1",
    },
    {
      media: {
        path: "/images/sticky_youtube.svg",
        alt: "Sticky Link 2",
      },
      link: "/link-2",
    },
    {
      media: {
        path: "/images/sticky_instagram.svg",
        alt: "Sticky Link 3",
      },
      link: "/link-3",
    },
    {
      media: {
        path: "/images/sticky_linkedIn.svg",
        alt: "Sticky Link 4",
      },
      link: "/link-4",
    },
    {
      media: {
        path: "/images/sticky_twitter.svg",
        alt: "Sticky Link 5",
      },
      link: "/link-5",
    },
    {
      media: {
        path: "/images/sticky_whatsapp.svg",
        alt: "Sticky Link 6",
      },
      link: "/link-6",
    },
  ],
};

export default function StickyWidget({ data = sticky_data }) {
  const isDesktop = useMediaQuery({ query: "(min-width: 640px)" });
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [footerData, setFooterData] = useState(null);
  const widgetRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    // Fetch footer data from WP REST
    const fetchFooter = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/wp-json/brd/v1/footer`,  { cache: "no-store" }
        );
        const json = await res.json();
        setFooterData(json?.footer_acf || null);
      } catch (error) {
        console.error("Error fetching footer:", error);
      }
    };

    fetchFooter();
  }, []);

  const toggleWidget = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (widgetRef.current && !widgetRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // ✅ Hydration-safe fallback
  if (!mounted) {
    return <div className="fixed z-5 bottom-[15%] right-4" />;
  }

  if (!footerData?.enable__disable_sticky_widgets) {
    return null;
  }

  const links = footerData?.social_media_icons?.filter((i) => i.icon) || [];
  const whatsappObj = footerData?.social_media_icons?.find(
    (i) => i.whatsapp
  )?.whatsapp;

  // Desktop
  return isDesktop ? (
    <div className="sm:w-fit sm:h-full fixed z-5 sm:top-1/2 sm:right-[15px] lg:right-[25px] 3xl:right-[40px] bottom-0 sm:m-auto flex sm:flex-col items-center justify-center w-full h-auto max-sm:[&>*]:w-1/5 max-sm:bg-black/70 max-sm:py-[10px]">
      {links.map((item, index) => (
        <div
          key={index}
          className="w-full h-auto sm:mb-[7px] lg:mb-[10px] 3xl:mb-[20px] last:mb-0 max-sm:flex max-sm:items-center max-sm:justify-center"
        >
          <a
            href={item?.link?.url}
            target="_blank"
            className="group w-[17px] sm:w-[30px] 3xl:w-[35px] h-auto aspect-square border-1 border-transparent rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/10 hover:border-[#F29A0D] hover:scale-120"
          >
            {item?.icon?.url && (
              <Image
                src={item.icon.url || "/images/placeholder.jpg"}
                alt={item.icon.alt || "social icon"}
                width={20}
                height={20}
                className="w-full h-full sm:p-[7px] 3xl:p-[8px] object-contain group-hover:[filter:brightness(0)_saturate(100%)_invert(63%)_sepia(55%)_saturate(1569%)_hue-rotate(356deg)_brightness(98%)_contrast(94%)]"
              />
            )}
          </a>
        </div>
      ))}

      {/* WhatsApp */}
      {whatsappObj?.number && whatsappObj?.whatsapp_icon?.url && (
        <div className="w-full h-auto sm:mb-[7px] lg:mb-[10px] 3xl:mb-[20px] last:mb-0 max-sm:flex max-sm:items-center max-sm:justify-center">
          <a
            href={`https://wa.me/${whatsappObj.number.replace(/[^0-9]/g, "")}`}
            target="_blank"
            className="group w-[17px] sm:w-[30px] 3xl:w-[35px] h-auto aspect-square border-1 border-transparent rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/10 hover:border-[#F29A0D] hover:scale-120"
          >
            <Image
              src={whatsappObj.whatsapp_icon.url || "/images/placeholder.jpg"}
              alt={whatsappObj.whatsapp_icon.alt || "WhatsApp"}
              width={20}
              height={20}
              className="w-full h-full sm:p-[7px] 3xl:p-[8px] object-contain group-hover:[filter:brightness(0)_saturate(100%)_invert(63%)_sepia(55%)_saturate(1569%)_hue-rotate(356deg)_brightness(98%)_contrast(94%)]"
            />
          </a>
        </div>
      )}
    </div>
  ) : (
    // Mobile layout (same approach)
    <div ref={widgetRef} className="fixed z-5 bottom-[15%] right-4">
      <div className="relative">
        {links
          .concat(whatsappObj ? [{ whatsapp: whatsappObj }] : [])
          .map((item, index, arr) => {
            const total = arr.length;
            const radius = 80;
            const startAngle = -80;
            const endAngle = 80;
            const angle =
              startAngle + (index * (endAngle - startAngle)) / (total - 1);
            const x = -Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            const isWhatsapp = item.whatsapp;

            return (
              <div
                key={index}
                className={`absolute top-0 bottom-0 m-auto left-1/2 transform transition-all duration-500 ease-out ${
                  isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
                }`}
                style={{
                  transform: `translate(-50%, -50%) ${
                    isOpen ? `translate(${x}px, ${y}px)` : "translate(0, 0)"
                  }`,
                  transitionDelay: isOpen ? `${index * 80}ms` : "0ms",
                }}
              >
                <a
                  href={
                    isWhatsapp
                      ? `https://wa.me/${item.whatsapp.number.replace(
                          /[^0-9]/g,
                          ""
                        )}`
                      : item?.link?.url
                  }
                  target="_blank"
                  className="group relative w-[35px] h-[35px] p-[10px] bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/10 hover:border-[#F29A0D] hover:scale-110 overflow-hidden"
                >
                  <Image
                    src={
                      isWhatsapp
                        ? item.whatsapp.whatsapp_icon.url
                        : item.icon.url
                    }
                    alt={
                      isWhatsapp
                        ? item.whatsapp.whatsapp_icon.alt
                        : item.icon.alt || "social icon"
                    }
                    width={28}
                    height={28}
                    className="w-full h-full object-contain transition-all duration-300 group-hover:[filter:brightness(0)_saturate(100%)_invert(63%)_sepia(55%)_saturate(1569%)_hue-rotate(356deg)_brightness(98%)_contrast(94%)] group-hover:scale-110"
                  />
                </a>
              </div>
            );
          })}
      </div>

      {/* toggle button unchanged */}
      <button
        onClick={toggleWidget}
        className={`relative w-[35px] h-[35px] bg-gradient-to-r from-[#F29A0D] to-[#FF6B35] rounded-full shadow-xl flex items-center justify-center transition-all duration-500 ease-out hover:scale-110 active:scale-95 group ${
          isOpen ? "rotate-180" : "rotate-0"
        }`}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F29A0D] to-[#8C5600] opacity-30 animate-ping group-hover:animate-none" />
        <div className="relative z-10 transition-all duration-300">
          {isOpen ? (
            <X className="w-[15px] h-[15px] text-white flex items-center justify-center" />
          ) : (
            <LayoutGrid className="w-[15px] h-[15px] text-white drop-shadow-sm" />
          )}
        </div>
      </button>
    </div>
  );
}
