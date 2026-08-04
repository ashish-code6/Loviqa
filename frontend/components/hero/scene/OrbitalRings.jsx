"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function OrbitalRings() {
  const outer = useRef();
  const middle = useRef();
  const inner = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (outer.current) outer.current.rotation.z = time * 0.08;
    if (middle.current) middle.current.rotation.z = -time * 0.11;
    if (inner.current) inner.current.rotation.y = time * 0.12;
  });

  return (
    <group rotation={[1.02, 0.02, -0.1]} scale={[1.04, 0.8, 1.04]}>
      <mesh ref={outer}>
        <torusGeometry args={[2.72, 0.01, 20, 280]} />
        <meshBasicMaterial color="#d946ef" transparent opacity={0.72} />
      </mesh>
      <mesh ref={middle} rotation={[0.18, 0.35, 0]}>
        <torusGeometry args={[2.26, 0.012, 20, 280]} />
        <meshBasicMaterial color="#fb923c" transparent opacity={0.72} />
      </mesh>
      <mesh ref={inner} rotation={[-0.35, 0.4, 0]}>
        <torusGeometry args={[1.96, 0.008, 20, 260]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.55} />
      </mesh>
    </group>
  );
}
