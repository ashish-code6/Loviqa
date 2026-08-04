"use client";

import { motion } from "framer-motion";
import AuthActionButton from "@/components/AuthActionButton";
import {
  Heart,
  Sparkles,
  MessageCircle,
} from "lucide-react";

export default function PhoneMockup() {
  return (
    <motion.div
      animate={{
        y: [0, -15, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
      }}
      className="relative mx-auto h-[520px] w-[260px] lg:h-[540px] lg:w-[270px]"
    >
      {/* Glow */}
      <div className="absolute inset-0 rounded-[50px] bg-violet-600/20 blur-3xl" />

      {/* Phone */}
      <div className="relative h-full rounded-[45px] border border-white/10 bg-[#0B1220]/90 p-4 backdrop-blur-2xl">

        {/* Dynamic Island */}
        <div className="mx-auto h-6 w-32 rounded-full bg-black" />

        {/* Screen */}

        <div className="mt-5 flex flex-col gap-4">

          {/* Match Card */}

          <div className="rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-6">

            <Sparkles size={28} />

            <h3 className="mt-6 text-2xl font-bold">
              98% Match
            </h3>

            <p className="mt-2 text-sm text-white/80">
              Based on AI Interests
            </p>

          </div>

          {/* Clubs */}

          <div className="rounded-2xl bg-white/5 p-4">

            <p className="text-sm text-gray-400">
              Interest Clubs
            </p>

            <div className="mt-4 flex gap-3">

              <span className="rounded-full bg-violet-500/20 px-3 py-2 text-sm">
                🎵 Music
              </span>

              <span className="rounded-full bg-violet-500/20 px-3 py-2 text-sm">
                💻 Coding
              </span>

            </div>

          </div>

          {/* Chat */}

          <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4">

            <MessageCircle />

            <div>

              <h4>Live Chat</h4>

              <p className="text-sm text-gray-400">
                5 friends online
              </p>

            </div>

          </div>

          {/* Bottom Button */}

          <AuthActionButton
            mode="register"
            className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 py-4 font-semibold"
          >

            <Heart size={18} />

            Start Matching

          </AuthActionButton>

        </div>

      </div>

    </motion.div>
  );
}
