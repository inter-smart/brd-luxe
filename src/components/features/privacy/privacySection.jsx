import BreadCrumb from "@/components/common/BreadCrumb";

export default function PrivacySection({ data }) {

  return (
    <section className="w-full h-auto block py-[20px_40px] sm:py-[20px_50px] lg:py-[20px_70px] 2xl:py-[20px_80px] 3xl:py-[20px_100px] mt-[var(--header-y)]">
      <div className="container">
        <div className="lg:mb-[40px] 2xl:mb-[50px] 3xl:mb-[60px]">
          <BreadCrumb
            items={[
              { label: "Home", href: "/" },
              { label: data.title, href: "" },
            ]}
          />
        </div>

        <div className="typography [&>*]:text-[#ffffff] [&>h1,h2,h3,h4,h5,h6]:font-base1 [&>h1,h2,h3,h4,h5,h6]:mb-[15px] lg:[&>h1,h2,h3,h4,h5,h6]:mb-[25px] 3xl:[&>h1,h2,h3,h4,h5,h6]:mb-[30px] [&>ul]:pl-3">
          <h1>{data?.legal_page_acf?.title}</h1>
          <div
            dangerouslySetInnerHTML={{ __html: data?.legal_page_acf?.content_description || "" }}
          />
        </div>
      </div>
    </section>
  );
}
