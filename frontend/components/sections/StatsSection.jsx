"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Users,
  Clock3,
} from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "5",
    label: "Members Per Club",
  },
  {
    icon: Clock3,
    value: "5 Min",
    label: "Auto Delete Rooms",
  },
  {
    icon: Sparkles,
    value: "AI",
    label: "Smart Matching",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Privacy First",
  },
];

export default function StatsSection() {
  return (
    <section id="highlights" className="relative overflow-hidden bg-[#090611] py-20 lg:py-24">

      {/* Background Grid */}

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />

      {/* Glows */}

      <div className="absolute left-1/2 top-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-fuchsia-600/15 blur-[180px]" />

      <div className="absolute -left-40 top-40 h-[350px] w-[350px] rounded-full bg-fuchsia-500/10 blur-[170px]" />

      <div className="absolute -right-32 bottom-10 h-[320px] w-[320px] rounded-full bg-rose-500/10 blur-[170px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >

          <span className="inline-flex rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs font-medium tracking-[0.18em] uppercase text-violet-300">

            Platform Highlights

          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">

            Built for{" "}

            <span className="bg-gradient-to-r from-violet-300 via-fuchsia-400 to-rose-300 bg-clip-text text-transparent">

              Real Connections

            </span>

          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-400 md:text-base">

            AI-powered matching, interest clubs, secure conversations
            and meaningful social experiences designed for genuine
            relationships.

          </p>

        </motion.div>

        {/* Cards */}

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">

          {stats.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: .5,
                  delay: index * .1,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                className="group rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.09] to-white/[0.025] p-5 backdrop-blur-xl transition-all duration-300 hover:border-fuchsia-400/45 hover:shadow-[0_18px_48px_rgba(192,38,211,.18)]"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/30 to-rose-500/20 text-fuchsia-200">

                  <Icon size={22} />

                </div>

                <h3 className="mt-4 text-2xl font-bold text-white">

                  {item.value}

                </h3>

                <p className="mt-2 text-sm text-gray-400">

                  {item.label}

                </p>

              </motion.div>

            );

          })}

        </div>

      </div>
    </section>
  );
}
