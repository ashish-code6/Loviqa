"use client";

import { Html, Float } from "@react-three/drei";

export default function FloatingCard({
  position = [0, 0, 0],
  title,
  subtitle,
  color,
}) {
  return (
    <Float
      speed={2}
      floatIntensity={2}
      rotationIntensity={0.5}
    >
      <Html position={position} center>
        <div
          className="
            w-48
            rounded-2xl
            border
            border-white/10
            bg-white/10
            p-4
            backdrop-blur-xl
            shadow-2xl
            transition-all
            duration-300
            hover:scale-105
          "
          style={{
            boxShadow: `0 0 25px ${color}40`,
          }}
        >
          {/* Avatar */}

          <div
            className="mb-3 h-11 w-11 rounded-full"
            style={{
              background: color,
            }}
          />

          {/* Title */}

          <h3 className="text-sm font-semibold text-white">
            {title}
          </h3>

          {/* Subtitle */}

          <p className="mt-1 text-xs text-gray-300">
            {subtitle}
          </p>

          {/* Status */}

          <div className="mt-3 flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ background: color }}
            />

            <span className="text-xs text-gray-400">
              Online
            </span>
          </div>
        </div>
      </Html>
    </Float>
  );
}