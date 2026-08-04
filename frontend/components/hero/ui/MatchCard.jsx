export default function MatchCard({ card }) {
  return (
    <div
      className={`absolute hidden w-[124px] rounded-[20px] border border-white/[0.2] bg-[#160923]/62 p-3 shadow-[0_0_30px_rgba(168,85,247,0.44),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-xl lg:block ${card.position}`}
    >
      <div className="mb-2 flex gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-300/50" />
        <span className="h-1.5 w-1.5 rounded-full bg-violet-300/50" />
      </div>
      <div className={`mx-auto h-12 w-12 rounded-full bg-gradient-to-br ${card.avatar} ring-2 ring-white/25`} />
      <div className="mt-3 text-center">
        <p className="text-xs font-bold text-white">{card.name}</p>
        <p className="text-[11px] text-white/65">{card.interest}</p>
        <span className="mt-2 inline-flex rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-[0_0_18px_rgba(217,70,239,0.34)]">
          {card.match}
        </span>
      </div>
    </div>
  );
}
