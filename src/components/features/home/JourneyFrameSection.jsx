import dynamic from "next/dynamic";
import { Heading } from "../../utils/Heading";

const JourneyFrameClient = dynamic(() => import("@/components/clientWrappers/Home/JourneyFrame/JourneyFrameClient"), { ssr: true });

export default function JourneyFrameSection({ data }) {
  const journey_in_frames_section = data?.journey_in_frames_section;

  return journey_in_frames_section?.enable__disable_journey_in_frames_section ? (
    <section className="w-full h-auto py-[40px] sm:py-[50px] lg:py-[75px] 2xl:py-[90px] 3xl:py-[110px] block">
      <div className="container">
        <div className="w-full h-auto mb-[30px] lg:mb-[40px] 2xl:mb-[50px] 3xl:mb-[60px]">
          <Heading as="div" size={"heading1"} className="text-white max-sm:text-center">
            {journey_in_frames_section?.title}
          </Heading>
        </div>
        <JourneyFrameClient journey_in_frames_section={journey_in_frames_section} />
      </div>
    </section>
  ) : null;
}
