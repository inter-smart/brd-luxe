import "./globals.css";
import localFont from "next/font/local";
import Footer from "@/components/layout/Footer";
import Header from "../components/layout/Header";
import LenisWrapper from "@/components/utils/LenisWrapper";
import { Cormorant_Garamond, Raleway } from "next/font/google";
import StickyWidget from "@/components/common/StickyWidget";

// Load CeraPro Font
const CeraPro = localFont({
  src: [
    {
      path: "../../public/fonts/CeraPro-Thin.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/CeraPro-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/CeraPro-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/CeraPro-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/CeraPro-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/CeraPro-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-ceraPro",
  preload: true,
  display: "swap",
});

// Load Cormorant_Garamond Font
const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

// Load Raleway Font
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-raleway",
});

export const metadata = {
  title: "BRD Luxe",
  description: "Created in Next.js App Router",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${cormorantGaramond.variable} ${raleway.variable} ${CeraPro.variable} bg-black antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <StickyWidget />
        <main className="flex-grow">
          <LenisWrapper>{children}</LenisWrapper>
        </main>
        <Footer />
      </body>
    </html>
  );
}
