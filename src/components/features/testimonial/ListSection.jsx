"use client";

import { useState, useMemo } from "react";
import BreadCrumb from "@/components/common/BreadCrumb";
import { StyledButton } from "@/components/utils/Button";
import { Heading } from "@/components/utils/Heading";
import TestimonialBox from "@/components/common/TestimonialBox";
import Image from "next/image";
import SelectVehicleForm from "@/components/common/SelectVehicleForm";

const INITIAL_VISIBLE_COUNT = 12;
const LOAD_MORE_COUNT = 6;

export default function ListSection({ data }) {
  const testimonialsData = data?.testimonial_acf?.testimonials;
  const testimonials = testimonialsData?.testimonial_posts ?? [];

  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [selectedCarType, setSelectedCarType] = useState(null);

  // Filter testimonials by car_type when selected
  const filteredTestimonials = useMemo(() => {
    if (!selectedCarType) return testimonials;
    return testimonials.filter((t) =>
      (t.car_type || []).some((ct) => ct.slug === selectedCarType)
    );
  }, [selectedCarType, testimonials]);

  const handleLoadToggle = () => {
    if (visibleCount >= filteredTestimonials.length) {
      // Collapse to initial count
      setVisibleCount(INITIAL_VISIBLE_COUNT);
    } else {
      // Load more items
      setVisibleCount((prev) =>
        Math.min(prev + LOAD_MORE_COUNT, filteredTestimonials.length)
      );
    }
  };

  const isAllLoaded = visibleCount >= filteredTestimonials.length;

  return (
    <section className="w-full h-auto py-[10px_40px] sm:py-[10px_60px] xl:py-[15px_80px] 2xl:py-[20px_100px] 3xl:py-[20px_120px]">
      <div className="container">
        {/* Breadcrumb */}
        <div className="w-full mb-[30px] sm:mb-[40px] xl:mb-[60px] 2xl:mb-[60px] 3xl:mb-[80px]">
          <BreadCrumb
            items={[
              { label: "Home", href: "/" },
              { label: data.title, href: "/testimonials" },
            ]}
          />
        </div>

        {/* Heading + Google Reviews */}
        <div className="w-full flex flex-col lg:flex-row xl:space-x-[20px] mb-[30px] sm:mb-[15px] xl:mb-[20px] 2xl:mb-[30px]">
          <div className="flex-1">
            <Heading
              as="h2"
              size="heading1"
              className="text-white max-lg:mb-[20px]"
            >
              {testimonialsData?.heading}
            </Heading>
          </div>

          <div className="flex flex-wrap items-end space-x-[20px] space-y-[20px]">
            <div className="xl:mb-[10px]">
              <SelectVehicleForm
                testimonials={testimonials}
                onChange={(slug) => {
                  setSelectedCarType(slug);
                  setVisibleCount(INITIAL_VISIBLE_COUNT); // reset load state on filter change
                }}
              />
            </div>

            {testimonialsData?.enable__disable_google_reviews_section &&
              testimonialsData?.logo?.url && (
                <div className="w-[140px] sm:w-[160px] xl:w-[200px] 2xl:w-[260px] h-auto relative z-0">
                  <Image
                    src={testimonialsData?.logo?.url}
                    alt={testimonialsData?.logo?.alt || "google-review-logo"}
                    width={260}
                    height={70}
                    placeholder="blur"
                    blurDataURL="/images/placeholder.jpg"
                    className="w-[90px] sm:w-[100px] xl:w-[130px] 2xl:w-[176px]"
                  />
                  {/* Static text since API doesn’t give rating & count yet */}
                  <div className="text-[10px] xl:text-[12px] 2xl:text-[14px] leading-none font-light font-base3 text-white flex items-center mt-[-2px] sm:mt-[-5px] xl:mt-[-10px]">
                    <Image
                      src="/images/testimonial-google-review-star.svg"
                      alt="testimonial-google-review-star"
                      width={14}
                      height={14}
                      className="w-[8px] sm:w-[10px] xl:w-[12px] 2xl:w-[14px] mr-[2px] xl:mr-[5px] 2xl:mr-[10px] block"
                    />
                    4.7 Ratings
                  </div>
                  <div className="text-[10px] xl:text-[14px] 2xl:text-[16px] leading-tight font-light font-base3 text-white w-full max-w-[40px] xl:max-w-[60px] m-auto absolute z-1 right-0 top-1/2 -translate-y-1/2">
                    2384 Reviews
                  </div>
                </div>
              )}
          </div>
        </div>

        {/* Testimonials */}
        <div className="flex flex-wrap -mx-[5px] sm:-mx-[10px] xl:-mx-[15px] 2xl:-mx-[25px] 3xl:-mx-[30px] [&>*]:p-[5px] sm:[&>*]:p-[10px] xl:[&>*]:p-[15px] 2xl:[&>*]:p-[25px] 3xl:[&>*]:p-[30px]">
          {filteredTestimonials?.slice(0, visibleCount).map((item, index) => (
            <div
              key={item?.id || "testimonial-" + index}
              className="w-full 3xs:w-1/2 sm:w-1/2 md:w-1/3"
            >
              <TestimonialBox item={item} />
            </div>
          ))}

          {filteredTestimonials.length === 0 && (
            <p className="text-white text-center w-full">
              No testimonials found for this selection.
            </p>
          )}
        </div>

        {/* Load More Button */}
        {filteredTestimonials?.length > INITIAL_VISIBLE_COUNT && (
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
