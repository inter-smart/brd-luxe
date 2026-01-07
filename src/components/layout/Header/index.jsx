import HeaderClient from "@/components/clientWrappers/HeaderClient";

export default function Header({ header }) {
  return <HeaderClient data={header?.header_acf} />;
}
