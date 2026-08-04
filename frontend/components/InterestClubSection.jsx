"use client";

import { motion } from "framer-motion";
import ClubCard from "./ClubCard";

const clubs = [
  {
    title: "Music Club",
    members: "25K+ Members",
    badge: "Trending",
    color: "#8B5CF6",
    emoji: "🎵",
    description: "Find people who love music, concerts and playlists.",
  },
  {
    title: "Coding Club",
    members: "18K+ Members",
    badge: "Popular",
    color: "#06B6D4",
    emoji: "💻",
    description: "Build projects and grow together.",
  },
  {
    title: "Travel Club",
    members: "14K+ Members",
    badge: "New",
    color: "#F97316",
    emoji: "✈️",
    description: "Meet travel buddies and explore the world.",
  },
  {
    title: "Gaming Club",
    members: "21K+ Members",
    badge: "Live",
    color: "#EC4899",
    emoji: "🎮",
    description: "Play together and make new friends.",
  },
  {
    title: "Photography",
    members: "9K+ Members",
    badge: "Creative",
    color: "#EAB308",
    emoji: "📸",
    description: "Share your best shots with creators.",
  },
  {
    title: "Book Club",
    members: "11K+ Members",
    badge: "Readers",
    color: "#10B981",
    emoji: "📚",
    description: "Discover amazing books together.",
  },
];

export default function InterestClubSection() {
  return (
    <section className="relative overflow-hidden bg-[#070B14] py-24">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[180px]" />

      <div className="absolute -left-40 top-40 h-[350px] w-[350px] rounded-full bg-fuchsia-500/10 blur-[170px]" />

      <div className="absolute -right-32 bottom-10 h-[320px] w-[320px] rounded-full bg-cyan-500/10 blur-[170px]" />

      <div className="relative mx-auto max-w-[1500px] px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >

          <span className="inline-flex rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-violet-300">

            Interest Clubs

          </span>

          <h2 className="mt-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">

            Join Communities That

            <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">

              Match Your Passion

            </span>

          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 md:text-base">

            Connect with like-minded people through AI-powered
            communities and build meaningful friendships.

          </p>

        </motion.div>

        {/* Cards */}

        <div className="mt-16 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">

          {clubs.map((club, index) => (
            <ClubCard
              key={index}
              {...club}
              delay={index * 0.1}
            />
          ))}

        </div>

      </div>

    </section>
  );
}