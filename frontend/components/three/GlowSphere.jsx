"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function GlowSphere() {
  const glowRef = useRef();

  useFrame((state) => {
    if (!glowRef.current) return;

    const t = state.clock.elapsedTime;

    glowRef.current.rotation.y = t * 0.15;

    const scale = 1 + Math.sin(t * 2) * 0.04;

    glowRef.current.scale.set(scale, scale, scale);
  });

  return (
    <mesh ref={glowRef}>
      <sphereGeometry args={[2.4, 64, 64]} />

      <meshBasicMaterial
        color="#7C3AED"
        transparent
        opacity={0.08}
      />
    </mesh>
  );
}