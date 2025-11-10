import "./globals.css";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="Loader w-screen h-screen bg-black fixed top-0 left-0 right-0 bottom-0 z-55 overflow-hidden flex items-center justify-center">
      <Image
        src="/images/logo.svg"
        alt="Loading..."
        width={120}
        height={120}
        className="w-[120px] lg:w-[140px] 3xl:w-[170px] h-auto aspect-square object-contain flex items-center justify-center"
        unoptimized
      />
    </div>
  );
}
