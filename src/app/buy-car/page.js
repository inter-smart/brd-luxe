import InnerHero from "@/components/common/InnerHero";
import ProductListSection from "@/components/features/buy-car/ProductListSection";

export default function Page() {
  return (
    <>
      <InnerHero
        title="Buy a car"
        mobileImage={"/images/buy_a_car_banner.webp"}
        desktopImage={"/images/buy_a_car_banner.webp"}
        alt="Buy a Car Hero"
      />
      <ProductListSection />
    </>
  );
}
