import Image from "next/image";
import { Heading } from "../../utils/Heading";
import { StyledLink } from "../../utils/Button";

const lets_talk_data = {
  heading: {
    title: "Let’s Talk Luxury",
  },
  media: {
    type: "video",
    path: "/videos/lets_talk.mp4",
    alt: "Let's Talk",
  },
  description:
    "Have questions or ready to make a move? Our team is here to guide you through every step of your luxury car journey.",
  links: [
    {
      label: "Get in Touch",
      url: "/",
    },
    {
      label: "Find Us Near You",
      url: "/",
    },
  ],
};

export default function LetsTalkSection({data = lets_talk_data}) {
  return (
    <section className="w-full h-auto border-y border-[#9C9C9C]/20 block relative z-0 before:w-full before:h-[50%] before:bg-linear-to-b before:from-black before:to-black/0 before:absolute before:top-0 before:-z-1 after:w-full after:h-full after:bg-linear-to-b after:from-black/0 after:to-black after:absolute after:bottom-0 after:-z-1">
      <div className="w-full h-[350px] md:h-[420px] lg:h-[510px] 2xl:h-[610px] 3xl:h-[770px] overflow-hidden flex items-center justify-center relative -z-2">
        {data?.media?.type === "video" ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover absolute inset-0 -z-2"
          >
            <source src={data?.media?.path} type="video/mp4" />
          </video>
        ) : (
          <picture className="absolute -z-2 inset-0">
            <source
              media="(max-width: 640px)"
              srcSet={data?.media?.path}
            />
            <Image
              src={data?.media?.path}
              alt={data?.media?.alt}
              fill
              sizes="100vw"
              className="object-cover -z-2"
            />
          </picture>
        )}
      </div>
      <div className="container">
        <div className="w-full h-full absolute inset-0 z-1 flex flex-col items-center justify-center">
          <div className="text-center max-w-[340px] 2xl:max-w-[500px]">
            <Heading
              as="div"
              size={"heading1"}
              className="text-white mb-[15px] sm:mb-[20px] 2xl:mb-[25px] 3xl:mb-[30px]"
            >
              {data?.heading?.title}
            </Heading>
            <div className="text-[12px] 2xl:text-[14px] 3xl:text-[16px] leading-[1.5] font-normal font-base2 text-white mb-[20px] sm:mb-[25px] 2xl:mb-[30px] 3xl:mb-[40px]">
              {data?.description}
            </div>
            <div className="w-full h-auto flex flex-wrap justify-center mx-[-5px] sm:mx-[-7px] 2xl:mx-[-10px] [&>*]:p-[0_5px] sm:[&>*]:p-[0_7px] 2xl:[&>*]:p-[0_10px]">
              {data?.links?.map((item, index) => (
                <div
                  key={`latest_info-${index}`}
                  className="w-auto h-auto block"
                >
                  <StyledLink href={item?.url} className={"bg-black"}>
                    {item?.label}
                  </StyledLink>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
