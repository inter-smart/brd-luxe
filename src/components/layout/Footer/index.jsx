import FooterClient from "@/components/clientWrappers/FooterClient";
import { fetchFooterData } from "@/lib/api";

export default async function Footer() {
  const data = await fetchFooterData();

  if (!data) {
    return <div>No data</div>;
  }

  return <FooterClient data={data} />;
}
