import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BreadCrumb({ items = [] }) {
  const breadcrumbStyle =
    "text-[10px] sm:text-[11px] 3xl:text-[14px] leading-[1] font-light font-base2 text-white uppercase transition duration-200 group-hover:!text-[#F29A0D]";

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <BreadcrumbItem key={index} className="group last:pointer-events-none">
            {index < items.length - 1 ? (
              <>
                <BreadcrumbLink asChild>
                  <Link
                    href={item.href || "#"}
                    className={`${breadcrumbStyle}`}
                  >
                    {item.label}
                  </Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator
                  aria-hidden="true"
                  className="w-[7.5px] sm:w-[8px] 3xl:w-[10px] h-auto aspect-square flex items-center justify-center group-hover:[filter:brightness(0)_saturate(100%)_invert(63%)_sepia(55%)_saturate(1569%)_hue-rotate(356deg)_brightness(98%)_contrast(94%)]"
                />
              </>
            ) : (
              <BreadcrumbPage
                className={`${breadcrumbStyle}`}
              >
                {item.label}
              </BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
