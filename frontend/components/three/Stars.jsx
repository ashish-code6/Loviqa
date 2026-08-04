"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

export default function Stars() {
  const starsRef = useRef();

  const positions = useMemo(() => {
    const positions = new Float32Array(6000 * 3);

    for (let i = 0; i < 6000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 35;
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (!starsRef.current) return;

    starsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    starsRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
  });

  return (
    <Points
      ref={starsRef}
      positions={positions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#EDE9FE"
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        opacity={0.9}
      />
    </Points>
  );
}