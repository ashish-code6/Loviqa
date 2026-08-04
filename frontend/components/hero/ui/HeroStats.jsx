import { stats } from "../data/heroContent";

export default function HeroStats() {
  return (
    <div className="grid max-w-xl grid-cols-2 gap-x-10 gap-y-7 sm:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label}>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-fuchsia-300/10 bg-fuchsia-500/[0.09] text-fuchsia-300 shadow-[0_0_26px_rgba(217,70,239,0.16)]">
              <Icon className="h-6 w-6" />
            </div>
            <p className="text-base font-extrabold text-white">{item.value}</p>
            <p className="mt-1 text-xs text-white/55">{item.label}</p>
          </div>
        );
      })}
    </div>
  );
}
