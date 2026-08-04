"use client";

import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import ConnectionGlobe from "./ConnectionGlobe";
import OrbitalRings from "./OrbitalRings";
import Stars from "../../three/Stars";

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0.08, 0.06, 7.4], fov: 36 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={1.4} />
      <pointLight position={[2.5, 2.8, 3]} color="#e879f9" intensity={32} distance={8} />
      <pointLight position={[-3, -1.4, 2]} color="#fb923c" intensity={14} distance={7} />
      <pointLight position={[0, 0, 2]} color="#a855f7" intensity={18} distance={5} />
      <Stars />
      <Sparkles count={135} scale={[5.2, 3.4, 2.6]} size={3.1} speed={0.42} color="#d946ef" />
      <group position={[0.04, 0, 0]} scale={0.9}>
        <ConnectionGlobe />
        <OrbitalRings />
      </group>
    </Canvas>
  );
}
