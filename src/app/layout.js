import localFont from "next/font/local";
import Footer from "@/components/layout/Footer";
import Header from "../components/layout/Header";
import LenisWrapper from "@/components/utils/LenisWrapper";
import { Cormorant_Garamond, Raleway } from "next/font/google";
import StickyWidget from "@/components/common/StickyWidget";
import { Toaster } from "sonner";

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
  description: "Created in Next.js App Router",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-57LTTXCN');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
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
      </body>
    </html>
  );
}
