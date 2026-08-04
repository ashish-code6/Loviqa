"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function SmallOrb() {
  const orbRef = useRef();

  useFrame((state) => {
    if (!orbRef.current) return;

    const t = state.clock.elapsedTime;

    // Orbit Movement
    orbRef.current.position.x = Math.cos(t) * 2.6;
    orbRef.current.position.z = Math.sin(t) * 2.6;

    // Floating Effect
    orbRef.current.position.y = Math.sin(t * 2) * 0.15;

    // Rotation
    orbRef.current.rotation.x += 0.02;
    orbRef.current.rotation.y += 0.02;
  });

  return (
    <mesh ref={orbRef}>
      <sphereGeometry args={[0.09, 32, 32]} />

      <meshPhysicalMaterial
        color="#ffffff"
        emissive="#A855F7"
        emissiveIntensity={3}
        transmission={1}
        roughness={0}
        metalness={0.2}
        clearcoat={1}
      />
    </mesh>
  );
}