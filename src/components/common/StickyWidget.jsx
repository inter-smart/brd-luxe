import StickyWidgetClient from "../clientWrappers/StickyWidgetClient";

export default function StickyWidget({ footer }) {
  return <StickyWidgetClient data={footer?.footer_acf} />;
}
