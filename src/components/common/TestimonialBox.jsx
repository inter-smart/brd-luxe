"use client";
import DOMPurify from "isomorphic-dompurify";
import { ShineBorder } from "@/components/magicui/shine-border";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import { useCallback, useState } from "react";
import VideoModal from "./VideoModal";

export default function TestimonialBox({ item }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoClick = useCallback((item) => {
    setSelectedVideo(item);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  }, []);

  const sanitizedDescription = DOMPurify.sanitize(item?.testimonial);

  return (
    <>
      {item?.type === "video" ? (
        <>
          <div
            onClick={(e) => {
              e.preventDefault();
              handleVideoClick(item);
            }}
            className="@container group w-full h-full flex items-end aspect-[280/390] overflow-hidden bg-black relative z-0"
          >
            <Image
              src={item?.image?.url || "/images/placeholder.jpg"}
              alt={item?.image?.alt}
              fill
              sizes="320px"
              placeholder="blur"
              blurDataURL="/images/placeholder.jpg"
              className="-z-2 object-cover transition-opacity duration-300 group-hover:opacity-0"
            />
            <video
              loop
              muted
              playsInline
              // autoPlay
              preload="none"
              className="w-full h-full object-cover absolute -z-1 inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              // onMouseEnter={(e) => e.currentTarget.play()}
              // onMouseLeave={(e) => e.currentTarget.pause()}
              onMouseEnter={(e) => {
                const video = e.currentTarget;
                video.play().catch(() => {}); // ignore AbortError
              }}
              onMouseLeave={(e) => e.currentTarget.pause()}
            >
              <source src={item?.media?.path} type="video/mp4" />
            </video>
            <div className="w-full h-auto p-[8px] sm:p-[10px] 2xl:p-[15px] 3xl:p-[20px] @[320px]:p-[20px] @[420px]:p-[30px] @[468px]:p-[40px] flex items-center">
              <div className="w-[40px] md:w-[50px] xl:w-[65px] 2xl:w-[75px] 3xl:w-[100px] h-auto aspect-square rounded-full overflow-hidden relative z-0 mr-[10px] 2xl:mr-[15px] bg-white/20 backdrop-blur-xl">
                <Image
                  src="/images/play_button.svg"
                  alt="play"
                  width={50}
                  height={50}
                  placeholder="blur"
                  blurDataURL="/images/placeholder.jpg"
                  className="w-full h-full object-cover"
                />
                <ShineBorder
                  borderWidth={3}
                  duration={7}
                  shineColor={["#76767b"]}
                />
              </div>
              <div className="w-[calc(100%-40px)] md:w-[calc(100%-50px)] xl:w-[calc(100%-65px)] 2xl:w-[calc(100%-75px)] 3xl:w-[calc(100%-100px)] xl:pl-[15px] 2xl:pl-[20px] 3xl:pl-[25px]">
                <div className="text-[16px] sm:text-[18px] xl:text-[25px] 2xl:text-[30px] 3xl:text-[38px] leading-tight font-normal font-base1 text-white xl:mb-[2px] 2xl:mb-[4px]">
                  {item?.name}
                </div>
                <p className="text-[11px] sm:text-[12px] md:text-[13px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[23px] leading-tight font-light font-base2 line-clamp-1 text-white">
                  {item?.location}
                </p>
              </div>
            </div>
          </div>
          {selectedVideo && (
            <VideoModal
              videoUrl={item?.video.url}
              videoPath={item?.video.url}
              name={item?.name}
              location={item?.location}
              isOpen={isModalOpen}
              onClose={handleCloseModal}
            />
          )}
        </>
      ) : (
        <div className="@container group w-full h-full flex items-end aspect-[280/390] overflow-hidden bg-white relative z-0">
          <div className="w-full h-full max-h-[80%] lg:max-h-[85%] absolute -z-1 inset-0 p-[8px] sm:p-[10px] 2xl:p-[15px] 3xl:p-[20px] @[320px]:p-[20px] @[420px]:p-[30px] @[468px]:p-[40px]">
            <Rating
              readonly
              size={20}
              className="[&_svg]:inline-block"
              fillColor="#000"
              initialValue={parseInt(item?.rating)}
            />
            <div
              className="max-h-[calc(100%-30px)] pr-[20px] py-[5px] sm:py-[10px] xl:py-[10px] 2xl:py-[20px] overflow-y-auto typography [&>*]:mt-0 [--text-color:black] @[276px]:[&_p,&_li]:text-[15px] @[320px]:[&_p,&_li]:text-[20px] @[420px]:[&_p,&_li]:text-[24px] @[468px]:[&_p,&_li]:text-[30px] @[320px]:py-[20px] @[420px]:py-[30px] @[468px]:py-[40px]"
              dangerouslySetInnerHTML={{
                __html: sanitizedDescription,
              }}
            />
          </div>
          <div className="w-full h-auto p-[8px] sm:p-[10px] 2xl:p-[15px] 3xl:p-[20px] @[320px]:p-[20px] @[420px]:p-[30px] @[468px]:p-[40px] flex items-center">
            <div className="w-[40px] md:w-[50px] xl:w-[65px] 2xl:w-[75px] 3xl:w-[100px] h-auto aspect-square rounded-full overflow-hidden relative z-0 mr-[10px] 2xl:mr-[15px] bg-white/20 backdrop-blur-xl">
              <Image
                src={item?.profile_image?.url || "/images/placeholder.jpg"}
                alt={item?.profile_image?.alt}
                width={50}
                height={50}
                placeholder="blur"
                blurDataURL="/images/placeholder.jpg"
                className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
              />
            </div>
            <div className="w-[calc(100%-40px)] md:w-[calc(100%-50px)] xl:w-[calc(100%-65px)] 2xl:w-[calc(100%-75px)] 3xl:w-[calc(100%-100px)] xl:pl-[15px] 2xl:pl-[20px] 3xl:pl-[25px]">
              <div className="text-[16px] sm:text-[18px] xl:text-[25px] 2xl:text-[30px] 3xl:text-[38px] leading-tight font-normal font-base1 text-black xl:mb-[2px] 2xl:mb-[4px]">
                {item?.name}
              </div>
              <p className="text-[11px] sm:text-[12px] md:text-[13px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[23px] leading-tight font-light font-base2 line-clamp-1 text-black">
                {item?.location}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
