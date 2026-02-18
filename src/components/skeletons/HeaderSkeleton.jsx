import { Skeleton } from "../ui/skeleton";

const HeaderSkeleton = () => {
  return (
    <header className="w-full absolute top-0 left-0 right-0 z-70">
      <div className="w-full h-auto py-[25px] lg:py-[20px] 2xl:py-[25px] 3xl:py-[30px] fixed top-0 inset-x-0 z-5 bg-linear-to-b from-black to-black/0">
        <div className="container">
          <div className="w-full flex items-center justify-between relative">
            {/* Left: Hamburger */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-[42px] w-[42px] rounded-lg bg-white/20" />
            </div>

            {/* Center: Logo */}
            <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
              <Skeleton className="h-[28px] w-[160px] rounded-md bg-white/20" />
              <Skeleton className="h-[12px] w-[120px] rounded bg-white/10" />
            </div>

            {/* Right: Contact + Buttons */}
            <div className="flex items-center gap-4">
              <Skeleton className="h-[22px] w-[140px] rounded bg-white/20" />
              <Skeleton className="h-[40px] w-[110px] rounded-full bg-white/20" />
              <Skeleton className="h-[40px] w-[130px] rounded-full bg-white/20" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderSkeleton;
