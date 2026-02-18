import FooterClient from "@/components/clientWrappers/FooterClient";

export default function Footer({ footer }) {
  return <FooterClient data={footer?.footer_acf} />;
}
