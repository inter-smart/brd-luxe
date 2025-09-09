import Image from "next/image";

export default function VideoSection({ data }) {
  const video_section = data?.sell_your_car_acf?.video_section;

  return video_section?.enable__disable_video_section === true ? (
    <section className="w-full h-auto min-h-screen overflow-hidden flex items-end relative z-0 py-[30px] sm:py-[40px] xl:py-[60px] 2xl:py-[60px] 3xl:py-[80px]">
      {video_section?.video__image === "video" ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover absolute -z-1 inset-0"
        >
          <source src={video_section?.video?.url} type="video/mp4" />
        </video>
      ) : (
        <picture className="absolute -z-1 inset-0">
          <source
            media="(min-width: 640px)"
            srcSet={video_section?.image?.url}
          ></source>
          <Image
            src={video_section?.image?.url}
            alt={video_section?.image?.alt}
            fill
            sizes="100vw"
            placeholder="blur"
            blurDataURL="/images/placeholder.jpg"
            className="-z-1 object-cover"
          />
        </picture>
      )}
      <div className="container">
        <div className="flex flex-wrap justify-center -mx-[10px] sm:-mx-[10px] xl:-mx-[20px] 2xl:-mx-[30px] [&>*]:p-[10px] sm:[&>*]:p-[10px] xl:[&>*]:p-[20px] 2xl:[&>*]:p-[30px]">
          {video_section?.specifications?.map(
            (item, index) =>
              (item?.logo?.url || item?.title) && (
                <div
                  key={`spec_item_${index}`}
                  className="w-1/2 sm:w-1/2 md:w-1/4"
                >
                  <div className="w-full h-full p-[10px_15px] sm:p-[15px_20px] xl:p-[20px_30px] bg-gradient-to-tr from-[rgba(217,217,217,0)] to-[rgba(115,115,115,0.1)] flex items-center border-[1px] border-solid border-white/10 rounded-[10px] backdrop-blur-[20px] shadow-sm transition duration-300 hover:border-white/20 hover:from-[rgba(217,217,217,0.1)] hover:translate-y-1">
                    <Image
                      src={item?.logo?.url || "/images/placeholder.jpg"}
                      alt={item?.logo?.alt}
                      width={50}
                      height={50}
                      placeholder="blur"
                      blurDataURL="/images/placeholder.jpg"
                      className="w-[20px] sm:w-[30px] xl:w-[35px] 2xl:w-[40px] h-auto aspect-square object-contain mr-[5px] sm:mr-[10px] xl:mr-[15px]"
                    />
                    <h3 className="text-[12px] sm:text-[14px] xl:text-[20px] 2xl:text-[24px] 3xl:text-[30px] leading-none font-normal font-base1 line-clamp-2 text-white">
                      {item?.title}
                    </h3>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </section>
  ) : null;
}
