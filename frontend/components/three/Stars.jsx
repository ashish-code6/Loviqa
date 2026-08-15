"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { centeredRandom } from "../hero/scene/seededRandom";

export default function Stars() {
  const starsRef = useRef();

  const positions = useMemo(() => {
    const starPositions = new Float32Array(6000 * 3);

    for (let index = 0; index < 6000; index += 1) {
      starPositions[index * 3] = centeredRandom(index, 1) * 35;
      starPositions[index * 3 + 1] = centeredRandom(index, 2) * 35;
      starPositions[index * 3 + 2] = centeredRandom(index, 3) * 35;
    }

    return starPositions;
  }, []);

  useFrame((state) => {
    if (!starsRef.current) return;

    starsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    starsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
  });

  return (
    <Points ref={starsRef} positions={positions} stride={3} frustumCulled={false}>
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
