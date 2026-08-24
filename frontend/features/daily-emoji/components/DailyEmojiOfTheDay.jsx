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

  const emoji = result?.emoji;
  const count = result?.count ?? 0;

  return (
    <section className="flex h-full items-center justify-between gap-4">
      <div>
        <p className="flex items-center gap-2 text-[.62rem] font-bold uppercase tracking-[.13em] text-fuchsia-100/80"><Sparkles className="h-3 w-3" /> Community mood</p>
        <h2 className="mt-1.5 text-base font-bold text-white">Emoji of the day</h2>
        <p className="mt-1 text-xs text-white/60">{isLoading || emoji ? "The feeling everyone is sharing today." : "Be the first to share your mood today."}</p>
        <p className="mt-2 inline-flex items-center gap-1.5 text-[.65rem] font-semibold text-white/65"><Users className="h-3 w-3" /> {isLoading ? "Finding today's mood..." : emoji ? `${count} ${count === 1 ? "person" : "people"} chose this` : "No votes yet"}</p>
      </div>
      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-fuchsia-200/25 bg-fuchsia-400/10 text-3xl">{isLoading ? "…" : emoji ?? "—"}</div>
    </section>
  );
}
