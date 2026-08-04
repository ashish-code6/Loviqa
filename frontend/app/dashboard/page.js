"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  HiArrowRightOnRectangle,
  HiChatBubbleLeftRight,
  HiHeart,
  HiSparkles,
  HiUserGroup,
} from "react-icons/hi2";
import BrandMark from "@/components/hero/ui/BrandMark";
import { apiRequest, clearSession, getStoredUser } from "@/lib/api";

const dashboardCards = [
  { label: "New Matches", value: "12", icon: HiHeart },
  { label: "Interest Clubs", value: "8", icon: HiUserGroup },
  { label: "AI Suggestions", value: "24", icon: HiSparkles },
  { label: "Messages", value: "5", icon: HiChatBubbleLeftRight },
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
    <main className="min-h-screen bg-[#050712] text-white">
      <header className="border-b border-white/10 bg-black/18 px-5 py-5 backdrop-blur-xl lg:px-11">
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/">
            <BrandMark />
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex h-11 items-center gap-3 rounded-lg border border-white/14 px-4 text-sm font-bold text-white/86 transition hover:bg-white/[0.06]"
          >
            <HiArrowRightOnRectangle className="h-5 w-5" />
            Logout
          </button>
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-11">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-fuchsia-200">
              Main Dashboard
            </p>
            <h1 className="mt-2 text-4xl font-black">
              Hi {user?.name || "there"}, welcome to Loviqa
            </h1>
          </div>
          <p className="max-w-md text-sm leading-6 text-white/62">
            Your matches, clubs, and messages live here after login.
          </p>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardCards.map((card) => (
            <article
              key={card.label}
              className="rounded-lg border border-white/10 bg-white/[0.055] p-5"
            >
              <card.icon className="h-7 w-7 text-fuchsia-200" />
              <p className="mt-6 text-3xl font-black">{card.value}</p>
              <p className="mt-1 text-sm font-semibold text-white/60">{card.label}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
            <h2 className="text-xl font-black">Recommended connections</h2>
            <div className="mt-5 grid gap-3">
              {["Ananya", "Rohan", "Meera"].map((name, index) => (
                <div
                  key={name}
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 p-4"
                >
                  <div>
                    <p className="font-bold">{name}</p>
                    <p className="mt-1 text-sm text-white/55">
                      {92 - index * 4}% match based on shared interests
                    </p>
                  </div>
                  <button className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-[#111827]">
                    View
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
            <h2 className="text-xl font-black">Profile</h2>
            <div className="mt-5 space-y-3 text-sm text-white/68">
              <p>
                <span className="font-bold text-white">Name:</span>{" "}
                {user?.name || "Not set"}
              </p>
              <p>
                <span className="font-bold text-white">Email:</span>{" "}
                {user?.email || "Not set"}
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
