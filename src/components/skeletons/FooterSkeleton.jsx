import { Skeleton } from "../ui/skeleton";

const FooterSkeleton = () => {
  return (
    <footer className="w-full h-auto border-t border-[#202020]/50 py-[40px] lg:py-[40px] 2xl:py-[60px] 3xl:py-[75px] overflow-hidden block">
      <div className="container relative">
        {/* Background BIG BRD */}
        <div className="absolute left-0 bottom-0 pointer-events-none opacity-10">
          <Skeleton className="h-[220px] w-[520px] bg-white/10 rounded-none" />
        </div>

        {/* Top Content */}
        <div className="w-full flex items-start justify-between relative z-10">
          {/* Left Links */}
          <div className="flex flex-col gap-6">
            <Skeleton className="h-[18px] w-[180px] bg-white/20" />
            <Skeleton className="h-[18px] w-[160px] bg-white/20" />
          </div>

          {/* Center Content */}
          <div className="flex flex-col items-center gap-6">
            {/* Logo */}
            <Skeleton className="h-[28px] w-[160px] bg-white/20 rounded-md" />

            {/* Social Icons */}
            <div className="flex items-center gap-6">
              <Skeleton className="h-[18px] w-[18px] rounded-full bg-white/20" />
              <Skeleton className="h-[18px] w-[18px] rounded-full bg-white/20" />
              <Skeleton className="h-[18px] w-[18px] rounded-full bg-white/20" />
              <Skeleton className="h-[18px] w-[18px] rounded-full bg-white/20" />
            </div>

            {/* Newsletter */}
            <div className="flex items-center overflow-hidden rounded-full border border-white/20">
              <Skeleton className="h-[42px] w-[260px] bg-white/10 rounded-none" />
              <Skeleton className="h-[42px] w-[100px] bg-white/30 rounded-none" />
            </div>
          </div>

          {/* Right Links */}
          <div className="flex flex-col gap-6 items-end">
            <Skeleton className="h-[18px] w-[90px] bg-white/20" />
            <Skeleton className="h-[18px] w-[80px] bg-white/20" />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="w-full flex items-center justify-between mt-14 relative z-10">
          <Skeleton className="h-[14px] w-[220px] bg-white/10" />
          <Skeleton className="h-[14px] w-[180px] bg-white/10" />
        </div>
      </div>
    </footer>
  );
};

export default FooterSkeleton;
