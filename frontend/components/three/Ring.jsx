"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Ring() {
  const ring1 = useRef();
  const ring2 = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (ring1.current) {
      ring1.current.rotation.z = t * 0.30;
      ring1.current.rotation.x = Math.PI / 2;
    }

    if (ring2.current) {
      ring2.current.rotation.z = -t * 0.18;
      ring2.current.rotation.y = Math.PI / 4;
    }
  });

  return (
    <>
      {/* Ring 1 */}
      <mesh ref={ring1}>
        <torusGeometry args={[2.6, 0.025, 32, 250]} />

        <meshStandardMaterial
          color="#A855F7"
          emissive="#8B5CF6"
          emissiveIntensity={4}
        />
      </mesh>

      {/* Ring 2 */}
      <mesh ref={ring2}>
        <torusGeometry args={[2.9, 0.015, 32, 250]} />

        <meshStandardMaterial
          color="#C084FC"
          emissive="#A855F7"
          emissiveIntensity={2.5}
          transparent
          opacity={0.7}
        />
      </mesh>
    </>
  );
}