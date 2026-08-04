"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { useState } from "react";

const navLinks = [
  { title: "Features", href: "#features" },
  { title: "How it Works", href: "#how" },
  { title: "About", href: "#about" },
  { title: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-5 left-0 z-50 w-full px-5">
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="
          mx-auto
          flex
          h-[68px]
          w-full
          max-w-[1280px]
          items-center
          justify-between
          rounded-full
          border
          border-white/10
          bg-[#111827]/60
          px-8
          backdrop-blur-2xl
        "
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-gradient-to-r
              from-violet-600
              to-fuchsia-500
              text-white
              font-bold
              shadow-lg
              shadow-violet-500/30
            "
          >
            ♥
          </div>

          <h1 className="text-2xl font-bold tracking-wide">
            Lovi<span className="text-violet-400">qa</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="
                relative
                text-[15px]
                font-medium
                text-gray-300
                transition-all
                duration-300
                hover:text-white
                after:absolute
                after:-bottom-1
                after:left-0
                after:h-[2px]
                after:w-0
                after:bg-violet-500
                after:transition-all
                hover:after:w-full
              "
            >
              {item.title}
            </a>
          ))}
        </div>

        {/* Right */}
        <div className="hidden lg:flex items-center gap-5">
          <Link
            href="/login"
            className="text-[15px] font-medium text-gray-300 transition hover:text-white"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="
              rounded-full
              bg-gradient-to-r
              from-violet-600
              to-fuchsia-600
              px-6
              py-2.5
              text-sm
              font-semibold
              text-white
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-[0_0_30px_rgba(139,92,246,.45)]
            "
          >
            Get Started
          </Link>
        </div>

        {/* Mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-3xl text-white lg:hidden"
        >
          {menuOpen ? <HiXMark /> : <HiBars3 />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            mx-auto
            mt-3
            w-full
            max-w-[1280px]
            rounded-3xl
            border
            border-white/10
            bg-[#111827]/95
            p-6
            backdrop-blur-2xl
            lg:hidden
          "
        >
          <div className="flex flex-col gap-5">
            {navLinks.map((item) => (
              <a
                key={item.title}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-300 hover:text-white"
              >
                {item.title}
              </a>
            ))}

            <Link
              href="/login"
              className="rounded-xl border border-violet-500 py-3 text-center text-white"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 text-center font-semibold text-white"
            >
              Get Started
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}