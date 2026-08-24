"use client";

import { useEffect, useState } from "react";
import { Bell, Compass, Heart, Menu, MessageCircle, Search, Users, X } from "lucide-react";
import AccountMenu from "@/features/account/components/AccountMenu";
import DailyEmojiOfTheDay from "@/features/daily-emoji/components/DailyEmojiOfTheDay";
import DailyEmojiPicker from "@/features/daily-emoji/components/DailyEmojiPicker";
import DashboardMatchCarousel from "@/features/dashboard-matches/DashboardMatchCarousel";
import ActiveClubs from "@/features/dashboard/components/ActiveClubs";
import styles from "@/features/dashboard/DashboardLayout.module.css";
import { getTimeGreeting } from "@/features/dashboard/utils/time-greeting";
import { API_ENDPOINTS, apiRequest, clearSession, getStoredUser, saveSession } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

const navItems = [
  { label: "Discover", icon: Compass }, { label: "Matches", icon: Heart },
  { label: "Communities", icon: Users }, { label: "Chat", icon: MessageCircle },
];
export default function DashboardPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("Discover");
  const [user, setUser] = useState(null);
  const [isSessionChecked, setIsSessionChecked] = useState(false);
  const [greeting, setGreeting] = useState("");
  const router = useRouter();

  useEffect(() => {
    const refreshGreeting = () => setGreeting(getTimeGreeting());
    refreshGreeting();
    const timer = window.setInterval(refreshGreeting, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    function redirectIfSignedOut() {
      const sessionUser = getStoredUser();

      if (!sessionUser) {
        router.replace("/?auth=login");
        return false;
      }

      setUser(sessionUser);
      setIsSessionChecked(true);
      apiRequest(API_ENDPOINTS.auth.profile)
        .then((data) => {
          const refreshedUser = { ...sessionUser, ...data.user, ...(data.user?.profile || {}) };
          setUser(refreshedUser);
          saveSession({ user: refreshedUser });
        })
        .catch(() => {});
      return true;
    }

    redirectIfSignedOut();
    window.addEventListener("pageshow", redirectIfSignedOut);
    function handleSessionExpired() {
      clearSession();
      router.replace("/?auth=login");
    }
    window.addEventListener("loviqa:session-expired", handleSessionExpired);
    return () => {
      window.removeEventListener("pageshow", redirectIfSignedOut);
      window.removeEventListener("loviqa:session-expired", handleSessionExpired);
    };
  }, [router]);

  if (!isSessionChecked) {
    return <main className="min-h-screen bg-[#060711]" />;
  }

  return <main className="relative min-h-screen overflow-hidden bg-[#060711] px-4 pb-10 pt-4 text-white sm:px-6 lg:px-10">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-24 -top-32 h-[32rem] w-[32rem] rounded-full bg-violet-600/20 blur-[120px]" /><div className="absolute right-[-9rem] top-28 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/15 blur-[110px]" /><div className="absolute bottom-[-14rem] left-[28%] h-[30rem] w-[30rem] rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:46px_46px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
    </div>
    <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between rounded-[1.35rem] border border-white/[0.14] bg-white/[0.07] px-4 py-3 shadow-[0_20px_70px_rgba(0,0,0,.32),inset_0_1px_0_rgba(255,255,255,.24)] backdrop-blur-2xl sm:px-5">
      <Link href="/" className="group flex items-center gap-2.5" aria-label="Loviqa home"><span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-400 via-violet-500 to-indigo-700 shadow-[0_0_24px_rgba(192,132,252,.65)]"><Heart className="h-[18px] w-[18px] fill-white text-white" /><span className="absolute inset-px rounded-[11px] border border-white/35" /></span>
      <span className="text-lg font-black tracking-[0.18em] text-white sm:text-xl">LOVIQA</span></Link>
      <div className="hidden items-center gap-1 rounded-2xl border border-white/[0.08] bg-black/15 p-1 lg:flex">{navItems.map(({ label, icon: Icon }) => <button key={label} onClick={() => setActive(label)} className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${active === label ? "bg-white/[0.14] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.2)]" : "text-white/55 hover:bg-white/[0.07] hover:text-white"}`}><Icon className="h-4 w-4" /> {label}</button>)}</div>
      <div className="flex items-center gap-2 sm:gap-3">
        <button aria-label="Search" className="hidden h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-white/70 transition hover:bg-white/[0.14] hover:text-white sm:grid"><Search className="h-[18px] w-[18px]" /></button><button aria-label="Notifications" className="relative grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-white/80 transition hover:bg-white/[0.14] hover:text-white"><Bell className="h-[18px] w-[18px]" />
      <span className="absolute right-2 top-2 h-2 w-2 rounded-full border border-[#1c112b] bg-rose-400 shadow-[0_0_10px_#fb7185]" />
      </button><AccountMenu user={user} />
      <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation" className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.06] lg:hidden">{mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      </div>
      {mobileOpen && <div className="absolute left-0 right-0 top-[calc(100%+10px)] rounded-2xl border border-white/[0.14] bg-[#151025]/95 p-2 shadow-2xl backdrop-blur-2xl lg:hidden">{navItems.map(({ label, icon: Icon }) => <button key={label} onClick={() => { setActive(label); setMobileOpen(false); }} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm ${active === label ? "bg-white/10 text-white" : "text-white/65"}`}><Icon className="h-4 w-4" />{label}</button>)}</div>}
    </nav>
    <section className={styles.top}>
      <div className={`${styles.crystal} ${styles.greeting}`}>
        <p>Discover</p><h1>{greeting || "Welcome"}{user?.name ? `, ${user.name}` : ""} <span aria-hidden="true">{"\u{1F44B}"}</span></h1><small>Your curated space for meaningful connections.</small>
      </div>
      <div className={`${styles.crystal} ${styles.mood}`}><DailyEmojiOfTheDay /></div>
    </section>
    <section className={styles.content}>
      <DashboardMatchCarousel />
      <ActiveClubs />
    </section>
    <DailyEmojiPicker />
  </main>;
}
