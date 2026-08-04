"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Sphere() {
  return (
    <mesh>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial
        color="#7C3AED"
        emissive="#7C3AED"
        emissiveIntensity={2}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={1} />

      <directionalLight position={[5, 5, 5]} intensity={3} />

      <Sphere />

      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={1.5}
      />
    </Canvas>
  );
}