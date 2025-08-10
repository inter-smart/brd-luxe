"use client";
import DOMPurify from "isomorphic-dompurify";
import { ShineBorder } from "@/components/magicui/shine-border";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";

export default function TestimonialBox({ item }) {
  const sanitizedDescription = DOMPurify.sanitize(item?.description);
  return (
    <>
      {item?.type === "video" ? (
        <div
          //   onClick={(e) => {
          //     e.preventDefault();
          //     handleVideoClick(item);
          //   }}
          className="@container group w-full h-full flex items-end aspect-[280/390] overflow-hidden bg-black relative z-0"
        >
          <Image
            src={item?.author?.media?.path}
            alt={item?.author?.media?.alt}
            fill
            sizes="320px"
            className="-z-2 object-cover transition-opacity duration-300 group-hover:opacity-0"
          />
          <video
            loop
            muted
            playsInline
            autoPlay
            preload="none"
            className="w-full h-full object-cover absolute -z-1 inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            //   onMouseEnter={(e) => e.currentTarget.play()}
            //   onMouseLeave={(e) => e.currentTarget.pause()}
          >
            <source src={item?.media?.path} type="video/mp4" />
          </video>
          <div className="w-full h-auto p-[8px] sm:p-[10px] 2xl:p-[15px] 3xl:p-[20px] flex items-center">
            <div className="w-[20px] sm:w-[30px] xl:w-[40px] 2xl:w-[50px] h-auto aspect-square rounded-full overflow-hidden relative z-0 mr-[10px] 2xl:mr-[15px] bg-white/20 backdrop-blur-xl">
              <Image
                src="/images/play_button.svg"
                alt="play"
                width={50}
                height={50}
                className="w-full h-full object-cover"
              />
              <ShineBorder borderWidth={2} shineColor={["#76767b"]} />
            </div>
            <div className="w-[calc(100%-20px)] sm:w-[calc(100%-30px)] xl:w-[calc(100%-40px)] 2xl:w-[calc(100%-50px)]">
              <div className="text-[12px] sm:text-[12px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[20px] leading-tight font-normal font-base1 text-white xl:mb-[2px] 2xl:mb-[4px]">
                {item?.author?.title}
              </div>
              <p className="text-[10px] 2xl:text-[12px] leading-tight font-light font-base2 line-clamp-1 text-white">
                {item?.author?.description}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="@container group w-full h-full flex items-end aspect-[280/390] overflow-hidden bg-white relative z-0">
          <div className="w-full h-full max-h-[80%] lg:max-h-[85%] absolute -z-1 inset-0 p-[8px] sm:p-[10px] 2xl:p-[15px] 3xl:p-[20px] @[360px]:p-[20px] @[420px]:p-[30px] @[468px]:p-[40px]">
            <Rating
              readonly
              size={20}
              className="[&_svg]:inline-block"
              fillColor="#000"
              initialValue={parseInt(item?.rating)}
            />
            <div
              className="max-h-[calc(100%-30px)] py-[5px] sm:py-[10px] xl:py-[10px] 2xl:py-[20px] overflow-y-auto typography [&>*]:mt-0 [--text-color:black] @[276px]:[&_p,&_li]:text-[16px] @[360px]:[&_p,&_li]:text-[20px] @[420px]:[&_p,&_li]:text-[24px] @[468px]:[&_p,&_li]:text-[30px] @[360px]:py-[20px] @[420px]:py-[30px] @[468px]:py-[40px]"
              dangerouslySetInnerHTML={{
                __html: sanitizedDescription,
              }}
            />
          </div>
          <div className="w-full h-auto p-[8px] sm:p-[10px] 2xl:p-[15px] 3xl:p-[20px] @[360px]:p-[20px] @[420px]:p-[30px] @[468px]:p-[40px] flex items-center">
            <div className="w-[20px] sm:w-[30px] xl:w-[40px] 2xl:w-[50px] h-auto aspect-square rounded-full overflow-hidden relative z-0 mr-[10px] 2xl:mr-[15px] bg-white/20 backdrop-blur-xl">
              <Image
                src={item?.author?.media?.path}
                alt={item?.author?.media?.alt}
                width={50}
                height={50}
                className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
              />
              <ShineBorder borderWidth={2} shineColor={["#76767b"]} />
            </div>
            <div className="w-[calc(100%-20px)] sm:w-[calc(100%-30px)] xl:w-[calc(100%-40px)] 2xl:w-[calc(100%-50px)]">
              <div className="text-[12px] sm:text-[12px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[20px] leading-tight font-normal font-base1 text-black xl:mb-[2px] 2xl:mb-[4px]">
                {item?.author?.title}
              </div>
              <p className="text-[10px] 2xl:text-[12px] leading-tight font-light font-base2 line-clamp-1 text-black">
                {item?.author?.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
