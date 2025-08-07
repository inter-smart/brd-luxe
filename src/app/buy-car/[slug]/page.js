import { Breadcrumb } from "@/components/ui/breadcrumb";
import ProductDetailSection from "@/components/features/buy-car/ProductDetailSection";

export default function Page() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Buy A Car", href: "/buy-car" },
          { label: "RANGE ROVER VELAR", href: "/buy-car/RANGE ROVER VELAR" },
        ]}
      />
      <ProductDetailSection />
    </>
  );
}
