import localFont from "next/font/local";
import Footer from "@/components/layout/Footer";
import Header from "../components/layout/Header";
import LenisWrapper from "@/components/utils/LenisWrapper";
import { Cormorant_Garamond, Raleway } from "next/font/google";
import StickyWidget from "@/components/common/StickyWidget";
import { Toaster } from "sonner";
import { GoogleTagManager } from "@next/third-parties/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import Image from "next/image";

// Load CeraPro Font - Optimized: only load essential weights
const CeraPro = localFont({
  src: [
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
  ],
  variable: "--font-ceraPro",
  preload: true,
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

// Load Cormorant_Garamond Font - Optimized: reduced weights
const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-cormorant",
  fallback: ["serif"],
});

// Load Raleway Font - Optimized: reduced weights
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-raleway",
  fallback: ["sans-serif"],
});

export const metadata = {
  title: "BRD LUXE",
  description: "BRD LUXE - Luxury Car Dealership",
  metadataBase: new URL("https://www.brdluxe.com"),
  alternates: {
    canonical: "/",
  },
  verification: {
    google: process.env.SITE_VERIFICATION_KEY,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {process.env.NEXT_PUBLIC_GTAG_ID && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTAG_ID} />}
      {process.env.GA_TRACKING_ID && <GoogleAnalytics gaId={process.env.GA_TRACKING_ID} />}
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://app.alertspanel.com" />

        {/* Meta Pixel Code - Deferred */}
        <Script id="fb-pixel" strategy="lazyOnload">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '833166408969081');
            fbq('track', 'PageView');
          `}
        </Script>

        <noscript>
          <Image
            alt="facebook"
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=833166408969081&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>

      <body className={`${cormorantGaramond.variable} ${raleway.variable} ${CeraPro.variable} bg-black antialiased min-h-screen flex flex-col`}>
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
              toast: "!fixed !top-1/2 !left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999]",
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

        <Script id="alertspanel-chatbot" strategy="lazyOnload">
          {`!function(e,t,a){
            var c=e.head||e.getElementsByTagName("head")[0],
            n=e.createElement("script");
            n.async=!0;
            n.defer=!0;
            n.type="text/javascript";
            n.src=t+"/static/js/widget.js?config="+JSON.stringify(a);
            c.appendChild(n)
          }(document,"https://app.alertspanel.com",{
            bot_key:"7e3094c919bc47c0",
            welcome_msg:true,
            branding_key:"alertspanel",
            server:"https://app.alertspanel.com",
            e:"p"
          });`}
        </Script>
      </body>
    </html>
  );
}
