"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Music4,
  MessageCircle,
  Clock3,
  ShieldCheck,
  Globe2,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Matchmaking",
    desc: "Find people with similar interests using intelligent AI recommendations.",
  },
  {
    icon: Music4,
    title: "Interest Clubs",
    desc: "Join Music, Gaming, Coding, Movies and many more exclusive clubs.",
  },
  {
    icon: MessageCircle,
    title: "Real-Time Chat",
    desc: "Instant messaging with a smooth and beautiful chatting experience.",
  },
  {
    icon: Clock3,
    title: "5-Min Live Rooms",
    desc: "Create temporary discussion rooms that disappear automatically.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy First",
    desc: "OTP verification, AI moderation, report & block system for safety.",
  },
  {
    icon: Globe2,
    title: "Global Community",
    desc: "Meet people from colleges, cities and countries around the world.",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative overflow-hidden bg-[#0d0718] py-20 lg:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/40 to-transparent" />
      <div className="absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-violet-600/15 blur-[140px]" />
      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-rose-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="rounded-full border border-fuchsia-400/25 bg-fuchsia-400/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-200">
            Made for more
          </span>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Loviqa combines AI, communities and meaningful conversations
            to help people build real relationships.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          {features.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={index}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                transition={{ duration: .3 }}
                className="group rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.09] to-white/[0.025] p-6 backdrop-blur-xl transition-colors hover:border-fuchsia-400/40 hover:shadow-[0_18px_48px_rgba(192,38,211,.15)]"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-[0_0_35px_rgba(192,38,211,.35)]">

                  <Icon size={30} />

                </div>

                <h3 className="mt-5 text-xl font-semibold">

                  {item.title}

                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-400">

                  {item.desc}

                </p>

                <div className="mt-6 h-px w-0 bg-gradient-to-r from-violet-400 to-rose-400 transition-all duration-500 group-hover:w-full" />

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}
