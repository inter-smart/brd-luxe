const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function fetchHeaderData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/brd/v1/header`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch header");
    const data = await res.json();
    return data?.header_acf || null;
  } catch (e) {
    console.error("Header fetch failed", e);
    return null;
  }
}

export async function fetchFooterData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/brd/v1/footer`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch footer");
    const data = await res.json();
    return data?.footer_acf || null;
  } catch (e) {
    console.error("Footer fetch failed", e);
    return null;
  }
}
