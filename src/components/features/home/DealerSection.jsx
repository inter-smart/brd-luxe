import DealerSectionClient from "@/components/clientWrappers/Home/DealerSection/DealerSectionClient";

export default function DealerSection({ data }) {
  return (
    <section className="w-full h-auto block py-[40px_60px] sm:py-[50px_90px] lg:py-[60px_130px] 2xl:py-[70px_150px] 3xl:py-[90px_200px]">
      <div className="container">
        <div className="[&>*]:max-md:text-center [&>*]:w-full [&>*]:md:w-1/3 md:space-x-[20px] lg:space-x-[35px] 2xl:space-x-[45px] 3xl:space-x-[60px] flex items-center max-md:flex-col">
          <DealerSectionClient data={data} />
        </div>
      </div>
    </section>
  );
}
