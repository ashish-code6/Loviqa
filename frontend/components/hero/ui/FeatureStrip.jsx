import { featureCards } from "../data/heroContent";

export default function FeatureStrip() {
  return (
    <div className="mx-auto grid max-w-[1410px] grid-cols-1 overflow-hidden rounded-3xl border border-white/10 bg-[#14071f]/72 shadow-[0_28px_80px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl md:grid-cols-2 xl:grid-cols-4">
      {featureCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <article
            key={card.title}
            className={`flex gap-6 p-8 lg:p-10 ${index > 0 ? "xl:border-l xl:border-white/10" : ""}`}
          >
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-fuchsia-500/[0.13] text-fuchsia-300 shadow-[0_0_42px_rgba(217,70,239,0.22)]">
              <Icon className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">{card.title}</h3>
              <p className="mt-3 max-w-[220px] text-sm leading-7 text-white/58">{card.description}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
