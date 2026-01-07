import HeaderClient from "@/components/clientWrappers/HeaderClient";
import { fetchHeaderData } from "@/lib/api";

export default async function Header() {
  const data = await fetchHeaderData();

  if (!data) {
    return <div>No data</div>;
  }

  return <HeaderClient data={data} />;
}
