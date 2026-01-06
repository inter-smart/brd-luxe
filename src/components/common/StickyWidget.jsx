import { fetchFooterData } from "@/lib/api";
import StickyWidgetClient from "../clientWrappers/StickyWidgetClient";

export default async function StickyWidget() {
  const data = await fetchFooterData();

  if (!data) {
    return <div>No data</div>;
  }

  return <StickyWidgetClient data={data} />;
}
