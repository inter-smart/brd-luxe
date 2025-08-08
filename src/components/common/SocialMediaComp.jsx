import Image from "next/image";

const socialMediaData = [
  {
    url: "/",
    icon: "/images/footer_faceook.svg",
    name: "facebook",
  },
  {
    url: "/",
    icon: "/images/footer_youtube.svg",
    name: "youtube",
  },
  {
    url: "/",
    icon: "/images/footer_instagram.svg",
    name: "instagram",
  },
  {
    url: "/",
    icon: "/images/footer_linkedin.svg",
    name: "linkedin",
  },
  {
    url: "/",
    icon: "/images/footer_twitter.svg",
    name: "twitter",
  },
];

export default function SocialMediaComp({ data = socialMediaData }) {
  return (
    <ul className="flex space-x-[15px] sm:space-x-[20px] lg:space-x-[40px] 2xl:space-x-[60px] 3xl:space-x-[80px]">
      {data?.map((item, index) => (
        <li key={"social media" + index}>
          <a
            href={item?.url}
            target="_blank"
            className="w-[15px] lg:w-[17px] 2xl:w-[20px] h-auto aspect-square flex items-center justify-center relative z-0 transition hover:opacity-40"
          >
            <Image
              src={item?.icon}
              alt={item?.name}
              width={20}
              height={20}
              className="w-full h-full object-contain"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
