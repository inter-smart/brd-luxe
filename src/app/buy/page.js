import InnerHero from "@/components/common/InnerHero";
import Breadcrumb from "@/components/common/BreadCrumb";
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
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Buy A Car", href: "/buy-car" },
        ]}
      />
      <ProductListSection />
    </>
  );
}
