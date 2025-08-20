import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

function Breadcrumb({ ...props }) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

function BreadcrumbList({ className, ...props }) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-[4px] sm:gap-[6px] 3xl:gap-[8px] text-sm break-words",
        className
      )}
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-[4px] sm:gap-[6px] 3xl:gap-[8px]", className)}
      {...props}
    />
  );
}

function BreadcrumbLink({ asChild, className, ...props }) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("hover:text-foreground transition-colors", className)}
      {...props}
    />
  );
}

function BreadcrumbPage({ className, ...props }) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props}
    />
  );
}

function BreadcrumbSeparator({ children, className, ...props }) {
  return (
    <span
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("", className)}
      {...props}
    >
      {children ?? (
        <div className="w-full h-full">
          {/* <svg
            width="5"
            height="10"
            viewBox="0 0 5 10"
            fill="none"
            className="w-full h-full object-contain"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 5.00002C5 4.88377 4.95927 4.76741 4.87792 4.67866L0.711272 0.13321C0.54846 -0.0444034 0.284816 -0.0444033 0.122109 0.13321C-0.0405987 0.310823 -0.0407029 0.598436 0.122109 0.775936L3.99417 5.00002L0.122109 9.22411C-0.0407025 9.40172 -0.0407025 9.68933 0.122109 9.86683C0.284921 10.0443 0.548565 10.0444 0.711273 9.86683L4.87792 5.32138C4.95927 5.23263 5 5.11627 5 5.00002Z"
              fill="white"
            />
          </svg> */}
        </div>
      )}
    </span>
  );
}

function BreadcrumbEllipsis({ className, ...props }) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
