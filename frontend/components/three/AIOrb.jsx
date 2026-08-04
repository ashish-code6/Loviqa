"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

export default function AIOrb() {
  const mesh = useRef();

  useFrame((state) => {
    if (!mesh.current) return;

    const t = state.clock.elapsedTime;

    mesh.current.rotation.y = t * 0.3;
    mesh.current.rotation.x = Math.sin(t * 0.5) * 0.15;

    const scale = 1 + Math.sin(t * 2) * 0.03;
    mesh.current.scale.set(scale, scale, scale);
  });

  return (
    <Float
      speed={2}
      rotationIntensity={1.2}
      floatIntensity={2}
    >
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.7, 20]} />

        <meshPhysicalMaterial
          color="#8B5CF6"
          roughness={0}
          transmission={1}
          thickness={2}
          metalness={0.3}
          clearcoat={1}
          clearcoatRoughness={0}
          ior={1.45}
          reflectivity={1}
          emissive="#7C3AED"
          emissiveIntensity={2}
        />
      </mesh>
    </Float>
  );
}