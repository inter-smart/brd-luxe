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
    "text-[10px] sm:text-[12px] 3xl:text-[14px] leading-[1] font-light font-base2 text-white uppercase hover:!text-[#F29A0D]";

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <BreadcrumbItem key={index}>
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
                  className="mx-[3px] lg:mx-[5px] 3xl:mx-[10px]"
                />
              </>
            ) : (
              <BreadcrumbPage
                className={`${breadcrumbStyle} pointer-events-none`}
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
