"use client";
import BreadCrumb from "@/components/common/BreadCrumb";
import { StyledButton, StyledLink } from "@/components/utils/Button";
import { Heading } from "@/components/utils/Heading";
import Image from "next/image";
import { useState } from "react";

const INITIAL_VISIBLE_COUNT = 8;
const LOAD_MORE_COUNT = 8;

const newsListData = {
  media: {
    path: "/images/sell-sellinfo-1.jpg",
    alt: "Sell Your Car",
  },
  title: "News & Insights",
  description: null,
  news_list: [
    {
      media: {
        type: "image",
        path: "/images/news-1.jpg",
        alt: "Latest News",
      },
      date: "01 June 2025",
      title: "Top 5 Pre-Owned Luxury Cars Worth Buying in 2025",
      description:
        "Discover the most reliable, stylish, and high-performing used luxury cars that deliver true value and timeless appeal.",
      link: {
        url: "/news/news-detail",
      },
    },
    {
      media: {
        type: "image",
        path: "/images/news-2.jpg",
        alt: "Latest News",
      },
      date: "01 June 2025",
      title: "Top 5 Pre-Owned Luxury Cars Worth Buying in 2025",
      description:
        "Discover the most reliable, stylish, and high-performing used luxury cars that deliver true value and timeless appeal.",
      link: {
        url: "/news/news-detail",
      },
    },
    {
      media: {
        type: "image",
        path: "/images/news-3.jpg",
        alt: "Latest News",
      },
      date: "01 June 2025",
      title: "Top 5 Pre-Owned Luxury Cars Worth Buying in 2025",
      description:
        "Discover the most reliable, stylish, and high-performing used luxury cars that deliver true value and timeless appeal.",
      link: {
        url: "/news/news-detail",
      },
    },
    {
      media: {
        type: "image",
        path: "/images/news-4.jpg",
        alt: "Latest News",
      },
      date: "01 June 2025",
      title: "Top 5 Pre-Owned Luxury Cars Worth Buying in 2025",
      description:
        "Discover the most reliable, stylish, and high-performing used luxury cars that deliver true value and timeless appeal.",
      link: {
        url: "/news/news-detail",
      },
    },
    {
      media: {
        type: "image",
        path: "/images/news-1.jpg",
        alt: "Latest News",
      },
      date: "01 June 2025",
      title: "Top 5 Pre-Owned Luxury Cars Worth Buying in 2025",
      description:
        "Discover the most reliable, stylish, and high-performing used luxury cars that deliver true value and timeless appeal.",
      link: {
        url: "/news/news-detail",
      },
    },
    {
      media: {
        type: "image",
        path: "/images/news-2.jpg",
        alt: "Latest News",
      },
      date: "01 June 2025",
      title: "Top 5 Pre-Owned Luxury Cars Worth Buying in 2025",
      description:
        "Discover the most reliable, stylish, and high-performing used luxury cars that deliver true value and timeless appeal.",
      link: {
        url: "/news/news-detail",
      },
    },
    {
      media: {
        type: "image",
        path: "/images/news-1.jpg",
        alt: "Latest News",
      },
      date: "01 June 2025",
      title: "Top 5 Pre-Owned Luxury Cars Worth Buying in 2025",
      description:
        "Discover the most reliable, stylish, and high-performing used luxury cars that deliver true value and timeless appeal.",
      link: {
        url: "/news/news-detail",
      },
    },
    {
      media: {
        type: "image",
        path: "/images/news-2.jpg",
        alt: "Latest News",
      },
      date: "01 June 2025",
      title: "Top 5 Pre-Owned Luxury Cars Worth Buying in 2025",
      description:
        "Discover the most reliable, stylish, and high-performing used luxury cars that deliver true value and timeless appeal.",
      link: {
        url: "/news/news-detail",
      },
    },
    {
      media: {
        type: "image",
        path: "/images/news-3.jpg",
        alt: "Latest News",
      },
      date: "01 June 2025",
      title: "Top 5 Pre-Owned Luxury Cars Worth Buying in 2025",
      description:
        "Discover the most reliable, stylish, and high-performing used luxury cars that deliver true value and timeless appeal.",
      link: {
        url: "/news/news-detail",
      },
    },
    {
      media: {
        type: "image",
        path: "/images/news-4.jpg",
        alt: "Latest News",
      },
      date: "01 June 2025",
      title: "Top 5 Pre-Owned Luxury Cars Worth Buying in 2025",
      description:
        "Discover the most reliable, stylish, and high-performing used luxury cars that deliver true value and timeless appeal.",
      link: {
        url: "/news/news-detail",
      },
    },
    {
      media: {
        type: "image",
        path: "/images/news-1.jpg",
        alt: "Latest News",
      },
      date: "01 June 2025",
      title: "Top 5 Pre-Owned Luxury Cars Worth Buying in 2025",
      description:
        "Discover the most reliable, stylish, and high-performing used luxury cars that deliver true value and timeless appeal.",
      link: {
        url: "/news/news-detail",
      },
    },
    {
      media: {
        type: "image",
        path: "/images/news-2.jpg",
        alt: "Latest News",
      },
      date: "01 June 2025",
      title: "Top 5 Pre-Owned Luxury Cars Worth Buying in 2025",
      description:
        "Discover the most reliable, stylish, and high-performing used luxury cars that deliver true value and timeless appeal.",
      link: {
        url: "/news/news-detail",
      },
    },
  ],
};
export default function NewsListSection({ data = newsListData }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const handleLoadToggle = () => {
    if (visibleCount >= data.news_list.length) {
      // Collapse to initial count
      setVisibleCount(INITIAL_VISIBLE_COUNT);
    } else {
      // Load more items
      setVisibleCount((prev) =>
        Math.min(prev + LOAD_MORE_COUNT, data.news_list.length)
      );
    }
  };

  const isAllLoaded = visibleCount >= data.news_list.length;

  return (
    <section className="w-full h-auto py-[10px_40px] sm:py-[10px_60px] xl:py-[15px_80px] 2xl:py-[20px_100px] 3xl:py-[20px_120px]">
      <div className="container">
        <div className="w-full mb-[30px] sm:mb-[40px] xl:mb-[60px] 2xl:mb-[60px] 3xl:mb-[80px]">
          <BreadCrumb
            items={[
              { label: "Home", href: "/" },
              { label: "News & Insights", href: "/news" },
            ]}
          />
        </div>
        <Heading
          as="h2"
          size="heading1"
          className="text-white mb-[15px] sm:mb-[15px] xl:mb-[20px] 2xl:mb-[30px]"
        >
          {data?.title}
        </Heading>
        <div className="flex flex-wrap -mx-[10px] sm:-mx-[10px] xl:-mx-[20px] 2xl:-mx-[30px] [&>*]:p-[10px] sm:[&>*]:p-[10px] xl:[&>*]:p-[20px] 2xl:[&>*]:p-[30px]">
          {data?.news_list?.slice(0, visibleCount).map((item, index) => (
            <div key={"news" + index} className="w-full sm:w-1/2 md:w-1/2">
              <div className="group w-full h-auto aspect-4/3  flex items-end overflow-hidden relative z-0">
                <div className="w-full h-full bg-gradient-to-t from-black via-30% via-transparent to-transparent border border-black absolute -z-1 inset-0"></div>
                <Image
                  src={item?.media?.path}
                  alt={item?.media?.alt}
                  width={576}
                  height={992}
                  className="w-full h-full object-cover absolute -z-2 inset-0 group-hover:scale-105 transition duration-500"
                />
                <div className="w-full max-w-[420px] sm:max-w-[468px] xl:max-w-[520px] 2xl:max-w-[576px] 3xl:max-w-[620px] h-auto block p-[15px] sm:p-[20px] xl:p-[40px] 2xl:p-[50px]">
                  <div className="text-[10px] sm:text-[12px] xl:text-[14px] 2xl:text-[16px] leading-normal font-light font-base3 text-white mb-[5px] xl:mb-[10px]">
                    {item?.date}
                  </div>
                  <div className="text-[13px] sm:text-[14px] xl:text-[18px] 2xl:text-[20px] 3xl:text-[24px] leading-tight font-light font-base1 line-clamp-2 text-white mb-[5px] xl:mb-[10px]">
                    {item?.title}
                  </div>
                  <div className="text-[10px] sm:text-[12px] xl:text-[14px] 2xl:text-[16px] leading-normal font-light font-base2 line-clamp-2 text-white mb-[5px] xl:mb-[20px]">
                    {item?.description}
                  </div>
                  <div className="block">
                    <StyledLink
                      href={item?.link?.url}
                      className="min-w-[100px] sm:min-w-[100px] xl:min-w-[120px] 2xl:min-w-[130px] cursor-pointer disabled:cursor-not-allowed inline-block"
                    >
                      {"Read More"}
                    </StyledLink>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {data?.news_list?.length > INITIAL_VISIBLE_COUNT && (
          <div className="flex justify-center mt-[30px] xl:mt-[40px]">
            <StyledButton
              onClick={handleLoadToggle}
              className="!font-light text-center min-w-[120px] sm:min-w-[100px] xl:min-w-[120px] 2xl:min-w-[130px] cursor-pointer border-black disabled:cursor-not-allowed inline-block"
            >
              {isAllLoaded ? "View Less..." : "View More..."}
            </StyledButton>
          </div>
        )}
      </div>
    </section>
  );
}
