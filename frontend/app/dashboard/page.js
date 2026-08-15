"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  HiBell,
  HiBookOpen,
  HiCalendarDays,
  HiChatBubbleLeftRight,
  HiCog6Tooth,
  HiArrowRightOnRectangle,
  HiHeart,
  HiMagnifyingGlass,
  HiOutlineChartBar,
  HiOutlineHome,
  HiSparkles,
  HiUserGroup,
  HiUserCircle,
} from "react-icons/hi2";
import BrandMark from "@/components/hero/ui/BrandMark";
import { apiRequest, clearSession, getStoredUser } from "@/lib/api";

const navItems = [
  { label: "Dashboard", icon: HiOutlineHome, active: true },
  { label: "Matches", icon: HiHeart },
  { label: "Chats", icon: HiChatBubbleLeftRight },
  { label: "AI Coach", icon: HiSparkles },
  { label: "Dates", icon: HiCalendarDays },
  { label: "Journal", icon: HiBookOpen },
  { label: "Compatibility", icon: HiOutlineChartBar },
  { label: "Settings", icon: HiCog6Tooth },
];

const suggestions = [
  "Text her after 7 PM",
  "Ask about her interview",
  "Avoid dry replies today",
];

const chats = [
  { name: "Priya", status: "Typing...", accent: "from-rose-300 to-fuchsia-500" },
  { name: "Rahul", status: "Yesterday", accent: "from-cyan-300 to-violet-500" },
];

const compatibility = [
  { label: "Communication", value: 90 },
  { label: "Trust", value: 82 },
  { label: "Humor", value: 95 },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(() => getStoredUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("loviqa_token");

    if (!token) {
      router.replace("/?auth=login");
      return;
    }

    apiRequest("/auth/profile")
      .then((data) => setUser(data.user))
      .catch(() => {
        clearSession();
        router.replace("/?auth=login");
      })
      .finally(() => setLoading(false));
  }, [router]);

  function handleLogout() {
    clearSession();
    router.replace("/?auth=login");
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050712] text-white">
        <p className="text-sm font-semibold text-white/70">Opening dashboard...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#09090B] text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_22%_12%,rgba(124,58,237,0.22),transparent_30%),radial-gradient(circle_at_78%_18%,rgba(217,70,239,0.12),transparent_28%),linear-gradient(180deg,#09090B_0%,#0b0812_100%)]" />

      <div className="relative mx-auto grid min-h-screen max-w-[1500px] grid-cols-1 lg:grid-cols-[280px_1fr]">
        <aside className="hidden border-r border-white/10 bg-white/[0.035] px-5 py-6 backdrop-blur-2xl lg:block">
          <BrandMark />

          <nav className="mt-10 grid gap-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className={`flex h-12 items-center gap-3 rounded-[20px] px-4 text-sm font-bold transition ${
                  item.active
                    ? "bg-violet-500/20 text-white shadow-[0_14px_40px_rgba(124,58,237,0.18)]"
                    : "text-white/58 hover:bg-white/[0.055] hover:text-white"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <section className="px-4 py-5 sm:px-6 lg:px-8">
          <header className="flex flex-wrap items-center gap-4 rounded-[20px] border border-white/10 bg-white/[0.045] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
            <div className="lg:hidden">
              <BrandMark />
            </div>

            <div className="min-w-[220px] flex-1">
              <label className="flex h-12 items-center gap-3 rounded-[20px] border border-white/10 bg-black/24 px-4 text-white/55">
                <HiMagnifyingGlass className="h-5 w-5" />
                <input
                  className="w-full bg-transparent text-sm font-semibold text-white outline-none placeholder:text-white/40"
                  placeholder="Search Relationship..."
                />
              </label>
            </div>

            <button className="flex h-12 w-12 items-center justify-center rounded-[20px] border border-white/10 bg-white/[0.055] text-white/78 transition hover:bg-violet-500/20">
              <HiBell className="h-5 w-5" />
            </button>

            <div className="flex h-12 items-center gap-3 rounded-[20px] border border-white/10 bg-white/[0.055] px-4">
              <HiUserCircle className="h-7 w-7 text-fuchsia-200" />
              <span className="text-sm font-bold">{user?.name || "Ashish"}</span>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="flex h-12 items-center gap-2 rounded-[20px] border border-white/10 px-4 text-sm font-bold text-white/70 transition hover:bg-white/[0.06] hover:text-white"
            >
              <HiArrowRightOnRectangle className="h-5 w-5" />
              Logout
            </button>
          </header>

          <div className="mt-7">
            <p className="text-sm font-bold uppercase tracking-normal text-violet-200">
              Dashboard
            </p>
            <h1 className="mt-2 text-3xl font-black sm:text-4xl">
              Good Evening, {user?.name || "Ashish"}
            </h1>
          </div>

          <div className="mt-7 grid gap-5 xl:grid-cols-[1fr_360px]">
            <div className="grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <GlassCard>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-bold text-white/58">
                        Relationship Score
                      </p>
                      <p className="mt-4 text-6xl font-black">92%</p>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-rose-500/16 text-rose-200">
                      <HiHeart className="h-7 w-7" />
                    </div>
                  </div>
                  <div className="mt-7 h-3 rounded-full bg-white/8">
                    <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-rose-400" />
                  </div>
                </GlassCard>

                <GlassCard>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-bold text-white/58">
                        AI Mood Analysis
                      </p>
                      <p className="mt-4 text-5xl font-black">Happy</p>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-violet-500/18 text-violet-100">
                      <HiSparkles className="h-7 w-7" />
                    </div>
                  </div>
                  <p className="mt-7 text-sm leading-6 text-white/58">
                    Tone is warm, responsive, and emotionally open today.
                  </p>
                </GlassCard>
              </div>

              <GlassCard id="profile">
                <div className="flex items-center gap-3">
                  <HiSparkles className="h-6 w-6 text-orange-200" />
                  <h2 className="text-xl font-black">Daily AI Suggestions</h2>
                </div>
                <div className="mt-5 grid gap-3">
                  {suggestions.map((suggestion) => (
                    <div
                      key={suggestion}
                      className="rounded-[20px] border border-white/8 bg-black/20 px-4 py-3 text-sm font-semibold text-white/76"
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard>
                <h2 className="text-xl font-black">Compatibility Insights</h2>
                <div className="mt-6 grid gap-5">
                  {compatibility.map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm font-bold">
                        <span className="text-white/70">{item.label}</span>
                        <span>{item.value}%</span>
                      </div>
                      <div className="mt-3 h-3 rounded-full bg-white/8">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400"
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            <div className="grid gap-5">
              <GlassCard>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black">Recent Chats</h2>
                  <HiChatBubbleLeftRight className="h-6 w-6 text-violet-200" />
                </div>
                <div className="mt-5 grid gap-3">
                  {chats.map((chat) => (
                    <div
                      key={chat.name}
                      className="flex items-center gap-3 rounded-[20px] border border-white/8 bg-black/20 p-3"
                    >
                      <div
                        className={`h-12 w-12 rounded-[18px] bg-gradient-to-br ${chat.accent}`}
                      />
                      <div>
                        <p className="font-bold">{chat.name}</p>
                        <p className="mt-1 text-sm text-white/50">{chat.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black">Upcoming</h2>
                  <HiCalendarDays className="h-6 w-6 text-fuchsia-200" />
                </div>
                <div className="mt-5 rounded-[20px] border border-violet-300/18 bg-violet-500/10 p-4">
                  <p className="font-black">Dinner Date</p>
                  <p className="mt-2 text-sm font-semibold text-white/58">
                    Saturday • 7 PM
                  </p>
                </div>
              </GlassCard>

              <GlassCard>
                <h2 className="text-xl font-black">Profile</h2>
                <div className="mt-5 grid gap-3 text-sm text-white/62">
                  <p>
                    <span className="font-bold text-white">Name:</span>{" "}
                    {user?.name || "Ashish"}
                  </p>
                  <p>
                    <span className="font-bold text-white">Email:</span>{" "}
                    {user?.email || "ashish@example.com"}
                  </p>
                  {user?.profile?.location && (
                    <p>
                      <span className="font-bold text-white">Location:</span>{" "}
                      {user.profile.location}
                    </p>
                  )}
                  {user?.interests?.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {user.interests.map(({ interest }) => (
                        <span key={interest.id} className="rounded-full bg-fuchsia-500/10 px-2.5 py-1 text-xs font-semibold text-fuchsia-100">
                          {interest.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </GlassCard>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function GlassCard({ children, ...props }) {
  return (
    <section {...props} className="rounded-[20px] border border-white/10 bg-white/[0.055] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-2xl">
      {children}
    </section>
  );
}
