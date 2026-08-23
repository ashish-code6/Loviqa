"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Sparkles, Users } from "lucide-react";
import { API_ENDPOINTS, apiRequest } from "@/lib/api";

export default function DailyEmojiOfTheDay() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const hasLoaded = useRef(false);

  const loadEmoji = useCallback(async () => {
    try {
      const response = await apiRequest(API_ENDPOINTS.dailyEmoji.ofTheDay);
      setResult(response.data);
    } catch {
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!hasLoaded.current) {
      hasLoaded.current = true;
      loadEmoji();
    }
    window.addEventListener("loviqa:daily-emoji-voted", loadEmoji);
    return () => window.removeEventListener("loviqa:daily-emoji-voted", loadEmoji);
  }, [loadEmoji]);

  const hasResult = Boolean(result?.emoji);
  const emoji = result?.emoji;
  const count = result?.count ?? 0;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-fuchsia-200/20 bg-gradient-to-br from-fuchsia-400/[0.16] via-violet-500/[0.12] to-cyan-400/[0.08] p-5 shadow-[0_24px_65px_rgba(0,0,0,.25),inset_0_1px_0_rgba(255,255,255,.22)] backdrop-blur-xl sm:p-6">
      <div aria-hidden="true" className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-fuchsia-300/20 blur-3xl" />
      <div className="relative flex items-start justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.13em] text-fuchsia-100/80"><Sparkles className="h-3.5 w-3.5" /> Live community mood</div>
          <h2 className="mt-3 text-lg font-bold text-white">Emoji of the Day</h2>
          <p className="mt-1 text-sm text-white/60">{isLoading || hasResult ? "The feeling everyone is sharing today." : "Be the first to share your mood today."}</p>
          <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white/65"><Users className="h-3.5 w-3.5" /> {isLoading ? "Finding today's mood..." : hasResult ? `${count} ${count === 1 ? "person" : "people"} chose this` : "No votes yet"}</p>
        </div>
        <div className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl border border-white/25 bg-white/[0.13] text-5xl shadow-[inset_0_1px_0_rgba(255,255,255,.32)]">{isLoading ? "…" : emoji ?? "—"}</div>
      </div>
    </section>
  );
}
