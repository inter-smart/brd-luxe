"use client";
import dynamic from "next/dynamic";

const LocationMap = dynamic(() => import("@/components/common/LocationMap"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});


const contactInfoSection = {
  title: "Contact Info",
  address: "BRD Complex, NH Bypass, Konikkara.P.O, Thrissur, Kerala - 680306",
  phone: ["+91 89430 77777"],
  email: ["info@brdluxe.com"],
  location: {
    lat: 10.459203,
    lng: 76.258723,
  }
};

export default function ContactInfoSection({ data = contactInfoSection }) {
  return (
    <section className="w-full h-auto py-[30px] sm:py-[40px] xl:py-[60px] 2xl:py-[60px] 3xl:py-[80px]">
      <div className="container">
        <div className="flex flex-wrap justify-center -mx-[10px] sm:-mx-[15px] xl:-mx-[20px] 2xl:-mx-[25px] [&>*]:p-[10px] sm:[&>*]:p-[15px] xl:[&>*]:p-[20px] 2xl:[&>*]:p-[25px]">
          <div className="w-1/2 sm:w-1/2 md:w-[40%]">
            <div className="w-full h-full p-[15px_20px] sm:p-[20px_40px] xl:p-[40px_60px] 2xl:p-[60px_80px] bg-gradient-to-tr from-[rgba(217,217,217,0)] to-[rgba(115,115,115,0.1)] block border-[1px] border-solid border-white/10 rounded-[10px] backdrop-blur-[20px] shadow-sm transition duration-300 hover:border-white/20 hover:from-[rgba(217,217,217,0.1)]">
              <div className="w-full my-[20px] xl:my-[30px] 2xl:my-[40px]">
                <h3 className="text-[14px] sm:text-[16px] xl:text-[22px] 2xl:text-[26px] 3xl:text-[34px] leading-none font-light font-base1 text-white mb-[10px] xl:mb-[15px]">
                  Address
                </h3>
                <div className="text-[12px] sm:text-[14px] xl:text-[18px] 2xl:text-[20px] 3xl:text-[24px] leading-normal font-light font-base1 text-white">
                  {data?.address}
                </div>
              </div>
              <ContactBox title="Call" data={data?.phone} isPhone />
              <ContactBox title="Email" data={data?.email} />
            </div>
          </div>
          <div className="w-1/2 sm:w-1/2 md:w-[60%]">
            <div className="w-full h-full min-h-[376px] xl:min-h-[420px] 2xl:min-h-[468px] block border-[1px] border-solid border-white/10 rounded-[10px] overflow-hidden relative z-0">
              <LocationMap position={[data?.location?.lat, data?.location?.lng]}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactBox({ title, data, isPhone = false }) {
  if (!Array.isArray(data)) return null;

  return (
    <div className="w-full my-[20px] xl:my-[30px] 2xl:my-[40px]">
      <h3 className="text-[12px] xl:text-[14px] 2xl:text-[16px] leading-normal font-light font-base1 text-white mb-[10px] xl:mb-[15px]">
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
