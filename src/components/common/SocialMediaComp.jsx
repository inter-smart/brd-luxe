import Image from "next/image";

export default function SocialMediaComp({ data = [] }) {
  // Only keep valid items (must have link + icon url)
  const validIcons = data.filter(
    (item) => item?.link && item?.icon?.url
  );

  if (validIcons.length === 0) return null; // nothing to show

  return (
    <ul className="flex space-x-[15px] sm:space-x-[20px] lg:space-x-[40px] 2xl:space-x-[60px] 3xl:space-x-[80px]">
      {validIcons.map((item, index) => (
        <li key={"social-media-" + index}>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[15px] lg:w-[17px] 2xl:w-[20px] h-auto aspect-square flex items-center justify-center relative z-0 transition hover:opacity-40"
          >
            <Image
              src={item.icon.url}
              alt={item.icon.alt || item.icon.title || "social-icon"}
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
