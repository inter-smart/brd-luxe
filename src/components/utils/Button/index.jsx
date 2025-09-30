import PropTypes from "prop-types";
import Link from "next/link";

const variants = {
  fill: {
    white:
      "text-black bg-white border-white hover:bg-[#9747FF] hover:border-[#9747FF] hover:text-white",
    black:
      "text-white bg-black border-black hover:bg-base1 hover:border-base1 hover:text-white",
    base1:
      "text-[#264156] bg-[#dbefff] border-[#dbefff] hover:bg-base1 hover:text-white hover:border-base1",
    base2:
      "text-[#019B5B] bg-[#b4ffe0] border-[#b4ffe0] hover:bg-base2 hover:text-white hover:border-base2",
  },
};

const sizes = {
  button1:
    "text-[12px] sm:text-[10px] sm:text-[12px] 2xl:text-[15px] 3xl:text-[18px] leading-[1] tracking-[1px] text-center font-semibold font-base1 text-white p-[5px_12px] sm:p-[8px_15px] lg:p-[8px_20px] 2xl:p-[10px_25px] 3xl:p-[10px_30px] rounded-[4px] sm:rounded-[6px] 2xl:rounded-[8px] 3xl:rounded-[10px] border hover:text-black hover:bg-white transition-all duration-300 ease-in-out",
};

const StyledButton = ({
  children,
  className,
  leftIcon,
  rightIcon,
  shape,
  variant = "fill",
  size = "button1",
  color,
  ...restProps
}) => {
  return (
    <button
      className={`${size && sizes[size]} ${variant && variants[variant]?.[color]
        } ${className} transition-background duration-300`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

const StyledLink = ({
  children,
  className,
  leftIcon,
  rightIcon,
  shape,
  variant = "fill",
  size = "button1",
  color,
  href = "/",
  ...restProps
}) => {
  return (
    <Link
      href={href}
      className={`${size && sizes[size]} ${variant && variants[variant]?.[color]
        } ${className} transition-background duration-300`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </Link>
  );
};

// Prop types for documentation and linting
StyledButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  size: PropTypes.oneOf(["button1"]),
  variant: PropTypes.oneOf(["fill"]),
  color: PropTypes.node,
};

StyledLink.propTypes = { ...StyledButton.propTypes, href: PropTypes.string };

export { StyledButton, StyledLink };
