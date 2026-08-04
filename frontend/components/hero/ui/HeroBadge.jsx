import { HiSparkles } from "react-icons/hi2";

export default function HeroBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/18 bg-fuchsia-500/[0.08] px-5 py-2 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl">
      <HiSparkles className="h-4 w-4 text-fuchsia-300" />
      AI-Powered Connections
    </span>
  );
}
