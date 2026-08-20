"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { toast } from "react-toastify";
import { apiRequest } from "@/lib/api";

const EMOJIS = ["\u{1F60A}", "\u{1F60D}", "\u{1F970}", "\u{2728}", "\u{1F60C}", "\u{1F525}", "\u{1F929}", "\u{1F49C}"];
export default function DailyEmojiPicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const hasCheckedToday = useRef(false);

  useEffect(() => {
    async function checkTodaySelection() {
      if (hasCheckedToday.current) return;
      hasCheckedToday.current = true;
      const justLoggedIn = sessionStorage.getItem("loviqa:show-daily-emoji") === "true";

      // A fresh login should always receive the daily check-in prompt.
      if (justLoggedIn) {
        setIsOpen(true);
        return;
      }

      try {
        const response = await apiRequest("/daily-emoji/mine");
        setIsOpen(!response.data);
      } catch {
        // Never hide the picker because of a temporary API/network failure.
        setIsOpen(true);
      }
    }

    checkTodaySelection();
  }, []);

  async function submitEmoji() {
    if (!selectedEmoji || isSaving) return;

    setIsSaving(true);
    try {
      await apiRequest("/daily-emoji", { method: "POST", body: JSON.stringify({ emoji: selectedEmoji }) });
      sessionStorage.removeItem("loviqa:show-daily-emoji");
      window.dispatchEvent(new Event("loviqa:daily-emoji-voted"));
      setIsOpen(false);
      toast.success("Your emoji is part of today's vibe!");
    } catch (error) {
      toast.error(error.message || "Could not save your emoji. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  function skip() {
    setIsOpen(false);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-[#05030c]/70 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="daily-emoji-title">
      <section className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/20 bg-[#160f26]/95 p-6 shadow-[0_32px_100px_rgba(0,0,0,.6),inset_0_1px_0_rgba(255,255,255,.2)] sm:p-8">
        <div aria-hidden="true" className="absolute -left-16 -top-16 h-52 w-52 rounded-full bg-fuchsia-500/25 blur-3xl" />
        <div className="relative"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-fuchsia-400 to-violet-600 shadow-[0_0_24px_rgba(217,70,239,.4)]"><Sparkles className="h-6 w-6" /></div><p className="mt-5 text-xs font-bold tracking-[0.14em] text-fuchsia-200">YOUR DAILY CHECK-IN</p><h2 id="daily-emoji-title" className="mt-2 text-2xl font-black">What&apos;s your vibe today?</h2><p className="mt-2 text-sm leading-6 text-white/60">Choose one emoji and help set the Loviqa mood for today.</p>
          <div className="mt-6 grid grid-cols-4 gap-3">{EMOJIS.map((emoji) => <button key={emoji} type="button" onClick={() => setSelectedEmoji(emoji)} aria-label={`Choose ${emoji}`} className={`relative grid aspect-square place-items-center rounded-2xl border text-3xl transition hover:-translate-y-0.5 ${selectedEmoji === emoji ? "border-fuchsia-200 bg-fuchsia-400/20 shadow-[0_0_22px_rgba(232,121,249,.28)]" : "border-white/10 bg-white/[0.06] hover:border-white/30"}`}>{emoji}{selectedEmoji === emoji && <span className="absolute right-1.5 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-fuchsia-300 text-[#200d30]"><Check className="h-3 w-3 stroke-[3]" /></span>}</button>)}</div>
          <button type="button" disabled={!selectedEmoji || isSaving} onClick={submitEmoji} className="mt-6 h-12 w-full rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 text-sm font-bold text-white shadow-[0_14px_32px_rgba(168,85,247,.3)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45">{isSaving ? "Saving your vibe…" : "Share today’s emoji"}</button>
          <button type="button" onClick={skip} disabled={isSaving} className="mt-3 w-full py-2 text-sm font-medium text-white/50 transition hover:text-white">Maybe later</button>
        </div>
      </section>
    </div>
  );
}
