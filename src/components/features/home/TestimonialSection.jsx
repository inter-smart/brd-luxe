import dynamic from "next/dynamic";
import { Text } from "../../utils/Text";
import { Heading } from "../../utils/Heading";
import { StyledLink } from "../../utils/Button";

const ExperienceClient = dynamic(() => import("@/components/clientWrappers/Home/Experience/ExperienceClient"), { ssr: true });

export default function ExperienceSection({ data }) {
  const testimonial_section = data?.testimonial_section;

  return testimonial_section?.enable__disable_testimonial_section ? (
    <section className="w-full h-auto block py-[40px] sm:py-[50px] md:py-[70px] lg:py-[90px] 2xl:py-[110px] 3xl:py-[140px]">
      <div className="container">
        <div className="flex flex-wrap items-center">
          <div className="w-full xl:w-[40%] 2xl:w-[45%] xl:pr-[50px] 2xl:pr-[60px] 3xl:pr-[75px] mb-[30px] md:mb-[40px] xl:mb-0 max-xl:flex max-xl:flex-col max-xl:items-center max-xl:justify-center max-xl:text-center">
            <Heading as="h2" size={"heading1"} className="text-white mb-[10px] sm:mb-[15px] lg:mb-[20px] 2xl:mb-[30px] 3xl:mb-[40px]">
              {testimonial_section?.title}
            </Heading>
            <Text
              as="div"
              className="text-[12px] 2xl:text-[14px] 3xl:text-[16px] leading-[1.7] font-base2 font-normal text-white max-w-[85%] mb-[20px] lg:mb-[30px]"
            >
              {testimonial_section?.description}
            </Text>
            {testimonial_section?.button_url?.url && testimonial_section?.button_title && (
              <StyledLink href={testimonial_section?.button_url?.url} target={testimonial_section?.button_url?.target}>
                {testimonial_section?.button_title}
              </StyledLink>
            )}
          </div>
          <ExperienceClient testimonial_section={testimonial_section} />
        </div>
      </div>
    </section>
  ) : null;
}
