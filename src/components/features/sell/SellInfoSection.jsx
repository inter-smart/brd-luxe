import BreadCrumb from "@/components/common/BreadCrumb";
import { Heading } from "@/components/utils/Heading";
import { Text } from "@/components/utils/Text";
import Image from "next/image";

export default function SellInfoSection({ data }) {
  const first_description_section =
    data?.sell_your_car_acf?.first_description_section;

  return first_description_section?.enable__disable_first_description_section ===
    true ? (
    <section className="w-full h-auto block overflow-hidden">
      <div className="container container-sp sm:!mr-0 sm:!pr-0">
        <div className="relative z-0">
          <div className="w-1/2 absolute z-0 left-0 top-[10px] sm:top-[10px] xl:top-[15px] 2xl:top-[30px]">
            <BreadCrumb
              items={[
                { label: "Home", href: "/" },
                { label: data.title, href: "/sell" },
              ]}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center -mx-[15px] sm:-mx-[20px] xl:-mx-[40px] 2xl:-mx-[60px] [&>*]:px-[15px] sm:[&>*]:px-[20px] xl:[&>*]:px-[40px] 2xl:[&>*]:px-[60px]">
          <div className="w-full sm:w-1/2 xl:w-[45%]">
            <div className="w-full 2xl:max-w-[768px] py-[60px_40px] sm:py-[60px] xl:py-[80px] 2xl:py-[100px] 3xl:py-[120px]">
              <Heading
                as="h2"
                size="heading1"
                className="text-white mb-[15px] sm:mb-[15px] xl:mb-[20px] 2xl:mb-[30px]"
              >
                {first_description_section?.title}
              </Heading>
              <Text
                as="div"
                size="text3"
                className="!font-light text-white mb-[15px] sm:mb-[20px] xl:mb-[30px] 2xl:mb-[40px]"
                dangerouslySetInnerHTML={{
                  __html: first_description_section?.description,
                }}
              />
            </div>
          </div>
          <div className="w-full sm:w-1/2 xl:w-[55%]">
            <div className="w-full h-auto aspect-square [mask-image:linear-gradient(to_left,white_0%,white_70%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_left,white_0%,white_70%,transparent_100%)] overflow-hidden">
              <Image
                src={first_description_section?.background_image?.url || "/images/placeholder.jpg"}
                alt={first_description_section?.background_image?.alt}
                width={880}
                height={850}
                placeholder="blur"
                blurDataURL="/images/placeholder.jpg"
                className="w-full h-full object-cover hover:scale-105 transition origin-right duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : null;
}
