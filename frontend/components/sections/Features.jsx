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
    <section className="relative py-32">

      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-5 py-2 text-violet-300">
            Why Loviqa?
          </span>

          <h2 className="mt-8 text-5xl font-bold">
            Connect Beyond Swiping
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Loviqa combines AI, communities and meaningful conversations
            to help people build real relationships.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

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
                className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
              >

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-[0_0_35px_rgba(139,92,246,.4)]">

                  <Icon size={30} />

                </div>

                <h3 className="mt-8 text-2xl font-semibold">

                  {item.title}

                </h3>

                <p className="mt-4 leading-8 text-gray-400">

                  {item.desc}

                </p>

                <div className="mt-8 h-[2px] w-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500 group-hover:w-full" />

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}