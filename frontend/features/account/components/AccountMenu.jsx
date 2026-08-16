"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LogOut, Settings, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { clearSession } from "@/lib/api";

const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=85";

/**
 * Shared account menu for authenticated surfaces.
 * Pass a different `profileHref` when it is used on a profile/settings page.
 */
export default function AccountMenu({
  user,
  profileHref = "/dashboard#profile",
  onLogout,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();
  const name = user?.name || "Your profile";
  const avatar = user?.avatarUrl || user?.profileImage || DEFAULT_AVATAR;

  useEffect(() => {
    function closeMenu(event) {
      if (!menuRef.current?.contains(event.target)) setIsOpen(false);
    }

    function closeOnEscape(event) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", closeMenu);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeMenu);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  function handleLogout() {
    setIsOpen(false);
    if (onLogout) return onLogout();

    clearSession();
    toast.success("You have been logged out.");
    router.replace("/?auth=login");
  }

  return (
    <div ref={menuRef} className="relative">
      <button type="button" onClick={() => setIsOpen((open) => !open)} aria-label="Open account menu" aria-expanded={isOpen} aria-haspopup="menu" className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/25 bg-gradient-to-br from-fuchsia-300 to-violet-600 shadow-[0_0_20px_rgba(192,132,252,.25)] transition hover:scale-[1.04] hover:border-white/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-300/80">
        <img src={avatar} alt="" className="h-full w-full object-cover" />
      </button>

      {isOpen && <div role="menu" className="absolute right-0 top-[calc(100%+10px)] z-50 w-60 overflow-hidden rounded-2xl border border-white/[0.16] bg-[#171024]/95 p-2 shadow-[0_24px_60px_rgba(0,0,0,.48),inset_0_1px_0_rgba(255,255,255,.18)] backdrop-blur-2xl">
        <div className="border-b border-white/10 px-3 py-2.5"><p className="truncate text-sm font-bold text-white">{name}</p><p className="mt-0.5 truncate text-xs text-white/50">Manage your Loviqa account</p></div>
        <Link href={profileHref} role="menuitem" onClick={() => setIsOpen(false)} className="mt-1.5 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white"><Settings className="h-4 w-4 text-fuchsia-200" /> Profile settings</Link>
        <Link href={profileHref} role="menuitem" onClick={() => setIsOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white"><UserRound className="h-4 w-4 text-violet-200" /> View profile</Link>
        <div className="my-1.5 border-t border-white/10" />
        <button type="button" role="menuitem" onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-rose-300 transition hover:bg-rose-400/10 hover:text-rose-200"><LogOut className="h-4 w-4" /> Log out</button>
      </div>}
    </div>
  );
}
