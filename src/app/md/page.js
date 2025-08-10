import InnerHero from "@/components/common/InnerHero";
import MdMessageSection from "@/components/features/md/MdMessageSection";

export default function Page() {
  return (
    <>
      <InnerHero
        title="MD’s message"
        mobileImage={"/images/md_message_banner.webp"}
        desktopImage={"/images/md_message_banner.webp"}
        alt="md_message_banner Hero"
      />
      <MdMessageSection />
    </>
  );
}
