import localFont from "next/font/local";
import Footer from "@/components/layout/Footer";
import Header from "../components/layout/Header";
import LenisWrapper from "@/components/utils/LenisWrapper";
import { Cormorant_Garamond, Raleway } from "next/font/google";
import StickyWidget from "@/components/common/StickyWidget";
import { Toaster } from "sonner";
import { GoogleTagManager } from "@next/third-parties/google";
import { GoogleAnalytics } from "@next/third-parties/google";

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
  title: "BRD LUXE",
  description: "BRD LUXE",
  verification: {
    google: process.env.SITE_VERIFICATION_KEY,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {process.env.NEXT_PUBLIC_GTAG_ID && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTAG_ID} />}
      <body
        className={`${cormorantGaramond.variable} ${raleway.variable} ${CeraPro.variable} bg-black antialiased min-h-screen flex flex-col`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-57LTTXCN"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Header />
        <StickyWidget />
        <main className="flex-grow">
          <LenisWrapper>{children}</LenisWrapper>
        </main>
        <Footer />

        {/* ✅ Required for toast notifications */}
        <Toaster
          position="top-center"
          toastOptions={{
            classNames: {
              toast:
                "!fixed !top-1/2 !left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999]",
            },
          }}
        />

        {process.env.NEXT_PUBLIC_GTAG_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTAG_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
      </body>
      {process.env.GA_TRACKING_ID && <GoogleAnalytics gaId={process.env.GA_TRACKING_ID} />}
    </html>
  );
}
