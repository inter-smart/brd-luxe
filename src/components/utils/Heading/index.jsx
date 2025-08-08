const sizes = {
  heading1:
    "text-[24px] sm:text-[26px] lg:text-[32px] xl:text-[36px] 2xl:text-[44px] 3xl:text-[55px] leading-tight font-light font-base1",
  heading2:
    "text-[16px] sm:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[25px] 3xl:text-[30px] leading-tight font-light font-base1",
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
