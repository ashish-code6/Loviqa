import { HiHeart } from "react-icons/hi2";

export default function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-300 shadow-[0_0_28px_rgba(217,70,239,0.45)]">
        <HiHeart className="h-5 w-5 text-black" />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-black" />
      </div>
      <span className="text-xl font-black tracking-[0.42em] text-white">LOVIQA</span>
    </div>
  );
}
