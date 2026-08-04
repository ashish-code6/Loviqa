"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function EnergyField() {
  const field1 = useRef();
  const field2 = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (field1.current) {
      field1.current.rotation.z = t * 0.25;
      field1.current.rotation.y = t * 0.15;

      const scale = 1 + Math.sin(t * 2) * 0.03;
      field1.current.scale.set(scale, scale, scale);
    }

    if (field2.current) {
      field2.current.rotation.z = -t * 0.18;
      field2.current.rotation.x = t * 0.12;

      const scale = 1 + Math.cos(t * 2) * 0.04;
      field2.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <>
      <mesh ref={field1}>
        <torusGeometry args={[2.2, 0.04, 32, 250]} />

        <meshBasicMaterial
          color="#7C3AED"
          transparent
          opacity={0.15}
        />
      </mesh>

      <mesh ref={field2}>
        <torusGeometry args={[2.0, 0.025, 32, 250]} />

        <meshBasicMaterial
          color="#A855F7"
          transparent
          opacity={0.2}
        />
      </mesh>
    </>
  );
}