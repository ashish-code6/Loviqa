"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowRight, HiBars3, HiXMark } from "react-icons/hi2";
import { useState } from "react";
import AuthActionButton from "./AuthActionButton";
import { navItems } from "./hero/data/heroContent";
import BrandMark from "./hero/ui/BrandMark";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-5 py-5 lg:px-11">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="mx-auto grid h-[54px] max-w-[1500px] grid-cols-[1fr_auto] items-center lg:grid-cols-[1fr_auto_1fr]"
      >
        <Link href="/" aria-label="Loviqa home">
          <BrandMark />
        </Link>

        <div className="hidden items-center gap-10 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-semibold text-white/86 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center justify-end gap-5 lg:flex">
          <AuthActionButton
            mode="login"
            className="rounded-lg border border-white/25 px-8 py-3 text-sm font-semibold text-white transition hover:border-white/45 hover:bg-white/[0.06]"
          >
            Login
          </AuthActionButton>
          <AuthActionButton
            mode="register"
            className="inline-flex items-center gap-4 rounded-lg bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-300 px-8 py-3 text-sm font-bold text-white shadow-[0_18px_42px_rgba(168,85,247,0.36)] transition hover:-translate-y-0.5"
          >
            Get Started
            <HiArrowRight className="h-5 w-5" />
          </AuthActionButton>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-2xl text-white backdrop-blur-xl lg:hidden"
        >
          {open ? <HiXMark /> : <HiBars3 />}
        </button>
      </motion.nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-4 max-w-[1500px] rounded-3xl border border-white/12 bg-[#080611]/90 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.55)] backdrop-blur-2xl lg:hidden"
        >
          <div className="grid gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/[0.07] hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <AuthActionButton
              mode="login"
              onOpen={() => setOpen(false)}
              className="mt-2 rounded-2xl border border-white/15 py-3 text-center text-sm font-semibold text-white"
            >
              Login
            </AuthActionButton>
            <AuthActionButton
              mode="register"
              onOpen={() => setOpen(false)}
              className="rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-300 py-3 text-center text-sm font-bold text-white"
            >
              Get Started
            </AuthActionButton>
          </div>
        </motion.div>
      )}
    </header>
  );
}
