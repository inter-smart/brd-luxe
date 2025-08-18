"use client";
import BreadCrumb from "@/components/common/BreadCrumb";
import { StyledButton } from "@/components/utils/Button";
import { Heading } from "@/components/utils/Heading";
import { useState } from "react";
import TestimonialBox from "@/components/common/TestimonialBox";
import Image from "next/image";
import SelectVehicleForm from "@/components/common/SelectVehicleForm";

const INITIAL_VISIBLE_COUNT = 8;
const LOAD_MORE_COUNT = 8;

const testimonialData = {
  media: null,
  review: {
    rating: 4.7,
    count: 2384,
    media: {
      type: "image",
      path: "/images/testimonial-google-review.svg",
      alt: "bg",
    },
  },
  title: "Voices of Trust: Experiences That Define Luxury",
  description: null,
  testimonial_list: [
    {
      rating: null,
      type: "video",
      media: {
        type: null,
        path: "/videos/home_banner.mp4",
        alt: "bg",
      },
      description: null,
      author: {
        media: {
          type: null,
          path: "/images/testimonial-1.jpg",
          alt: "author",
        },
        title: "Sameer Thomas",
        description: "Bangalore",
      },
    },
    {
      rating: 4,
      type: "text",
      media: null,
      description: `<p>"BRD LUXE made buying my dream car effortless. From the first call to the final delivery, the experience was nothing short of premium."</p><p>"BRD LUXE made buying my dream car effortless. From the first call to the final delivery, the experience was nothing short of premium."</p><p>"BRD LUXE made buying my dream car effortless. From the first call to the final delivery, the experience was nothing short of premium."</p><p>"BRD LUXE made buying my dream car effortless. From the first call to the final delivery, the experience was nothing short of premium."</p><p>"BRD LUXE made buying my dream car effortless. From the first call to the final delivery, the experience was nothing short of premium."</p><p>"BRD LUXE made buying my dream car effortless. From the first call to the final delivery, the experience was nothing short of premium."</p><p>"BRD LUXE made buying my dream car effortless. From the first call to the final delivery, the experience was nothing short of premium."</p><p>"BRD LUXE made buying my dream car effortless. From the first call to the final delivery, the experience was nothing short of premium."</p><p>"BRD LUXE made buying my dream car effortless. From the first call to the final delivery, the experience was nothing short of premium."</p><p>"BRD LUXE made buying my dream car effortless. From the first call to the final delivery, the experience was nothing short of premium."</p>`,
      author: {
        media: {
          type: null,
          path: "/images/testimonial-2.jpg",
          alt: "author",
        },
        title: "Rahul Menon",
        description: "Kochi, MG Road",
      },
    },
    {
      rating: null,
      type: "video",
      media: {
        type: null,
        path: "/videos/home_banner.mp4",
        alt: "bg",
      },
      description: null,
      author: {
        media: {
          type: null,
          path: "/images/testimonial-3.jpg",
          alt: "author",
        },
        title: "Anjali Nair",
        description: "Kochi, MG Road",
      },
    },
    {
      rating: 5,
      type: "text",
      media: null,
      description: `<p>"BRD LUXE made buying my dream car effortless. From the first call to the final delivery, the experience was nothing short of premium."</p>`,
      author: {
        media: {
          type: null,
          path: "/images/testimonial-2.jpg",
          alt: "author",
        },
        title: "Rahul Menon",
        description: "Kochi, MG Road",
      },
    },
    {
      rating: 5,
      type: "text",
      media: null,
      description: `<p>"BRD LUXE made buying my dream car effortless. From the first call to the final delivery, the experience was nothing short of premium."</p>`,
      author: {
        media: {
          type: null,
          path: "/images/testimonial-2.jpg",
          alt: "author",
        },
        title: "Rahul Menon",
        description: "Kochi, MG Road",
      },
    },
    {
      rating: 4,
      type: "text",
      media: null,
      description: `<p>"BRD LUXE made buying my dream car effortless. From the first call to the final delivery, the experience was nothing short of premium."</p>`,
      author: {
        media: {
          type: null,
          path: "/images/testimonial-2.jpg",
          alt: "author",
        },
        title: "Rahul Menon",
        description: "Kochi, MG Road",
      },
    },
  ],
};

export default function ListSection({ data = testimonialData }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const testimonials = data.testimonial_list;

  const handleLoadToggle = () => {
    if (visibleCount >= testimonials) {
      // Collapse to initial count
      setVisibleCount(INITIAL_VISIBLE_COUNT);
    } else {
      // Load more items
      setVisibleCount((prev) => Math.min(prev + LOAD_MORE_COUNT, testimonials));
    }
  };

  const isAllLoaded = visibleCount >= testimonials;
  return (
    <section className="w-full h-auto py-[10px_40px] sm:py-[10px_60px] xl:py-[15px_80px] 2xl:py-[20px_100px] 3xl:py-[20px_120px]">
      <div className="container">
        <div className="w-full mb-[30px] sm:mb-[40px] xl:mb-[60px] 2xl:mb-[60px] 3xl:mb-[80px]">
          <BreadCrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Testimonials", href: "/testimonial" },
            ]}
          />
        </div>
        <div className="w-full flex flex-col lg:flex-row xl:space-x-[20px] mb-[30px] sm:mb-[15px] xl:mb-[20px] 2xl:mb-[30px]">
          <div className="flex-1">
            <Heading
              as="h2"
              size="heading1"
              className="text-white max-lg:mb-[20px]"
            >
              {data?.title}
            </Heading>
          </div>
          <div className="flex flex-wrap items-end space-x-[20px] space-y-[20px]">
            <div className="xl:mb-[10px]">
              <SelectVehicleForm />
            </div>
            <div>
              <div className="w-[140px] sm:w-[160px] xl:w-[200px] 2xl:w-[260px] h-auto relative z-0">
                <Image
                  src={data?.review?.media?.path}
                  alt={data?.review?.media?.alt}
                  width={260}
                  height={70}
                  className="w-[90px] sm:w-[100px] xl:w-[130px] 2xl:w-[176px]"
                />
                <div className="text-[10px] xl:text-[12px] 2xl:text-[14px] leading-none font-light font-base3 text-white flex items-center mt-[-2px] sm:mt-[-5px] xl:mt-[-10px]">
                  <Image
                    src="/images/testimonial-google-review-star.svg"
                    alt="testimonial-google-review-star"
                    width={14}
                    height={14}
                    className="w-[8px] sm:w-[10px] xl:w-[12px] 2xl:w-[14px] mr-[2px] xl:mr-[5px] 2xl:mr-[10px] block"
                  />
                  {data?.review?.rating} {"Ratings"}
                </div>
                <div className="text-[10px] xl:text-[14px] 2xl:text-[16px] leading-tight font-light font-base3 text-white w-full max-w-[40px]  xl:max-w-[60px] m-auto absolute z-1 right-0 top-1/2 -translate-y-1/2">
                  {data?.review?.count} {"Reviews"}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-[5px] sm:-mx-[10px] xl:-mx-[15px] 2xl:-mx-[25px] 3xl:-mx-[30px] [&>*]:p-[5px] sm:[&>*]:p-[10px] xl:[&>*]:p-[15px] 2xl:[&>*]:p-[25px] 3xl:[&>*]:p-[30px]">
          {testimonials?.slice(0, visibleCount).map((item, index) => {
            return (
              <div
                key={"news" + index}
                className="w-full 3xs:w-1/2 sm:w-1/2 md:w-1/3"
              >
                <TestimonialBox item={item} />
              </div>
            );
          })}
        </div>

        {testimonials?.length > INITIAL_VISIBLE_COUNT && (
          <div className="flex justify-center mt-[30px] xl:mt-[40px]">
            <StyledButton
              onClick={handleLoadToggle}
              className="!font-light text-center min-w-[120px] sm:min-w-[100px] xl:min-w-[120px] 2xl:min-w-[130px] cursor-pointer border-black disabled:cursor-not-allowed inline-block"
            >
              {isAllLoaded ? "View Less..." : "View More..."}
            </StyledButton>
          </div>
        )}
        <button className="text-[14px] 2xl:text-[15px] 3xl:text-[20px] font-light font-base1 text-white text-center w-full mt-[20px] lg:mt-[35px]">Loading More...</button>
      </div>
    </section>
  );
}
