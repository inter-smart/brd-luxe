const sizes = {
  text1:
    "text-[12px] sm:text-[12px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[20px] leading-normal font-light tracking-tight font-base2",
  text2:
    "3xl:text-[15px] 2xl:text-[13px] xl:text-[11px] lg:text-[10px] sm:text-[9px] text-[12px] font-normal leading-normal",
  text3:
    "text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[20px] leading-normal font-normal",
  text4:
    "3xl:text-[14px] 2xl:text-[12px] xl:text-[10px] sm:text-[8px] text-[10px] font-normal leading-normal",
};

const Text = ({ children, className = "", as, size, ...restProps }) => {
  const Component = as || "p";

  return (
    <Component className={`${className} ${sizes[size]} `} {...restProps}>
      {children}
    </Component>
  );
};

export { Text };
