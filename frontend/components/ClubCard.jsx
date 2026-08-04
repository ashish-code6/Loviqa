"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Users } from "lucide-react";
import AuthActionButton from "./AuthActionButton";

export default function ClubCard({
  title,
  description,
  members,
  badge,
  color,
  emoji,
  delay,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      className="group relative flex min-h-[230px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-5 backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:shadow-[0_20px_60px_rgba(124,58,237,.18)]"
    >
      {/* Glow */}
      <div
        className="absolute -right-12 -top-12 h-24 w-24 rounded-full opacity-20 blur-3xl transition-all duration-500 group-hover:opacity-40"
        style={{ background: color }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">

        {/* Badge */}
        <span
          className="inline-flex w-fit rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white"
          style={{
            background: `${color}25`,
            border: `1px solid ${color}`,
          }}
        >
          {badge}
        </span>

        {/* Icon */}
        <div
          className="mt-4 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl transition duration-300 group-hover:rotate-6"
          style={{
            background: `${color}20`,
          }}
        >
          {emoji}
        </div>

        {/* Title */}
        <h3 className="mt-4 text-xl font-semibold text-white">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm leading-6 text-gray-400">
          {description}
        </p>

        {/* Bottom */}
        <div className="mt-auto flex items-center justify-between pt-5">

          <div className="flex items-center gap-2">

            <Users
              size={16}
              color={color}
            />

            <span className="text-sm text-gray-300">
              {members}
            </span>

          </div>

          <AuthActionButton
            mode="register"
            aria-label={`Open ${title} club`}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 group-hover:rotate-45"
            style={{
              background: `${color}20`,
            }}
          >
            <ArrowUpRight
              size={18}
              color={color}
            />
          </AuthActionButton>

        </div>

      </div>
    </motion.div>
  );
}
