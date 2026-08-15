"use client";

import { motion } from "framer-motion";
import AuthActionButton from "../AuthActionButton";
import PhoneMockup from "./ui/PhoneMockup";

export default function AIMatchSection() {
  return (
    <section id="ai-matching" className="relative isolate overflow-hidden bg-[#090611] py-20 lg:py-24">

      {/* A fixed-looking visual layer keeps the section grounded while its content scrolls. */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_48%,rgba(168,85,247,0.18),transparent_27%),radial-gradient(circle_at_82%_65%,rgba(236,72,153,0.12),transparent_30%)]" />
      <div className="pointer-events-none absolute left-1/4 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-600/16 blur-[180px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-fuchsia-300/35 to-transparent" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16">

        {/* LEFT IMAGE */}

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
          className="flex w-full justify-center lg:sticky lg:top-28 lg:self-start"
        >
          <PhoneMockup />
        </motion.div>

        {/* RIGHT CONTENT */}

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
          className="w-full py-2 text-center lg:py-8 lg:text-left"
        >

          <span className="inline-flex rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs font-medium uppercase tracking-widest text-violet-300">

            AI Powered Matching

          </span>

          <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl lg:text-[42px]">

            Meet People

            <br />

            Who Really

            <span className="block bg-gradient-to-r from-violet-300 via-fuchsia-400 to-rose-300 bg-clip-text text-transparent">

              Get You

            </span>

          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-gray-400 sm:text-base lg:mx-0">

            Loviqa intelligently matches you with people based
            on your interests, personality and activities,
            helping you build meaningful relationships instead
            of endless swiping.

          </p>

          {/* FEATURES */}

          <div className="mt-7 space-y-3">

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

                <div className="h-2.5 w-2.5 rounded-full bg-rose-400" />

              <p className="text-sm text-gray-300">

                Secure & Private Conversations

              </p>

            </div>

          </div>

          {/* BUTTON */}

          <AuthActionButton
            mode="register"
            className="mt-7 inline-flex rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-rose-400 px-6 py-3 text-sm font-semibold transition duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(192,38,211,.45)]"
          >

            Explore AI Matching

          </AuthActionButton>

        </motion.div>

      </div>

    </section>
  );
}
