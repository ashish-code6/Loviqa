"use client";

import { motion } from "framer-motion";
import PhoneMockup from "./ui/PhoneMockup";

export default function AIMatchSection() {
  return (
    <section className="relative overflow-hidden bg-[#070B14] py-20 lg:py-22">

      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[180px]" />

      <div className="relative mx-auto flex max-w-7xl flex-col-reverse items-center gap-16 px-6 lg:flex-row lg:gap-24">

        {/* LEFT IMAGE */}

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
          className="flex w-full justify-center lg:flex-1"
        >
          <PhoneMockup />
        </motion.div>

        {/* RIGHT CONTENT */}

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
          className="w-full lg:flex-1 text-center lg:text-left"
        >

          <span className="inline-flex rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs font-medium uppercase tracking-widest text-violet-300">

            AI Powered Matching

          </span>

          <h2 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">

            Find People

            <br />

            Who Truly

            <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">

              Match You

            </span>

          </h2>

          <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-gray-400 sm:text-base lg:mx-0">

            Loviqa intelligently matches you with people based
            on your interests, personality and activities,
            helping you build meaningful relationships instead
            of endless swiping.

          </p>

          {/* FEATURES */}

          <div className="mt-10 space-y-5">

            <div className="flex items-center justify-center gap-3 lg:justify-start">

              <div className="h-2.5 w-2.5 rounded-full bg-violet-500" />

              <p className="text-sm text-gray-300">

                AI Personality Matching

              </p>

            </div>

            <div className="flex items-center justify-center gap-3 lg:justify-start">

              <div className="h-2.5 w-2.5 rounded-full bg-fuchsia-500" />

              <p className="text-sm text-gray-300">

                Interest Based Recommendations

              </p>

            </div>

            <div className="flex items-center justify-center gap-3 lg:justify-start">

              <div className="h-2.5 w-2.5 rounded-full bg-cyan-400" />

              <p className="text-sm text-gray-300">

                Secure & Private Conversations

              </p>

            </div>

          </div>

          {/* BUTTON */}

          <button className="mt-10 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-7 py-3 text-sm font-semibold transition duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(139,92,246,.45)]">

            Explore AI Matching

          </button>

        </motion.div>

      </div>

    </section>
  );
}