"use client";

import { motion } from "framer-motion";
import HeroCanvas from "./HeroCanvas";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-700/10 blur-[180px]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-between px-6 pt-28">

        {/* LEFT */}

        <div className="w-full lg:w-1/2">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .6 }}
          >
            <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-5 py-2 text-sm text-violet-300">
              ✨ AI Powered Relationship Platform
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .2 }}
            className="mt-8 text-5xl font-bold leading-tight lg:text-7xl"
          >
            Find Meaningful
            <br />

            Connections

            <span className="mt-3 block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Powered by AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .4 }}
            className="mt-8 max-w-xl text-lg leading-8 text-gray-400"
          >
            Beyond endless swiping.
            Meet genuine people through AI matchmaking,
            Interest Clubs and meaningful conversations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .6 }}
            className="mt-10 flex flex-wrap gap-5"
          >
            <button className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 font-semibold text-white transition duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(139,92,246,.45)]">
              Get Started
            </button>

            <button className="rounded-full border border-white/15 px-8 py-4 text-white transition hover:border-violet-500">
              Explore
            </button>
          </motion.div>

        </div>

        {/* RIGHT */}

        <div className="relative hidden h-[650px] w-1/2 items-center justify-center lg:flex">

          {/* Three.js Canvas yaha aayega */}

          <div className="absolute h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[120px]" />

          <div className="relative flex h-[500px] w-[500px] items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-3xl">

            <p className="text-gray-500">
              Three.js Scene Coming...
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}