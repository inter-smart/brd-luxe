import { ShinyButton } from "@/components/magicui/shiny-button";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center flex-col py-[30px] xl:py-[40px] 2xl:py-[90px]">
      <TextHoverEffect
        duration={0.2}
        className="!text-[200px] sm:!text-[130px] md:!text-[200px] lg:!text-[210px] xl:!text-[250px] 2xl:!text-[305px] 3xl:!text-[480px] !leading-[1.5] !font-bold font-base1 text-center w-full !h-auto text-nowrap mb-[20px] lg:mb-[25px] 2xl:mb-[40px]"
        text={"404"}
      />
      <div className="text-[28px] sm:text-[38px] lg:text-[42px] 2xl:text-[62px] 3xl:text-[72px] leading-[0.8] font-normal font-base1 text-transparent bg-clip-text bg-gradient-to-b from-[#171717] via-[#333333] via-55% to-[#171717] [-webkit-text-fill-color:transparent] mb-[20px] lg:mb-[40px]">
        Page not found
      </div>
      <ShinyButton
        href="/"
        className={`text-[11px] lg:text-[12px] 2xl:text-[15px] 3xl:text-[18px] leading-[1] font-semibold font-base1 tracking-[0.5px] text-white p-[8px_15px] rounded-[5px] bg-black hover:bg-white hover:text-black transition-all duration-300 ease-in-out `}
      >
        Back To Home
      </ShinyButton>
    </div>
  );
}
