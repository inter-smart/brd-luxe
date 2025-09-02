"use client";
import BreadCrumb from "@/components/common/BreadCrumb";
import { ShineBorder } from "@/components/magicui/shine-border";
import dynamic from "next/dynamic";

const LocationMap = dynamic(() => import("@/components/common/LocationMap"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default function ContactInfoSection({ data }) {

  const contact_info_section = data?.contact_acf?.contact_info_section;

  return (
    contact_info_section?.enable__disable_contact_info_section === true ? (
      <section className="w-full h-auto py-[10px_30px] sm:py-[10px_40px] xl:py-[15px_60px] 2xl:py-[20px_60px] 3xl:py-[20px_80px]">
        <div className="container">
          <div className="w-full mb-[30px] sm:mb-[40px] xl:mb-[60px] 2xl:mb-[60px] 3xl:mb-[80px]">
            <BreadCrumb
              items={[
                { label: "Home", href: "/" },
                { label: data.title, href: "/contact" },
              ]}
            />
          </div>
          <div className="flex flex-wrap justify-center -mx-[10px] sm:-mx-[15px] xl:-mx-[20px] 2xl:-mx-[25px] [&>*]:p-[10px] sm:[&>*]:p-[15px] xl:[&>*]:p-[20px] 2xl:[&>*]:p-[25px]">
            <div className="w-full sm:w-[35%] md:w-[40%]">
              <div className="w-full h-full p-[10px_20px] sm:p-[5px_20px] xl:p-[20px_60px] 2xl:p-[60px_80px] bg-gradient-to-tr from-[rgba(217,217,217,0)] to-[rgba(115,115,115,0.1)] block rounded-[10px] backdrop-blur-[20px] shadow-sm transition duration-300 relative z-0 hover:from-[rgba(217,217,217,0.1)]">
                <ShineBorder
                  borderWidth={1}
                  shineColor={["#252529"]}
                />
                {contact_info_section?.address && (
                  <div className="w-full xl:max-w-[476px] my-[20px] xl:my-[30px] 2xl:my-[40px]">
                    <h3 className="text-[16px] sm:text-[18px] xl:text-[22px] 2xl:text-[26px] 3xl:text-[34px] leading-none font-light font-base1 text-white mb-[10px] xl:mb-[15px]">
                      Address
                    </h3>
                    <div className="text-[11px] sm:text-[13px] 2xl:text-[16px] 3xl:text-[24px] leading-normal font-light font-base2 text-white">
                      {contact_info_section?.address}
                    </div>
                  </div>
                )}
                {contact_info_section?.phone_number && (
                  <ContactBox title="Call" data={[contact_info_section?.phone_number]} isPhone />
                )}
                {contact_info_section?.email && (
                  <ContactBox title="Email" data={[contact_info_section?.email]} />
                )}
              </div>
            </div>
            <div className="w-full sm:w-[65%] md:w-[60%]">
              <div className="w-full h-full min-h-[268px] sm:min-h-[320px] xl:min-h-[310px] 2xl:min-h-[468px] block border-[1px] border-solid border-white/10 rounded-[10px] overflow-hidden relative z-0">
                {contact_info_section?.latitude && contact_info_section?.longitude &&(
                  <LocationMap
                    position={[contact_info_section?.latitude, contact_info_section?.longitude]}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    ): null
  );
}

function ContactBox({ title, data, isPhone = false }) {
  if (!Array.isArray(data)) return null;

  return (
    <div className="w-full my-[20px] xl:my-[30px] 2xl:my-[40px]">
      <h3 className="text-[12px] xl:text-[14px] 2xl:text-[16px] leading-normal font-light font-base1 text-white mb-[2px]">
        {title}
      </h3>
      <div className="text-[12px] xl:text-[14px] 2xl:text-[16px] leading-normal font-light font-base3 text-white">
        {data.map((item, index) => (
          <div key={`${title.toLowerCase()}-${index}`} className="mb-2">
            <a href={isPhone ? `tel:${item}` : `mailto:${item}`}>{item}</a>
          </div>
        ))}
      </div>
    </div>
  );
}
