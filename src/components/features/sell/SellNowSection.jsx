import SellForm from "@/components/common/SellForm";
import { Heading } from "@/components/utils/Heading";
import { Text } from "@/components/utils/Text";

const sellNowData = {
  title: "Sell Now",
  description:
    "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.</p>",
};

export default function SellNowSection({ data = sellNowData }) {
  return (
    <section className="w-full h-auto block">
      <div className="container">
        <div className="w-full h-auto block p-[10px_15px] sm:p-[60px_30px] xl:p-[100px_40px] 2xl:p-[140px_60px] bg-gradient-to-tr from-[rgba(217,217,217,0)] to-[rgba(115,115,115,0.1)] border-[1px] border-solid border-white/10 rounded-[10px] backdrop-blur-[20px] shadow-sm transition duration-300">
          <div className="w-full sm:max-w-[468px] xl:max-w-[576px] 2xl:max-w-[768px] mx-auto mb-[20px] sm:mb-[30px] xl:mb-[40px] 2xl:mb-[60px] relative z-0">
            <div className="text-[clamp(1.5rem,12.5vw+-1rem,14rem)] leading-none font-thin text-center font-base2 whitespace-nowrap uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-black absolute -z-1 bottom-1/3 left-1/2 -translate-x-1/2 opacity-10">
              {data?.title}
            </div>
            <Heading
              as="h2"
              size="heading1"
              className="text-center text-white mb-[10px] sm:mb-[10px] xl:mb-[15px] 2xl:mb-[20px]"
            >
              {data?.title}
            </Heading>
            <Text
              as="div"
              size="text3"
              className="!font-light text-center text-white"
            >
              <div dangerouslySetInnerHTML={{ __html: data?.description }} />
            </Text>
          </div>
          <SellForm />
        </div>
      </div>
    </section>
  );
}
