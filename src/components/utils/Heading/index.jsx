const sizes = {
  heading1:
    "text-[24px] sm:text-[26px] lg:text-[32px] xl:text-[37px] 2xl:text-[44px] 3xl:text-[55px] font-light leading-tight font-base1",
  heading2:
    "text-[22px] sm:text-[24px] lg:text-[32px] xl:text-[36px] 2xl:text-[42px] 3xl:text-[48px] font-semibold leading-tight tracking-tight",
  heading3:
    "text-[16px] sm:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[25px] 3xl:text-[30px] font-medium leading-tight",
  heading4:
    "text-[16px] sm:text-[18px] lg:text-[20px] xl:text-[22px] 2xl:text-[26px] 3xl:text-[30px] font-medium leading-tight tracking-tight",
  heading5:
    "text-[16px] sm:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[24px] 3xl:text-[26px] font-medium leading-tight tracking-tight",
  heading6:
    "text-[12px] sm:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[20px] font-medium leading-tight",
  heading7:
    "text-[26px] sm:text-[28px] lg:text-[32px] xl:text-[48px] 2xl:text-[52px] 3xl:text-[64px] leading-tight font-semibold tracking-tight",
};

const Heading = ({ children, className = "", size, as, ...restProps }) => {
  const Component = as || "h6";

  return (
    <Component className={`${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Heading };
